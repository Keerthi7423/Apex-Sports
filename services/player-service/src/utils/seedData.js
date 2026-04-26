import Player from '../models/Player.js';
import { calculateCSPI } from '../services/cspiEngine.js';

const mockPlayers = [
  {
    name: "Lionel Messi",
    team: "Inter Miami",
    sport: "Football",
    position: "Forward",
    attributes: {
      pace: 85,
      shooting: 92,
      passing: 95,
      dribbling: 98,
      defending: 35,
      physical: 65
    },
    form: [
      { rating: 8.5 },
      { rating: 9.0 },
      { rating: 8.8 }
    ],
    careerStats: {
      matches: 850,
      goals: 750,
      assists: 350
    }
  },
  {
    name: "Cristiano Ronaldo",
    team: "Al Nassr",
    sport: "Football",
    position: "Forward",
    attributes: {
      pace: 88,
      shooting: 94,
      passing: 82,
      dribbling: 85,
      defending: 30,
      physical: 85
    },
    form: [
      { rating: 8.2 },
      { rating: 8.5 },
      { rating: 8.0 }
    ],
    careerStats: {
      matches: 1000,
      goals: 850,
      assists: 200
    }
  },
  {
    name: "LeBron James",
    team: "LA Lakers",
    sport: "Basketball",
    position: "Forward",
    attributes: {
      pace: 90,
      shooting: 85,
      passing: 92,
      dribbling: 88,
      defending: 85,
      physical: 95
    },
    form: [
      { rating: 9.2 },
      { rating: 8.8 },
      { rating: 9.5 }
    ],
    careerStats: {
      matches: 1400,
      goals: 40000, // Points in basketball context
      assists: 10000
    }
  }
];

export const seedPlayers = async () => {
  try {
    const count = await Player.countDocuments();
    if (count === 0) {
      // Calculate initial CSPI for each mock player
      const playersWithCSPI = mockPlayers.map(p => ({
        ...p,
        cspiScore: calculateCSPI(p)
      }));
      
      await Player.insertMany(playersWithCSPI);
      console.log('✅ Player Seed Data Inserted');
    }
  } catch (error) {
    console.error('❌ Error seeding players:', error);
  }
};
