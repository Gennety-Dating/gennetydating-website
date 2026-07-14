/* ========================================
   GENNETY — Static Content / Mock Data
   ======================================== */

import { type Locale } from "./i18n";

export const TELEGRAM_BOT_URL = "https://telegram.me/GennetyBot";
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
    description: "Submit your preferences by Tuesday 11:59 PM.",
  },
  {
    number: 2,
    title: "The Thursday Drop",
    description:
      "Check your Telegram at 7pm. We will send you one personalized match and curate your date for you!",
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
}

export const datePlaces: DatePlace[] = [
  // Kyiv Places
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
    likes: 76
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
    likes: 78
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
    likes: 62
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
      pl: "Nowoczesna kawiarnia specialty o minimalistycznym wnętrzu i wyjątkowej kawie. Świetna на ciepłą rozmowę при filiżance dobrego przelewu."
    },
    images: [
      "/images/places/kyiv_idealist_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Idealist+Coffee+Kyiv",
    likes: 71
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
      pl: "Wykwintna kawiarnia deserowa z kultowymi wypiekami, ręcznie robionymi czekoladkami i jasną, stylową atmosferą doskonałą на słodką randkę."
    },
    images: [
      "/images/places/kyiv_honey_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Honey+Kyiv",
    likes: 69
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
    likes: 71
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
      "/images/places/kyiv_lviv_croissants_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lviv+Croissants+Kyiv",
    likes: 66
  },
  {
    id: "kyiv-ministerstvo-desertiv",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Aesthetic Desserts",
      uk: "Естетичні десерти",
      ru: "Естетичні десерти",
      de: "Ästhetische Desserts",
      pl: "Estetyczne desery"
    },
    name: {
      en: "Ministerstvo Desertiv",
      uk: "Міністерство Десертів",
      ru: "Министерство Десертов",
      de: "Ministerstvo Desertiv",
      pl: "Ministerstvo Desertiv"
    },
    description: {
      en: "A visually stunning dessert studio offering colorful, artistic cakes and premium coffee. An absolute favorite for photography-loving couples.",
      uk: "Візуально приголомшлива студія десертів, що пропонує яскраві мистецькі тістечка та преміальну каву. Фаворит для любителів естетичних побачень.",
      ru: "Визуально потрясающая студия десертов, предлагающая яркие художественные пирожные и премиальный кофе. Фаворит для любителей эстетичных свиданий.",
      de: "Ein visuell beeindruckendes Dessertstudio mit farbenfrohen, kunstvollen Kuchen und erstklassigem Kaffee. Ein absoluter Favorit für fotobegeisterte Paare.",
      pl: "Spektakularne wizualnie studio deserowe oferujące kolorowe, artystyczne ciasta i kawę premium. Absolutny faworyt dla par lubiących estetyczne zdjęcia."
    },
    images: [
      "/images/places/kyiv_ministerstvo_desertiv_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ministerstvo+Desertiv+Kyiv",
    likes: 65
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
    likes: 64
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
    likes: 63
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
      pl: "Przytulне bistro"
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
    likes: 69
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
    likes: 56
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
      pl: "Tętniąca życiem i modna chińska restauracja z autentycznym jedzeniem ulicznym, neoniastym klimatem и nowoczesną atmosferą."
    },
    images: [
      "/images/places/kyiv_china_hi_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chinese+Hi+Kyiv",
    likes: 73
  },
  {
    id: "kyiv-goodgirl",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Healthy & Organic",
      uk: "Корисна їжа",
      ru: "Здоровая еда",
      de: "Gesund & Bio",
      pl: "Zdrowa żywność"
    },
    name: {
      en: "Goodgirl",
      uk: "Goodgirl",
      ru: "Goodgirl",
      de: "Goodgirl",
      pl: "Goodgirl"
    },
    description: {
      en: "A stylish cafe focusing on wholesome, organic, and exceptionally tasty food. A beautiful, bright space for health-conscious couples.",
      uk: "Стильне кафе з фокусом на корисну, органічну та винятково смачну їжу. Красивий, світлий простір для прихильників здорового способу життя.",
      ru: "Стильное кафе с фокусом на полезную, органическую и исключительно вкусную еду. Красивое, светлое пространство для здорового свидания.",
      de: "Ein stilvolles Café mit Fokus auf gesunde, biologische und köstliche Gerichte. Ein schöner, heller Ort für gesundheitsbewusste Paare.",
      pl: "Stylowa kawiarnia serwująca zdrowe, organiczne i wyjątkowo smaczne dania. Piękna, jasna przestrzeń для пар dbających о zdrowie."
    },
    images: [
      "/images/places/kyiv_goodgirl_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Goodgirl+Kyiv",
    likes: 58
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
    likes: 57
  },
  {
    id: "kyiv-breakfast-club",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "All-Day Breakfast",
      uk: "Сніданки весь день",
      ru: "Завтраки весь день",
      de: "Frühstück den ganzen Tag",
      pl: "Śnia-dania przez cały dzień"
    },
    name: {
      en: "Breakfast Club",
      uk: "Breakfast Club",
      ru: "Breakfast Club",
      de: "Breakfast Club",
      pl: "Breakfast Club"
    },
    description: {
      en: "A modern spot dedicated to all-day breakfasts. Perfect for casual morning dates that stretch into warm afternoon chats.",
      uk: "Сучасне місце, присвячене сніданкам упродовж усього дня. Ідеально підходить для невимушених ранкових побачень і довгих розмов.",
      ru: "Современное место, посвященное завтракам в течение всего дня. Идеально подходит для непринужденных утренних свиданий и долгих разговоров.",
      de: "Ein moderner Ort, der dem Frühstück den ganzen Tag gewidmet ist. Perfekt для утренних свиданий.",
      pl: "Nowoczesne miejsce serwujące śniadania przez cały dzień. Idealne na swobodne poranne randki, które przeciągają się w długie rozmowy."
    },
    images: [
      "/images/places/kyiv_breakfast_club_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Breakfast+Club+Kyiv",
    likes: 55
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
      pl: "Wyjątkowe połączenie nowoczesnej księgarni i przytulnej kawiarni. Świetne miejsce na randkę z książką в tle."
    },
    images: [
      "/images/places/kyiv_sens_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sens+Bookstore+Kyiv",
    likes: 75
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
    likes: 50
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
      pl: "Przytulне bistro"
    },
    name: {
      en: "Remi Cafe",
      uk: "remi Кафе",
      ru: "remi Кафе",
      de: "Remi Cafe",
      pl: "Remi Cafe"
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
    likes: 77
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
    likes: 47
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
      pl: "Gwarna hala gastronomiczna zrzeszająca najlepsze koncepty kulinarne Kijowa. Idealne miejsce на randkę."
    },
    images: [
      "/images/places/kyiv_foodmarket_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyiv+Food+Market+Kyiv",
    likes: 92
  },
  {
    id: "kyiv-boutique-sofie",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Romantic Courtyard",
      uk: "Романтичний дворик",
      ru: "Романтичный дворик",
      de: "Romantischer Innenhof",
      pl: "Romantyczny dziedziniec"
    },
    name: {
      en: "Boutique Sofie",
      uk: "Бути Sofie",
      ru: "Бути Sofie",
      de: "Boutique Sofie",
      pl: "Boutique Sofie"
    },
    description: {
      en: "An exceptionally romantic cafe set in a quiet courtyard of Saint Sophia Cathedral, styled like a cozy French boutique garden.",
      uk: "Винятково романтичне кафе в тихому дворику Софійського собору, стилізоване під затишний французький прованський сад.",
      ru: "Исключительно романтичное кафе в тихом дворике Софийского собора, стилизованное под уютный французский прованский сад.",
      de: "Ein außergewöhnlich романтическое Café im ruhigen Innenhof der Sophienkathedrale, im Stil eines gemütlichen französischen Gartens.",
      pl: "Niezwykle romantyczna kawiarnia położona w cichym dziedzińcu Soboru Mądrości Bożej, stylizowana na przytulny francuski ogród."
    },
    images: [
      "/images/places/kyiv_boutique_sofie_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Boutique+Sofie+Kyiv",
    likes: 42
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
      pl: "Lubiana piekarnia słynąca z przyjaznej obsługi, świeżych wypieków i puszystych rogalików. Świetne miejsce на randkę."
    },
    images: [
      "/images/places/kyiv_franyk_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Franyk+Kyiv",
    likes: 38
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
    likes: 66
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
    likes: 33
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
      ru: "Модный суши-бар в калифорниском стиле с ярким артовым интерьером, свежей рыбой и стильной городской атмосферой.",
      de: "Eine trendige Sushi-Bar im kalifornischen Stil mit lebendigem, kunstvollem Interieur, exzellentem Sushi.",
      pl: "Modny sushibar w stylu kalifornijskim z jasnym, artystycznym wnętrzem, doskonałym sushi."
    },
    images: [
      "/images/places/kyiv_fish_pussycat_1.png"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fish+and+Pussycat+Sushi+Kyiv",
    likes: 70
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
    likes: 71
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
      de: "Ein stimmungsvolles japanisches Restaurant im Stil eines Retro-Tokyo-Lokals, das Ramen, Katsu в neonfarbener Umgebung serviert.",
      pl: "Klimatyczna japońska restauracja stylizowana na retro lokal z Tokio, serwująca ramen."
    },
    images: [
      "/images/places/kyiv_japanese_hi_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Japanese+Hi+Kyiv",
    likes: 84
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
      pl: "Niezwykle estetyczna i kameralna przestrzeń, która w ciągu dnia działa jako kawiarnia, a wieczorem zmienia się в lounge."
    },
    images: [
      "/images/places/kyiv_suit_13_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Suit+13+Kyiv",
    likes: 69
  },
  {
    id: "kyiv-vero-vero",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Italian Piazza",
      uk: "Італійська тераса",
      ru: "Італійська тераса",
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
      de: "Ein malerisches italienisches Restaurant in Podil mit einer großen Sommerterrasse rund um einen Brunnen. Perfekt для романтического ужина.",
      pl: "Malownicza włoska restauracja na Podolu z przestronnym letnim tarasem wokół fontanny. Idealne miejsce на kolację."
    },
    images: [
      "/images/places/kyiv_vero_vero_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vero+Vero+Kyiv",
    likes: 70
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
    likes: 83
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
      pl: "Kultowa piekarnia i kawiarnia na Padole, słynąca z wyjątkowego chleba na zakwasie, nowoczesnych wypieków i stylowej, minimalistycznej atmosfery."
    },
    images: [
      "/images/places/kyiv_spelta_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Spelta+Kyiv+Yaroslavska",
    likes: 42
  },
  {
    id: "kyiv-bonco",
    city: "kyiv",
    type: "cafe",
    vibe: {
      en: "Pastry Shop & Cafe",
      uk: "Кав’ярня-кондитерська",
      ru: "Кофейня-кондитерская",
      de: "Café & Konditorei",
      pl: "Kawiarnia-cukiernia"
    },
    name: {
      en: "Bonco",
      uk: "Bonco",
      ru: "Bonco",
      de: "Bonco",
      pl: "Bonco"
    },
    description: {
      en: "A beautiful, intimate pastry shop near Lvivska Square. Famed for its exceptional croissants, artful tarts, and delicious signature drinks.",
      uk: "Красива затишна кав’ярня-кондитерська біля Львівської площі. Відома винятковими круасанами, авторськими тартами та кавовими напоями.",
      ru: "Красивая уютная кофейня-кондитерская возле Львовской площади. Известна исключительными круассанами, авторскими тартами и кофейными напитками.",
      de: "Ein wunderschönes, gemütliches Café in der Nähe des Lwiwska-Platzes. Bekannt für hervorragende Croissants, kunstvolle Törtchen und erstklassige Getränke.",
      pl: "Piękna, kameralna kawiarnia-cukiernia w pobliżu Placu Lwowskiego. Słynie z wyjątkowych rogalików, artystycznych tart i wyśmienitych napojów."
    },
    images: [
      "/images/places/kyiv_bonco_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bonco+Kyiv+Velyka+Zhytomyrska",
    likes: 54
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
    likes: 77
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
      ru: "Популярное французское кафе на Plac Zbawiciela, известно свежим хлебом, вкусной выпечаткой и оживленной атмосферой.",
      de: "Ein beliebtes französisches Café am Plac Zbawiciela, bekannt für frisch gebackenes Brot, leckeres Gebäck und eine lebhafte soziale Szene.",
      pl: "Popularna francuska kawiarnia na Placu Zbawiciela, słynąca ze świeżo pieczonego chleba, pysznych wypieków i tętniącego życiem klimatu."
    },
    images: [
      "/images/places/warsaw_charlotte_1.png",
      "/images/places/warsaw_charlotte_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Charlotte+Plac+Zbawiciela+Warsaw",
    likes: 80
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
    likes: 75
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
    likes: 70
  },
  {
    id: "warsaw-copernicus",
    city: "warsaw",
    type: "museum",
    vibe: {
      en: "Interactive Science Center",
      uk: "Науковий центр",
      ru: "Научний центр",
      de: "Interaktives Wissenschaftszentrum",
      pl: "Centrum Nauki Kopernik"
    },
    name: {
      en: "Copernicus Science Centre",
      uk: "Центр науки Коперника",
      ru: "Центр науки Коперника",
      de: "Kopernikus-Wissenschaftszentrum",
      pl: "Centrum Nauki Kopernik"
    },
    description: {
      en: "An interactive museum offering playful exhibits and experiment zones next to the Vistula River, perfect for active, fun conversations.",
      uk: "Інтерактивний музей із цікавими експонатами та зонами для експериментів на березі Вісли, чудовий для активного та веселого спілкування.",
      ru: "Интерактивный музей с интересными экспонатами и зонами для экспериментов на берегу Вислы, отличный для активного и веселого общения.",
      de: "Ein interaktives Museum mit spielerischen Exponaten und experimentierzonen direkt an der Weichsel, perfekt für aktive Gespräche.",
      pl: "Interaktywne muzeum oferujące angażujące wystawy i strefy eksperymentów tuż nad Wisłą, doskonałe na aktywną i wesołą randkę."
    },
    images: [
      "/images/places/warsaw_copernicus_1.jpg",
      "/images/places/warsaw_copernicus_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Copernicus+Science+Centre+Warsaw",
    likes: 65
  },
  {
    id: "warsaw-baken",
    city: "warsaw",
    type: "cafe",
    vibe: {
      en: "Artisanal Bakery & Bistro",
      uk: "Реміснича пекарня та бістро",
      ru: "Ремесленная пекарня и бистро",
      de: "Handwerkliche Bäckerei & Bistro",
      pl: "Piekarnia rzemieślnicza i bistro"
    },
    name: {
      en: "BAKEN",
      uk: "BAKEN",
      ru: "BAKEN",
      de: "BAKEN",
      pl: "BAKEN"
    },
    description: {
      en: "A trendy bakery and bistro offering outstanding sourdough bread, Copenhagen-style breakfasts by day, and cozy plates with natural wine by night.",
      uk: "Трендова пекарня та бістро, що пропонує видатний хліб на заквасці, сніданки в стилі Копенгагена вдень та затишні тарілки з натуральним вином увечері.",
      ru: "Трендовая пекарня и бистро, предлагающее выдающийся хлеб на закваске, завтраки в копенгагенском стиле днем и уютные тарелки с натуральным вином вечером.",
      de: "Eine trendige Bäckerei und Bistro mit hervorragendem Sauerteigbrot, Kopenhagen-Frühstück tagsüber und gemütlichen Platten mit Naturwein abends.",
      pl: "Modna piekarnia i bistro oferująca wybitny chleb na zakwasie, śniadania w stylu kopenhaskim w ciągu dnia i przytulne talerzyki z winem naturalnym wieczorem."
    },
    images: [
      "/images/places/warsaw_baken_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=BAKEN+Krochmalna+Warsaw",
    likes: 74
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
    likes: 79
  },
  {
    id: "warsaw-muus",
    city: "warsaw",
    type: "cafe",
    vibe: {
      en: "Aesthetic Pastry Shop",
      uk: "Естетична кондитерська",
      ru: "Эстетичная кондитерская",
      de: "Ästhetische Konditorei",
      pl: "Estetyczna cukiernia"
    },
    name: {
      en: "MUUS",
      uk: "MUUS",
      ru: "MUUS",
      de: "MUUS",
      pl: "MUUS"
    },
    description: {
      en: "A gorgeous, Instagram-worthy pastry shop with a beautiful pastel interior, exceptional tarts, and delicious specialty coffee.",
      uk: "Прекрасна кондитерська з ніжним пастельним інтер'єром, винятковими тартами та чудовою спешелті-кавою. Ідеальне місце для солодкого побачення.",
      ru: "Прекрасная кондитерская с нежным пастельным интерьером, исключительными тартами и отличным спешелти-кофе. Идеально для сладкого свидания.",
      de: "Eine wunderschöne Konditorei mit hübschem Pastell-Interieur, außergewöhnlichen Törtchen und köstlichem Kaffeespezialitäten.",
      pl: "Piękna cukiernia o pastelowym wnętrzu, słynąca z wyjątkowych tartaletek i doskonałej kawy specialty. Idealna na słodką randkę."
    },
    images: [
      "/images/places/warsaw_muus_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MUUS+Tamka+Warsaw",
    likes: 71
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
      pl: "Jasna i przyjazna kawiarnia słynąca ze śniadań serwowanych przez cały dzień, pysznych bajgli, naleśników i niedrogiego prosecco."
    },
    images: [
      "/images/places/warsaw_bulke_przez_bibulke_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bulke+przez+Bibulke+Zurawia+Warsaw",
    likes: 76
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
      de: "Ein modernes, arbeits- und datefreundliches Spezialitäten-Café mit minimalistischem Design, Premium-Bohnen und freundlicher Atmosphäre.",
      pl: "Nowoczesna kawiarnia specialty o minimalistycznym designie, ogromnym wyborze kaw oraz bardzo przyjaznej i swobodnej atmosferze."
    },
    images: [
      "/images/places/warsaw_coffeedesk_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffeedesk+Wilcza+Warsaw",
    likes: 72
  },
  {
    id: "warsaw-deseo",
    city: "warsaw",
    type: "cafe",
    vibe: {
      en: "Premium Dessert Boutique",
      uk: "Бутик преміум десертів",
      ru: "Бутик премиум десертов",
      de: "Premium Dessert Boutique",
      pl: "Ekskluzywna cukiernia"
    },
    name: {
      en: "DESEO",
      uk: "DESEO",
      ru: "DESEO",
      de: "DESEO",
      pl: "DESEO"
    },
    description: {
      en: "A high-end dessert boutique offering visually stunning, glaze-coated modern pastries and premium craft chocolates that look like actual art.",
      uk: "Преміальний бутик десертів, що пропонує візуально вражаючі сучасні тістечка з глянцевою глазур'ю та крафтовий шоколад.",
      ru: "Премиальный бутик десертов, предлагающий визуально потрясающие современные пирожные с глянцевой глазурью и крафтовый шоколад.",
      de: "Eine exklusive Dessert-Boutique mit visuell beeindruckenden modernen Törtchen und erstklassiger handwerklicher Schokolade.",
      pl: "Ekskluzywna cukiernia oferująca spektakularne wizualnie, nowoczesne desery z błyszczącą polewą oraz rzemieślnicze czekolady."
    },
    images: [
      "/images/places/warsaw_deseo_1.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=DESEO+Patisserie+Chocolaterie+Warsaw",
    likes: 73
  }
];
