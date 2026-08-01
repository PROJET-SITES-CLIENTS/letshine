// LET'S SHINE comprehensive site data with real images
// All multilingual content lives here so components stay clean.

export type Locale = "fr" | "en" | "es";

export type PageId =
  | "home"
  | "about"
  | "programs"
  | "program-detail"
  | "formations"
  | "formation-detail"
  | "shop"
  | "product-detail"
  | "services"
  | "partners"
  | "news"
  | "article-detail"
  | "media"
  | "events"
  | "donate"
  | "member"
  | "contact"
  | "admin";

export const adminNavItem: { id: PageId; key: string } = { id: "admin", key: "nav.admin" };

export const navItems: { id: PageId; key: string }[] = [
  { id: "home", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "programs", key: "nav.programs" },
  { id: "formations", key: "nav.formations" },
  { id: "shop", key: "nav.shop" },
  { id: "services", key: "nav.services" },
  { id: "partners", key: "nav.partners" },
  { id: "news", key: "nav.news" },
  { id: "media", key: "nav.media" },
  { id: "events", key: "nav.events" },
  { id: "donate", key: "nav.donate" },
  { id: "member", key: "nav.member" },
  { id: "contact", key: "nav.contact" },
];

export const stats = [
  { value: 12500, suffix: "+", key: "stats.youth" },
  { value: 18, suffix: "", key: "stats.programs" },
  { value: 14, suffix: "", key: "stats.countries" },
  { value: 87, suffix: "", key: "stats.partners" },
];

export const values = [
  { icon: "Crown", key: "values.excellence", color: "from-amber-400 to-yellow-500", image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80" },
  { icon: "ShieldCheck", key: "values.integrity", color: "from-blue-500 to-blue-700", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { icon: "Lightbulb", key: "values.innovation", color: "from-yellow-400 to-amber-500", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
  { icon: "Target", key: "values.impact", color: "from-emerald-400 to-teal-600", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { icon: "HeartHandshake", key: "values.solidarity", color: "from-rose-400 to-pink-600", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80" },
  { icon: "Rocket", key: "values.empowerment", color: "from-purple-400 to-indigo-600", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
];

export const objectives = [
  { fr: "Former 50 000 jeunes d'ici 2030 aux compétences du 21e siècle", en: "Train 50,000 youth by 2030 in 21st century skills", es: "Formar a 50.000 jóvenes de aquí a 2030 en habilidades del siglo XXI" },
  { fr: "Accompagner 5 000 projets entrepreneuriaux vers la viabilité", en: "Support 5,000 entrepreneurial projects toward viability", es: "Acompañar 5.000 proyectos emprendedores hacia la viabilidad" },
  { fr: "Créer un réseau panafricain de 1 000 mentors certifiés", en: "Create a pan-African network of 1,000 certified mentors", es: "Crear una red panafricana de 1.000 mentores certificados" },
  { fr: "Établir des partenariats dans 25 pays africains", en: "Establish partnerships in 25 African countries", es: "Establecer alianzas en 25 países africanos" },
  { fr: "Certifier 20 000 jeunes via nos programmes de formation", en: "Certify 20,000 youth through our training programs", es: "Certificar a 20.000 jóvenes a través de nuestros programas de formación" },
  { fr: "Générer 10 000 emplois directs et indirects", en: "Generate 10,000 direct and indirect jobs", es: "Generar 10.000 empleos directos e indirectos" },
];

export type Program = {
  id: string;
  icon: string;
  color: string;
  gradient: string;
  image: string;
  gallery: string[];
  title: { fr: string; en: string; es: string };
  short: { fr: string; en: string; es: string };
  description: { fr: string; en: string; es: string };
  objectives: { fr: string[]; en: string[]; es: string[] };
  target: { fr: string; en: string; es: string };
  results: { fr: string[]; en: string[]; es: string[] };
};

export const programs: Program[] = [
  {
    id: "impact-jeunes",
    icon: "Sparkles",
    color: "text-amber-500",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
    ],
    title: { fr: "IMPACT JEUNES", en: "YOUTH IMPACT", es: "IMPACTO JÓVENES" },
    short: { fr: "Le programme phare pour révéler le potentiel de chaque jeune.", en: "The flagship program to reveal each youth's potential.", es: "El programa insignia para revelar el potencial de cada joven." },
    description: {
      fr: "IMPACT JEUNES est un parcours intensif de 6 mois qui combine formation au leadership, développement personnel et immersion en entreprise. Chaque cohorte accompagne 200 jeunes vers une insertion professionnelle ou un lancement entrepreneurial. Le programme s'articule autour de modules pratiques, de mentorat individuel, d'ateliers de pitch et d'une mise en situation réelle en entreprise partenaire.",
      en: "IMPACT JEUNES is an intensive 6-month journey combining leadership training, personal development and business immersion. Each cohort supports 200 youth toward professional integration or entrepreneurial launch. The program is built around practical modules, individual mentorship, pitch workshops and real-world immersion in partner companies.",
      es: "IMPACT JEUNES es un recorrido intensivo de 6 meses que combina formación en liderazgo, desarrollo personal e inmersión empresarial. Cada cohorte acompaña a 200 jóvenes hacia la inserción profesional o el lanzamiento emprendedor. El programa se articula en módulos prácticos, mentoría individual, talleres de pitch y una inmersión real en empresas socias.",
    },
    objectives: {
      fr: ["Développer le leadership personnel", "Renforcer les soft skills", "Créer un réseau professionnel actif", "Faciliter l'insertion socio-économique"],
      en: ["Develop personal leadership", "Strengthen soft skills", "Create an active professional network", "Facilitate socio-economic integration"],
      es: ["Desarrollar el liderazgo personal", "Fortalecer las soft skills", "Crear una red profesional activa", "Facilitar la integración socioeconómica"],
    },
    target: { fr: "Jeunes de 18 à 35 ans, diplômés ou non, en recherche d'opportunités", en: "Youth aged 18-35, graduates or not, seeking opportunities", es: "Jóvenes de 18 a 35 años, graduados o no, en busca de oportunidades" },
    results: {
      fr: ["3 200 jeunes formés depuis 2021", "68% d'insertion professionnelle", "412 entreprises créées", "92% de satisfaction"],
      en: ["3,200 youth trained since 2021", "68% professional integration", "412 businesses created", "92% satisfaction rate"],
      es: ["3.200 jóvenes formados desde 2021", "68% de inserción profesional", "412 empresas creadas", "92% de satisfacción"],
    },
  },
  {
    id: "leadership",
    icon: "Crown",
    color: "text-blue-600",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    ],
    title: { fr: "Leadership", en: "Leadership", es: "Liderazgo" },
    short: { fr: "Forgez les leaders africains de demain.", en: "Forge tomorrow's African leaders.", es: "Forja los líderes africanos del mañana." },
    description: {
      fr: "Le programme Leadership forme des jeunes capables de conduire des équipes, des projets et des communautés. Sur 4 mois, les participants apprennent à décider, communiquer et inspirer dans des contextes complexes. Le cursus combine théorie du leadership, études de cas africains, simulation de crise et coaching individuel.",
      en: "The Leadership program trains young people capable of leading teams, projects and communities. Over 4 months, participants learn to decide, communicate and inspire in complex contexts. The curriculum combines leadership theory, African case studies, crisis simulation and individual coaching.",
      es: "El programa Liderazgo forma a jóvenes capaces de dirigir equipos, proyectos y comunidades. Durante 4 meses, los participantes aprenden a decidir, comunicar e inspirar en contextos complejos. El currículo combina teoría del liderazgo, casos africanos, simulación de crisis y coaching individual.",
    },
    objectives: {
      fr: ["Maîtriser les fondamentaux du leadership", "Développer l'intelligence émotionnelle", "Piloter des projets à impact", "Inspirer et mobiliser des équipes"],
      en: ["Master leadership fundamentals", "Develop emotional intelligence", "Drive impact projects", "Inspire and mobilize teams"],
      es: ["Dominar los fundamentos del liderazgo", "Desarrollar la inteligencia emocional", "Liderar proyectos de impacto", "Inspirar y movilizar equipos"],
    },
    target: { fr: "Jeunes aspirant à des postes de responsabilité", en: "Youth aspiring to positions of responsibility", es: "Jóvenes que aspiran a puestos de responsabilidad" },
    results: {
      fr: ["1 800 leaders formés", "350 promotions à des postes de direction", "85% sentent une vraie progression"],
      en: ["1,800 leaders trained", "350 promotions to management positions", "85% feel real progress"],
      es: ["1.800 líderes formados", "350 promociones a puestos de dirección", "85% siente un progreso real"],
    },
  },
  {
    id: "developpement-personnel",
    icon: "Brain",
    color: "text-emerald-600",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
      "https://images.unsplash.com/photo-1542744095-fcf79dcdc9b9?w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    ],
    title: { fr: "Développement personnel", en: "Personal Development", es: "Desarrollo personal" },
    short: { fr: "Construisez la meilleure version de vous-même.", en: "Build the best version of yourself.", es: "Construye la mejor versión de ti mismo." },
    description: {
      fr: "Le programme de Développement Personnel aide chaque jeune à mieux se connaître, gérer son temps, ses émotions et ses objectifs. Une transformation intérieure qui se traduit par des résultats extérieurs tangibles. Ateliers, journaling, coaching en groupe et défis personnels rythment les 3 mois du parcours.",
      en: "The Personal Development program helps each young person better know themselves, manage their time, emotions and goals. An inner transformation that translates into tangible outer results. Workshops, journaling, group coaching and personal challenges punctuate the 3-month journey.",
      es: "El programa de Desarrollo Personal ayuda a cada joven a conocerse mejor, gestionar su tiempo, sus emociones y sus objetivos. Una transformación interior que se traduce en resultados exteriores tangibles. Talleres, journaling, coaching grupal y desafíos personales marcan los 3 meses del recorrido.",
    },
    objectives: {
      fr: ["Clarifier ses valeurs et son projet de vie", "Maîtriser la gestion du temps", "Renforcer la résilience", "Élaborer une vision personnelle"],
      en: ["Clarify values and life project", "Master time management", "Strengthen resilience", "Develop a personal vision"],
      es: ["Aclarar valores y proyecto de vida", "Dominar la gestión del tiempo", "Fortalecer la resiliencia", "Elaborar una visión personal"],
    },
    target: { fr: "Tout jeune en quête de sens et d'équilibre", en: "Any young person seeking meaning and balance", es: "Cualquier joven en busca de sentido y equilibrio" },
    results: {
      fr: ["2 400 participants", "78% rapportent une meilleure confiance", "65% atteignent leurs objectifs annuels"],
      en: ["2,400 participants", "78% report better confidence", "65% reach their annual goals"],
      es: ["2.400 participantes", "78% reportan mayor confianza", "65% alcanzan sus objetivos anuales"],
    },
  },
  {
    id: "entrepreneuriat",
    icon: "Rocket",
    color: "text-orange-600",
    gradient: "from-orange-500 via-red-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      "https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?w=800&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    ],
    title: { fr: "Entrepreneuriat", en: "Entrepreneurship", es: "Emprendimiento" },
    short: { fr: "De l'idée à l'entreprise viable.", en: "From idea to viable business.", es: "De la idea a la empresa viable." },
    description: {
      fr: "Le programme Entrepreneuriat accompagne les jeunes porteurs de projet, de l'idéation au premier million de FCFA de chiffre d'affaires. Mentorat, financement amont et accès au marché inclus. Le parcours s'étale sur 8 mois avec 4 phases : idéation, validation, lancement, croissance.",
      en: "The Entrepreneurship program supports young project leaders, from ideation to the first million FCFA in revenue. Mentorship, upstream financing and market access included. The journey spans 8 months with 4 phases: ideation, validation, launch, growth.",
      es: "El programa Emprendimiento acompaña a los jóvenes con proyectos, desde la ideación hasta el primer millón de FCFA en ingresos. Mentoría, financiación inicial y acceso al mercado incluidos. El recorrido se extiende 8 meses con 4 fases: ideación, validación, lanzamiento, crecimiento.",
    },
    objectives: {
      fr: ["Valider son idée sur le marché", "Construire un business model solide", "Lever son premier financement", "Structurer son entreprise juridiquement"],
      en: ["Validate your idea on the market", "Build a solid business model", "Raise first funding", "Structure your company legally"],
      es: ["Validar tu idea en el mercado", "Construir un modelo de negocio sólido", "Levantar tu primera financiación", "Estructurar tu empresa legalmente"],
    },
    target: { fr: "Porteurs de projet et jeunes entrepreneurs en phase amont", en: "Project leaders and early-stage young entrepreneurs", es: "Promotores de proyectos y jóvenes emprendedores en fase inicial" },
    results: {
      fr: ["412 entreprises lancées", "1,2M€ levés par les cohortes", "78% de survie à 2 ans"],
      en: ["412 businesses launched", "€1.2M raised by cohorts", "78% survival at 2 years"],
      es: ["412 empresas lanzadas", "1,2M€ levantados por las cohortes", "78% de supervivencia a 2 años"],
    },
  },
  {
    id: "employabilite",
    icon: "Briefcase",
    color: "text-purple-600",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
    ],
    title: { fr: "Employabilité", en: "Employability", es: "Empleabilidad" },
    short: { fr: "Les compétences que les employeurs recherchent.", en: "The skills employers are looking for.", es: "Las competencias que los empleadores buscan." },
    description: {
      fr: "Le programme Employabilité dote les jeunes des compétences techniques et comportementales recherchées par les entreprises : CV, entretiens, codes professionnels, outils numériques. Sur 3 mois, les participants construisent un profil professionnel complet et décrochent un stage ou un emploi.",
      en: "The Employability program equips youth with the technical and behavioral skills sought by companies: CV, interviews, professional codes, digital tools. Over 3 months, participants build a complete professional profile and secure an internship or job.",
      es: "El programa Empleabilidad dota a los jóvenes de las competencias técnicas y comportamentales que buscan las empresas: CV, entrevistas, códigos profesionales, herramientas digitales. Durante 3 meses, los participantes construyen un perfil profesional completo y consiguen una práctica o empleo.",
    },
    objectives: {
      fr: ["Construire un CV professionnel impactant", "Maîtriser les entretiens d'embauche", "Acquérir les outils numériques de base", "Comprendre les codes de l'entreprise"],
      en: ["Build an impactful professional CV", "Master job interviews", "Acquire basic digital tools", "Understand company codes"],
      es: ["Construir un CV profesional impactante", "Dominar las entrevistas de trabajo", "Adquirir herramientas digitales básicas", "Comprender los códigos de la empresa"],
    },
    target: { fr: "Jeunes diplômés en recherche d'emploi", en: "Young graduates seeking employment", es: "Jóvenes graduados en busca de empleo" },
    results: {
      fr: ["5 600 jeunes accompagnés", "72% d'insertion à 6 mois", "1 200 stages décrochés"],
      en: ["5,600 youth supported", "72% integration at 6 months", "1,200 internships secured"],
      es: ["5.600 jóvenes acompañados", "72% de inserción a 6 meses", "1.200 prácticas conseguidas"],
    },
  },
  {
    id: "orientation",
    icon: "Compass",
    color: "text-cyan-600",
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    ],
    title: { fr: "Orientation professionnelle", en: "Career Guidance", es: "Orientación profesional" },
    short: { fr: "Trouvez votre voie avec confiance.", en: "Find your path with confidence.", es: "Encuentra tu camino con confianza." },
    description: {
      fr: "L'orientation professionnelle aide les jeunes à choisir des filières alignées avec leurs talents et les besoins du marché. Tests, immersions et coaching personnalisé. Sur 2 mois, chaque participant construit un plan de carrière clair et actionnable.",
      en: "Career guidance helps youth choose fields aligned with their talents and market needs. Tests, immersions and personalized coaching. Over 2 months, each participant builds a clear and actionable career plan.",
      es: "La orientación profesional ayuda a los jóvenes a elegir fields alineados con sus talentos y las necesidades del mercado. Tests, inmersiones y coaching personalizado. Durante 2 meses, cada participante construye un plan de carrera claro y accionable.",
    },
    objectives: {
      fr: ["Identifier ses talents naturels", "Découvrir les métiers porteurs", "Construire un plan de carrière", "S'orienter vers les bonnes filières"],
      en: ["Identify natural talents", "Discover promising careers", "Build a career plan", "Orient toward the right fields"],
      es: ["Identificar talentos naturales", "Descubrir profesiones prometedoras", "Construir un plan de carrera", "Orientarse hacia las fields correctas"],
    },
    target: { fr: "Élèves de terminale, étudiants et jeunes en réorientation", en: "Final-year students, university students and young people reorienting", es: "Estudiantes de último año, universitarios y jóvenes en reorientación" },
    results: {
      fr: ["3 800 jeunes orientés", "85% satisfaits de leur choix", "Réduction de 40% des abandons"],
      en: ["3,800 youth guided", "85% satisfied with their choice", "40% reduction in dropouts"],
      es: ["3.800 jóvenes orientados", "85% satisfechos con su elección", "Reducción del 40% de abandonos"],
    },
  },
  {
    id: "formation-linguistique",
    icon: "Languages",
    color: "text-rose-600",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    ],
    title: { fr: "Formation linguistique", en: "Language Training", es: "Formación lingüística" },
    short: { fr: "L'anglais, l'espagnol et le français pour s'ouvrir au monde.", en: "English, Spanish and French to open up to the world.", es: "Inglés, español y francés para abrirse al mundo." },
    description: {
      fr: "Maîtriser les langues, c'est s'ouvrir à des opportunités régionales et internationales. Notre programme linguistique combine cours, immersion et certification officielle. 4 niveaux du A1 au C1, avec un focus sur l'oral professionnel.",
      en: "Mastering languages means opening up to regional and international opportunities. Our language program combines courses, immersion and official certification. 4 levels from A1 to C1, with a focus on professional oral skills.",
      es: "Dominar los idiomas significa abrirse a oportunidades regionales e internacionales. Nuestro programa lingüístico combina cursos, inmersión y certificación oficial. 4 niveles del A1 al C1, con enfoque en la oralidad profesional.",
    },
    objectives: {
      fr: ["Atteindre le niveau B2 minimum", "Préparer le TOEIC/IELTS", "Pratiquer l'immersion orale", "Obtenir une certification reconnue"],
      en: ["Reach minimum B2 level", "Prepare for TOEIC/IELTS", "Practice oral immersion", "Obtain recognized certification"],
      es: ["Alcanzar el nivel B2 mínimo", "Preparar el TOEIC/IELTS", "Practicar la inmersión oral", "Obtener certificación reconocida"],
    },
    target: { fr: "Tout jeune souhaitant améliorer ses compétences linguistiques", en: "Any young person wishing to improve their language skills", es: "Cualquier joven que desee mejorar sus competencias lingüísticas" },
    results: {
      fr: ["2 100 certifiés", "85% atteignent B2", "320 bourses d'études à l'étranger"],
      en: ["2,100 certified", "85% reach B2", "320 study abroad scholarships"],
      es: ["2.100 certificados", "85% alcanzan B2", "320 becas de estudio en el extranjero"],
    },
  },
  {
    id: "mentorat",
    icon: "HeartHandshake",
    color: "text-yellow-600",
    gradient: "from-yellow-500 via-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    ],
    title: { fr: "Mentorat", en: "Mentoring", es: "Mentoría" },
    short: { fr: "Un mentor dévoué pour chaque jeune.", en: "A dedicated mentor for every youth.", es: "Un mentor dedicado para cada joven." },
    description: {
      fr: "Le programme Mentorat connecte chaque jeune à un mentor expérimenté de son secteur. Un accompagnement personnalisé de 12 mois pour accélérer sa trajectoire. Rencontres mensuelles, suivi à distance et objectifs définis ensemble au démarrage.",
      en: "The Mentoring program connects each youth with an experienced mentor in their sector. A personalized 12-month journey to accelerate their trajectory. Monthly meetings, remote follow-up and objectives defined together at launch.",
      es: "El programa Mentoría conecta a cada joven con un mentor experimentado de su sector. Un acompañamiento personalizado de 12 meses para acelerar su trayectoria. Encuentros mensuales, seguimiento remoto y objetivos definidos juntos al inicio.",
    },
    objectives: {
      fr: ["Bénéficier d'un accompagnement personnalisé", "Élargir son réseau professionnel", "Accélérer sa carrière", "Transmettre et recevoir"],
      en: ["Benefit from personalized support", "Expand professional network", "Accelerate career", "Transmit and receive"],
      es: ["Beneficiarse de un acompañamiento personalizado", "Ampliar la red profesional", "Acelerar la carrera", "Transmitir y recibir"],
    },
    target: { fr: "Jeunes en début de carrière ou en reconversion", en: "Young people starting their career or retraining", es: "Jóvenes al inicio de su carrera o en reconversión" },
    results: {
      fr: ["1 500 binômes mentor-mentoré", "93% de maintien à 12 mois", "Salaires en hausse de 28%"],
      en: ["1,500 mentor-mentee pairs", "93% retention at 12 months", "Salaries up 28%"],
      es: ["1.500 parejas mentor-mentorizado", "93% de retención a 12 meses", "Salarios aumentaron 28%"],
    },
  },
];

