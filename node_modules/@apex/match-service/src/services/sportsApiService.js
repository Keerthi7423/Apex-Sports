import axios from 'axios';
import PQueue from 'p-queue';

// Rate limiting outbound API calls (e.g., 2 calls per second for free tiers)
const queue = new PQueue({ concurrency: 2, interval: 1000 });

class SportsApiService {
  constructor() {
    this.apiKey = process.env.SPORTS_API_KEY;
    this.baseUrl = 'https://api-football-v1.p.rapidapi.com/v3';
  }

  async fetchLiveScores() {
    return queue.add(async () => {
      try {
        // In a real app, you would call the external API here
        // const response = await axios.get(`${this.baseUrl}/fixtures?live=all`, {
        //   headers: { 'X-RapidAPI-Key': this.apiKey }
        // });
        // return response.data.response;

        // Mocking for development
        console.log('Fetching live scores from external API (Mock)...');
        return [
          {
            fixture: { id: 'm1' },
            goals: { home: Math.floor(Math.random() * 3), away: Math.floor(Math.random() * 3) },
            status: { elapsed: 75, long: 'Live' }
          }
        ];
      } catch (error) {
        console.error('Error fetching live scores:', error.message);
        return [];
      }
    });
  }

  async fetchMatchDetails(matchId) {
    return queue.add(async () => {
      try {
        // Real API call logic would go here
        return { id: matchId, status: 'Live' };
      } catch (error) {
        console.error(`Error fetching match ${matchId}:`, error.message);
        return null;
      }
    });
  }
}

export default new SportsApiService();
