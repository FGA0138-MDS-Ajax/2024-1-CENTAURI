import {z} from 'zod';

export const createUsuarioSchema = z.object({
    nome: z.string().max(60),
    email: z.string().max(100),
    time_favorito: z.string().max(30),
    senha: z.string().min(6),
});

export const userSchema = z.object({
    id: z.number(),
    nome: z.string().max(60),
    email: z.string().max(100),
    time_favorito: z.string().max(30),
    senha_hash: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type User = z.infer<typeof userSchema>;

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;