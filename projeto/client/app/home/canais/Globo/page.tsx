import React from "react";
import { Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <img
        src="https://seeklogo.com/images/R/rede-globo-2022-logo-B63B368B27-seeklogo.com.png?v=638252803310000000"
        alt="Globo"
        width={100}
        height={100}
      />
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Globo
        </h1>
        <p className="text-lg text-black">
          Os próximos jogos transmitidos por essa emissora
        </p>
      </div>
    </main>
  );
}
