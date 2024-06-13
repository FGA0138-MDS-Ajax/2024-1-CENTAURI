import { Bebas_Neue } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Navbar from "@/components/Navbar";

const font = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-custom-gradient">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="space-y-6 text-center">
          <h1
            className={cn(
              "text-6xl font-semibold text-white drop-shadow-md",
              font.className
            )}
          >
            Onde é o jogo?
          </h1>
          <p className="text-lg text-black">
            Chega de ficar se perguntando onde o jogo do seu time favorito será transmitido
          </p>
          <LoginButton>
            <Button variant="secondary" size="lg" className="mt-6">
              Entrar
            </Button>
          </LoginButton>
        </div>
      </main>
    </div>
  );
}
