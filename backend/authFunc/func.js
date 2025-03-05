import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';

// const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set cookie with security options
        res.cookie('token', token, {
            maxAge: 3600000, // 1 hour
        });

        // Respond with success message
        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, email: newUser.email } ,token});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set cookie with security options
        res.cookie('token', token, {
            maxAge: 3600000, // 1 hour
            httpOnly: true, // Prevent client-side script access
            // sameSite: 'strict', // Prevent CSRF attacks
        });

        // Respond with success message
        res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email },token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};