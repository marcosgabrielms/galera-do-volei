import express, { Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'node:crypto';

const app = express();
app.use(express.json());

// Interface corrigida para corresponder à lógica e à documentação
interface Partida {
    id: string;
    data_hora: string;
    local: string;
    categoria: string;
    status: 'Agendada' | 'Em Andamento' | 'Finalizada';
    organizador_id: string;
}

interface Jogador {
    id: string;
    nome: string;
    sexo: string;
    categoria_idade: string;
}

let partidas: Partida[] = [];
let jogadores: Jogador[] = [];

// ESQUEMAS DE VALIDAÇÃO
const CriarPartidaSchema = z.object({
    data_hora: z.string().datetime({ message: "Data e hora devem estar no formato ISO 8601" }),
    local: z.string().min(3, { message: "Local deve ter no mínimo 3 caracteres" }),
    categoria: z.string().min(3, { message: "Categoria deve ter no mínimo 3 caracteres" }),
});

const AtualizarPartidaSchema = CriarPartidaSchema;

const criarJogadorSchema = z.object({
    nome: z.string().min(3),
    sexo: z.string(),
    categoria_idade: z.string(),
});

// ROTAS PARA PARTIDAS

// [POST] /partidas - Criar uma nova partida (com a '/' corrigida)
app.post('/partidas', (req: Request, res: Response) => {
    try {
        const dados = CriarPartidaSchema.parse(req.body);

        // Agora o objeto novaPartida corresponde à interface Partida
        const novaPartida: Partida = {
            id: crypto.randomUUID(),
            data_hora: dados.data_hora,
            local: dados.local,
            categoria: dados.categoria,
            status: 'Agendada', // Usando o novo padrão
            organizador_id: 'user-organizador-123'
        };

        partidas.push(novaPartida);
        return res.status(201).json(novaPartida);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.flatten().fieldErrors });
        }
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// [GET] /partidas - Listar todas as partidas
app.get('/partidas', (req: Request, res: Response) => {
    return res.status(200).json(partidas);
});

// [GET] /partidas/:partidaId - Buscar Partida por ID (com o parâmetro corrigido)
app.get('/partidas/:partidaId', (req: Request, res: Response) => {
    const { partidaId } = req.params;
    const partida = partidas.find(p => p.id === partidaId);

    if (!partida) {
        return res.status(404).json({ message: "Partida não encontrada." });
    }

    return res.status(200).json(partida);
});

// [PUT] /partidas/:partidaId - Atualizar Partida
app.put('/partidas/:partidaId', (req: Request, res: Response) => {
    try {
        const { partidaId } = req.params;
        const dados = AtualizarPartidaSchema.parse(req.body);
        const indexPartida = partidas.findIndex(p => p.id === partidaId);

        if (indexPartida === -1) {
            return res.status(404).json({ message: "Partida não encontrada." });
        }

        const partidaAtualizada: Partida = {
            ...partidas[indexPartida],
            data_hora: dados.data_hora,
            local: dados.local,
            categoria: dados.categoria
        };
        partidas[indexPartida] = partidaAtualizada;

        return res.status(200).json(partidaAtualizada);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.flatten().fieldErrors });
        }
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// ROTAS PARA JOGADORES
app.post('/jogadores', (req: Request, res: Response) => {
    try {
        const dados = criarJogadorSchema.parse(req.body);
        const novoJogador: Jogador = {
            id: crypto.randomUUID(),
            ...dados
        };
        jogadores.push(novoJogador);
        return res.status(201).json(novoJogador);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.flatten().fieldErrors });
        }
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
});

app.get('/jogadores', (req: Request, res: Response) => {
    return res.status(200).json(jogadores);
});

// INÍCIO DO SERVIDOR
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`🏐 Servidor "Galera do Vôlei" rodando na porta ${PORT}!`);
});