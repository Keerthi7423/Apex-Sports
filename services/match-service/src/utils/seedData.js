import Match from '../models/Match.js';

const mockMatches = [
  {
    _id: 'm1',
    sport: 'Soccer',
    league: 'Premier League',
    homeTeam: { id: 't1', name: 'Manchester City', logo: 'https://example.com/mc.png', color: '#6CABDD' },
    awayTeam: { id: 't2', name: 'Arsenal', logo: 'https://example.com/ars.png', color: '#EF0107' },
    score: { home: 2, away: 1, ht: '1-0' },
    status: 'live',
    kickoff: new Date(),
    currentTime: "75'",
    venue: 'Etihad Stadium',
    stats: {
      possession: { home: 62, away: 38 },
      shots: { home: 12, away: 5 },
      shotsOnTarget: { home: 5, away: 2 },
      corners: { home: 8, away: 3 },
      passes: { home: 450, away: 280 }
    },
    events: [
      { type: 'goal', time: "12'", player: 'Erling Haaland', team: 'Manchester City', detail: 'Assist by De Bruyne' },
      { type: 'card', time: "42'", player: 'Bukayo Saka', team: 'Arsenal', detail: 'Yellow Card' },
      { type: 'goal', time: "55'", player: 'Gabriel Martinelli', team: 'Arsenal', detail: 'Unassisted' },
      { type: 'goal', time: "68'", player: 'Kevin De Bruyne', team: 'Manchester City', detail: 'Free kick' }
    ],
    momentum: [10, 20, 15, -5, -10, 5, 30, 45, 10, -5],
    fetchedAt: new Date()
  },
  {
    _id: 'm2',
    sport: 'Soccer',
    league: 'La Liga',
    homeTeam: { id: 't3', name: 'Real Madrid', logo: 'https://example.com/rm.png', color: '#FFFFFF' },
    awayTeam: { id: 't4', name: 'Barcelona', logo: 'https://example.com/bar.png', color: '#004D98' },
    score: { home: 0, away: 0 },
    status: 'upcoming',
    kickoff: new Date(Date.now() + 3600000), // In 1 hour
    venue: 'Santiago Bernabéu',
    stats: {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      passes: { home: 0, away: 0 }
    },
    events: [],
    momentum: [],
    fetchedAt: new Date()
  },
  {
    _id: 'm3',
    sport: 'Soccer',
    league: 'Premier League',
    homeTeam: { id: 't5', name: 'Liverpool', logo: 'https://example.com/liv.png', color: '#C8102E' },
    awayTeam: { id: 't6', name: 'Chelsea', logo: 'https://example.com/che.png', color: '#034694' },
    score: { home: 3, away: 0, ht: '2-0' },
    status: 'finished',
    kickoff: new Date(Date.now() - 86400000), // Yesterday
    venue: 'Anfield',
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 15, away: 8 },
      shotsOnTarget: { home: 7, away: 2 },
      corners: { home: 6, away: 4 },
      passes: { home: 380, away: 310 }
    },
    events: [
      { type: 'goal', time: "22'", player: 'Mo Salah', team: 'Liverpool' },
      { type: 'goal', time: "45+1'", player: 'Darwin Nunez', team: 'Liverpool' },
      { type: 'goal', time: "88'", player: 'Luis Diaz', team: 'Liverpool' }
    ],
    momentum: [5, 10, 15, 20, 25, 30, 25, 20, 35, 40],
    fetchedAt: new Date()
  }
];

export const seedMatches = async () => {
  try {
    const count = await Match.countDocuments();
    if (count === 0) {
      await Match.insertMany(mockMatches);
      console.log('Mock matches seeded successfully');
    } else {
      console.log('Matches already exist, skipping seed');
    }
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
  }
};
