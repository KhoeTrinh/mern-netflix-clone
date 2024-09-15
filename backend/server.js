// express app
import express from 'express';

const app = express();

// .env variables
import ENV_VARS from './configs/envVars.js';

const port = ENV_VARS.PORT;

// cors middleware
import cors from 'cors';

app.use(
    cors({
        origin: 'https://mern-netflix-clone-frontend.pages.dev',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

// connect DB
import connectDB from './configs/db.js';

connectDB();

// middleware
import protectRoute from './middlewares/protectRoute.js';

app.use(express.json());

// routes
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import fetchToken from './middlewares/fetchToken.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', fetchToken, protectRoute, movieRoutes);
app.use('/api/v1/tv', fetchToken, protectRoute, tvRoutes);
app.use('/api/v1/search', fetchToken, protectRoute, searchRoutes);

// app running on port
app.listen(port, () => {
    console.log(`Server running on port ${port} 👌`);
});
