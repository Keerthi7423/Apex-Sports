import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import connectDB from './config/db.js';
import matchRoutes from './routes/matchRoutes.js';
import { seedMatches } from './utils/seedData.js';
import wsHub from './services/wsHub.js';
import livePoller from './services/livePoller.js';

// Load env vars
dotenv.config({ path: '../../.env' });

const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB().then(() => {
  // Seed initial data
  seedMatches();
  
  // Start Live Poller
  livePoller.start();
});

// Initialize WebSocket Hub
wsHub.init(server);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/matches', matchRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'Match Service', status: 'UP' });
});

const PORT = process.env.PORT_MATCH || 4001;

server.listen(PORT, () => {
  console.log(`
  ================================================
  ⚽ MATCH SERVICE RUNNING ON PORT ${PORT}
  ================================================
  - WS Endpoint: ws://localhost:${PORT}/ws/live/:matchId
  ================================================
  `);
});