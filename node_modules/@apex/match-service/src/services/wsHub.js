import { WebSocketServer } from 'ws';

class WSHub {
  constructor() {
    this.rooms = new Map(); // matchId -> Set of ws clients
  }

  init(server) {
    this.wss = new WebSocketServer({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
      const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
      const match = pathname.match(/\/ws\/live\/(.+)/);

      if (match) {
        const matchId = match[1];
        this.wss.handleUpgrade(request, socket, head, (ws) => {
          this.wss.emit('connection', ws, request, matchId);
        });
      } else {
        socket.destroy();
      }
    });

    this.wss.on('connection', (ws, request, matchId) => {
      console.log(`Client connected to match room: ${matchId}`);
      
      if (!this.rooms.has(matchId)) {
        this.rooms.set(matchId, new Set());
      }
      this.rooms.get(matchId).add(ws);

      ws.on('close', () => {
        console.log(`Client disconnected from match room: ${matchId}`);
        const room = this.rooms.get(matchId);
        if (room) {
          room.delete(ws);
          if (room.size === 0) {
            this.rooms.delete(matchId);
          }
        }
      });

      // Send initial welcome or current score if needed
      ws.send(JSON.stringify({ type: 'CONNECTED', matchId }));
    });
  }

  broadcast(matchId, data) {
    const room = this.rooms.get(matchId);
    if (room) {
      const payload = JSON.stringify(data);
      room.forEach((client) => {
        if (client.readyState === 1) { // OPEN
          client.send(payload);
        }
      });
    }
  }
}

export default new WSHub();
