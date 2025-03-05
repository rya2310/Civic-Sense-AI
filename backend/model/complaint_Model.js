import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema({
    
    complaintDescription: String,
    category: String,
    department:String,
    priority: { type: String, default: "Low" },
    status: { type: String, default: "Pending", enum: ["Pending", "Resolved", "Escalated","Progressing"] },

    
    source: { type: String, default: "User Submission" }  // For distinguishing scraped data
},{timestamps:true});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;