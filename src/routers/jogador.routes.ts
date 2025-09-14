import { Router } from 'express';
import {
    criarJogador,
    listarJogadores
} from '../controllers/jogador.controller';

const router = Router();

router.post('/jogadortes', criarJogador);
router.get('/jogadores', listarJogadores);

export default router;