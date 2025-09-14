import { z } from 'zod';

export const CriarPartidaSchema = z.object ({
    data_hora: z.string().datetime({ message: "Data e hora devem estar no formato ISO 8601" }),
    local: z.string().min(3, { message: "Local deve ter no mínimo 3 caracteres"}),
    categoria: z.string().min(3, {message: "Categoria deve ter no mínimo 3 caracteres"}),
});

export const AtualizarPartidaSchema = CriarPartidaSchema;