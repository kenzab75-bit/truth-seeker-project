import { useEffect, useState } from "react";
import { Scale, Shield, FileText, AlertTriangle, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AlertBanner from "@/components/AlertBanner";
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isEtape1ModalOpen, setIsEtape1ModalOpen] = useState(false);
  const [isEtape2ModalOpen, setIsEtape2ModalOpen] = useState(false);
  const [isEtape3ModalOpen, setIsEtape3ModalOpen] = useState(false);
  const [isEtape4ModalOpen, setIsEtape4ModalOpen] = useState(false);
  
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
      <section id="histoire" className="py-24 bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-gradient mb-8 font-display">
              Mon Histoire
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto" />
          </div>

          {/* Qui suis-je & Pourquoi ce site */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
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
          <div className="max-w-5xl mx-auto">
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
        </div>
      </section>

      {/* Story Section - Une mécanique bien rodée */}
      <section id="victimes" className="py-24 bg-gradient-to-br from-black via-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black mb-4 font-display">
              <span className="text-foreground block">Une mécanique</span>
              <span className="text-red-gradient block">bien étudiée</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto mb-8" />
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Découvrez comment un système bien rodé transforme la confiance des patients en instrument de profit.
            </p>
          </div>

          {/* Timeline verticale */}
          <div className="max-w-6xl mx-auto relative">
            {/* Ligne verticale centrale */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-red -translate-x-1/2 hidden lg:block" />

            {/* Étape 1 - Gauche */}
            <div className="relative mb-24 lg:mb-32">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="lg:text-right lg:pr-12">
                  <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Étape 1
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    L'appât commercial
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins "haut de gamme", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.
                  </p>
                  <button 
                    onClick={() => setIsEtape1ModalOpen(true)}
                    className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red/20 px-4 py-2 rounded-lg transition-all duration-300 font-medium group"
                  >
                    Cliquer pour voir les détails
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="hidden lg:block" />
              </div>
              {/* Cercle sur la ligne */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-red rounded-full border-4 border-background hidden lg:flex items-center justify-center z-10">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            {/* Étape 2 - Droite */}
            <div className="relative mb-24 lg:mb-32">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="hidden lg:block" />
                <div className="lg:pl-12">
                  <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Étape 2
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Le piège
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Une fois sur place, vous vous retrouvez pris au piège, entièrement dépendants de la clinique, qui exploite cette position de force pour accélérer les procédures. Les consentements sont signés dans la précipitation, sous pression psychologique et logistique. Refuser devient impensable, au risque de perdre les sommes versées et le séjour déjà engagé.
                  </p>
                  <button 
                    onClick={() => setIsEtape2ModalOpen(true)}
                    className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red/20 px-4 py-2 rounded-lg transition-all duration-300 font-medium group"
                  >
                    Cliquer pour voir les détails
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
              {/* Cercle sur la ligne */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-red rounded-full border-4 border-background hidden lg:flex items-center justify-center z-10">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            {/* Étape 3 - Gauche */}
            <div className="relative mb-24 lg:mb-32">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="lg:text-right lg:pr-12">
                  <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Étape 3
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    L'impasse
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...
                  </p>
                  <button 
                    onClick={() => setIsEtape3ModalOpen(true)}
                    className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red/20 px-4 py-2 rounded-lg transition-all duration-300 font-medium group"
                  >
                    Cliquer pour voir les détails
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="hidden lg:block" />
              </div>
              {/* Cercle sur la ligne */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-red rounded-full border-4 border-background hidden lg:flex items-center justify-center z-10">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            {/* Étape 4 - Droite */}
            <div className="relative">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="hidden lg:block" />
                <div className="lg:pl-12">
                  <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Étape 4
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    La vérité éclate
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.
                  </p>
                  <button 
                    onClick={() => setIsEtape4ModalOpen(true)}
                    className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red/20 px-4 py-2 rounded-lg transition-all duration-300 font-medium group"
                  >
                    Cliquer pour voir les détails
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
              {/* Cercle sur la ligne */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-red rounded-full border-4 border-background hidden lg:flex items-center justify-center z-10">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="bg-gradient-to-br from-background via-black to-background py-20">
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

      {/* Modal Étape 1 */}
      <Dialog open={isEtape1ModalOpen} onOpenChange={setIsEtape1ModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0e0e0e] border-2 border-primary-red/30 text-foreground">
          <DialogHeader className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold">
                Étape 1
              </div>
              <DialogTitle className="text-3xl font-bold">L'appât commercial</DialogTitle>
            </div>
            <button
              onClick={() => setIsEtape1ModalOpen(false)}
              className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins "haut de gamme", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.
            </p>

            {/* Détails de l'étape */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Détails de l'étape</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Publicités agressives sur les réseaux sociaux Instagram, Facebook
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Promesses de prix 60-70% moins chers avec des 'garanties' attractives (Hôtel 5 étoiles, transfert gratuit etc)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Communication ultra-réactive et rassurante via WhatsApp et réseaux sociaux
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Partenariats avec des influenceurs ou stars internationales pour promouvoir la clinique
                  </span>
                </li>
              </ul>
            </div>

            {/* Sources et preuves */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Sources et preuves</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">Témoignage patient #12</h4>
                      <p className="text-muted-foreground">Devis initial de 3500€ pour 20 facettes et couronnes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold">Capture écran Facebook, Instagram, site web</h4>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold">Conversation WhatsApp</h4>
                      <p className="text-muted-foreground">Échanges avant le départ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Étape 2 */}
      <Dialog open={isEtape2ModalOpen} onOpenChange={setIsEtape2ModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0e0e0e] border-2 border-primary-red/30 text-foreground">
          <DialogHeader className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold">
                Étape 2
              </div>
              <DialogTitle className="text-3xl font-bold">Le piège</DialogTitle>
            </div>
            <button
              onClick={() => setIsEtape2ModalOpen(false)}
              className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Une fois sur place, vous vous retrouvez pris au piège, entièrement dépendants de la clinique, qui exploite cette position de force pour accélérer les procédures. Les consentements sont signés dans la précipitation, sous pression psychologique et logistique. Refuser devient impensable, au risque de perdre les sommes versées et le séjour déjà engagé.
            </p>

            {/* Détails de l'étape */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Détails de l'étape</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Examen initial bâclé, expédié en moins de dix minutes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Traitement prévu avant le départ modifié sur place, au profit de soins beaucoup plus coûteux et invasifs, sans justification médicale réelle ni transparente
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Multiplication des actes : meulage, dévitalisations, couronnes, non prévus
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Inflation des prix : facture finale 2 à 3 fois supérieure au devis
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Isolation du patient : pression pour payer rapidement
                  </span>
                </li>
              </ul>
            </div>

            {/* Sources et preuves */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Sources et preuves</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">Factures comparées</h4>
                      <p className="text-muted-foreground">Documents avant/après traitement</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold">Export de conversations WhatsApp</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Étape 3 */}
      <Dialog open={isEtape3ModalOpen} onOpenChange={setIsEtape3ModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0e0e0e] border-2 border-primary-red/30 text-foreground">
          <DialogHeader className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold">
                Étape 3
              </div>
              <DialogTitle className="text-3xl font-bold">L'impasse</DialogTitle>
            </div>
            <button
              onClick={() => setIsEtape3ModalOpen(false)}
              className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...
            </p>

            {/* Détails de l'étape */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Détails de l'étape</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Complications post-opératoires graves : douleurs chroniques, pulpite
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Absence totale de suivi médical après le retour en Europe
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Impossibilité de joindre la clinique ou réponses évasives ; isolement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Refus de prise en charge des complications
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Coûts de réparation en Europe dépassant largement les économies initiales
                  </span>
                </li>
              </ul>
            </div>

            {/* Sources et preuves */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Sources et preuves</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">Rapports et examens médicaux</h4>
                      <p className="text-muted-foreground">Dentistes français 2025</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold">Témoignage patient</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Étape 4 */}
      <Dialog open={isEtape4ModalOpen} onOpenChange={setIsEtape4ModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0e0e0e] border-2 border-primary-red/30 text-foreground">
          <DialogHeader className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex items-center bg-primary-red text-white px-4 py-2 rounded-full text-sm font-bold">
                Étape 4
              </div>
              <DialogTitle className="text-3xl font-bold">La vérité éclate</DialogTitle>
            </div>
            <button
              onClick={() => setIsEtape4ModalOpen(false)}
              className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.
            </p>

            {/* Détails de l'étape */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Détails de l'étape</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Création de groupes d'entraide et de témoignages de victimes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Publication de preuves concrètes : factures, photos, rapports médicaux
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Médiatisation croissante de l'affaire dans les médias européens
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Plaintes déposées auprès des autorités compétentes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Mobilisation pour alerter les futurs patients et prévenir de nouveaux cas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">
                    Demande d'enquête officielle sur les pratiques de la clinique
                  </span>
                </li>
              </ul>
            </div>

            {/* Sources et preuves */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary-red" />
                <h3 className="text-2xl font-bold">Sources et preuves</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold mb-2">Groupe Facebook</h4>
                      <p className="text-muted-foreground">Nombreux témoignages recensés</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-primary-red/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold">Plainte en cours de dépôt</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Index;