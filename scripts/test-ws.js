import WebSocket from 'ws';

const MATCH_ID = 'm1';
const GATEWAY_URL = 'ws://localhost:4000/ws/live/' + MATCH_ID;

console.log(`Connecting to Gateway WebSocket: ${GATEWAY_URL}`);

const ws = new WebSocket(GATEWAY_URL);

ws.on('open', () => {
  console.log('✅ Connected to Gateway');
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  console.log('📩 Received Message:', message);
  
  if (message.type === 'SCORE_UPDATE') {
    console.log(`⚽ SCORE UPDATE: ${message.score.home} - ${message.score.away}`);
  }
});

ws.on('error', (err) => {
  console.error('❌ WebSocket Error:', err.message);
});

ws.on('close', () => {
  console.log('🔌 Connection closed');
});

// Close after 40 seconds to see at least 2 updates
setTimeout(() => {
  console.log('Closing test connection...');
  ws.close();
}, 40000);
