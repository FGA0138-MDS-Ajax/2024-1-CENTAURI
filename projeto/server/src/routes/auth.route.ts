import { Router } from 'express';

const router = Router();

router.get('/v1/favorito', async (req, res) => {
    const favoritoJson = {
        "favorito": "Palmeiras"
    }
    res.send(favoritoJson);
});

export default router;