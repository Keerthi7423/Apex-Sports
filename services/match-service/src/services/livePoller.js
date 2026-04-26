import cron from 'node-cron';
import sportsApiService from './sportsApiService.js';
import wsHub from './wsHub.js';
import redisPublisher from './redisPublisher.js';
import Match from '../models/Match.js';

class LivePoller {
  constructor() {
    this.isPolling = false;
  }

  start() {
    console.log('Live Score Poller started (Every 15 seconds)');
    
    // Poll every 15 seconds
    cron.schedule('*/15 * * * * *', async () => {
      if (this.isPolling) return;
      
      this.isPolling = true;
      try {
        const liveData = await sportsApiService.fetchLiveScores();
        
        for (const update of liveData) {
          const matchId = update.fixture.id;
          
          // 1. Update MongoDB
          const match = await Match.findByIdAndUpdate(
            matchId,
            { 
              score: update.goals,
              status: update.status.long.toLowerCase(),
              fetchedAt: new Date()
            },
            { new: true, upsert: false } // Only update existing matches
          );


          if (match) {
            // 2. Broadcast via WebSockets
            wsHub.broadcast(matchId, {
              type: 'SCORE_UPDATE',
              matchId,
              score: update.goals,
              status: update.status
            });

            // 3. Detect Goals and notify via Redis
            // (Simple logic: if score changed, publish event)
            // This is a placeholder for more complex diffing logic
            if (update.goals.home > 0 || update.goals.away > 0) {
               await redisPublisher.publishMatchEvent({
                 type: 'GOAL',
                 matchId,
                 score: update.goals,
                 timestamp: new Date()
               });
            }
          }
        }
      } catch (error) {
        console.error('Polling Error:', error.message);
      } finally {
        this.isPolling = false;
      }
    });
  }
}

export default new LivePoller();
