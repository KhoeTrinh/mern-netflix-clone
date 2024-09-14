import jwt from 'jsonwebtoken';
import ENV_VARS from '../configs/envVars.js';

const generateJWT = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: '30d',
    });
    localStorage.setItem('netflix-clone', token)

    return token
};

export default generateJWT;