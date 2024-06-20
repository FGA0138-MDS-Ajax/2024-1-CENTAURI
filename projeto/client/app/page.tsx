import { Bebas_Neue } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';

const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#267236]">
      <main className="flex flex-grow">
        {/* Coluna da Esquerda */}
        <div className="flex flex-col items-center justify-center w-1/2 relative">
          <div className="space-y-6 text-center">
            <img src="/logo.png" alt="logo do site" className="mx-auto w-32 h-auto mb-6" />
            <h1
              className={cn(
                'text-6xl text-white',
                font.className
              )}
            >
              Onde é o jogo?
            </h1>
            <p className="text-lg text-white">
              Pare de se perguntar onde o jogo do seu time favorito será transmitido! Descubra agora, de forma rápida e fácil, 
              em nosso site que lista todos os canais de transmissão para você não perder nenhum lance.
            </p>
            <p>
              
            </p>
            <LoginButton>
              <Button className="bg-[#22eb4d6b] text-white" size="lg">
                Cadastre-se
              </Button>
            </LoginButton>
          </div>
        </div>
        {/* Coluna da Direita */}
        <div className="flex flex-col items-center justify-center w-1/2 relative">
          <div className="absolute top-6 right-6">
            <LoginButton>
              <Button className="bg-[#267236] text-white" size="lg">
                Entrar
              </Button>
            </LoginButton>
          </div>
          <img src="/jogador.png" alt="arte do CR7" className="max-w-full h-auto" />
        </div>
      </main>
    </div>
  );
}
