import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const user = await User.findById(decoded.userId); // Find user by decoded ID

        if (!user) {
            return res.status(401).json({ message: 'Invalid token: user not found' });
        }

        // Attach the user object to req, including role
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role // Ensure the role is included
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
};

export default authMiddleware;