import Match from '../models/Match.js';

// @desc    Get all matches
// @route   GET /api/matches
// @access  Public
export const getMatches = async (req, res) => {
  try {
    const { status, league } = req.query;
    const query = {};
    
    if (status) query.status = status.toLowerCase(); // Adjusted for lowercase enums in schema
    if (league) query.league = league;

    const matches = await Match.find(query).sort({ kickoff: 1 }); // Sorted by kickoff
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get match by ID
// @route   GET /api/matches/:id
// @access  Public
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: 'Match not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
