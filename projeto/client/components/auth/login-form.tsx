'use client';

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { login } from "@/actions/login";

export const LoginForm = () => {
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

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    }

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
                    <div className="sapace-y-4">
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
                    <FormError message=""/>
                    <FormSuccess message=""/>
                    <Button
                        type="submit"
                        className="bg-[#005B14] w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
