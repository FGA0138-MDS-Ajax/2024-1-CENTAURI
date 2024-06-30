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
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/a/a2/Logo_Premiere_FC_2018.png/1200px-Logo_Premiere_FC_2018.png"
        alt="Premiere"
        width={200}
        height={200}
      />
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Premiere
        </h1>
        <p className="text-lg text-black">
          Os próximos jogos transmitidos por essa emissora
        </p>
      </div>
    </main>
  );
}
