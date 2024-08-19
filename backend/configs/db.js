import mongoose from 'mongoose';
import ENV_VARS from './envVars.js';

const connectDB = async () => {
    try {
        const connDB = await mongoose.connect(ENV_VARS.MONGODB_URL);
        console.log('Connected to MongoDB ╰(*°▽°*)╯');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
