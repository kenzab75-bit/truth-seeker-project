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
      "Selon plusieurs témoignages reçus, la prise de contact médicale sert parfois à instaurer une relation d'emprise qui dépasse la simple information clinique.",
    highlights: [
      "Multiplication des rendez-vous non justifiés rapportés par les patients",
      "Promesses d'améliorations spectaculaires sans documents médicaux complets",
      "Collecte insistante de documents personnels sensibles",
    ],
    evidence: [
      { type: "audio", label: "Extraits anonymisés d'entretiens" },
      { type: "pdf", label: "Consentements contestés" },
    ],
    kpi: {
      label: "Type de signalement",
      value: "Approches médicales insistantes",
      detail: "Synthèse de dossiers transmis au collectif",
    },
  },
  {
    id: "etape-2",
    label: "Phase 2",
    title: "Piégeage administratif",
    description:
      "Des patient·es décrivent un enchaînement de documents administratifs difficiles à contester une fois signés, parfois présentés dans l'urgence.",
    highlights: [
      "Signatures obtenues dans un contexte de stress ou de traitement",
      "Utilisation litigieuse de devis ou d'ordonnances",
      "Mises en garde sur la couverture sociale rapportées par des témoins",
    ],
    evidence: [
      { type: "photo", label: "Copies de documents fournis" },
      { type: "message", label: "Échanges écrits anonymisés" },
    ],
    kpi: {
      label: "Tendance observée",
      value: "Dossiers administratifs opaques",
      detail: "Alertes récurrentes sur les devis et factures",
    },
  },
  {
    id: "etape-3",
    label: "Phase 3",
    title: "Isolement & pression psychologique",
    description:
      "Plusieurs victimes disent avoir été coupées de leurs repères habituels, avec un discours alarmiste ou culpabilisant lorsque des doutes sont exprimés.",
    highlights: [
      "Contrôle des communications avec les proches rapporté par certaines victimes",
      "Menaces verbales autour d'éventuelles procédures",
      "Discours culpabilisants décrits dans les signalements",
    ],
    evidence: [
      { type: "audio", label: "Messages vocaux transmis" },
      { type: "pdf", label: "Notes d'accompagnement psychologique" },
    ],
    kpi: {
      label: "Impact humain",
      value: "Pression psychologique rapportée",
      detail: "Accompagnement en cours avec nos partenaires",
    },
  },
  {
    id: "etape-4",
    label: "Phase 4",
    title: "Riposte & reconstruction",
    description:
      "Le collectif centralise les preuves existantes, mobilise des juristes volontaires et prépare des dossiers pour les autorités et médias.",
    highlights: [
      "Orientation vers des avocat·es et médecins neutres",
      "Partage sécurisé de dossiers existants",
      "Préparation d'alertes destinées aux autorités et médias",
    ],
    evidence: [
      { type: "pdf", label: "Dossiers consolidés" },
      { type: "message", label: "Canal du collectif" },
    ],
    kpi: {
      label: "Action du collectif",
      value: "Accompagnement en cours",
      detail: "Mises à jour partagées avec les témoins volontaires",
    },
  },
];
