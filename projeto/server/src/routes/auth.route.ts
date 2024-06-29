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
    const userData = {
        nome: req.body.usuario,
        email: req.body.email,
        time_favorito: req.body.time,
        senha: req.body.password
    };
    console.log(userData);
    try{
        const result = await AuthRepository.registerUser(userData);
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