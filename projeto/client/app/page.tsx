import { Bebas_Neue } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import { CadastroButton } from '@/components/auth/cadastro-button';

const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#004B14]">
      <main className="flex flex-grow">
        {/* Coluna da Esquerda */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="space-y-6 text-center">
            <h1
              className={cn(
                'text-6xl text-white',
                font.className
              )}
            >
              Onde é o jogo?
            </h1>
            <p className="text-lg text-white pl-10">
              Pare de se perguntar onde o jogo do seu time favorito será transmitido! Descubra agora, de forma rápida e fácil, 
              em nosso site que lista todos os canais de transmissão para você não perder nenhum lance.
            </p>
            <p>
              
            </p>
            <CadastroButton>
              <Button className="bg-[#22eb4d6b] text-white" size="lg">
                Cadastre-se
              </Button>
            </CadastroButton>
          </div>
        </div>
        {/* Coluna da Direita */}
        <div className="flex flex-col items-start justify-center w-1/2 relative">
          <div className="absolute top-6 right-6">
            <LoginButton>
              <Button className="bg-[#267236] text-white" size="lg">
                Entrar
              </Button>
            </LoginButton>
          </div>
          <img src="/faixa.png" alt="faixa" className="max-w-full h-screen px-40 object-cover" />
        </div>
      </main>
    </div>
  );
}
