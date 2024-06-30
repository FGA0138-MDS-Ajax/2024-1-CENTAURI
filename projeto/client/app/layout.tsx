import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from '@/components/ClientSessionProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Onde é o jogo",
    description: "Listagem dos canais de trasmissão dos jogos dos campeonatos Libertadores e Brasileirão",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
        <body className={inter.className}>
        <ClientSessionProvider>{children}</ClientSessionProvider>
        </body>
        </html>
    );
}
