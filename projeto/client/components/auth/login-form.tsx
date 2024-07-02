//a página de registro/cadastro segue a mesma lógica
'use client'; // Declaração para identificar este arquivo como um componente do lado do cliente

import * as z from "zod"; // Importa a biblioteca zod para validação de esquemas
import { useState, useTransition } from "react"; // Importa hooks do React
import { useForm } from "react-hook-form"; // Importa a biblioteca react-hook-form para manipulação de formulários
import { zodResolver } from "@hookform/resolvers/zod"; // Importa o resolver zod para integração com react-hook-form
import { signIn } from 'next-auth/react'; // Importa a função signIn da biblioteca next-auth para autenticação
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação

import { LoginSchema } from "@/schemas"; // Importa o esquema de validação do formulário de login
import { Input } from "@/components/ui/input"; // Importa o componente de input personalizado
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Importa componentes de formulário personalizados

import { CardWrapper } from "./card-wrapper"; // Importa o componente de contêiner do cartão
import { Button } from "@/components/ui/button"; // Importa o componente de botão personalizado
import { FormError } from "@/components/form-error"; // Importa o componente de mensagem de erro de formulário
import { FormSuccess } from "@/components/form-sucess"; // Importa o componente de mensagem de sucesso de formulário

// Componente funcional LoginForm
export const LoginForm = () => {
    const router = useRouter(); // Inicializa o hook useRouter para navegação
    const [error, setError] = useState<string | undefined>(""); // Define o estado para armazenar mensagens de erro
    const [success, setSuccess] = useState<string | undefined>(""); // Define o estado para armazenar mensagens de sucesso
    const [isPending, startTransition] = useTransition(); // Define o estado de transição para gerenciar estados de carregamento

    // Inicializa o formulário com react-hook-form e zod para validação
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Função assíncrona para manipular o envio do formulário
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError(undefined); // Limpa o estado de erro
        setSuccess(undefined); // Limpa o estado de sucesso

        startTransition(() => {
            // Chama a função signIn para autenticação
            signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            }).then((response) => {
                if (response?.error) {
                    setError(response.error); // Define a mensagem de erro se a autenticação falhar
                } else {
                    setSuccess("Login successful!"); // Define a mensagem de sucesso se a autenticação for bem-sucedida
                    router.push('/home'); // Redireciona o usuário para a página inicial
                }
            }).catch((err) => {
                console.error('SignIn error:', err);
                setError("An unexpected error occurred"); // Define uma mensagem de erro genérica em caso de falha
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Login" // Rótulo do cabeçalho do cartão
            backButtonLabel="Não tem uma conta?" // Rótulo do botão de voltar
            backButtonHref="/auth/register" // Link para a página de registro
            showSocial // Prop para exibir botões de login social
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)} // Manipulador de envio do formulário
                    className="space-y-6" // Classe Tailwind para espaçamento
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
                    <FormError message={error}/> // Componente para exibir mensagens de erro
                    <FormSuccess message={success}/> // Componente para exibir mensagens de sucesso
                    <Button
                        type="submit"
                        className="bg-[#005B14] w-full" // Classe Tailwind para estilização do botão
                        disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'} // Texto do botão dependendo do estado de carregamento
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
