"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  Rocket,
  HeartHandshake,
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

// --- Localized Page UI Strings ---
const uiStrings: Record<Locale, {
  back: string;
  badge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  stats: { value: string; label: string }[];
  cultureTitle: string;
  cultureSubtitle: string;
  cultureCards: { title: string; desc: string }[];
  openingsTitle: string;
  openingsSubtitle: string;
  categories: { id: string; label: string }[];
  detailsBtn: string;
  hideBtn: string;
  aboutRoleTitle: string;
  responsibilitiesTitle: string;
  mustHaveTitle: string;
  niceToHaveTitle: string;
  compensationTitle: string;
  howToApplyTitle: string;
  applyTelegram: string;
  applyEmail: string;
  openAppTitle: string;
  openAppSubtitle: string;
  openAppCtaTelegram: string;
  openAppCtaEmail: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: { num: string; title: string; desc: string }[];
}> = {
  en: {
    back: "Back to Home",
    badge: "We're Hiring · 4 Open Positions",
    heroTitlePrefix: "build the future of",
    heroTitleHighlight: "real connection",
    heroSubtitle:
      "Gennety replaces endless swiping and awkward ghosting with real-life, curated dates for students and ambitious people. We are a fast, high-autonomy squad solving modern loneliness.",
    stats: [
      { value: "1,000+", label: "Dates arranged" },
      { value: "100%", label: "Biometrically verified" },
      { value: "48–72h", label: "Fast hiring decisions" },
      { value: "Remote / Hybrid", label: "Global student hubs" },
    ],
    cultureTitle: "Why build Gennety with us?",
    cultureSubtitle: "We care about raw impact, authentic chemistry, and shipping with extreme velocity.",
    cultureCards: [
      {
        title: "Real Dates Over Screen Time",
        desc: "Traditional dating apps profit off keeping people lonely and glued to screens. We measure success by two humans having an unforgettable offline date.",
      },
      {
        title: "High Autonomy & Zero Red Tape",
        desc: "No middle management or 5-round approvals. You own your domain, run fast experiments, shoot creative concepts, and deploy code directly.",
      },
      {
        title: "Asymmetric Upside & Transparent Pay",
        desc: "Fair monthly base compensation paired with clear performance bonuses on active user growth, winning creatives, and campus milestones.",
      },
    ],
    openingsTitle: "Open Positions",
    openingsSubtitle: "Find where your superpower makes the biggest impact.",
    categories: [
      { id: "all", label: "All Roles" },
      { id: "growth", label: "Growth & Creator" },
      { id: "campus", label: "Campus & Community" },
      { id: "engineering", label: "Engineering" },
      { id: "ai", label: "AI & Behavioral" },
    ],
    detailsBtn: "View Details",
    hideBtn: "Collapse",
    aboutRoleTitle: "About the Role",
    responsibilitiesTitle: "What You'll Do",
    mustHaveTitle: "Must-Have",
    niceToHaveTitle: "Nice to Have",
    compensationTitle: "Compensation & Bonuses",
    howToApplyTitle: "How to Apply",
    applyTelegram: "Apply via Telegram",
    applyEmail: "Apply via Email",
    openAppTitle: "Don't see your exact role?",
    openAppSubtitle:
      "We always have room for extraordinary builders, designers, hackers, and community leaders. If you are passionate about reshaping modern romance, pitch us directly.",
    openAppCtaTelegram: "Message @gennetysupport",
    openAppCtaEmail: "Email dating@gennety.com",
    processTitle: "Simple, Transparent Hiring",
    processSubtitle: "We respect your time. No 6-round marathons or automated resume rejections.",
    processSteps: [
      {
        num: "01",
        title: "Direct Intro",
        desc: "Send a Telegram message or short email with what you've built, scripted, or launched. No 3-page generic cover letters.",
      },
      {
        num: "02",
        title: "Practical Jam Session",
        desc: "A 30-min conversation exploring your past work, creative instincts, and collaborating on a real Gennety problem together.",
      },
      {
        num: "03",
        title: "Paid Trial Sprint & Offer",
        desc: "We validate mutual chemistry through a small, paid real-world sprint. We make offers within 48–72 hours.",
      },
    ],
  },
  uk: {
    back: "Назад на головну",
    badge: "Ми наймаємо · 4 відкриті вакансії",
    heroTitlePrefix: "будуємо майбутнє",
    heroTitleHighlight: "справжніх побачень",
    heroSubtitle:
      "Gennety замінює нескінченні свайпи та ігнор реальними живими побаченнями для студентів. Ми невелика, швидка команда з високою автономією, яка вирішує проблему самотності.",
    stats: [
      { value: "1,000+", label: "Організованих побачень" },
      { value: "100%", label: "Верифіковані люди (Face ID)" },
      { value: "48–72 год", label: "Швидкі рішення по найму" },
      { value: "Remote / Hybrid", label: "Кампус-хаби в Києві" },
    ],
    cultureTitle: "Чому варто будувати Gennety з нами?",
    cultureSubtitle: "Ми цінуємо реальний вплив, справжню хімію та швидкість запуску.",
    cultureCards: [
      {
        title: "Справжні зустрічі замість екранного часу",
        desc: "Звичайні дейтинг-додатки заробляють на тому, щоб тримати людей у додатку. Наша метрика успіху — двоє людей на класному живому побаченні.",
      },
      {
        title: "Повна автономія без бюрократії",
        desc: "Жодного мікроменеджменту та довгих узгоджень. Ти самостійно ведеш напрямок, тестуєш креативи, організовуєш івенти або пушиш код.",
      },
      {
        title: "Прозорий дохід та бонуси за результат",
        desc: "Фіксована щомісячна ставка плюс чіткі бонуси за ріст активних користувачів, вірусні формати та досягнення цілей.",
      },
    ],
    openingsTitle: "Відкриті вакансії",
    openingsSubtitle: "Обери роль, де твій талант принесе найбільший результат.",
    categories: [
      { id: "all", label: "Усі вакансії" },
      { id: "growth", label: "Growth & Креатив" },
      { id: "campus", label: "Кампус & Спільнота" },
      { id: "engineering", label: "Розробка" },
      { id: "ai", label: "AI & Алгоритми" },
    ],
    detailsBtn: "Детальніше",
    hideBtn: "Згорнути",
    aboutRoleTitle: "Про роль",
    responsibilitiesTitle: "Що ти робитимеш",
    mustHaveTitle: "Обов'язково",
    niceToHaveTitle: "Буде плюсом",
    compensationTitle: "Компенсація та бонуси",
    howToApplyTitle: "Як податися",
    applyTelegram: "Податись у Telegram",
    applyEmail: "Податись через Email",
    openAppTitle: "Не знайшов своєї позиції?",
    openAppSubtitle:
      "Ми завжди відкриті до талановитих інженерів, контент-мейкерів, дизайнерів та лідерів спільнот. Розкажи, як ти можеш підсилити Gennety.",
    openAppCtaTelegram: "Написати @gennetysupport",
    openAppCtaEmail: "Написати на dating@gennety.com",
    processTitle: "Простий та прозорий найм",
    processSubtitle: "Ми поважаємо твій час. Жодних 5-ти етапних співбесід чи шаблонних відмов.",
    processSteps: [
      {
        num: "01",
        title: "Коротке знайомство",
        desc: "Напиши в Telegram або на email, додавши посилання на свої роботи або кейси. Без 3-сторінкових нудних резюме.",
      },
      {
        num: "02",
        title: "Практична розмова",
        desc: "30 хвилин невимушеного спілкування про твій досвід, бачення продукту та реальну задачу Gennety.",
      },
      {
        num: "03",
        title: "Оплачуваний спрінт та офер",
        desc: "Перевіряємо спільну роботу на невеликому тестовому спрінті. Приймаємо рішення за 48–72 години.",
      },
    ],
  },
  ru: {
    back: "Назад на главную",
    badge: "Мы нанимаем · 4 открытые вакансии",
    heroTitlePrefix: "строим будущее",
    heroTitleHighlight: "реальных свиданий",
    heroSubtitle:
      "Gennety заменяет бесконечные свайпы и гостинг настоящими свиданиями для студентов. Мы компактная, быстрая команда с высокой автономностью, побеждающая современное одиночество.",
    stats: [
      { value: "1,000+", label: "Организованных свиданий" },
      { value: "100%", label: "Верифицированные люди (Face ID)" },
      { value: "48–72ч", label: "Быстрые решения по найму" },
      { value: "Remote / Hybrid", label: "Студенческие хабы" },
    ],
    cultureTitle: "Почему стоит создавать Gennety с нами?",
    cultureSubtitle: "Мы ценим реальный результат, живую химию и скорость запусков.",
    cultureCards: [
      {
        title: "Живые встречи вместо экранного времени",
        desc: "Обычные дейтинги наживаются на удержании людей в экранах. Наш показатель победы — двое людей на запоминающемся свидании вживую.",
      },
      {
        title: "Полная автономность и ноль бюрократии",
        desc: "Никаких лишних менеджеров и долгих согласований. Ты сам руководишь направлением, тестируешь гипотезы и запускаешь креативы.",
      },
      {
        title: "Прозрачный доход и бонусы за рост",
        desc: "Фиксированная ставка плюс ощутимые бонусы за рост аудитории, победившие креативы и успехи в университетах.",
      },
    ],
    openingsTitle: "Открытые позиции",
    openingsSubtitle: "Выбери направление, где твой талант принесет максимум пользы.",
    categories: [
      { id: "all", label: "Все позиции" },
      { id: "growth", label: "Growth & Креатив" },
      { id: "campus", label: "Кампус & Сообщество" },
      { id: "engineering", label: "Разработка" },
      { id: "ai", label: "AI & Модели матчинга" },
    ],
    detailsBtn: "Подробнее",
    hideBtn: "Свернуть",
    aboutRoleTitle: "О роли",
    responsibilitiesTitle: "Что предстоит делать",
    mustHaveTitle: "Требования",
    niceToHaveTitle: "Будет плюсом",
    compensationTitle: "Оплата и бонусы",
    howToApplyTitle: "Как откликнуться",
    applyTelegram: "Откликнуться в Telegram",
    applyEmail: "Откликнуться по Email",
    openAppTitle: "Не нашёл подходящей вакансии?",
    openAppSubtitle:
      "Мы всегда ищем сильных инженеров, креаторов, дизайнеров и лидеров сообществ. Напиши нам и расскажи, как ты можешь усилить Gennety.",
    openAppCtaTelegram: "Написать в @gennetysupport",
    openAppCtaEmail: "Написать на dating@gennety.com",
    processTitle: "Простой и прозрачный найм",
    processSubtitle: "Мы ценим время. Никаких бесконечных раундов и шаблонных отказов.",
    processSteps: [
      {
        num: "01",
        title: "Короткое знакомство",
        desc: "Напиши нам в Telegram или на почту со ссылками на свои проекты или контент. Без длинных шаблонных резюме.",
      },
      {
        num: "02",
        title: "Практическая беседа",
        desc: "30 минут живого диалога о твоем опыте, идеях для Gennety и реальной задаче из практики.",
      },
      {
        num: "03",
        title: "Оплачиваемый триал и оффер",
        desc: "Проверяем совпадение на небольшом оплачиваемом спринте. Решение принимаем за 48–72 часа.",
      },
    ],
  },
  de: {
    back: "Zurück zur Startseite",
    badge: "Wir stellen ein · 4 Offene Stellen",
    heroTitlePrefix: "baue die zukunft von",
    heroTitleHighlight: "echten dates",
    heroSubtitle: "Gennety ersetzt endloses Wischen durch echte, kuratierte Treffen für Studierende. Werde Teil unseres Teams.",
    stats: [
      { value: "1,000+", label: "Organisierte Dates" },
      { value: "100%", label: "Verifizierte Profile" },
      { value: "48–72h", label: "Schnelle Entscheidungen" },
      { value: "Remote / Hybrid", label: "Campus Hubs" },
    ],
    cultureTitle: "Warum Gennety?",
    cultureSubtitle: "Wir setzen auf echte Verbindungen, hohe Autonomie und maximale Geschwindigkeit.",
    cultureCards: [
      { title: "Echte Dates statt Bildschirmzeit", desc: "Wir messen Erfolg an echten Treffen im echten Leben." },
      { title: "Volle Autonomie & Schnelligkeit", desc: "Keine Bürokratie. Du übernimmst direkte Verantwortung für deine Ideen." },
      { title: "Faire Vergütung & Bonussystem", desc: "Faire Grundvergütung plus klare Erfolgsboni bei Nutzerwachstum." },
    ],
    openingsTitle: "Offene Stellen",
    openingsSubtitle: "Finde die Rolle, die zu deinen Stärken passt.",
    categories: [
      { id: "all", label: "Alle Stellen" },
      { id: "growth", label: "Growth & Creator" },
      { id: "campus", label: "Campus & Community" },
      { id: "engineering", label: "Engineering" },
      { id: "ai", label: "KI & Matching" },
    ],
    detailsBtn: "Details ansehen",
    hideBtn: "Schließen",
    aboutRoleTitle: "Über die Rolle",
    responsibilitiesTitle: "Deine Aufgaben",
    mustHaveTitle: "Voraussetzungen",
    niceToHaveTitle: "Von Vorteil",
    compensationTitle: "Vergütung & Boni",
    howToApplyTitle: "Bewerbung",
    applyTelegram: "Bewerben via Telegram",
    applyEmail: "Bewerben via E-Mail",
    openAppTitle: "Keine passende Stelle gefunden?",
    openAppSubtitle: "Wir sind immer offen für außergewöhnliche Talente. Schreib uns direkt.",
    openAppCtaTelegram: "Nachricht an @gennetysupport",
    openAppCtaEmail: "E-Mail an dating@gennety.com",
    processTitle: "Unser Bewerbungsprozess",
    processSubtitle: "Direkt, transparent und ohne zeitraubende bürokratische Hürden.",
    processSteps: [
      { num: "01", title: "Kurze Vorstellung", desc: "Schreib uns auf Telegram oder per Mail mit deinen bisherigen Arbeiten." },
      { num: "02", title: "Praktisches Gespräch", desc: "Ein entspanntes 30-minütiges Gespräch über deine Ideen für Gennety." },
      { num: "03", title: "Bezahlter Test & Angebot", desc: "Schneller Probelauf und finale Zusage innerhalb von 48–72 Stunden." },
    ],
  },
  pl: {
    back: "Powrót do strony głównej",
    badge: "Rekrutujemy · 4 otwarte pozycje",
    heroTitlePrefix: "twórzmy przyszłość",
    heroTitleHighlight: "prawdziwych randek",
    heroSubtitle: "Gennety zastępuje bezsensowne przesuwanie prawdziwymi spotkaniami dla studentów. Dołącz do nas.",
    stats: [
      { value: "1,000+", label: "Umówionych randek" },
      { value: "100%", label: "Zweryfikowani użytkownicy" },
      { value: "48–72h", label: "Szybka decyzja" },
      { value: "Remote / Hybrid", label: "Huby akademickie" },
    ],
    cultureTitle: "Dlaczego warto tworzyć Gennety z nami?",
    cultureSubtitle: "Cenimy realny wpływ na relacje, autonomię i szybkie tempo działania.",
    cultureCards: [
      { title: "Prawdziwe randki zamiast ekranu", desc: "Nasz sukces to dwoje ludzi na udanym spotkaniu offline." },
      { title: "Pełna autonomia bez biurokracji", desc: "Zero zbędnych spotkań. Samodzielnie realizujesz swoje pomysły." },
      { title: "Przejrzyste wynagrodzenie i premie", desc: "Stabilna podstawa oraz wysokie bonusy za wyniki i wzrost." },
    ],
    openingsTitle: "Otwarte rekrutacje",
    openingsSubtitle: "Wybierz obszar, w którym najlepiej rozwiniesz skrzydła.",
    categories: [
      { id: "all", label: "Wszystkie" },
      { id: "growth", label: "Growth & Twórcy" },
      { id: "campus", label: "Kampus & Społeczność" },
      { id: "engineering", label: "Programowanie" },
      { id: "ai", label: "AI & Algorytmy" },
    ],
    detailsBtn: "Szczegóły",
    hideBtn: "Zwiń",
    aboutRoleTitle: "O stanowisku",
    responsibilitiesTitle: "Zakres obowiązków",
    mustHaveTitle: "Wymagania",
    niceToHaveTitle: "Mile widziane",
    compensationTitle: "Wynagrodzenie i premie",
    howToApplyTitle: "Jak aplikować",
    applyTelegram: "Aplikuj przez Telegram",
    applyEmail: "Aplikuj przez E-mail",
    openAppTitle: "Nie widzisz idealnej roli dla siebie?",
    openAppSubtitle: "Zawsze chętnie rozmawiamy z utalentowanymi ludźmi. Napisz do nas bezpośrednio.",
    openAppCtaTelegram: "Napisz na @gennetysupport",
    openAppCtaEmail: "Napisz na dating@gennety.com",
    processTitle: "Prosty proces rekrutacji",
    processSubtitle: "Szanujemy Twój czas — bez wieloetapowych korporacyjnych maratonów.",
    processSteps: [
      { num: "01", title: "Krótka wiadomość", desc: "Napisz na Telegramie lub mailowo, pokazując swoje dotychczasowe projekty." },
      { num: "02", title: "Rozmowa praktyczna", desc: "30-minutowa luźna rozmowa o Gennety i realnych wyzwaniach." },
      { num: "03", title: "Płatny sprint i oferta", desc: "Krótki płatny projekt próbny i decyzja w 48–72 godziny." },
    ],
  },
  fr: {
    back: "Retour à l'accueil",
    badge: "Nous recrutons · 4 postes ouverts",
    heroTitlePrefix: "construisons le futur des",
    heroTitleHighlight: "vraies rencontres",
    heroSubtitle: "Gennety remplace le swipe superficiel par de vrais rendez-vous pour étudiants.",
    stats: [
      { value: "1,000+", label: "Rendez-vous organisés" },
      { value: "100%", label: "Vérifiés par selfie 3D" },
      { value: "48–72h", label: "Décision rapide" },
      { value: "Remote / Hybrid", label: "Hubs étudiants" },
    ],
    cultureTitle: "Pourquoi nous rejoindre ?",
    cultureSubtitle: "Nous valorisons l'impact réel, la vitesse et l'autonomie.",
    cultureCards: [
      { title: "Des rendez-vous réels", desc: "Notre métrique est simple : deux personnes qui se rencontrent dans la vraie vie." },
      { title: "Autonomie et rapidité", desc: "Zéro bureaucratie. Vous menez vos projets de A à Z." },
      { title: "Rémunération transparente", desc: "Salaire de base compétitif et primes de croissance sans plafond." },
    ],
    openingsTitle: "Postes ouverts",
    openingsSubtitle: "Trouvez le rôle où vos compétences feront la différence.",
    categories: [
      { id: "all", label: "Tous les postes" },
      { id: "growth", label: "Growth & Créateurs" },
      { id: "campus", label: "Campus & Communauté" },
      { id: "engineering", label: "Ingénierie" },
      { id: "ai", label: "IA & Matching" },
    ],
    detailsBtn: "Voir les détails",
    hideBtn: "Masquer",
    aboutRoleTitle: "À propos du poste",
    responsibilitiesTitle: "Vos missions",
    mustHaveTitle: "Prérequis",
    niceToHaveTitle: "Les plus",
    compensationTitle: "Rémunération & Primes",
    howToApplyTitle: "Comment postuler",
    applyTelegram: "Postuler via Telegram",
    applyEmail: "Postuler par Email",
    openAppTitle: "Vous ne trouvez pas votre poste ?",
    openAppSubtitle: "Nous sommes toujours en quête de créateurs et développeurs talentueux. Contactez-nous.",
    openAppCtaTelegram: "Message sur @gennetysupport",
    openAppCtaEmail: "Email à dating@gennety.com",
    processTitle: "Recrutement simple et rapide",
    processSubtitle: "Pas de processus interminable : réponse claire sous 48 à 72 heures.",
    processSteps: [
      { num: "01", title: "Introduction directe", desc: "Un message sur Telegram ou email avec vos projets concrets." },
      { num: "02", title: "Échange pratique", desc: "30 minutes pour échanger sur vos idées et notre produit." },
      { num: "03", title: "Sprint rémunéré & Offre", desc: "Un court sprint rémunéré pour valider l'alchimie d'équipe." },
    ],
  },
  it: {
    back: "Torna alla Home",
    badge: "Stiamo assumendo · 4 posizioni aperte",
    heroTitlePrefix: "costruiamo il futuro dei",
    heroTitleHighlight: "veri appuntamenti",
    heroSubtitle: "Gennety sostituisce lo swipe compulsivo con veri appuntamenti dal vivo per studenti.",
    stats: [
      { value: "1,000+", label: "Appuntamenti organizzati" },
      { value: "100%", label: "Verifica biometrica" },
      { value: "48–72h", label: "Decisione rapida" },
      { value: "Remote / Hybrid", label: "Campus Hubs" },
    ],
    cultureTitle: "Perché unirti a Gennety?",
    cultureSubtitle: "Puntiamo su incontri reali, forte autonomia e velocità di esecuzione.",
    cultureCards: [
      { title: "Incontri dal vivo prima di tutto", desc: "Misuriamo il successo in appuntamenti reali, non ore trascorse sullo schermo." },
      { title: "Piena autonomia senza burocrazia", desc: "Zero intermediari. Sperimenta, lancia idee e spedisci codice liberamente." },
      { title: "Compenso trasparente e bonus", desc: "Base mensile fissa con bonus collegati all'acquisizione e alla crescita." },
    ],
    openingsTitle: "Posizioni aperte",
    openingsSubtitle: "Scopri dove fare la differenza.",
    categories: [
      { id: "all", label: "Tutte le posizioni" },
      { id: "growth", label: "Growth & Creator" },
      { id: "campus", label: "Campus & Community" },
      { id: "engineering", label: "Ingegneria" },
      { id: "ai", label: "AI & Algoritmi" },
    ],
    detailsBtn: "Dettagli",
    hideBtn: "Chiudi",
    aboutRoleTitle: "Sul ruolo",
    responsibilitiesTitle: "Cosa farai",
    mustHaveTitle: "Requisiti",
    niceToHaveTitle: "Requisiti graditi",
    compensationTitle: "Compenso e bonus",
    howToApplyTitle: "Come candidarsi",
    applyTelegram: "Candidati su Telegram",
    applyEmail: "Candidati via Email",
    openAppTitle: "Non trovi la posizione adatta?",
    openAppSubtitle: "Cerchiamo sempre persone motivate e fuori dal comune. Scrivici direttamente.",
    openAppCtaTelegram: "Messaggio su @gennetysupport",
    openAppCtaEmail: "Email a dating@gennety.com",
    processTitle: "Processo di selezione rapido",
    processSubtitle: "Trasparente, diretto e senza lunghi giri di parole.",
    processSteps: [
      { num: "01", title: "Primo contatto", desc: "Scrivici su Telegram o email allegando i tuoi progetti e risultati." },
      { num: "02", title: "Chiacchierata pratica", desc: "30 minuti per conoscerci ed esaminare una vera sfida Gennety." },
      { num: "03", title: "Prova retribuita e offerta", desc: "Breve test retribuito ed esito definitivo in 48–72 ore." },
    ],
  },
  es: {
    back: "Volver al inicio",
    badge: "Estamos contratando · 4 vacantes abiertas",
    heroTitlePrefix: "construyendo el futuro de",
    heroTitleHighlight: "citas reales",
    heroSubtitle: "Gennety sustituye el deslizamiento superficial por citas presenciales reales para estudiantes.",
    stats: [
      { value: "1,000+", label: "Citas organizadas" },
      { value: "100%", label: "Verificación biométrica" },
      { value: "48–72h", label: "Decisión ágil" },
      { value: "Remote / Hybrid", label: "Hubs de campus" },
    ],
    cultureTitle: "¿Por qué unirte a Gennety?",
    cultureSubtitle: "Apostamos por conexiones humanas reales, alta autonomía y agilidad.",
    cultureCards: [
      { title: "Citas reales frente a la pantalla", desc: "El éxito para nosotros es que dos personas disfruten de una cita en el mundo real." },
      { title: "Autonomía total y agilidad", desc: "Cero burocracia. Eres dueño de tus iniciativas y experimentos." },
      { title: "Remuneración clara y bonificaciones", desc: "Sueldo base más incentivos por captación de usuarios y metas." },
    ],
    openingsTitle: "Vacantes abiertas",
    openingsSubtitle: "Encuentra el puesto ideal para tu talento.",
    categories: [
      { id: "all", label: "Todas las vacantes" },
      { id: "growth", label: "Growth & Creadores" },
      { id: "campus", label: "Campus & Comunidad" },
      { id: "engineering", label: "Ingeniería" },
      { id: "ai", label: "IA & Matching" },
    ],
    detailsBtn: "Ver detalles",
    hideBtn: "Plegar",
    aboutRoleTitle: "Sobre el puesto",
    responsibilitiesTitle: "Responsabilidades",
    mustHaveTitle: "Requisitos imprescindibles",
    niceToHaveTitle: "Requisitos deseables",
    compensationTitle: "Compensación y bonos",
    howToApplyTitle: "Cómo postularte",
    applyTelegram: "Postularse por Telegram",
    applyEmail: "Postularse por Email",
    openAppTitle: "¿No encuentras tu puesto ideal?",
    openAppSubtitle: "Siempre buscamos perfiles sobresalientes. Cuéntanos cómo puedes aportar a Gennety.",
    openAppCtaTelegram: "Mensaje a @gennetysupport",
    openAppCtaEmail: "Email a dating@gennety.com",
    processTitle: "Proceso de contratación simple",
    processSubtitle: "Sin formularios interminables ni filtros automáticos.",
    processSteps: [
      { num: "01", title: "Contacto directo", desc: "Escríbenos por Telegram o correo con enlaces a tus trabajos y proyectos." },
      { num: "02", title: "Charla práctica", desc: "30 minutos para conocernos y resolver un reto real de Gennety." },
      { num: "03", title: "Sprint remunerado y oferta", desc: "Una breve prueba remunerada y decisión en 48–72 horas." },
    ],
  },
};

