import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const startDate = new Date('2024-07-01T08:00:00');

const platformConfigs = {
  facebook: {
    times: ['09h00', '13h00', '18h00'],
    promptType: 'Facebook carousel'
  },
  instagram: {
    times: ['08h30', '12h30', '20h30'],
    promptType: 'Instagram carousel'
  },
  tiktok: {
    times: ['07h30', '15h30', '21h30'],
    promptType: 'TikTok vertical video'
  }
};

const audienceDetails = {
  etiquette: {
    label: 'gérants de grandes surfaces et supérettes',
    context: 'rayon alimentaire avec des centaines de références',
    testimonialName: 'Claire, directrice de supermarché à Lyon',
    environment: 'allée centrale d’un supermarché moderne'
  },
  promotion: {
    label: 'commerçants de proximité (boulangeries, restaurants, salons)',
    context: 'point de vente chaleureux qui renouvelle ses offres chaque jour',
    testimonialName: 'Nicolas, boulanger à Bordeaux',
    environment: 'comptoir élégant d’un commerce de centre-ville'
  }
};

const dayContexts = [
  {
    theme: 'Réduire le gaspillage papier et les coûts cachés',
    pain: 'des rouleaux d’étiquettes papier à réimprimer chaque semaine',
    solution: 'des écrans d’étiquetage synchronisés à votre base tarifaire',
    benefit: 'un affichage prix toujours exact sans gaspillage',
    result: '12 heures de réassort économisées chaque mois',
    audience: 'etiquette'
  },
  {
    theme: 'Mettre à jour les offres en quelques secondes',
    pain: 'des menus papier dépassés dès que la carte change',
    solution: 'un écran promotionnel qui se met à jour à distance',
    benefit: 'des clients informés en temps réel',
    result: '20 % de ventes additionnelles sur les formules midi',
    audience: 'promotion'
  },
  {
    theme: 'Uniformiser le prix entre rayons et caisse',
    pain: 'des étiquettes qui ne correspondent plus à la caisse',
    solution: 'un affichage connecté qui reflète vos prix officiels',
    benefit: 'zéro litige client et une équipe sereine',
    result: '100 % de cohérence tarifaire constatée après installation',
    audience: 'etiquette'
  },
  {
    theme: 'Créer une vitrine dynamique qui attire',
    pain: 'une vitrine statique qui n’accroche pas les passants',
    solution: 'des écrans vitrines lumineux avec scénarios animés',
    benefit: 'plus de visibilité aux heures de pointe',
    result: '35 % de trafic piéton supplémentaire mesuré sur 4 semaines',
    audience: 'promotion'
  },
  {
    theme: 'Simplifier la gestion des promotions flash',
    pain: 'imprimer et coller des promos temporaires chaque week-end',
    solution: 'des playlists d’offres planifiées sur écran',
    benefit: 'des promos visibles en temps réel sans effort',
    result: 'gain de 6 heures de manutention par semaine',
    audience: 'etiquette'
  },
  {
    theme: 'Moderniser l’expérience d’achat en boulangerie',
    pain: 'des ardoises effacées et difficiles à lire',
    solution: 'un écran promotionnel listant pains et pâtisseries du jour',
    benefit: 'une expérience premium et chaleureuse',
    result: 'hausse de 18 % des ventes de pâtisseries vedette',
    audience: 'promotion'
  },
  {
    theme: 'Aligner siège et points de vente',
    pain: 'des campagnes nationales mal déployées en magasin',
    solution: 'des écrans vitrines mis à jour depuis le siège',
    benefit: 'une image uniforme sur tout le réseau',
    result: 'lancement national déployé en 48 h dans 40 magasins',
    audience: 'etiquette'
  },
  {
    theme: 'Proposer des offres géolocalisées',
    pain: 'des promotions peu adaptées aux habitudes de quartier',
    solution: 'un contenu dynamique ciblé selon les moments de la journée',
    benefit: 'des messages hyper pertinents',
    result: 'taux de conversion vitrine x2 sur midi et soirée',
    audience: 'promotion'
  },
  {
    theme: 'Faciliter les inventaires de fin de mois',
    pain: 'des équipes qui re-saisissent manuellement les prix',
    solution: 'une synchronisation automatique ERP → écran',
    benefit: 'un inventaire fluide et fiable',
    result: 'réduction de 80 % des erreurs de stock valorisé',
    audience: 'etiquette'
  },
  {
    theme: 'Valoriser les nouveautés en salon de coiffure',
    pain: 'des flyers produits qui finissent à la poubelle',
    solution: 'un écran promotionnel près de la caisse',
    benefit: 'des ventes additionnelles sur les soins',
    result: 'panier moyen +22 % sur les produits capillaires',
    audience: 'promotion'
  },
  {
    theme: 'Renforcer la conformité réglementaire',
    pain: 'des contrôles prix qui tombent sans prévenir',
    solution: 'une preuve d’affichage à jour stockée dans le cloud',
    benefit: 'une tranquillité totale face aux inspections',
    result: '0 avertissement depuis le déploiement',
    audience: 'etiquette'
  },
  {
    theme: 'Mettre en scène les formules du midi',
    pain: 'un menu sur tableau qui devient illisible à midi',
    solution: 'un écran qui alterne menus et boissons en 4K',
    benefit: 'une salle qui commande plus vite',
    result: 'temps d’attente réduit de 5 minutes par client',
    audience: 'promotion'
  },
  {
    theme: 'Piloter le pricing en temps réel',
    pain: 'des promotions à appliquer manuellement dans chaque rayon',
    solution: 'un pilotage centralisé des écrans d’étiquetage',
    benefit: 'un time-to-market record sur vos promos',
    result: 'mise à jour en 10 minutes d’un catalogue de 8 000 références',
    audience: 'etiquette'
  },
  {
    theme: 'Créer une ambiance sur mesure en restaurant',
    pain: 'des offres happy hour peu visibles',
    solution: 'un écran moodboard avec cocktails, couleurs et prix',
    benefit: 'un pic de commandes sur les créneaux ciblés',
    result: 'CA apéritif +28 % en 3 semaines',
    audience: 'promotion'
  },
  {
    theme: 'Réduire la pénibilité en rayon',
    pain: 'changer 400 étiquettes manuellement chaque semaine',
    solution: 'un système plug-and-play qui automatise le changement',
    benefit: 'une équipe disponible pour le conseil client',
    result: 'satisfaction employé +30 % en enquête interne',
    audience: 'etiquette'
  },
  {
    theme: 'Animer la vitrine d’une pharmacie',
    pain: 'des affiches santé datées qui n’inspirent plus confiance',
    solution: 'un écran vitrine calibré pour la lumière extérieure',
    benefit: 'une expertise perçue instantanément',
    result: 'ventes croisées sur parapharmacie +17 %',
    audience: 'promotion'
  },
  {
    theme: 'Coordonner prix et campagnes nationales',
    pain: 'des campagnes médias qui n’atterrissent pas en rayon',
    solution: 'un habillage écran programmé en simultané TV & magasin',
    benefit: 'une expérience omnicanale cohérente',
    result: 'souvenir publicitaire +24 pts',
    audience: 'etiquette'
  },
  {
    theme: 'Digitaliser les menus sans perdre le charme',
    pain: 'des tableaux craie salissants et chronophages',
    solution: 'un écran bois & métal qui garde l’esprit artisanal',
    benefit: 'un storytelling premium sans effort',
    result: 'avis Google mentionnant le décor x3',
    audience: 'promotion'
  },
  {
    theme: 'Industrialiser la mise à jour promo multi-sites',
    pain: 'relancer 20 responsables de magasin pour afficher une promo',
    solution: 'un back-office qui pousse contenu et prix en un clic',
    benefit: 'une exécution parfaite du plan trade marketing',
    result: '95 % de magasins synchronisés en moins de 2 h',
    audience: 'etiquette'
  },
  {
    theme: 'Surprendre avec des écrans en vitrine de boulangerie',
    pain: 'des produits stars invisibles depuis la rue',
    solution: 'un écran lumineux qui met en avant les pièces du jour',
    benefit: 'une vitrine qui donne faim instantanément',
    result: 'trafic entrant +32 % sur la plage 7h-9h',
    audience: 'promotion'
  },
  {
    theme: 'Répondre aux attentes RSE',
    pain: 'des clients qui questionnent l’impact environnemental',
    solution: 'des écrans basse consommation remplaçant le papier',
    benefit: 'un plan RSE concret et chiffré',
    result: 'réduction de 2 tonnes de papier sur un an',
    audience: 'etiquette'
  },
  {
    theme: 'Amplifier les ventes additionnelles en caisse',
    pain: 'des offres complémentaires peu mises en avant',
    solution: 'un écran promotionnel juste avant le passage caisse',
    benefit: 'un rappel visuel des offres du moment',
    result: 'take-rate des offres boosté de 15 %',
    audience: 'promotion'
  },
  {
    theme: 'Accélérer l’onboarding des équipes saisonnières',
    pain: 'former chaque nouvelle recrue à la mise à jour des prix',
    solution: 'un affichage automatisé avec tutoriels intégrés',
    benefit: 'une mise en rayon maîtrisée dès le jour 1',
    result: 'temps de formation divisé par deux',
    audience: 'etiquette'
  },
  {
    theme: 'Créer des expériences vitrines par météo',
    pain: 'une communication figée malgré la météo changeante',
    solution: 'des scénarios météo qui adaptent offres & couleurs',
    benefit: 'des messages toujours pertinents',
    result: 'ventes de boissons fraîches +40 % lors des pics de chaleur',
    audience: 'promotion'
  },
  {
    theme: 'Garantir l’accessibilité des prix',
    pain: 'des caractères trop petits pour certains clients',
    solution: 'des écrans haute lisibilité avec zoom automatique',
    benefit: 'une expérience inclusive et règlementaire',
    result: 'retours clients positifs sur la lisibilité',
    audience: 'etiquette'
  },
  {
    theme: 'Transformer les files d’attente en opportunités',
    pain: 'des clients qui s’impatientent sans rien apprendre',
    solution: 'un écran qui diffuse offres, infos locales et avis',
    benefit: 'un temps perçu plus court',
    result: 'notation satisfaction +1,2 point',
    audience: 'promotion'
  },
  {
    theme: 'Sécuriser les marges en période d’inflation',
    pain: 'recaler les prix manuellement au risque d’oublis',
    solution: 'des listes de prix ajustées automatiquement',
    benefit: 'des marges protégées et transparentes',
    result: 'zéro oubli lors des 5 dernières hausses fournisseurs',
    audience: 'etiquette'
  },
  {
    theme: 'Lancer des campagnes saisonnières express',
    pain: 'des affiches de Noël encore présentes en janvier',
    solution: 'un calendrier éditorial automatisé sur écran',
    benefit: 'un message toujours dans la bonne saison',
    result: 'mise à jour saisonnière en moins de 30 minutes',
    audience: 'promotion'
  },
  {
    theme: 'Obtenir des données sur les performances en rayon',
    pain: 'difficile de savoir quelles promos performent',
    solution: 'des dashboards couplés aux écrans d’étiquetage',
    benefit: 'des décisions pilotées par la donnée',
    result: 'optimisation de 12 % du mix promo en 2 mois',
    audience: 'etiquette'
  },
  {
    theme: 'Créer un parcours client scénarisé',
    pain: 'un point de vente qui manque de storytelling',
    solution: 'des écrans qui racontent votre histoire en étapes',
    benefit: 'une expérience mémorable et instagrammable',
    result: 'temps passé en boutique +18 %',
    audience: 'promotion'
  },
  {
    theme: 'Automatiser les prix dynamiques',
    pain: 'ajuster manuellement les prix selon la demande',
    solution: 'un moteur de prix relié à vos écrans en direct',
    benefit: 'une agilité totale sur vos marges',
    result: 'hausse de 9 % du chiffre sur les catégories sensibles',
    audience: 'etiquette'
  }
];

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const angleTemplates = [
  {
    name: 'Problème/Solution',
    hook: (c) => `Stop au gaspillage : ${capitalize(c.pain)} appartiennent au passé.`,
    copy: (c, ad) => `Vos équipes subissent ${c.pain}. Nous déployons ${c.solution}, ce qui vous garantit ${c.benefit}. Résultat : ${c.result}.`,
    image: (c, ad) => `Visuel avant/après montrant ${ad.context} avec piles de papier puis les écrans lumineux ecran étiquetage.`,
    video: (c, ad) => `Plan 1: gros plan sur le ${ad.environment} encombré de papier. Plan 2: transition lumineuse vers les écrans digitalisés. Plan 3: zoom sur la mise à jour en direct et sourire de l’équipe.`,
    cta: () => 'Réservez une démonstration gratuite',
    testimonial: (c, ad) => `« Depuis l’installation, ${c.result.toLowerCase()}. » — ${ad.testimonialName}`,
    prompt: (platformLabel, c, ad) => `Design a ${platformLabel} post highlighting a before/after story about reducing paper waste with digital price screens in a ${ad.context}.`
  },
  {
    name: 'Données & Impact',
    hook: (c) => `${c.result} : voici le pouvoir d’un affichage digital bien piloté.`,
    copy: (c, ad) => `Chiffres à la clé : ${c.result}. En basculant vers ${c.solution}, vous combinez performance et simplicité pour ${ad.label}. Résultat : ${c.benefit}.`,
    image: (c, ad) => `Infographie en français présentant ${c.result} et les bénéfices clés pour ${ad.label}.`,
    video: (c, ad) => `Montage dynamique avec chiffres animés, pictos éco-responsables et plans d’un ${ad.environment}.`,
    cta: () => 'Téléchargez le kit chiffres & ROI',
    testimonial: (c, ad) => `Mettre en avant un verbatim client + chiffre ROI (${c.result}).`,
    prompt: (platformLabel, c, ad) => `Create a ${platformLabel} infographic style post in French showcasing ROI metrics of digital signage for ${ad.label}.`
  },
  {
    name: 'Coulisses opérationnelles',
    hook: () => 'Une journée sans stress cadastré : voici comment votre équipe gagne du temps.',
    copy: (c, ad) => `Imaginez : plus de colle, plus de cutter. Les prix se mettent à jour automatiquement et vos collaborateurs se concentrent enfin sur l’accueil. Le bénéfice quotidien : ${c.benefit}.`,
    image: (c, ad) => `Storyboard photo montrant un collaborateur qui met à jour sa tablette pendant que l’écran change instantanément.`,
    video: (c, ad) => `Format tutoriel où l’on voit un manager modifier un prix sur tablette, puis l’écran se rafraîchir en live.`,
    cta: () => 'Planifiez un audit de vos étiquettes',
    testimonial: (c, ad) => `Scénariser une mini-interview d’un responsable expliquant le temps gagné.`,
    prompt: (platformLabel, c, ad) => `Produce a ${platformLabel} behind-the-scenes storyboard showing staff updating digital price screens effortlessly.`
  },
  {
    name: 'Expérience client',
    hook: (c) => `Un point de vente mémorable commence par ${c.benefit}.`,
    copy: (c, ad) => `Vos clients veulent des infos claires, rapides et attractives. Avec ${c.solution}, l’expérience est fluide et vos conseillers respirent. Résultat : ${c.result}.`,
    image: (c, ad) => `Moodboard couleurs chaudes + gros plans clients découvrant l’offre sur écran.`,
    video: (c, ad) => `Micro-trottoir filmé en boutique : réactions de clients qui découvrent l’écran et comprennent tout en 3 secondes.`,
    cta: () => 'Réservez votre session de design vitrine',
    testimonial: (c, ad) => `Idée de témoignage axé satisfaction client (« On nous félicite pour la clarté des prix »).`,
    prompt: (platformLabel, c, ad) => `Craft a ${platformLabel} concept reel capturing customer reactions to dynamic digital price displays.`
  },
  {
    name: 'Innovation & Vision',
    hook: () => 'Ce que les enseignes leaders ont déjà adopté pour garder une longueur d’avance.',
    copy: (c, ad) => `Les pionniers du retail français misent sur des écrans intelligents pour orchestrer promos, storytelling et conformité. Ne laissez pas vos concurrents prendre l’avance. Focus : ${c.theme}.`,
    image: (c, ad) => `Mockup futuriste d’un rayon digitalisé avec éléments holographiques subtils.`,
    video: (c, ad) => `Motion design expliquant la vision smart retail + citations de tendances marché.`,
    cta: () => 'Découvrez notre roadmap innovation',
    testimonial: (c, ad) => `Proposer un témoignage visionnaire (« On prépare nos rayons pour les 5 prochaines années »).`,
    prompt: (platformLabel, c, ad) => `Generate a ${platformLabel} motion graphic concept about the future of smart retail with digital price signage.`
  },
  {
    name: 'Preuve sociale',
    hook: () => 'Ils ont franchi le cap, voici le résultat.',
    copy: (c, ad) => `De la supérette urbaine à la boulangerie artisanale, nos écrans transforment l’expérience et boostent vos KPI. Résultat phare : ${c.result}.`,
    image: (c, ad) => `Mosaïque de photos clients avec citations courtes et logos (format témoignages).`,
    video: (c, ad) => `Compilation de mini témoignages vidéo, sous-titrés en français, rythmé façon reportage.`,
    cta: () => 'Demandez vos études de cas sectorielles',
    testimonial: (c, ad) => `Encourager à récolter un avis client en vidéo ou Google review.`,
    prompt: (platformLabel, c, ad) => `Design a ${platformLabel} testimonial showcase featuring multiple French retail owners praising digital price displays.`
  }
];

