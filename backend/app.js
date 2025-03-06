    import express from 'express';
    import dotenv from 'dotenv';
    dotenv.config();
    import cors from 'cors';
    import nodemailer from 'nodemailer';
    import { spawn } from 'child_process';
    import Complaint from './model/complaint_Model.js';
    import connnection from './dbConnect/connection.js';
    import User from './model/userModel.js';
    import cookieParser from 'cookie-parser';
    import AuthRoute from './routes/authRoute.js';
    import { authUser } from './middle/authMid.js';

    const app = express();

    connnection();

    // ✅ Middleware
    app.use(cors({
        origin: '*',  // Ensure proper frontend connection
        methods: ['GET', 'POST', 'PUT'],
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use("/user", AuthRoute);

    // ✅ API to Submit Complaints (with ML Model)
    app.post('/complaints', authUser, async (req, res) => {
        try {
            const { complaint_text } = req.body;

            // 🔥 Call Python ML Model
            const pythonProcess = spawn('python', ['ml_model.py', complaint_text]);
            let result = '';

            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
                console.log("Raw Python Output:", data.toString());  // Log the raw output from Python
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`Python Error: ${data}`);
            });

            pythonProcess.on('close', async (code) => {
                if (code !== 0) {
                    return res.status(500).json({ error: "Error in ML model execution" });
                }

                try {
                    // Parse the JSON response from the Python script
                    let predictions;
                    try {
                        predictions = JSON.parse(result.trim());
                    } catch (parseError) {
                        console.error("Error parsing the result:", parseError);
                        return res.status(500).json({ error: "Invalid JSON response from ML model" });
                    }

                    // Normalize keys to lowercase
                    const normalizedPredictions = {
                        category: predictions["Category"] || "",
                        department: predictions["Department"] || "",
                        sentiment: predictions["Sentiment"] || "",
                        priority: predictions["Priority"] || ""
                    };

                    console.log("Complaint:", complaint_text);
                    console.log("Predicted Category:", normalizedPredictions.category);
                    console.log("Predicted Department:", normalizedPredictions.department);
                    console.log("Predicted Sentiment:", normalizedPredictions.sentiment);
                    console.log("Predicted Priority:", normalizedPredictions.priority);

                    // ✅ Save Complaint in DB
                    const complaint = new Complaint({ 
                        complaintDescription: complaint_text, 
                        category: normalizedPredictions.category, 
                        department: normalizedPredictions.department, 
                        sentiment: normalizedPredictions.sentiment, 
                        priority: normalizedPredictions.priority,
                        status: "Pending" 
                    });

                    const user = await User.findById(req.user._id);
                    if (!user) return res.status(404).json({ error: "User not found" });

                    user.complaints.push(complaint._id);
                    await user.save();
                    await complaint.save();

                    res.status(201).json({ message: "Complaint Submitted Successfully", complaint });

                } catch (error) {
                    console.error("Error parsing ML response:", error);
                    res.status(500).json({ error: "Invalid response from ML model" });
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Get All Complaints
    app.get('/complaints', async (req, res) => {
        try {
            const complaints = await Complaint.find();
            res.status(200).json(complaints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Get Complaint Statistics for Dashboard
    app.get('/count-complaints', async (req, res) => {
        try {
            const count = await Complaint.countDocuments();
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/critical-count', async (req, res) => {
        try {
            const count = await Complaint.countDocuments({ priority: "High" });
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.get('/resolved-count', async (req, res) => {
        try {
            const count = await Complaint.countDocuments({ status: "Resolved" });
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/pending-count', async (req, res) => {
        try {
            const count = await Complaint.countDocuments({ status: "Pending" });
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Get Recent Complaints (Latest 5)
    app.get('/recent-complaints', async (req, res) => {
        try {
            const recentComplaints = await Complaint.find()
                .sort({ createdAt: -1 })  // Sort complaints by creation date in descending order
                .limit(5);  // Get only the 5 most recent complaints

            res.status(200).json(recentComplaints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Send Complaint Resolution Email
    app.post("/send-email", async (req, res) => {
        const { authorityEmail, complaint_text } = req.body;
        try {
            await sendComplaintResolvedEmail(authorityEmail, complaint_text);
            res.status(200).json({ message: "Email sent" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Resolve Complaint & Notify User
    app.put('/resolve-complaint/:id', async (req, res) => {
        try {
            const complaintId = req.params.id;

            // Find the complaint
            const complaint = await Complaint.findById(complaintId);
            if (!complaint) {
                return res.status(404).json({ message: "Complaint not found" });
            }

            // Update status to "Resolved"
            complaint.status = "Resolved";
            await complaint.save();

            // Find the user who submitted this complaint
            const user = await User.findOne({ complaints: complaintId });
            if (!user) {
                return res.status(404).json({ message: "User not found for this complaint" });
            }

            // Remove complaint ID from user's complaints list
            user.complaints = user.complaints.filter(id => id.toString() !== complaintId);
            await user.save();

            // Send resolution email
            await sendComplaintResolvedEmail(user.email, complaintId);

            res.status(200).json({ message: "Complaint resolved, removed from user’s record & email sent." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Logout Route
    app.get("/logout", (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out" });
    });

    // 📌 Email Sending Function
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const sendComplaintResolvedEmail = async (receiverEmail, complaintText) => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiverEmail,
            subject: "Complaint Resolved ✅",
            text: `Dear User,\n\nYour complaint has been resolved.\n\nComplaint Details: ${complaintText}\n\nThank you!\n\n- Support Team`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent to ${receiverEmail}`);
        } catch (error) {
            console.error(`❌ Failed to send email to ${receiverEmail}:`, error);
        }
    };

    // ✅ Start Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