// --- Vacancies Data ---
interface Vacancy {
  id: string;
  category: "growth" | "campus" | "engineering" | "ai";
  department: string;
  location: string;
  type: string;
  compPill: string;
  titles: Record<string, string>;
  summaries: Record<string, string>;
  about: Record<string, string>;
  responsibilities: Record<string, string[]>;
  mustHave: Record<string, string[]>;
  niceToHave: Record<string, string[]>;
  compensationDetails: Record<string, string>;
  applyPrompt: Record<string, string>;
  telegramMessage: string;
  emailSubject: string;
}

const VACANCIES: Vacancy[] = [
  {
    id: "ugc-growth",
    category: "growth",
    department: "Growth & Creative Marketing",
    location: "Remote",
    type: "Full-time",
    compPill: "$1,000/mo + Performance Bonuses ($1,500–$3,000+/mo)",
    titles: {
      en: "UGC & TikTok Growth Manager",
      uk: "UGC & TikTok Growth Manager",
      ru: "UGC & TikTok Growth Manager",
    },
    summaries: {
      en: "Build and scale Gennety's creator growth engine across TikTok and Reels: from sourcing creators and writing viral hooks to running rapid creative experiments and scaling winning ad angles.",
      uk: "Побудова та масштабування креативного генератора зростання Gennety в TikTok та Reels: від пошуку креаторів і вірусних хуків до швидких A/B тестів та масштабування реклами.",
      ru: "Построение и масштабирование системы роста через креаторов в TikTok и Reels: от поиска креаторов и цепляющих хуков до быстрых экспериментов и масштабирования связок.",
    },
    about: {
      en: "Gennety turns student compatibility into real-life dates — no endless swiping or ghosting. We are building a high-velocity creator-driven acquisition engine to scale Gennety across university cities and global youth markets.",
      uk: "Gennety перетворює сумісність на реальні побачення без нескінченного свайпінгу. Ми будуємо швидку систему залучення користувачів через креаторів для масштабування в університетах та молодіжних містах.",
      ru: "Gennety превращает совместимость в реальные свидания без бесконечных свайпов. Мы строим быструю систему привлечения через креаторов для масштабирования в университетских городах.",
    },
    responsibilities: {
      en: [
        "Trend research & ideation: systematically analyze TikTok, Reels, and competitor dating apps to uncover viral hooks, formats, and high-converting angles.",
        "Scriptwriting & briefs: write native hooks (first 1–3s), storytelling structures, and CTAs, turning each concept into 5–20 high-energy variations.",
        "Creator pipeline management: source, recruit, brief, and coordinate a network of 15–30+ TikTok creators and micro-influencers.",
        "High-velocity creative testing: launch rapid experiment loops (100+ creative variations per month) — test fast, kill losing creatives, scale winners.",
        "Performance analytics: track conversion funnels (CTR, CAC, CPI, activation rate, date completion), scale winning campaigns across international student markets.",
      ],
      uk: [
        "Дослідження трендів: системний аналіз TikTok, Reels та конкурентів для пошуку вірусних хуків та конверсійних форматів.",
        "Сценарії та бріфи: написання нативних хуків (перші 1–3 секунди), сторітелінгу та CTA, створення від 5 до 20 варіацій на кожен концепт.",
        "Менеджмент бази креаторів: пошук, онбординг, бріфінг та координація 15–30+ TikTok-кріейторів та мікро-інфлюенсерів.",
        "Швидке тестування гіпотез: регулярні цикли експериментів (100+ варіацій на місяць) — швидкий тест, відсікання неефективного, масштабування переможців.",
        "Аналітика перформансу: моніторинг воронки (CTR, CAC, CPI, конверсія в перше побачення) та масштабування на нові ринки.",
      ],
      ru: [
        "Анализ трендов: системный мониторинг TikTok, Reels и конкурентов для поиска вирусных хуков и конвертящих форматов.",
        "Сценарии и брифы: написание нативных хуков (первые 1–3 секунды), сторителлинга и CTA, создание 5–20 вариаций на концепт.",
        "Менеджмент базы креаторов: поиск, бриф и координация 15–30+ TikTok-креаторов и микро-инфлюенсеров.",
        "Высокоскоростное тестирование: регулярные циклы экспериментов (100+ вариаций в месяц) — быстрый тест и масштабирование победителей.",
        "Анализ воронки: отслеживание CTR, CAC, CPI, активаций и реальных свиданий, масштабирование связок.",
      ],
    },
    mustHave: {
      en: [
        "Deep TikTok-native understanding: grasp of viral short-form pacing, native hooks, audio trends, and user retention mechanics.",
        "High creative throughput: ability to generate dozens of distinct creative hypotheses and briefs systematically.",
        "Project & creator management: proven experience coordinating multiple creators simultaneously, hitting deadlines and maintaining quality.",
        "Data-driven mindset: comfortable analyzing CAC, CPI, retention, and conversion metrics to iterate on concepts.",
      ],
      uk: [
        "Нативне розуміння TikTok: відчуття темпу коротких відео, вірусних хуків, аудіотрендів та утримання уваги глядача.",
        "Висока креативна швидкість: здатність систематично генерувати десятки різних гіпотез та сценаріїв.",
        "Досвід роботи з креаторами: вміння координувати декількох авторів одночасно, контролювати дедлайни та якість.",
        "Аналітичний підхід: розуміння метрик залучення (CAC, CPI, утримання, конверсія) для прийняття рішень.",
      ],
      ru: [
        "Нативное понимание TikTok: чувство темпа коротких видео, хуков, трендов звука и удержания внимания.",
        "Высокая креативная продуктивность: способность систематически выдавать десятки гипотез и сценариев.",
        "Опыт менеджмента авторов: координация пула креаторов, контроль дедлайнов и соблюдение качества.",
        "Аналитический склад ума: работа с метриками CAC, CPI, retention и конверсией в свидания.",
      ],
    },
    niceToHave: {
      en: [
        "Experience running paid social campaigns in consumer, dating, or lifestyle mobile apps.",
        "Hands-on video editing skills (CapCut, Premiere, or mobile editing apps).",
        "Multilingual outreach experience (English, Ukrainian, Polish, or German).",
      ],
      uk: [
        "Досвід у платній рекламі (Paid Social) для мобільних додатків або дейтинг-сервісів.",
        "Впевнені навички монтажу (CapCut, Premiere або мобільні редактори).",
        "Досвід роботи з англомовними або європейськими ринками.",
      ],
      ru: [
        "Опыт в платном трафике (Paid Social) для мобильных приложений или дейтинга.",
        "Навыки монтажа видео (CapCut, Premiere или мобильные редакторы).",
        "Опыт работы с англоязычной или европейской аудиторией.",
      ],
    },
    compensationDetails: {
      en: "Base salary: $1,000 / month (Remote, Full-time). Performance bonuses: Execution Bonus (up to +$300/mo) for pipeline volume + Creative Winner Bonus (up to +$500/mo) for top-performing ads + Growth Bonus ($100–$1,000+/mo) scaled with activated users. Total potential: $1,500–$3,000+/mo with uncapped upside.",
      uk: "Фіксована ставка: $1,000 / місяць (Remote, Full-time). Бонуси: за виконання обсягів пайплайну (до +$300/міс) + за креативи-переможці (до +$500/міс) + за кількість нових активних користувачів ($100–$1,000+/міс). Повний потенціал: $1,500–$3,000+/міс без обмежень.",
      ru: "Фиксированная ставка: $1,000 / месяц (Remote, Full-time). Бонусы: за выполнение пайплайна (до +$300/мес) + за креативы-победители (до +$500/мес) + за привлеченных пользователей ($100–$1,000+/мес). Общий доход: $1,500–$3,000+/мес с неограниченным верхом.",
    },
    applyPrompt: {
      en: "In your application, include: 1) Links to TikToks/Reels or UGC you produced or scripted; 2) 2–3 creative angles or viral hooks you would test for Gennety in week 1; 3) A short note on your experience with creator networks.",
      uk: "У повідомленні вкажи: 1) Посилання на TikTok/Reels або UGC, які ти монтував(ла) або режисував(ла); 2) 2–3 ідеї або хуки для Gennety на перший тиждень; 3) Коротко про свій досвід роботи з креаторами.",
      ru: "В отклике укажи: 1) Ссылки на TikTok/Reels или UGC, которые ты снимал(а) или сценарировал(а); 2) 2–3 идеи или хука для Gennety на первую неделю; 3) Кратко о своем опыте координации авторов.",
    },
    telegramMessage: "Hello! I am applying for the UGC & TikTok Growth Manager role at Gennety. Here is my info:",
    emailSubject: "Application: UGC & TikTok Growth Manager — Gennety",
  },
  {
    id: "campus-growth",
    category: "campus",
    department: "Campus & University Community",
    location: "Kyiv, Ukraine / Hybrid",
    type: "Full-time or Part-time (20–30h)",
    compPill: "$1,000/mo + Campus Milestones ($2,000–$3,000/mo)",
    titles: {
      en: "Campus Growth Lead",
      uk: "Campus Growth Lead (Київ)",
      ru: "Campus Growth Lead (Киев)",
    },
    summaries: {
      en: "Launch and scale Gennety across top universities in Kyiv (KIMO, Taras Shevchenko KNU, NaUKMA). Build campus ambassador networks, host offline speed-dating and party stunts, and make Gennety the #1 dating story on campus.",
      uk: "Запуск та розвиток Gennety в топ-університетах Києва (КІМО, КНУ ім. Шевченка, НаУКМА). Створення амбасадорської мережі, проведення офлайн спід-дейтингів і тусовок.",
      ru: "Запуск и развитие Gennety в ведущих университетах Киева (КИМО, КНУ им. Шевченко, НаУКМА). Создание сети амбассадоров, организация офлайн спид-дейтингов и вечеринок.",
    },
    about: {
      en: "We are expanding Gennety's student roots in Kyiv. We are looking for a hyper-connected campus insider who knows every student leader, club, and event, and can turn Gennety into the default way university students meet.",
      uk: "Ми масштабуємо студентське ком'юніті Gennety в Києві. Шукаємо енергійного кампус-лідера, який знає студради, івент-мейкерів та студентські тусовки і зробить Gennety головним сервісом знайомств.",
      ru: "Мы масштабируем студенческое сообщество Gennety в Киеве. Ищем активного кампус-лидера, знающего студенческие советы, вечеринки и клубы, чтобы сделать Gennety главным сервисом знакомств на кампусе.",
    },
    responsibilities: {
      en: [
        "University chapter launches: organize speed-dating meetups, campus party activations, and interactive promo tabling.",
        "Campus ambassador network: recruit, onboard, and manage a squad of 10–20 passionate micro-ambassadors per campus.",
        "Strategic partnerships: establish collaborations with student councils, faculty societies, party organizers, and local spots.",
        "Local viral content: shoot candid student interviews, campus reactions, TikToks, and memes that spark university word-of-mouth.",
        "Growth tracking: monitor real student registrations, matches arranged, in-person date completions, and retention.",
      ],
      uk: [
        "Запуски в університетах: організація спід-дейтингів, інтерактивних активацій на кампусах та вечірок.",
        "Мережа амбасадорів: рекрутинг, координація та мотивація 10–20 амбасадорів на кожному ключовому факультеті.",
        "Партнерства: співпраця зі студентськими радами, клубами, вечірками та улюбленими закладами студентів.",
        "Кампус-контент: зйомка вуличних інтерв'ю, реакцій студентів, TikToks та мемів, що викликають сарафанне радіо.",
        "Метрики: відстеження реєстрацій, кількості підібраних пар та проведених живих побачень.",
      ],
      ru: [
        "Запуск в университетах: организация спид-дейтингов, активаций на кампусах и совместных вечеринок.",
        "Сеть амбассадоров: поиск, координация и мотивация 10–20 амбассадоров на каждом ключевом факультете.",
        "Партнерства: коллаборации со студсоветами, студенческими клубами и популярными локациями.",
        "Кампусный контент: съемка уличных интервью, реакций, TikToks и локальных мемов, запускающих сарафанное радио.",
        "Контроль результатов: учет регистраций, сформированных пар и состоявшихся офлайн-свиданий.",
      ],
    },
    mustHave: {
      en: [
        "Current student or recent graduate (within 1 year) of a top Kyiv university (priority for KIMO, KNU, NaUKMA).",
        "Connected campus insider: active in student life, acquainted with event promoters, student leaders, and dorms.",
        "Event organization experience: personally organized or co-hosted at least 3–5 student parties, tournaments, or faculty events.",
        "High personal charisma and proactive communication style.",
      ],
      uk: [
        "Студент або нещодавній випускник університету Києва (пріоритет КІМО, КНУ ім. Шевченка, НаУКМА).",
        "Висока соціальна активність: контакти зі студрадами, організаторами вечірок, гуртожитками.",
        "Досвід організації івентів: особиста участь в організації щонайменше 3–5 вечірок чи заходів.",
        "Природна харизма, відкритість до людей та висока ініціативність.",
      ],
      ru: [
        "Студент или недавний выпускник киевского вуза (приоритет КИМО, КНУ им. Шевченко, НаУКМА).",
        "Высокая социальная активность: контакты со студсоветами, промоутерами вечеринок, общежитиями.",
        "Опыт организации мероприятий: проведение или координация от 3–5 студенческих событий.",
        "Природная харизма, инициативность и легкая коммуникация с людьми.",
      ],
    },
    niceToHave: {
      en: [
        "Leadership experience in student government or campus clubs.",
        "Active personal social media with 1,000+ followers (Instagram, TikTok, or Telegram).",
        "Basic operational familiarity with Notion, Google Sheets, and simple tracking tools.",
      ],
      uk: [
        "Досвід лідерства в студентському самоврядуванні або клубах.",
        "Власний блог або активний профіль (Instagram / TikTok) від 1,000+ підписників.",
        "Базові навички роботи з Notion, Google Sheets та аналітикою.",
      ],
      ru: [
        "Опыт лидерства в студенческом самоуправлении или сообществах.",
        "Личный активный профиль в Instagram / TikTok от 1,000+ подписчиков.",
        "Базовые навыки работы с Notion, таблицами и аналитикой.",
      ],
    },
    compensationDetails: {
      en: "Base salary: $1,000 / month (Full-time or intensive 20–30h part-time). Milestone bonuses: +$100 for every 500 new verified student signups + $200 for each successful event (50+ attendees) + $500 quarterly milestone. Total potential: $2,000–$3,000 / month.",
      uk: "Ставка: $1,000 / місяць (Full-time або інтенсивний part-time 20–30 год/тиждень). Бонуси: +$100 за кожні 500 нових студентів + $200 за успішний івент (50+ учасників) + $500 квартальний бонус. Потенціал: $2,000–$3,000 / місяць.",
      ru: "Ставка: $1,000 / месяц (Full-time или part-time 20–30 ч/нед). Бонусы: +$100 за каждые 500 подтвержденных студентов + $200 за успешное событие (50+ гостей) + $500 квартальный бонус. Доход: $2,000–$3,000 / месяц.",
    },
    applyPrompt: {
      en: "In your application, tell us: 1) Your university and year; 2) 2–3 events or initiatives you organized (what worked, what didn't); 3) Your Instagram/Telegram; 4) How you'd get the first 100 Gennety users at your university in 1 week with $0 budget.",
      uk: "У повідомленні вкажи: 1) Твій університет, факультет і курс; 2) 2–3 івенти, які ти організовував(ла); 3) Твій Instagram / Telegram; 4) Як би ти залучив(ла) перших 100 користувачів Gennety за 1 тиждень з $0 бюджетом.",
      ru: "В отклике укажи: 1) Твой вуз, факультет и курс; 2) 2–3 мероприятия, которые ты организовывал(а); 3) Твой Instagram / Telegram; 4) Как бы ты привлек(ла) первые 100 пользователей Gennety за 1 неделю с нулевым бюджетом.",
    },
    telegramMessage: "Hello! I am applying for the Campus Growth Lead role in Kyiv. Here are my university and background details:",
    emailSubject: "Application: Campus Growth Lead (Kyiv) — Gennety",
  },
  {
    id: "fullstack-engineer",
    category: "engineering",
    department: "Product Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    compPill: "Competitive Salary + Equity Options",
    titles: {
      en: "Full-Stack Product Engineer",
      uk: "Full-Stack Product Engineer (Next.js / TS)",
      ru: "Full-Stack Product Engineer (Next.js / TS)",
    },
    summaries: {
      en: "Architect and build ultra-smooth mobile web, Telegram Mini Apps, and real-time dating workflows with buttery 60fps micro-interactions and bulletproof API architecture.",
      uk: "Створення швидкого веб-додатку, Telegram Mini Apps та алгоритмічних пайплайнів з плавними 60fps анімаціями та надійним бекендом.",
      ru: "Создание быстрого веб-приложения, Telegram Mini Apps и алгоритмических пайплайнов с плавными 60fps анимациями и надежной архитектурой.",
    },
    about: {
      en: "You will directly shape Gennety's core interactive experience — from biometric onboarding and interactive date planners to low-latency notification and messaging gateways.",
      uk: "Ти безпосередньо впливатимеш на ключовий користувацький досвід: від біометричного онбордингу та підбору місць для побачень до сповіщень у реальному часі.",
      ru: "Ты будешь напрямую определять ключевой пользовательский интерфейс: от биометрического онбординга и планировщика свиданий до уведомлений в реальном времени.",
    },
    responsibilities: {
      en: [
        "Craft responsive client components using Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.",
        "Build reliable data layers and server actions powered by PostgreSQL / Neon and edge caching.",
        "Develop and optimize Telegram Mini Apps, mobile Safari gesture interactions, and progressive web apps.",
        "Integrate 3rd-party services, including biometric verification (AWS Rekognition) and mapping APIs.",
        "Maintain clean TypeScript types, optimize bundle sizes, and achieve high Core Web Vitals scores.",
      ],
      uk: [
        "Розробка інтерфейсів на Next.js App Router, TypeScript, Tailwind CSS та Framer Motion.",
        "Побудова швидких бекенд-сервісів на базі PostgreSQL / Neon та оптимізація запитів.",
        "Розробка Telegram Mini Apps, мобільних жестів та адаптації під iOS Safari.",
        "Інтеграція біометрії (AWS Rekognition Face Liveness) та картографічних API.",
        "Оптимізація швидкодії, мінімізація розміру бандла та сувора типізація.",
      ],
      ru: [
        "Разработка интерфейсов на Next.js App Router, TypeScript, Tailwind CSS и Framer Motion.",
        "Построение надежных бекенд-сервисов на базе PostgreSQL / Neon и оптимизация запросов.",
        "Разработка Telegram Mini Apps, жестов под iOS Safari и быстрых клиентских страниц.",
        "Интеграция биометрии (AWS Rekognition Face Liveness) и внешних сервисов карт.",
        "Оптимизация Core Web Vitals, минимальный размер бандла и чистая TypeScript-архитектура.",
      ],
    },
    mustHave: {
      en: [
        "3+ years of production experience with TypeScript, React, and modern Next.js.",
        "Deep obsession with UX detail: micro-animations, typography, touch responsiveness, and mobile-first layout.",
        "Solid relational database fundamentals (PostgreSQL, schema migrations, query performance).",
        "High degree of engineering autonomy and speed of delivery.",
      ],
      uk: [
        "3+ роки досвіду роботи з TypeScript, React та сучасним Next.js.",
        "Увага до деталей інтерфейсу: мікроанімації, плавний скрол, робота на мобільних пристроях.",
        "Впевнене володіння реляційними базами даних (PostgreSQL, міграції, оптимізація запитів).",
        "Висока швидкість розробки та здатність самостійно приймати інженерні рішення.",
      ],
      ru: [
        "3+ года продакшн-опыта с TypeScript, React и современным Next.js.",
        "Внимание к деталям UX: микроанимации, шрифты, отзывчивость интерфейса на смартфонах.",
        "Уверенная работа с реляционными базами данных (PostgreSQL, миграции, индексы).",
        "Высокая автономность и скорость реализации продуктовых задач.",
      ],
    },
    niceToHave: {
      en: [
        "Experience building Telegram bots or Telegram Web Apps / Mini Apps.",
        "Familiarity with AWS cloud architecture (Lambda, S3, Rekognition).",
        "Open source contributions or self-built consumer apps.",
      ],
      uk: [
        "Досвід створення Telegram-ботів або Telegram Mini Apps.",
        "Досвід роботи з AWS (Lambda, S3, Rekognition).",
        "Власні пет-проєкти або внесок в open-source.",
      ],
      ru: [
        "Опыт разработки Telegram-ботов или Telegram Mini Apps.",
        "Опыт работы с сервисами AWS (Lambda, S3, Rekognition).",
        "Собственные запущенные пет-проекты или вклад в open-source.",
      ],
    },
    compensationDetails: {
      en: "Competitive monthly compensation aligned with experience + meaningful early equity/token option pool + full hardware/tooling budget. Fast review cycles.",
      uk: "Конкурентна щомісячна оплата за результатами співбесіди + опціонний пул для ранніх учасників команди + бюджет на інструменти.",
      ru: "Конкурентная оплата по итогам собеседования + опционный пул для ранних участников команды + бюджет на сервисы и технику.",
    },
    applyPrompt: {
      en: "Include: 1) Your GitHub profile or links to 2 projects you shipped; 2) A brief breakdown of what you built; 3) Your Telegram handle.",
      uk: "Додай до відгуку: 1) Посилання на GitHub або 2 запущені проєкти; 2) Коротко про твою роль у них; 3) Твій юзернейм у Telegram.",
      ru: "Прикрепи к отклику: 1) Ссылку на GitHub или 2 реализованных проекта; 2) Кратко о твоем участии в них; 3) Твой никнейм в Telegram.",
    },
    telegramMessage: "Hello! I am applying for the Full-Stack Product Engineer role at Gennety. Here is my GitHub/portfolio:",
    emailSubject: "Application: Full-Stack Product Engineer — Gennety",
  },
  {
    id: "ai-researcher",
    category: "ai",
    department: "AI & Behavioral Science",
    location: "Remote",
    type: "Full-time or Contract",
    compPill: "Competitive Salary + Incentive Bonus",
    titles: {
      en: "AI Matchmaking & Compatibility Researcher",
      uk: "AI Matchmaking & Behavioral Researcher",
      ru: "AI Matchmaking & Behavioral Researcher",
    },
    summaries: {
      en: "Design the cognitive engine of romance: transforming psychometric profiles, conversation dynamics, and post-date feedback into high-chemistry, authentic matches.",
      uk: "Розробка алгоритмічного серця Gennety: перетворення психометричних профілів, стилю спілкування та фідбеку з побачень на сумісні пари.",
      ru: "Разработка алгоритмического ядра Gennety: превращение психометрических профилей, стиля общения и отзывов со свиданий в пары с высокой химией.",
    },
    about: {
      en: "Unlike traditional apps relying on shallow swipe scores, Gennety pairs people based on deep psychological compatibility, communication styles, and university lifestyle alignment.",
      uk: "На відміну від звичайних дейтингів з поверхневими фото-свайпами, Gennety створює пари на основі глибокої психологічної сумісності та стилю життя.",
      ru: "В отличие от традиционных дейтингов с поверхностными свайпами, Gennety подбирает пары на основе глубокой психологической совместимости и образа жизни.",
    },
    responsibilities: {
      en: [
        "Develop semantic embedding spaces and multi-modal compatibility scoring models.",
        "Refine LLM agent prompts and personality extraction pipelines from unstructured chat and questionnaire data.",
        "Analyze real post-date satisfaction signals to iteratively train and tune recommendation weights.",
        "Design safety and anomaly detection models to keep the community wholesome and spam-free.",
      ],
      uk: [
        "Розробка ембеддінгів та мультимодальних моделей оцінки сумісності користувачів.",
        "Побудова LLM-пайплайнів для аналізу психологічних профілів та інтересів.",
        "Аналіз реального зворотного зв'язку після побачень для постійного покращення алгоритму.",
        "Впровадження моделей безпеки та модерації для захисту спільноти.",
      ],
      ru: [
        "Разработка эмбеддингов и мультимодальных моделей оценки совместимости пользователей.",
        "Построение LLM-пайплайнов для анализа психологических профилей и стиля общения.",
        "Анализ отзывов после состоявшихся свиданий для постоянного дообучения рекомендаций.",
        "Внедрение моделей безопасности и модерации для комфорта сообщества.",
      ],
    },
    mustHave: {
      en: [
        "Demonstrated experience with applied NLP, LLM orchestration (LangChain / LlamaIndex / DSPy / OpenAI / Anthropic), and vector search (pgvector, Pinecone).",
        "Strong mathematical intuition for recommendation systems and ranking algorithms.",
        "Deep personal interest in relationship psychology, social dynamics, and human behavior.",
      ],
      uk: [
        "Досвід роботи з прикладним NLP, LLM-пайплайнами та векторним пошуком (pgvector).",
        "Розуміння рекомендаційних систем, методів ранжування та метрик оцінки якості.",
        "Щире захоплення психологією стосунків, поведінковими патернами та соціологією.",
      ],
      ru: [
        "Опыт работы с прикладным NLP, LLM-пайплайнами и векторным поиском (pgvector).",
        "Понимание рекомендательных систем, методов ранжирования и оценки гипотез.",
        "Искренний интерес к психологии отношений, поведению людей и романтической совместимости.",
      ],
    },
    niceToHave: {
      en: [
        "Published research or articles on cognitive science, psychometrics, or matching theory.",
        "Experience tuning fine-tuned open-source models (Llama, Mistral) on custom datasets.",
      ],
      uk: [
        "Публікації або дослідження з когнітивних наук чи психометрії.",
        "Досвід файнтюнінгу відкритих моделей під кастомні задачі.",
      ],
      ru: [
        "Публикации или статьи по когнитивным наукам, психометрии или теории матчинга.",
        "Опыт дообучения открытых моделей под узкие прикладные задачи.",
      ],
    },
    compensationDetails: {
      en: "Competitive compensation package + project milestone incentives + full research compute and LLM API budget.",
      uk: "Конкурентна оплата + премії за досягнення продуктових метрик + повне забезпечення обчислювальними ресурсами та API.",
      ru: "Конкурентная оплата + премии за достижение метрик продукта + полный бюджет на вычисления и API.",
    },
    applyPrompt: {
      en: "Tell us: 1) Your background in AI/NLP and recommender systems; 2) Your perspective on why current dating algorithms fail; 3) A link to your research, GitHub, or thesis.",
      uk: "Розкажи: 1) Про свій досвід у сфері AI/NLP; 2) Твоє бачення, чому сучасні алгоритми дейтингу не працюють; 3) Посилання на дослідження, код чи статті.",
      ru: "Расскажи: 1) О своем опыте в AI/NLP и рекомендательных системах; 2) Твой взгляд на то, почему существующие алгоритмы дейтинга провалились; 3) Ссылки на код или публикации.",
    },
    telegramMessage: "Hello! I am applying for the AI Matchmaking Researcher role at Gennety. Here is my perspective and background:",
    emailSubject: "Application: AI Matchmaking Researcher — Gennety",
  },
];

