import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import sitesRouter from './routes/sites.route';

export default function createApp(): Application {
  const app: Application = express();


  app.use(cors());
  app.use(express.json());


  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('Подключено к MongoDB');
    } catch (err) {
      console.error('При подключении возникла ошибка:', err);
      process.exit(1);
    }
  };
  
  connectDB();

  
  app.use('/api/sites', sitesRouter);


  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  return app;
}