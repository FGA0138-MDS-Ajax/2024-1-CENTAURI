import {z} from 'zod';

export const createUsuarioSchema = z.object({
    nome: z.string().max(60),
    email: z.string().max(100),
    time_favorito: z.string().max(30),
    senha: z.string().min(6),
});

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;