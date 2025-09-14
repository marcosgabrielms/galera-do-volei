import { Router } from 'express';
import {
    criarPartida,
    listarPartidas,
    buscarPartidaPorId,
    atualizarPartida
} from '../controllers/partida.controller';

const router = Router();

router.post('/partidas', criarPartida);
router.get('/partidas', listarPartidas);
router.get('/partidas/:partidaId', buscarPartidaPorId);
router.put('/partidas/:partidaId', atualizarPartida);

export default router;