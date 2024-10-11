const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied!' });
    }
    next();
}
export default adminMiddleware; // Path: middleware/adminMiddleware.js