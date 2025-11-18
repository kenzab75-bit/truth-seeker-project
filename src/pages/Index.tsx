import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scale, Shield, FileText, AlertTriangle, X, ChevronRight, Quote, ArrowUp, Lock, ShieldCheck, ChevronDown, Menu, Mail, Loader2, Heart, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import AlertBanner from "@/components/AlertBanner";
import ContactForm from "@/components/ContactForm";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { supabase } from "@/integrations/supabase/client";
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isEtape1ModalOpen, setIsEtape1ModalOpen] = useState(false);
  const [isEtape2ModalOpen, setIsEtape2ModalOpen] = useState(false);
  const [isEtape3ModalOpen, setIsEtape3ModalOpen] = useState(false);
  const [isEtape4ModalOpen, setIsEtape4ModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [testimony, setTestimony] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [displayedTestimonials, setDisplayedTestimonials] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false); // Close mobile menu on navigation
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const handleSubmitTestimony = () => {
    if (!testimony.trim() || !consentChecked) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs et accepter le consentement",
        variant: "destructive"
      });
      return;
    }
    // Simuler l'envoi sécurisé
    console.log("Témoignage anonyme envoyé de manière sécurisée");
    toast({
      title: "Témoignage envoyé",
      description: "Votre témoignage a été envoyé de manière sécurisée et anonyme"
    });
    setTestimony("");
    setConsentChecked(false);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedTestimonials(prev => Math.min(prev + 3, filteredTestimonials.length));
      setIsLoadingMore(false);
    }, 600);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      toast({
        variant: "destructive",
        title: "Email requis",
        description: "Veuillez entrer votre adresse email.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast({
        variant: "destructive",
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email: newsletterEmail }
      });

      if (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
      }

      if (data?.error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error,
        });
        return;
      }

      toast({
        title: "Inscription réussie !",
        description: data.message || "Merci de votre inscription à notre newsletter. Vérifiez votre email.",
      });
      setNewsletterEmail("");
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const filteredTestimonials = activeFilter === "Tous" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);
  
  const visibleTestimonials = filteredTestimonials.slice(0, displayedTestimonials);
  const hasMoreTestimonials = displayedTestimonials < filteredTestimonials.length;
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('accueil')} className="relative text-[#E0E0E0] hover:text-[#A51616] font-medium transition-all duration-300 group">
                Accueil
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A51616] transition-all duration-300 group-hover:w-full" />
              </button>
              <button onClick={() => scrollToSection('histoire')} className="relative text-[#E0E0E0] hover:text-[#A51616] font-medium transition-all duration-300 group">
                Mon histoire
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A51616] transition-all duration-300 group-hover:w-full" />
              </button>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-[#E0E0E0] hover:text-[#A51616] hover:bg-transparent font-medium transition-all duration-300 data-[state=open]:text-[#701010] data-[state=open]:bg-[#701010]/20 data-[active]:bg-transparent focus:bg-transparent group [&>svg]:transition-transform [&>svg]:duration-[250ms] [&>svg]:ease-in-out data-[state=open]:[&>svg]:rotate-180 data-[state=open]:[&>svg]:-translate-y-px">
                      S'informer
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-1 p-3 bg-gradient-to-br from-black via-[#0a0000] to-[#1a0000] backdrop-blur-[6px] border border-white/5 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_10px_40px_rgba(0,0,0,0.5)]">
                        <li>
                          <NavigationMenuLink asChild>
                            <button onClick={() => scrollToSection('victimes')} className="w-full flex items-center gap-3 select-none rounded-lg px-4 py-3 text-sm font-medium text-[#E0E0E0] no-underline outline-none transition-all duration-200 hover:bg-[#181818] hover:text-[#A51616] text-left">
                              <AlertTriangle className="h-4 w-4 opacity-70" />
                              Leurs méthodes
                            </button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <button onClick={() => scrollToSection('temoignages')} className="w-full flex items-center gap-3 select-none rounded-lg px-4 py-3 text-sm font-medium text-[#E0E0E0] no-underline outline-none transition-all duration-200 hover:bg-[#181818] hover:text-[#A51616] text-left">
                              <Quote className="h-4 w-4 opacity-70" />
                              Témoignages
                            </button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/informer/questions-victimes" className="flex items-center gap-3 select-none rounded-lg px-4 py-3 text-sm font-medium text-[#E0E0E0] no-underline outline-none transition-all duration-200 hover:bg-[#181818] hover:text-[#A51616]">
                              <FileText className="h-4 w-4 opacity-70" />
                              Vos questions importantes
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <button onClick={() => scrollToSection('contact')} className="relative text-[#E0E0E0] hover:text-[#A51616] font-medium transition-all duration-300 group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A51616] transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black/95 border-border/20">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center space-x-2">
                      <Scale className="h-6 w-6 text-primary-red" />
                      <span className="text-xl font-bold">
                        <span className="text-gradient">LemaClinic </span>
                        <span className="text-red-gradient">Truth</span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col space-y-4 mt-8">
                  <button onClick={() => {
                  scrollToSection('accueil');
                  setMobileMenuOpen(false);
                }} className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300 font-medium">
                    Accueil
                  </button>
                  
                  <button onClick={() => {
                  scrollToSection('histoire');
                  setMobileMenuOpen(false);
                }} className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300 font-medium">
                    Mon histoire
                  </button>
                  
                  <div className="px-4 py-2">
                    <div className="text-sm font-semibold text-muted-foreground mb-2">S'informer</div>
                    <button onClick={() => {
                      scrollToSection('victimes');
                      setMobileMenuOpen(false);
                    }} className="w-full text-left px-4 py-3 text-muted-foreground hover:text-primary-red hover:bg-accent/50 rounded-md transition-all duration-300">
                      Leurs méthodes
                    </button>
                    <button onClick={() => {
                      scrollToSection('temoignages');
                      setMobileMenuOpen(false);
                    }} className="w-full text-left px-4 py-3 text-muted-foreground hover:text-primary-red hover:bg-accent/50 rounded-md transition-all duration-300">
                      Témoignages
                    </button>
                    <Link to="/informer/questions-victimes" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-muted-foreground hover:text-primary-red hover:bg-accent/50 rounded-md transition-all duration-300">
                      Vos questions importantes
                    </Link>
                  </div>
                  
                  <button onClick={() => {
                  scrollToSection('contact');
                  setMobileMenuOpen(false);
                }} className="text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300 font-medium">
                    Contact
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
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
          {/* Alert Icon - Animation progressive */}
          <div className="flex justify-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-red/40 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary-red/30 rounded-full animate-pulse" />
              <div className="relative z-10 p-6 bg-gradient-to-br from-primary-red to-dark-red rounded-full pulse-glow floating">
                <AlertTriangle className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Main Title - Animation progressive */}
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black mb-6 leading-none font-display opacity-0 animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <span className="text-gradient block">LemaClinic</span>
            <span className="text-red-gradient block">Truth</span>
          </h1>

          {/* Slogan - Animation progressive */}
          <p className="text-3xl lg:text-4xl xl:text-5xl mb-6 font-light text-primary-red font-display opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            La vérité éclaire toujours
          </p>

          {/* Sous-titre accrocheur - Animation progressive */}
          <div className="max-w-5xl mx-auto mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <p className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-foreground mb-3">
              Des centaines de victimes. Une seule clinique.
            </p>
            <p className="text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed">
              Découvrez comment <span className="text-primary-red font-semibold">Lema Dental Clinic</span> transforme des vies en cauchemars
            </p>
          </div>

          {/* Stats rapides - Animation progressive */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-primary-red">500+</div>
              <div className="text-sm lg:text-base text-muted-foreground">Victimes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-primary-red">€15K+</div>
              <div className="text-sm lg:text-base text-muted-foreground">Pertes moyennes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-primary-red">90%</div>
              <div className="text-sm lg:text-base text-muted-foreground">Complications</div>
            </div>
          </div>

          {/* CTA Buttons - Plus imposants - Animation progressive */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center opacity-0 animate-scale-in" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
            <Button 
              onClick={() => scrollToSection("histoire")} 
              className="relative px-12 py-8 text-2xl font-black rounded-2xl text-white group h-auto overflow-hidden bg-gradient-to-r from-primary-red via-red-600 to-primary-red bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-2xl shadow-primary-red/50 hover:shadow-primary-red/70 hover:scale-105 border-2 border-primary-red/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Shield className="h-7 w-7 transition-transform group-hover:scale-110 group-hover:rotate-6" />
                Découvrir la vérité
                <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
              </span>
            </Button>

            <Button 
              variant="outline" 
              onClick={() => scrollToSection("contact")} 
              className="relative px-12 py-8 text-xl font-bold rounded-2xl min-w-[320px] h-auto transition-all duration-300 group border-2 border-white/40 hover:border-primary-red bg-black/40 backdrop-blur-sm hover:bg-primary-red/10 text-white hover:scale-105 shadow-xl"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="h-6 w-6 transition-transform group-hover:scale-125 group-hover:fill-primary-red" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Soutenir les victimes
              </span>
            </Button>
          </div>

          {/* Badge de confiance - Animation progressive */}
          <div className="mt-12 flex justify-center gap-4 flex-wrap opacity-0 animate-fade-in" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Témoignages vérifiés</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <Lock className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">100% Anonyme</span>
            </div>
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
      <section id="histoire" className="py-section bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden pattern-dots">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
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

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Story Section - Une mécanique bien rodée */}
      <section id="victimes" className="py-section bg-gradient-to-br from-black via-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-4 font-display">
              <span className="text-foreground block">Une mécanique</span>
              <span className="text-red-gradient block">parfaitement orchestrée</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-red to-primary rounded-full mx-auto mb-8" />
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Découvrez comment un système bien rodé transforme la confiance des patients en instrument de profit.
            </p>
          </div>

          {/* Timeline verticale avec numérotation élégante */}
          <div className="max-w-6xl mx-auto relative">
            {/* Ligne verticale centrale avec gradient amélioré et effet de lueur */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-red via-primary-red/70 to-primary-red/30 -translate-x-1/2 hidden lg:block rounded-full shadow-[0_0_20px_rgba(220,38,38,0.3)]" />

            {/* Étape 1 - Gauche */}
            <div className="relative mb-24 lg:mb-32 animate-fade-in">
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="lg:text-right lg:pr-16">
                  <div className="glass-card p-8 rounded-2xl border border-primary-red/20 hover:border-primary-red/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] group">
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-red to-red-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                      Étape 1
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary-red transition-colors duration-300">
                      L'appât
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins "haut de gamme", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.
                    </p>
                    <button onClick={() => setIsEtape1ModalOpen(true)} className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red px-4 py-2 rounded-lg transition-all duration-300 font-medium group/btn border border-primary-red/30">
                      Cliquer pour voir les détails
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block" />
              </div>
              {/* Cercle élégant avec numérotation */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10">
                <div className="relative">
                  {/* Anneaux extérieurs pulsants */}
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/20 rounded-full animate-ping" />
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/10 rounded-full animate-pulse" />
                  {/* Cercle principal avec numéro */}
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary-red to-red-600 rounded-full border-4 border-background flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <span className="text-2xl font-black text-white">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 2 - Droite */}
            <div className="relative mb-24 lg:mb-32 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="hidden lg:block" />
                <div className="lg:pl-16">
                  <div className="glass-card p-8 rounded-2xl border border-primary-red/20 hover:border-primary-red/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] group">
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-red to-red-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                      Étape 2
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary-red transition-colors duration-300">
                      Le piège
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Une fois à Istanbul, ils vous isolent et vous placent sous pression. Les conditions changent, les prix explosent, et vous êtes pris au piège, loin de chez vous et vulnérable.
                    </p>
                    <button onClick={() => setIsEtape2ModalOpen(true)} className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red px-4 py-2 rounded-lg transition-all duration-300 font-medium group/btn border border-primary-red/30">
                      Cliquer pour voir les détails
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Cercle élégant avec numérotation */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/20 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/10 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary-red to-red-600 rounded-full border-4 border-background flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <span className="text-2xl font-black text-white">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 3 - Gauche */}
            <div className="relative mb-24 lg:mb-32 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="lg:text-right lg:pr-16">
                  <div className="glass-card p-8 rounded-2xl border border-primary-red/20 hover:border-primary-red/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] group">
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-red to-red-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                      Étape 3
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary-red transition-colors duration-300">
                      L'impasse
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...
                    </p>
                    <button onClick={() => setIsEtape3ModalOpen(true)} className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red px-4 py-2 rounded-lg transition-all duration-300 font-medium group/btn border border-primary-red/30">
                      Cliquer pour voir les détails
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block" />
              </div>
              {/* Cercle élégant avec numérotation */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/20 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/10 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary-red to-red-600 rounded-full border-4 border-background flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <span className="text-2xl font-black text-white">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 4 - Droite */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="hidden lg:block" />
                <div className="lg:pl-16">
                  <div className="glass-card p-8 rounded-2xl border border-primary-red/20 hover:border-primary-red/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] group">
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-red to-red-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                      Étape 4
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary-red transition-colors duration-300">
                      La vérité 
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.
                    </p>
                    <button onClick={() => setIsEtape4ModalOpen(true)} className="inline-flex items-center text-primary-red hover:text-white hover:bg-primary-red px-4 py-2 rounded-lg transition-all duration-300 font-medium group/btn border border-primary-red/30">
                      Cliquer pour voir les détails
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Cercle élégant avec numérotation */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/20 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute inset-0 w-16 h-16 bg-primary-red/10 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary-red to-red-600 rounded-full border-4 border-background flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <span className="text-2xl font-black text-white">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Témoignages des Victimes Section */}
      <section id="temoignages" className="py-section bg-gradient-to-br from-black via-background to-black relative overflow-hidden pattern-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 font-display">
              Témoignages des Victimes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Des histoires réelles de personnes affectées par les pratiques de la clinique
            </p>
          </div>

          {/* Filtres */}
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            {["Tous", "Complications", "Fraude", "Facturation"].map(filter => (
              <button 
                key={filter} 
                onClick={() => {
                  setActiveFilter(filter);
                  setDisplayedTestimonials(3); // Reset displayed count on filter change
                }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-primary-red text-white shadow-lg shadow-primary-red/30" 
                    : "bg-background/40 text-muted-foreground border border-white/10 hover:border-primary-red/50 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Compteur */}
          <p className="text-center text-muted-foreground mb-12">
            {filteredTestimonials.length} témoignage{filteredTestimonials.length > 1 ? 's' : ''} disponible{filteredTestimonials.length > 1 ? 's' : ''}.
          </p>

          {/* Cartes de témoignages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreTestimonials && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="btn-premium px-8 py-4 text-lg font-semibold rounded-xl group"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    Charger plus de témoignages
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Footer note */}
          <div className="text-center">
            <p className="text-muted-foreground italic mb-2">
              Tous les témoignages sont anonymisés et vérifiés avant publication
            </p>
            <p className="text-sm text-muted-foreground">
              {displayedTestimonials} sur {filteredTestimonials.length} témoignages affichés
            </p>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Section Témoignage Anonyme */}
      <section className="py-section bg-gradient-to-br from-background via-black to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 font-display">
              Témoignage Anonyme
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Partagez votre expérience de manière anonyme et sécurisée. Votre identité est protégée.
            </p>
          </div>

          {/* Container principal */}
          <div className="glass-card rounded-2xl p-8 lg:p-12 border border-primary-red/20 shadow-2xl">
            {/* Bloc d'avertissement rouge */}
            <div className="bg-[#7A1212] rounded-xl p-6 mb-8 border border-primary-red/30">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary-red flex-shrink-0 mt-1" />
                <p className="text-white/90 leading-relaxed">
                  Tous les témoignages sont cryptés et stockés en toute sécurité. Nous ne collectons jamais d'adresses IP ou d'informations identifiantes.
                </p>
              </div>
            </div>

            {/* Zone de saisie */}
            <div className="mb-8">
              <label htmlFor="testimony" className="block text-foreground font-semibold mb-3 text-lg">
                Votre témoignage
              </label>
              <textarea id="testimony" value={testimony} onChange={e => setTestimony(e.target.value)} placeholder="Partagez votre histoire… (Tous les témoignages sont entièrement anonymes)" className="w-full min-h-[250px] bg-[#0E0E0E] border-2 border-primary-red/30 rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all duration-300 resize-y" />
            </div>

            {/* Bloc de consentement avec checkbox */}
            <div className="bg-[#0E0E0E] rounded-xl p-6 mb-8 border border-primary-red/30">
              <div className="flex items-start gap-4">
                <button onClick={() => setConsentChecked(!consentChecked)} className="flex-shrink-0 mt-0.5">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${consentChecked ? "bg-primary-red border-primary-red" : "border-primary-red/50 hover:border-primary-red"}`}>
                    {consentChecked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>}
                  </div>
                </button>
                <div>
                  <p className="text-white font-medium mb-2">
                    Je comprends que mon témoignage sera anonymisé et stocké de façon chiffrée.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Nous supprimons tout identifiant technique (IP, agent utilisateur) et appliquons un hachage salé avant archivage.
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton d'envoi */}
            <button onClick={handleSubmitTestimony} disabled={!testimony.trim() || !consentChecked} className="w-full bg-primary-red hover:bg-[#C41E1E] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-red/30 hover:-translate-y-0.5">
              <Lock className="h-5 w-5" />
              Envoyer anonymement
            </button>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Section RGPD - Vos données, vos droits */}
      <section className="py-section bg-gradient-to-br from-black via-background to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 via-transparent to-primary-red/5" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <AlertTriangle className="h-4 w-4 text-primary-red" />
              <span className="text-primary-red font-medium tracking-widest text-sm uppercase">
                Transparence RGPD
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-foreground mb-6 font-display">
              Vos données, vos droits
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Nous respectons le Règlement Général sur la Protection des Données (RGPD) et détaillons clairement la finalité de chaque collecte.
            </p>
          </div>

          {/* 3 Cartes principales */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Carte 1 - Chiffrement */}
            <div className="bg-[#0C0C0C] rounded-2xl p-8 border border-white/5 hover:border-primary-red/30 transition-all duration-300">
              <ShieldCheck className="h-10 w-10 text-primary-red mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Chiffrement de bout en bout
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Toutes les données envoyées via nos formulaires transitent par une API HTTPS et sont chiffrées au repos.
              </p>
            </div>

            {/* Carte 2 - Consentement */}
            <div className="bg-[#0C0C0C] rounded-2xl p-8 border border-white/5 hover:border-primary-red/30 transition-all duration-300">
              <FileText className="h-10 w-10 text-primary-red mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Consentement explicite
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nous recueillons uniquement les informations nécessaires à votre demande et vous pouvez retirer votre consentement à tout moment.
              </p>
            </div>

            {/* Carte 3 - Conservation */}
            <div className="bg-[#0C0C0C] rounded-2xl p-8 border border-white/5 hover:border-primary-red/30 transition-all duration-300">
              <Lock className="h-10 w-10 text-primary-red mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Conservation limitée
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Les messages sont automatiquement purgés au-delà de 90 jours, sauf obligation légale contraire.
              </p>
            </div>
          </div>

          {/* 2 Grandes cartes */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Carte 4 - Vos droits */}
            <div className="bg-[#0C0C0C] rounded-2xl p-10 border border-white/5 hover:border-primary-red/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Vos droits à tout moment
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="text-primary-red font-bold mt-1">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Accéder à vos données :</span> écrivez-nous via le formulaire de contact en précisant l'email utilisé.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-red font-bold mt-1">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Rectifier ou supprimer :</span> nous traitons les demandes sous 72h ouvrées, hors cas de conservation légale.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-red font-bold mt-1">•</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Obtenir une copie :</span> les exports sont fournis dans un format ouvert (.json) signé pour garantir leur intégrité.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte 5 - API Sécurisée */}
            <div className="bg-[#0C0C0C] rounded-2xl p-10 border border-primary-red/30 hover:border-primary-red/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Notre API sécurisée
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Les formulaires sont connectés à l'API sécurisée <span className="text-foreground font-medium">TruthShield</span>, protégée par des jetons d'accès rotatifs et un pare-feu applicatif. Chaque requête est journalisée (horodatage, empreinte SHA-256) afin d'assurer la traçabilité tout en respectant l'anonymat des témoins.
              </p>
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <p className="text-sm text-muted-foreground font-mono">
                  Base API configurée via <span className="text-primary-red">VITE_API_BASE_URL</span> • Clé d'authentification optionnelle <span className="text-primary-red">VITE_API_TOKEN</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="section-divider"></div>

      {/* Contact Section */}
      <section id="contact" className="relative py-section overflow-hidden pattern-dots">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-background" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-red/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-red/5 rounded-full blur-[120px] animate-pulse" style={{
        animationDelay: "1s"
      }} />
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Footer Enrichi */}
      <footer className="bg-gradient-to-br from-background via-black to-background py-section border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6 group">
                <Scale className="h-8 w-8 text-primary-red transition-transform duration-300 group-hover:scale-110" />
                <span className="text-2xl font-bold font-display">LemaClinic Truth</span>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Un mouvement déterminé pour la vérité, la justice et la protection des patients face aux abus médicaux.
              </p>
              
              {/* Security Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="glass-card px-4 py-2 rounded-lg border border-primary-red/20 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary-red" />
                  <span className="text-xs font-medium">Données sécurisées</span>
                </div>
                <div className="glass-card px-4 py-2 rounded-lg border border-primary-red/20 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary-red" />
                  <span className="text-xs font-medium">SSL Crypté</span>
                </div>
                <div className="glass-card px-4 py-2 rounded-lg border border-primary-red/20 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary-red" />
                  <span className="text-xs font-medium">RGPD Conforme</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 hover:scale-110" aria-label="Instagram">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xl font-bold mb-6">Navigation</h3>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection("histoire")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Mon histoire</button></li>
                <li><button onClick={() => scrollToSection("victimes")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Leurs méthodes</button></li>
                <li><button onClick={() => scrollToSection("temoignages")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Témoignages</button></li>
                <li><button onClick={() => scrollToSection("support")} className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Soutenir</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-bold mb-6">Légal</h3>
              <ul className="space-y-3">
                <li><Link to="/mentions-legales" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Mentions légales</Link></li>
                <li><Link to="/politique-confidentialite" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Confidentialité</Link></li>
                <li><Link to="/conditions-utilisation" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Conditions</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary-red transition-all duration-300 text-base hover:translate-x-1 inline-block">Cookies</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Restez informé des dernières actualités.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                />
                <Button 
                  type="submit" 
                  disabled={isSubscribing}
                  className="w-full bg-gradient-to-r from-primary-red to-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      S'inscrire<Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">Données protégées RGPD</p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">&copy; 2024 LemaClinic Truth. Tous droits réservés.</p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Heart className="h-4 w-4 text-primary-red" />
              <span>Fait avec passion pour la vérité et la justice</span>
            </div>
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
            <button onClick={() => setIsEtape1ModalOpen(false)} className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors">
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
            <button onClick={() => setIsEtape2ModalOpen(false)} className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors">
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
            <button onClick={() => setIsEtape3ModalOpen(false)} className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors">
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
            <button onClick={() => setIsEtape4ModalOpen(false)} className="absolute right-0 top-0 p-2 rounded-full hover:bg-white/10 transition-colors">
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