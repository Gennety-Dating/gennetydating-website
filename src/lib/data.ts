/* ========================================
   GENNETY — Static Content / Mock Data
   ======================================== */

import { type Locale } from "./i18n";

export const TELEGRAM_BOT_URL = "https://t.me/gennetybot?start=promo_DATE_WITH";
export const TWITTER_URL = "https://x.com/gennety_ai?s=20";
export const INSTAGRAM_URL = "https://www.instagram.com/gennety.ai/";
export const CONTACT_EMAIL = "dating@gennety.com";

// --- How It Works Steps ---
export interface Step {
  number: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    number: 1,
    title: "Tell Gennety Your Type",
    description: "Fill out your profile and specify your preferences.",
  },
  {
    number: 2,
    title: "Daily Match Drop",
    description:
      "Check your Telegram every day at 7pm.",
  },
  {
    number: 3,
    title: "Schedule the Date",
    description: "Find a time that works for both of you to meet up.",
  },
  {
    number: 4,
    title: "Have fun!",
    description: "Enjoy a good time with your personalized date!",
  },
];

// --- Real Dates Delivered Metrics ---
export interface Metric {
  label: string;
  color: "magenta" | "gold" | "sky";
}

export const metrics: Metric[] = [
  { label: "1,000+ Dates arranged", color: "magenta" },
  { label: "74% Success Rate", color: "gold" },
  { label: "92% Want a 2nd Date", color: "sky" },
];

// --- Matchmaker Features ---
export interface MatchmakerFeature {
  title: string;
  description: string;
}

export const matchmakerFeatures: MatchmakerFeature[] = [
  {
    title: "Backed by best AI research",
    description:
      "Built on insights from professional matchmakers and leading cognitive researchers.",
  },
  {
    title: "Gennety learns your preferences",
    description:
      "Our AI analyzes your interests, personality, and dating style to find compatible matches.",
  },
  {
    title: "Scans the entire pool to find the one",
    description:
      "Every student in our network is considered to find your best possible match.",
  },
];

// --- Testimonials ---
export interface Testimonial {
  name: string;
  school: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ali",
    school: "USC",
    quote:
      "gennety makes it super easy to meet ppl i actually wanna see irl",
  },
  {
    name: "Leo",
    school: "Cal",
    quote:
      "I literally don't need to do anything and just wait for the AI match.",
  },
  {
    name: "Mars",
    school: "Cal",
    quote:
      "Because it's tied to your school, the quality feels guaranteed, and it just feels safer.",
  },
  {
    name: "Sophia",
    school: "Cal",
    quote:
      "I had been matched a few weeks ago, and I'm in an exclusive relationship with my date now!",
  },
  {
    name: "Justin",
    school: "UCSD",
    quote:
      "way more efficient than juggling 10 chats on other apps.",
  },
  {
    name: "Maya",
    school: "UCLA",
    quote:
      "Our first date was literally just getting hotdogs and walking around, and it was the best date I've had in years.",
  },
  {
    name: "Lucas",
    school: "Stanford",
    quote:
      "I was skeptical about AI matchmakers, but we ended up talking for hours and walking around campus all night.",
  },
  {
    name: "Elena",
    school: "Cal",
    quote:
      "No awkward swiping, no small talk. We just met up and clicked instantly.",
  },
  {
    name: "Dan",
    school: "USC",
    quote:
      "Gennety matched us based on our actual vibe instead of just photos. Couldn't be happier!",
  },
  {
    name: "Chloe",
    school: "NYU",
    quote:
      "Felt like a scene straight out of a movie. We ended up talking until the place closed.",
  },
];

// --- FAQ ---
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "How does Gennety pair people?",
    answer:
      "Gennety pairs you with another student by analyzing your profiles and comparing your preferences. This process employs rigorous computation and simulation to provide the best insights for curating a successful date. Leveraging the reasoning abilities of frontier LLMs, we can catch the slightest signs of the possibilities of a good date. We also have an agentic system that orchestrates different expert agents including analysis experts, matchmaking experts, personalized poster experts, scheduler experts, etc.",
  },
  {
    question: "How Gennety works",
    answer:
      "Gennety curates dates for you without requiring you to swipe or chat with anyone. After submitting your information, Gennety will text you a date plan that includes the time, place, and details of your match. The date will take place around the campus you're currently near.",
  },
  {
    question: "What will I know about my match before the date?",
    answer:
      "Once we find a good match for you, you'll get a poster with their photos and a short explanation of why you'd be a great pair. You'll also get a scheduler to share your availability for the week. After both of you fill it out, we'll arrange the date time, place, and give you a few dating tips to help it go smoothly.",
  },
  {
    question: "What if I don't like my match/date?",
    answer:
      "You can always simply tell Gennety the reason why you don't like it and any other feedback. Gennety will then proceed to arrange another date that follows the feedback. You can also adjust your profile to update your preferences and personal information.",
  },
  {
    question: "Who's participating?",
    answer:
      "Currently, only college students who are 18 or older are participating in this experience.",
  },
  {
    question: "What if I can't make it last minute?",
    answer:
      "If you really can't make it last minute, please cancel by texting your match asap to prevent being banned from future experiences.",
  },
  {
    question: "How long does it usually take?",
    answer:
      "Since we are only releasing this experience to a very select group of students, we estimate that it will take approximately one to two weeks to secure a guaranteed in-person coffee date. For a recent upgrade in system, 70% of the users now get their first date within 2 days of signing up.",
  },
  {
    question: "Where do the dates happen?",
    answer:
      "Dates take place at carefully selected on-campus spots to ensure a safe and enjoyable experience.",
  },
];

// --- Safety Points ---
export interface SafetyPoint {
  title: string;
  description: string;
}

export const safetyPoints: SafetyPoint[] = [
  {
    title: "Verified students only",
    description: "Every user is verified through their university email.",
  },
  {
    title: "Only your date sees you",
    description: "Your profile is never browsed. Only your match gets to see you.",
  },
  {
    title: "Coffee dates on campus",
    description: "All dates happen at safe, familiar on-campus locations.",
  },
];

// --- Date Places Section ---
export interface DatePlace {
  id: string;
  city: "warsaw" | "kyiv";
  type: "cafe" | "restaurant" | "park" | "museum";
  vibe: Record<Exclude<Locale, "fr" | "it" | "es">, string> & { fr?: string; it?: string; es?: string };
  name: Record<Exclude<Locale, "fr" | "it" | "es">, string> & { fr?: string; it?: string; es?: string };
  description: Record<Exclude<Locale, "fr" | "it" | "es">, string> & { fr?: string; it?: string; es?: string };
  images: string[];
  mapsUrl: string;
  likes: number;
  isPremium?: boolean;
  isComingSoon?: boolean;
}

