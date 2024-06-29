import { Router } from 'express';
import {createUsuarioSchema} from '../schemas/auth.schema';
import AuthRepository from '../repositories/auth.repository';

const router = Router();

router.get('/v1/favorito', async (req, res) => {
    const favoritoJson = {
        "favorito": "Palmeiras"
    }
    res.send(favoritoJson);
});

router.post('/register', async(req, res) => {
    const user = createUsuarioSchema.parse(req.body);
    try{
        const result = await AuthRepository.registerUser(user);
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
})

export default router;