export type Formation = {
  id: string;
  icon: string;
  image: string;
  category: { fr: string; en: string; es: string };
  title: { fr: string; en: string; es: string };
  description: { fr: string; en: string; es: string };
  duration: { fr: string; en: string; es: string };
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  mode: ("online" | "offline")[];
  price: number;
  rating: number;
  students: number;
  program: { fr: string[]; en: string[]; es: string[] };
  certificate: boolean;
  popular?: boolean;
};

export const formations: Formation[] = [
  {
    id: "f1",
    icon: "Code2",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    category: { fr: "Numérique", en: "Digital", es: "Digital" },
    title: { fr: "Développement Web Full-Stack", en: "Full-Stack Web Development", es: "Desarrollo Web Full-Stack" },
    description: {
      fr: "Maîtrisez HTML, CSS, JavaScript, React, Node.js et les bases de données. Devenez développeur opérationnel en 6 mois. Le programme combine cours théoriques, ateliers pratiques, projets clients réels et préparation à l'emploi.",
      en: "Master HTML, CSS, JavaScript, React, Node.js and databases. Become an operational developer in 6 months. The program combines theoretical courses, practical workshops, real client projects and job preparation.",
      es: "Domina HTML, CSS, JavaScript, React, Node.js y bases de datos. Conviértete en desarrollador operativo en 6 meses. El programa combina cursos teóricos, talleres prácticos, proyectos cliente reales y preparación para el empleo.",
    },
    duration: { fr: "6 mois (480h)", en: "6 months (480h)", es: "6 meses (480h)" },
    level: "Intermédiaire",
    mode: ["online", "offline"],
    price: 450000,
    rating: 4.9,
    students: 842,
    program: {
      fr: ["Fondamentaux du web (HTML, CSS)", "JavaScript moderne (ES6+)", "React & Next.js", "Backend avec Node.js & Express", "Bases de données (SQL, MongoDB)", "Déploiement et DevOps", "Projet capstone"],
      en: ["Web fundamentals (HTML, CSS)", "Modern JavaScript (ES6+)", "React & Next.js", "Backend with Node.js & Express", "Databases (SQL, MongoDB)", "Deployment and DevOps", "Capstone project"],
      es: ["Fundamentos web (HTML, CSS)", "JavaScript moderno (ES6+)", "React & Next.js", "Backend con Node.js & Express", "Bases de datos (SQL, MongoDB)", "Despliegue y DevOps", "Proyecto capstone"],
    },
    certificate: true,
    popular: true,
  },
  {
    id: "f2",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    category: { fr: "Marketing", en: "Marketing", es: "Marketing" },
    title: { fr: "Marketing Digital & Réseaux Sociaux", en: "Digital Marketing & Social Media", es: "Marketing Digital y Redes Sociales" },
    description: {
      fr: "Stratégie de contenu, SEO/SEA, community management, analytique. Devenez un marketeur digital complet. 4 mois de formation intensive avec mise en pratique sur des comptes réels.",
      en: "Content strategy, SEO/SEA, community management, analytics. Become a complete digital marketer. 4 months of intensive training with hands-on practice on real accounts.",
      es: "Estrategia de contenido, SEO/SEA, community management, analítica. Conviértete en un marketero digital completo. 4 meses de formación intensiva con práctica en cuentas reales.",
    },
    duration: { fr: "4 mois (240h)", en: "4 months (240h)", es: "4 meses (240h)" },
    level: "Débutant",
    mode: ["online", "offline"],
    price: 280000,
    rating: 4.8,
    students: 1203,
    program: {
      fr: ["Stratégie de contenu", "SEO & SEA", "Community management", "Email marketing", "Analytique (GA4)", "Publicité payante", "Projet client réel"],
      en: ["Content strategy", "SEO & SEA", "Community management", "Email marketing", "Analytics (GA4)", "Paid advertising", "Real client project"],
      es: ["Estrategia de contenido", "SEO & SEA", "Community management", "Email marketing", "Analítica (GA4)", "Publicidad pagada", "Proyecto cliente real"],
    },
    certificate: true,
    popular: true,
  },
  {
    id: "f3",
    icon: "BarChart3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    category: { fr: "Data", en: "Data", es: "Datos" },
    title: { fr: "Data Analyse & Business Intelligence", en: "Data Analysis & Business Intelligence", es: "Análisis de Datos & Business Intelligence" },
    description: {
      fr: "Excel avancé, SQL, Power BI, Python pour la data. Prenez des décisions basées sur la donnée. Formation professionnalisante avec cas d'usage africains.",
      en: "Advanced Excel, SQL, Power BI, Python for data. Make data-driven decisions. Professional training with African use cases.",
      es: "Excel avanzado, SQL, Power BI, Python para datos. Toma decisiones basadas en datos. Formación profesionalizante con casos de uso africanos.",
    },
    duration: { fr: "5 mois (320h)", en: "5 months (320h)", es: "5 meses (320h)" },
    level: "Intermédiaire",
    mode: ["online", "offline"],
    price: 380000,
    rating: 4.9,
    students: 524,
    program: {
      fr: ["Statistiques pour la data", "Excel avancé & Power Query", "SQL pour l'analyse", "Power BI & Tableau", "Python (Pandas, NumPy)", "Storytelling avec données", "Projet BI complet"],
      en: ["Statistics for data", "Advanced Excel & Power Query", "SQL for analysis", "Power BI & Tableau", "Python (Pandas, NumPy)", "Data storytelling", "Full BI project"],
      es: ["Estadística para datos", "Excel avanzado & Power Query", "SQL para análisis", "Power BI & Tableau", "Python (Pandas, NumPy)", "Storytelling con datos", "Proyecto BI completo"],
    },
    certificate: true,
  },
  {
    id: "f4",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    category: { fr: "Numérique", en: "Digital", es: "Digital" },
    title: { fr: "Développement Mobile (Flutter)", en: "Mobile Development (Flutter)", es: "Desarrollo Móvil (Flutter)" },
    description: {
      fr: "Créez des applications iOS et Android avec Flutter et Dart. Une seule codebase, deux stores. Formation 100% pratique avec publication sur les stores.",
      en: "Build iOS and Android apps with Flutter and Dart. One codebase, two stores. 100% practical training with store publishing.",
      es: "Crea aplicaciones iOS y Android con Flutter y Dart. Una sola base de código, dos stores. Formación 100% práctica con publicación en stores.",
    },
    duration: { fr: "5 mois (300h)", en: "5 months (300h)", es: "5 meses (300h)" },
    level: "Intermédiaire",
    mode: ["online"],
    price: 400000,
    rating: 4.7,
    students: 318,
    program: {
      fr: ["Dart fundamentals", "Flutter UI & widgets", "State management", "APIs & backend", "Firebase integration", "Publication stores", "Projet app complète"],
      en: ["Dart fundamentals", "Flutter UI & widgets", "State management", "APIs & backend", "Firebase integration", "Store publishing", "Full app project"],
      es: ["Fundamentos de Dart", "Flutter UI & widgets", "Gestión de estado", "APIs & backend", "Integración Firebase", "Publicación stores", "Proyecto app completa"],
    },
    certificate: true,
  },
  {
    id: "f5",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1510511459019-5f773103e234?w=1200&q=80",
    category: { fr: "Cybersécurité", en: "Cybersecurity", es: "Ciberseguridad" },
    title: { fr: "Cybersécurité & Ethical Hacking", en: "Cybersecurity & Ethical Hacking", es: "Ciberseguridad & Hacking Ético" },
    description: {
      fr: "Sécurisez les systèmes, apprenez le pentesting, préparez la certification CEH. Formation avancée avec labs pratiques et CTF.",
      en: "Secure systems, learn pentesting, prepare for CEH certification. Advanced training with practical labs and CTF.",
      es: "Asegura sistemas, aprende pentesting, prepárate para la certificación CEH. Formación avanzada con labs prácticos y CTF.",
    },
    duration: { fr: "6 mois (360h)", en: "6 months (360h)", es: "6 meses (360h)" },
    level: "Avancé",
    mode: ["online", "offline"],
    price: 520000,
    rating: 4.9,
    students: 215,
    program: {
      fr: ["Fondamentaux réseau & sécurité", "Cryptographie appliquée", "Pentesting web & réseau", "OSINT & reconnaissance", "Forensic & incident response", "Préparation CEH", "CTF & labs"],
      en: ["Network & security fundamentals", "Applied cryptography", "Web & network pentesting", "OSINT & reconnaissance", "Forensic & incident response", "CEH preparation", "CTF & labs"],
      es: ["Fundamentos de red y seguridad", "Criptografía aplicada", "Pentesting web y red", "OSINT & reconocimiento", "Forensic & respuesta a incidentes", "Preparación CEH", "CTF & labs"],
    },
    certificate: true,
  },
  {
    id: "f6",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    category: { fr: "Management", en: "Management", es: "Gestión" },
    title: { fr: "Gestion de Projet (PMP)", en: "Project Management (PMP)", es: "Gestión de Proyectos (PMP)" },
    description: {
      fr: "Maîtrisez PMBOK, Agile, Scrum. Préparez la certification PMP internationale. Formation certifiante avec simulateur d'examen.",
      en: "Master PMBOK, Agile, Scrum. Prepare for the international PMP certification. Certifying training with exam simulator.",
      es: "Domina PMBOK, Agile, Scrum. Prepárate para la certificación PMP internacional. Formación certificante con simulador de examen.",
    },
    duration: { fr: "4 mois (180h)", en: "4 months (180h)", es: "4 meses (180h)" },
    level: "Avancé",
    mode: ["online", "offline"],
    price: 350000,
    rating: 4.8,
    students: 612,
    program: {
      fr: ["PMBOK & processus", "Agile & Scrum", "Gestion des risques", "Budget & coûts", "Équipes & leadership", "Préparation PMP", "Projet simulateur"],
      en: ["PMBOK & processes", "Agile & Scrum", "Risk management", "Budget & costs", "Teams & leadership", "PMP preparation", "Simulator project"],
      es: ["PMBOK & procesos", "Agile & Scrum", "Gestión de riesgos", "Presupuesto & costos", "Equipos & liderazgo", "Preparación PMP", "Proyecto simulador"],
    },
    certificate: true,
    popular: true,
  },
  {
    id: "f7",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b6?w=1200&q=80",
    category: { fr: "Design", en: "Design", es: "Diseño" },
    title: { fr: "UX/UI Design & Figma", en: "UX/UI Design & Figma", es: "Diseño UX/UI & Figma" },
    description: {
      fr: "Design thinking, wireframing, prototypage, design system. Devenez designer produit. Portfolio professionnel à la clé.",
      en: "Design thinking, wireframing, prototyping, design system. Become a product designer. Professional portfolio included.",
      es: "Design thinking, wireframes, prototipado, design system. Conviértete en diseñador de producto. Portfolio profesional incluido.",
    },
    duration: { fr: "4 mois (220h)", en: "4 months (220h)", es: "4 meses (220h)" },
    level: "Débutant",
    mode: ["online", "offline"],
    price: 320000,
    rating: 4.9,
    students: 487,
    program: {
      fr: ["Design thinking", "Recherche utilisateur", "Wireframing & Figma", "Prototypage interactif", "Design system", "Tests d'utilisabilité", "Portfolio"],
      en: ["Design thinking", "User research", "Wireframing & Figma", "Interactive prototyping", "Design system", "Usability testing", "Portfolio"],
      es: ["Design thinking", "Investigación de usuarios", "Wireframes & Figma", "Prototipado interactivo", "Design system", "Pruebas de usabilidad", "Portfolio"],
    },
    certificate: true,
  },
  {
    id: "f8",
    icon: "BriefcaseBusiness",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    category: { fr: "Management", en: "Management", es: "Gestión" },
    title: { fr: "Entrepreneuriat & Business Plan", en: "Entrepreneurship & Business Plan", es: "Emprendimiento & Plan de Negocio" },
    description: {
      fr: "De l'idée au business plan exécutable. Lean Startup, financement, pitch investisseurs. 3 mois pour transformer une idée en projet viable.",
      en: "From idea to executable business plan. Lean Startup, financing, investor pitch. 3 months to turn an idea into a viable project.",
      es: "De la idea al plan de negocio ejecutable. Lean Startup, financiación, pitch a inversores. 3 meses para transformar una idea en proyecto viable.",
    },
    duration: { fr: "3 mois (150h)", en: "3 months (150h)", es: "3 meses (150h)" },
    level: "Intermédiaire",
    mode: ["offline"],
    price: 250000,
    rating: 4.7,
    students: 738,
    program: {
      fr: ["Idéation & validation", "Lean Canvas", "Étude de marché", "Modèle économique", "Business plan financier", "Pitch deck", "Pitch investisseurs"],
      en: ["Ideation & validation", "Lean Canvas", "Market research", "Business model", "Financial business plan", "Pitch deck", "Investor pitch"],
      es: ["Ideación & validación", "Lean Canvas", "Estudio de mercado", "Modelo de negocio", "Plan de negocio financiero", "Pitch deck", "Pitch a inversores"],
    },
    certificate: true,
  },
];

