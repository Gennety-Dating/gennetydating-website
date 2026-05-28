/* ========================================
   GENNETY — Internationalization (i18n)
   ======================================== */

export type Locale = "en" | "uk" | "ru" | "de" | "pl";

export const locales: Locale[] = ["en", "uk", "ru", "de", "pl"];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
  ru: "RU",
  de: "DE",
  pl: "PL",
};

export const localeFlagEmoji: Record<Locale, string> = {
  en: "🇬🇧",
  uk: "🇺🇦",
  ru: "🇷🇺",
  de: "🇩🇪",
  pl: "🇵🇱",
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
    "metric.2": "74% Success Rate",
    "metric.3": "92% Want a 2nd Date",

    // Matchmaker
    "matchmaker.title.pre": "your",
    "matchmaker.title.highlight": "personalized",
    "matchmaker.title.post": "matchmaker",
    "matchmaker.title": "Your personal AI matchmaker.",
    "matchmaker.subheadline": "Skip the swiping. Chat with your agent during the week, and we'll set up the blind date.",
    "matchmaker.chat.msg1": "POV: it’s Friday night. Loud bar or lowkey hangout?",
    "matchmaker.chat.msg2": "Lowkey hangout. I'm burnt out.",
    "matchmaker.chat.msg3": "Felt. What’s an absolute red flag for you on a first date?",
    "matchmaker.chat.msg4": "Someone who takes themselves too seriously. Instant ick.",
    "matchmaker.chat.msg5": "100%. Give me a day. I think I know exactly who you need to meet.",
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
    "safety.1.title": "Verified students only",
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
    "marquee.manifesto": "Our Thesis",

    // Footer
    "footer.slogan": "A friend that texts you ready-to-go dates.",
    "footer.telegram": "Telegram",
    "footer.contact": "Contact",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.rights": "Gennety. All rights reserved.",
    "footer.cookie_preferences": "Cookie Preferences",

    // Registration Modal
    "registration.secure": "Verified handoff",
    "registration.close": "Close",
    "registration.joinTitle": "Join Gennety",
    "registration.joinDescription":
      "Verify your university email here, then continue the profile onboarding in Telegram.",
    "registration.loginTitle": "Log in",
    "registration.loginDescription":
      "Confirm your university email and we will open the right Telegram flow for your account.",
    "registration.emailLabel": "University email",
    "registration.languageLabel": "Onboarding language",
    "registration.termsPrefix": "I agree to the",
    "registration.terms": "Terms",
    "registration.and": "and",
    "registration.privacy": "Privacy Policy",
    "registration.researchOptIn": "Allow anonymized research use of my answers.",
    "registration.sendCode": "Send code",
    "registration.codeSent": "We sent a code to",
    "registration.codeLabel": "Verification code",
    "registration.continueTelegram": "Continue in Telegram",
    "registration.changeEmail": "Change email",
    "registration.resend": "Resend code",
    "registration.readyTitle": "Email verified",
    "registration.readyDescription":
      "Opening Telegram now. Your email, consent, and language are saved.",
    "registration.openTelegram": "Open Telegram",
    "registration.errorTerms": "Accept both the Terms/Privacy Policy and Research Agreement to continue.",
    "registration.errorGeneric": "Something went wrong. Try again in a moment.",

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
    "hero.headline": "обирай реальні",
    "hero.highlight": "побачення",
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
    "realDates.title.rest": "побачення організовані",
    "metric.1": "1 000+ організованих побачень",
    "metric.2": "74% успішних пар",
    "metric.3": "92% хочуть друге побачення",

    // Matchmaker
    "matchmaker.title.pre": "твій",
    "matchmaker.title.highlight": "персональний",
    "matchmaker.title.post": "метчмейкер",
    "matchmaker.title": "Твій особистий AI-метчмейкер.",
    "matchmaker.subheadline": "Ніяких свайпів. Спілкуйся зі своїм агентом протягом тижня, а ми влаштуємо побачення наосліп.",
    "matchmaker.chat.msg1": "План на п'ятницю вечір: галасливий бар чи затишне місце?",
    "matchmaker.chat.msg2": "Затишне місце. Я без сил.",
    "matchmaker.chat.msg3": "Розумію. А що для тебе головний ред флаг на першому побаченні?",
    "matchmaker.chat.msg4": "Хтось занадто серйозний. Одразу ні.",
    "matchmaker.chat.msg5": "100%. Дай мені день. Здається, я знаю, хто тобі ідеально підійде.",
    "matchmaker.1.title": "На основі найкращих AI-досліджень",
    "matchmaker.1.desc":
      "Побудовано на інсайтах професійних метчмейкерів та провідних когнітивних дослідників.",
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
      "Нескінченні свайпи. Нескінченні розмови ні про що. Жодних реальних побачень.",

    // Safety
    "safety.title.pre": "верифіковано. приватно.",
    "safety.title.highlight": "безпечно.",
    "safety.1.title": "Тільки верифіковані студенти",
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
    "marquee.manifesto": "Наша теза",

    // Footer
    "footer.slogan": "Друг, який організує для тебе побачення.",
    "footer.telegram": "Telegram",
    "footer.contact": "Контакти",
    "footer.terms": "Умови",
    "footer.privacy": "Конфіденційність",
    "footer.rights": "Gennety. Усі права захищені.",
    "footer.cookie_preferences": "Налаштування Cookie",

    // Registration Modal
    "registration.secure": "Безпечний перехід",
    "registration.close": "Закрити",
    "registration.joinTitle": "Приєднатися до Gennety",
    "registration.joinDescription":
      "Підтверди університетську пошту тут, а анкету продовжиш у Telegram.",
    "registration.loginTitle": "Увійти",
    "registration.loginDescription":
      "Підтверди університетську пошту, і ми відкриємо потрібний Telegram-flow для твого акаунта.",
    "registration.emailLabel": "Університетська пошта",
    "registration.languageLabel": "Мова онбордингу",
    "registration.termsPrefix": "Я погоджуюся з",
    "registration.terms": "Умовами",
    "registration.and": "та",
    "registration.privacy": "Політикою конфіденційності",
    "registration.researchOptIn": "Дозволити анонімне використання моїх відповідей для досліджень.",
    "registration.sendCode": "Надіслати код",
    "registration.codeSent": "Ми надіслали код на",
    "registration.codeLabel": "Код підтвердження",
    "registration.continueTelegram": "Продовжити в Telegram",
    "registration.changeEmail": "Змінити пошту",
    "registration.resend": "Надіслати ще раз",
    "registration.readyTitle": "Пошту підтверджено",
    "registration.readyDescription":
      "Відкриваємо Telegram. Пошта, згода та мова вже збережені.",
    "registration.openTelegram": "Відкрити Telegram",
    "registration.errorTerms": "Погодься з Умовами, Політикою та участю в дослідженнях, щоб продовжити.",
    "registration.errorGeneric": "Щось пішло не так. Спробуй ще раз за мить.",

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

  ru: {
    // Navbar
    "nav.login": "Войти",
    "nav.join": "Присоединиться",

    // Hero
    "hero.headline": "выбирай реальные",
    "hero.highlight": "свидания",
    "hero.cta": "Написать Gennety",
    "hero.disclaimer": "Продолжая, вы соглашаетесь с",
    "hero.terms": "Условиями",
    "hero.privacy": "Конфиденциальностью",

    // Countdown
    "countdown.nextMatch": "Следующий день матчей:",
    "countdown.joined": "Уже присоединились:",
    "countdown.students": "студентов",

    // How It Works
    "howItWorks.title": "Как это",
    "howItWorks.highlight": "работает",
    "step.1.title": "Расскажи Gennety свой тип",
    "step.1.desc": "Отправь свои предпочтения до вторника 23:59.",
    "step.2.title": "Четверговый дроп",
    "step.2.desc":
      "Проверь Telegram в 19:00. Мы пришлем тебе персональный матч и организуем свидание!",
    "step.3.title": "Запланируй свидание",
    "step.3.desc": "Найди время, которое подходит вам обоим.",
    "step.4.title": "Наслаждайся!",
    "step.4.desc": "Проведи отличное время на персональном свидании!",

    // Real Dates
    "realDates.title.highlight": "Реальные",
    "realDates.title.rest": "свидания организованы",
    "metric.1": "1 000+ организованных свиданий",
    "metric.2": "74% успешных пар",
    "metric.3": "92% хотят второе свидание",

    // Matchmaker
    "matchmaker.title.pre": "твой",
    "matchmaker.title.highlight": "персональный",
    "matchmaker.title.post": "мэтчмейкер",
    "matchmaker.title": "Твой личный AI-мэтчмейкер.",
    "matchmaker.subheadline": "Никаких свайпов. Общайся со своим агентом в течение недели, а мы устроим свидание вслепую.",
    "matchmaker.chat.msg1": "План на пятницу вечер: шумный бар или уютное место?",
    "matchmaker.chat.msg2": "Уютное место. Я без сил.",
    "matchmaker.chat.msg3": "Понимаю. А что для тебя главный ред флаг на первом свидании?",
    "matchmaker.chat.msg4": "Кто-то слишком серьезный. Сразу нет.",
    "matchmaker.chat.msg5": "100%. Дай мне день. Кажется, я знаю, кто тебе подойдет.",
    "matchmaker.1.title": "На основе лучших AI-исследований",
    "matchmaker.1.desc":
      "Построено на инсайтах профессиональных мэтчмейкеров и ведущих когнитивных исследователей.",
    "matchmaker.2.title": "Gennety изучает твои предпочтения",
    "matchmaker.2.desc":
      "Наш AI анализирует твои интересы, личность и стиль свиданий для поиска совместимых пар.",
    "matchmaker.3.title": "Сканирует всю базу, чтобы найти единственного",
    "matchmaker.3.desc":
      "Каждый студент в нашей сети рассматривается для поиска идеального матча.",

    // Testimonials
    "testimonials.title.pre": "незабываемые",
    "testimonials.title.highlight": "прекрасные моменты",

    // Comparison
    "comparison.title": "надоели tinder и badoo?",
    "comparison.gennety": "Gennety",
    "comparison.competitors": "Конкуренты",
    "comparison.dateSet": "Твое свидание назначено на пятницу.",
    "comparison.viewDetails": "Посмотреть детали.",
    "comparison.newMessage": "1 новое сообщение",
    "comparison.gennetyDesc": "Один подобранный матч. Одно сообщение. Готово.",
    "comparison.unread": "1 000+ непрочитанных сообщений",
    "comparison.competitorsDesc":
      "Бесконечные свайпы. Бесконечные разговоры ни о чем. Никаких реальных свиданий.",

    // Safety
    "safety.title.pre": "верифицировано. приватно.",
    "safety.title.highlight": "безопасно.",
    "safety.1.title": "Только верифицированные студенты",
    "safety.1.desc":
      "Каждый пользователь верифицируется через университетскую почту.",
    "safety.2.title": "Только твой матч видит тебя",
    "safety.2.desc":
      "Твой профиль никто не просматривает. Только твой матч видит тебя.",
    "safety.3.title": "Кофейные свидания на кампусе",
    "safety.3.desc":
      "Все свидания проходят в безопасных, знакомых местах на кампусе.",

    // FAQ
    "faq.title": "Частые вопросы",
    "faq.1.q": "Как Gennety подбирает пары?",
    "faq.1.a":
      "Gennety подбирает тебе пару, анализируя профили и сопоставляя предпочтения. Этот процесс использует мощные вычисления и симуляции для лучших инсайтов.",
    "faq.2.q": "Как работает Gennety",
    "faq.2.a":
      "Gennety организует свидания без необходимости свайпать или переписываться. После заполнения анкеты Gennety пришлет тебе план свидания с временем, местом и деталями о твоем матче.",
    "faq.3.q": "Что я узнаю о своем матче до свидания?",
    "faq.3.a":
      "Когда мы найдем для тебя хороший матч, ты получишь постер с фотографиями и кратким объяснением, почему вы подходите друг другу.",
    "faq.4.q": "Что если мне не понравился мой матч?",
    "faq.4.a":
      "Ты всегда можешь написать Gennety причину и любой обратный связь. Gennety организует другое свидание с учетом твоего фидбэка.",
    "faq.5.q": "Кто участвует?",
    "faq.5.a":
      "Сейчас в этом опыте участвуют только студенты колледжей старше 18 лет.",
    "faq.6.q": "Что если я не смогу прийти в последний момент?",
    "faq.6.a":
      "Если ты действительно не можешь прийти в последний момент, пожалуйста, отмени свидание, написав своему матчу как можно скорее, чтобы избежать бана.",
    "faq.7.q": "Сколько обычно это занимает времени?",
    "faq.7.a":
      "В среднем подбор идеальной пары занимает от нескольких дней до одной недели.",
    "faq.8.q": "Где проходят свидания?",
    "faq.8.a":
      "Свидания проходят в тщательно выбранных местах на кампусе для безопасного и приятного опыта.",

    // Marquee
    "marquee.text": "Свидания без свайпов",
    "marquee.manifesto": "Наш тезис",

    // Footer
    "footer.slogan": "Друг, который организует для тебя свидание.",
    "footer.telegram": "Telegram",
    "footer.contact": "Контакты",
    "footer.terms": "Условия",
    "footer.privacy": "Конфиденциальность",
    "footer.rights": "Gennety. Все права защищены.",
    "footer.cookie_preferences": "Настройки Cookie",

    // Registration Modal
    "registration.secure": "Безопасный переход",
    "registration.close": "Закрыть",
    "registration.joinTitle": "Присоединиться к Gennety",
    "registration.joinDescription":
      "Подтверди университетскую почту здесь, а анкету продолжишь в Telegram.",
    "registration.loginTitle": "Войти",
    "registration.loginDescription":
      "Подтверди университетскую почту, и мы откроем нужный Telegram-flow для твоего аккаунта.",
    "registration.emailLabel": "Университетская почта",
    "registration.languageLabel": "Язык онбординга",
    "registration.termsPrefix": "Я соглашаюсь с",
    "registration.terms": "Условиями",
    "registration.and": "и",
    "registration.privacy": "Политикой конфиденциальности",
    "registration.researchOptIn": "Разрешить анонимное использование моих ответов для исследований.",
    "registration.sendCode": "Отправить код",
    "registration.codeSent": "Мы отправили код на",
    "registration.codeLabel": "Код подтверждения",
    "registration.continueTelegram": "Продолжить в Telegram",
    "registration.changeEmail": "Изменить почту",
    "registration.resend": "Отправить еще раз",
    "registration.readyTitle": "Почта подтверждена",
    "registration.readyDescription":
      "Открываем Telegram. Почта, согласие и язык уже сохранены.",
    "registration.openTelegram": "Открыть Telegram",
    "registration.errorTerms": "Согласись с Условиями, Политикой и участием в исследованиях, чтобы продолжить.",
    "registration.errorGeneric": "Что-то пошло не так. Попробуй еще раз через секунду.",

    // Cookie Banner
    "cookie.banner_title": "Согласие на Cookie",
    "cookie.banner_text":
      "Мы используем cookie для улучшения вашего опыта. Вы можете принять все, отклонить необязательные или настроить свои предпочтения.",
    "cookie.accept_all": "Принять все",
    "cookie.reject_non_essential": "Отклонить необязательные",
    "cookie.customize": "Настроить",
    "cookie.customize_title": "Настройки Cookie",
    "cookie.save_preferences": "Сохранить настройки",
    "cookie.cancel": "Отменить",
    "cookie.cat_necessary": "Необходимые",
    "cookie.cat_necessary_desc": "Нужны для работы сайта. Нельзя отключить.",
    "cookie.cat_analytics": "Аналитика",
    "cookie.cat_analytics_desc": "Помогают понять, как посетители используют сайт.",
    "cookie.cat_marketing": "Маркетинг",
    "cookie.cat_marketing_desc": "Используются для показа релевантной рекламы.",
    "cookie.cat_functional": "Функциональные",
    "cookie.cat_functional_desc": "Позволяют расширенные функции, такие как настройки и чат.",
  },

  de: {
    // Navbar
    "nav.login": "Anmelden",
    "nav.join": "Mitmachen",

    // Hero
    "hero.headline": "gehe auf ein date mit",
    "hero.highlight": "deinem typ",
    "hero.cta": "Gennety schreiben",
    "hero.disclaimer": "Mit dem Fortfahren stimmst du unseren zu:",
    "hero.terms": "AGB",
    "hero.privacy": "Datenschutz",

    // Countdown
    "countdown.nextMatch": "Nächster Match-Tag:",
    "countdown.joined": "Bereits dabei:",
    "countdown.students": "Studierende",

    // How It Works
    "howItWorks.title": "Wie es",
    "howItWorks.highlight": "funktioniert",
    "step.1.title": "Sag Gennety deinen Typ",
    "step.1.desc": "Gib deine Vorlieben bis Dienstag 23:59 Uhr an.",
    "step.2.title": "Der Donnerstag-Drop",
    "step.2.desc":
      "Checke Telegram um 19 Uhr. Wir senden dir ein personalisiertes Match und kuratieren dein Date!",
    "step.3.title": "Date planen",
    "step.3.desc": "Findet eine Zeit, die für euch beide passt.",
    "step.4.title": "Viel Spaß!",
    "step.4.desc": "Genieße eine tolle Zeit auf deinem Date!",

    // Real Dates
    "realDates.title.highlight": "Echte",
    "realDates.title.rest": "Dates geliefert",
    "metric.1": "1.000+ Dates arrangiert",
    "metric.2": "74% Erfolgsquote",
    "metric.3": "92% wollen ein 2. Date",

    // Matchmaker
    "matchmaker.title.pre": "dein",
    "matchmaker.title.highlight": "persönlicher",
    "matchmaker.title.post": "matchmaker",
    "matchmaker.title": "Dein persönlicher KI-Matchmaker.",
    "matchmaker.subheadline": "Vergiss das Swipen. Chatte unter der Woche mit deinem Agenten und wir organisieren das Blind Date.",
    "matchmaker.chat.msg1": "POV: Es ist Freitagabend. Laute Bar oder gemütliches Treffen?",
    "matchmaker.chat.msg2": "Gemütliches Treffen. Ich bin ausgebrannt.",
    "matchmaker.chat.msg3": "Verständlich. Was ist für dich ein absolutes Red Flag beim ersten Date?",
    "matchmaker.chat.msg4": "Jemand, der sich selbst zu ernst nimmt. Sofortiges No-Go.",
    "matchmaker.chat.msg5": "100%. Gib mir einen Tag. Ich glaube, ich weiß genau, wen du treffen solltest.",
    "matchmaker.1.title": "Basiert auf bester KI-Forschung",
    "matchmaker.1.desc":
      "Entwickelt mit Erkenntnissen von professionellen Matchmakern und führenden Kognitionsforschern.",
    "matchmaker.2.title": "Gennety lernt deine Vorlieben",
    "matchmaker.2.desc":
      "Unsere KI analysiert deine Interessen, Persönlichkeit und deinen Date-Stil für optimale Matches.",
    "matchmaker.3.title": "Scannt den gesamten Pool",
    "matchmaker.3.desc":
      "Jeder Studierende in unserem Netzwerk wird für dein perfektes Match berücksichtigt.",

    // Testimonials
    "testimonials.title.pre": "unvergessliche",
    "testimonials.title.highlight": "schöne Momente",

    // Comparison
    "comparison.title": "genug von tinder und badoo?",
    "comparison.gennety": "Gennety",
    "comparison.competitors": "Konkurrenten",
    "comparison.dateSet": "Dein Date ist für Freitag geplant.",
    "comparison.viewDetails": "Details ansehen.",
    "comparison.newMessage": "1 neue Nachricht",
    "comparison.gennetyDesc": "Ein passendes Match. Eine Nachricht. Fertig.",
    "comparison.unread": "1.000+ ungelesene Nachrichten",
    "comparison.competitorsDesc":
      "Endloses Swipen. Endlose Gespräche über nichts. Keine echten Dates.",

    // Safety
    "safety.title.pre": "verifiziert. privat.",
    "safety.title.highlight": "sicher.",
    "safety.1.title": "Nur verifizierte Studierende",
    "safety.1.desc":
      "Jeder Nutzer wird über die Universitäts-E-Mail verifiziert.",
    "safety.2.title": "Nur dein Match sieht dich",
    "safety.2.desc":
      "Dein Profil ist nicht öffentlich. Nur dein Match kann dich sehen.",
    "safety.3.title": "Kaffee-Dates am Campus",
    "safety.3.desc":
      "Alle Dates finden an sicheren, vertrauten Orten direkt am Campus statt.",

    // FAQ
    "faq.title": "Häufige Fragen",
    "faq.1.q": "Wie findet Gennety Matches?",
    "faq.1.a":
      "Gennety analysiert Profile und gleicht Vorlieben mit modernsten KI-Modellen ab.",
    "faq.2.q": "Wie funktioniert Gennety?",
    "faq.2.a":
      "Gennety organisiert Dates ohne Swipen oder Chatten. Du erhältst direkt Zeit und Ort für dein Date.",
    "faq.3.q": "Was erfahre ich vor dem Date?",
    "faq.3.a":
      "Du erhältst ein Poster mit Fotos und einer kurzen Erklärung, warum ihr gut zusammenpasst.",
    "faq.4.q": "Was, wenn mir mein Match nicht gefällt?",
    "faq.4.a":
      "Du kannst Gennety jederzeit Feedback geben, damit das nächste Match noch besser wird.",
    "faq.5.q": "Wer kann mitmachen?",
    "faq.5.a":
      "Derzeit können nur eingeschriebene Studierende ab 18 Jahren teilnehmen.",
    "faq.6.q": "Was, wenn ich kurzfristig absagen muss?",
    "faq.6.a":
      "Bitte sage deinem Match so früh wie möglich Bescheid, um eine Sperre zu vermeiden.",
    "faq.7.q": "Wie lange dauert es normalerweise?",
    "faq.7.a":
      "Im Durchschnitt dauert es wenige Tage bis zu einer Woche für ein garantiertes Date.",
    "faq.8.q": "Wo finden die Dates statt?",
    "faq.8.a":
      "Die Dates finden an sorgfältig ausgewählten, sicheren Orten am Campus statt.",

    // Marquee
    "marquee.text": "Dates ohne Swipen",
    "marquee.manifesto": "Unsere These",

    // Footer
    "footer.slogan": "Der Freund, der dir fertige Dates schreibt.",
    "footer.telegram": "Telegram",
    "footer.contact": "Kontakt",
    "footer.terms": "AGB",
    "footer.privacy": "Datenschutz",
    "footer.rights": "Gennety. Alle Rechte vorbehalten.",
    "footer.cookie_preferences": "Cookie-Einstellungen",

    // Registration Modal
    "registration.secure": "Sicherer Übergang",
    "registration.close": "Schließen",
    "registration.joinTitle": "Gennety beitreten",
    "registration.joinDescription":
      "Bestätige hier deine Uni-Mail, das Onboarding geht in Telegram weiter.",
    "registration.loginTitle": "Anmelden",
    "registration.loginDescription":
      "Bestätige deine Uni-Mail und wir öffnen den passenden Telegram-Flow.",
    "registration.emailLabel": "E-Mail der Universität",
    "registration.languageLabel": "Onboarding-Sprache",
    "registration.termsPrefix": "Ich stimme den",
    "registration.terms": "AGB",
    "registration.and": "und der",
    "registration.privacy": "Datenschutzerklärung zu",
    "registration.researchOptIn": "Anonyme Nutzung meiner Antworten für Forschungszwecke erlauben.",
    "registration.sendCode": "Code senden",
    "registration.codeSent": "Wir haben einen Code gesendet an",
    "registration.codeLabel": "Bestätigungscode",
    "registration.continueTelegram": "Weiter in Telegram",
    "registration.changeEmail": "E-Mail ändern",
    "registration.resend": "Code erneut senden",
    "registration.readyTitle": "E-Mail verifiziert",
    "registration.readyDescription":
      "Telegram wird geöffnet. E-Mail, Zustimmung und Sprache sind gespeichert.",
    "registration.openTelegram": "Telegram öffnen",
    "registration.errorTerms": "Bitte stimme den AGB, den Datenschutzbestimmungen und der Forschungsvereinbarung zu.",
    "registration.errorGeneric": "Etwas ist schiefgelaufen. Bitte versuche es gleich erneut.",

    // Cookie Banner
    "cookie.banner_title": "Cookie-Zustimmung",
    "cookie.banner_text":
      "Wir verwenden Cookies, um dein Erlebnis zu verbessern. Du kannst alle akzeptieren, ablehnen oder anpassen.",
    "cookie.accept_all": "Alle akzeptieren",
    "cookie.reject_non_essential": "Nur notwendige",
    "cookie.customize": "Anpassen",
    "cookie.customize_title": "Cookie-Einstellungen",
    "cookie.save_preferences": "Einstellungen speichern",
    "cookie.cancel": "Abbrechen",
    "cookie.cat_necessary": "Notwendig",
    "cookie.cat_necessary_desc": "Erforderlich für die Funktion der Website.",
    "cookie.cat_analytics": "Analyse",
    "cookie.cat_analytics_desc": "Hilft uns zu verstehen, wie die Website genutzt wird.",
    "cookie.cat_marketing": "Marketing",
    "cookie.cat_marketing_desc": "Wird für relevante Werbung verwendet.",
    "cookie.cat_functional": "Funktional",
    "cookie.cat_functional_desc": "Ermöglicht erweiterte Funktionen.",
  },

  pl: {
    // Navbar
    "nav.login": "Zaloguj się",
    "nav.join": "Dołącz teraz",

    // Hero
    "hero.headline": "umów się na randkę z",
    "hero.highlight": "twoim typem",
    "hero.cta": "Napisz do Gennety",
    "hero.disclaimer": "Kontynuując, akceptujesz nasz",
    "hero.terms": "Regulamin",
    "hero.privacy": "Prywatność",

    // Countdown
    "countdown.nextMatch": "Następny dzień dopasowań:",
    "countdown.joined": "Już dołączyło:",
    "countdown.students": "studentów",

    // How It Works
    "howItWorks.title": "Jak to",
    "howItWorks.highlight": "działa",
    "step.1.title": "Powiedz Gennety, jaki jest Twój typ",
    "step.1.desc": "Prześlij swoje preferencje do wtorku do 23:59.",
    "step.2.title": "Czwartkowy Drop",
    "step.2.desc":
      "Sprawdź Telegram o 19:00. Wyślemy Ci jedno spersonalizowane dopasowanie i zorganizujemy randkę!",
    "step.3.title": "Zaplanuj randkę",
    "step.3.desc": "Znajdźcie czas, który pasuje Wam obojgu.",
    "step.4.title": "Baw się dobrze!",
    "step.4.desc": "Spędź wspaniały czas na swojej spersonalizowanej randce!",

    // Real Dates
    "realDates.title.highlight": "Prawdziwe",
    "realDates.title.rest": "zorganizowane randki",
    "metric.1": "1 000+ zorganizowanych randek",
    "metric.2": "74% wskaźnik sukcesu",
    "metric.3": "92% chce drugiej randki",

    // Matchmaker
    "matchmaker.title.pre": "twój",
    "matchmaker.title.highlight": "osobisty",
    "matchmaker.title.post": "matchmaker",
    "matchmaker.title": "Twój osobisty AI matchmaker.",
    "matchmaker.subheadline": "Zapomnij o swajpowaniu. Rozmawiaj ze swoim agentem w tygodniu, a my zorganizujemy randkę w ciemno.",
    "matchmaker.chat.msg1": "POV: Jest piątkowy wieczór. Głośny bar czy spokojne miejsce?",
    "matchmaker.chat.msg2": "Spokojne miejsce. Jestem wykończony.",
    "matchmaker.chat.msg3": "Zrozumiałe. Co jest dla Ciebie absolutną czerwoną flagą na pierwszej randce?",
    "matchmaker.chat.msg4": "Ktoś, kto bierze siebie zbyt poważnie. Natychmiastowy minus.",
    "matchmaker.chat.msg5": "100%. Daj mi jeden dzień. Myślę, że wiem dokładnie, z kim powinieneś się spotkać.",
    "matchmaker.1.title": "Oparte na badaniach AI",
    "matchmaker.1.desc":
      "Stworzone na podstawie wiedzy profesjonalnych matchmakerów i badaczy kognitywnych.",
    "matchmaker.2.title": "Gennety uczy się Twoich preferencji",
    "matchmaker.2.desc":
      "Nasza sztuczna inteligencja analizuje Twoje zainteresowania, osobowość i styl randkowania.",
    "matchmaker.3.title": "Skanuje całą bazę",
    "matchmaker.3.desc":
      "Każdy student w naszej sieci jest brany pod uwagę, aby znaleźć idealne dopasowanie.",

    // Testimonials
    "testimonials.title.pre": "niezapomniane",
    "testimonials.title.highlight": "piękne chwile",

    // Comparison
    "comparison.title": "masz dość tindera i badoo?",
    "comparison.gennety": "Gennety",
    "comparison.competitors": "Konkurencja",
    "comparison.dateSet": "Twoja randka jest zaplanowana na piątek.",
    "comparison.viewDetails": "Wyświetl szczegóły.",
    "comparison.newMessage": "1 nowa wiadomość",
    "comparison.gennetyDesc": "Jedno idealne dopasowanie. Jedna wiadomość. Gotowe.",
    "comparison.unread": "1 000+ nieprzeczytanych wiadomości",
    "comparison.competitorsDesc":
      "Nieskończone swajpowanie. Rozmowy o niczym. Brak prawdziwych randek.",

    // Safety
    "safety.title.pre": "zweryfikowane. prywatne.",
    "safety.title.highlight": "bezpieczne.",
    "safety.1.title": "Tylko zweryfikowani studenci",
    "safety.1.desc":
      "Każdy użytkownik jest weryfikowany przez e-mail uniwersytecki.",
    "safety.2.title": "Tylko Twoje dopasowanie Cię widzi",
    "safety.2.desc":
      "Twój profil nie jest publiczny. Tylko wybrane dopasowanie widzi Twój profil.",
    "safety.3.title": "Randki przy kawie na kampusie",
    "safety.3.desc":
      "Wszystkie randki odbywają się w bezpiecznych, znanych miejscach na kampusie.",

    // FAQ
    "faq.title": "Częste pytania",
    "faq.1.q": "Jak Gennety dobiera pary?",
    "faq.1.a":
      "Gennety analizuje profile i dopasowuje preferencje przy użyciu zaawansowanych modeli AI.",
    "faq.2.q": "Jak działa Gennety?",
    "faq.2.a":
      "Gennety organizuje randki bez swajpowania i czatowania. Otrzymujesz gotowy plan randki.",
    "faq.3.q": "Czego dowiem się przed randką?",
    "faq.3.a":
      "Otrzymasz plakat ze zdjęciami i krótkim wyjaśnieniem, dlaczego do siebie pasujecie.",
    "faq.4.q": "Co jeśli dopasowanie mi się nie spodoba?",
    "faq.4.a":
      "Zawsze możesz przekazać nam opinię. Gennety uwzględni ją przy kolejnym dopasowaniu.",
    "faq.5.q": "Kto może wziąć udział?",
    "faq.5.a":
      "Obecnie w programie mogą uczestniczyć wyłącznie zweryfikowani studenci od 18 roku życia.",
    "faq.6.q": "Co jeśli muszę odwołać randkę w ostatniej chwili?",
    "faq.6.a":
      "Poinformuj swoje dopasowanie jak najszybciej, aby uniknąć blokady konta.",
    "faq.7.q": "Ile czasu to zazwyczaj zajmuje?",
    "faq.7.a":
      "Średnio znalezienie gwarantowanej randki zajmuje od kilku dni do tygodnia.",
    "faq.8.q": "Gdzie odbywają się randki?",
    "faq.8.a":
      "Randki odbywają się w starannie wyselekcjonowanych, bezpiecznych kawiarniach na kampusie.",

    // Marquee
    "marquee.text": "Randki bez swajpowania",
    "marquee.manifesto": "Nasza teza",

    // Footer
    "footer.slogan": "Przyjaciel, który umawia Cię na gotowe randki.",
    "footer.telegram": "Telegram",
    "footer.contact": "Kontakt",
    "footer.terms": "Regulamin",
    "footer.privacy": "Prywatność",
    "footer.rights": "Gennety. Wszelkie prawa zastrzeżone.",
    "footer.cookie_preferences": "Ustawienia plików cookie",

    // Registration Modal
    "registration.secure": "Bezpieczne przejście",
    "registration.close": "Zamknij",
    "registration.joinTitle": "Dołącz do Gennety",
    "registration.joinDescription":
      "Potwierdź swój e-mail uniwersytecki tutaj, a onboarding dokończysz w Telegramie.",
    "registration.loginTitle": "Zaloguj się",
    "registration.loginDescription":
      "Potwierdź swój e-mail uniwersytecki, a my otworzymy odpowiedni przepływ w Telegramie.",
    "registration.emailLabel": "E-mail uniwersytecki",
    "registration.languageLabel": "Język onboardingu",
    "registration.termsPrefix": "Akceptuję",
    "registration.terms": "Regulamin",
    "registration.and": "oraz",
    "registration.privacy": "Politykę prywatności",
    "registration.researchOptIn": "Zezwalam na anonimowe wykorzystanie moich odpowiedzi do badań.",
    "registration.sendCode": "Wyślij kod",
    "registration.codeSent": "Wysłaliśmy kod na",
    "registration.codeLabel": "Kod weryfikacyjny",
    "registration.continueTelegram": "Kontynuuj w Telegramie",
    "registration.changeEmail": "Zmień e-mail",
    "registration.resend": "Wyślij kod ponownie",
    "registration.readyTitle": "E-mail zweryfikowany",
    "registration.readyDescription":
      "Otwieranie Telegrama. Twój e-mail, zgody i język zostały zapisane.",
    "registration.openTelegram": "Otwórz Telegram",
    "registration.errorTerms": "Zaakceptuj Regulamin, Politykę prywatności oraz Zgodę na badania, aby kontynuować.",
    "registration.errorGeneric": "Coś poszło nie tak. Spróbuj ponownie za chwilę.",

    // Cookie Banner
    "cookie.banner_title": "Zgoda na pliki cookie",
    "cookie.banner_text":
      "Używamy plików cookie, aby poprawić Twoje doświadczenia. Możesz zaakceptować wszystkie, odrzucić opcjonalne lub dostosować ustawienia.",
    "cookie.accept_all": "Akceptuj wszystkie",
    "cookie.reject_non_essential": "Odrzuć opcjonalne",
    "cookie.customize": "Dostosuj",
    "cookie.customize_title": "Ustawienia plików cookie",
    "cookie.save_preferences": "Zapisz ustawienia",
    "cookie.cancel": "Anuluj",
    "cookie.cat_necessary": "Niezbędne",
    "cookie.cat_necessary_desc": "Wymagane do działania strony. Nie można ich wyłączyć.",
    "cookie.cat_analytics": "Analityczne",
    "cookie.cat_analytics_desc": "Pomagają nam zrozumieć, jak użytkownicy korzystają ze strony.",
    "cookie.cat_marketing": "Marketingowe",
    "cookie.cat_marketing_desc": "Służą do wyświetlania odpowiednich reklam.",
    "cookie.cat_functional": "Funkcjonalne",
    "cookie.cat_functional_desc": "Umożliwiają zaawansowane funkcje i personalizację.",
  },
} as const;

export type Dictionary = typeof translations.en;
