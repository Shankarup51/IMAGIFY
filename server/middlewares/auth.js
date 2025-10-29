import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({ success: false, message: "Invalid token payload" });
        }

        req.user = { id: decoded.id }; // cleaner than modifying req.body
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({ success: false, message: "Token verification failed. Please login again." });
    }
};

export default userAuth;
