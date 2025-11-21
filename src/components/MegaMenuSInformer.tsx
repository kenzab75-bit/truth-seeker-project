import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronDown, FileText, Quote, ShieldCheck } from "lucide-react";

interface MegaMenuSInformerProps {
  scrollToSection: (id: string) => void;
}

const MegaMenuSInformer = ({ scrollToSection }: MegaMenuSInformerProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 text-[#E0E0E0] font-medium px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
      >
        S'informer
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180 -translate-y-px" : ""}`} />
      </button>

      <div
        className={`absolute right-0 mt-3 w-[min(94vw,940px)] max-w-5xl origin-top-right transition-all duration-300 ease-out ${open ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 -translate-y-2"}`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-[#0c0202] to-[#150000] shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(255,77,77,0.12),transparent_40%)] pointer-events-none" />
          <div className="p-6 lg:p-8 relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Colonne de navigation */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-red-300/80">
                <ShieldCheck className="h-4 w-4 text-red-300" />
                <span>Orientation</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 lg:p-5 shadow-inner shadow-black/30">
                <p className="text-xs uppercase tracking-[0.18em] text-red-200/70 mb-3">Droits &amp; information</p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => handleNavigate("victimes")}
                    className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    <span>Leurs méthodes</span>
                    <AlertTriangle className="h-4 w-4 text-red-300" />
                  </button>
                  {[
                    "L'appat",
                    "Le piège",
                    "L'impasse",
                    "La vérité",
                  ].map(item => (
                    <button
                      key={item}
                      onClick={() => handleNavigate("victimes")}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavigate("temoignages")}
                  className="group w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-left text-white hover:border-red-300/50 hover:bg-red-500/10 transition-all duration-200"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-red-200/70">Témoignages</p>
                    <p className="text-sm font-semibold">La force du collectif</p>
                  </div>
                  <Quote className="h-5 w-5 text-red-200 opacity-80 group-hover:scale-110 transition-transform" />
                </button>

                <Link
                  to="/informer/questions-victimes"
                  className="group w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-left text-white hover:border-red-300/50 hover:bg-red-500/10 transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-red-200/70">Questions</p>
                    <p className="text-sm font-semibold">Les questions importantes</p>
                  </div>
                  <FileText className="h-5 w-5 text-red-200 opacity-80 group-hover:scale-110 transition-transform" />
                </Link>
              </div>

              <button
                onClick={() => handleNavigate("contact")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-left text-white hover:border-red-300/50 hover:bg-red-500/10 transition-all duration-200"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-red-200/70">Vos droits</p>
                  <p className="text-sm font-semibold">Parler à une personne de confiance</p>
                </div>
                <ChevronDown className="h-5 w-5 text-red-200 rotate-[-90deg]" />
              </button>
            </div>

            {/* Blocs visuels */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-900 via-[#2d0000] to-black p-5 shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
                <div className="relative space-y-4 text-white">
                  <div className="h-28 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-red-200 text-sm font-semibold">
                    Image d'alerte
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-red-200/80">Bloc A</p>
                    <h3 className="text-xl font-bold">Comprendre les dérives des cliniques à Istanbul</h3>
                    <p className="text-sm text-red-100/90">Guide complet basé sur des preuves réelles.</p>
                  </div>
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-red-100 hover:bg-white/15 transition-colors duration-200"
                  >
                    Télécharger le guide
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b0e1c] via-black to-black p-5 shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_40%)]" />
                <div className="relative space-y-4 text-white">
                  <div className="h-28 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-red-100 text-sm font-semibold">
                    Image d'expertise
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-red-200/80">Bloc B</p>
                    <h3 className="text-xl font-bold">Comment constituer vos preuves ?</h3>
                    <p className="text-sm text-red-100/90">Méthodologie validée pour éviter les pièges juridiques.</p>
                  </div>
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-red-100 hover:bg-white/15 transition-colors duration-200"
                  >
                    Voir la méthode
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuSInformer;
