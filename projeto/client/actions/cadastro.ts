"use server";

import * as z from "zod";

import { CadastroSchema } from "@/schemas";

export const register = async (values: z.infer<typeof CadastroSchema>) => {
    const validatedFields = CadastroSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Campos inválidos!" };
    }

    return { success: "Bem vindo!" };
};