export const datePlaces: DatePlace[] = [
  // Kyiv Places
  {
    id: "kyiv-frou-frou",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "French Haute Cuisine & Chic Bistro",
      uk: "Французька висока кухня та шикарне бістро",
      ru: "Французская высокая кухня и шикарное бистро",
      de: "Französische Haute Cuisine & Schickes Bistro",
      pl: "Francuska haute cuisine i eleganckie bistro",
      fr: "Haute cuisine française & bistrot chic",
      it: "Alta cucina francese & bistrot chic",
      es: "Alta cocina francesa y bistró elegante"
    },
    name: {
      en: "Frou Frou",
      uk: "Frou Frou",
      ru: "Frou Frou",
      de: "Frou Frou",
      pl: "Frou Frou",
      fr: "Frou Frou",
      it: "Frou Frou",
      es: "Frou Frou"
    },
    description: {
      en: "An elegant French restaurant in Pechersk offering classic Parisian aesthetics, refined haute cuisine, champagne, and an exquisitely romantic ambiance.",
      uk: "Елегантний французький ресторан на Печерську з класичною паризькою естетикою, вишуканою авторською кухнею, шампанським та витонченою романтичною атмосферою.",
      ru: "Элегантный французский ресторан на Печерске с классической парижской эстетикой, изысканной авторской кухней, шампанским и утонченной романтической атмосферой.",
      de: "Ein elegantes französisches Restaurant in Petschersk mit klassischer Pariser Ästhetik, raffinierter Haute Cuisine, Champagner und einem exquisiten romantischen Ambiente.",
      pl: "Elegancka francuska restauracja na Peczersku z klasyczną paryską estetyką, wykwintną haute cuisine, szampanem i wyrafinowaną romantyczną atmosferą.",
      fr: "Un élégant restaurant français à Petchersk offrant une esthétique parisienne classique, une haute cuisine raffinée, du champagne et une ambiance délicieusement romantique.",
      it: "Un elegante ristorante francese a Pechersk con una classica estetica parigina, raffinata alta cucina, champagne e un'atmosfera squisitamente romantica.",
      es: "Un elegante restaurante francés en Pechersk que ofrece la clásica estética parisina, refinada alta cocina, champán y un ambiente exquisitamente romántico."
    },
    images: [
      "/images/places/kyiv_frou_frou_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Frou+Frou+Kyiv",
    likes: 53,
    isPremium: true
  },
  {
    id: "kyiv-mario",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Fine Dining & Classic Elegance",
      uk: "Італійська висока кухня та класична елегантність",
      ru: "Итальянская высокая кухня и классическая элегантность",
      de: "Italienische Gourmetküche & Klassische Eleganz",
      pl: "Włoska wykwintna kuchnia i klasyczna elegancja",
      fr: "Haute gastronomie italienne & élégance classique",
      it: "Alta gastronomia italiana ed eleganza classica",
      es: "Alta cocina italiana y elegancia clásica"
    },
    name: {
      en: "Mario",
      uk: "Mario",
      ru: "Mario",
      de: "Mario",
      pl: "Mario",
      fr: "Mario",
      it: "Mario",
      es: "Mario"
    },
    description: {
      en: "A prestigious Italian restaurant in central Kyiv known for its exquisite Mediterranean cuisine, luxurious classic interior with coffered ceilings, and intimate candlelit atmosphere for romantic dates.",
      uk: "Престижний ресторан італійської кухні в центрі Києва з вишуканими середземноморськими стравами, розкішним класичним інтер'єром та затишною атмосферою при свічках для романтичних побачень.",
      ru: "Престижный ресторан итальянской кухни в центре Киева с изысканными средиземноморскими блюдами, роскошным классическим интерьером и уютной атмосферой при свечах для романтических свиданий.",
      de: "Ein renommiertes italienisches Restaurant im Zentrum von Kiew mit erlesener mediterraner Küche, prachtvollem klassischem Interieur und romantischer Atmosphäre bei Kerzenschein.",
      pl: "Prestiżowa restauracja włoska w centrum Kijowa znana z wykwintnej kuchni śródziemnomorskiej, luksusowego klasycznego wnętrza i romantycznej atmosfery przy świecach.",
      fr: "Un prestigieux restaurant italien au centre de Kyiv réputé pour sa cuisine méditerranéenne raffinée, son intérieur classique somptueux et son ambiance intime aux chandelles.",
      it: "Un prestigioso ristorante italiano nel centro di Kyiv noto per la sua raffinata cucina mediterranea, i sontuosi interni classici e l'atmosfera intima a lume di candela.",
      es: "Un prestigioso restaurante italiano en el centro de Kyiv conocido por su exquisita cocina mediterránea, sus lujosos interiores clásicos y un ambiente íntimo a la luz de las velas."
    },
    images: [
      "/images/places/kyiv_mario_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mario+Restaurant+Kyiv",
    likes: 7,
    isPremium: true
  },
  {
    id: "kyiv-sarto",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Fine Dining & Enoteca",
      uk: "Італійська висока кухня та енотека",
      ru: "Итальянская высокая кухня и энотека",
      de: "Italienische Gourmetküche & Enoteca",
      pl: "Włoska kuchnia gourmet i enoteka"
    },
    name: {
      en: "Sarto",
      uk: "Sarto",
      ru: "Sarto",
      de: "Sarto",
      pl: "Sarto"
    },
    description: {
      en: "An exquisite Italian restaurant and cocktail bar located in the Passage. Renowned for authentic gastronomy by Stefano Antoniolli, a curated enoteca, and a refined aesthetic atmosphere.",
      uk: "Вишуканий ресторан італійської кухні та коктейльний бар у Пасажі на Хрещатику. Відомий авторською гастрономією Стефано Антоніоллі, розкішною енотекою та витонченою естетикою для побачень.",
      ru: "Изысканный ресторан итальянской кухни и коктейльный бар в Пассаже на Крещатике. Известен авторской гастрономией Стефано Антониолли, роскошной энотекой и утонченной атмосферой для свиданий.",
      de: "Ein exquisites italienisches Restaurant und eine Cocktailbar in der Passage. Bekannt für authentische Küche von Stefano Antoniolli, eine erlesene Enoteca und eine elegante Atmosphäre.",
      pl: "Wykwintna włoska restauracja i bar koktajlowy w Pasażu. Słynie z autentycznej kuchni Stefano Antoniolli, bogatej enoteki i wyrafinowanej atmosfery na randkę."
    },
    images: [
      "/images/places/kyiv_sarto_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sarto+Restaurant+Kyiv",
    likes: 20,
    isPremium: true
  },
  {
    id: "kyiv-tsum",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Rooftop & Iconic Shopping Destination",
      uk: "Дах та культовий універмаг",
      ru: "Крыша и культовый универмаг",
      de: "Dachterrasse & Kult-Shopping-Spot",
      pl: "Taras na dachu i kultowe centrum handlowe"
    },
    name: {
      en: "TSUM Kyiv",
      uk: "ЦУМ Київ",
      ru: "ЦУМ Киев",
      de: "TSUM Kiew",
      pl: "TSUM Kijów"
    },
    description: {
      en: "Iconic central department store in Kyiv featuring panoramic rooftop dining, premium cafes, futuristic atrium aesthetics, and a vibrant atmosphere perfect for dates.",
      uk: "Культовий головний універмаг Києва з панорамними ресторанами на даху, преміальними кав'ярнями, футуристичною атріумною архітектурою та яскравою атмосферою для побачень.",
      ru: "Культовый главный универмаг Киева с панорамными ресторанами на крыше, премиальными кофейнями, футуристичной архитектурой атриума и атмосферным пространством для свиданий.",
      de: "Legendäres zentrales Kaufhaus in Kiew mit Panoramarestaurants auf dem Dach, Premium-Cafés, futuristischer Atrium-Ästhetik und einer lebendigen Atmosphäre für Dates.",
      pl: "Kultowy dom towarowy w Kijowie z panoramicznymi restauracjami na dachu, kawiarniami premium, futurystyczną architekturą atrium i świetną atmosferą na randkę."
    },
    images: [
      "/images/places/kyiv_tsum_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=TSUM+Kyiv",
    likes: 102,
    isPremium: true
  },
  {
    id: "kyiv-yistetyka",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Aesthetic Fast-Casual & Healthy Dining",
      uk: "Естетичний фаст-кежуал та корисна їжа",
      ru: "Эстетичный фаст-кэжуал и полезная еда",
      de: "Ästhetisches Fast-Casual & Gesunde Küche",
      pl: "Estetyczny fast-casual i zdrowe jedzenie"
    },
    name: {
      en: "Yistetyka",
      uk: "Їстетика",
      ru: "Їстетика",
      de: "Yistetyka",
      pl: "Yistetyka"
    },
    description: {
      en: "A stylish modern eatery in Kyiv combining clean minimalist interior aesthetics with nutritious, high-quality dishes and specialty coffee.",
      uk: "Стильний сучасний заклад у Києві, що поєднує витончений мінімалістичний інтер'єр із корисними, якісними стравами та спешелті кавою.",
      ru: "Стильное современное заведение в Киеве, сочетающее утонченный минималистичный интерьер с полезными качественными блюдами и спешелти кофе.",
      de: "Ein stilvolles modernes Lokal in Kiew, das ein meisterhaftes minimalistisches Interieur mit gesunden, hochwertigen Gerichten und Spezialitätenkaffee kombiniert.",
      pl: "Stylowy, nowoczesny lokal w Kijowie łączący czystą, minimalistyczną estetykę wnętrza z pożywnymi, wysokiej jakości daniami i kawą specialty."
    },
    images: [
      "/images/places/kyiv_yistetyka_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Yistetyka+Kyiv",
    likes: 15,
    isPremium: true
  },
  {
    id: "kyiv-marco",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Cozy Patio & Cafe",
      uk: "Затишне кафе з двориком",
      ru: "Уютное кафе с двориком",
      de: "Gemütliches Café mit Innenhof",
      pl: "Przytulna kawiarnia z dziedzińcem"
    },
    name: {
      en: "Cafe Marko",
      uk: "Cafe Marko",
      ru: "Cafe Marko",
      de: "Cafe Marko",
      pl: "Cafe Marko"
    },
    description: {
      en: "A stylish cafe located in the heart of Kyiv on Sophia Square (inside Sophia Hotel). Famous for its tranquil glass-roofed patio, signature breakfasts, and aesthetic modern interior.",
      uk: "Стильний заклад у самому серці Києва біля Софійської площі (в будівлі Sophia Hotel). Відомий затишним двориком під скляним дахом, вишуканими сніданками та естетичним інтер'єром.",
      ru: "Стильное заведение в самом сердце Киева возле Софийской площади (в здании Sophia Hotel). Известно уютным двориком под стеклянной крышей, изысканными завтраками и эстетичным интерьером.",
      de: "Ein stilvolles Café im Herzen von Kiew am Sophienplatz. Bekannt für seinen ruhigen glasüberdachten Innenhof, köstliche Frühstücke und ein ästhetisches modernes Interieur.",
      pl: "Stylowa kawiarnia w samym sercu Kijowa przy Placu Zofii. Słynie z przytulnego przeszklonego dziedzińca, wyśmienitych śniadań i estetycznego wnętrza."
    },
    images: [
      "/images/places/kyiv_marco_patio.jpg",
      "/images/places/kyiv_marco_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Marko+Sophia+Hotel+Kyiv",
    likes: 27,
    isPremium: true
  },
  {
    id: "kyiv-porto-maltese",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Seafood Restaurant",
      uk: "Рибний ресторан",
      ru: "Рыбный ресторан",
      de: "Fischrestaurant",
      pl: "Restauracja rybna"
    },
    name: {
      en: "Porto Maltese",
      uk: "Porto Maltese",
      ru: "Porto Maltese",
      de: "Porto Maltese",
      pl: "Porto Maltese"
    },
    description: {
      en: "Elegant Mediterranean seafood restaurant with fresh fish selection, refined coastal interior, and an ideal atmosphere for romantic dinners.",
      uk: "Вишуканий середземноморський рибний ресторан із вибором свіжої риби, витонченим морським інтер'єром та ідеальною атмосферою для романтичних вечерь.",
      ru: "Изысканный средиземноморский рыбный ресторан с выбором свежей рыбы, утонченным морским интерьером и идеальной атмосферой для романтических ужинов.",
      de: "Elegantes mediterranes Fischrestaurant mit frischer Fischauswahl, feinem küstennahem Interieur und einer idealen Atmosphäre für romantische Abendessen.",
      pl: "Elegancka śródziemnomorska restauracja rybna z wyborem świeżych ryb, wyrafinowanym wnętrzem i idealną atmosferą na romantyczną kolację."
    },
    images: [
      "/images/places/kyiv_porto_maltese_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Porto+Maltese+Kyiv",
    likes: 13,
    isPremium: true
  },
  {
    id: "kyiv-milk-bar",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Cozy Cafe",
      uk: "Затишне кафе",
      ru: "Уютное кафе",
      de: "Gemütliches Café",
      pl: "Przytulna kawiarnia"
    },
    name: {
      en: "Milk Bar",
      uk: "Milk Bar",
      ru: "Milk Bar",
      de: "Milk Bar",
      pl: "Milk Bar"
    },
    description: {
      en: "Vibrant and trendy cafe in the center of Kyiv, famous for delicious cakes, breakfast options, and a warm interior.",
      uk: "Яскраве та трендове кафе у центрі Києва, відоме смачними десертами, сніданками та затишною атмосферою.",
      ru: "Яркое и трендовое кафе в центре Киева, известное вкусными десертами, завтраками и уютной атмосферой.",
      de: "Lebhaftes und trendiges Café im Zentrum von Kiew, bekannt für leckere Kuchen, Frühstück und ein warmes Interieur.",
      pl: "Tętniąca życiem i modna kawiarnia w centrum Kijowa, słynąca z pysznych ciast, śniadań i ciepłego wnętrza."
    },
    images: [
      "/images/places/kyiv_milk_bar_1.jpg",
      "/images/places/kyiv_milk_bar_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Milk+Bar+Shota+Rustaveli+Kyiv",
    likes: 50
  },
  {
    id: "kyiv-mimosa",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Cozy Pizza Place",
      uk: "Затишна піцерія",
      ru: "Уютная пиццерия",
      de: "Gemütliche Pizzeria",
      pl: "Przytulna pizzeria"
    },
    name: {
      en: "Mimosa Brooklyn Pizza",
      uk: "Mimosa Brooklyn Pizza",
      ru: "Mimosa Brooklyn Pizza",
      de: "Mimosa Brooklyn Pizza",
      pl: "Mimosa Brooklyn Pizza"
    },
    description: {
      en: "A legendary pizzeria near Bessarabska Square. Famous for Brooklyn-style pizza, cozy candlelight in the evening, and a vibrant, friendly atmosphere perfect for a date.",
      uk: "Легендарна піцерія біля Бессарабської площі. Відома бруклінською піцою, затишним вечірнім світлом свічок та жвавою атмосферою для першого побачення.",
      ru: "Легендарная пиццерия возле Бессарабской площади. Известна бруклинской пиццей, уютным вечерним светом свечей и оживленной атмосферой для первого свидания.",
      de: "Eine legendäre Pizzeria in der Nähe des Bessarabska-Platzes. Bekannt für Brooklyn-Style-Pizza, gemütliches Kerzenlicht am Abend und eine lebendige Atmosphäre.",
      pl: "Legendarna pizzeria w pobliżu Placu Bessarabskiego. Słynie z pizzy w stylu brooklyńskim, przytulnego światła świec wieczorem i tętniącej życiem atmosfery."
    },
    images: [
      "/images/places/kyiv_mimosa_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mimosa+Brooklyn+Pizza+Kyiv",
    likes: 52
  },
  {
    id: "kyiv-volodymyr-hill",
    city: "kyiv",
    type: "park",
    vibe: {
      en: "Panoramic Views",
      uk: "Мальовнича панорама",
      ru: "Живописная панорама",
      de: "Malerisches Panorama",
      pl: "Malownicza panorama"
    },
    name: {
      en: "Volodymyr Hill",
      uk: "Володимирська гірка",
      ru: "Владимирская горка",
      de: "Wolodymyr-Hügel",
      pl: "Górka Włodzimierza"
    },
    description: {
      en: "A historic park featuring stunning views over the Dnipro River and Podil, romantic open-work gazebos, and the iconic Kyiv Funicular.",
      uk: "Головна видова точка міста. Старий Київ, фунікулер, ажурні альтанки та запаморочлива панорама на Дніпро та Подол.",
      ru: "Главная видовая точка. Старый Киев, фуникулер, ажурные беседки и головокружительная панорама на Днепр и Подол.",
      de: "Ein historic Park mit atemberaubendem Blick auf den Dnipro und Podil, romantischen Pavillons und der Standseilbahn.",
      pl: "Historyczny park z zapierającym dech w piersiach widokiem na Dniepr i Podol, zabytkową kolejką linowo-terenową i altanami."
    },
    images: [
      "/images/places/kyiv_volodymyr_hill_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Volodymyr+Hill+Kyiv",
    likes: 36
  },
  {
    id: "kyiv-idealist",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Specialty Coffee",
      uk: "Спешелті кава",
      ru: "Спешелти кофе",
      de: "Spezialitätenkaffee",
      pl: "Kawa specialty"
    },
    name: {
      en: "Idealist",
      uk: "Idealist",
      ru: "Idealist",
      de: "Idealist",
      pl: "Idealist"
    },
    description: {
      en: "A modern specialty coffee shop with a minimalist interior and a focus on premium beans. Great for warm conversation over exceptional coffee.",
      uk: "Сучасна кав'ярня третьої хвилі з мінімалістичним інтер'єром та фокусом на якісному зерні. Чудове місце для теплих розмов за чашкою фільтру.",
      ru: "Современная кофейня третьей волны с минималистичным и уютным дизайном, где ценят качественное зерно. Идеально для душевной беседы.",
      de: "Ein modernes Spezialitäten-Café mit minimalistischem Interieur und Fokus auf Premium-Bohnen. Perfekt für ein entspanntes Date.",
      pl: "Nowoczesna kawiarnia specialty o minimalistycznym wnętrzu i wyjątkowej kawie. Świetna na ciepłą rozmowę przy filiżance dobrego przelewu."
    },
    images: [
      "/images/places/kyiv_idealist_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Idealist+Coffee+Kyiv",
    likes: 47
  },
  {
    id: "kyiv-honey",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Dessert Cafe",
      uk: "Кафе-кондитерська",
      ru: "Кафе-кондитерская",
      de: "Dessert-Café",
      pl: "Kawiarnia deserowa"
    },
    name: {
      en: "Honey",
      uk: "Honey",
      ru: "Honey",
      de: "Honey",
      pl: "Honey"
    },
    description: {
      en: "An exquisite dessert cafe with iconic pastries, handmade chocolates, and a bright, stylish atmosphere that's perfect for a sweet date.",
      uk: "Вишукане кафе-кондитерська з легендарними десертами, шоколадом ручної роботи та світлою стильною атмосферою для солодкого побачення.",
      ru: "Изысканное кафе-кондитерская с легендарными десертами, шоколадом ручной работы и светлой стильной атмосферой для сладкого свидания.",
      de: "Ein exquisites Dessert-Café mit ikonischen Backwaren, handgemachten Pralinen und einer hellen, stilvollen Atmosphäre, perfekt für ein süßes Date.",
      pl: "Wykwintna kawiarnia deserowa z kultowymi wypiekami, ręcznie robionymi czekoladkami i jasną, stylową atmosferą doskonałą na słodką randkę."
    },
    images: [
      "/images/places/kyiv_honey_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Honey+Kyiv",
    likes: 43
  },
  {
    id: "kyiv-zavertailo",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Artisanal Bakery",
      uk: "Реміснича пекарня",
      ru: "Ремесленная пекарня",
      de: "Handwerkliche Bäckerei",
      pl: "Piekarnia rzemieślnicza"
    },
    name: {
      en: "Zavertailo",
      uk: "Завертайло",
      ru: "Завертайло",
      de: "Zavertailo",
      pl: "Zavertailo"
    },
    description: {
      en: "A trendy bakery combining traditional bread culture with modern culinary twists. Famed for its sourdough pastries and artisanal vibes.",
      uk: "Трендова пекарня, що поєднує традиційну культуру випікання хліба з сучасними гастрономічними ідеями. Відома круасанами та особливою атмосферою.",
      ru: "Трендовая пекарня, сочетающая традиционную культуру выпечки хлеба с современными гастрономическими идеями. Известна круассанами и особой атмосферой.",
      de: "Eine trendige Bäckerei, die traditionelle Brotkultur mit modernen kulinarischen Akzenten verbindet. Bekannt für Sauerteiggebäck und handwerkliches Flair.",
      pl: "Modna piekarnia łącząca tradycyjną kulturę chleba z nowoczesnymi akcentami kulinarnymi. Słynie z wypieków na zakwasie i rzemieślniczego klimatu."
    },
    images: [
      "/images/places/kyiv_zavertailo_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Zavertailo+Kyiv",
    likes: 46
  },
  {
    id: "kyiv-lviv-croissants",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Fresh Croissants",
      uk: "Львівські круасани",
      ru: "Львовские круассаны",
      de: "Frische Croissants",
      pl: "Świeże rogaliki"
    },
    name: {
      en: "Lviv Croissants",
      uk: "Львівські круасани",
      ru: "Львовские круассаны",
      de: "Lviv Croissants",
      pl: "Lwowskie Rogaliki"
    },
    description: {
      en: "An extremely popular bakery offering giant freshly-baked croissants with a variety of sweet and savory fillings in a relaxed, friendly atmosphere.",
      uk: "Надзвичайно популярна пекарня, що пропонує гігантські свіжоспечені круасани з різноманітними солодкими та ситними начинками у затишній атмосферою.",
      ru: "Чрезвычайно популярная пекарня, предлагающая гигантские свежеиспеченные круассаны с разнообразными сладкими и сытными начинками в уютной атмосфере.",
      de: "Eine äußerst beliebte Bäckerei, die riesige, frisch gebackene Croissants mit einer Vielzahl von süßen und herzhaften Füllungen in entspannter Atmosphäre anbietet.",
      pl: "Bardzo popularna piekarnia oferująca gigantyczne, świeżo wypiekane rogaliki z różnorodnymi nadzieniami słodkimi i słonymi w swobodnej atmosferze."
    },
    images: [
      "/images/places/kyiv_lviv_croissants_main.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lviv+Croissants+Kyiv",
    likes: 35
  },
  {
    id: "kyiv-natalka-park",
    city: "kyiv",
    type: "park",
    vibe: {
      en: "Modern Waterfront",
      uk: "Сучасна набережна",
      ru: "Современная набережная",
      de: "Moderne Uferpromenade",
      pl: "Nowoczesne nabrzeże"
    },
    name: {
      en: "Natalka Park",
      uk: "Парк «Наталка»",
      ru: "Парк «Наталка»",
      de: "Natalka-Park",
      pl: "Park Natalka"
    },
    description: {
      en: "A masterpiece of modern urban design featuring a perfect high-tech embankment and direct access to the clear waters of the Dnipro River.",
      uk: "Абсолютний топ сучасної урбаністики. Ідеальний перфекціоністський дизайн, хай-тек набережна та дніпровська вода прямо у ніг.",
      ru: "Абсолютный топ современной урбанистики. Идеальный перфекционистский дизайн, хай-тек набережная и жидкое стекло днепровской воды прямо у ног.",
      de: "Ein Meisterwerk des modernen Städtebaus mit perfekter High-Tech-Uferpromenade und direktem Zugang zum Fluss Dnipro.",
      pl: "Absolutny hit nowoczesnej urbanistyki. Perfekcyjny design, promenada tuż nad wodą Dniepru."
    },
    images: [
      "/images/places/kyiv_natalka_park_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Natalka+Park+Kyiv",
    likes: 37
  },
  {
    id: "kyiv-paul",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "French Bakery",
      uk: "Французька пекарня",
      ru: "Французская пекарня",
      de: "Französische Bäckerei",
      pl: "Francuska piekarnia"
    },
    name: {
      en: "Paul",
      uk: "Paul",
      ru: "Paul",
      de: "Paul",
      pl: "Paul"
    },
    description: {
      en: "A classic French bakery and restaurant known for its exquisite pastries, fresh baguettes, and elegant European atmosphere.",
      uk: "Класична французька пекарня-ресторан, відома своєю вишуканою випічкою, свіжими багетами та елегантною європейською атмосферою.",
      ru: "Классическая французская пекарня-ресторан, известная своей изысканной выпечаткой, свежими багетами и элегантной европейской атмосферой.",
      de: "Eine klassische französische Bäckerei und Restaurant, bekannt für erlesenes Gebäck, frische Baguettes und elegante europäische Atmosphäre.",
      pl: "Klasyczna francuska piekarnia i restauracja znana z wykwintnych wypieków, świeżych bagietek i eleganckiej europejskiej atmosfery."
    },
    images: [
      "/images/places/kyiv_paul_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paul+Bakery+Kyiv",
    likes: 34
  },
  {
    id: "kyiv-zigzag",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Cozy Bistro",
      uk: "Затишне бістро",
      ru: "Уютное бистро",
      de: "Gemütliches Bistro",
      pl: "Przytulne bistro"
    },
    name: {
      en: "Zigzag",
      uk: "Зигзаг",
      ru: "Зигзаг",
      de: "Zigzag",
      pl: "Zigzag"
    },
    description: {
      en: "A trendy bistro on Zolotovoritska street, offering exceptional comfort food, modern breakfasts, and a warm, community-driven atmosphere.",
      uk: "Трендове бістро на Золотоворітській, відоме чудовою кухнею, сніданками та затишною атмосферою.",
      ru: "Трендовое бистро на Золотоворотской, известное отличной кухней, завтраками и теплой атмосферой.",
      de: "Ein trendiges Bistro in der Nähe des Goldenen Tors mit Comfort Food, modernem Frühstück und einer einladenden Atmosphäre.",
      pl: "Modne bistro w pobliżu Złotej Bramy oferujące wyjątkowe comfort food, nowoczesne śniadania i ciepłą atmosferę."
    },
    images: [
      "/images/places/kyiv_zigzag_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Zigzag+Kyiv",
    likes: 42
  },
  {
    id: "kyiv-kitsunya",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Asian Bistro",
      uk: "Азійське бістро",
      ru: "Азиатское бистро",
      de: "Asiatisches Bistro",
      pl: "Azjatyckie bistro"
    },
    name: {
      en: "Kitsunya",
      uk: "Кицуня",
      ru: "Кицуня",
      de: "Kitsunya",
      pl: "Kitsunya"
    },
    description: {
      en: "A trendy Asian bistro near Zoloti Vorota. Famous for its authentic ramen, fluffy bao buns, and a cozy, modern design with neon accents that makes it a perfect date spot.",
      uk: "Трендове азійське бістро біля Золотих воріт. Відоме смачним раменом, пухкими бао та затишним сучасним інтер'єром з неоновими акцентами для побачень.",
      ru: "Трендовое азиатское бистро возле Золотых ворот. Известно вкусным раменом, пышными бао и уютным современным интерьером с неоновыми акцентами для свиданий.",
      de: "Ein trendiges asiatisches Bistro in der Nähe von Zoloti Vorota. Bekannt für exzellente Ramen, fluffige Bao-Brötchen und ein gemütliches Interieur mit Neon-Akzenten.",
      pl: "Modne azjatyckie bistro w pobliżu Złotej Bramy. Słynie z doskonałego ramenu, puszystych bułeczek bao i przytulnego wnętrza z neonowymi akcentami."
    },
    images: [
      "/images/places/kyiv_kitsunya_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kitsunya+Bistro+Velyka+Zhytomyrska+Kyiv",
    likes: 31
  },
  {
    id: "kyiv-china-hi",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Trendy Chinese",
      uk: "Китайський Привіт",
      ru: "Китайский Привет",
      de: "Trend-Chinese",
      pl: "Modny Chińczyk"
    },
    name: {
      en: "Chinese Hi",
      uk: "Китайський Привіт",
      ru: "Китайский Привет",
      de: "Chinese Hi",
      pl: "Chinese Hi"
    },
    description: {
      en: "A vibrant and trendy Chinese diner with authentic street food, neon lights, and a cool, modern atmosphere perfect for a fun, casual date.",
      uk: "Яскраве та трендове бістро китайської кухні з автентичною вуличною їжею, неоновим світлом та крутою атмосферою для невимушеного побачення.",
      ru: "Яркое и трендовое бистро китайской кухни с аутентичной уличной едой, неоновым светом и крутой атмосферой для непринужденного свидания.",
      de: "Ein lebhaftes und trendiges chinesisches Restaurant mit authentischem Streetfood, Neonlichtern und einer coolen, modernen Atmosphäre.",
      pl: "Tętniąca życiem i modna chińska restauracja z autentycznym jedzeniem ulicznym, neoniastym klimatem i nowoczesną atmosferą."
    },
    images: [
      "/images/places/kyiv_china_hi_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chinese+Hi+Kyiv",
    likes: 48
  },
  {
    id: "kyiv-landscape-alley",
    city: "kyiv",
    type: "park",
    vibe: {
      en: "Art & Surrealism",
      uk: "Арт-простір",
      ru: "Арт-пространство",
      de: "Kunst & Surrealismus",
      pl: "Sztuka i surrealizm"
    },
    name: {
      en: "Landscape Alley",
      uk: "Пейзажна алея",
      ru: "Пейзажная аллея",
      de: "Landschaftsallee",
      pl: "Aleja Pejzażowa"
    },
    description: {
      en: "A whimsical art space filled with surreal mosaic sculptures, hidden cozy courtyards, and beautiful views of the historic Podil hills.",
      uk: "Концентрований арт і постмодернізм. Мозаїчні сюрреалістичні скульптури, приховані дворики та прекрасний вид на пагорби Подолу.",
      ru: "Концентрированный арт и постмодернизм. Мозаичные сюрреалистичные скульптуры, скрытые дворики и вид на холмы Подола.",
      de: "Ein skurriler Kunstort voller surrealer Mosaikskulpturen, versteckter Innenhöfe und schöner Ausblicke auf die Hügel von Podil.",
      pl: "Niezwykła przestrzeń artystyczna pełna rzeźb mozaikowych, ukrytych podwórek i widoków na wzgórza Podola."
    },
    images: [
      "/images/places/kyiv_landscape_alley_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Landscape+Alley+Kyiv",
    likes: 32
  },
  {
    id: "kyiv-sens",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Bookstore Cafe",
      uk: "Книгарня-кав'ярня",
      ru: "Книжный кофейня",
      de: "Buchladen-Café",
      pl: "Księgarnia-kawiarnia"
    },
    name: {
      en: "Sens",
      uk: "Сенс",
      ru: "Сенс",
      de: "Sens",
      pl: "Sens"
    },
    description: {
      en: "A unique combination of a modern bookstore and a cozy cafe. Great for sharing book recommendations and enjoying quiet conversation.",
      uk: "Унікальне поєднання сучної книгарні та затишної кав'ярні. Чудово підходить для обговорення улюблених книг за чашкою кави.",
      ru: "Уникальное сочетание современного книжного магазина и уютной кофейни. Прекрасно подходит для обсуждения любимых книг за чашкой кофе.",
      de: "Eine einzigartige Kombination aus moderner Buchhandlung und gemütlichem Café. Ideal, um Buchtipps auszutauschen.",
      pl: "Wyjątkowe połączenie nowoczesnej księgarni i przytulnej kawiarni. Świetne miejsce na randkę z książką w tle."
    },
    images: [
      "/images/places/kyiv_sens_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sens+Bookstore+Kyiv",
    likes: 49
  },
  {
    id: "kyiv-coffee-records",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Coffee & Vinyl",
      uk: "Кава та вініл",
      ru: "Кофе и винил",
      de: "Kaffee & Vinyl",
      pl: "Kawa i winyl"
    },
    name: {
      en: "Coffee Records",
      uk: "Coffee Records",
      ru: "Coffee Records",
      de: "Coffee Records",
      pl: "Coffee Records"
    },
    description: {
      en: "A trendy cafe in Podil with specialty coffee, excellent records playing in the background, and a cool, laid-back atmosphere.",
      uk: "Трендова кав'ярня на Подолі зі спешелті кавою, відмінними вініловими платівками та крутою розслабленою атмосферою.",
      ru: "Трендовая кофейня на Подоле со спешелти кофе, отличными виниловыми пластинками и крутой расслабленной атмосферой.",
      de: "Ein trendiges Café in Podil mit Spezialitätenkaffee, großartiger Vinyl-Musik im Hintergrund und einer coolen, entspannten Atmosphäre.",
      pl: "Modna kawiarnia na Podolu z kawą specialty, świetną muzyką z płyt winylowych w tle i luźną, przyjazną atmosferą."
    },
    images: [
      "/images/places/kyiv_coffee_records_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffee+Records+Podil+Kyiv",
    likes: 29
  },
  {
    id: "kyiv-remi",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Cozy Bistro",
      uk: "Затишне бістро",
      ru: "Уютное бистро",
      de: "Gemütliches Bistro",
      pl: "Przytulne bistro"
    },
    name: {
      en: "Remi",
      uk: "Remi",
      ru: "Remi",
      de: "Remi",
      pl: "Remi"
    },
    description: {
      en: "A stylish urban cafe with a warm aesthetic, serving great coffee, delicious pastries, and fresh modern dishes.",
      uk: "Стильне міське кафе з теплою естетикою, чудовою кавою, свіжою випічкою та смачними сучасними стравами.",
      ru: "Стильное городское кафе с теплой эстетикой, отличным кофе, свежей выпечкой и вкусными современными блюдами.",
      de: "Ein stilvolles städtisches Café mit warmer Ästhetik, hervorragendem Kaffee, leckeren Backwaren und frischen modernen Gerichten.",
      pl: "Stylowa kawiarnia miejska o ciepłej estetyce, serwująca doskonałą kawę, pyszne wypieki i świeże nowoczesne dania."
    },
    images: [
      "/images/places/kyiv_remi_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Remi+Cafe+Kyiv",
    likes: 28
  },
  {
    id: "kyiv-hryshko-botanic",
    city: "kyiv",
    type: "park",
    vibe: {
      en: "Botanical Majesty",
      uk: "Масштаб природи",
      ru: "Масштаб природы",
      de: "Botanische Pracht",
      pl: "Majestat botaniczny"
    },
    name: {
      en: "Hryshko Botanical Garden",
      uk: "Ботсад імені Гришка",
      ru: "Ботсад имени Гришко",
      de: "Botanischer Hryshko-Garten",
      pl: "Ogród Botaniczny im. Hryszki"
    },
    description: {
      en: "A vast green oasis in the heart of Kyiv, famous for scenic hills, hidden historic monasteries, and breathtaking panoramic vistas.",
      uk: "Масштаб і дика природа в центрі мегаполісу. Пагорби, приховані монастирі та культові панорами, від яких перехоплює подих.",
      ru: "Масштаб и дикая природа в центре мегаполиса. Холмы, скрытые монастыри и культовые панорамы, от которых захватывает дух.",
      de: "Eine riesige grüne Oase im Herzen von Kiew, bekannt für malerische Hügel, versteckte Klöster und atemberaubende Ausblicke.",
      pl: "Ogromna zielona oaza w sercu Kijowa, znana ze wzgórz, ukrytych klasztorów i panoramicznych widoków."
    },
    images: [
      "/images/places/kyiv_hryshko_botanic_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hryshko+National+Botanical+Garden+Kyiv",
    likes: 26
  },
  {
    id: "kyiv-foodmarket",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Food Hall & Hub",
      uk: "Гастро-маркет",
      ru: "Гастро-маркет",
      de: "Gastronomiemarkt",
      pl: "Hala gastronomiczna"
    },
    name: {
      en: "Kyiv Food Market",
      uk: "Київ Foodmarket",
      ru: "Киев Foodmarket",
      de: "Kyiv Food Market",
      pl: "Kyiv Food Market"
    },
    description: {
      en: "A bustling food hall bringing together Kyiv's best culinary concepts under one roof. Ideal for dates when you want to try a bit of everything.",
      uk: "Жвавий гастрономічний простір, що об'єднує найкращі кулінарні концепти Києва під одним дахом. Ідеально підходить для різноманітних побачень.",
      ru: "Оживленное гастрономическое пространство, объединяющее лучшие кулинарные концепты Киева под одной крышей. Идеально для свиданий.",
      de: "Ein lebhafter Gastronomiemarkt, der die besten Kiewer Restaurantkonzepte unter einem Dach vereint. Ideal für abwechslungsreiche Dates.",
      pl: "Gwarna hala gastronomiczna zrzeszająca najlepsze koncepty kulinarne Kijowa. Idealne miejsce na randkę."
    },
    images: [
      "/images/places/kyiv_foodmarket_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyiv+Food+Market+Kyiv",
    likes: 195
  },
  {
    id: "kyiv-franyk",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Bakehouse & Cafe",
      uk: "Пекарня та кав'ярня",
      ru: "Пекарня и кофейня",
      de: "Bäckerei-Café",
      pl: "Piekarnia i kawiarnia"
    },
    name: {
      en: "Franyk",
      uk: "Франик",
      ru: "Франик",
      de: "Franyk",
      pl: "Franyk"
    },
    description: {
      en: "A beloved local bakery famous for its warm service, fresh pastries, and exceptionally fluffy croissants. Great for a sweet, casual meetup.",
      uk: "Улюблена місцева пекарня, відома своєю теплою атмосферою, свіжою випічкою та повітряними круасанами. Чудове місце для невимушеної зустрічі.",
      ru: "Любимая местная пекарня, известная своей теплой атмосферой, свежей выпечкой и воздушными круассанами. Отличное место для встречи.",
      de: "Eine beliebte Bäckerei, bekannt für freundlichen Service, frisches Gebäck und besonders fluffige Croissants. Ideal für ein süßes Treffen.",
      pl: "Lubiana piekarnia słynąca z przyjaznej obsługi, świeżych wypieków i puszystych rogalików. Świetne miejsce na randkę."
    },
    images: [
      "/images/places/kyiv_franyk_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Franyk+Kyiv",
    likes: 23
  },
  {
    id: "kyiv-loved-uncle",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Middle-Eastern Bistro",
      uk: "Близькосхідна кухня",
      ru: "Ближневосточная кухня",
      de: "Nahost-Bistro",
      pl: "Bistro bliskowschodnie"
    },
    name: {
      en: "Loved Uncle",
      uk: "Любимый дядя",
      ru: "Любимый дядя",
      de: "Loved Uncle",
      pl: "Loved Uncle"
    },
    description: {
      en: "A cozy Middle-Eastern restaurant filled with books, art, and homey vibes. Famous for excellent hummus, shakshuka, and warm hospitality.",
      uk: "Затишний ресторан близькосхідної кухні, наповнений книгами, мистецтвом та домашньою атмосферою. Відомий чудовим хумусом та гостинністю.",
      ru: "Уютный ресторан ближневосточной кухни, наполненный книгами, искусством и домашней атмосферой. Известен отличным хумусом.",
      de: "Ein gemütliches nahöstliches Restaurant voller Bücher, Kunst und familiärer Atmosphäre. Bekannt für hervorragenden Hummus.",
      pl: "Przytulna restauracja bliskowschodnia pełna książek, sztuki i domowej atmosfery. Słynie z doskonałego hummusu."
    },
    images: [
      "/images/places/kyiv_loved_uncle_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lyubimyy+Dyadya+Kyiv",
    likes: 38,
    isPremium: true
  },
  {
    id: "kyiv-shevchenko-park",
    city: "kyiv",
    type: "park",
    vibe: {
      en: "Vibrant City Center",
      uk: "Епіцентр життя",
      ru: "Эпицентр жизни",
      de: "Lebendiges Stadtzentrum",
      pl: "Tętniące życiem centrum"
    },
    name: {
      en: "Shevchenko Park",
      uk: "Парк імені Шевченка",
      ru: "Парк имени Шевченко",
      de: "Schewtschenko-Park",
      pl: "Park Szewczenki"
    },
    description: {
      en: "A lively downtown park where the historic Red University Building meets street chess players and the city's best takeaway coffee.",
      uk: "Епіцентр міської енергії. Контраст історичного Червоного корпусу, ритму центру, вуличних шахістів та найкращої кави із собою.",
      ru: "Эпицентр городской энергии. Контраст исторического Красного корпуса, ритма центра, уличных шахматистов и лучшего кофе на вынос.",
      de: "Ein lebhafter Park im Zentrum, wo das rote Universitätsgebäude auf Straßenschachspieler und erstklassigen Kaffee zum Mitnehmen trifft.",
      pl: "Tętniący życiem park w centrum, łączący zabytkowy Czerwony Uniwersytet z graczami w szachy i najlepszą kawą na wynos."
    },
    images: [
      "/images/places/kyiv_shevchenko_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shevchenko+Park+Kyiv",
    likes: 40
  },
  {
    id: "kyiv-fish-pussycat",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "California Sushi",
      uk: "Каліфорнійські суші",
      ru: "Калифорнийские суши",
      de: "Kalifornisches Sushi",
      pl: "Sushibar kalifornijski"
    },
    name: {
      en: "Fish & Pussycat",
      uk: "Fish & Pussycat",
      ru: "Fish & Pussycat",
      de: "Fish & Pussycat",
      pl: "Fish & Pussycat"
    },
    description: {
      en: "A trendy California-style sushi bar with vibrant, artful interiors, excellent raw bar options, and a chic urban crowd.",
      uk: "Модний суші-бар у каліфорнійському стилі з яскравим артовим інтер'єром, свіжою рибою та стильною міською атмосферою.",
      ru: "Модный суши-бар в калифорнийском стиле с ярким артовым интерьером, свежей рыбой и стильной городской атмосферой.",
      de: "Eine trendige Sushi-Bar im kalifornischen Stil mit lebendigem, kunstvollem Interieur, exzellentem Sushi.",
      pl: "Modny sushibar w stylu kalifornijskim z jasnym, artystycznym wnętrzem, doskonałym sushi."
    },
    images: [
      "/images/places/kyiv_fish_pussycat_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fish+and+Pussycat+Sushi+Kyiv",
    likes: 45,
    isPremium: true
  },
  {
    id: "kyiv-thai-hi",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Atmospheric Thai",
      uk: "Тайський Привіт",
      ru: "Тайский Привет",
      de: "Atmosphärisches Thai",
      pl: "Klimatyczny Taj"
    },
    name: {
      en: "Thai Hi",
      uk: "Тайский привет",
      ru: "Тайский привет",
      de: "Thai Hi",
      pl: "Thai Hi"
    },
    description: {
      en: "A wildly popular Thai restaurant with authentic street diner vibes, a tropical neon interior, and bold, spicy flavors.",
      uk: "Надзвичайно популярний ресторан тайської кухні з атмосферою автентичного вуличного бістро, тропічним неоном та пряними смаками.",
      ru: "Очень популярный ресторан тайской кухни с атмосферой аутентичного уличного бистро, тропическим неоном и пряными вкусами.",
      de: "Ein überaus beliebtes thailändisches Restaurant mit dem Flair einer authentischen Street-Food-Bude, tropischem Neonlicht.",
      pl: "Niezwykle popularna tajska restauracja z klimatem autentycznego ulicznego baru, tropikalnymi neonami."
    },
    images: [
      "/images/places/kyiv_thai_hi_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Thai+Hi+Kyiv",
    likes: 5
  },
  {
    id: "kyiv-japanese-hi",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Retro Japanese",
      uk: "Японський Привіт",
      ru: "Японский Привет",
      de: "Retro-Japaner",
      pl: "Retro Japończyk"
    },
    name: {
      en: "Japanese Hi",
      uk: "Японский привет",
      ru: "Японский привет",
      de: "Japanese Hi",
      pl: "Japanese Hi"
    },
    description: {
      en: "An immersive Japanese restaurant styled like a retro Tokyo diner, serving authentic ramen, katsu, and street snacks in a fun neon environment.",
      uk: "Атмосферний японський ресторан, стилізований під ретро-заклад Токіо, що подає рамен, кацу та вуличні закуски в оточенні яскравого неону.",
      ru: "Атмосферный японский ресторан, стилизованный под ретро-заведение Токио, подающий рамен, кацу и уличные закуски.",
      de: "Ein stimmungsvolles japanisches Restaurant im Stil eines Retro-Tokyo-Lokals, das Ramen, Katsu in neonfarbener Umgebung serviert.",
      pl: "Klimatyczna japońska restauracja stylizowana na retro lokal z Tokio, serwująca ramen."
    },
    images: [
      "/images/places/kyiv_japanese_hi_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Japanese+Hi+Kyiv",
    likes: 25
  },
  {
    id: "kyiv-suit-13",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Stylish Lounge",
      uk: "Стильний лаунж",
      ru: "Стильный лаунж",
      de: "Stilvolle Lounge",
      pl: "Stylowy lounge"
    },
    name: {
      en: "Suit 13",
      uk: "Suit 13",
      ru: "Suit 13",
      de: "Suit 13",
      pl: "Suit 13"
    },
    description: {
      en: "A highly aesthetic and intimate space that transitions from a cozy daytime cafe to a sophisticated evening cocktail lounge.",
      uk: "Дуже естетичний та затишний простір, що вдень працює як кав'ярня, а ввечері перетворюється на вишуканий коктейльний лаунж.",
      ru: "Очень эстетичное и уютное пространство, которое днем работает как кофейня, а вечером превращается в изысканный коктейльный лаунж.",
      de: "Ein sehr ästhetischer und intimer Ort, der sich tagsüber als Café und abends als anspruchsvolle Cocktail-Lounge präsentiert.",
      pl: "Niezwykle estetyczna i kameralna przestrzeń, która w ciągu dnia działa jako kawiarnia, a wieczorem zmienia się w lounge."
    },
    images: [
      "/images/places/kyiv_suit_13_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Suit+13+Kyiv",
    likes: 41
  },
  {
    id: "kyiv-vero-vero",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Piazza",
      uk: "Італійська тераса",
      ru: "Итальянская терраса",
      de: "Italienische Terrasse",
      pl: "Włoski taras"
    },
    name: {
      en: "Vero Vero",
      uk: "Vero Vero",
      ru: "Vero Vero",
      de: "Vero Vero",
      pl: "Vero Vero"
    },
    description: {
      en: "A picturesque Italian restaurant in Podil, centered around a cooling fountain on a spacious summer terrace. Perfect for romantic dinners.",
      uk: "Мальовничий італійський ресторан на Подолі з просторою літньою терасою навколо фонтану. Ідеальне місце для романтичної вечері.",
      ru: "Живописный итальянский ресторан на Подоле с просторной летней террасой вокруг фонтана. Идеальное место для романтического ужина.",
      de: "Ein malerisches italienisches Restaurant in Podil mit einer großen Sommerterrasse rund um einen Brunnen. Perfekt für ein romantisches Abendessen.",
      pl: "Malownicza włoska restauracja na Podolu z przestronnym letnim tarasem wokół fontanny. Idealne miejsce na romantyczną kolację."
    },
    images: [
      "/images/places/kyiv_vero_vero_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vero+Vero+Kyiv",
    likes: 44,
    isPremium: true
  },
  {
    id: "kyiv-foodspot",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Street Food Diner",
      uk: "Вулична їжа",
      ru: "Уличная еда",
      de: "Street-Food-Diner",
      pl: "Street food"
    },
    name: {
      en: "Foodspot",
      uk: "foodspot",
      ru: "foodspot",
      de: "Foodspot",
      pl: "Foodspot"
    },
    description: {
      en: "A modern street food concept serving high-quality burgers, wraps, and snacks in a lively, casual atmosphere.",
      uk: "Сучасний концепт вуличної їжі, що пропонує якісні бургери, роли та закуски в жвавій невимушеній атмосфері.",
      ru: "Современный концепт уличной еды, предлагающий качественные бургеры, роллы и закуски в оживленной непринужденной атмосфере.",
      de: "Ein modernes Street-Food-Konzept, das hochwertige Burger, Wraps und Snacks in einer lebhaften, ungezwungenen Atmosphäre serviert.",
      pl: "Nowoczesny koncept street food serwujący wysokiej jakości burgery, wrapy i przekąski w gwarnej, swobodnej atmosferze."
    },
    images: [
      "/images/places/kyiv_foodspot_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Foodspot+Kyiv",
    likes: 55
  },
  {
    id: "kyiv-spelta",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Artisanal Bakery",
      uk: "Крафтова пекарня",
      ru: "Крафтовая пекарня",
      de: "Handwerkliche Bäckerei",
      pl: "Rzemieślnicza piekarnia"
    },
    name: {
      en: "Spelta",
      uk: "Спельта",
      ru: "Спельта",
      de: "Spelta",
      pl: "Spelta"
    },
    description: {
      en: "A cult Podil bakery and cafe famous for its outstanding sourdough bread, modern pastries, and chic minimalist atmosphere.",
      uk: "Культова пекарня та кафе на Подолі, відома своїм видатним хлібом на заквасці, сучасною випічкою та стильною мінімалістичною атмосферою.",
      ru: "Культовая пекарня и кафе на Подоле, известная своим выдающимся хлебом на закваске, современной выпечкой и стильной минималистичной атмосферой.",
      de: "Eine Kult-Bäckerei und ein Café in Podil, berühmt für ihr hervorragendes Sauerteigbrot, moderne Backwaren und eine schicke, minimalistische Atmosphäre.",
      pl: "Kultowa piekarnia i kawiarnia na Podolu, słynąca z wyjątkowego chleba na zakwasie, nowoczesnych wypieków i stylowej, minimalistycznej atmosfery."
    },
    images: [
      "/images/places/kyiv_spelta_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Spelta+Kyiv+Yaroslavska",
    likes: 33
  },
  {
    id: "kyiv-italianska-redaktsiia",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Modern Italian",
      uk: "Італійська Редакція",
      ru: "Итальянская Редакция",
      de: "Modernes Italienisch",
      pl: "Nowoczesna włoska"
    },
    name: {
      en: "Italianska Redaktsiia",
      uk: "Італійська Редакція",
      ru: "Итальянская Редакция",
      de: "Italianska Redaktsiia",
      pl: "Italianska Redaktsiia"
    },
    description: {
      en: "A highly popular and stylish restaurant offering a creative edit on traditional Italian cuisine. Known for sourdough pizzas, craft cocktails, and stunning eclectic interiors.",
      uk: "Надзвичайно популярний і стильний ресторан сучасної італійської кухні. Відомий піцою на заквасці, крафтовими коктейлями та яскравим еклектичним інтер'єром.",
      ru: "Очень популярный и стильный ресторан современной итальянской кухни. Известен пиццей на закваске, крафтовыми коктейлями и ярким эклектичным интерьером.",
      de: "Ein äußerst beliebtes und stilvolles Restaurant mit einer kreativen Interpretation traditioneller italienischer Gerichte. Bekannt für Sauerteigpizza.",
      pl: "Bardzo popularna i stylowa restauracja oferująca autorskie interpretacje dań kuchni włoskiej. Słynie z pizzy na zakwasie i eklektycznego wnętrza."
    },
    images: [
      "/images/places/kyiv_italianska_redaktsiia_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Italianska+Redaktsiia+Kyiv",
    likes: 51,
    isPremium: true
  },
  {
    id: "kyiv-catch",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Premium Seafood",
      uk: "Преміальні морепродукти",
      ru: "Премиальные морепродукты",
      de: "Premium-Meeresfrüchte",
      pl: "Ekskluzywne owoce morza"
    },
    name: {
      en: "Catch Seafood Restaurant",
      uk: "Catch Seafood Restaurant",
      ru: "Catch Seafood Restaurant",
      de: "Catch Seafood Restaurant",
      pl: "Catch Seafood Restaurant"
    },
    description: {
      en: "One of the best seafood restaurants in Kyiv, boasting an impressive raw bar, a wide selection of champagne, and a sophisticated, romantic interior.",
      uk: "Один із найкращих рибних ресторанів столиці з вражаючим Raw-баром, величезним вибором шампанського та вишуканим романтичним інтер'єром.",
      ru: "Один из лучших рыбных ресторанов столицы с впечатляющим Raw-баром, огромным выбором шампанского и изысканным романтическим интерьером.",
      de: "Eines der besten Fischrestaurants in Kiew mit einer beeindruckenden Raw Bar, einer großen Auswahl an Champagner und einem anspruchsvollen, romantischen Interieur.",
      pl: "Jedna z najlepszych restauracji z owocami morza w Kijowie, oferująca imponujący bar raw, szeroki wybór szampanów oraz wyrafinowane, romantyczne wnętrze."
    },
    images: [
      "/images/places/kyiv_catch_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Catch+Seafood+Restaurant+Kyiv+Volodymyrska+12",
    likes: 39,
    isPremium: true
  },
  {
    id: "kyiv-citronelle",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "French Fine Dining",
      uk: "Французька вишукана кухня",
      ru: "Французская изысканная кухня",
      de: "Französische Haute Cuisine",
      pl: "Francuska wykwintna kuchnia"
    },
    name: {
      en: "Citronelle",
      uk: "Citronelle",
      ru: "Citronelle",
      de: "Citronelle",
      pl: "Citronelle"
    },
    description: {
      en: "An elegant French restaurant opposite the Opera House. Famous for its classic and modern French cuisine, exquisite wine list, and refined European charm.",
      uk: "Елегантний ресторан французької кухні навпроти Оперного театру. Відомий вишуканими стравами, чудовою винною картою та особливим європейським шармом.",
      ru: "Элегантный ресторан французской кухни напротив Оперного театра. Известен изысканными блюдами, отличной винной картой и особым европейским шармом.",
      de: "Ein elegantes französisches Restaurant gegenüber dem Opernhaus. Bekannt für seine klassische und moderne französische Küche und exquisiten Charme.",
      pl: "Elegancka francuska restauracja naprzeciwko Opery. Słynie z klasycznej i nowoczesnej kuchni francuskiej, wykwintnej karty win i europejskiego uroku."
    },
    images: [
      "/images/places/kyiv_citronelle_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Citronelle+Kyiv+Bohdana+Khmelnytskoho+23",
    likes: 6,
    isPremium: true
  },
  {
    id: "kyiv-nam",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Modern Vietnamese",
      uk: "Сучасна в'єтнамська кухня",
      ru: "Современная вьетнамская кухня",
      de: "Modernes Vietnamesisch",
      pl: "Nowoczesna wietnamska"
    },
    name: {
      en: "NAM",
      uk: "NAM",
      ru: "NAM",
      de: "NAM",
      pl: "NAM"
    },
    description: {
      en: "A stylish, upscale restaurant serving creative interpretations of Vietnamese dishes in a visually stunning dark-toned interior with ambient lighting.",
      uk: "Стильний преміум-ресторан, який пропонує креативні інтерпретації в'єтнамських страв у розкішному темному інтер'єрі з приглушеним світлом.",
      ru: "Стильный премиум-ресторан, предлагающий креативные интерпретации вьетнамских блюд в роскошном темном интерьере с приглушенным светом.",
      de: "Ein stilvolles, gehobenes Restaurant, das kreative Interpretationen vietnamesischer Gerichte in einem atemberaubenden, dunklen Interieur serviert.",
      pl: "Stylowa, ekskluzywna restauracja serwująca kreatywne interpretacje dań wietnamskich w spektakularnym, ciemnym wnętrzu z klimatycznym oświetleniem."
    },
    images: [
      "/images/places/kyiv_nam_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=N%C4%82M+Modern+Vietnamese+Cuisine+Kyiv",
    likes: 54,
    isPremium: true
  },
  {
    id: "kyiv-bao",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Modern Chinese",
      uk: "Сучасна китайська кухня",
      ru: "Современная китайская кухня",
      de: "Modernes Chinesisch",
      pl: "Nowoczesna chińska"
    },
    name: {
      en: "BAO • Modern Chinese Cuisine",
      uk: "BAO • Modern Chinese Cuisine",
      ru: "BAO • Modern Chinese Cuisine",
      de: "BAO • Modern Chinese Cuisine",
      pl: "BAO • Modern Chinese Cuisine"
    },
    description: {
      en: "A high-end Chinese restaurant with an open kitchen, a legendary long table, and an energetic atmosphere. Perfect for a memorable dinner date.",
      uk: "Вишуканий ресторан китайської кухні з відкритою кухнею, легендарним довгим столом та динамічною атмосферою. Ідеально для незабутнього вечірнього побачення.",
      ru: "Изысканный ресторан китайской кухни с открытой кухней, легендарным длинным столом и динамичной атмосферой. Идеально для незабываемого свидания.",
      de: "Ein erstklassiges chinesisches Restaurant mit offener Küche, einem legendären langen Tisch und einer energiegeladenen Atmosphäre.",
      pl: "Ekskluzywna chińska restauracja z otwartą kuchnią, kultowym długim stołem i tętniącą życiem atmosferą. Idealna na wyjątkową randkę."
    },
    images: [
      "/images/places/kyiv_bao_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=BAO+Modern+Chinese+Cuisine+Kyiv+Mechnykova+14/1",
    likes: 58,
    isPremium: true
  },
  {
    id: "kyiv-lucky",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Wine & Fine Dining",
      uk: "Вино та гастрономія",
      ru: "Вино и гастрономия",
      de: "Wein & Gastronomie",
      pl: "Wino i wykwintne jedzenie"
    },
    name: {
      en: "Lucky Restaurant Vinoteque",
      uk: "Lucky Restaurant Vinoteque",
      ru: "Lucky Restaurant Vinoteque",
      de: "Lucky Restaurant Vinoteque",
      pl: "Lucky Restaurant Vinoteque"
    },
    description: {
      en: "An exceptional culinary space inside Good Wine, blending a state-of-the-art kitchen with a massive selection of premium wines. Perfect for wine lovers.",
      uk: "Унікальний гастрономічний простір всередині Good Wine, що поєднує сучасну авторську кухню та величезну колекцію найкращих вин світу.",
      ru: "Уникальное гастрономическое пространство внутри Good Wine, сочетающее современную авторскую кухню и огромную коллекцию лучших вин мира.",
      de: "Ein außergewöhnlicher kulinarischer Raum im Good Wine, der eine hochmoderne Küche mit einer riesigen Auswahl an Premium-Weinen verbindet.",
      pl: "Wyjątkowa przestrzeń kulinarna w Good Wine, łącząca nowoczesną kuchnię autorską z ogromnym wyborem win z całego świata."
    },
    images: [
      "/images/places/kyiv_lucky_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lucky+Restaurant+Vinoteque+Mechnykova+9+Kyiv",
    likes: 56,
    isPremium: true
  },
  {
    id: "kyiv-11mirrors",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Rooftop Restaurant & Bar",
      uk: "Панорамний ресторан і бар",
      ru: "Панорамный ресторан и бар",
      de: "Rooftop Restaurant & Bar",
      pl: "Restauracja i bar na dachu"
    },
    name: {
      en: "11 Mirrors Rooftop",
      uk: "11 Mirrors Rooftop",
      ru: "11 Mirrors Rooftop",
      de: "11 Mirrors Rooftop",
      pl: "11 Mirrors Rooftop"
    },
    description: {
      en: "A sophisticated rooftop restaurant and bar offering a stunning panoramic view of old Kyiv, signature cocktails, and premium fusion cuisine.",
      uk: "Вишуканий панорамний ресторан і бар на даху з неймовірним краєвидом на старий Київ, авторськими коктейлями та преміальною кухнею ф'южн.",
      ru: "Изысканный панорамный ресторан и бар на крыше с невероятным видом на старый Киев, авторскими коктейлями и премиальной кухней фьюжн.",
      de: "Ein anspruchsvolles Rooftop-Restaurant und eine Bar mit einem atemberaubenden Panoramablick auf das alte Kiew, Signature-Cocktails und erstklassiger Fusionsküche.",
      pl: "Wyrafinowana restauracja i bar na dachu, oferująca oszałamiający panoramiczny widok na stary Kijów, autorskie koktajle oraz wykwintną kuchnię fusion."
    },
    images: [
      "/images/places/kyiv_11mirrors_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=11+Mirrors+Rooftop+Restaurant+%26+Bar+Kyiv",
    likes: 59,
    isPremium: true
  },
  {
    id: "kyiv-bassano",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Cuisine & Pastries",
      uk: "Італійська кухня та кондитерська",
      ru: "Итальянская кухня и кондитерская",
      de: "Italienische Küche & Konditorei",
      pl: "Włoska kuchnia i cukiernia"
    },
    name: {
      en: "Bassano",
      uk: "Bassano",
      ru: "Bassano",
      de: "Bassano",
      pl: "Bassano"
    },
    description: {
      en: "An elegant Italian restaurant next to St. Nicholas Cathedral, known for its authentic Mediterranean dishes, fine wines, and artisanal pastries.",
      uk: "Елегантний ресторан італійської та середземноморської кухні біля Костелу святого Миколая, відомий вишуканими стравами, вином та власною кондитерською.",
      ru: "Элегантный ресторан итальянской и средиземноморской кухни возле Костела святого Николая, известный изысканными блюдами, вином и собственной кондитерской.",
      de: "Ein elegantes italienisches Restaurant in der Nähe der St.-Nikolaus-Kathedrale, bekannt für seine authentischen mediterranen Gerichte, erlesenen Weine und handwerkliche Konditorei.",
      pl: "Elegancka włoska restauracja obok kościoła św. Mikołaja, znana z autentycznych dań śródziemnomorskich, wyśmienitych win i rzemieślniczych wypieków."
    },
    images: [
      "/images/places/kyiv_bassano_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bassano+Ristorante+Velyka+Vasylkivska+100+Kyiv",
    likes: 10,
    isPremium: true
  },
  {
    id: "kyiv-biggoli",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Dining & Fresh Pasta",
      uk: "Італійська класика та свіжа паста",
      ru: "Итальянская классика и свежая паста",
      de: "Italienische Küche & frische Pasta",
      pl: "Klasyczna włoska kuchnia i świeży makaron"
    },
    name: {
      en: "Biggoli",
      uk: "Biggoli",
      ru: "Biggoli",
      de: "Biggoli",
      pl: "Biggoli"
    },
    description: {
      en: "A charming Italian restaurant famous for its handmade bigoli pasta, mozzarella bar, and warm, traditional Mediterranean atmosphere.",
      uk: "Затишний ресторан італійської кухні, відомий своєю домашньою пастою біголі, моцарела-баром та традиційною гостинною атмосферою.",
      ru: "Уютный ресторан итальянской кухни, известный своей домашней пастой биголи, моцарелла-баром и традиционной гостеприимной атмосферой.",
      de: "Ein charmantes italienisches Restaurant, das für seine handgemachte Bigoli-Pasta, die Mozzarella-Bar und die warme, traditionelle mediterrane Atmosphäre bekannt ist.",
      pl: "Urocza włoska restauracja słynąca z ręcznie robionego makaronu bigoli, baru mozzarella oraz ciepłej, tradycyjnej śródziemnomorskiej atmosfery."
    },
    images: [
      "/images/places/kyiv_biggoli_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Biggoli+Restaurant+Climb+Klovsky+Descent+7A+Kyiv",
    likes: 4,
    isPremium: true
  },
  {
    id: "kyiv-la-veranda",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Romantic & Cozy Restaurant",
      uk: "Романтичний та затишний ресторан",
      ru: "Романтичный и уютный ресторан",
      de: "Romantisches & gemütliches Restaurant",
      pl: "Romantyczna i przytulna restauracja",
      fr: "Restaurant romantique & chaleureux",
      it: "Ristorante romantico e accogliente",
      es: "Restaurante romántico y acogedor"
    },
    name: {
      en: "La Veranda",
      uk: "La Veranda",
      ru: "La Veranda",
      de: "La Veranda",
      pl: "La Veranda",
      fr: "La Veranda",
      it: "La Veranda",
      es: "La Veranda"
    },
    description: {
      en: "A hidden gem in Lypky district with a gorgeous green terrace and quiet courtyard. Perfect for a quiet, romantic dinner with fine wine and Italian-French cuisine.",
      uk: "Затишний ресторан на Липках із мальовничою зеленою терасою та тихим внутрішнім двориком. Ідеальне місце для романтичної вечері з вишуканим вином та італійсько-французькою кухнею.",
      ru: "Уютный ресторан на Липках с живописной зеленой террасой и тихим внутренним двориком. Идеальное место для романтического ужина с изысканным вином и итальянско-французской кухней.",
      de: "Ein verstecktes Juwel im Lypky-Viertel mit einer wunderschönen grünen Terrasse und einem ruhigen Innenhof. Perfekt für ein romantisches Abendessen mit erlesenem Wein.",
      pl: "Ukryty klejnot w dzielnicy Łypki z pięknym zielonym tarasem i cichym dziedzińcem. Idealny na romantyczną kolację przy wybornym winie i kuchni włosko-francuskiej.",
      fr: "Un joyau caché dans le quartier de Lypky avec une magnifique terrasse verdoyante et une cour calme. Parfait pour un dîner romantique avec du bon vin et une cuisine italo-française.",
      it: "Una gemma nascosta nel quartiere Lypky con una splendida terrazza verde e un cortile tranquillo. Perfetto per una cena romantica con dell'ottimo vino e cucina italo-francese.",
      es: "Una joya escondida en el barrio de Lypky con una hermosa terraza verde y un patio tranquilo. Perfecto para una cena romántica con buen vino y cocina italiano-francesa."
    },
    images: [
      "/images/places/kyiv_la_veranda_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=La+Veranda+Bogomoltsa+Kyiv",
    likes: 2,
    isPremium: true
  },
  {
    id: "kyiv-simona",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Bakery & Pizza",
      uk: "Італійська пекарня та піца",
      ru: "Итальянская пекарня и пицца",
      de: "Italienische Bäckerei & Pizza",
      pl: "Włoska piekarnia i pizza",
      fr: "Boulangerie italienne & pizza",
      it: "Panificio italiano e pizza",
      es: "Panadería italiana y pizza"
    },
    name: {
      en: "Simona",
      uk: "Simona",
      ru: "Simona",
      de: "Simona",
      pl: "Simona",
      fr: "Simona",
      it: "Simona",
      es: "Simona"
    },
    description: {
      en: "A charming, cozy Italian spot in Kyiv known for its wood-fired pizzas, artisanal baked goods, and warm, intimate atmosphere perfect for a relaxed date.",
      uk: "Затишний італійський заклад у Києві з атмосферним інтер'єром, піцою з дров'яної печі, свіжою випічкою та чудовим вином для теплих побачень.",
      ru: "Уютное итальянское заведение в Киеве с атмосферным интерьером, пиццей из дровяной печи, свежей выпечкой и отличным вином для теплых свиданий.",
      de: "Ein charmantes, gemütliches italienisches Lokal in Kiew, bekannt für seine Holzofenpizzas, handwerklichen Backwaren und die warme Atmosphäre.",
      pl: "Urocze, przytulne włoskie miejsce w Kijowie znane z pizzy z pieca opalanego drewnem, rzemieślniczych wypieków i ciepłej atmosfery.",
      fr: "Un charmant endroit italien chaleureux à Kyiv, connu pour ses pizzas au feu de bois, ses viennoiseries et son atmosphère intime.",
      it: "Un delizioso e accogliente locale italiano a Kyiv, noto per le sue pizze cotte nel forno a legna e un'atmosfera calda e intima.",
      es: "Un encantador y acogedor lugar italiano en Kyiv, conocido por sus pizzas a la leña, repostería artesanal y ambiente cálido."
    },
    images: [
      "/images/places/kyiv_simona_main.jpg",
      "/images/places/kyiv_simona_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Simona+Kyiv",
    likes: 30,
    isPremium: true
  },
  {
    id: "kyiv-elevato",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Fine Dining & Vibe",
      uk: "Вишукана кухня та атмосфера",
      ru: "Изысканная кухня и атмосфера",
      de: "Gehobene Küche & Flair",
      pl: "Wykwintna kuchnia i klimat",
      fr: "Haute gastronomie & ambiance",
      it: "Alta cucina e atmosfera",
      es: "Alta cocina y ambiente"
    },
    name: {
      en: "Elevato",
      uk: "Elevato",
      ru: "Elevato",
      de: "Elevato",
      pl: "Elevato",
      fr: "Elevato",
      it: "Elevato",
      es: "Elevato"
    },
    description: {
      en: "A modern, high-end restaurant in Kyiv offering refined signature cuisine, panoramic views, exceptional wine pairings, and a sophisticated atmosphere for a special date.",
      uk: "Сучасний преміальний ресторан у Києві з авторською кухнею, вишуканою винною картою, вражаючим інтер'єром та особливою атмосферою для незабутніх побачень.",
      ru: "Современный премиальный ресторан в Киеве с авторской кухней, изысканной винной картой, впечатляющим интерьером и особой атмосферой для незабываемых свиданий.",
      de: "Ein modernes, erstklassiges Restaurant in Kiew mit raffinierter Signature-Küche, fantastischer Weinauswahl und anspruchsvoller Atmosphäre.",
      pl: "Nowoczesna, ekskluzywna restauracja w Kijowie oferująca wyrafinowaną autorską kuchnię, wyjątkowe wina i elegancką atmosferę.",
      fr: "Un restaurant haut de gamme moderne à Kyiv proposant une cuisine signature raffinée, des accords mets-vins exceptionnels et un cadre sophistiqué.",
      it: "Un ristorante moderno e raffinato a Kyiv che offre una cucina d'autore ricercata, un'eccezionale carta dei vini e un'atmosfera sofisticata.",
      es: "Un restaurante moderno de alta cocina en Kyiv que ofrece refinada cocina de autor, una excepcional carta de vinos y un ambiente sofisticado."
    },
    images: [
      "/images/places/kyiv_elevato_main.jpg",
      "/images/places/kyiv_elevato_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Elevato+Restaurant+Kyiv",
    likes: 57,
    isPremium: true
  },
  {
    id: "kyiv-fandom",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Chic Coffee Bar & Dining",
      uk: "Вишуканий кава-бар та ресторан",
      ru: "Изысканный кофе-бар и ресторан",
      de: "Schickes Kaffeehaus & Restaurant",
      pl: "Stylowy bar kawowy i restauracja",
      fr: "Bar à café chic & Restaurant",
      it: "Chic Coffee Bar & Ristorante",
      es: "Bar de café elegante y restaurante"
    },
    name: {
      en: "Fandom",
      uk: "Fandom",
      ru: "Fandom",
      de: "Fandom",
      pl: "Fandom",
      fr: "Fandom",
      it: "Fandom",
      es: "Fandom"
    },
    description: {
      en: "A stylish, high-ceilinged venue next to the National Opera House, renowned for its iconic golden wings artwork, specialty coffee, gourmet breakfasts, and exquisite dinners.",
      uk: "Стильний ресторан та кава-бар біля Національної опери, відомий високою стелею, золотими крилами в інтер'єрі, авторською кавою, вишуканими сніданками та вечерями.",
      ru: "Стильный ресторан и кофе-бар возле Национальной оперы, известный высокими потолками, золотыми крыльями в интерьере, авторским кофе, изысканными завтраками и ужинами.",
      de: "Ein stilvolles Lokal neben der Nationaloper, berühmt für sein goldenes Flügel-Kunstwerk, Spezialitätenkaffee, Gourmet-Frühstück und feine Abendessen.",
      pl: "Stylowy lokal obok Opery Narodowej, słynący z kultowej rzeźby złotych skrzydeł, kawy specialty, wykwintnych śniadań i obiadów.",
      fr: "Un lieu élégant près de l'Opéra National, réputé pour sa sculpture d'ailes dorées, son café spécialisé, ses petits-déjeuners gourmands et ses dîners raffinés.",
      it: "Un locale elegante e scenografico vicino all'Opera Nazionale, rinomato per le sculture di ali dorate, caffè specialty, colazioni gourmet e cene raffinate.",
      es: "Un elegante local con techos altos cerca de la Ópera Nacional, famoso por sus icónicas alas doradas, café de especialidad, desayunos gourmet y cenas exquisitas."
    },
    images: [
      "/images/places/kyiv_fandom_main.jpg",
      "/images/places/kyiv_fandom_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fandom+Coffee+Bar+Volodymyrska+Kyiv",
    likes: 11,
    isPremium: true
  },

  // Warsaw Places
  {
    id: "warsaw-charlotte",
    city: "warsaw",
    type: "cafe",
    vibe: {
      en: "Parisian Bakery",
      uk: "Паризька пекарня",
      ru: "Парижская пекарня",
      de: "Pariser Bäckerei",
      pl: "Paryska piekarnia"
    },
    name: {
      en: "Charlotte",
      uk: "Charlotte",
      ru: "Charlotte",
      de: "Charlotte",
      pl: "Charlotte"
    },
    description: {
      en: "A popular French cafe on Plac Zbawiciela, famous for freshly baked bread, delicious pastries, and a bustling social scene.",
      uk: "Популярне французьке кафе на Plac Zbawiciela, відоме свіжим хлібом, смачною випічкою та жвавою атмосферою.",
      ru: "Популярное французское кафе на Plac Zbawiciela, известно свежим хлебом, вкусной выпечкой и оживленной атмосферой.",
      de: "Ein beliebtes französisches Café am Plac Zbawiciela, bekannt für frisch gebackenes Brot, leckeres Gebäck und eine lebhafte soziale Szene.",
      pl: "Popularna francuska kawiarnia na Placu Zbawiciela, słynąca ze świeżo pieczonego chleba, pysznych wypieków i tętniącego życiem klimatu."
    },
    images: [
      "/images/places/warsaw_charlotte_1.png",
      "/images/places/warsaw_charlotte_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Charlotte+Plac+Zbawiciela+Warsaw",
    likes: 0
  },
  {
    id: "warsaw-koszyki",
    city: "warsaw",
    type: "restaurant",
    vibe: {
      en: "Culinary & Social Hall",
      uk: "Гастро-простір",
      ru: "Гастро-пространство",
      de: "Kulinarische Markthalle",
      pl: "Hala gastronomiczna"
    },
    name: {
      en: "Hala Koszyki",
      uk: "Hala Koszyki",
      ru: "Hala Koszyki",
      de: "Hala Koszyki",
      pl: "Hala Koszyki"
    },
    description: {
      en: "A beautifully restored historical industrial hall with numerous restaurants, bars, and a lively atmosphere for a casual evening.",
      uk: "Красиво відреставрований історичний промисловий павільйон із безліччю ресторанів, барів та жвавою вечірньою атмосферою.",
      ru: "Красиво отреставрированный исторический промышленный павильон со множеством ресторанов, баров и оживленной вечерней атмосферой.",
      de: "Eine wunderschön restaurierte historische Industriehalle mit zahlreichen Restaurants, Bars und einer lebhaften Atmosphäre für einen lockeren Abend.",
      pl: "Pięknie odrestaurowana zabytkowa hala przemysłowa z licznymi restauracjami, barami i żywiołową atmosferą na luźny wieczór."
    },
    images: [
      "/images/places/warsaw_koszyki_1.jpg",
      "/images/places/warsaw_koszyki_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hala+Koszyki+Warsaw",
    likes: 0
  },
  {
    id: "warsaw-lazienki",
    city: "warsaw",
    type: "park",
    vibe: {
      en: "Royal Palace Park",
      uk: "Королівський парк",
      ru: "Королевский парк",
      de: "Königlicher Palastpark",
      pl: "Park Łazienki Królewskie"
    },
    name: {
      en: "Łazienki Królewskie",
      uk: "Łazienki Królewskie",
      ru: "Лазенки Королевские",
      de: "Łazienki-Park",
      pl: "Łazienki Królewskie"
    },
    description: {
      en: "A vast, historic park featuring a palace on the isle, wandering peacocks, and peaceful pathways that are ideal for romantic strolls.",
      uk: "Величезний історичний парк із палацом на воді, павичами та мальовничими стежками, ідеальними для романтичних прогулянок.",
      ru: "Огромный исторический парк с дворцом на воде, павлинами и живописными тропинками, идеальными для романтических прогулок.",
      de: "Ein riesiger, historischer Park mit einem Inselpalast, frei laufenden Pfauen und friedlichen Wegen, ideal für romantische Spaziergänge.",
      pl: "Rozległy, zabytkowy park z pałacem na wyspie, spacerującymi pawiami i zacisznymi alejkami, idealnymi na romantyczny spacer."
    },
    images: [
      "/images/places/warsaw_lazienki_1.jpg",
      "/images/places/warsaw_lazienki_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lazienki+Krolewskie+Warsaw",
    likes: 0
  },
  {
    id: "warsaw-bibenda",
    city: "warsaw",
    type: "restaurant",
    vibe: {
      en: "Cozy Hipster Bistro",
      uk: "Затишне хіпстерське бістро",
      ru: "Уютное хипстерское бистро",
      de: "Gemütliches Hipster-Bistro",
      pl: "Przytulne hipsterskie bistro"
    },
    name: {
      en: "Bibenda",
      uk: "Bibenda",
      ru: "Bibenda",
      de: "Bibenda",
      pl: "Bibenda"
    },
    description: {
      en: "A beloved local spot featuring seasonal, ingredient-driven shared plates, natural wines, and a buzzing, warm industrial atmosphere on Nowogrodzka.",
      uk: "Улюблене місце місцевих із сезонними тарілками «на шеринг», натуральними винами та жвавою, теплою індустріальною атмосферою на Nowogrodzka.",
      ru: "Любимое место местных с сезонными тарелками «на шеринг», натуральными винами и оживленной, теплой индустриальной атмосферой на Nowogrodzka.",
      de: "Ein beliebter Ort mit saisonalen Platten zum Teilen, Naturweinen und einer lebhaften, warmen Industrie-Atmosphäre auf der Nowogrodzka.",
      pl: "Uwielbiane przez lokalnych mieszkańców miejsce serwujące sezonowe talerzyki do dzielenia się, wina naturalne i tętniące życiem, ciepłe, industrialne wnętrze na Nowogrodzkiej."
    },
    images: [
      "/images/places/warsaw_bibenda_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bibenda+Nowogrodzka+Warsaw",
    likes: 0
  },
  {
    id: "warsaw-bulke-przez-bibulke",
    city: "warsaw",
    type: "cafe",
    vibe: {
      en: "All-Day Breakfast Cafe",
      uk: "Завтраки весь день",
      ru: "Завтраки весь день",
      de: "Frühstück den ganzen Tag",
      pl: "Śniadania przez cały день"
    },
    name: {
      en: "Bułkę przez Bibułkę",
      uk: "Bułkę przez Bibułkę",
      ru: "Bułkę przez Bibułkę",
      de: "Bułkę przez Bibułkę",
      pl: "Bułkę przez Bibułkę"
    },
    description: {
      en: "A bright and friendly cafe famous for all-day breakfasts, delicious bagels, pancakes, and highly affordable prosecco in a lively setting.",
      uk: "Світле та дружнє кафе, відоме сніданками цілий день, смачними бейглами, панкейками та недорогим просекко в жвавій атмосфері.",
      ru: "Светлое и дружелюбное кафе, известное завтраками весь день, вкусными бейглами, панкейками и недорогим просекко в оживленной атмосфере.",
      de: "Ein helles und freundliches Café, bekannt für Frühstück den ganzen Tag, leckere Bagels, Pfannkuchen und erschwinglichen Prosecco.",
      pl: "Jasna i przyjazna kawiarnia słynąca ze śniadań serwowanych przez cały день, pysznych bajgli, naleśników i niedrogiego prosecco."
    },
    images: [
      "/images/places/warsaw_bulke_przez_bibulke_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bulke+przez+Bibulke+Zurawia+Warsaw",
    likes: 0
  },
  {
    id: "warsaw-coffeedesk",
    city: "warsaw",
    type: "cafe",
    vibe: {
      en: "Specialty Coffee Hub",
      uk: "Хаб спешелті кави",
      ru: "Хаб спешелти кофе",
      de: "Spezialitätenkaffee-Hub",
      pl: "Kawiarnia specialty"
    },
    name: {
      en: "Coffeedesk",
      uk: "Coffeedesk",
      ru: "Coffeedesk",
      de: "Coffeedesk",
      pl: "Coffeedesk"
    },
    description: {
      en: "A modern, work-friendly and date-friendly specialty coffee shop with a clean minimalist design, premium beans, and friendly baristas.",
      uk: "Сучасна кав'ярня третьої хвилі з мінімалістичним дизайном, великим вибором зерна та затишною атмосферою для теплих розмов.",
      ru: "Современная кофейня третьей волны с минималистичным дизайном, огромным выбором зерна и уютной атмосферой для теплых разговоров.",
      de: "Ein modernes, arbeits- und datefreundliches Spezialitäten-Café mit minimalistischem Design, Premium-Bohnen und friendly Atmosphäre.",
      pl: "Nowoczesna kawiarnia specialty o minimalistycznym designie, ogromnym wyborze kaw oraz bardzo przyjaznej i swobodnej atmosferze."
    },
    images: [
      "/images/places/warsaw_coffeedesk_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffeedesk+Wilcza+Warsaw",
    likes: 0
  }
];
