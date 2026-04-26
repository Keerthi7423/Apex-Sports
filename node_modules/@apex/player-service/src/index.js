import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import playerRoutes from './routes/playerRoutes.js';
import { seedPlayers } from './utils/seedData.js';

// Load env vars
dotenv.config({ path: '../../.env' });

const app = express();

// Connect to Database
connectDB().then(() => {
  // Seed initial data
  seedPlayers();
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/players', playerRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'Player Service', status: 'UP' });
});

const PORT = process.env.PORT_PLAYER || 4002;

app.listen(PORT, () => {
  console.log(`
  ================================================
  👤 PLAYER SERVICE RUNNING ON PORT ${PORT}
  ================================================
  - CSPI Engine Active
  - MongoDB Connected
  ================================================
  `);
});