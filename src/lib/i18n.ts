/* ========================================
   GENNETY — Internationalization (i18n)
   ======================================== */

export type Locale = "en" | "uk";

export const locales: Locale[] = ["en", "uk"];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
};

export const localeFlagEmoji: Record<Locale, string> = {
  en: "🇬🇧",
  uk: "🇺🇦",
};

// --- Translation Dictionary ---
export type TranslationKeys = keyof typeof translations.en;

export const translations = {
  en: {
    // Navbar
    "nav.login": "Log In",
    "nav.join": "Join Now",

    // Hero
    "hero.headline": "go on a date with",
    "hero.highlight": "your type",
    "hero.cta": "Message Gennety to Join",
    "hero.disclaimer": "By continuing, you agree to our",
    "hero.terms": "Terms",
    "hero.privacy": "Privacy",

    // Countdown
    "countdown.nextMatch": "Next Match Day:",
    "countdown.joined": "Already Joined:",
    "countdown.students": "students",

    // How It Works
    "howItWorks.title": "How it",
    "howItWorks.highlight": "works",
    "step.1.title": "Tell Gennety Your Type",
    "step.1.desc": "Submit your preferences by Tuesday 11:59 PM.",
    "step.2.title": "The Thursday Drop",
    "step.2.desc":
      "Check your Telegram at 7pm. We will send you one personalized match and curate your date for you!",
    "step.3.title": "Schedule the Date",
    "step.3.desc": "Find a time that works for both of you to meet up.",
    "step.4.title": "Have fun!",
    "step.4.desc": "Enjoy a good time with your personalized date!",

    // Real Dates
    "realDates.title.highlight": "Real",
    "realDates.title.rest": "dates delivered",
    "metric.1": "1,000+ Dates arranged",
    "metric.2": "68% Success Rate",
    "metric.3": "93% Want a 2nd Date",

    // Matchmaker
    "matchmaker.title.pre": "your",
    "matchmaker.title.highlight": "personalized",
    "matchmaker.title.post": "matchmaker",
    "matchmaker.1.title": "Backed by best AI research",
    "matchmaker.1.desc":
      "Built on insights from professional matchmakers and leading cognitive researchers.",
    "matchmaker.2.title": "Gennety learns your preferences",
    "matchmaker.2.desc":
      "Our AI analyzes your interests, personality, and dating style to find compatible matches.",
    "matchmaker.3.title": "Scans the entire pool to find the one",
    "matchmaker.3.desc":
      "Every student in our network is considered to find your best possible match.",

    // Testimonials
    "testimonials.title.pre": "unforgettable",
    "testimonials.title.highlight": "great times",

    // Comparison
    "comparison.title": "tired of tinder & badoo?",
    "comparison.gennety": "Gennety",
    "comparison.competitors": "Competitors",
    "comparison.dateSet": "Your date is set for Friday.",
    "comparison.viewDetails": "View details.",
    "comparison.newMessage": "1 new message",
    "comparison.gennetyDesc": "One curated match. One notification. Done.",
    "comparison.unread": "1,000+ unread messages",
    "comparison.competitorsDesc":
      "Endless swiping. Endless small talk. No real dates.",

    // Safety
    "safety.title.pre": "verified. private.",
    "safety.title.highlight": "safe.",
    "safety.1.title": "Verified students at your school only",
    "safety.1.desc": "Every user is verified through their university email.",
    "safety.2.title": "Only your date sees you",
    "safety.2.desc":
      "Your profile is never browsed. Only your match gets to see you.",
    "safety.3.title": "Coffee dates on campus",
    "safety.3.desc":
      "All dates happen at safe, familiar on-campus locations.",

    // FAQ
    "faq.title": "FAQ",
    "faq.1.q": "How does Gennety pair people?",
    "faq.1.a":
      "Gennety pairs you with another student by analyzing your profiles and comparing your preferences. This process employs rigorous computation and simulation to provide the best insights for curating a successful date. Leveraging the reasoning abilities of frontier LLMs, we can catch the slightest signs of the possibilities of a good date. We also have an agentic system that orchestrates different expert agents including analysis experts, matchmaking experts, personalized poster experts, scheduler experts, etc.",
    "faq.2.q": "How Gennety works",
    "faq.2.a":
      "Gennety curates dates for you without requiring you to swipe or chat with anyone. After submitting your information, Gennety will text you a date plan that includes the time, place, and details of your match. The date will take place around the campus you're currently near.",
    "faq.3.q": "What will I know about my match before the date?",
    "faq.3.a":
      "Once we find a good match for you, you'll get a poster with their photos and a short explanation of why you'd be a great pair. You'll also get a scheduler to share your availability for the week. After both of you fill it out, we'll arrange the date time, place, and give you a few dating tips to help it go smoothly.",
    "faq.4.q": "What if I don't like my match/date?",
    "faq.4.a":
      "You can always simply tell Gennety the reason why you don't like it and any other feedback. Gennety will then proceed to arrange another date that follows the feedback. You can also adjust your profile to update your preferences and personal information.",
    "faq.5.q": "Who's participating?",
    "faq.5.a":
      "Currently, only college students who are 18 or older are participating in this experience.",
    "faq.6.q": "What if I can't make it last minute?",
    "faq.6.a":
      "If you really can't make it last minute, please cancel by texting your match asap to prevent being banned from future experiences.",
    "faq.7.q": "How long does it usually take?",
    "faq.7.a":
      "Since we are only releasing this experience to a very select group of students, we estimate that it will take approximately one to two weeks to secure a guaranteed in-person coffee date. For a recent upgrade in system, 70% of the users now get their first date within 2 days of signing up.",
    "faq.8.q": "Where do the dates happen?",
    "faq.8.a":
      "Dates take place at carefully selected on-campus spots to ensure a safe and enjoyable experience.",

    // Marquee
    "marquee.text": "Date Without Swiping",
    "marquee.manifesto": "Our Manifesto",

    // Footer
    "footer.slogan": "A friend that texts you ready-to-go dates.",
    "footer.telegram": "Telegram",
    "footer.contact": "Contact",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.rights": "Gennety. All rights reserved.",
    "footer.cookie_preferences": "Cookie Preferences",

    // Cookie Banner
    "cookie.banner_title": "Cookie Consent",
    "cookie.banner_text":
      "We use cookies to improve your experience. You can accept all, reject non-essential cookies, or customize your preferences.",
    "cookie.accept_all": "Accept All",
    "cookie.reject_non_essential": "Reject Non-Essential",
    "cookie.customize": "Customize",
    "cookie.customize_title": "Cookie Preferences",
    "cookie.save_preferences": "Save Preferences",
    "cookie.cancel": "Cancel",
    "cookie.cat_necessary": "Necessary",
    "cookie.cat_necessary_desc": "Required for the site to function. Cannot be disabled.",
    "cookie.cat_analytics": "Analytics",
    "cookie.cat_analytics_desc": "Help us understand how visitors use the site.",
    "cookie.cat_marketing": "Marketing",
    "cookie.cat_marketing_desc": "Used to show relevant ads and measure campaigns.",
    "cookie.cat_functional": "Functional",
    "cookie.cat_functional_desc": "Enable enhanced features like preferences and chat.",
  },

  uk: {
    // Navbar
    "nav.login": "Увійти",
    "nav.join": "Приєднатися",

    // Hero
    "hero.headline": "сходи на побачення з",
    "hero.highlight": "твоїм типом",
    "hero.cta": "Написати Gennety",
    "hero.disclaimer": "Продовжуючи, ви погоджуєтесь з",
    "hero.terms": "Умовами",
    "hero.privacy": "Конфіденційністю",

    // Countdown
    "countdown.nextMatch": "Наступний день матчів:",
    "countdown.joined": "Вже приєдналися:",
    "countdown.students": "студентів",

    // How It Works
    "howItWorks.title": "Як це",
    "howItWorks.highlight": "працює",
    "step.1.title": "Розкажи Gennety свій тип",
    "step.1.desc": "Надішли свої вподобання до вівторка 23:59.",
    "step.2.title": "Четверговий дроп",
    "step.2.desc":
      "Перевір Telegram о 19:00. Ми надішлемо тобі персональний матч і організуємо побачення!",
    "step.3.title": "Заплануй побачення",
    "step.3.desc": "Знайди час, який підходить вам обом.",
    "step.4.title": "Насолоджуйся!",
    "step.4.desc": "Проведи чудовий час на персональному побаченні!",

    // Real Dates
    "realDates.title.highlight": "Реальні",
    "realDates.title.rest": "побачення доставлені",
    "metric.1": "1 000+ організованих побачень",
    "metric.2": "68% успішних пар",
    "metric.3": "93% хочуть друге побачення",

    // Matchmaker
    "matchmaker.title.pre": "твій",
    "matchmaker.title.highlight": "персональний",
    "matchmaker.title.post": "мейкер",
    "matchmaker.1.title": "На основі найкращих AI-досліджень",
    "matchmaker.1.desc":
      "Побудовано на інсайтах професійних зводників та провідних когнітивних дослідників.",
    "matchmaker.2.title": "Gennety вивчає твої вподобання",
    "matchmaker.2.desc":
      "Наш AI аналізує твої інтереси, особистість та стиль побачень для пошуку сумісних пар.",
    "matchmaker.3.title": "Сканує всю базу, щоб знайти єдиного",
    "matchmaker.3.desc":
      "Кожен студент у нашій мережі розглядається для пошуку найкращого матчу.",

    // Testimonials
    "testimonials.title.pre": "незабутні",
    "testimonials.title.highlight": "чудові моменти",

    // Comparison
    "comparison.title": "набридли tinder і badoo?",
    "comparison.gennety": "Gennety",
    "comparison.competitors": "Конкуренти",
    "comparison.dateSet": "Твоє побачення призначено на п'ятницю.",
    "comparison.viewDetails": "Переглянути деталі.",
    "comparison.newMessage": "1 нове повідомлення",
    "comparison.gennetyDesc": "Один підібраний матч. Одне повідомлення. Готово.",
    "comparison.unread": "1 000+ непрочитаних повідомлень",
    "comparison.competitorsDesc":
      "Нескінченні свайпи. Нескінченні розмові ні про що. Жодних реальних побачень.",

    // Safety
    "safety.title.pre": "верифіковано. приватно.",
    "safety.title.highlight": "безпечно.",
    "safety.1.title": "Тільки верифіковані студенти твого ВНЗ",
    "safety.1.desc":
      "Кожен користувач верифікується через університетську пошту.",
    "safety.2.title": "Тільки твій матч бачить тебе",
    "safety.2.desc":
      "Твій профіль ніхто не переглядає. Тільки твій матч бачить тебе.",
    "safety.3.title": "Кавові побачення на кампусі",
    "safety.3.desc":
      "Всі побачення проходять у безпечних, знайомих місцях на кампусі.",

    // FAQ
    "faq.title": "Часті питання",
    "faq.1.q": "Як Gennety підбирає пари?",
    "faq.1.a":
      "Gennety підбирає тобі пару, аналізуючи профілі та порівнюючи вподобання. Цей процес використовує потужні обчислення та симуляції для найкращих інсайтів. Використовуючи можливості передових LLM, ми вловлюємо найменші ознаки потенційно вдалого побачення. У нас також є агентна система, що оркеструє різних експертних агентів: аналітиків, експертів з мейкінгу, дизайнерів постерів, планувальників тощо.",
    "faq.2.q": "Як працює Gennety",
    "faq.2.a":
      "Gennety організовує побачення без необхідності свайпати чи листуватися. Після заповнення анкети Gennety надішле тобі план побачення з часом, місцем та деталями про твій матч. Побачення відбудеться біля кампусу, де ти зараз знаходишся.",
    "faq.3.q": "Що я дізнаюсь про свій матч до побачення?",
    "faq.3.a":
      "Коли ми знайдемо для тебе гарний матч, ти отримаєш постер з фотографіями та коротким поясненням, чому ви підходите одне одному. Також ти отримаєш планувальник для вибору зручного часу на тиждень. Після того, як обоє заповнять його, ми організуємо час, місце та дамо декілька порад для побачення.",
    "faq.4.q": "Що якщо мені не сподобався мій матч?",
    "faq.4.a":
      "Ти завжди можеш написати Gennety причину та будь-який зворотний зв'язок. Gennety організує інше побачення з урахуванням твого фідбеку. Також можна оновити свій профіль та вподобання.",
    "faq.5.q": "Хто бере участь?",
    "faq.5.a":
      "Наразі в цьому досвіді беруть участь тільки студенти коледжів віком від 18 років.",
    "faq.6.q": "Що якщо я не зможу прийти в останній момент?",
    "faq.6.a":
      "Якщо ти дійсно не можеш прийти в останній момент, будь ласка, скасуй побачення, написавши своєму матчу якнайшвидше, щоб уникнути бану.",
    "faq.7.q": "Скільки зазвичай це займає часу?",
    "faq.7.a":
      "Оскільки ми випускаємо цей досвід лише для обраної групи студентів, ми оцінюємо, що знадобиться приблизно один-два тижні для гарантованого побачення за кавою. Завдяки нещодавньому оновленню системи, 70% користувачів отримують перше побачення протягом 2 днів після реєстрації.",
    "faq.8.q": "Де проходять побачення?",
    "faq.8.a":
      "Побачення проходять у ретельно обраних місцях на кампусі для безпечного та приємного досвіду.",

    // Marquee
    "marquee.text": "Побачення без свайпів",
    "marquee.manifesto": "Наш маніфест",

    // Footer
    "footer.slogan": "Друг, який пише тобі готові побачення.",
    "footer.telegram": "Telegram",
    "footer.contact": "Контакти",
    "footer.terms": "Умови",
    "footer.privacy": "Конфіденційність",
    "footer.rights": "Gennety. Усі права захищені.",
    "footer.cookie_preferences": "Налаштування Cookie",

    // Cookie Banner
    "cookie.banner_title": "Згода на Cookie",
    "cookie.banner_text":
      "Ми використовуємо cookie для покращення вашого досвіду. Ви можете прийняти всі, відхилити необов'язкові або налаштувати свої вподобання.",
    "cookie.accept_all": "Прийняти все",
    "cookie.reject_non_essential": "Відхилити необов'язкові",
    "cookie.customize": "Налаштувати",
    "cookie.customize_title": "Налаштування Cookie",
    "cookie.save_preferences": "Зберегти налаштування",
    "cookie.cancel": "Скасувати",
    "cookie.cat_necessary": "Необхідні",
    "cookie.cat_necessary_desc": "Потрібні для роботи сайту. Не можна вимкнути.",
    "cookie.cat_analytics": "Аналітика",
    "cookie.cat_analytics_desc": "Допомагають зрозуміти, як відвідувачі використовують сайт.",
    "cookie.cat_marketing": "Маркетинг",
    "cookie.cat_marketing_desc": "Використовуються для показу релевантної реклами.",
    "cookie.cat_functional": "Функціональні",
    "cookie.cat_functional_desc": "Дозволяють розширені функції, як-от вподобання та чат.",
  },
} as const;

export type Dictionary = typeof translations.en;
