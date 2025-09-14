import { Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'node:crypto';
import { Jogador } from '../@types';
import { CriarJogadorSchema } from '../schemas/jogador.schema';

let jogadores: Jogador[] = []; // Temporariamente, os dados ficam em memória.

export const criarJogador = (req: Request, res: Response) => {
    try {
        const dados = CriarJogadorSchema.parse(req.body);
        const novoJogador: Jogador = {
            id: crypto.randomUUID(),
            ...dados
        };
        jogadores.push(novoJogador);
        return res.status(201).json(novoJogador);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json ({ errors: error.flatten().fieldErrors });
        }
        return res.status(500).json ({ message: "Erro interno do servidor;" });
    }
};

export const listarJogadores = (req: Request, res: Response) => {
    return res.status(200).json(jogadores);
};
