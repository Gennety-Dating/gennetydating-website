/* ========================================
   GENNETY — Static Content / Mock Data
   ======================================== */

import { type Locale } from "./i18n";

export const TELEGRAM_BOT_URL = "https://t.me/GennetyBot";
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
  vibe: Record<Locale, string>;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  images: string[];
  mapsUrl: string;
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Milk+Bar+Shota+Rustaveli+Kyiv"
  },
  {
    id: "kyiv-barykada",
    city: "kyiv",
    type: "restaurant",
    vibe: {
      en: "Speakeasy Restaurant",
      uk: "Ресторан-музей",
      ru: "Ресторан-музей",
      de: "Speakeasy-Restaurant",
      pl: "Ukryta restauracja"
    },
    name: {
      en: "Ostannya Barykada",
      uk: "Остання Барикада",
      ru: "Последняя Баррикада",
      de: "Ostannya Barykada",
      pl: "Ostannya Barykada"
    },
    description: {
      en: "A hidden meeting place on Maidan Nezalezhnosti with historic artifacts, celebrating modern Ukrainian design and local cuisine.",
      uk: "Приховане місце зустрічі на Майдані Незалежності з історичними артефактами, сучасним українським дизайном та локальною кухнею.",
      ru: "Скрытое место встречи на Майдане Независимости с историческими артефактами, современным украинским дизайном и локальной кухней.",
      de: "Ein versteckter Treffpunkt am Maidan Nezalezhnosti mit historischen Artefakten, modernem ukrainischen Design und lokaler Küche.",
      pl: "Ukryte miejsce spotkań na Majdanie Niepodległości z historycznymi artefaktami, nowoczesnym ukraińskim designem i lokalną kuchnią."
    },
    images: [
      "/images/places/kyiv_barykada_1.jpg",
      "/images/places/kyiv_barykada_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ostannya+Barykada+Kyiv"
  },
  {
    id: "kyiv-shevchenko",
    city: "kyiv",
    type: "park",
    vibe: {
      en: "Scenic City Park",
      uk: "Міський парк",
      ru: "Городской парк",
      de: "Malerischer Stadtpark",
      pl: "Malowniczy park miejski"
    },
    name: {
      en: "Shevchenko Park",
      uk: "Парк Шевченка",
      ru: "Парк Шевченко",
      de: "Schewtschenko-Park",
      pl: "Park Szewczenki"
    },
    description: {
      en: "A cozy green sanctuary directly opposite the Red University Building. Features tranquil walkways, street coffee, and chess players.",
      uk: "Затишний зелений острівець навпроти Червоного корпусу університету. Тут є спокійні алеї, вулична кава та шахісти.",
      ru: "Уютный зеленый островок напротив Красного корпуса университета. Здесь есть спокойные аллеи, уличный кофе и шахматисты.",
      de: "Ein gemütliches grünes Schutzgebiet direkt gegenüber dem Roten Universitätsgebäude. Mit ruhigen Gehwegen, Straßenkaffee und Schachspielern.",
      pl: "Przytulny zielony azyl naprzeciwko Czerwonego Gmachu Uniwersytetu. Znajdziesz tu spokojne alejki, uliczną kawę i szachistów."
    },
    images: [
      "/images/places/kyiv_shevchenko_1.jpg",
      "/images/places/kyiv_shevchenko_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shevchenko+Park+Kyiv"
  },
  {
    id: "kyiv-khanenko",
    city: "kyiv",
    type: "museum",
    vibe: {
      en: "Art Museum",
      uk: "Музей мистецтв",
      ru: "Музей искусств",
      de: "Kunstmuseum",
      pl: "Muzeum sztuki"
    },
    name: {
      en: "Khanenko Museum",
      uk: "Музей Ханенків",
      ru: "Музей Ханенко",
      de: "Khanenko-Museum",
      pl: "Muzeum Chanenków"
    },
    description: {
      en: "A stunning collection of European and Asian art housed in a beautiful historical mansion, perfect for a thoughtful, quiet date.",
      uk: "Приголомшлива колекція європейського та азійського мистецтва в історичному особняку, ідеальна для вдумливого та спокійного побачення.",
      ru: "Потрясающая коллекция европейского и азиатского искусства в историческом особняке, идеальная для вдумчивого и спокойного свидания.",
      de: "Eine beeindruckende Sammlung europäischer und asiatischer Kunst in einem wunderschönen historischen Herrenhaus, perfekt für ein ruhiges Date.",
      pl: "Niezwykła kolekcja sztuki europejskiej i azjatyckiej w pięknym zabytkowym pałacu, idealna na spokojną i pełną refleksji randkę."
    },
    images: [
      "/images/places/kyiv_khanenko_1.jpg",
      "/images/places/kyiv_khanenko_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Khanenko+Museum+Kyiv"
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
      ru: "Популярное французское кафе на Plac Zbawiciela, известное свежим хлебом, вкусной выпечаткой и оживленной атмосферой.",
      de: "Ein beliebtes französisches Café am Plac Zbawiciela, bekannt für frisch gebackenes Brot, leckeres Gebäck und eine lebhafte soziale Szene.",
      pl: "Popularna francuska kawiarnia na Placu Zbawiciela, słynąca ze świeżo pieczonego chleba, pysznych wypieków i tętniącego życiem klimatu."
    },
    images: [
      "/images/places/warsaw_charlotte_1.jpg",
      "/images/places/warsaw_charlotte_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Charlotte+Plac+Zbawiciela+Warsaw"
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hala+Koszyki+Warsaw"
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lazienki+Krolewskie+Warsaw"
  },
  {
    id: "warsaw-copernicus",
    city: "warsaw",
    type: "museum",
    vibe: {
      en: "Interactive Science Center",
      uk: "Науковий центр",
      ru: "Научный центр",
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
      de: "Ein interaktives Museum mit spielerischen Exponaten und Experimentierzonen direkt an der Weichsel, perfekt für aktive Gespräche.",
      pl: "Interaktywne muzeum oferujące angażujące wystawy i strefy eksperymentów tuż nad Wisłą, doskonałe na aktywną i wesołą randkę."
    },
    images: [
      "/images/places/warsaw_copernicus_1.jpg",
      "/images/places/warsaw_copernicus_2.jpg"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Copernicus+Science+Centre+Warsaw"
  }
];
