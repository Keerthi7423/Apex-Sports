import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  team: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    enum: ['Football', 'Basketball', 'Cricket'],
    required: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  attributes: {
    pace: { type: Number, default: 0 },
    shooting: { type: Number, default: 0 },
    passing: { type: Number, default: 0 },
    dribbling: { type: Number, default: 0 },
    defending: { type: Number, default: 0 },
    physical: { type: Number, default: 0 }
  },
  form: [
    {
      matchId: String,
      rating: Number,
      date: { type: Date, default: Date.now }
    }
  ],
  careerStats: {
    matches: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    cleanSheets: { type: Number, default: 0 }
  },
  cspiScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