const ctas = [
  'Réservez une démonstration gratuite',
  'Demandez votre devis en 24h',
  'Planifiez un audit de vos étiquettes',
  'Téléchargez le kit chiffres & ROI',
  'Réservez votre session de design vitrine',
  'Découvrez notre roadmap innovation'
];

const formatDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  }).format(date);
};

const buildEntry = ({ platform, dayIndex, postIndex, context }) => {
  const angle = angleTemplates[(dayIndex * 3 + postIndex) % angleTemplates.length];
  const ad = audienceDetails[context.audience];
  const postDate = new Date(startDate);
  postDate.setDate(startDate.getDate() + dayIndex);
  const formattedDate = formatDate(postDate);
  const label = platformConfigs[platform];
  const promptLabel = label.promptType;
  const time = platformConfigs[platform].times[postIndex % platformConfigs[platform].times.length];
  const cta = ctas[(dayIndex + postIndex) % ctas.length];

  return {
    jour: `Jour ${dayIndex + 1}`,
    date: formattedDate,
    horaire: time,
    thématique: context.theme,
    accroche: angle.hook(context),
    copywriting: angle.copy(context, ad),
    idéeVisuel: angle.image(context, ad),
    idéeVideo: angle.video(context, ad),
    cta,
    idéeTémoignage: angle.testimonial(context, ad),
    prompt: angle.prompt(promptLabel, context, ad)
  };
};

