import express from 'express';
import { generateStreamingResponse } from '../services/ollamaService.js';
import { buildSportsContext } from '../services/contextBuilder.js';

const router = express.Router();

/**
 * Ask AI Endpoint (Streaming)
 * POST /api/ai/ask
 */
router.post('/ask', async (req, res) => {
  const { query, data } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const prompt = buildSportsContext(query, data);
    
    await generateStreamingResponse(prompt, (token) => {
      if (token === '[DONE]') {
        res.write('event: end\ndata: [DONE]\n\n');
        res.end();
      } else {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    });

  } catch (error) {
    console.error('AI Stream Error:', error.message);
    res.write(`event: error\ndata: ${JSON.stringify({ message: error.message })}\n\n`);
    res.end();
  }
});

export default router;
