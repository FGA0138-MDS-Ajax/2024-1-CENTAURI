'use client';

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CadastroSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import Select from "react-select";
import { CardWrapper } from "./card-register"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-sucess";
import { register } from "@/actions/cadastro";
import { Controller } from "react-hook-form";
import {redirect} from "next/navigation";

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
    { value: "Vitoria", label: "Vitoria" }
]


export const CadastroForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CadastroSchema>>({
        resolver: zodResolver(CadastroSchema),
        defaultValues: {
            time: "",
            usuario: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CadastroSchema>) => {
        const payload = {
            nome: values.usuario,
            email: values.email,
            time_favorito: values.time,
            senha: values.password
        };
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                if (data.error) {
                    setError(error);
                } else {
                    setSuccess("Cadastro realizado com sucesso!");
                    form.reset();
                    window.location.href = '/auth/login'
                }
            });
        });
    };


    return (
        <CardWrapper headerLabel="Cadastro" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                            onChange={(option) => field.onChange(option ? option.value : '')}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="usuario"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="usuário"
                                            type="text"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john.fanatico@exemplo.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
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
                        Finalizar Cadastro
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
