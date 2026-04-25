const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });

module.exports = {
  PORT: process.env.PORT_GATEWAY || 4000,
  MATCH_SERVICE_URL: process.env.SERVICE_MATCH || 'http://localhost:4001',
  PLAYER_SERVICE_URL: process.env.SERVICE_PLAYER || 'http://localhost:4002',
  AI_SERVICE_URL: process.env.SERVICE_AI || 'http://localhost:4003',
  USER_SERVICE_URL: process.env.SERVICE_USER || 'http://localhost:4004',
  NOTIF_SERVICE_URL: process.env.SERVICE_NOTIF || 'http://localhost:4005',
};
