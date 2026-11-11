"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { useLanguage } from "@/lib/language-context";
import { CONTACT_EMAIL, TELEGRAM_SUPPORT_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

// Localized header and UI texts matching Gennety multi-language format
const headerTexts: Record<
  Locale,
  {
    back: string;
    badge: string;
    title: string;
    atGennety: string;
    tagline: string;
    details: string;
    collapse: string;
    aboutGennetyTitle: string;
    aboutRoleTitle: string;
    whatYouDoTitle: string;
    lookingForTitle: string;
    mustHave: string;
    niceToHave: string;
    whatWeOfferTitle: string;
    howToApplyTitle: string;
    baseSalary: string;
    bonuses: string;
    totalPotential: string;
    perks: string;
    format: string;
    focus: string;
    startDate: string;
    applyTelegram: string;
    orEmail: string;
    includeInMessage: string;
    footerTitle: string;
    footerNote: string;
    footerContact: string;
  }
> = {
  en: {
    back: "Back to Home",
    badge: "Early Team · We're Hiring",
    title: "Careers",
    atGennety: "at gennety",
    tagline: "Simplifying human-to-human interaction.",
    details: "Details",
    collapse: "Close",
    aboutGennetyTitle: "About Gennety",
    aboutRoleTitle: "About the Role",
    whatYouDoTitle: "What You'll Do",
    lookingForTitle: "What We're Looking For",
    mustHave: "Must-Have",
    niceToHave: "Nice to Have",
    whatWeOfferTitle: "What We Offer",
    howToApplyTitle: "How to Apply",
    baseSalary: "Base Salary",
    bonuses: "Performance Bonuses",
    totalPotential: "Total Potential",
    perks: "Perks",
    format: "Format",
    focus: "Focus",
    startDate: "Start Date",
    applyTelegram: "Apply on Telegram (@gennetysupport)",
    orEmail: "Or email",
    includeInMessage: "In your message, please include:",
    footerTitle: "Don't see your role?",
    footerNote: "We're always open to exceptional engineers, designers, and growth builders.",
    footerContact: CONTACT_EMAIL,
  },
  uk: {
    back: "Назад на головну",
    badge: "Рання команда · Ми наймаємо",
    title: "Вакансії",
    atGennety: "у gennety",
    tagline: "Спрощуємо взаємодію між людьми.",
    details: "Деталі",
    collapse: "Згорнути",
    aboutGennetyTitle: "Про Gennety",
    aboutRoleTitle: "Про роль",
    whatYouDoTitle: "Що ти робитимеш",
    lookingForTitle: "Вимоги до кандидата",
    mustHave: "Обов'язково",
    niceToHave: "Буде плюсом",
    whatWeOfferTitle: "Що ми пропонуємо",
    howToApplyTitle: "Як податися",
    baseSalary: "Базова оплата",
    bonuses: "Бонусна система",
    totalPotential: "Потенціал доходу",
    perks: "Переваги",
    format: "Формат",
    focus: "Фокус",
    startDate: "Старт",
    applyTelegram: "Відгукнутися в Telegram (@gennetysupport)",
    orEmail: "Або написати на",
    includeInMessage: "У повідомленні вкажи:",
    footerTitle: "Не знайшов своєї ролі?",
    footerNote: "Ми завжди відкриті до сильних інженерів, дизайнерів і творців.",
    footerContact: CONTACT_EMAIL,
  },
  ru: {
    back: "Назад на главную",
    badge: "Ранняя команда · Мы нанимаем",
    title: "Карьера",
    atGennety: "в gennety",
    tagline: "Упрощаем взаимодействие между людьми.",
    details: "Детали",
    collapse: "Свернуть",
    aboutGennetyTitle: "О Gennety",
    aboutRoleTitle: "О роли",
    whatYouDoTitle: "Что предстоит делать",
    lookingForTitle: "Требования",
    mustHave: "Обязательно",
    niceToHave: "Будет плюсом",
    whatWeOfferTitle: "Что мы предлагаем",
    howToApplyTitle: "Как откликнуться",
    baseSalary: "Базовая оплата",
    bonuses: "Бонусная сетка",
    totalPotential: "Потенциал дохода",
    perks: "Бонусы и условия",
    format: "Формат",
    focus: "Фокус",
    startDate: "Старт",
    applyTelegram: "Откликнуться в Telegram (@gennetysupport)",
    orEmail: "Или написать на",
    includeInMessage: "В сообщении укажи:",
    footerTitle: "Не нашёл подходящей роли?",
    footerNote: "Мы всегда открыты для сильных инженеров, дизайнеров и созидателей.",
    footerContact: CONTACT_EMAIL,
  },
  de: {
    back: "Zurück zur Startseite",
    badge: "Frühes Team · Wir stellen ein",
    title: "Karriere",
    atGennety: "bei gennety",
    tagline: "Vereinfachung der zwischenmenschlichen Interaktion.",
    details: "Details",
    collapse: "Schließen",
    aboutGennetyTitle: "Über Gennety",
    aboutRoleTitle: "Über die Rolle",
    whatYouDoTitle: "Deine Aufgaben",
    lookingForTitle: "Anforderungen",
    mustHave: "Must-Have",
    niceToHave: "Nice to Have",
    whatWeOfferTitle: "Was wir bieten",
    howToApplyTitle: "Bewerbung",
    baseSalary: "Grundgehalt",
    bonuses: "Leistungsboni",
    totalPotential: "Gesamtpotenzial",
    perks: "Vorteile",
    format: "Format",
    focus: "Fokus",
    startDate: "Start",
    applyTelegram: "Über Telegram bewerben (@gennetysupport)",
    orEmail: "Oder per E-Mail an",
    includeInMessage: "Bitte füge deiner Nachricht bei:",
    footerTitle: "Deine Rolle nicht dabei?",
    footerNote: "Wir sind immer offen für außergewöhnliche Entwickler und Macher.",
    footerContact: CONTACT_EMAIL,
  },
  pl: {
    back: "Powrót do strony głównej",
    badge: "Wczesny zespół · Rekrutujemy",
    title: "Kariera",
    atGennety: "w gennety",
    tagline: "Upraszczanie interakcji międzyludzkich.",
    details: "Szczegóły",
    collapse: "Zwiń",
    aboutGennetyTitle: "O Gennety",
    aboutRoleTitle: "O stanowisku",
    whatYouDoTitle: "Co będziesz robić",
    lookingForTitle: "Wymagania",
    mustHave: "Wymagania obowiązkowe",
    niceToHave: "Mile widziane",
    whatWeOfferTitle: "Co oferujemy",
    howToApplyTitle: "Jak aplikować",
    baseSalary: "Wynagrodzenie podstawowe",
    bonuses: "Premie za wyniki",
    totalPotential: "Całkowity potencjał",
    perks: "Benefity",
    format: "Format",
    focus: "Fokus",
    startDate: "Początek",
    applyTelegram: "Aplikuj przez Telegram (@gennetysupport)",
    orEmail: "Lub napisz na",
    includeInMessage: "W wiadomości dołącz:",
    footerTitle: "Nie ma Twojej roli?",
    footerNote: "Zawsze chętnie rozmawiamy z wyjątkowymi inżynierami i twórcami.",
    footerContact: CONTACT_EMAIL,
  },
  fr: {
    back: "Retour à l'accueil",
    badge: "Équipe initiale · Nous recrutons",
    title: "Carrières",
    atGennety: "chez gennety",
    tagline: "Simplifier les interactions humaines.",
    details: "Détails",
    collapse: "Fermer",
    aboutGennetyTitle: "À propos de Gennety",
    aboutRoleTitle: "À propos du poste",
    whatYouDoTitle: "Vos missions",
    lookingForTitle: "Profil recherché",
    mustHave: "Indispensable",
    niceToHave: "Atouts",
    whatWeOfferTitle: "Ce que nous offrons",
    howToApplyTitle: "Comment postuler",
    baseSalary: "Salaire de base",
    bonuses: "Primes de performance",
    totalPotential: "Potentiel total",
    perks: "Avantages",
    format: "Format",
    focus: "Focus",
    startDate: "Début",
    applyTelegram: "Postuler sur Telegram (@gennetysupport)",
    orEmail: "Ou par e-mail à",
    includeInMessage: "Dans votre message, indiquez :",
    footerTitle: "Votre rôle ne figure pas ici ?",
    footerNote: "Nous sommes toujours à l'écoute des talents exceptionnels.",
    footerContact: CONTACT_EMAIL,
  },
  it: {
    back: "Torna alla Home",
    badge: "Team iniziale · Stiamo assumendo",
    title: "Carriere",
    atGennety: "in gennety",
    tagline: "Semplificare le interazioni umane.",
    details: "Dettagli",
    collapse: "Chiudi",
    aboutGennetyTitle: "Su Gennety",
    aboutRoleTitle: "Sul ruolo",
    whatYouDoTitle: "Cosa farai",
    lookingForTitle: "Cosa cerchiamo",
    mustHave: "Requisiti fondamentali",
    niceToHave: "Requisiti graditi",
    whatWeOfferTitle: "Cosa offriamo",
    howToApplyTitle: "Come candidarsi",
    baseSalary: "Compenso base",
    bonuses: "Bonus di rendimento",
    totalPotential: "Potenziale totale",
    perks: "Vantaggi",
    format: "Formato",
    focus: "Focus",
    startDate: "Inizio",
    applyTelegram: "Candidati su Telegram (@gennetysupport)",
    orEmail: "O via email a",
    includeInMessage: "Nel tuo messaggio includi:",
    footerTitle: "Non vedi il tuo ruolo?",
    footerNote: "Siamo sempre aperti a ingegneri e talenti straordinari.",
    footerContact: CONTACT_EMAIL,
  },
  es: {
    back: "Volver al inicio",
    badge: "Equipo inicial · Estamos contratando",
    title: "Carreras",
    atGennety: "en gennety",
    tagline: "Simplificando la interacción humana.",
    details: "Detalles",
    collapse: "Cerrar",
    aboutGennetyTitle: "Sobre Gennety",
    aboutRoleTitle: "Sobre el puesto",
    whatYouDoTitle: "Lo que harás",
    lookingForTitle: "Lo que buscamos",
    mustHave: "Imprescindible",
    niceToHave: "Deseable",
    whatWeOfferTitle: "Lo que ofrecemos",
    howToApplyTitle: "Cómo postularse",
    baseSalary: "Salario base",
    bonuses: "Bonos por rendimiento",
    totalPotential: "Potencial total",
    perks: "Beneficios",
    format: "Formato",
    focus: "Enfoque",
    startDate: "Inicio",
    applyTelegram: "Postularse en Telegram (@gennetysupport)",
    orEmail: "O por correo a",
    includeInMessage: "En tu mensaje incluye:",
    footerTitle: "¿No encuentras tu puesto?",
    footerNote: "Siempre buscamos creadores e ingenieros excepcionales.",
    footerContact: CONTACT_EMAIL,
  },
};

interface VacancyItem {
  id: string;
  titles: Record<string, string>;
  meta: Record<string, { location: string; type: string; company: string }>;
  aboutGennety: Record<string, string>;
  aboutRole: Record<string, { summary: string; format: string; focus: string; start: string }>;
  whatYouDo: Record<string, string[]>;
  mustHave: Record<string, string[]>;
  niceToHave: Record<string, string[]>;
  whatWeOffer: Record<
    string,
    {
      base: string;
      bonuses: string[];
      potential: string;
      perks?: string;
    }
  >;
  howToApply: Record<
    string,
    {
      intro: string;
      steps: string[];
      note: string;
    }
  >;
}

const VACANCIES: VacancyItem[] = [
  {
    id: "vacancy-ugc",
    titles: {
      en: "UGC & TikTok Growth Manager",
      uk: "UGC & TikTok Growth Manager",
      ru: "UGC & TikTok Growth Manager",
    },
    meta: {
      en: { location: "Remote", type: "Full-time", company: "Gennety" },
      uk: { location: "Remote", type: "Full-time", company: "Gennety" },
      ru: { location: "Remote", type: "Full-time", company: "Gennety" },
    },
    aboutGennety: {
      en: "Gennety is an AI dating platform that turns matches into real-life dates — no endless swiping or small talk, just real meetings. We are building a creator-driven acquisition engine to scale Gennety globally across TikTok and short-form video.",
      uk: "Gennety — це AI дейтинг-платформа, яка перетворює онлайн-знайомства на реальні побачення наживо без нескінченного свайпінгу та порожніх переписок. Ми будуємо систему залучення через креаторів для глобального масштабування в TikTok та Reels.",
      ru: "Gennety — это AI дейтинг-платформа, превращающая совпадения в реальные свидания без бесконечных свайпов и смолтоков. Мы создаем креаторскую машину привлечения пользователей в TikTok и коротких видео.",
    },
    aboutRole: {
      en: {
        summary:
          "Build and scale an end-to-end creator growth engine for Gennety: from sourcing creators and writing viral hooks to running rapid creative experiments, analyzing performance, and scaling winning ads.",
        format: "Full-time (Remote)",
        focus: "TikTok, Reels, UGC, Creator Marketing & Paid Social",
        start: "ASAP",
      },
      uk: {
        summary:
          "Створення та масштабування повної системи зростання через креаторів: від пошуку авторів та написання вірусних хуків до швидких експериментів, аналізу метрик і масштабування реклами.",
        format: "Full-time (Remote)",
        focus: "TikTok, Reels, UGC, Creator Marketing & Paid Social",
        start: "ASAP",
      },
      ru: {
        summary:
          "Построение и масштабирование системы роста через креаторов: от поиска авторов и написания вирусных хуков до быстрых экспериментов, аналитики перформанса и масштабирования рекламы.",
        format: "Full-time (Remote)",
        focus: "TikTok, Reels, UGC, Creator Marketing & Paid Social",
        start: "ASAP",
      },
    },
    whatYouDo: {
      en: [
        "Trend research & ideation: systematically analyze TikTok, Reels, and competitor consumer apps to uncover viral hooks, formats, and high-converting angles.",
        "Scriptwriting & creative briefs: write native hooks (first 1–3s), story structures, CTAs, and detailed briefs, turning each concept into 5–20 variations.",
        "Creator pipeline management: source, recruit, brief, and coordinate a network of 10–30+ TikTok creators, micro-influencers, and UGC creators.",
        "End-to-end UGC production: manage the complete workflow (idea → brief → script → filming → revisions → ad-ready asset) with authentic TikTok-native styling.",
        "High-velocity creative testing: launch rapid experiment cycles testing hooks, creators, and angles (100+ variations/month) — test fast, kill fast, scale winners.",
        "Performance analytics & scaling: track conversion funnels (CTR, CAC, CPI, activation, retention, ROAS), maintain a creative knowledge base, and scale winning campaigns across markets.",
      ],
      uk: [
        "Дослідження трендів: системний аналіз TikTok, Reels та додатків-конкурентів для виявлення вірусних хуків та конверсійних форматів.",
        "Сценарії та бріфи: написання нативних хуків (перші 1–3 секунди), структури історій та CTA, створення від 5 до 20 варіацій на кожен концепт.",
        "Керування мережею креаторів: пошук, онбординг, бріфінг та координація 10–30+ TikTok-авторів та UGC-кріейторів.",
        "Виробництво контенту під ключ: повний цикл (ідея → бріф → сценарій → зйомка → правки → готовий креатив) у нативному стилі платформи.",
        "Швидке тестування: регулярні цикли тестування хуків, креаторів та кутів подачі (100+ варіацій на місяць) — швидкий запуск та масштабування.",
        "Аналітика та масштабування: відстеження воронки конверсій (CTR, CAC, CPI, активації, зустрічі, ROAS) та масштабування на нові міста й країни.",
      ],
      ru: [
        "Анализ трендов: регулярный мониторинг TikTok, Reels и конкурентов для поиска вирусных хуков и конвертящих форматов.",
        "Сценарии и брифы: написание нативных хуков (первые 1–3 секунды), структуры историй и CTA, создание 5–20 вариаций на концепт.",
        "Пайплайн креаторов: поиск, онбординг, бриф и координация пула из 10–30+ TikTok и UGC-авторов.",
        "UGC-продакшн полного цикла: от идеи и сценария до готового к рекламе видео в нативном стиле.",
        "Высокоскоростное тестирование: регулярные эксперименты (100+ вариаций в месяц) — быстрый отсев и масштабирование победителей.",
        "Аналитика воронок: отслеживание CTR, CAC, CPI, активаций и состоявшихся свиданий, масштабирование на новые рынки.",
      ],
    },
    mustHave: {
      en: [
        "TikTok-native understanding: deep grasp of viral short-form pacing, native storytelling, and hook mechanics that drive user action.",
        "High creative output: ability to systematically generate dozens of distinct creative hypotheses and scripts.",
        "Creator & project management: proven experience managing multiple creators simultaneously, maintaining quality, and hitting deadlines.",
        "Data-driven mindset: confident with performance marketing metrics (CAC, CPI, conversions, retention) to guide iterations.",
        "Extreme ownership: autonomous operator who takes a high-level goal and independently executes the testing loop.",
      ],
      uk: [
        "Нативне розуміння TikTok: відчуття темпу, монтажу, сторітелінгу та механіки залучення уваги.",
        "Висока креативна продуктивність: здатність системно створювати десятки якісних сценаріїв та гіпотез.",
        "Досвід роботи з креаторами: успішний досвід координації пулу авторів, контролю якості та дедлайнів.",
        "Аналітичний підхід: впевнене оперування метриками (CAC, CPI, конверсії, ретеншн) для оптимізації.",
        "Повна автономність: готовність самостійно приймати рішення та вести повний цикл тестів.",
      ],
      ru: [
        "Нативное понимание TikTok: глубокое чувство темпа, сторителлинга и удержания внимания.",
        "Высокая продуктивность: системная генерация десятков гипотез и сценариев в короткие сроки.",
        "Опыт менеджмента авторов: успешное ведение пула креаторов, контроль дедлайнов и стандартов качества.",
        "Аналитический склад ума: уверенная работа с метриками CAC, CPI, конверсий и удержания.",
        "Экстремальная ответственность: способность брать верхнеуровневую цель и самостоятельно вести процесс.",
      ],
    },
    niceToHave: {
      en: [
        "Paid social experience: background in performance marketing for consumer, dating, or lifestyle mobile apps.",
        "Video editing skills: proficiency with CapCut, Premiere, or mobile video editing tools.",
        "International outreach: experience sourcing and directing creators across multiple markets and languages.",
      ],
      uk: [
        "Досвід у платній рекламі (Paid Social) для споживчих або дейтинг-додатків.",
        "Навички відеомонтажу (CapCut, Premiere або мобільні редактори).",
        "Досвід пошуку авторів на міжнародних ринках (англійська / польська / німецька).",
      ],
      ru: [
        "Опыт в платном трафике (Paid Social) для потребительских или дейтинг-приложений.",
        "Навыки монтажа видео (CapCut, Premiere или мобильные редакторы).",
        "Опыт работы с англоязычными или европейскими креаторами.",
      ],
    },
    whatWeOffer: {
      en: {
        base: "$1,000 / month (Remote, Full-time)",
        bonuses: [
          "Execution Bonus (up to +$300/mo): for hitting creator pipeline and testing volume targets",
          "Creative Winner Bonus (up to +$500/mo): for producing high-performing benchmark-beating creatives",
          "Growth Bonus ($100–$1,000+/mo): directly scaled with acquired activated users (+$100 per 100 users, +$500 per 500 users, +$1,000 per 1,000 users)",
          "Breakthrough Bonus (+$1,000–$2,000): for scalable winning formats, major acquisition angles, or new market expansions",
        ],
        potential: "$1,500–$3,000+ / month with uncapped upside based on growth impact.",
      },
      uk: {
        base: "$1,000 / місяць (Remote, Full-time)",
        bonuses: [
          "Бонус за виконання плану (до +$300/міс): за виконання обсягів тестів та виробництва контенту",
          "Бонус за креативи-переможці (до +$500/міс): за відео з рекордними показниками конверсії",
          "Бонус за ріст користувачів ($100–$1,000+/міс): прямо пропорційно новим активним користувачам",
          "Проривний бонус (+$1,000–$2,000): за нові масштабовані зв'язки та відкриття ринків",
        ],
        potential: "$1,500–$3,000+ / місяць без обмежень, залежно від результатів зростання.",
      },
      ru: {
        base: "$1,000 / месяц (Remote, Full-time)",
        bonuses: [
          "Бонус за выполнение плана (до +$300/мес): за объем тестирования и пайплайн авторов",
          "Бонус за креативы-победители (до +$500/мес): за ролики с рекордными метриками",
          "Бонус за рост аудитории ($100–$1,000+/мес): напрямую привязан к привлеченным пользователям",
          "Прорывной бонус (+$1,000–$2,000): за масштабируемые форматы и новые рынки",
        ],
        potential: "$1,500–$3,000+ / месяц без ограничений по доходу.",
      },
    },
    howToApply: {
      en: {
        intro: "Message us directly on Telegram: @gennetysupport (or email dating@gennety.com).",
        steps: [
          "Links to TikToks / Reels or UGC content you have produced, scripted, or managed",
          "2–3 creative concepts or hooks you would test for Gennety in your first week",
          "Brief overview of your experience managing creator pipelines and testing ad creatives",
        ],
        note: "Questions? Message us in the same Telegram chat — we are looking for a true partner, not just an executor.",
      },
      uk: {
        intro: "Напиши нам напряму в Telegram: @gennetysupport (або на пошту dating@gennety.com).",
        steps: [
          "Посилання на TikToks / Reels або UGC контент, який ти створював(ла) чи координував(ла)",
          "2–3 креативні концепти або хуки, які ти б протестував(ла) для Gennety в перший тиждень",
          "Короткий опис твого досвіду керування креаторами та запуску креативів",
        ],
        note: "Є питання? Пиши в цей же Telegram-чат — ми шукаємо партнера, а не просто виконавця.",
      },
      ru: {
        intro: "Напиши нам напрямую в Telegram: @gennetysupport (или на почту dating@gennety.com).",
        steps: [
          "Ссылки на TikToks / Reels или UGC контент, который ты создавал(а) или курировал(а)",
          "2–3 креативных концепта или хука, которые ты протестируешь для Gennety в первую неделю",
          "Краткое описание твоего опыта координации авторов и тестирования рекламы",
        ],
        note: "Вопросы? Пиши в тот же Telegram-чат — мы ищем партнера по росту, а не просто исполнителя.",
      },
    },
  },
  {
    id: "vacancy-cgl",
    titles: {
      en: "Campus Growth Lead",
      uk: "Campus Growth Lead",
      ru: "Campus Growth Lead",
    },
    meta: {
      en: { location: "Kyiv, Ukraine", type: "Full-time or Part-time (20–30h)", company: "Gennety" },
      uk: { location: "Київ, Україна", type: "Full-time або Part-time (20–30h)", company: "Gennety" },
      ru: { location: "Киев, Украина", type: "Full-time или Part-time (20–30ч)", company: "Gennety" },
    },
    aboutGennety: {
      en: "Gennety is an AI dating platform for students that turns matches into real-life dates — no endless swiping or small talk, just real meetings. We are launching in Kyiv and looking for a leader to make Gennety the #1 dating story across Ukrainian universities.",
      uk: "Gennety — це AI дейтинг-платформа для студентів, яка перетворює онлайн-пари на реальні побачення наживо. Ми запускаємося в Києві та шукаємо лідера, який зробить Gennety головною історією знайомств в українських університетах.",
      ru: "Gennety — это AI дейтинг-платформа для студентов, превращающая совпадения в реальные свидания. Мы запускаемся в Киеве и ищем лидера, который сделает Gennety главным дейтинг-сервисом в университетах.",
    },
    aboutRole: {
      en: {
        summary:
          "Launch Gennety across key Kyiv campuses within 1–2 months (primary focus on КІМО, університет Шевченка (КНУ), and НаУКМА), build an ambassador network, and ensure every student knows about us.",
        format: "Full-time or intensive part-time (20–30 hours/week)",
        focus: "Campus Launches, Student Ambassador Network, Offline Events & Speed Dating",
        start: "ASAP",
      },
      uk: {
        summary:
          "Запуск Gennety у ключових університетах Києва за 1–2 місяці (фокус на КІМО, КНУ ім. Шевченка та НаУКМА), побудова мережі амбасадорів та залучення студентської спільноти.",
        format: "Full-time або інтенсивний part-time (20–30 годин/тиждень)",
        focus: "Запуск на кампусах, мережа амбасадорів, офлайн-івенти та спід-дейтинги",
        start: "ASAP",
      },
      ru: {
        summary:
          "Запуск Gennety в ведущих вузах Киева за 1–2 месяца (фокус на КИМО, КНУ им. Шевченко и НаУКМА), построение сети амбассадоров и вовлечение студенческого сообщества.",
        format: "Full-time или интенсивный part-time (20–30 часов/неделю)",
        focus: "Запуск в университетах, сеть амбассадоров, офлайн-мероприятия и спид-дейтинги",
        start: "ASAP",
      },
    },
    whatYouDo: {
      en: [
        "Launch Gennety at universities: organize events, parties, speed-dating, and tabling.",
        "Build campus networks: partner with student councils, clubs, and influencers to recruit ambassadors.",
        "Create viral content: Reels, TikToks, announcements, and memes.",
        "Lead ambassadors: manage a team of 10–20 micro-ambassadors per campus.",
        "Track growth: registrations, activity, IRL dates, and conversion to paid users.",
        "Manage operations: coordinate event logistics and community moderation.",
      ],
      uk: [
        "Запуски в університетах: організація івентів, вечірок, спід-дейтингів та промо-стендів на кампусах.",
        "Студентські партнерства: співпраця зі студрадами, клубами та лідерами думок для рекрутингу амбасадорів.",
        "Вірусний кампус-контент: зйомка Reels, TikToks, студентські інтерв'ю та локальні меми.",
        "Керування амбасадорами: координація команди з 10–20 мікро-амбасадорів на кожному ключовому кампусі.",
        "Аналітика росту: реєстрації, активність, проведені побачення наживо та конверсії.",
        "Операційна діяльність: логістика заходів та модерація спільноти.",
      ],
      ru: [
        "Запуск в университетах: организация мероприятий, вечеринок, спид-дейтингов и промо-стендов.",
        "Партнерства на кампусах: работа со студсоветами, клубами и лидерами мнений для набора амбассадоров.",
        "Вирусный контент: съемка Reels, TikToks, уличные опросы студентов и локальные мемы.",
        "Управление амбассадорами: координация команды из 10–20 амбассадоров на каждом факультете.",
        "Отслеживание метрик: регистрации, активность, состоявшиеся офлайн-свидания и конверсии.",
        "Операционная работа: организация логистики ивентов и поддержка сообщества.",
      ],
    },
    mustHave: {
      en: [
        "Current student or recent graduate (within 1 year) of a Kyiv university (priority for КІМО, Шевченка, НаУКМА).",
        "Campus insider: connected with student leaders, club heads, and party organizers.",
        "Event experience: organized at least 3–5 parties, faculty days, or tournaments.",
        "Content creation: shoot and edit Reels/TikTok, write posts, manage social media.",
        "Proactive communicator: comfortable with outreach, pitching, and negotiating.",
      ],
      uk: [
        "Студент або нещодавній випускник університету Києва (пріоритет КІМО, КНУ ім. Шевченка, НаУКМА).",
        "Кампус-інсайдер: широке коло знайомств серед лідерів студрад, організаторів вечірок та клубів.",
        "Досвід організації: особиста організація або координація щонайменше 3–5 студентських подій чи тусовок.",
        "Створення контенту: вміння знімати та монтувати Reels/TikTok, писати тексти та вести соцмережі.",
        "Проактивність: легкість у комунікації, пітчингу та проведенні перемовин.",
      ],
      ru: [
        "Студент или недавний выпускник киевского вуза (приоритет КИМО, КНУ им. Шевченко, НаУКМА).",
        "Кампусный инсайдер: контакты со студсоветами, лидерами мнений и организаторами вечеринок.",
        "Опыт организации: проведение или координация от 3–5 мероприятий, праздников факультета или вечеринок.",
        "Контент: съемка и монтаж Reels/TikTok, написание постов и работа с соцсетями.",
        "Проактивность: уверенная коммуникация, презентация продукта и ведение переговоров.",
      ],
    },
    niceToHave: {
      en: [
        "Leadership experience in student government, student unions, or dorms.",
        "Active personal blog with 500+ followers (Instagram / TikTok / Telegram).",
        "Interest in social mechanics, dating markets, and relationship psychology.",
        "Basic tools: Notion, Google Sheets, and simple analytics.",
      ],
      uk: [
        "Досвід керівництва в органах студентського самоврядування або гуртожитках.",
        "Власний активний блог (Instagram / TikTok / Telegram) від 500+ підписників.",
        "Інтерес до механік знайомств, психології стосунків та побудови спільнот.",
        "Базові інструменти: Notion, Google Sheets та робота з таблицями.",
      ],
      ru: [
        "Опыт руководства в студенческом самоуправлении или профкоме.",
        "Личный активный профиль от 500+ подписчиков (Instagram / TikTok / Telegram).",
        "Интерес к психологии отношений, механике дейтинга и социальным связям.",
        "Базовые инструменты: Notion, Google Таблицы и базовые метрики.",
      ],
    },
    whatWeOffer: {
      en: {
        base: "$1,000 / month",
        bonuses: [
          "+$100 for every 500 new campus registrations",
          "+$200 for each successful event (50+ attendees)",
          "+$500 for reaching 5,000 active users per quarter",
        ],
        potential: "$2,000–$3,000 / month when hitting ambitious goals.",
        perks:
          "Direct mentorship from founders (growth marketing & product), strong network of student community leaders, and the opportunity to reshape student dating culture.",
      },
      uk: {
        base: "$1,000 / місяць",
        bonuses: [
          "+$100 за кожні 500 нових верифікованих студентів",
          "+$200 за кожен успішний івент (від 50+ учасників)",
          "+$500 за досягнення планки в 5,000 активних користувачів за квартал",
        ],
        potential: "$2,000–$3,000 / місяць при досягненні амбітних цілей.",
        perks:
          "Прямий менторшип від засновників (growth маркетинг та продукт), потужний нетворкінг серед лідерів університетів та можливість перезапустити культуру студентських побачень.",
      },
      ru: {
        base: "$1,000 / месяц",
        bonuses: [
          "+$100 за каждые 500 подтвержденных студентов на кампусе",
          "+$200 за каждое успешное мероприятие (50+ участников)",
          "+$500 за достижение 5,000 активных пользователей в квартал",
        ],
        potential: "$2,000–$3,000 / месяц при выполнении целей.",
        perks:
          "Прямое менторство от фаундеров (маркетинг и продукт), сильный нетворкинг и возможность изменить культуру студенческих знакомств.",
      },
    },
    howToApply: {
      en: {
        intro: "Message us directly on Telegram: @gennetysupport (or email dating@gennety.com).",
        steps: [
          "Which university you attend and what year you're in",
          "About 2–3 events you've organized (goal, result, what went wrong)",
          "Link to your Instagram / TikTok / Telegram",
          "How you would get the first 100 Gennety users at your university in 1 week with zero budget",
        ],
        note: "Questions? Message us in the same Telegram chat — we are looking for a true partner, not just an executor.",
      },
      uk: {
        intro: "Напиши нам напряму в Telegram: @gennetysupport (або на пошту dating@gennety.com).",
        steps: [
          "В якому університеті та на якому курсі навчаєшся",
          "Про 2–3 івенти, які ти організував(ла) (мета, результат, що пішло не так)",
          "Посилання на твій Instagram / TikTok / Telegram",
          "Як би ти залучив(ла) перших 100 користувачів Gennety у своєму виші за 1 тиждень з нульовим бюджетом",
        ],
        note: "Є питання? Пиши в цей же Telegram-чат — ми шукаємо партнера, а не просто виконавця.",
      },
      ru: {
        intro: "Напиши нам напрямую в Telegram: @gennetysupport (или на почту dating@gennety.com).",
        steps: [
          "В каком вузе и на каком курсе ты учишься",
          "О 2–3 мероприятиях, которые ты организовывал(а) (цель, результат, выводы)",
          "Ссылка на твой Instagram / TikTok / Telegram",
          "Как бы ты привлек(ла) первые 100 пользователей Gennety в своем вузе за 1 неделю с нулевым бюджетом",
        ],
        note: "Вопросы? Пиши в тот же Telegram-чат — мы ищем партнера по развитию, а не просто исполнителя.",
      },
    },
  },
  {
    id: "vacancy-fs-eng",
    titles: {
      en: "Full-Stack Product Engineer",
      uk: "Full-Stack Product Engineer",
      ru: "Full-Stack Product Engineer",
    },
    meta: {
      en: { location: "Remote / Hybrid", type: "Full-time", company: "Gennety" },
      uk: { location: "Remote / Hybrid", type: "Full-time", company: "Gennety" },
      ru: { location: "Remote / Hybrid", type: "Full-time", company: "Gennety" },
    },
    aboutGennety: {
      en: "Gennety turns compatibility into real first dates. We engineer low-latency, responsive web interfaces, Telegram Mini Apps, and matching infrastructure that connects people in the real world.",
      uk: "Gennety перетворює алгоритмічну сумісність на реальні зустрічі. Ми створюємо швидкі веб-інтерфейси, Telegram Mini Apps та надійну архітектуру для офлайн-побачень.",
      ru: "Gennety превращает алгоритмическую совместимость в свидания в реальном мире. Мы разрабатываем быстрые веб-интерфейсы, Telegram Mini Apps и инфраструктуру матчинга.",
    },
    aboutRole: {
      en: {
        summary:
          "Build, profile, and scale core Gennety user touchpoints: Next.js 14+ App Router components, Telegram Mini Apps, real-time matchmaking APIs, and biometric AWS verification.",
        format: "Full-time (Remote / Hybrid)",
        focus: "TypeScript, Next.js, React, Tailwind CSS, PostgreSQL / Neon, Telegram Web Apps",
        start: "ASAP",
      },
      uk: {
        summary:
          "Розробка та масштабування інтерфейсів Gennety: компоненти Next.js 14+ App Router, Telegram Mini Apps, API матчмейкінгу та біометрична верифікація AWS.",
        format: "Full-time (Remote / Hybrid)",
        focus: "TypeScript, Next.js, React, Tailwind CSS, PostgreSQL / Neon, Telegram Web Apps",
        start: "ASAP",
      },
      ru: {
        summary:
          "Разработка и оптимизация интерфейсов Gennety: компоненты Next.js 14+ App Router, Telegram Mini Apps, API матчинга и биометрия AWS.",
        format: "Full-time (Remote / Hybrid)",
        focus: "TypeScript, Next.js, React, Tailwind CSS, PostgreSQL / Neon, Telegram Web Apps",
        start: "ASAP",
      },
    },
    whatYouDo: {
      en: [
        "Craft responsive client components with smooth 60fps micro-interactions and mobile-first touch optimization.",
        "Implement server actions, database schema migrations, and queries on PostgreSQL / Neon.",
        "Build and maintain Telegram Mini Apps with native-like performance and deep Telegram bot integration.",
        "Integrate AWS Rekognition biometric face-liveness check pipelines and secure media uploads.",
        "Maintain clean TypeScript type safety, strict lint standards, and high Core Web Vitals performance.",
      ],
      uk: [
        "Створення клієнтських компонентів з плавними анімаціями 60fps та оптимізацією під мобільні екрани.",
        "Реалізація server actions, структури бази даних та швидких запитів на PostgreSQL / Neon.",
        "Розробка Telegram Mini Apps з нативною продуктивністю та глибокою інтеграцією з ботом.",
        "Інтеграція біометрії AWS Rekognition Face Liveness та безпечного збереження даних.",
        "Підтримка чистоти коду, строгої типізації TypeScript та високих показників Core Web Vitals.",
      ],
      ru: [
        "Создание адаптивных компонентов с плавными 60fps анимациями и адаптацией под мобильные устройства.",
        "Реализация server actions, миграций схем БД и оптимизация запросов на PostgreSQL / Neon.",
        "Разработка Telegram Mini Apps с нативным откликом и глубокой интеграцией с ботом.",
        "Интеграция биометрической верификации AWS Rekognition Face Liveness и защита данных.",
        "Поддержка строгой типизации TypeScript, стандартов линтинга и высоких показателей скорости.",
      ],
    },
    mustHave: {
      en: [
        "3+ years of production experience with modern TypeScript, React, and Next.js App Router.",
        "Strong visual craftsmanship: attention to typography, margins, transitions, and touch responsiveness.",
        "Comfortable with relational databases (PostgreSQL), connection pooling, and indexing.",
        "High autonomy and track record of shipping production-grade consumer web applications.",
      ],
      uk: [
        "3+ роки комерційного досвіду з TypeScript, React та Next.js App Router.",
        "Висока культура інтерфейсів: увага до типографіки, мікроанімацій та мобільного UX.",
        "Впевнена робота з реляційними базами даних (PostgreSQL), індексами та пулінгом з'єднань.",
        "Здатність самостійно приймати інженерні рішення та швидко доставляти код у прод.",
      ],
      ru: [
        "3+ года коммерческого опыта с TypeScript, React и современным Next.js App Router.",
        "Внимание к деталям UI/UX: типографика, микроанимации, жесты и мобильная адаптивность.",
        "Уверенное владение реляционными базами данных (PostgreSQL), индексацией и пулингом.",
        "Высокая инженерная самостоятельность и опыт запуска реальных продуктов.",
      ],
    },
    niceToHave: {
      en: [
        "Experience developing Telegram bots or Telegram Web Apps / Mini Apps.",
        "Knowledge of AWS serverless architecture (Lambda, S3, CloudFront).",
        "Contributions to open-source libraries or self-launched side projects.",
      ],
      uk: [
        "Досвід розробки Telegram-ботів або Telegram Mini Apps.",
        "Знання хмарної інфраструктури AWS (Lambda, S3, CloudFront).",
        "Власні пет-проєкти або внесок в open-source проєкти.",
      ],
      ru: [
        "Опыт создания Telegram-ботов или Telegram Mini Apps.",
        "Опыт работы с облаком AWS (Lambda, S3, CloudFront).",
        "Собственные пет-проекты или контрибьюции в open-source.",
      ],
    },
    whatWeOffer: {
      en: {
        base: "Competitive monthly salary aligned with seniority (Remote / Hybrid)",
        bonuses: [
          "Meaningful early equity/token option pool",
          "Full tooling, hardware, and AI compute allowance",
          "Rapid promotion cycles based on shipped product impact",
        ],
        potential: "Competitive market compensation with high equity upside.",
      },
      uk: {
        base: "Конкурентна щомісячна оплата відповідно до досвіду (Remote / Hybrid)",
        bonuses: [
          "Опціонний пул для ранніх інженерів команди",
          "Повне забезпечення необхідними інструментами та AI API",
          "Швидкий перегляд винагороди за результатами запусків",
        ],
        potential: "Гідна компенсація на рівні ринку з високим потенціалом опціонів.",
      },
      ru: {
        base: "Конкурентная оплата по результатам собеседования (Remote / Hybrid)",
        bonuses: [
          "Опционный пул для ключевых участников команды",
          "Бюджет на технику, сервисы и вычислительные ресурсы",
          "Быстрый пересмотр компенсации по результатам запусков",
        ],
        potential: "Рыночный доход с потенциалом роста через опционы.",
      },
    },
    howToApply: {
      en: {
        intro: "Message us directly on Telegram: @gennetysupport (or email dating@gennety.com).",
        steps: [
          "Links to your GitHub profile or 2 projects you are proud of shipping",
          "Brief description of your role in building them and tech stack used",
          "Your Telegram handle or direct contact",
        ],
        note: "We value shipped code and design taste over traditional resumes.",
      },
      uk: {
        intro: "Напиши нам напряму в Telegram: @gennetysupport (або на пошту dating@gennety.com).",
        steps: [
          "Посилання на GitHub або 2 запущені проєкти, якими ти пишаєшся",
          "Коротко про твою роль у цих проєктах і стек технологій",
          "Твій контакт у Telegram",
        ],
        note: "Ми цінуємо реальний код та увагу до деталей вище за формальні резюме.",
      },
      ru: {
        intro: "Напиши нам напрямую в Telegram: @gennetysupport (или на почту dating@gennety.com).",
        steps: [
          "Ссылки на GitHub или 2 реализованных проекта, которыми ты гордишься",
          "Краткое описание твоего участия и стек технологий",
          "Твой контакт в Telegram",
        ],
        note: "Мы ценим работающий код и внимание к деталям выше шаблонных резюме.",
      },
    },
  },
  {
    id: "vacancy-ai-research",
    titles: {
      en: "AI Matchmaking & Behavioral Researcher",
      uk: "AI Matchmaking & Behavioral Researcher",
      ru: "AI Matchmaking & Behavioral Researcher",
    },
    meta: {
      en: { location: "Remote", type: "Full-time or Contract", company: "Gennety" },
      uk: { location: "Remote", type: "Full-time або Contract", company: "Gennety" },
      ru: { location: "Remote", type: "Full-time или Contract", company: "Gennety" },
    },
    aboutGennety: {
      en: "Gennety is replacing swipe mechanics with intelligent matching. We analyze psychological exports, communication dynamics, and real date outcomes to connect people who truly resonate.",
      uk: "Gennety відмовляється від механіки поверхневих свайпів на користь розумного матчмейкінгу. Ми аналізуємо психологічні профілі та фідбек зі свидань для підбору гармонійних пар.",
      ru: "Gennety заменяет механику бездумных свайпов умным подбором. Мы анализируем психологические профили и отзывы со свиданий, чтобы находить пары с реальной взаимной химией.",
    },
    aboutRole: {
      en: {
        summary:
          "Design the cognitive engine of romance: transforming psychometric profiles, conversation dynamics, and post-date feedback into high-chemistry, authentic matches.",
        format: "Full-time or Contract (Remote)",
        focus: "LLM Orchestration, Semantic Embeddings, Recommender Systems, Vector Search, Behavioral Psychology",
        start: "ASAP",
      },
      uk: {
        summary:
          "Розробка алгоритмічного серця дейтингу: перетворення психологічних профілів, стилю спілкування та відгуків після зустрічей на пари з високою сумісністю.",
        format: "Full-time або контракт (Remote)",
        focus: "LLM-пайплайни, семантичні ембеддінги, рекомендаційні моделі, векторний пошук, поведінкова психологія",
        start: "ASAP",
      },
      ru: {
        summary:
          "Создание алгоритмического ядра романтической совместимости: перевод психометрических данных, динамики общения и отзывов в точные рекомендации.",
        format: "Full-time или контракт (Remote)",
        focus: "LLM-пайплайны, семантические эмбеддинги, рекомендательные системы, векторный поиск, психология",
        start: "ASAP",
      },
    },
    whatYouDo: {
      en: [
        "Design multi-modal semantic embedding spaces and compatibility scoring algorithms.",
        "Build prompt pipelines and personality extraction models from unstructured user inputs.",
        "Analyze real post-date outcome signals to train and iteratively calibrate matching weights.",
        "Develop safety heuristics and anti-fraud anomaly detection to ensure a wholesome community.",
      ],
      uk: [
        "Розробка мультимодальних семантичних просторів та алгоритмів оцінки сумісності.",
        "Побудова промпт-пайплайнів для вилучення особистісних рис із неструктурованого тексту.",
        "Аналіз сигналів після проведених побачень для калібрування ваг рекомендаційного алгоритму.",
        "Створення моделей безпеки та виявлення спаму для захисту учасників спільноти.",
      ],
      ru: [
        "Разработка мультимодальных пространств эмбеддингов и моделей оценки совместимости.",
        "Построение промпт-пайплайнов и извлечение психотипов из неструктурированного текста.",
        "Анализ обратной связи после состоявшихся свиданий для калибровки рекомендаций.",
        "Разработка эвристик безопасности и антифрода для чистоты комьюнити.",
      ],
    },
    mustHave: {
      en: [
        "Demonstrated experience with applied NLP, LLM orchestration (LangChain, DSPy, OpenAI/Anthropic APIs), and vector similarity search (pgvector).",
        "Strong mathematical grounding in recommender systems, ranking models, and empirical testing.",
        "Deep curiosity for relationship psychology, cognitive science, and human attraction dynamics.",
      ],
      uk: [
        "Досвід роботи з прикладним NLP, LLM-інструментами (LangChain, DSPy, API OpenAI/Anthropic) та векторними базами (pgvector).",
        "Математична база в рекомендаційних системах та оцінці точності моделей.",
        "Глибокий інтерес до психології взаємин, когнітивістики та соціальної динаміки.",
      ],
      ru: [
        "Опыт работы с прикладным NLP, LLM-инструментами (LangChain, DSPy, API OpenAI/Anthropic) и векторным поиском (pgvector).",
        "Математическая база в рекомендательных системах, ранжировании и оценке гипотез.",
        "Глубокий интерес к психологии отношений, когнитивным наукам и романтической динамике.",
      ],
    },
    niceToHave: {
      en: [
        "Published research or technical essays on cognitive modeling or matching algorithms.",
        "Experience fine-tuning open-source LLMs on domain-specific datasets.",
      ],
      uk: [
        "Наукові публікації або статті на тему когнітивного моделювання чи теорії матчингу.",
        "Досвід файнтюнінгу відкритих LLM на спеціалізованих датасетах.",
      ],
      ru: [
        "Публикации или статьи по когнитивному моделированию или теории матчинга.",
        "Опыт дообучения открытых LLM под прикладные задачи.",
      ],
    },
    whatWeOffer: {
      en: {
        base: "Competitive salary or contract retainer",
        bonuses: [
          "Performance incentives tied to match conversion and 2nd-date success rates",
          "Full research compute, GPU, and LLM API budget",
          "Opportunity to pioneer a new paradigm in algorithmic matchmaking",
        ],
        potential: "Competitive compensation package with high project upside.",
      },
      uk: {
        base: "Конкурентна оплата або контрактний ретейнер",
        bonuses: [
          "Бонуси за якість матчів та конверсію у повторні побачення",
          "Повний бюджет на обчислювальні потужності, GPU та LLM API",
          "Можливість очолити створення нової парадигми AI-знайомств",
        ],
        potential: "Гідна винагорода з бонусами за якість роботи алгоритму.",
      },
      ru: {
        base: "Конкурентная оплата или контрактный ретейнер",
        bonuses: [
          "Премии за качество рекомендаций и процент вторых свиданий",
          "Полное покрытие затрат на GPU, вычисления и LLM API",
          "Возможность создать передовой алгоритм в индустрии дейтинга",
        ],
        potential: "Высокая компенсация с бонусами за результативность модели.",
      },
    },
    howToApply: {
      en: {
        intro: "Message us directly on Telegram: @gennetysupport (or email dating@gennety.com).",
        steps: [
          "Your background in AI, NLP, or recommender systems",
          "Your thesis on why current dating algorithms fail and how you'd fix it",
          "Links to your research, code repositories, or technical writing",
        ],
        note: "We're building algorithms for real-life chemistry, not infinite addiction.",
      },
      uk: {
        intro: "Напиши нам напряму в Telegram: @gennetysupport (або на пошту dating@gennety.com).",
        steps: [
          "Про твій досвід в AI, NLP або рекомендаційних системах",
          "Твій погляд на те, чому нинішні алгоритми дейтингу неефективні, та як це змінити",
          "Посилання на твої дослідження, код чи публікації",
        ],
        note: "Ми створюємо алгоритми для справжньої хімії, а не для екранної залежності.",
      },
      ru: {
        intro: "Напиши нам напрямую в Telegram: @gennetysupport (или на почту dating@gennety.com).",
        steps: [
          "Твой опыт в AI, NLP или рекомендательных системах",
          "Твой взгляд: почему современные алгоритмы дейтинга не работают и как это исправить",
          "Ссылки на исследования, репозитории с кодом или статьи",
        ],
        note: "Мы создаем алгоритмы для живой химии между людьми, а не для экранного залипания.",
      },
    },
  },
];

export default function CareersPage() {
  const { locale } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>("vacancy-ugc");

  useEffect(() => {
    document.title = "Careers — Gennety";
  }, []);

  const t = headerTexts[locale] || headerTexts.en;

  const toggleVacancy = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getLangField = <T,>(record: Record<string, T>, fallback: T): T => {
    return record[locale] ?? record.en ?? fallback;
  };

  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-magenta selection:text-white">
      {/* Ambient nocturnal photo backdrop matching Gennety subpages */}
      <div
        className="fixed -inset-10 bg-[url('/images/matchmaker-bg-8.jpg')] bg-cover bg-center pointer-events-none filter blur-[36px] opacity-20 z-0 scale-105"
        aria-hidden="true"
      />
      {/* Ambient magenta/velvet aura glow */}
      <div
        className="fixed top-24 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-magenta/15 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Dark overlay for contrast */}
      <div className="fixed -inset-10 bg-midnight/80 z-0 pointer-events-none" />

      <Navbar />

      <div className="w-full flex-grow pt-32 md:pt-36 pb-24 px-4 sm:px-6 md:px-10 box-border relative z-10">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group cursor-pointer self-start"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t.back}</span>
          </Link>

          {/* Careers Header */}
          <header className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-300 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-magenta shadow-[0_0_8px_rgba(139,37,59,0.9)] animate-pulse" />
              <span className="font-medium tracking-wide uppercase text-[11px] text-gray-300">
                {t.badge}
              </span>
            </div>

            <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white lowercase leading-[1.15] flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>{t.title.toLowerCase()}</span>
              <span className="inline-flex items-center justify-center text-center leading-none bg-white text-midnight px-5 py-1.5 rounded-full font-script text-3xl sm:text-4xl md:text-5xl select-none font-normal shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                {t.atGennety}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl leading-relaxed">
              {t.tagline}
            </p>
          </header>

          {/* Expandable Vacancies List */}
          <div className="flex flex-col gap-5">
            {VACANCIES.map((vacancy) => {
              const isExpanded = expandedId === vacancy.id;
              const title = getLangField(vacancy.titles, vacancy.titles.en);
              const meta = getLangField(vacancy.meta, vacancy.meta.en);
              const aboutGennety = getLangField(vacancy.aboutGennety, vacancy.aboutGennety.en);
              const aboutRole = getLangField(vacancy.aboutRole, vacancy.aboutRole.en);
              const whatYouDo = getLangField(vacancy.whatYouDo, vacancy.whatYouDo.en);
              const mustHave = getLangField(vacancy.mustHave, vacancy.mustHave.en);
              const niceToHave = getLangField(vacancy.niceToHave, vacancy.niceToHave.en);
              const whatWeOffer = getLangField(vacancy.whatWeOffer, vacancy.whatWeOffer.en);
              const howToApply = getLangField(vacancy.howToApply, vacancy.howToApply.en);

              return (
                <article
                  key={vacancy.id}
                  className={cn(
                    "group rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden",
                    isExpanded
                      ? "bg-black/60 border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_24px_rgba(139,37,59,0.16)] backdrop-blur-xl"
                      : "bg-black/40 hover:bg-black/50 border-white/[0.1] hover:border-white/20 backdrop-blur-xl"
                  )}
                >
                  {/* Vacancy Row Header */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => toggleVacancy(vacancy.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleVacancy(vacancy.id);
                      }
                    }}
                    className="p-6 md:p-8 cursor-pointer select-none flex items-start sm:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white transition-colors">
                        {title}
                      </h2>
                      {/* Meta Pills */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {meta.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 font-medium">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {meta.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/15 border border-magenta/30 text-white font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_6px_#8B253B]" />
                          {meta.company}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Button / Chevron */}
                    <div className="flex items-center gap-2.5 shrink-0 self-center">
                      <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold text-gray-400 group-hover:text-white transition-colors">
                        {isExpanded ? t.collapse : t.details}
                      </span>
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
                          isExpanded
                            ? "bg-magenta text-white border-magenta shadow-[0_0_15px_rgba(139,37,59,0.5)] rotate-180"
                            : "bg-white/[0.04] text-gray-400 border-white/10 group-hover:bg-white/[0.08] group-hover:text-white"
                        )}
                      >
                        <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.25 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden border-t border-white/[0.08]"
                      >
                        <div className="p-6 md:p-8 pt-6 flex flex-col gap-8">
                          {/* About Gennety */}
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E891A5]">
                              <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_6px_rgba(139,37,59,0.9)]" />
                              <span>{t.aboutGennetyTitle}</span>
                            </div>
                            <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 md:p-5 text-gray-300 text-sm md:text-base leading-relaxed">
                              {aboutGennety.startsWith("Gennety") ? (
                                <>
                                  <strong className="text-white font-semibold">Gennety</strong>
                                  {aboutGennety.slice("Gennety".length)}
                                </>
                              ) : (
                                aboutGennety
                              )}
                            </div>
                          </div>

                          {/* About The Role */}
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E891A5]">
                              <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_6px_rgba(139,37,59,0.9)]" />
                              <span>{t.aboutRoleTitle}</span>
                            </div>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                              {aboutRole.summary}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block mb-1">
                                  {t.format}
                                </span>
                                <span className="text-sm font-medium text-white">
                                  {aboutRole.format}
                                </span>
                              </div>
                              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block mb-1">
                                  {t.focus}
                                </span>
                                <span className="text-sm font-medium text-white">
                                  {aboutRole.focus}
                                </span>
                              </div>
                              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block mb-1">
                                  {t.startDate}
                                </span>
                                <span className="text-sm font-medium text-white">
                                  {aboutRole.start}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* What You'll Do */}
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E891A5]">
                              <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_6px_rgba(139,37,59,0.9)]" />
                              <span>{t.whatYouDoTitle}</span>
                            </div>
                            <ul className="grid grid-cols-1 gap-3">
                              {whatYouDo.map((item, idx) => {
                                const colonIdx = item.indexOf(":");
                                const boldPart = colonIdx !== -1 ? item.substring(0, colonIdx + 1) : null;
                                const restPart = colonIdx !== -1 ? item.substring(colonIdx + 1) : item;
                                return (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D44D6B] mt-2.5 shrink-0 shadow-[0_0_6px_rgba(139,37,59,0.8)]" />
                                    <div>
                                      {boldPart && (
                                        <strong className="text-white font-semibold">{boldPart}</strong>
                                      )}
                                      <span>{restPart}</span>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          {/* What We're Looking For (2-column split) */}
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E891A5]">
                              <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_6px_rgba(139,37,59,0.9)]" />
                              <span>{t.lookingForTitle}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Must Have Card */}
                              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                                  <CheckCircle2 className="w-4 h-4 text-[#E06D85]" />
                                  <span>{t.mustHave}</span>
                                </div>
                                <ul className="space-y-3">
                                  {mustHave.map((item, idx) => {
                                    const colonIdx = item.indexOf(":");
                                    const boldPart = colonIdx !== -1 ? item.substring(0, colonIdx + 1) : null;
                                    const restPart = colonIdx !== -1 ? item.substring(colonIdx + 1) : item;
                                    return (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed"
                                      >
                                        <span className="text-gray-500 font-bold shrink-0 mt-0.5">•</span>
                                        <div>
                                          {boldPart && (
                                            <strong className="text-white font-medium">{boldPart}</strong>
                                          )}
                                          <span>{restPart}</span>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>

                              {/* Nice To Have Card */}
                              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
                                  <Sparkles className="w-4 h-4 text-gray-400" />
                                  <span>{t.niceToHave}</span>
                                </div>
                                <ul className="space-y-3">
                                  {niceToHave.map((item, idx) => {
                                    const colonIdx = item.indexOf(":");
                                    const boldPart = colonIdx !== -1 ? item.substring(0, colonIdx + 1) : null;
                                    const restPart = colonIdx !== -1 ? item.substring(colonIdx + 1) : item;
                                    return (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed"
                                      >
                                        <span className="text-gray-500 font-bold shrink-0 mt-0.5">•</span>
                                        <div>
                                          {boldPart && (
                                            <strong className="text-white font-medium">{boldPart}</strong>
                                          )}
                                          <span>{restPart}</span>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* What We Offer */}
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E891A5]">
                              <span className="w-1.5 h-1.5 rounded-full bg-magenta shadow-[0_0_6px_rgba(139,37,59,0.9)]" />
                              <span>{t.whatWeOfferTitle}</span>
                            </div>
                            <div className="bg-gradient-to-br from-magenta/20 via-white/[0.03] to-white/[0.01] border border-magenta/35 rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                              <div>
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block mb-1">
                                  {t.baseSalary}
                                </span>
                                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                  {whatWeOffer.base}
                                </div>
                              </div>

                              {whatWeOffer.bonuses && whatWeOffer.bonuses.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                  <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block">
                                    {t.bonuses}
                                  </span>
                                  <ul className="space-y-1.5">
                                    {whatWeOffer.bonuses.map((bonus, bIdx) => (
                                      <li
                                        key={bIdx}
                                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-300"
                                      >
                                        <span className="text-[#E06D85] font-bold shrink-0">✦</span>
                                        <span className="text-white/95 font-medium">{bonus}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="pt-2 border-t border-white/10">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block mb-0.5">
                                  {t.totalPotential}
                                </span>
                                <div className="text-base sm:text-lg font-bold text-white">
                                  {whatWeOffer.potential}
                                </div>
                              </div>

                              {whatWeOffer.perks && (
                                <div className="pt-2 border-t border-white/10 text-xs sm:text-sm text-gray-300 leading-relaxed">
                                  <strong className="text-white font-semibold">
                                    {t.perks}:
                                  </strong>{" "}
                                  {whatWeOffer.perks}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* How To Apply */}
                          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-lg font-bold text-white tracking-tight">
                                {t.howToApplyTitle}
                              </h3>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {howToApply.intro}
                              </p>
                            </div>

                            {/* Steps */}
                            <div className="space-y-2">
                              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block">
                                {t.includeInMessage}
                              </span>
                              <div className="space-y-2">
                                {howToApply.steps.map((st, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="flex items-start gap-3 text-sm text-gray-300 bg-black/30 border border-white/5 rounded-xl p-3"
                                  >
                                    <span className="w-6 h-6 rounded-full bg-white/10 text-white font-semibold text-xs flex items-center justify-center shrink-0">
                                      {sIdx + 1}
                                    </span>
                                    <span className="leading-snug pt-0.5 text-white/90 font-medium">
                                      {st}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons: Telegram + Email */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                              <a
                                href={TELEGRAM_SUPPORT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#8B253B] hover:bg-[#A3304A] text-white font-semibold text-sm transition-all shadow-neon-sm hover:shadow-neon cursor-pointer"
                              >
                                <TelegramIcon className="w-4 h-4 fill-current" />
                                <span>{t.applyTelegram}</span>
                              </a>
                              <a
                                href={`mailto:${CONTACT_EMAIL}?subject=Application: ${encodeURIComponent(title)}`}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-sm font-medium transition-colors cursor-pointer"
                              >
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>
                                  {t.orEmail} {CONTACT_EMAIL}
                                </span>
                              </a>
                            </div>

                            <p className="text-xs text-gray-400 italic">
                              {howToApply.note}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>

          {/* Careers Footer Note Card */}
          <div className="rounded-2xl md:rounded-3xl bg-black/45 border border-white/[0.1] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-xl">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold text-white mb-1">{t.footerTitle}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t.footerNote}</p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=General Application`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-black" />
              <span>{t.footerContact}</span>
            </a>
          </div>
        </div>
      </div>

      <Footer theme="dark" />
    </main>
  );
}
