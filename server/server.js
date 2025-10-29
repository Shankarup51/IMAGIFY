import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectToMongoDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

await connectToMongoDB();
app.use('/api/users', userRouter);
app.use('/api/images', imageRouter);

app.get('/', (req, res) => {
  res.send('Imagify Server is Running fine');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

