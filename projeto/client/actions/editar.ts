import * as z from "zod";
import { SettingsSchema } from "@/schemas";

export const editar = async (values: z.infer<typeof SettingsSchema>) => {
    const validatedFields = SettingsSchema.safeParse(values);
    console.log(validatedFields);
    if (!validatedFields.success) {
        return { error: validatedFields.error };
    }

    try {
        const response = await fetch('http://localhost:8000/auth/editar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedFields.data)
        });
        return response.json();
    }
    catch (error) {
        console.error('Erro durante a edição:', error);
        return { error: error || 'Erro ao conectar com o servidor' };
    }
};