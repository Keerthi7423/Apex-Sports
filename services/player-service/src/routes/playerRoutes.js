import express from 'express';
import Player from '../models/Player.js';
import { calculateCSPI, comparePlayers } from '../services/cspiEngine.js';

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    
    // Recalculate CSPI on the fly or return stored
    const currentCSPI = calculateCSPI(player);
    
    res.json({ ...player._doc, currentCSPI });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Comparison Endpoint: GET /cspi?a=:idA&b=:idB
router.get('/cspi', async (req, res) => {
  const { a, b } = req.query;
  
  if (!a || !b) {
    return res.status(400).json({ message: 'Both player IDs (a and b) are required' });
  }

  try {
    const playerA = await Player.findById(a);
    const playerB = await Player.findById(b);

    if (!playerA || !playerB) {
      return res.status(404).json({ message: 'One or both players not found' });
    }

    const comparison = comparePlayers(playerA, playerB);
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
