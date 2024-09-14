import jwt from 'jsonwebtoken';
import ENV_VARS from '../configs/envVars.js';

const generateJWT = (userId) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: '30d',
    });

    return token
};

export default generateJWT;