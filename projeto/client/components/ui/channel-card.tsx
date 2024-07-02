// Importação de React e da função `cn` para concatenação de classes CSS
import * as React from "react";
import { cn } from "@/lib/utils";

// Componente Card: cria um contêiner div que será a base do card
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow text-white bg-[#005B14]", // Estilos básicos do card
      className // Estilos adicionais passados via props
    )}
    {...props} // Outras propriedades passadas ao componente
  />
));
Card.displayName = "Card"; // Define um nome de exibição para o componente

// Componente CardTitle: cria um título H3 com estilos personalizados
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight min-h-[1.5rem]",
      className
    )}
    {...props} 
  />
));
CardTitle.displayName = "CardTitle";

// Componente CardContent: cria um contêiner div para o conteúdo do card com estilos personalizados
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> 
));
CardContent.displayName = "CardContent"; 

// Exporta os componentes para serem utilizados em outros locais do projeto
export { Card, CardTitle, CardContent };
