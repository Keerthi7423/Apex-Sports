import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import aiRoutes from './routes/aiRoutes.js';

// Load env vars
dotenv.config({ path: '../../.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // For SSE
}));
app.use(morgan('dev'));

// Routes
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    service: 'AI Service', 
    status: 'UP',
    engine: 'Ollama (Llama 3.2)'
  });
});

const PORT = process.env.PORT_AI || 4003;

app.listen(PORT, () => {
  console.log(`
  ================================================
  🤖 AI SERVICE RUNNING ON PORT ${PORT}
  ================================================
  - Ollama Integration: ${process.env.OLLAMA_URL || 'http://localhost:11434'}
  - Streaming (SSE) Enabled
  ================================================
  `);
});