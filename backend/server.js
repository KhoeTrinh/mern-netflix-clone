// express app
import express from 'express';

const app = express();

// .env variables
import ENV_VARS from './configs/envVars.js';

const port = ENV_VARS.PORT;

// connect DB
import connectDB from './configs/db.js';

connectDB();

// middleware
import cookieParser from 'cookie-parser';
import protectRoute from './middlewares/protectRoute.js';

app.use(express.json());
app.use(cookieParser());

// routes
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvRoutes from './routes/tvRoutes.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);

// app running on port
app.listen(port, () => {
    console.log(`Server running on port ${port} 👌`);
});
