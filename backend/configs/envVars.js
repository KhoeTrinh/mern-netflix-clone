import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
};
