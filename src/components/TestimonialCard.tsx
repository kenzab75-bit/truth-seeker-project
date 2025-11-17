import { Quote, ArrowUpRight, AlertCircle, DollarSign, HeartCrack } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "Complications":
        return {
          color: "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border-red-500/40",
          icon: HeartCrack,
          iconColor: "text-red-400"
        };
      case "Fraude":
        return {
          color: "bg-gradient-to-r from-orange-500/20 to-amber-600/20 text-orange-300 border-orange-500/40",
          icon: AlertCircle,
          iconColor: "text-orange-400"
        };
      case "Facturation":
        return {
          color: "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border-yellow-500/40",
          icon: DollarSign,
          iconColor: "text-yellow-400"
        };
      default:
        return {
          color: "bg-primary-red/20 text-primary-red border-primary-red/40",
          icon: AlertCircle,
          iconColor: "text-primary-red"
        };
    }
  };

  const categoryConfig = getCategoryConfig(testimonial.category);
  const CategoryIcon = categoryConfig.icon;
  
  // Générer des initiales pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Générer une couleur de fond basée sur le nom
  const getAvatarColor = (name: string) => {
    const colors = [
      "from-red-500 to-red-600",
      "from-orange-500 to-orange-600",
      "from-amber-500 to-amber-600",
      "from-yellow-500 to-yellow-600",
      "from-lime-500 to-lime-600",
      "from-emerald-500 to-emerald-600",
      "from-teal-500 to-teal-600",
      "from-cyan-500 to-cyan-600",
      "from-sky-500 to-sky-600",
      "from-blue-500 to-blue-600",
      "from-indigo-500 to-indigo-600",
      "from-violet-500 to-violet-600",
      "from-purple-500 to-purple-600",
      "from-fuchsia-500 to-fuchsia-600",
      "from-pink-500 to-pink-600",
      "from-rose-500 to-rose-600"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <article className="group relative bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-primary-red/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-red/20 animate-fade-in">
      {/* Tag catégorie - Position absolue en haut */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border backdrop-blur-md ${categoryConfig.color} shadow-lg`}>
          <CategoryIcon className={`h-3.5 w-3.5 ${categoryConfig.iconColor}`} />
          {testimonial.category}
        </div>
      </div>

      {/* Header avec avatar */}
      <div className="relative p-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          {/* Avatar avec initiales */}
          <div className={`relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(testimonial.author)} flex items-center justify-center text-white font-black text-xl shadow-lg ring-2 ring-white/10 group-hover:ring-primary-red/50 transition-all duration-300`}>
            {getInitials(testimonial.author)}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Info auteur */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground mb-1 truncate">
              {testimonial.author}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>

      {/* Corps du témoignage */}
      <div className="p-6">
        {/* Icône guillemets stylisée */}
        <div className="relative mb-4">
          <Quote className="h-10 w-10 text-primary-red/30 absolute -top-2 -left-2" />
        </div>
        
        {/* Citation - Style magazine */}
        <blockquote className="relative pl-4 border-l-2 border-primary-red/40">
          <p className="text-foreground/90 text-base leading-relaxed font-light italic group-hover:text-foreground transition-colors duration-300">
            "{testimonial.quote}"
          </p>
        </blockquote>
      </div>

      {/* Footer avec bouton */}
      <div className="px-6 pb-6">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-red/10 hover:bg-primary-red/20 border border-primary-red/30 hover:border-primary-red/50 text-primary-red hover:text-white font-semibold text-sm transition-all duration-300 group/btn">
          <span>Voir les détails</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </button>
      </div>

      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-red/0 via-primary-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
}
