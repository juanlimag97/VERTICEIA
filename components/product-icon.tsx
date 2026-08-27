import { Sparkles, UserRound, Star, Clapperboard, BookOpen } from "lucide-react";

export function ProductIcon({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  switch (productId) {
    case "vertice-ia":
      return <Sparkles className={className} />;
    case "perfil-que-converte":
      return <UserRound className={className} />;
    case "reputacao-5-estrelas":
      return <Star className={className} />;
    case "formatos-de-criativo":
      return <Clapperboard className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
