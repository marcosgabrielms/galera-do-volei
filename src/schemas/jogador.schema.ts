import { z } from 'zod';

export const CriarJogadorSchema = z.object ({
    nome: z.string().min(3),
    sexo: z.string(),
    categoria_idade: z.string(),
});