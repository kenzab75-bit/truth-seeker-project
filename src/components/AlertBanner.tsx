import { AlertTriangle } from "lucide-react";

const AlertBanner = () => {
  return (
    <div className="fixed top-20 left-0 right-0 z-40 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="glass-card rounded-2xl border-2 border-primary-red/30 p-6 hover-lift group relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-primary-red/10 to-primary-red/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative flex items-center gap-4">
            {/* Alert badge */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-primary-red to-dark-red px-4 py-2 rounded-full flex items-center gap-2 pulse-glow">
                <AlertTriangle className="h-4 w-4 text-white animate-pulse" />
                <span className="text-white font-bold text-sm tracking-wider">ALERTE</span>
              </div>
            </div>
            
            {/* Message */}
            <div className="flex-1">
              <p className="text-foreground font-semibold text-base lg:text-lg leading-relaxed">
                Révélations exclusives sur les pratiques de la clinique LEMA DENTAL à Istanbul
              </p>
            </div>
          </div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary-red/20 animate-pulse pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
