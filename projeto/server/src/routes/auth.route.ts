import { Router } from 'express';
import {createUsuarioSchema} from '../schemas/auth.schema';
import AuthRepository from '../repositories/auth.repository';

const router = Router();

router.get('/v1/favorito', async (req, res) => {
    try{
        const result = await AuthRepository.getFavoritoByUser(req.query.email as string);
        res.send(result);
    }
    catch(err) {
        res.status(400).send(err);
    }
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
});

router.post('/login', async(req, res) => {
    try {
        const results = await AuthRepository.login(req.body.email, req.body.senha);

        if (results === undefined || results === null) {
            res.status(401).send('Invalid email or password');
        } else {
            res.send(results);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});


export default router;