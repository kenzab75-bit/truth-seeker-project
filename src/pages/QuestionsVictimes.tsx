import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QuestionsVictimes = () => {
  const faqItems = [
    {
      question: "Quels sont mes droits en cas d'erreur médicale à l'étranger ?",
      answer: "Vous disposez des mêmes droits fondamentaux que dans votre pays d'origine : accès à votre dossier, demande de rectification, demande d'explication et possibilité d'engager la responsabilité du professionnel. Les règles varient selon le pays, mais vos droits essentiels restent protégés."
    },
    {
      question: "Comment savoir si j'ai été victime d'un acte médical fautif ?",
      answer: "Signes courants : douleurs persistantes, traitements inachevés, devis modifiés sans explication, absence de suivi, complications non traitées, refus de prise en charge… Un avis médical indépendant est fortement recommandé."
    },
    {
      question: "Dois-je faire une radioscopie, un CBCT ou un examen avant d'agir ?",
      answer: "Oui. Les examens réalisés dans votre pays d'origine sont essentiels pour documenter la situation et évaluer les erreurs commises. Ils constituent la base d'un dossier solide."
    },
    {
      question: "Comment récupérer mon dossier médical auprès de la clinique à l'étranger ?",
      answer: "Toute clinique est légalement tenue de vous fournir votre dossier complet, vos radios, vos devis, les actes réalisés, sous un délai raisonnable. Si la clinique refuse : cela renforce la suspicion d'une faute."
    },
    {
      question: "Que faire si la clinique ne répond plus ou refuse d'assumer ?",
      answer: "C'est fréquent. Documentez tout : emails, messages, preuves de non-réponse. Votre dossier devient plus solide. Nous expliquons dans nos guides comment procéder étape par étape."
    },
    {
      question: "Est-ce que je peux obtenir une aide juridique ?",
      answer: "Oui. Nous mettons en relation les victimes avec des avocats spécialisés (France / Europe) dans les litiges transfrontaliers liés au tourisme dentaire."
    },
    {
      question: "Les preuves que j'envoie seront-elles anonymes ?",
      answer: "Oui. Vos pièces sont chiffrées, anonymisées et stockées via notre API sécurisée. Nous ne collectons jamais d'adresse IP ou de données identifiantes."
    },
    {
      question: "Que faire si j'ai payé cash et que je n'ai pas de facture ?",
      answer: "Il existe des solutions : témoignages, devis initiaux, échanges WhatsApp, radiographies post-opératoires, preuves indirectes… Un dossier peut être constitué même sans facture."
    },
    {
      question: "Comment savoir si mes implants ou couronnes sont de mauvaise qualité ?",
      answer: "Symptômes typiques : douleurs, prothèses mal ajustées, inflammations, changement de couleur, mauvaises odeurs, fractures. Un dentiste local peut vérifier et documenter précisément."
    },
    {
      question: "Puis-je agir même plusieurs mois après les soins ?",
      answer: "Oui. Les recours restent possibles tant qu'un dommage existe et qu'il est lié à l'acte médical initial. Il n'est jamais « trop tard » pour agir."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#A51616]/5 via-background to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
              Questions Importantes des Victimes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Une sélection des questions les plus fréquentes, avec des réponses claires, sécurisées et basées sur les droits des patients.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground text-center leading-relaxed mb-12">
              Vous trouverez ci-dessous les réponses aux questions les plus importantes concernant vos droits, vos recours et les démarches à entreprendre en cas de pratiques médicales fautives à l'étranger.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card border border-border/20 rounded-2xl overflow-hidden hover:border-[#A51616]/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                    <span className="text-lg font-medium text-foreground pr-4 group-hover:text-[#A51616] transition-colors">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground/70 italic">
              Toutes les informations fournies ici sont générales et n'ont pas vocation à remplacer un avis professionnel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuestionsVictimes;
