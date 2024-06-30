import { Router } from 'express';
import AuthRepository from '../repositories/auth.repository';
import {z} from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

const router = Router();

router.get('/v1/favorito/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const result = await AuthRepository.getFavoritoByUser(id);
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

router.post('/login', async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const user = await AuthRepository.login(validatedData.email, validatedData.password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;