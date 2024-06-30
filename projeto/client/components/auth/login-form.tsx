'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-sucess";

export const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            console.log('Submitting data:', data);
            signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            }).then((response) => {
                console.log('SignIn response:', response);
                if (response?.error) {
                    setError(response.error);
                } else {
                    setSuccess("Login successful!");
                    router.push('/home');
                }
            }).catch((err) => {
                console.error('SignIn error:', err);
                setError("An unexpected error occurred");
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Login"
            backButtonLabel="Não tem uma conta?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
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
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        type="submit"
                        className="bg-[#005B14] w-full"
                        disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
