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

router.get('/v1/games', async (req, res) => {
    try {
        const games = await GameRepository.getGames();
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/v1/games/:time', async (req, res) => {
    try {
        const games = await GameRepository.getGamesByTime(req.params.time);
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/v2/games/:channel', async (req, res) => {
    try {
        const games = await GameRepository.getGamesByChannel(req.params.channel);
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/v3/games/:campeonato', async (req, res) => {
    try {
        const games = await GameRepository.getGamesByCampeonato(req.params.campeonato);
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/v4/games/:quantidade', async (req, res) => {
    try {
        const games = await GameRepository.getGamesByQuantidade((req.params.quantidade));
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/v1/rodada' , async (req, res) => {
    try {
        const rodada = await GameRepository.getRodada();
        const rodadaJson = JSON.stringify(rodada);
        res.send(rodadaJson);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/v1/games/brasileirao/:favorito', async (req, res) => {
    try {
        const games = await GameRepository.getGamesBrasileiraoByFavorito(req.params.favorito);
        res.send(games);
    } catch (error) {
        res.status(500).send(error)
        }
});

router.get('/v1/games/liberta/:favorito', async (req, res) => {
    try {
        const games = await GameRepository.getGamesLibertaByFavorito(req.params.favorito);
        res.send(games);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/v1/canais', async (req, res) => {
    try {
        const canais = await GameRepository.getCanais();
        res.send(canais);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
