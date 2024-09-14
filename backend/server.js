// express app
import express from 'express';

const app = express();

// get file path
import path from 'path'

const __dirname = path.resolve()

// .env variables
import ENV_VARS from './configs/envVars.js';

const port = ENV_VARS.PORT;

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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV !== "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// app running on port
app.listen(port, () => {
    console.log(`Server running on port ${port} 👌`);
});
