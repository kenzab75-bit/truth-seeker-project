export type TimelineStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  evidence: {
    type: "audio" | "pdf" | "photo" | "message";
    label: string;
    url?: string;
  }[];
  kpi: {
    label: string;
    value: string;
    detail: string;
  };
};

export const timelineSteps: TimelineStep[] = [
  {
    id: "etape-1",
    label: "Phase 1",
    title: "Approche médicale détournée",
    description:
      "Consultations, soins esthétiques et protocoles médicaux sont utilisés comme porte d'entrée pour créer un climat de confiance totale.",
    highlights: [
      "Multiplication des consultations hors protocole",
      "Promesses d'amélioration 'miracle'" ,
      "Collecte de données personnelles sensibles",
    ],
    evidence: [
      { type: "audio", label: "Voix du praticien" },
      { type: "pdf", label: "Consentement falsifié" },
    ],
    kpi: {
      label: "Patients ciblés",
      value: "+32",
      detail: "sur les 18 derniers mois",
    },
  },
  {
    id: "etape-2",
    label: "Phase 2",
    title: "Piégeage administratif",
    description:
      "Factures, faux contrats et intimidations juridiques verrouillent la victime dans un tunnel administratif complexe.",
    highlights: [
      "Signature forcée sous sédation",
      "Usage détourné d'ordonnances",
      "Menaces sur la couverture sociale",
    ],
    evidence: [
      { type: "photo", label: "Photos des documents" },
      { type: "message", label: "Messages WhatsApp" },
    ],
    kpi: {
      label: "Montant détourné",
      value: "126 000€",
      detail: "à ce jour",
    },
  },
  {
    id: "etape-3",
    label: "Phase 3",
    title: "Isolement & pression psychologique",
    description:
      "La victime est isolée de son entourage, surveillée et soumise à une pression émotionnelle permanente.",
    highlights: [
      "Contrôle des communications",
      "Simulation de procédures judiciaires",
      "Manipulation affective",
    ],
    evidence: [
      { type: "audio", label: "Enregistrements d'appels" },
      { type: "pdf", label: "Rapports psychologiques" },
    ],
    kpi: {
      label: "Jours de pression",
      value: "94",
      detail: "sans interruption",
    },
  },
  {
    id: "etape-4",
    label: "Phase 4",
    title: "Riposte & reconstruction",
    description:
      "Collecte de preuves, assistance juridique et médiatisation structurent la contre-offensive collective.",
    highlights: [
      "Dépôt de plainte coordonné",
      "Accompagnement médical neutre",
      "Partenariats presse",
    ],
    evidence: [
      { type: "pdf", label: "Dossier juridique" },
      { type: "message", label: "Comité de soutien" },
    ],
    kpi: {
      label: "Actions en cours",
      value: "7",
      detail: "collectives",
    },
  },
];
