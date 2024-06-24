import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email inválido"
    }),
    password: z.string().min(1, {
        message: "Senha inválida"
    }),
});

export const CadastroSchema = z.object({
    time: z.string(),
    usuario: z.string().min(2, {
        message: "Usuário inválido"
    }),
    email: z.string().email({
        message: "Email inválido"
    }),
    password: z.string().min(1, {
        message: "Senha inválida"
    }),
});