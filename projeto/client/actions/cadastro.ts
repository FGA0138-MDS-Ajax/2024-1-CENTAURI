// actions/cadastro.ts

import * as z from "zod";
import { CadastroSchema } from "@/schemas";

export const register = async (values: z.infer<typeof CadastroSchema>) => {
    const validatedFields = CadastroSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" };
    }

    try {
        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedFields.data)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Falha ao registrar');
        }

        return { success: "Bem-vindo!", user: data };
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return { error: error || 'Erro ao conectar com o servidor' };
    }
};
