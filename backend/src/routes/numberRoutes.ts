import { Router } from 'express';
import { getRandomNumbers } from '../services/numberService';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/numbers', authenticateToken, async (req, res) => {
    const { start, end } = req.query;
    const numbers = await getRandomNumbers(Number(start), Number(end));
    res.json(numbers);
});

export default router;
