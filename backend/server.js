import express from 'express';

const app = express()

import authRoutes from './routes/authRoutes.js'

app.use("/api/v1/auth", authRoutes)

app.listen(5000, () => {
    console.log('Server running on port 5000')
})