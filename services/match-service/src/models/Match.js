import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'goal', 'card', 'substitution'
  time: { type: String, required: true }, // e.g., "45+2'"
  player: { type: String },
  team: { type: String },
  detail: { type: String }
}, { _id: false });

const statSchema = new mongoose.Schema({
  possession: {
    home: { type: Number, default: 50 },
    away: { type: Number, default: 50 }
  },
  shots: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  },
  shotsOnTarget: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  },
  corners: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  },
  passes: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  }
}, { _id: false });

const matchSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // External API match ID
  sport: { type: String, default: 'Soccer' },
  league: { type: String, required: true },
  homeTeam: {
    id: { type: String },
    name: { type: String, required: true },
    logo: { type: String },
    color: { type: String }
  },
  awayTeam: {
    id: { type: String },
    name: { type: String, required: true },
    logo: { type: String },
    color: { type: String }
  },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
    ht: { type: String } // Half-time score e.g., "1-0"
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'finished', 'postponed'],
    default: 'upcoming'
  },
  kickoff: { type: Date, required: true },
  currentTime: { type: String }, // e.g., "75'"
  venue: { type: String },
  stats: statSchema,
  events: [eventSchema],
  momentum: [Number], // Array of numbers per minute
  fetchedAt: { type: Date, default: Date.now, expires: 15 } // TTL index: expire after 15 seconds
}, {
  timestamps: true,
  _id: false // Disable auto-generation of _id since we provide our own
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
