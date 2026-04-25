const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { 
  PORT, 
  MATCH_SERVICE_URL, 
  PLAYER_SERVICE_URL, 
  AI_SERVICE_URL, 
  USER_SERVICE_URL, 
  NOTIF_SERVICE_URL 
} = require('./config/services');
const apiLimiter = require('./middleware/rateLimit');
const { verifyToken } = require('./middleware/auth');

const app = express();

// Global Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'Gateway',
    timestamp: new Date().toISOString()
  });
});

// Proxy Configurations
const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/[^\/]+/, ''), // Strips /api/service-name
  onError: (err, req, res) => {
    console.error(`Proxy Error for ${target}:`, err.message);
    res.status(502).json({
      status: 502,
      message: 'Bad Gateway',
      error: err.message
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('x-gateway-request', 'true');
  }
});

// Route Definitions
app.use('/api/matches', apiLimiter, createProxyMiddleware(proxyOptions(MATCH_SERVICE_URL)));
app.use('/api/players', apiLimiter, createProxyMiddleware(proxyOptions(PLAYER_SERVICE_URL)));
app.use('/api/ai', apiLimiter, verifyToken, createProxyMiddleware(proxyOptions(AI_SERVICE_URL)));
app.use('/api/users', apiLimiter, verifyToken, createProxyMiddleware(proxyOptions(USER_SERVICE_URL)));
app.use('/api/notifications', apiLimiter, verifyToken, createProxyMiddleware(proxyOptions(NOTIF_SERVICE_URL)));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Gateway Route Not Found'
  });
});

app.listen(PORT, () => {
  console.log(`
  ================================================
  🚀 APEX GATEWAY RUNNING ON PORT ${PORT}
  ================================================
  - Matches: ${MATCH_SERVICE_URL}
  - Players: ${PLAYER_SERVICE_URL}
  - AI:      ${AI_SERVICE_URL}
  - Users:   ${USER_SERVICE_URL}
  - Notifs:  ${NOTIF_SERVICE_URL}
  ================================================
  `);
});