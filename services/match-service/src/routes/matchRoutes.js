import express from 'express';
import { getMatches, getMatchById } from '../controllers/matchController.js';

const router = express.Router();

router.get('/', getMatches);
router.get('/:id', getMatchById);

export default router;