const generatePlan = () => {
  const result = {
    facebook: [],
    instagram: [],
    tiktok: []
  };

  Object.keys(platformConfigs).forEach((platform) => {
    for (let dayIndex = 0; dayIndex < 30; dayIndex += 1) {
      const context = dayContexts[dayIndex % dayContexts.length];
      for (let postIndex = 0; postIndex < 3; postIndex += 1) {
        result[platform].push(buildEntry({ platform, dayIndex, postIndex, context }));
      }
    }
  });

  return result;
};

const exportToXlsx = (data) => {
  const workbook = xlsx.utils.book_new();
  Object.entries(data).forEach(([platform, entries]) => {
    const worksheet = xlsx.utils.json_to_sheet(entries);
    xlsx.utils.book_append_sheet(workbook, worksheet, platform.charAt(0).toUpperCase() + platform.slice(1));
  });

  const outputPath = path.join(rootDir, 'public', 'content-plan.xlsx');
  xlsx.writeFile(workbook, outputPath);
};

const writeJson = (data) => {
  const outputPath = path.join(rootDir, 'data', 'content-plan.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
};

const ensureDirs = () => {
  const dataDir = path.join(rootDir, 'data');
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
};

const main = () => {
  ensureDirs();
  const plan = generatePlan();
  writeJson(plan);
  exportToXlsx(plan);
  console.log('Content plan generated: data/content-plan.json & public/content-plan.xlsx');
};

main();
