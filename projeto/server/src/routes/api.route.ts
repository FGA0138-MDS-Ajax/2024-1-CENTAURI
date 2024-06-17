import { Router } from 'express';
import GameRepository from '../repositories/api.repository';

const router = Router();

router.get('/v1/update-games', async (req, res) => {
    try {
        await GameRepository.updateGames();
        res.status(200).send('Games updated successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
