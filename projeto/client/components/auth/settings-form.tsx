'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Select from "react-select";
import { CardWrapper } from "./card-register";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-sucess";
import { useSession } from "next-auth/react";
import { editar } from "@/actions/editar";

const TimeSelect = [
    { value: "America_Mineiro", label: "America Mineiro" },
    { value: "Atletico_Goianiense", label: "Atletico Goianiense" },
    { value: "Atletico_Mineiro", label: "Atletico Mineiro" },
    { value: "Atletico_Paranaense", label: "Atletico Paranaense" },
    { value: "Bahia", label: "Bahia" },
    { value: "Botafogo", label: "Botafogo" },
    { value: "Bragantino", label: "Bragantino" },
    { value: "Corinthians", label: "Corinthians" },
    { value: "Criciuma", label: "Criciuma" },
    { value: "Cruzeiro", label: "Cruzeiro" },
    { value: "Cuiaba", label: "Cuiaba" },
    { value: "Flamengo", label: "Flamengo" },
    { value: "Fluminense", label: "Fluminense" },
    { value: "Fortaleza", label: "Fortaleza" },
    { value: "Gremio", label: "Gremio" },
    { value: "Internacional", label: "Internacional" },
    { value: "Juventude", label: "Juventude" },
    { value: "Palmeiras", label: "Palmeiras" },
    { value: "Sao_Paulo", label: "Sao Paulo" },
    { value: "Vasco", label: "Vasco" },
    { value: "Vitoria", label: "Vitoria" },
];

export const SettingsForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const id = session?.user?.id;

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            time: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
        console.log('onSubmit called with values:', values);
        if (id === undefined) {
            setError("ID do usuário não encontrado");
            return;
        }
        const payload = {
            id: id,
            time: values.time,
        };
        console.log('Payload:', payload);
        setError("");
        setSuccess("");

        startTransition(async () => {
            try {
                const data = await editar(payload);
                console.log('Response from editar:', data);
                if (data.error) {
                    setError(data.error.message || 'Erro desconhecido');
                } else {
                    setSuccess("Mudança de time realizada com sucesso!");
                    form.reset();
                    window.location.href = '/home';
                }
            } catch (error) {
                setError('Erro ao editar: ' + error);
            }
        });
    };

    return (
        <CardWrapper headerLabel="Altere seu perfil">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormItem>
                        <input type="hidden" name="id" value={id} />
                    </FormItem>
                    <div className="space-y-4">
                        <Controller
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            options={TimeSelect}
                                            value={TimeSelect.find(option => option.value === field.value)}
                                            onChange={(option) => {
                                                field.onChange(option ? option.value : '');
                                                console.log('Selected time:', option?.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="bg-[#005B14] w-full">
                        Salvar
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
