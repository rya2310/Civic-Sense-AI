import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try {
        // Extract token from headers or cookies
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and exclude password field
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User Not Found" });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to next middleware

    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
};
