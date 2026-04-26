import { createClient } from 'redis';

class RedisPublisher {
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    
    // Connect to Redis
    this.connect();
  }

  async connect() {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
        console.log('✅ Match Service connected to Redis for Events');
      }
    } catch (error) {
      console.error('Failed to connect to Redis:', error.message);
    }
  }

  async publishMatchEvent(event) {
    try {
      if (!this.client.isOpen) await this.connect();
      
      console.log(`Publishing to match-events: ${event.type} for match ${event.matchId}`);
      
      // Standard Redis Pub/Sub
      await this.client.publish('match-events', JSON.stringify(event));
    } catch (error) {
      console.error('Failed to publish match event:', error.message);
    }
  }
}

export default new RedisPublisher();