export default function CareersPage() {
  const { locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedRole, setExpandedRole] = useState<string | null>("ugc-growth");

  useEffect(() => {
    document.title = "Careers — Gennety";
  }, []);

  // Get active localized dictionary
  const ui = uiStrings[locale] || uiStrings.en;

  const filteredVacancies = VACANCIES.filter((v) => {
    if (selectedCategory === "all") return true;
    return v.category === selectedCategory;
  });

  const toggleRole = (id: string) => {
    setExpandedRole((prev) => (prev === id ? null : id));
  };

  const getLocalizedField = (obj: Record<string, any>, fallback: string = "") => {
    return obj[locale] || obj.en || fallback;
  };

  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans relative selection:bg-magenta selection:text-white overflow-x-hidden">
      {/* Ambient background glows */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-magenta/15 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-magenta/10 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Navbar */}
      <Navbar />

      <div className="flex-grow pt-28 sm:pt-32 md:pt-36 pb-24 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto w-full relative z-10 flex flex-col">
        {/* Top Navigation Bar: Back Button + Hiring Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{ui.back}</span>
          </Link>

          {/* Hiring Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-gray-200 tracking-wide backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta" />
            </span>
            <span className="font-medium">{ui.badge}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white mb-6 leading-[1.15]">
            {ui.heroTitlePrefix}{" "}
            <span className="font-caveat text-magenta text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block -rotate-1 align-baseline drop-shadow-[0_0_20px_rgba(139,37,59,0.5)]">
              {ui.heroTitleHighlight}
            </span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-3xl">
            {ui.heroSubtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-white/10">
            {ui.stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Values Cards */}
        <div className="mb-20 md:mb-24">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              {ui.cultureTitle}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              {ui.cultureSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {ui.cultureCards.map((card, i) => {
              const icons = [
                <HeartHandshake key={0} className="w-5 h-5 text-magenta" />,
                <Zap key={1} className="w-5 h-5 text-magenta" />,
                <Rocket key={2} className="w-5 h-5 text-magenta" />,
              ];
              return (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-start relative group"
                >
                  <div className="w-10 h-10 rounded-xl bg-magenta/15 border border-magenta/30 flex items-center justify-center mb-5">
                    {icons[i % icons.length]}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300/90 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vacancies Section */}
        <div id="openings" className="mb-20 md:mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white">
                {ui.openingsTitle}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-1">
                {ui.openingsSubtitle}
              </p>
            </div>

            {/* Category Filter Pills (Scrollable horizontally on mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {ui.categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer",
                      isActive
                        ? "bg-white text-black shadow-sm"
                        : "bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vacancies List */}
          <div className="space-y-4">
            {filteredVacancies.map((vacancy) => {
              const isExpanded = expandedRole === vacancy.id;
              const title = getLocalizedField(vacancy.titles, vacancy.titles.en);
              const summary = getLocalizedField(vacancy.summaries, vacancy.summaries.en);
              const about = getLocalizedField(vacancy.about, vacancy.about.en);
              const responsibilities = getLocalizedField(vacancy.responsibilities, vacancy.responsibilities.en);
              const mustHave = getLocalizedField(vacancy.mustHave, vacancy.mustHave.en);
              const niceToHave = getLocalizedField(vacancy.niceToHave, vacancy.niceToHave.en);
              const compDetails = getLocalizedField(vacancy.compensationDetails, vacancy.compensationDetails.en);
              const applyPrompt = getLocalizedField(vacancy.applyPrompt, vacancy.applyPrompt.en);

              const tgUrl = `${TELEGRAM_SUPPORT_URL}?text=${encodeURIComponent(
                `${vacancy.telegramMessage}\n`
              )}`;
              const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                vacancy.emailSubject
              )}&body=${encodeURIComponent(
                `Hello Gennety team,\n\nI am applying for the ${title} position.\n\n`
              )}`;

              return (
                <div
                  key={vacancy.id}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden",
                    isExpanded
                      ? "bg-white/[0.04] border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  {/* Vacancy Card Header (Clickable Accordion Trigger) */}
                  <div
                    onClick={() => toggleRole(vacancy.id)}
                    className="p-5 sm:p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleRole(vacancy.id);
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-magenta font-semibold px-2.5 py-0.5 rounded bg-magenta/15 border border-magenta/30">
                          {vacancy.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-300 font-medium px-2 py-0.5 rounded bg-white/[0.05]">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {vacancy.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-300 font-medium px-2 py-0.5 rounded bg-white/[0.05]">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {vacancy.type}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                        {title}
                      </h3>

                      <p className="text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
                        {summary}
                      </p>
                    </div>

                    {/* Right side: Compensation Pill + Toggle Button */}
                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                      <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {vacancy.compPill}
                      </span>

                      <div className="inline-flex items-center gap-1.5 text-xs text-gray-300 font-medium px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors">
                        <span>{isExpanded ? ui.hideBtn : ui.detailsBtn}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300 text-gray-400",
                            isExpanded ? "rotate-180 text-white" : ""
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-7 sm:pb-8 pt-2 border-t border-white/[0.08] space-y-8">
                          {/* About Section */}
                          <div>
                            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">
                              // {ui.aboutRoleTitle}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                              {about}
                            </p>
                          </div>

                          {/* Responsibilities */}
                          <div>
                            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">
                              // {ui.responsibilitiesTitle}
                            </h4>
                            <ul className="space-y-2.5">
                              {responsibilities.map((resp: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-sm sm:text-[15px] text-gray-300 font-light leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-magenta mt-2 shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements (Must Have & Nice to Have) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                              <h4 className="text-xs uppercase font-mono tracking-wider text-white font-semibold mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                {ui.mustHaveTitle}
                              </h4>
                              <ul className="space-y-2">
                                {mustHave.map((item: string, idx: number) => (
                                  <li key={idx} className="text-xs sm:text-sm text-gray-300/90 font-light leading-relaxed flex items-start gap-2">
                                    <span className="text-gray-500 font-mono text-xs mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                              <h4 className="text-xs uppercase font-mono tracking-wider text-white font-semibold mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                {ui.niceToHaveTitle}
                              </h4>
                              <ul className="space-y-2">
                                {niceToHave.map((item: string, idx: number) => (
                                  <li key={idx} className="text-xs sm:text-sm text-gray-300/90 font-light leading-relaxed flex items-start gap-2">
                                    <span className="text-gray-500 font-mono text-xs mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Compensation Breakdown */}
                          <div className="p-4 sm:p-5 rounded-xl bg-magenta/[0.06] border border-magenta/20">
                            <h4 className="text-xs uppercase font-mono tracking-wider text-magenta font-semibold mb-2">
                              // {ui.compensationTitle}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                              {compDetails}
                            </p>
                          </div>

                          {/* How to Apply Section with CTAs */}
                          <div className="pt-2 border-t border-white/[0.08]">
                            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">
                              // {ui.howToApplyTitle}
                            </h4>
                            <p className="text-sm text-gray-300 font-light mb-5 leading-relaxed">
                              {applyPrompt}
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                              <a
                                href={tgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-md active:scale-95 cursor-pointer"
                              >
                                <TelegramIcon className="w-4 h-4 text-black" />
                                <span>{ui.applyTelegram}</span>
                              </a>

                              <a
                                href={mailtoUrl}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] text-white hover:bg-white/[0.14] border border-white/10 transition-all text-sm font-medium active:scale-95 cursor-pointer"
                              >
                                <Mail className="w-4 h-4 text-gray-300" />
                                <span>{ui.applyEmail}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Application / Pitch Card */}
        <div className="mb-20 md:mb-24 p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-magenta/[0.08] border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-magenta font-semibold mb-2 block">
              // Open Pitch
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-4">
              {ui.openAppTitle}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-8">
              {ui.openAppSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={`${TELEGRAM_SUPPORT_URL}?text=${encodeURIComponent(
                  "Hello Gennety team! I'd like to propose my skills and pitch how I can help grow Gennety:"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <TelegramIcon className="w-4 h-4 text-black" />
                <span>{ui.openAppCtaTelegram}</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "General Application / Pitch — Gennety"
                )}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white transition-all text-sm font-medium active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-gray-300" />
                <span>{ui.openAppCtaEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Transparent Hiring Process */}
        <div className="mb-12">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
              {ui.processTitle}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {ui.processSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-start relative"
              >
                <span className="text-3xl font-mono font-light text-magenta/70 mb-4 block">
                  {step.num}
                </span>
                <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer in dark theme */}
      <Footer theme="dark" />
    </main>
  );
}
