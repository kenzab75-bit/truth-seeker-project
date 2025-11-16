import { useEffect, useState } from "react";
import { Scale, Shield, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertBanner from "@/components/AlertBanner";
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Premium Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass bg-black/80" : "glass"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="relative pulse-glow rounded-full p-2">
                    <Scale className="h-8 w-8 text-primary-red" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-red rounded-full animate-ping" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-gradient font-display">LemaClinic  </span>
                    <span className="text-2xl font-black text-red-gradient font-display">
                      Truth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex space-x-8">
              {["Accueil", "Mon histoire", "S'informer", "Enquêtes", "Contact"].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace('mon ', '').replace("s'informer", 'victimes'))} className="relative text-muted-foreground hover:text-foreground font-medium transition-all duration-300 group">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full" />
                  </button>)}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section Ultra Premium */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32" style={{
      background: `
            radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, hsl(var(--darker-bg)) 0%, hsl(var(--dark-bg)) 100%)
          `
        }}>
        {/* Alert Banner */}
        <AlertBanner />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-background/85 to-black/90 z-[1]" />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          {[...Array(9)].map((_, i) => <div key={i} className="particle absolute w-0.5 h-0.5 bg-primary-red/60 rounded-full" style={{
          left: `${(i + 1) * 10}%`,
          animationDelay: `${i * 2}s`
        }} />)}
        </div>

        <div className="relative z-[2] max-w-7xl mx-auto px-6 lg:px-8 text-center pt-20">
          {/* Alert Icon */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-red/40 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary-red/30 rounded-full animate-pulse" />
              <div className="relative z-10 p-6 bg-gradient-to-br from-primary-red to-dark-red rounded-full pulse-glow floating">
                <AlertTriangle className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none font-display animate-scale-in">
            <span className="text-gradient block">LemaClinic</span>
            <span className="text-red-gradient block">Truth</span>
          </h1>

          {/* Slogan */}
          <p className="text-3xl lg:text-4xl xl:text-5xl mb-12 font-light text-primary-red font-display">
            La vérité éclaire toujours
          </p>

          {/* Mission Statement */}
          <div className="max-w-6xl mx-auto mb-16">
            <p className="text-xl lg:text-2xl xl:text-3xl font-bold leading-relaxed text-foreground">
              Révéler la vérité, défendre les victimes face aux abus de 
Lema Dental Clinic en Turquie.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Button onClick={() => scrollToSection("histoire")} className="btn-premium px-12 py-6 text-xl font-bold rounded-xl text-white min-w-[280px] group h-auto">
              <span className="relative z-10 flex items-center justify-center">
                <Shield className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                Découvrir mon histoire
              </span>
            </Button>

            <Button variant="outline" onClick={() => scrollToSection("contact")} className="glass border-2 border-white/30 hover:border-white/60 px-12 py-6 text-xl font-bold rounded-xl text-white min-w-[280px] h-auto transition-all duration-300 hover:bg-white/10 group">
              <span className="flex items-center justify-center">
                <svg className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Soutenir le projet
              </span>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* My Story Section - Introduction */}
      <section id="histoire" className="py-32 bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-gradient mb-8 font-display">
              Mon Histoire
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto" />
          </div>

          {/* Qui suis-je & Pourquoi ce site */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className="glass-card rounded-2xl p-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Qui suis-je ?
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Je suis une patiente qui a fait confiance à la clinique{" "}
                  <span className="text-primary-red font-semibold">Lema Dental</span> à Istanbul.
                </p>
                <p>
                  Comme beaucoup, j'ai cru aux promesses d'un sourire parfait, à des soins modernes et à une équipe qualifiée.
                </p>
                <p>
                  Mais derrière cette façade séduisante, j'ai découvert une tout autre réalité : celle d'une expérience marquée par la douleur, les manquements et le mépris.
                </p>
                <p>
                  Je suis aujourd'hui une <span className="text-primary-red font-semibold">victime</span>, mais aussi une <span className="text-primary-red font-semibold">voix</span> — celle de toutes les personnes qui ont été trompées ou réduites au silence.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Pourquoi ce site ?
                </h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  J'ai créé ce site pour révéler la vérité et prévenir d'autres victimes.
                </p>
                <p>
                  Ce site n'est pas une vengeance : c'est une alerte citoyenne.
                </p>
                <p>
                  Un espace de témoignage, d'enquête et de partage d'informations, construit avec rigueur.
                </p>
                <p>
                  Mon objectif est simple : que plus personne ne se laisse séduire par des promesses mensongères, et que chaque patient retrouve son{" "}
                  <span className="text-primary-red font-semibold">droit fondamental</span> à la transparence, au respect et à la dignité.
                </p>
              </div>
            </div>
          </div>

          {/* Mon expérience */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="glass-card rounded-2xl p-10">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Mon expérience
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Comme beaucoup d'autres, j'ai été attiré par les promesses alléchantes de Lema Dental Clinic à Istanbul. 
                  Des soins dentaires de qualité à des prix attractifs, une équipe professionnelle, des installations modernes... 
                  La réalité s'est révélée bien différente.
                </p>

                <p>
                  Une fois sur place, le cauchemar a commencé. Les diagnostics ont changé, les prix ont explosé, 
                  et les complications sont apparues rapidement. Les promesses se sont évaporées, et je me suis retrouvé 
                  piégé dans un système bien rodé, conçu pour maximiser les profits au détriment de la santé des patients.
                </p>

                <p>
                  Aujourd'hui, je me bats pour exposer ces pratiques et aider d'autres victimes. 
                  Ce site est ma voix, et j'espère qu'il deviendra aussi la vôtre.
                </p>
              </div>
            </div>
          </div>

          {/* Pourquoi LemaClinic Truth section */}
          <div className="text-center mb-16" id="victimes">
            <h2 className="text-4xl lg:text-5xl font-black text-gradient mb-8 font-display">
              Pourquoi LemaClinic Truth ?
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto mb-8" />
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Face aux abus et au silence organisé, nous brisons l'omerta pour que
              la vérité triomphe.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-10 hover-lift group">
              <div className="flex items-center mb-8">
                <div className="p-4 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Victimes silencieuses
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Les victimes de la clinique LEMA Clinic subissent des soins fautifs
                et un silence organisé. Leurs voix doivent être entendues et leur
                dignité restaurée.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-10 hover-lift group">
              <div className="flex items-center mb-8">
                <div className="p-4 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Preuves irréfutables
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                LemaClinic Truth centralise témoignages, preuves médicales et
                expertises pour établir la vérité et construire un dossier
                irréfutable.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-10 hover-lift group" id="enquetes">
              <div className="flex items-center mb-8">
                <div className="p-4 bg-gradient-to-br from-primary-red to-dark-red rounded-xl mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Scale className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Justice implacable
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Notre mission : rendre visibles les abus, alerter les futurs
                patients, protéger et obtenir justice pour toutes les victimes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Mon expérience */}
      <section className="py-32 bg-gradient-to-br from-black via-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-gradient mb-8 font-display">
              Mon expérience
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto" />
          </div>

          <div className="glass-card rounded-2xl p-12 lg:p-16 space-y-8">
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Comme beaucoup d'autres, j'ai été attiré par les promesses alléchantes de Lema Dental Clinic à Istanbul. 
              Des soins dentaires de qualité à des prix attractifs, une équipe professionnelle, des installations modernes... 
              La réalité s'est révélée bien différente.
            </p>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Une fois sur place, le cauchemar a commencé. Les diagnostics ont changé, les prix ont explosé, 
              et les complications sont apparues rapidement. Les promesses se sont évaporées, et je me suis retrouvé 
              piégé dans un système bien rodé, conçu pour maximiser les profits au détriment de la santé des patients.
            </p>

            <p className="text-xl lg:text-2xl text-foreground leading-relaxed font-semibold">
              Aujourd'hui, je me bats pour exposer ces pratiques et aider d'autres victimes. 
              Ce site est ma voix, et j'espère qu'il deviendra aussi la vôtre.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Une mécanique bien rodée */}
      <section className="py-32 bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-gradient mb-8 font-display">
              Une mécanique bien rodée
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto mb-8" />
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Un système organisé pour piéger les patients et maximiser les profits.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass-card rounded-2xl p-10 hover-lift">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-red to-dark-red flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Promesses séduisantes
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Marketing agressif sur les réseaux sociaux, photos avant/après retouchées, 
                témoignages fabriqués et prix défiant toute concurrence pour attirer un maximum de patients.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-10 hover-lift">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-red to-dark-red flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Changement de plan
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Une fois sur place, les diagnostics changent miraculeusement. De nouveaux "problèmes" apparaissent, 
                et les prix augmentent drastiquement sous prétexte de soins "nécessaires".
              </p>
            </div>

            <div className="glass-card rounded-2xl p-10 hover-lift">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-red to-dark-red flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Travail bâclé
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Les soins sont effectués à la va-vite, sans respect des protocoles. Les complications apparaissent 
                rapidement : douleurs, infections, prothèses mal ajustées, dommages irréversibles.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-10 hover-lift">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-red to-dark-red flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-white">4</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Silence et abandon
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Une fois rentré, plus de nouvelles. Les appels restent sans réponse, les messages ignorés. 
                Les victimes se retrouvent seules face aux conséquences, obligées de tout refaire dans leur pays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="bg-gradient-to-br from-background via-black to-background py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <Scale className="h-8 w-8 text-primary-red" />
                <span className="text-2xl font-bold font-display">
                  LemaClinic Truth
                </span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Un mouvement déterminé pour la vérité, la justice et la protection
                des patients face aux abus médicaux.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-8">Liens rapides</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection("histoire")} className="hover:text-foreground transition-colors text-lg">
                    Notre histoire
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("victimes")} className="hover:text-foreground transition-colors text-lg">
                    Témoignages
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-foreground transition-colors text-lg">
                    Contact confidentiel
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-8">Contact confidentiel</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Votre témoignage est précieux et sera traité avec la plus grande
                confidentialité.
              </p>
              <Button className="btn-premium px-8 py-4 rounded-lg font-bold text-white h-auto">
                Nous contacter
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 text-center text-muted-foreground">
            <p className="text-lg">
              &copy; 2024 LemaClinic Truth. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;