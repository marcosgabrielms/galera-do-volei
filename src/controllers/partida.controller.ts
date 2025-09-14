import { Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'node:crypto';
import { Partida } from '../@types';
import { CriarPartidaSchema, AtualizarPartidaSchema } from '../schemas/partida.schema';

let partidas: Partida[] = [];

export const criarPartida = (req: Request, res: Response) => {
    try {
        const dados = CriarPartidaSchema.parse(req.body);
        const novaPartida: Partida = {
            id: crypto.randomUUID(),
            ...dados,
            status: 'Agendada',
            organizador_id: 'marcos-organizador-123'
        };
        partidas.push(novaPartida);
        return res.status(201).json(novaPartida);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json ({ errors: error.flatten().fieldErrors });
        }
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

export const listarPartidas = (req: Request, res: Response) => {
    return res.status(200).json(partidas);
};

export const buscarPartidaPorId = (req: Request, res: Response) => {
    const { partidaId } = req.params;
    const partida = partidas.find(p => p.id === partidaId);
    if (!partida) {
        return res.status(404).json({ message: "Partida não encontrada" });
    }
    return res.status(200).json(partida);
};


export const atualizarPartida = (req: Request, res: Response) => {
    try {
        const { partidaId } = req.params;
        const dados = AtualizarPartidaSchema.parse(req.body);

        // Primeiro, encontramos o objeto da partida que queremos atualizar
        const partidaOriginal = partidas.find(p => p.id === partidaId);

        // Se a partida não existir, retornamos o erro 404
        if (!partidaOriginal) {
            return res.status(404).json({ message: "Partida não encontrada" });
        }

        // Agora o TypeScript sabe que 'partidaOriginal' é um objeto Partida válido
        const partidaAtualizada: Partida = {
            ...partidaOriginal, // Espalhamos o objeto que já encontramos
            ...dados
        };

        // Encontramos o índice apenas para saber onde substituir no array
        const index = partidas.findIndex(p => p.id === partidaId);
        // Adicionamos uma verificação extra para o caso do índice não ser encontrado 
        if (index > -1) {
            partidas[index] = partidaAtualizada;
        }

        return res.status(200).json(partidaAtualizada);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.flatten().fieldErrors });
        }
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
