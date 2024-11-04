import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import numberRoutes from './routes/numberRoutes';
import { insertRandomNumbers } from './services/numberService';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(async () => {
    await insertRandomNumbers(); // Automatically generate and store numbers on startup
});

app.use('/api/auth', authRoutes);
app.use('/api', numberRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