export type ProductCategory = {
  id: string;
  icon: string;
  name: { fr: string; en: string; es: string };
  image: string;
};

export const productCategories: ProductCategory[] = [
  { id: "phones", icon: "Smartphone", name: { fr: "Téléphones", en: "Phones", es: "Teléfonos" }, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" },
  { id: "computers", icon: "Laptop", name: { fr: "Ordinateurs", en: "Computers", es: "Ordenadores" }, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80" },
  { id: "tablets", icon: "Tablet", name: { fr: "Tablettes", en: "Tablets", es: "Tabletas" }, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80" },
  { id: "accessories", icon: "Cable", name: { fr: "Accessoires", en: "Accessories", es: "Accesorios" }, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&q=80" },
  { id: "watches", icon: "Watch", name: { fr: "Montres connectées", en: "Smartwatches", es: "Smartwatches" }, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80" },
  { id: "audio", icon: "Headphones", name: { fr: "Casques & Écouteurs", en: "Headphones & Earbuds", es: "Auriculares" }, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" },
  { id: "chargers", icon: "Zap", name: { fr: "Chargeurs & Power Banks", en: "Chargers & Power Banks", es: "Cargadores & Power Banks" }, image: "https://images.unsplash.com/photo-1609592424823-2dbe1c3a8e72?w=600&q=80" },
  { id: "printers", icon: "Printer", name: { fr: "Imprimantes", en: "Printers", es: "Impresoras" }, image: "https://images.unsplash.com/photo-1625961332271-29b6f7b5e15b?w=600&q=80" },
  { id: "routers", icon: "Wifi", name: { fr: "Routeurs Internet", en: "Internet Routers", es: "Routers" }, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80" },
  { id: "peripherals", icon: "Keyboard", name: { fr: "Claviers & Souris", en: "Keyboards & Mice", es: "Teclados & Ratones" }, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80" },
  { id: "gaming", icon: "Gamepad2", name: { fr: "Gaming", en: "Gaming", es: "Gaming" }, image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80" },
  { id: "cameras", icon: "Camera", name: { fr: "Caméras", en: "Cameras", es: "Cámaras" }, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80" },
];

export type Product = {
  id: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  warranty: string;
  featured?: boolean;
  badge?: "new" | "promo" | "best";
  image: string;
  gallery: string[];
  description: { fr: string; en: string; es: string };
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: "p1", category: "phones", name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 1850000, oldPrice: 2100000,
    rating: 4.9, reviews: 234, inStock: true, warranty: "24 mois", featured: true, badge: "best",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80", "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80"],
    description: { fr: "Le flagship ultime avec S Pen, appareil photo 200MP et IA intégrée. Performances et créativité réunies dans un châssis titane élégant. L'outil parfait pour les professionnels exigeants.", en: "The ultimate flagship with S Pen, 200MP camera and integrated AI. Performance and creativity together in an elegant titanium chassis. The perfect tool for demanding professionals.", es: "El flagship definitivo con S Pen, cámara 200MP e IA integrada. Rendimiento y creatividad juntos en un chasis de titanio elegante. La herramienta perfecta para profesionales exigentes." },
    specs: [{ label: "Écran", value: "6.8\" QHD+ AMOLED 120Hz" }, { label: "Processeur", value: "Snapdragon 8 Gen 3" }, { label: "RAM", value: "12 Go" }, { label: "Stockage", value: "256 Go" }, { label: "Caméra", value: "200MP + 50MP + 12MP + 10MP" }, { label: "Batterie", value: "5000 mAh" }],
  },
  {
    id: "p2", category: "phones", name: "iPhone 15 Pro Max", brand: "Apple", price: 2200000,
    rating: 4.9, reviews: 412, inStock: true, warranty: "12 mois", featured: true, badge: "new",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80", "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"],
    description: { fr: "Puce A17 Pro, titane, action button. Le plus puissant des iPhone, conçu pour les pros. Capable de filmer en 4K 60fps ProRes et de jouer à des jeux AAA.", en: "A17 Pro chip, titanium, action button. The most powerful iPhone, designed for pros. Capable of filming in 4K 60fps ProRes and playing AAA games.", es: "Chip A17 Pro, titanio, action button. El iPhone más potente, diseñado para profesionales. Capaz de filmar en 4K 60fps ProRes y jugar juegos AAA." },
    specs: [{ label: "Écran", value: "6.7\" Super Retina XDR" }, { label: "Processeur", value: "Apple A17 Pro" }, { label: "RAM", value: "8 Go" }, { label: "Stockage", value: "256 Go" }, { label: "Caméra", value: "48MP + 12MP + 12MP" }, { label: "Batterie", value: "4422 mAh" }],
  },
  {
    id: "p3", category: "computers", name: "MacBook Pro 14\" M3", brand: "Apple", price: 3200000,
    rating: 5.0, reviews: 187, inStock: true, warranty: "12 mois", featured: true, badge: "best",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80"],
    description: { fr: "Puce M3, écran Liquid Retina XDR, autonomie 22h. La machine des créatifs exigeants. Silencieuse, puissante, élégante.", en: "M3 chip, Liquid Retina XDR display, 22h battery. The machine for demanding creatives. Silent, powerful, elegant.", es: "Chip M3, pantalla Liquid Retina XDR, 22h batería. La máquina para creativos exigentes. Silenciosa, potente, elegante." },
    specs: [{ label: "Écran", value: "14.2\" Liquid Retina XDR" }, { label: "Processeur", value: "Apple M3" }, { label: "RAM", value: "16 Go" }, { label: "Stockage", value: "512 Go SSD" }, { label: "GPU", value: "10-core" }, { label: "Autonomie", value: "22h" }],
  },
  {
    id: "p4", category: "computers", name: "Dell XPS 15", brand: "Dell", price: 2450000, oldPrice: 2700000,
    rating: 4.7, reviews: 142, inStock: true, warranty: "24 mois", badge: "promo",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
    description: { fr: "Intel Core i7 13e gen, RTX 4060, écran OLED 3.5K. Performance et élégance pour les pros nomades.", en: "Intel Core i7 13th gen, RTX 4060, 3.5K OLED display. Performance and elegance for mobile pros.", es: "Intel Core i7 13ª gen, RTX 4060, pantalla OLED 3.5K. Rendimiento y elegancia para profesionales nómadas." },
    specs: [{ label: "Écran", value: "15.6\" OLED 3.5K" }, { label: "Processeur", value: "Intel i7-13700H" }, { label: "RAM", value: "32 Go DDR5" }, { label: "Stockage", value: "1 To SSD" }, { label: "GPU", value: "RTX 4060 8 Go" }, { label: "Poids", value: "1.86 kg" }],
  },
  {
    id: "p5", category: "computers", name: "HP Pavilion 15", brand: "HP", price: 850000,
    rating: 4.5, reviews: 312, inStock: true, warranty: "12 mois",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"],
    description: { fr: "Intel Core i5, 16 Go RAM, 512 Go SSD. Le quotidien sous contrôle. Idéal pour étudiants et jeunes pros.", en: "Intel Core i5, 16 GB RAM, 512 GB SSD. Daily tasks under control. Ideal for students and young pros.", es: "Intel Core i5, 16 GB RAM, 512 GB SSD. Tareas diarias bajo control. Ideal para estudiantes y jóvenes profesionales." },
    specs: [{ label: "Écran", value: "15.6\" FHD IPS" }, { label: "Processeur", value: "Intel i5-1335U" }, { label: "RAM", value: "16 Go DDR4" }, { label: "Stockage", value: "512 Go SSD" }, { label: "GPU", value: "Intel Iris Xe" }, { label: "Poids", value: "1.74 kg" }],
  },
  {
    id: "p6", category: "tablets", name: "iPad Pro 12.9\" M2", brand: "Apple", price: 1650000,
    rating: 4.9, reviews: 234, inStock: true, warranty: "12 mois", featured: true,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80"],
    description: { fr: "Puce M2, écran Liquid Retina XDR, compatible Apple Pencil 2. La tablette des pros. Remplace presque un ordinateur.", en: "M2 chip, Liquid Retina XDR display, Apple Pencil 2 compatible. The pro tablet. Almost replaces a computer.", es: "Chip M2, pantalla Liquid Retina XDR, compatible Apple Pencil 2. La tablet de los profesionales. Casi reemplaza un ordenador." },
    specs: [{ label: "Écran", value: "12.9\" Liquid Retina XDR" }, { label: "Processeur", value: "Apple M2" }, { label: "RAM", value: "8 Go" }, { label: "Stockage", value: "256 Go" }, { label: "Caméra", value: "12MP + 10MP" }, { label: "Poids", value: "682 g" }],
  },
  {
    id: "p7", category: "tablets", name: "Samsung Galaxy Tab S9", brand: "Samsung", price: 1100000,
    rating: 4.7, reviews: 156, inStock: true, warranty: "12 mois",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80"],
    description: { fr: "Snapdragon 8 Gen 2, écran AMOLED 11\", S Pen inclus. Productivité mobile.", en: "Snapdragon 8 Gen 2, 11\" AMOLED display, S Pen included. Mobile productivity.", es: "Snapdragon 8 Gen 2, pantalla AMOLED 11\", S Pen incluido. Productividad móvil." },
    specs: [{ label: "Écran", value: "11\" Dynamic AMOLED 2X" }, { label: "Processeur", value: "Snapdragon 8 Gen 2" }, { label: "RAM", value: "8 Go" }, { label: "Stockage", value: "128 Go" }, { label: "Batterie", value: "8400 mAh" }, { label: "Poids", value: "498 g" }],
  },
  {
    id: "p8", category: "watches", name: "Apple Watch Series 9", brand: "Apple", price: 580000,
    rating: 4.8, reviews: 423, inStock: true, warranty: "12 mois", badge: "new",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80"],
    description: { fr: "Puce S9, double tap, écran plus lumineux. Santé et connectivité au poignet.", en: "S9 chip, double tap, brighter display. Health and connectivity on your wrist.", es: "Chip S9, double tap, pantalla más brillante. Salud y conectividad en tu muñeca." },
    specs: [{ label: "Écran", value: "45mm LTPO OLED" }, { label: "Processeur", value: "Apple S9" }, { label: "Capteurs", value: "ECG, SpO2, Température" }, { label: "Étanchéité", value: "50m" }, { label: "GPS", value: "Oui" }, { label: "Autonomie", value: "18h" }],
  },
  {
    id: "p9", category: "watches", name: "Samsung Galaxy Watch 6", brand: "Samsung", price: 420000,
    rating: 4.6, reviews: 234, inStock: true, warranty: "12 mois",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80"],
    description: { fr: "WearOS, suivi sommeil avancé, écran AMOLED. Le quotidien au poignet.", en: "WearOS, advanced sleep tracking, AMOLED display. Daily life on your wrist.", es: "WearOS, seguimiento de sueño avanzado, pantalla AMOLED. El día a día en tu muñeca." },
    specs: [{ label: "Écran", value: "44mm Super AMOLED" }, { label: "Processeur", value: "Exynos W930" }, { label: "Capteurs", value: "ECG, SpO2, Bio-impédance" }, { label: "Étanchéité", value: "50m" }, { label: "GPS", value: "Oui" }, { label: "Autonomie", value: "40h" }],
  },
  {
    id: "p10", category: "audio", name: "AirPods Pro 2", brand: "Apple", price: 320000, oldPrice: 380000,
    rating: 4.9, reviews: 892, inStock: true, warranty: "12 mois", featured: true, badge: "promo",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80", "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80"],
    description: { fr: "Réduction de bruit active 2x plus puissante, audio spatial, boîtier USB-C.", en: "2x more powerful active noise cancellation, spatial audio, USB-C case.", es: "Cancelación de ruido activa 2x más potente, audio espacial, estuche USB-C." },
    specs: [{ label: "Type", value: "Écouteurs intra" }, { label: "Réduction de bruit", value: "Active (ANC)" }, { label: "Autonomie", value: "6h + 30h boîtier" }, { label: "Bluetooth", value: "5.3" }, { label: "Étanchéité", value: "IP54" }, { label: "Audio spatial", value: "Oui" }],
  },
  {
    id: "p11", category: "audio", name: "Sony WH-1000XM5", brand: "Sony", price: 380000,
    rating: 4.8, reviews: 524, inStock: true, warranty: "24 mois", featured: true,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
    description: { fr: "La référence de la réduction de bruit. 30h d'autonomie, son haute résolution.", en: "The reference in noise cancellation. 30h battery, high-resolution sound.", es: "La referencia en cancelación de ruido. 30h batería, sonido de alta resolución." },
    specs: [{ label: "Type", value: "Casque circum-aural" }, { label: "Réduction de bruit", value: "Active (8 micros)" }, { label: "Autonomie", value: "30h" }, { label: "Bluetooth", value: "5.2" }, { label: "Poids", value: "250 g" }, { label: "Charging", value: "USB-C" }],
  },
  {
    id: "p12", category: "chargers", name: "Anker PowerCore 20000 PD", brand: "Anker", price: 95000,
    rating: 4.7, reviews: 1242, inStock: true, warranty: "18 mois", badge: "best",
    image: "https://images.unsplash.com/photo-1609592424823-2dbe1c3a8e72?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1609592424823-2dbe1c3a8e72?w=800&q=80", "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80"],
    description: { fr: "20000mAh, charge rapide 30W, USB-C PD. Pour tous vos appareils.", en: "20000mAh, 30W fast charging, USB-C PD. For all your devices.", es: "20000mAh, carga rápida 30W, USB-C PD. Para todos tus dispositivos." },
    specs: [{ label: "Capacité", value: "20000 mAh" }, { label: "Puissance", value: "30W USB-C PD" }, { label: "Ports", value: "2x USB-A + 1x USB-C" }, { label: "Poids", value: "356 g" }, { label: "Indicateur", value: "LED 4 niveaux" }, { label: "Compatible", value: "Tous smartphones" }],
  },
  {
    id: "p13", category: "printers", name: "HP LaserJet Pro M404", brand: "HP", price: 380000,
    rating: 4.6, reviews: 87, inStock: true, warranty: "12 mois",
    image: "https://images.unsplash.com/photo-1625961332271-29b6f7b5e15b?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1625961332271-29b6f7b5e15b?w=800&q=80"],
    description: { fr: "Imprimante laser monochrome, 38 ppm, WiFi. Pour bureaux exigeants.", en: "Mono laser printer, 38 ppm, WiFi. For demanding offices.", es: "Impresora láser monocromo, 38 ppm, WiFi. Para oficinas exigentes." },
    specs: [{ label: "Type", value: "Laser monochrome" }, { label: "Vitesse", value: "38 ppm" }, { label: "Résolution", value: "1200x1200 dpi" }, { label: "Connectivité", value: "WiFi, USB, Ethernet" }, { label: "Bac", value: "250 feuilles" }, { label: "Recto-verso", value: "Automatique" }],
  },
  {
    id: "p14", category: "routers", name: "TP-Link Archer AX73", brand: "TP-Link", price: 195000,
    rating: 4.7, reviews: 324, inStock: true, warranty: "24 mois",
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80"],
    description: { fr: "Routeur WiFi 6, 5400 Mbps, 6 antennes. Couverture ultra-large.", en: "WiFi 6 router, 5400 Mbps, 6 antennas. Ultra-wide coverage.", es: "Router WiFi 6, 5400 Mbps, 6 antenas. Cobertura ultra-amplia." },
    specs: [{ label: "Standard", value: "WiFi 6 (AX5400)" }, { label: "Vitesse", value: "5400 Mbps" }, { label: "Antennes", value: "6 hautes gains" }, { label: "Ports", value: "4x Gigabit + 1x WAN" }, { label: "Connectivité", value: "200+ appareils" }, { label: "Sécurité", value: "WPA3" }],
  },
  {
    id: "p15", category: "gaming", name: "PlayStation 5 Slim", brand: "Sony", price: 720000,
    rating: 4.9, reviews: 678, inStock: true, warranty: "12 mois", featured: true, badge: "new",
    image: "https://images.unsplash.com/photo-1607853202273-6217f3f78f56?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1607853202273-6217f3f78f56?w=800&q=80", "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&q=80"],
    description: { fr: "SSD ultra-rapide, ray tracing, manche DualSense. La nouvelle gen.", en: "Ultra-fast SSD, ray tracing, DualSense controller. The new gen.", es: "SSD ultra-rápido, ray tracing, mando DualSense. La nueva gen." },
    specs: [{ label: "CPU", value: "AMD Zen 2 8-core" }, { label: "GPU", value: "AMD RDNA 2 10.28 TFLOPS" }, { label: "RAM", value: "16 Go GDDR6" }, { label: "Stockage", value: "1 To SSD" }, { label: "Résolution", value: "4K 120Hz" }, { label: "Lecteur", value: "Blu-ray UHD" }],
  },
  {
    id: "p16", category: "cameras", name: "Canon EOS R50", brand: "Canon", price: 980000,
    rating: 4.8, reviews: 142, inStock: true, warranty: "24 mois",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80"],
    description: { fr: "Hybride 24MP, 4K 30p, AF intelligent. Pour créateurs de contenu.", en: "24MP hybrid, 4K 30p, smart AF. For content creators.", es: "Híbrida 24MP, 4K 30p, AF inteligente. Para creadores de contenido." },
    specs: [{ label: "Capteur", value: "APS-C 24.2 MP" }, { label: "Vidéo", value: "4K 30p / FHD 120p" }, { label: "AF", value: "Dual Pixel CMOS II" }, { label: "Écran", value: "3\" tactile orientable" }, { label: "Stabilisation", value: "Numérique 5 axes" }, { label: "Connectivité", value: "WiFi + Bluetooth" }],
  },
  {
    id: "p17", category: "peripherals", name: "Logitech MX Master 3S", brand: "Logitech", price: 85000,
    rating: 4.9, reviews: 1423, inStock: true, warranty: "12 mois", badge: "best",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"],
    description: { fr: "Souris ergonomique premium, défilement MagSpeed, multi-appareils.", en: "Premium ergonomic mouse, MagSpeed scroll, multi-device.", es: "Ratón ergonómico premium, scroll MagSpeed, multi-dispositivo." },
    specs: [{ label: "Capteur", value: "8000 DPI Darkfield" }, { label: "Connexion", value: "Bluetooth + USB" }, { label: "Multi-appareils", value: "3 simultanés" }, { label: "Autonomie", value: "70 jours" }, { label: "Boutons", value: "7 programmables" }, { label: "Recharge", value: "USB-C" }],
  },
  {
    id: "p18", category: "accessories", name: "Samsung T7 SSD 1To", brand: "Samsung", price: 145000,
    rating: 4.8, reviews: 678, inStock: true, warranty: "36 mois", badge: "new",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80", "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80"],
    description: { fr: "SSD portable 1To, 1050 Mo/s, USB 3.2 Gen 2. Compact et robuste.", en: "Portable SSD 1TB, 1050 MB/s, USB 3.2 Gen 2. Compact and rugged.", es: "SSD portátil 1TB, 1050 MB/s, USB 3.2 Gen 2. Compacto y robusto." },
    specs: [{ label: "Capacité", value: "1 To" }, { label: "Vitesse", value: "1050 Mo/s" }, { label: "Connectivité", value: "USB 3.2 Gen 2" }, { label: "Poids", value: "58 g" }, { label: "Sécurité", value: "AES 256-bit" }, { label: "Résistance", value: "Chutes 2m" }],
  },
];

export type Service = {
  id: string;
  icon: string;
  image: string;
  title: { fr: string; en: string; es: string };
  description: { fr: string; en: string; es: string };
  features: { fr: string[]; en: string[]; es: string[] };
  gradient: string;
};

export const services: Service[] = [
  {
    id: "marketing",
    icon: "Megaphone",
    gradient: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    title: { fr: "Marketing", en: "Marketing", es: "Marketing" },
    description: {
      fr: "Stratégies de marketing digital et traditionnel pour amplifier votre marque sur les marchés africains. Nous combinons data, créativité et terrain pour des campagnes qui convertissent.",
      en: "Digital and traditional marketing strategies to amplify your brand in African markets. We combine data, creativity and field work for campaigns that convert.",
      es: "Estrategias de marketing digital y tradicional para amplificar tu marca en los mercados africanos. Combinamos datos, creatividad y trabajo de campo para campañas que convierten.",
    },
    features: {
      fr: ["Audit & stratégie", "Campagnes 360°", "Marketing d'influence", "Performance & ROI"],
      en: ["Audit & strategy", "360° campaigns", "Influence marketing", "Performance & ROI"],
      es: ["Auditoría & estrategia", "Campañas 360°", "Marketing de influencia", "Performance & ROI"],
    },
  },
  {
    id: "communication",
    icon: "Radio",
    gradient: "from-blue-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80",
    title: { fr: "Communication", en: "Communication", es: "Comunicación" },
    description: {
      fr: "Construire des narratives puissantes qui résonnent avec les publics africains et internationaux. De la stratégie de marque à la gestion de crise.",
      en: "Build powerful narratives that resonate with African and international audiences. From brand strategy to crisis management.",
      es: "Construir narrativas poderosas que resuenen con audiencias africanas e internacionales. De la estrategia de marca a la gestión de crisis.",
    },
    features: {
      fr: ["Stratégie de marque", "RP & médiatisation", "Crise & réputation", "Événementiel"],
      en: ["Brand strategy", "PR & media", "Crisis & reputation", "Events"],
      es: ["Estrategia de marca", "RP & mediatización", "Crisis & reputación", "Eventos"],
    },
  },
  {
    id: "formation",
    icon: "GraduationCap",
    gradient: "from-amber-500 to-yellow-600",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    title: { fr: "Formation", en: "Training", es: "Formación" },
    description: {
      fr: "Programmes sur-mesure pour entreprises : montée en compétences de vos équipes en présentiel ou en ligne. Certification incluse.",
      en: "Tailor-made corporate programs: upskill your teams in-person or online. Certification included.",
      es: "Programas a medida para empresas: mejora de competencias de tus equipos presencial o en línea. Certificación incluida.",
    },
    features: {
      fr: ["Besoins & audit", "Programme sur-mesure", "Certification incluse", "Suivi & reporting"],
      en: ["Needs audit", "Tailor-made program", "Certification included", "Tracking & reporting"],
      es: ["Auditoría de necesidades", "Programa a medida", "Certificación incluida", "Seguimiento & reporting"],
    },
  },
  {
    id: "conseil",
    icon: "Lightbulb",
    gradient: "from-purple-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    title: { fr: "Conseil", en: "Consulting", es: "Consultoría" },
    description: {
      fr: "Conseil stratégique pour projets de développement en Afrique : étude, faisabilité, structuration. Nous transformons votre vision en roadmap exécutable.",
      en: "Strategic consulting for development projects in Africa: study, feasibility, structuring. We turn your vision into an executable roadmap.",
      es: "Consultoría estratégica para proyectos de desarrollo en África: estudio, viabilidad, estructuración. Transformamos tu visión en una roadmap ejecutable.",
    },
    features: {
      fr: ["Études de marché", "Faisabilité technique", "Structuration financière", "Roadmap stratégique"],
      en: ["Market studies", "Technical feasibility", "Financial structuring", "Strategic roadmap"],
      es: ["Estudios de mercado", "Viabilidad técnica", "Estructuración financiera", "Roadmap estratégico"],
    },
  },
  {
    id: "gestion-projets",
    icon: "ClipboardList",
    gradient: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    title: { fr: "Gestion de projets", en: "Project Management", es: "Gestión de proyectos" },
    description: {
      fr: "Pilotage de A à Z de vos projets : planification, exécution, suivi, évaluation d'impact. PMO dédié et reporting temps réel.",
      en: "End-to-end project management: planning, execution, monitoring, impact evaluation. Dedicated PMO and real-time reporting.",
      es: "Gestión de proyectos de principio a fin: planificación, ejecución, seguimiento, evaluación de impacto. PMO dedicado y reporting en tiempo real.",
    },
    features: {
      fr: ["Planification agile", "PMO dédié", "Suivi KPI temps réel", "Reporting complet"],
      en: ["Agile planning", "Dedicated PMO", "Real-time KPI tracking", "Full reporting"],
      es: ["Planificación ágil", "PMO dedicado", "Seguimiento KPI en tiempo real", "Reporting completo"],
    },
  },
  {
    id: "accompagnement",
    icon: "HeartHandshake",
    gradient: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80",
    title: { fr: "Accompagnement des jeunes", en: "Youth Support", es: "Acompañamiento juvenil" },
    description: {
      fr: "Programmes d'insertion socio-économique sur-mesure pour vos actions RSE et fonds de dotation. Impact mesuré et garanti.",
      en: "Custom socio-economic integration programs for your CSR and endowment actions. Measured and guaranteed impact.",
      es: "Programas de inserción socioeconómica a medida para tus acciones RSC y fundaciones. Impacto medido y garantizado.",
    },
    features: {
      fr: ["Cohorte dédiée", "Mentorat pro", "Insertion garantie", "Impact mesuré"],
      en: ["Dedicated cohort", "Pro mentorship", "Guaranteed integration", "Measured impact"],
      es: ["Cohorte dedicada", "Mentoría pro", "Inserción garantizada", "Impacto medido"],
    },
  },
  {
    id: "evenements",
    icon: "CalendarDays",
    gradient: "from-fuchsia-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    title: { fr: "Organisation d'événements", en: "Event Management", es: "Organización de eventos" },
    description: {
      fr: "Conférences, hackathons, fora entrepreneuriaux. Nous concevons des moments qui marquent. Logistique, marketing et bilans inclus.",
      en: "Conferences, hackathons, entrepreneurial forums. We design moments that matter. Logistics, marketing and reports included.",
      es: "Conferencias, hackathones, foros emprendedores. Diseñamos momentos que marcan. Logística, marketing e informes incluidos.",
    },
    features: {
      fr: ["Concept & design", "Logistique complète", "Marketing événementiel", "Bilans & ROI"],
      en: ["Concept & design", "Full logistics", "Event marketing", "Reports & ROI"],
      es: ["Concepto & diseño", "Logística completa", "Marketing de eventos", "Informes & ROI"],
    },
  },
  {
    id: "coaching",
    icon: "Users",
    gradient: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    title: { fr: "Coaching", en: "Coaching", es: "Coaching" },
    description: {
      fr: "Coaching individuel et d'équipe pour dirigeants, cadres et jeunes talents à fort potentiel. Approche PCC et résultats mesurables.",
      en: "Individual and team coaching for executives, managers and high-potential young talent. PCC approach and measurable results.",
      es: "Coaching individual y de equipo para directivos, cuadros y jóvenes talentos de alto potencial. Enfoque PCC y resultados medibles.",
    },
    features: {
      fr: ["Coaching dirigeant", "Coaching d'équipe", "Leadership program", "Suivi durable"],
      en: ["Executive coaching", "Team coaching", "Leadership program", "Sustainable follow-up"],
      es: ["Coaching directivo", "Coaching de equipo", "Programa de liderazgo", "Seguimiento duradero"],
    },
  },
  {
    id: "conferences",
    icon: "Mic",
    gradient: "from-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
    title: { fr: "Conférences", en: "Conferences", es: "Conferencias" },
    description: {
      fr: "Interventions de haut niveau pour vos événements : leadership, jeunesse, entrepreneuriat, Afrique. Format hybride ou présentiel.",
      en: "High-level keynotes for your events: leadership, youth, entrepreneurship, Africa. Hybrid or in-person format.",
      es: "Conferencias de alto nivel para tus eventos: liderazgo, juventud, emprendimiento, África. Formato híbrido o presencial.",
    },
    features: {
      fr: ["Keynotes inspirantes", "Tables rondes", "Masterclass", "Format hybride"],
      en: ["Inspiring keynotes", "Round tables", "Masterclass", "Hybrid format"],
      es: ["Keynotes inspiradoras", "Mesas redondas", "Masterclass", "Formato híbrido"],
    },
  },
];

export type Partner = { name: string; tier: "gold" | "silver" | "bronze"; logo: string; sector: string; image: string };

export const partners: Partner[] = [
  { name: "African Development Bank", tier: "gold", logo: "AfDB", sector: "Institution financière", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
  { name: "Orange Guinée", tier: "gold", logo: "Orange", sector: "Télécom", image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80" },
  { name: "MTN Group", tier: "gold", logo: "MTN", sector: "Télécom", image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80" },
  { name: "UNICEF", tier: "gold", logo: "UNICEF", sector: "ONU", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80" },
  { name: "World Bank", tier: "silver", logo: "WB", sector: "Institution", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
  { name: "ECOWAS", tier: "silver", logo: "ECOWAS", sector: "Gouvernemental", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80" },
  { name: "Mastercard Foundation", tier: "gold", logo: "MCF", sector: "Fondation", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" },
  { name: "GIZ", tier: "silver", logo: "GIZ", sector: "Coopération", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" },
  { name: "Agence Française de Développement", tier: "silver", logo: "AFD", sector: "Coopération", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
  { name: "Samsung Africa", tier: "bronze", logo: "Samsung", sector: "Tech", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80" },
  { name: "Microsoft 4Afrika", tier: "silver", logo: "MS", sector: "Tech", image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=600&q=80" },
  { name: "Conakry City Hall", tier: "bronze", logo: "CCK", sector: "Local", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80" },
];

export type CaseStudy = {
  title: { fr: string; en: string; es: string };
  partner: string;
  result: string;
  metric: string;
  image: string;
  description: { fr: string; en: string; es: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: { fr: "Programme DIGITAL'IT", en: "DIGITAL'IT Program", es: "Programa DIGITAL'IT" },
    partner: "Orange Guinée",
    result: "Jeunes certifiés",
    metric: "1 200",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    description: {
      fr: "1500 jeunes guinéens formés au numérique sur 18 mois, avec 68% d'insertion professionnelle. Le programme a également financé 320 kits numériques distribués en zones rurales.",
      en: "1,500 Guinean youth trained in digital skills over 18 months, with 68% professional integration. The program also funded 320 digital kits distributed in rural areas.",
      es: "1.500 jóvenes guineanos formados en competencias digitales durante 18 meses, con 68% de inserción profesional. El programa también financió 320 kits digitales distribuidos en zonas rurales.",
    },
  },
  {
    title: { fr: "Bourse SHINE Up", en: "SHINE Up Scholarship", es: "Beca SHINE Up" },
    partner: "Mastercard Foundation",
    result: "Bourses octroyées",
    metric: "320",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    description: {
      fr: "320 bourses d'études supérieures pour des jeunes filles issues de zones rurales. 92% de réussite et 78% d'insertion professionnelle à 6 mois.",
      en: "320 higher education scholarships for young women from rural areas. 92% success rate and 78% professional integration at 6 months.",
      es: "320 becas de educación superior para jóvenes de zonas rurales. 92% de éxito y 78% de inserción profesional a 6 meses.",
    },
  },
  {
    title: { fr: "Hackathon AgriTech", en: "AgriTech Hackathon", es: "Hackathon AgriTech" },
    partner: "AfDB",
    result: "Projets financés",
    metric: "47",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    description: {
      fr: "47 startups agricoles accélérées, 12 ont levé un total de 2,4M€ en 2 ans. 3 solutions déployées à l'échelle nationale.",
      en: "47 agritech startups accelerated, 12 raised a total of €2.4M in 2 years. 3 solutions deployed at national scale.",
      es: "47 startups agrícolas aceleradas, 12 levantaron un total de 2,4M€ en 2 años. 3 soluciones desplegadas a escala nacional.",
    },
  },
];

export type Article = {
  id: string;
  category: { fr: string; en: string; es: string };
  title: { fr: string; en: string; es: string };
  excerpt: { fr: string; en: string; es: string };
  content: { fr: string; en: string; es: string };
  date: string;
  readTime: number;
  author: string;
  authorRole: { fr: string; en: string; es: string };
  tag: "interview" | "report" | "press" | "blog";
  image: string;
};

export const articles: Article[] = [
  {
    id: "a1",
    category: { fr: "Impact", en: "Impact", es: "Impacto" },
    title: { fr: "Comment 3 200 jeunes ont transformé leur vie en 3 ans", en: "How 3,200 youth transformed their lives in 3 years", es: "Cómo 3.200 jóvenes transformaron su vida en 3 años" },
    excerpt: { fr: "Récit d'une cohorte qui a redéfini ce que signifie réussir en Afrique de l'Ouest.", en: "Story of a cohort that redefined what success means in West Africa.", es: "Historia de una cohorte que redefinió lo que significa el éxito en África Occidental." },
    content: {
      fr: "Quand Aïssatou a rejoint la cohorte IMPACT JEUNES en 2023, elle venait d'obtenir son baccalauréat mais n'avait aucune perspective d'emploi. Trois ans plus tard, elle dirige une coopérative de 12 personnes qui transforme des produits agricoles locaux. Son histoire n'est pas isolée : 3 200 jeunes sont passés par ce programme et 68% ont trouvé un emploi ou créé leur entreprise.\n\nLe programme combine formation au leadership, immersion en entreprise et mentorat individuel. Sur 6 mois, chaque participant construit un projet professionnel concret, soutenu par un réseau de 1 500 mentors bénévoles. Les résultats parlent d'eux-mêmes : 412 entreprises créées, 1,2M€ levés par les cohortes, et 92% de satisfaction.\n\nMais au-delà des chiffres, c'est une transformation humaine profonde. « J'ai appris à croire en moi », résume Aïssatou. « Avant LET'S SHINE, je voyais l'avenir comme une menace. Aujourd'hui, je le vois comme une opportunité. »",
      en: "When Aïssatou joined the IMPACT JEUNES cohort in 2023, she had just obtained her baccalaureate but had no job prospects. Three years later, she runs a cooperative of 12 people that processes local agricultural products. Her story is not isolated: 3,200 youth have gone through this program and 68% have found employment or created their business.\n\nThe program combines leadership training, business immersion and individual mentorship. Over 6 months, each participant builds a concrete professional project, supported by a network of 1,500 volunteer mentors. The results speak for themselves: 412 businesses created, €1.2M raised by cohorts, and 92% satisfaction.\n\nBut beyond the numbers, it is a profound human transformation. \"I learned to believe in myself,\" summarizes Aïssatou. \"Before LET'S SHINE, I saw the future as a threat. Today, I see it as an opportunity.\"",
      es: "Cuando Aïssatou se unió a la cohorte IMPACT JEUNES en 2023, acababa de obtener su bachillerato pero no tenía perspectivas de empleo. Tres años después, dirige una cooperativa de 12 personas que transforma productos agrícolas locales. Su historia no es aislada: 3.200 jóvenes han pasado por este programa y el 68% ha encontrado empleo o creado su empresa.\n\nEl programa combina formación en liderazgo, inmersión empresarial y mentoría individual. Durante 6 meses, cada participante construye un proyecto profesional concreto, apoyado por una red de 1.500 mentores voluntarios. Los resultados hablan por sí mismos: 412 empresas creadas, 1,2M€ levantados por las cohortes y 92% de satisfacción.\n\nPero más allá de los números, es una transformación humana profunda. \"Aprendí a creer en mí\", resume Aïssatou. \"Antes de LET'S SHINE, veía el futuro como una amenaza. Hoy, lo veo como una oportunidad.\"",
    },
    date: "2026-06-28", readTime: 6, author: "Aïssatou Diallo", authorRole: { fr: "Journaliste", en: "Journalist", es: "Periodista" }, tag: "report",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80",
  },
  {
    id: "a2",
    category: { fr: "Interview", en: "Interview", es: "Entrevista" },
    title: { fr: "Mariama Condé : \"Le leadership africain est féminin\"", en: "Mariama Condé: \"African leadership is feminine\"", es: "Mariama Condé: \"El liderazgo africano es femenino\"" },
    excerpt: { fr: "Notre présidente exécutive revient sur les 5 années qui ont transformé LET'S SHINE.", en: "Our executive president reflects on the 5 years that transformed LET'S SHINE.", es: "Nuestra presidenta ejecutiva reflexiona sobre los 5 años que transformaron LET'S SHINE." },
    content: {
      fr: "Mariama Condé reçoit dans les bureaux de Conakry, lumière naturelle, vue sur l'océan. Docteure en sciences de l'éducation, ancienne consultante Banque Mondiale, elle a fondé LET'S SHINE en 2021 avec une conviction : l'Afrique de demain se construit avec ses jeunes, et particulièrement ses jeunes femmes.\n\n« Quand j'ai commencé, on me disait que je rêvais trop grand », sourit-elle. « Aujourd'hui, nous accompagnons 12 500 jeunes dans 14 pays. Mais le plus important n'est pas dans les chiffres : c'est dans les regards qui changent. »\n\nPour Mariama, le leadership africain est profondément féminin, parce que ce sont les femmes qui portent l'éducation, la transmission et la résilience des communautés. LET'S SHINE a fait de l'autonomisation des jeunes femmes une priorité, avec 58% de bénéficiaires féminines.\n\nL'avenir ? « Poursivre, avec la même exigence. Nous voulons atteindre 50 000 jeunes d'ici 2030, et surtout, prouver que le modèle africain de développement par la jeunesse est replicable. »",
      en: "Mariama Condé welcomes us to the Conakry offices, natural light, ocean view. PhD in education sciences, former World Bank consultant, she founded LET'S SHINE in 2021 with a conviction: tomorrow's Africa is built with its youth, and especially its young women.\n\n\"When I started, people told me I was dreaming too big,\" she smiles. \"Today, we support 12,500 youth in 14 countries. But the most important thing is not in the numbers: it's in the looks that change.\"\n\nFor Mariama, African leadership is profoundly feminine, because women carry education, transmission and community resilience. LET'S SHINE has made empowering young women a priority, with 58% female beneficiaries.\n\nThe future? \"Continue, with the same rigor. We want to reach 50,000 youth by 2030, and above all, prove that the African model of youth-driven development is replicable.\"",
      es: "Mariama Condé nos recibe en las oficinas de Conakry, luz natural, vista al océano. Doctora en ciencias de la educación, ex consultora del Banco Mundial, fundó LET'S SHINE en 2021 con una convicción: el África del mañana se construye con su juventud, y especialmente con sus jóvenes mujeres.\n\n\"Cuando empecé, me decían que soñaba demasiado grande\", sonríe. \"Hoy acompañamos a 12.500 jóvenes en 14 países. Pero lo más importante no está en los números: está en las miradas que cambian.\"\n\nPara Mariama, el liderazgo africano es profundamente femenino, porque las mujeres llevan la educación, la transmisión y la resiliencia de las comunidades. LET'S SHINE ha hecho del empoderamiento de las jóvenes mujeres una prioridad, con un 58% de beneficiarias femeninas.\n\n¿El futuro? \"Continuar, con el mismo rigor. Queremos alcanzar 50.000 jóvenes de aquí a 2030, y sobre todo, demostrar que el modelo africano de desarrollo impulsado por la juventud es replicable.\"",
    },
    date: "2026-06-20", readTime: 9, author: "Rédaction", authorRole: { fr: "Rédaction", en: "Editorial", es: "Redacción" }, tag: "interview",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
  },
  {
    id: "a3",
    category: { fr: "Entrepreneuriat", en: "Entrepreneurship", es: "Emprendimiento" },
    title: { fr: "5 startups issues de nos cohortes lèvent 1,2M€", en: "5 startups from our cohorts raise €1.2M", es: "5 startups de nuestras cohortes levantan 1,2M€" },
    excerpt: { fr: "AgriTech, FinTech, EdTech : le nouveau visage de l'entrepreneuriat africain.", en: "AgriTech, FinTech, EdTech: the new face of African entrepreneurship.", es: "AgriTech, FinTech, EdTech: el nuevo rostro del emprendimiento africano." },
    content: {
      fr: "Cinq startups passées par le programme Entrepreneuriat de LET'S SHINE viennent de finaliser des levées de fonds totales de 1,2M€ en moins de 18 mois. Ces success stories illustrent la maturation de l'écosystème entrepreneurial africain.\n\nAgriTech, FinTech, EdTech : les secteurs porteurs sont au rendez-vous. Les fondateurs, tous âgés de moins de 30 ans, ont en commun un parcours LET'S SHINE : 8 mois d'accompagnement intensif, mentorat par des entrepreneurs confirmés, et accès à un réseau d'investisseurs africains et internationaux.\n\n« Nous ne cherchons pas à créer des startups de plus », explique Karim Traoré, mentor entrepreneuriat. « Nous cherchons à créer des entrepreneurs qui savent durer. » Les résultats sont là : 78% de survie à 2 ans, contre une moyenne africaine de 35%.\n\nLET'S SHINE prépare déjà la prochaine cohorte de 50 entrepreneurs, avec un objectif affiché : 5M€ levés d'ici fin 2027.",
      en: "Five startups that went through LET'S SHINE's Entrepreneurship program have just completed fundraising totaling €1.2M in less than 18 months. These success stories illustrate the maturation of the African entrepreneurial ecosystem.\n\nAgriTech, FinTech, EdTech: promising sectors are there. The founders, all under 30, share a LET'S SHINE journey: 8 months of intensive support, mentoring by experienced entrepreneurs, and access to a network of African and international investors.\n\n\"We are not trying to create more startups,\" explains Karim Traoré, entrepreneurship mentor. \"We are trying to create entrepreneurs who know how to last.\" The results are there: 78% survival at 2 years, compared to an African average of 35%.\n\nLET'S SHINE is already preparing the next cohort of 50 entrepreneurs, with a stated goal: €5M raised by the end of 2027.",
      es: "Cinco startups que pasaron por el programa de Emprendimiento de LET'S SHINE acaban de finalizar rondas de financiación por un total de 1,2M€ en menos de 18 meses. Estas historias de éxito ilustran la maduración del ecosistema emprendedor africano.\n\nAgriTech, FinTech, EdTech: los sectores prometedores están ahí. Los fundadores, todos menores de 30 años, comparten un recorrido LET'S SHINE: 8 meses de acompañamiento intensivo, mentoría por emprendedores experimentados y acceso a una red de inversores africanos e internacionales.\n\n\"No buscamos crear más startups\", explica Karim Traoré, mentor de emprendimiento. \"Buscamos crear emprendedores que sepan durar.\" Los resultados están ahí: 78% de supervivencia a 2 años, frente a una media africana del 35%.\n\nLET'S SHINE ya prepara la próxima cohorte de 50 emprendedores, con un objetivo declarado: 5M€ levantados para finales de 2027.",
    },
    date: "2026-06-12", readTime: 5, author: "Ousmane Barry", authorRole: { fr: "Directeur National", en: "National Director", es: "Director Nacional" }, tag: "press",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
  },
  {
    id: "a4",
    category: { fr: "Blog", en: "Blog", es: "Blog" },
    title: { fr: "Pourquoi le mentorat change tout (étude interne)", en: "Why mentoring changes everything (internal study)", es: "Por qué la mentoría lo cambia todo (estudio interno)" },
    excerpt: { fr: "Les chiffres qui prouvent l'impact du mentorat sur la carrière des jeunes.", en: "The numbers that prove mentoring's impact on youth careers.", es: "Los números que prueban el impacto de la mentoría en las carreras de los jóvenes." },
    content: {
      fr: "Pendant 18 mois, LET'S SHINE a mené une étude interne sur l'impact de son programme de mentorat. Les résultats, publiés aujourd'hui, sont sans appel : le mentorat multiplie par 2,8 la vitesse de progression salariale et par 3,2 les chances d'obtenir une promotion.\n\nL'étude a porté sur 1 500 binômes mentor-mentoré, suivis sur 12 mois. Les jeunes accompagnés par un mentor dédient 28% de temps en plus à leur développement professionnel, construisent un réseau 4x plus large, et déclarent une satisfaction professionnelle supérieure de 45%.\n\n« Le mentorat n'est pas un luxe, c'est un accélérateur », résume Fatou BAH, Responsable Programmes. « C'est la différence entre avancer seul dans le brouillard et marcher avec quelqu'un qui connaît le chemin. »\n\nLET'S SHINE prévoit d'étendre son réseau de mentors à 2 500 personnes d'ici 2027, avec un accent particulier sur les mentors féminins et les zones rurales.",
      en: "For 18 months, LET'S SHINE conducted an internal study on the impact of its mentoring program. The results, published today, are clear: mentoring multiplies salary progression speed by 2.8 and chances of promotion by 3.2.\n\nThe study covered 1,500 mentor-mentee pairs, followed over 12 months. Young people accompanied by a mentor dedicate 28% more time to their professional development, build a network 4x larger, and report 45% higher job satisfaction.\n\n\"Mentoring is not a luxury, it's an accelerator,\" summarizes Fatou BAH, Programs Manager. \"It's the difference between moving forward alone in the fog and walking with someone who knows the way.\"\n\nLET'S SHINE plans to expand its mentor network to 2,500 people by 2027, with a particular focus on female mentors and rural areas.",
      es: "Durante 18 meses, LET'S SHINE realizó un estudio interno sobre el impacto de su programa de mentoría. Los resultados, publicados hoy, son claros: la mentoría multiplica por 2,8 la velocidad de progresión salarial y por 3,2 las posibilidades de obtener un ascenso.\n\nEl estudio abarcó 1.500 parejas mentor-mentorizado, seguidas durante 12 meses. Los jóvenes acompañados por un mentor dedican un 28% más de tiempo a su desarrollo profesional, construyen una red 4x más amplia y reportan una satisfacción laboral superior en un 45%.\n\n\"La mentoría no es un lujo, es un acelerador\", resume Fatou BAH, Gerente de Programas. \"Es la diferencia entre avanzar solo en la niebla y caminar con alguien que conoce el camino.\"\n\nLET'S SHINE planea ampliar su red de mentores a 2.500 personas para 2027, con especial foco en mentores femeninos y zonas rurales.",
    },
    date: "2026-06-05", readTime: 7, author: "Fatou BAH", authorRole: { fr: "Responsable Programmes", en: "Programs Manager", es: "Gerente de Programas" }, tag: "blog",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  },
  {
    id: "a5",
    category: { fr: "International", en: "International", es: "Internacional" },
    title: { fr: "LET'S SHINE s'implante au Sénégal et au Mali", en: "LET'S SHINE expands to Senegal and Mali", es: "LET'S SHINE se expande a Senegal y Mali" },
    excerpt: { fr: "Deux nouveaux pays rejoignent le réseau panafricain LET'S SHINE en 2026.", en: "Two new countries join the LET'S SHINE pan-African network in 2026.", es: "Dos nuevos países se unen a la red panafricana LET'S SHINE en 2026." },
    content: {
      fr: "LET'S SHINE annonce officiellement son implantation au Sénégal et au Mali, portant à 16 le nombre de pays couverts par le réseau panafricain. Deux bureaux ont ouvert à Dakar et Bamako, avec des équipes locales de 8 personnes.\n\n« Cette expansion est une réponse à la demande », explique Mariama Condé. « Les jeunes sénégalais et maliens nous réclamaient nos programmes depuis deux ans. Nous avons pris le temps de construire des partenariats solides avant de nous lancer. »\n\nAu Sénégal, LET'S SHINE s'associe à l'Université Cheikh Anta Diop et à la Chambre de Commerce. Au Mali, le programme s'appuie sur un réseau d'ONG locales et le soutien du ministère de la Jeunesse.\n\nL'objectif : accompagner 1 500 jeunes dans chaque pays d'ici fin 2027, avec un focus particulier sur l'employabilité et l'entrepreneuriat rural.",
      en: "LET'S SHINE officially announces its expansion to Senegal and Mali, bringing to 16 the number of countries covered by the pan-African network. Two offices have opened in Dakar and Bamako, with local teams of 8 people.\n\n\"This expansion is a response to demand,\" explains Mariama Condé. \"Senegalese and Malian youth have been requesting our programs for two years. We took the time to build solid partnerships before launching.\"\n\nIn Senegal, LET'S SHINE partners with Cheikh Anta Diop University and the Chamber of Commerce. In Mali, the program relies on a network of local NGOs and support from the Ministry of Youth.\n\nThe goal: to support 1,500 youth in each country by the end of 2027, with a particular focus on employability and rural entrepreneurship.",
      es: "LET'S SHINE anuncia oficialmente su expansión a Senegal y Mali, elevando a 16 el número de países cubiertos por la red panafricana. Dos oficinas se han abierto en Dakar y Bamako, con equipos locales de 8 personas.\n\n\"Esta expansión es una respuesta a la demanda\", explica Mariama Condé. \"Los jóvenes senegaleses y malienses llevaban dos años solicitando nuestros programas. Nos tomamos el tiempo para construir alianzas sólidas antes de lanzarnos.\"\n\nEn Senegal, LET'S SHINE se asocia con la Universidad Cheikh Anta Diop y la Cámara de Comercio. En Mali, el programa se apoya en una red de ONG locales y el apoyo del Ministerio de Juventud.\n\nEl objetivo: acompañar a 1.500 jóvenes en cada país para finales de 2027, con especial foco en la empleabilidad y el emprendimiento rural.",
    },
    date: "2026-05-28", readTime: 4, author: "Communications", authorRole: { fr: "Communications", en: "Communications", es: "Comunicaciones" }, tag: "press",
    image: "https://images.unsplash.com/photo-1515028118958-0b4d7bcb20c9?w=1200&q=80",
  },
  {
    id: "a6",
    category: { fr: "Reportage", en: "Report", es: "Reportaje" },
    title: { fr: "Au cœur de la cohorte IMPACT JEUNES 2026", en: "Inside the IMPACT JEUNES 2026 cohort", es: "Dentro de la cohorte IMPACT JEUNES 2026" },
    excerpt: { fr: "Immersion photo pendant 6 mois aux côtés de 200 jeunes en transformation.", en: "Photo immersion over 6 months alongside 200 youth in transformation.", es: "Inmersión fotográfica durante 6 meses junto a 200 jóvenes en transformación." },
    content: {
      fr: "Pendant 6 mois, notre studio a suivi la cohorte IMPACT JEUNES 2026, du jour de l'ouverture à la remise des certificats. 200 jeunes, 14 nationalités, 6 mois d'intensité.\n\nLes premières semaines sont marquées par la timidité et l'incertitude. Puis vient le déclic : les ateliers de leadership, les immersions en entreprise, les pitchs devant des investisseurs. Peu à peu, les regards changent, les postures se redressent, les voix portent.\n\nLes photos racontent cette métamorphose. Des visages concentrés en atelier aux sourires fiers de la cérémonie de clôture, en passant par les soirées d'intégration et les moments de doute, c'est toute l'humanité d'un programme qui se révèle.\n\n« Je ne suis pas la même personne qu'au premier jour », confie Ibrahim, 24 ans. « LET'S SHINE m'a donné plus qu'une formation : une famille, une vision, une voix. »",
      en: "For 6 months, our studio followed the IMPACT JEUNES 2026 cohort, from opening day to the certificate ceremony. 200 young people, 14 nationalities, 6 months of intensity.\n\nThe first weeks are marked by shyness and uncertainty. Then comes the click: leadership workshops, business immersions, pitches in front of investors. Little by little, looks change, postures straighten, voices carry.\n\nThe photos tell this metamorphosis. From concentrated faces in workshops to proud smiles at the closing ceremony, through integration evenings and moments of doubt, it is the full humanity of a program that is revealed.\n\n\"I am not the same person as on the first day,\" confides Ibrahim, 24. \"LET'S SHINE gave me more than training: a family, a vision, a voice.\"",
      es: "Durante 6 meses, nuestro estudio siguió a la cohorte IMPACT JEUNES 2026, desde el día de apertura hasta la ceremonia de certificados. 200 jóvenes, 14 nacionalidades, 6 meses de intensidad.\n\nLas primeras semanas están marcadas por la timidez y la incertidumbre. Luego llega el clic: talleres de liderazgo, inmersiones empresariales, pitches ante inversores. Poco a poco, las miradas cambian, las posturas se enderezan, las voces llegan lejos.\n\nLas fotos cuentan esta metamorfosis. Desde rostros concentrados en talleres hasta sonrisas orgullosas en la ceremonia de clausura, pasando por las tardes de integración y los momentos de duda, se revela toda la humanidad de un programa.\n\n\"No soy la misma persona que el primer día\", confiesa Ibrahim, 24. \"LET'S SHINE me dio más que formación: una familia, una visión, una voz.\"",
    },
    date: "2026-05-18", readTime: 8, author: "Studio LS", authorRole: { fr: "Studio", en: "Studio", es: "Estudio" }, tag: "report",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80",
  },
];

export type EventItem = {
  id: string;
  type: "webinar" | "conference" | "workshop";
  image: string;
  title: { fr: string; en: string; es: string };
  date: string;
  time: string;
  location: { fr: string; en: string; es: string };
  mode: "online" | "offline" | "hybrid";
  price: number;
  seats: number;
  registered: number;
  description: { fr: string; en: string; es: string };
};

export const events: EventItem[] = [
  {
    id: "e1",
    type: "webinar",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
    title: { fr: "Leadership féminin : briller en Afrique", en: "Feminine leadership: shining in Africa", es: "Liderazgo femenino: brillar en África" },
    date: "2026-07-22", time: "16:00 GMT",
    location: { fr: "En ligne (Zoom)", en: "Online (Zoom)", es: "En línea (Zoom)" },
    mode: "online", price: 0, seats: 1000, registered: 642,
    description: { fr: "Table ronde avec 4 femmes leaders africaines. Échanges, conseils, networking. Une session d'1h30 suivie de 30 min de Q&A.", en: "Round table with 4 African women leaders. Discussions, advice, networking. A 1.5h session followed by 30 min Q&A.", es: "Mesa redonda con 4 mujeres líderes africanas. Intercambios, consejos, networking. Una sesión de 1,5h seguida de 30 min de Q&A." },
  },
  {
    id: "e2",
    type: "conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    title: { fr: "Forum LET'S SHINE 2026", en: "LET'S SHINE Forum 2026", es: "Foro LET'S SHINE 2026" },
    date: "2026-09-15", time: "09:00 - 18:00",
    location: { fr: "Centre de Conférences, Conakry", en: "Conference Center, Conakry", es: "Centro de Conferencias, Conakry" },
    mode: "hybrid", price: 25000, seats: 800, registered: 412,
    description: { fr: "Le grand rendez-vous annuel : 50 intervenants, 20 pays, 1 000 participants. Plénières, ateliers, exposition et networking.", en: "The big annual event: 50 speakers, 20 countries, 1,000 participants. Plenaries, workshops, exhibition and networking.", es: "El gran evento anual: 50 ponentes, 20 países, 1.000 participantes. Plenarias, talleres, exposición y networking." },
  },
  {
    id: "e3",
    type: "workshop",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
    title: { fr: "Atelier Pitch Investisseurs", en: "Investor Pitch Workshop", es: "Taller de Pitch a Inversores" },
    date: "2026-07-30", time: "10:00 - 13:00",
    location: { fr: "Hub Numérique, Dixinn", en: "Digital Hub, Dixinn", es: "Hub Digital, Dixinn" },
    mode: "offline", price: 15000, seats: 50, registered: 38,
    description: { fr: "Construisez un pitch deck qui lève des fonds. Coaching en sous-groupes avec 3 investisseurs présents.", en: "Build a pitch deck that raises funds. Small-group coaching with 3 investors present.", es: "Construye un pitch deck que levante fondos. Coaching en grupos pequeños con 3 inversores presentes." },
  },
  {
    id: "e4",
    type: "webinar",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    title: { fr: "Découvrir l'IA générative pour les PMA", en: "Discover Generative AI for SMEs", es: "Descubrir la IA Generativa para PYMEs" },
    date: "2026-08-08", time: "15:00 GMT",
    location: { fr: "En ligne (YouTube Live)", en: "Online (YouTube Live)", es: "En línea (YouTube Live)" },
    mode: "online", price: 0, seats: 2000, registered: 891,
    description: { fr: "Comment les TPE/PME africaines peuvent exploiter l'IA sans exploser leur budget. Cas pratiques et outils gratuits.", en: "How African SMEs can leverage AI without blowing their budget. Practical cases and free tools.", es: "Cómo las PYMEs africanas pueden aprovechar la IA sin explotar su presupuesto. Casos prácticos y herramientas gratuitas." },
  },
];

export type MediaItem = { id: string; type: "photo" | "video"; title: { fr: string; en: string; es: string }; category: string; thumb: string; date: string };

export const mediaItems: MediaItem[] = [
  { id: "m1", type: "photo", title: { fr: "Cohorte IMPACT JEUNES 2026", en: "IMPACT JEUNES Cohort 2026", es: "Cohorte IMPACT JEUNES 2026" }, category: "Programmes", thumb: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80", date: "2026-06-15" },
  { id: "m2", type: "photo", title: { fr: "Forum LET'S SHINE 2025", en: "LET'S SHINE Forum 2025", es: "Foro LET'S SHINE 2025" }, category: "Événements", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", date: "2025-09-20" },
  { id: "m3", type: "video", title: { fr: "Documentaire : 5 ans, 14 pays", en: "Documentary: 5 years, 14 countries", es: "Documental: 5 años, 14 países" }, category: "Vidéos", thumb: "https://images.unsplash.com/photo-1515028118958-0b4d7bcb20c9?w=800&q=80", date: "2026-01-10" },
  { id: "m4", type: "photo", title: { fr: "Atelier entrepreneuriat rural", en: "Rural entrepreneurship workshop", es: "Taller de emprendimiento rural" }, category: "Terrain", thumb: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80", date: "2026-04-08" },
  { id: "m5", type: "video", title: { fr: "Témoignage de Aïssatou", en: "Aïssatou's testimonial", es: "Testimonio de Aïssatou" }, category: "Témoignages", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", date: "2026-03-22" },
  { id: "m6", type: "photo", title: { fr: "Remise des certificats 2025", en: "2025 certificate ceremony", es: "Entrega de certificados 2025" }, category: "Cérémonies", thumb: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", date: "2025-12-15" },
  { id: "m7", type: "video", title: { fr: "Webinar leadership africain", en: "African leadership webinar", es: "Webinar de liderazgo africano" }, category: "Webinaires", thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", date: "2026-02-18" },
  { id: "m8", type: "photo", title: { fr: "Hackathon AgriTech", en: "AgriTech Hackathon", es: "Hackathon AgriTech" }, category: "Hackathons", thumb: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", date: "2026-05-05" },
  { id: "m9", type: "photo", title: { fr: "Formation digitale à Kankan", en: "Digital training in Kankan", es: "Formación digital en Kankan" }, category: "Terrain", thumb: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", date: "2026-03-12" },
  { id: "m10", type: "photo", title: { fr: "Mentorat 1-to-1", en: "1-to-1 mentoring", es: "Mentoría 1 a 1" }, category: "Mentorat", thumb: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", date: "2026-04-22" },
  { id: "m11", type: "video", title: { fr: "Pitch final entrepreneurs 2026", en: "Entrepreneurs final pitch 2026", es: "Pitch final emprendedores 2026" }, category: "Pitch", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", date: "2026-05-30" },
  { id: "m12", type: "photo", title: { fr: "Bourses SHINE Up", en: "SHINE Up Scholarships", es: "Becas SHINE Up" }, category: "Bourses", thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", date: "2026-02-05" },
];

export type TeamMember = { id: string; name: string; role: { fr: string; en: string; es: string }; bio: { fr: string; en: string; es: string }; initials: string; color: string; image: string };

export const founder: TeamMember = {
  id: "t1",
  name: "Dr. Mariama Condé",
  role: { fr: "Fondatrice & Présidente Exécutive", en: "Founder & Executive President", es: "Fundadora & Presidenta Ejecutiva" },
  bio: { fr: "Docteure en sciences de l'éducation, ancienne consultante Banque Mondiale, Mariama a fondé LET'S SHINE en 2021 après 15 ans à accompagner des projets de jeunesse en Afrique de l'Ouest. Sa vision : révéler le potentiel de chaque jeune africain par l'éducation, le mentorat et l'entrepreneuriat.", en: "PhD in education sciences, former World Bank consultant, Mariama founded LET'S SHINE in 2021 after 15 years supporting youth projects in West Africa. Her vision: reveal the potential of every African youth through education, mentorship and entrepreneurship.", es: "Doctora en ciencias de la educación, ex consultora del Banco Mundial, Mariama fundó LET'S SHINE en 2021 tras 15 años apoyando proyectos juveniles en África Occidental. Su visión: revelar el potencial de cada joven africano a través de la educación, la mentoría y el emprendimiento." },
  initials: "MC", color: "from-amber-500 to-yellow-600",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
};

export const nationalTeam: TeamMember[] = [
  { id: "t2", name: "Ousmane Barry", role: { fr: "Directeur National Guinée", en: "National Director Guinea", es: "Director Nacional Guinea" }, bio: { fr: "15 ans en gestion de programmes éducatifs. Ancien directeur d'ONG, Ousmane connaît le terrain guinéen par cœur.", en: "15 years in educational program management. Former NGO director, Ousmane knows the Guinean field by heart.", es: "15 años en gestión de programas educativos. Ex director de ONG, Ousmane conoce el terreno guineano de memoria." }, initials: "OB", color: "from-blue-500 to-indigo-600", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { id: "t3", name: "Fatou BAH", role: { fr: "Responsable Programmes", en: "Programs Manager", es: "Gerente de Programas" }, bio: { fr: "Experte en formation des jeunes. Diplômée de l'Université de Conakry, Fatou a formé plus de 3 000 jeunes.", en: "Youth training expert. Graduate of the University of Conakry, Fatou has trained more than 3,000 young people.", es: "Experta en formación juvenil. Graduada de la Universidad de Conakry, Fatou ha formado a más de 3.000 jóvenes." }, initials: "FB", color: "from-purple-500 to-pink-600", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
  { id: "t4", name: "Ibrahima Sow", role: { fr: "Responsable Partenariats", en: "Partnerships Manager", es: "Gerente de Alianzas" }, bio: { fr: "Ancien business developer chez Orange. Ibrahima tisse le réseau d'entreprises partenaires de LET'S SHINE.", en: "Former business developer at Orange. Ibrahima weaves LET'S SHINE's partner company network.", es: "Antiguo business developer en Orange. Ibrahima teje la red de empresas socias de LET'S SHINE." }, initials: "IS", color: "from-emerald-500 to-teal-600", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
  { id: "t5", name: "Aïssatou Diallo", role: { fr: "Responsable Communication", en: "Communications Manager", es: "Gerente de Comunicación" }, bio: { fr: "Journaliste de formation. Aïssatou fait rayonner la voix de LET'S SHINE dans 14 pays.", en: "Journalist by training. Aïssatou makes LET'S SHINE's voice shine in 14 countries.", es: "Periodista de formación. Aïssatou hace brillar la voz de LET'S SHINE en 14 países." }, initials: "AD", color: "from-rose-500 to-orange-600", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
];

export const committee: TeamMember[] = [
  { id: "t6", name: "Pr. Kwame Mensah", role: { fr: "Président - Ghana", en: "Chair - Ghana", es: "Presidente - Ghana" }, bio: { fr: "Professeur d'économie, Université de Accra. Spécialiste du développement africain.", en: "Economics professor, University of Accra. Specialist in African development.", es: "Profesor de economía, Universidad de Accra. Especialista en desarrollo africano." }, initials: "KM", color: "from-cyan-500 to-blue-600", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" },
  { id: "t7", name: "Dr. Aminata Sow", role: { fr: "Vice-Présidente - Sénégal", en: "Vice-Chair - Senegal", es: "Vicepresidenta - Senegal" }, bio: { fr: "Spécialiste entrepreneuriat jeunesse. Aminata a accompagné plus de 200 startups dakaroises.", en: "Youth entrepreneurship specialist. Aminata has supported more than 200 Dakar startups.", es: "Especialista en emprendimiento juvenil. Aminata ha acompañado a más de 200 startups dakaresas." }, initials: "AS", color: "from-fuchsia-500 to-purple-600", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
  { id: "t8", name: "Dr. Chukwuemeka Okafor", role: { fr: "Membre - Nigeria", en: "Member - Nigeria", es: "Miembro - Nigeria" }, bio: { fr: "Expert financement PME. Ancien banquier d'investissement à Lagos.", en: "SME financing expert. Former investment banker in Lagos.", es: "Experto en financiación PYME. Ex banquero de inversión en Lagos." }, initials: "CO", color: "from-amber-500 to-red-600", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { id: "t9", name: "Pr. Ngozi Adeyemi", role: { fr: "Membre - Kenya", en: "Member - Kenya", es: "Miembro - Kenia" }, bio: { fr: "Chercheuse en leadership. Ngozi enseigne à la Strathmore Business School.", en: "Leadership researcher. Ngozi teaches at Strathmore Business School.", es: "Investigadora en liderazgo. Ngozi enseña en Strathmore Business School." }, initials: "NA", color: "from-emerald-500 to-cyan-600", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
];

export const experts: TeamMember[] = [
  { id: "t10", name: "Léa Martin", role: { fr: "Mentor Leadership", en: "Leadership Mentor", es: "Mentora de Liderazgo" }, bio: { fr: "Coach PCC, 12 ans d'expérience. Spécialiste du leadership féminin.", en: "PCC Coach, 12 years experience. Specialist in feminine leadership.", es: "Coach PCC, 12 años de experiencia. Especialista en liderazgo femenino." }, initials: "LM", color: "from-blue-500 to-purple-600", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
  { id: "t11", name: "Karim Traoré", role: { fr: "Mentor Entrepreneuriat", en: "Entrepreneurship Mentor", es: "Mentor de Emprendimiento" }, bio: { fr: "Serial entrepreneur, 3 exits. Karim accompagne les jeunes fondateurs de la phase d'idéation au Series A.", en: "Serial entrepreneur, 3 exits. Karim supports young founders from ideation to Series A.", es: "Emprendedor en serie, 3 exits. Karim acompaña a los jóvenes fundadores de la fase de ideación a la Serie A." }, initials: "KT", color: "from-orange-500 to-red-600", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
  { id: "t12", name: "Sarah Johnson", role: { fr: "Mentor Numérique", en: "Digital Mentor", es: "Mentora Digital" }, bio: { fr: "Ex-Google Africa, experte data. Sarah forme les jeunes aux métiers du numérique.", en: "Ex-Google Africa, data expert. Sarah trains youth in digital professions.", es: "Ex-Google África, experta en datos. Sarah forma a los jóvenes en profesiones digitales." }, initials: "SJ", color: "from-purple-500 to-indigo-600", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
  { id: "t13", name: "Mamadou Camara", role: { fr: "Mentor Finance", en: "Finance Mentor", es: "Mentor de Finanzas" }, bio: { fr: "CFA, ancien banquier d'investissement. Mamadou aide les jeunes à structurer leur financier.", en: "CFA, former investment banker. Mamadou helps youth structure their finances.", es: "CFA, ex banquero de inversión. Mamadou ayuda a los jóvenes a estructurar sus finanzas." }, initials: "MC2", color: "from-emerald-500 to-green-600", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" },
];

export const socials = [
  { name: "Facebook", icon: "Facebook", url: "#" },
  { name: "LinkedIn", icon: "Linkedin", url: "#" },
  { name: "Instagram", icon: "Instagram", url: "#" },
  { name: "YouTube", icon: "Youtube", url: "#" },
  { name: "TikTok", icon: "Music2", url: "#" },
  { name: "X", icon: "Twitter", url: "#" },
];

export const donationGoals = [
  { goal: { fr: "Bourses IMPACT JEUNES", en: "IMPACT JEUNES Scholarships", es: "Becas IMPACT JEUNES" }, current: 145000, target: 250000, color: "from-amber-400 to-yellow-500", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" },
  { goal: { fr: "Kit numérique pour 500 jeunes", en: "Digital kit for 500 youth", es: "Kit digital para 500 jóvenes" }, current: 78000, target: 150000, color: "from-blue-400 to-indigo-500", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" },
  { goal: { fr: "Construction d'un hub à Labé", en: "Building a hub in Labé", es: "Construcción de un hub en Labé" }, current: 320000, target: 500000, color: "from-emerald-400 to-teal-500", image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80" },
];

export const donationAmounts = [10, 25, 50, 100, 250, 500];

export const heroGallery = [
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
];
