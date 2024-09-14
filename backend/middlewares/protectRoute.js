import jwt from 'jsonwebtoken';
import User from '../models/authModals.js';
import ENV_VARS from '../configs/envVars.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied',
            });
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid, authorization denied',
            });
        }

        const user = await User.findById(decoded.userId).select(
            '-password'
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No user found, authorization denied',
            });
        }
        req.user = user;

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
};

export default protectRoute;