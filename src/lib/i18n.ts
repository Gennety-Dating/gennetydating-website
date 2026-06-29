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

    // Difference
    "difference.title.highlight": "The",
    "difference.title.rest": "difference",
    "difference.insteadOfThis": "Instead of this",
    "difference.doThis": "Do this",
    "difference.description": "Gennety removes the endless swiping, superficial small talk, and ghosting. Our AI matchmaker does the work and sends you directly on real dates.",
    "difference.tinder.nope": "NOPE",
    "difference.tinder.like": "LIKE",
    "difference.tinder.distance": "Nearby Campus",
    "difference.tinder.profile1.name": "Sofia, 21",
    "difference.tinder.profile1.bio": "Loves cozy coffee shops & vinyl records ☕️🎶",
    "difference.tinder.profile1.college": "NYU",
    "difference.tinder.profile2.name": "Anna, 20",
    "difference.tinder.profile2.bio": "Road trips, morning runs & iced matcha latte 🚗🍵",
    "difference.tinder.profile2.college": "Columbia",
    "difference.tinder.profile3.name": "Alex, 22",
    "difference.tinder.profile3.bio": "Looking for a tennis buddy & indie rock concerts 🎾🎸",
    "difference.tinder.profile3.college": "NYU",
    "difference.tinder.profile4.name": "Dmitry, 19",
    "difference.tinder.profile4.bio": "Coding all night, coffee all day. Let's study together 💻☕️",
    "difference.tinder.profile4.college": "Brooklyn College",
    "difference.tinder.profile5.name": "Maria, 22",
    "difference.tinder.profile5.bio": "Let's explore museums and art galleries 🎨🏛️",
    "difference.tinder.profile5.college": "Columbia",
    "difference.chat.status": "online",
    "difference.chat.msg1": "Hey! Let's find your Thursday date. Cozy cafe or loud bar?",
    "difference.chat.msg2": "Definitely cozy cafe. Somewhere quiet so we can actually talk.",
    "difference.chat.msg3": "Got it. Coffee vibez. Any major red flags I should filter out?",
    "difference.chat.msg4": "People who take themselves too seriously. Instant dealbreaker.",
    "difference.chat.msg5": "Noted! Analyzing profiles at NYU... 🧠",
    "difference.chat.msg6": "Found a great match for you! Here's your Thursday drop 🎫",
    "difference.chat.ticket.title": "Thursday Drop Ticket",
    "difference.chat.ticket.venue": "Campus Coffee House",
    "difference.chat.ticket.time": "Thursday @ 18:30",
    "difference.chat.ticket.match": "Match: Sofia, 21 (NYU)",
    "difference.chat.ticket.desc": "Synergy-Score: 94%",
    "difference.chat.ticket.verification": "Passed face verification, which means: the photos in the profile match their identity and belong to them personally.",
    "difference.chat.ticket.name": "Sofia, 21",
    "difference.chat.ticket.verified": "Verified",
    "difference.chat.ticket.synergy": "Synergy 94/99 — You both value intellectual depth and clear, meaningful communication.",
    "difference.chat.ticket.synergyDesc": "Sofia is thoughtful and purpose-driven — a genuine chance to connect over deep ideas and shared intellectual curiosity.",
    "difference.chat.ticket.timeRemaining": "24h left to reply",
    "difference.chat.ticket.accept": "Accept",
    "difference.chat.ticket.pass": "Pass",
    "difference.chat.ticket.report": "Report",
    "difference.options.title": "Select Preview Option:",
    "difference.options.1": "Option 1: Agent HUD",
    "difference.options.2": "Option 2: Live Status",
    "difference.options.3": "Option 3: Scrapbook Note",
    "difference.options.4": "Option 4: Chat Narrative",
    "difference.options.all": "Show All Options",
    "difference.hud.title": "AGENT STATUS",
    "difference.hud.mode": "24/7 Matchmaking",
    "difference.hud.scanned": "Candidates Screened",
    "difference.hud.scanned.val": "4,520+ students",
    "difference.hud.time": "Time Messaging",
    "difference.hud.time.val": "0 minutes",
    "difference.hud.badge": "100% Autopilot",
    "difference.status.ticker": "AGENT ACTIVE: 24/7 match search | Scanned 1,420 candidates for you today",
    "difference.note.title": "No Chats. Just Dates.",
    "difference.note.body": "Stop wasting hours typing empty messages. While you study or sleep, your personal AI agent works 24/7 checking thousands of profiles to arrange your next real date.",
    "difference.chat.msg5.upgraded": "Analyzing NYU profiles 24/7... Checked 3,840 candidates to find the one. 🧠",
    "difference.chat.msg5.extra": "Zero messaging required. I do the matching and schedule the date. ⚡️",

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
    "safety.3.title": "Coffee meetups",
    "safety.3.desc":
      "All dates take place in verified, busy, and safe venues.",

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
    "footer.thesis": "Our Thesis",
    "thesis.title": "our thesis",
    "thesis.p1": "For a long time, the dating market has been overdue for a complete rethink. Everyone has a need for romantic relationships. Yet, all the technology we have studied has primarily helped people only where they faced the most barriers and obstacles for various reasons. That pain point has always been the initial contact, and every player in this market has tried to ease and simplify it by bringing it online. While thinking in this direction is correct, the form in which this first contact is usually packaged seems almost cursed, and today it is found nearly everywhere.",
    "thesis.p2": "Different apps differentiated themselves mostly by target audience: apps for serious relationships, for casual flings, for plus-size people, for thin people, for the LGBTQ+ community, local apps for specific countries, and so on. But the principle always remained the same: you sit in front of a screen and sift through profiles, hundreds of profiles. For an average person to go on just one date using modern dating apps, it takes an average of 9,500 swipes—equivalent to 9,500 profiles. This is unforgivably high and consumes a monstrous amount of time. And let's not forget: filtering through ten thousand profiles is still not the end of the journey.",
    "thesis.list.title": "You still need to:",
    "thesis.list.item1": "1. Wait for a mutual match.",
    "thesis.list.item2": "2. Avoid breaking off contact on the very first message in the chat, which is usually either very awkward or painfully generic.",
    "thesis.list.item3": "3. Avoid falling victim to scams or fake profiles, which are rampant in these apps today.",
    "thesis.list.item4": "4. And finally, strike up a normal conversation. Such chats are usually drawn-out and rarely lead to an actual, in-person meeting.",
    "thesis.p4": "We all understand that during an in-person meeting, you see a person's emotions, their reactions, behavior, and body language—that vast array of signals that enable you to make a decision. None of this exists in a chat.",
    "thesis.p5": "Furthermore, the presence of a chat provides more opportunities for scammers. Today, this is a whole industry, and dating apps serve as a major traffic channel for it.",
    "thesis.p6": "So the big question is: is chat really a necessity in such apps? After all, people used to meet in public, their initial contact happened much faster, and they received feedback instantly. Today, this feedback is dragged out for weeks, if not months.",
    "thesis.p7": "There is also a massive problem related to the scam market. For instance, in 2025 alone, the male population in the US lost $400,000,000 inside dating apps. The same happened in the UK, where the losses amounted to £105,000,000 (again, only among men and only in dating services).",
    "thesis.p8": "Perhaps one of the main flaws of the dating industry today and for many years is the unequal distribution of users by gender within these services. This demographic imbalance between women and men has remained the most pressing issue in recent years, one that former Tinder executives, among others, have tried to solve.",
    "thesis.p9": "The most prominent case is the founder of Bumble, the second-largest dating conglomerate by market cap, which today owns several major dating apps in its portfolio, including Bumble, Badoo, and others. This problem is driven mostly, first and foremost, by human nature, and secondly, by the mechanics built into existing apps. Men tend to adopt a more active and assertive strategy: they swipe right about 6 times more often than women, message more frequently, and spend more time on the platform.",
    "thesis.p10": "As a result of this behavior, women act more cautiously and become highly selective. This forces men to be even more persistent to maximize their chances, and this loop only reinforces itself, highlighting once again the flaws of current mechanics in dating apps. By simply eliminating the chat and the ability to sift through thousands of profiles a day, and constraining this via the app's core mechanics, we already rid ourselves of most major problems.",
    "thesis.p11": "Today, people find solutions in personal matchmakers, or professional matchmakers. But not everyone can afford them, and they have their own downsides.",
    "thesis.p12": "Indeed, the lifestyle and general pace of life for many people has changed. Moving to big cities and megacities leaves people with less time for a personal life: we work more and have less time to occupy ourselves with this endless search.",
    "thesis.p13": "That is why we clearly see all these issues: a large number of fakes, fraud, burnout and fatigue from endless swiping and scrolling of profiles, as well as low efficiency and conversion into actual dates.",
    "thesis.p14": "With today’s technology, people’s habit of sharing personal data to improve their digital experience, and the well-established expectation of personalized service, it is truly surprising that the dating market has gone ignored for so long.",

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
    "places.title.pre": "Real places for",
    "places.title.highlight": "real dates",
    "places.cta": "Choose your city to see where dates usually happen",
    "places.subtitle": "These places",
    "places.desc": "These locations show the real picture: specific venues and spots approved by our team for dates that are actively integrated into our matchmaking algorithm.",
    "places.view_all": "Explore all approved places",
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
    "countdown.nextMatch": "Наступний день метчів:",
    "countdown.joined": "Вже приєдналися:",
    "countdown.students": "студентів",

    // How It Works
    "howItWorks.title": "Як це",
    "howItWorks.highlight": "працює",
    "step.1.title": "Розкажи Gennety свій тип",
    "step.1.desc": "Надішли свої вподобання до вівторка 23:59.",
    "step.2.title": "Четверговий дроп",
    "step.2.desc":
      "Перевір Telegram о 19:00. Ми надішлемо тобі персональний метч і організуємо побачення!",
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

    // Difference
    "difference.title.highlight": "У чому",
    "difference.title.rest": "різниця?",
    "difference.insteadOfThis": "Замість цього",
    "difference.doThis": "Роби так",
    "difference.description": "Gennety позбавляє від нескінченних свайпів, порожніх розмов і ігнору. Наш AI-асистент підбирає пару та організовує побачення за тебе.",
    "difference.tinder.nope": "Мимо",
    "difference.tinder.like": "Лайк",
    "difference.tinder.distance": "Поруч із кампусом",
    "difference.tinder.profile1.name": "Софія, 21",
    "difference.tinder.profile1.bio": "Люблю затишні кав'ярні та вінілові платівки ☕️🎶",
    "difference.tinder.profile1.college": "NYU",
    "difference.tinder.profile2.name": "Анна, 20",
    "difference.tinder.profile2.bio": "Автоподорожі, ранкові пробіжки та айс матча лате 🚗🍵",
    "difference.tinder.profile2.college": "Columbia",
    "difference.tinder.profile3.name": "Алекс, 22",
    "difference.tinder.profile3.bio": "Шукаю партнера для тенісу та інді-рок концертів 🎾🎸",
    "difference.tinder.profile3.college": "NYU",
    "difference.tinder.profile4.name": "Дмитро, 19",
    "difference.tinder.profile4.bio": "Коджу всю ніч, п'ю каву весь день. Давай вчитися разом 💻☕️",
    "difference.tinder.profile4.college": "Brooklyn College",
    "difference.tinder.profile5.name": "Марія, 22",
    "difference.tinder.profile5.bio": "Давай сходимо в музей або арт-галерею 🎨🏛️",
    "difference.tinder.profile5.college": "Columbia",
    "difference.chat.status": "в мережі",
    "difference.chat.msg1": "Привіт! Давай знайдемо тобі пару на четвер. Затишне кафе чи шумний бар?",
    "difference.chat.msg2": "Точно затишне кафе. Де тихо, щоб можна було нормально поспілкуватися.",
    "difference.chat.msg3": "Прийнято. Кавовий вайб. Які головні ред флаги відсіяти?",
    "difference.chat.msg4": "Люди, які ставляться до себе занадто серйозно. Одразу ні.",
    "difference.chat.msg5": "Записав! Аналізую профілі в NYU... 🧠",
    "difference.chat.msg6": "Знайшов чудову пару! Ось твій квиток на четвер 🎫",
    "difference.chat.ticket.title": "Квиток на побачення",
    "difference.chat.ticket.venue": "Campus Coffee House",
    "difference.chat.ticket.time": "Четвер @ 18:30",
    "difference.chat.ticket.match": "Пара: Софія, 21 (NYU)",
    "difference.chat.ticket.desc": "Сумісність: 94%",
    "difference.chat.ticket.verification": "Пройшов перевірку обличчя, що означає: фотографії в профілі відповідають його особі та належать особисто йому.",
    "difference.chat.ticket.name": "Софія, 21",
    "difference.chat.ticket.verified": "Перевірено",
    "difference.chat.ticket.synergy": "Синергія 94/99 — Ви обидва цінуєте інтелектуальну глибину та зрозуміле, змістовне спілкування.",
    "difference.chat.ticket.synergyDesc": "Софія вдумлива і цілеспрямована — реальний шанс порозумітися на ґрунті глибоких ідей та спільної інтелектуальної цікавості.",
    "difference.chat.ticket.timeRemaining": "Залишилось 24 год для відповіді",
    "difference.chat.ticket.accept": "Прийняти",
    "difference.chat.ticket.pass": "Пас",
    "difference.chat.ticket.report": "Скаржитись",
    "difference.options.title": "Оберіть варіант прев'ю:",
    "difference.options.1": "Варіант 1: Панель агента",
    "difference.options.2": "Варіант 2: Статус-бар",
    "difference.options.3": "Варіант 3: Записка",
    "difference.options.4": "Варіант 4: Апгрейд чата",
    "difference.options.all": "Показати все",
    "difference.hud.title": "СТАТУС АГЕНТА",
    "difference.hud.mode": "Метчмейкінг 24/7",
    "difference.hud.scanned": "Анкет оброблено",
    "difference.hud.scanned.val": "4,520+ студентів",
    "difference.hud.time": "Час у чатах",
    "difference.hud.time.val": "0 хвилин",
    "difference.hud.badge": "100% Автопілот",
    "difference.status.ticker": "АГЕНТ АКТИВНИЙ: пошук 24/7 | Сьогодні оброблено 1,420 анкет",
    "difference.note.title": "Без чатів. Тільки побачення.",
    "difference.note.body": "Досить витрачати години на безглузде листування. Поки ви вчитеся або спите, ваш персональний AI-агент працює 24/7, перебираючи тисячі анкет, щоб організувати вам реальну зустріч.",
    "difference.chat.msg5.upgraded": "Аналізую анкети NYU 24/7... Оброблено 3,840 компетентних пар. 🧠",
    "difference.chat.msg5.extra": "Листування не потрібне. Я підберу пару та організую побачення сам. ⚡️",

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
      "Кожен студент у нашій мережі розглядається для пошуку найкращого метчу.",

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
    "comparison.gennetyDesc": "Один підібраний метч. Одне повідомлення. Готово.",
    "comparison.unread": "1 000+ непрочитаних повідомлень",
    "comparison.competitorsDesc":
      "Нескінченні свайпи. Нескінченні розмови ні про що. Жодних реальних побачень.",

    // Safety
    "safety.title.pre": "перевірено. приватно.",
    "safety.title.highlight": "безпечно.",
    "safety.1.title": "Тільки перевірені студенти",
    "safety.1.desc":
      "Кожен проходить перевірку через університетську пошту.",
    "safety.2.title": "Тебе бачить твій метч",
    "safety.2.desc":
      "Твій профіль нікому не видно, крім того, з ким тебе познайомить Gennety.",
    "safety.3.title": "Зустрічі за кавою",
    "safety.3.desc":
      "Усі побачення проходять у перевірених, людних і безпечних закладах.",

    // FAQ
    "faq.title": "Часті питання",
    "faq.1.q": "Як Gennety підбирає пари?",
    "faq.1.a":
      "Gennety підбирає тобі пару, аналізуючи профілі та порівнюючи вподобання. Цей процес використовує потужні обчислення та симуляції для найкращих інсайтів. Використовуючи можливості передових LLM, ми вловлюємо найменші ознаки потенційно вдалого побачення. У нас також є агентна система, що оркеструє різних експертних агентів: аналітиків, експертів з мейкінгу, дизайнерів постерів, планувальників тощо.",
    "faq.2.q": "Як працює Gennety",
    "faq.2.a":
      "Gennety організовує побачення без необхідності свайпати чи листуватися. Після заповнення анкети Gennety надішле тобі план побачення з часом, місцем та деталями про твій метч. Побачення відбудеться біля кампусу, де ти зараз знаходишся.",
    "faq.3.q": "Що я дізнаюсь про свій метч до побачення?",
    "faq.3.a":
      "Коли ми знайдемо для тебе гарний метч, ти отримаєш постер з фотографіями та коротким поясненням, чому ви підходите одне одному. Також ти отримаєш планувальник для вибору зручного часу на тиждень. Після того, як обоє заповнять його, ми організуємо час, місце та дамо декілька порад для побачення.",
    "faq.4.q": "Що якщо мені не сподобався мій метч?",
    "faq.4.a":
      "Ти завжди можеш написати Gennety причину та будь-який зворотний зв'язок. Gennety організує інше побачення з урахуванням твого фідбеку. Також можна оновити свій профіль та вподобання.",
    "faq.5.q": "Хто бере участь?",
    "faq.5.a":
      "Наразі Gennety можуть користуватися лише студенти від 18 років.",
    "faq.6.q": "Що якщо я не зможу прийти в останній момент?",
    "faq.6.a":
      "Якщо ти дійсно не можеш прийти в останній момент, будь ласка, скасуй побачення, написавши своєму метчу якнайшвидше, щоб уникнути бану.",
    "faq.7.q": "Скільки зазвичай це займає часу?",
    "faq.7.a":
      "Оскільки ми випускаємо цей досвід лише для обраної групи студентів, ми оцінюємо, що знадобиться приблизно один-два тижні для гарантованого побачення за кавою. Завдяки нещодавньому оновленню системи, 70% користувачів отримують перше побачення протягом 2 днів після реєстрації.",
    "faq.8.q": "Де проходять побачення?",
    "faq.8.a":
      "Побачення проходять у ретельно обраних місцях на кампусі для безпечного та приємного досвіду.",

    // Marquee
    "marquee.text": "Побачення без свайпів",
    "marquee.manifesto": "Наша ідея",

    // Footer
    "footer.slogan": "Друг, який організує для тебе побачення.",
    "footer.telegram": "Telegram",
    "footer.contact": "Контакти",
    "footer.terms": "Умови",
    "footer.privacy": "Конфіденційність",
    "footer.rights": "Gennety. Усі права захищені.",
    "footer.cookie_preferences": "Налаштування Cookie",
    "footer.thesis": "Наш маніфест",
    "thesis.title": "наш маніфест",
    "thesis.p1": "Уже давно ринок дейтингу вимагав нашого переосмислення. У кожної людини є потреба в романтичних стосунках, проте технології за весь той час, що нам довелося вивчити, в основному допомагали людям переважно лише в тому, де для них було найбільше різних бар'єрів та перешкод з різних причин. Цією точкою завжди був перший контакт, і всі гравці цього ринку завжди намагалися його полегшити, спростити, перевівши його в онлайн. Мислити в цьому напрямку — це правильно, але форма, в яку зазвичай обгортався цей перший контакт, наче якась проклята і сьогодні зустрічається майже всюди.",
    "thesis.p2": "Різні застосунки диференціювалися в основному лише за аудиторією: додатки для серйозних стосунків, для коротких інтрижок, для повних, для худих, для ЛГБТ-спільноти, локальні для конкретних країн тощо. Але принцип завжди залишався один: ти сидиш перед екраном і перебираєш анкети, сотні анкет. Щоб піти на одне побачення звичайній людині, використовуючи сучасні додатки для знайомств, в середньому потрібно 9500 свайпів, що еквівалентно 9500 анкет — це непростимо багато і, крім того, займає нечувано багато часу. А ви ж не взагалі забувайте, що перебрати з десяток тисяч анкет — це ще не кінець.",
    "thesis.list.title": "Необхідно:",
    "thesis.list.item1": "1. Дочекатися взаємної симпатії.",
    "thesis.list.item2": "2. Не обірвати контакт на першому повідомленні в чаті, які зазвичай або дуже дурні, або страшно шаблонні.",
    "thesis.list.item3": "3. Не стати жертвою шахрайства або фейку, що сьогодні повсюдно зустрічається в цих додатках.",
    "thesis.list.item4": "4. Ну і нарешті, зав'язати нормальний діалог у чаті. Такі листування зазвичай бувають досить тривалими і рідко коли переростають у реальну зустріч.",
    "thesis.p4": "Всі ми розуміємо, що при особистій зустрічі ти бачиш емоції людини, її реакції, поведінку, жестикуляцію — ту величезну кількість сигналів, які дають можливість прийняти рішення. Всього цього немає в чаті.",
    "thesis.p5": "До того ж наявність чату дає більше можливостей шахраям. Сьогодні це ціла індустрія, і великим каналом трафіку для неї є саме дейтинг-додатки.",
    "thesis.p6": "Тому велике питання: чи є чат необхідністю в подібних додатках? Адже раніше люди знайомилися на вулицях, їх перший контакт відбувався набагато швидше, і зворотний зв'язок вони отримували миттєво. Сьогодні ж цей зворотний зв'язок затягується на тижні, а то й місяці.",
    "thesis.p7": "Є також велика проблема, пов'язана зі скам-ринком. Наприклад: тільки в 2025 році чоловіче населення в США втратило 400 000 000 доларів усередині додатків для знайомств. Те ж саме сталося у Великобританії, де розмір збитків склав 105 000 000 фунтів (знову ж таки, тільки серед чоловіків і тільки в дейтинг-сервісах).",
    "thesis.p8": "Напевно, один із головних недоліків дейтинг-індустрії сьогодні і протягом багатьох років — це нерівний розподіл користувачів за статтю всередині сервісів. Цей демографічний перекіс між жінками та чоловіками залишався останніми роками найгострішою проблемою, яку намагалися вирішити, наприклад, вихідці з Tinder.",
    "thesis.p9": "Найяскравіший кейс — засновниця Bumble, другого за капіталізацією холдингу, який сьогодні містить у портфелі кілька великих додатків для знайомств, таких як Bumble, Badoo та ряд інших. Ця проблема продиктована в більшості своїй, в першу чергу, нашою природою і, в другу чергу, механіками, які закладені в існуючі додатки. Чоловіки схильні до більш активної та наполегливої стратегії: вони лайкають приблизно в 6 разів частіше, ніж дівчата, частіше пишуть і проводять на сервісі більше часу.",
    "thesis.p10": "Дівчата внаслідок такої поведінки поводяться акуратніше і стають більш перебірливими. Через це чоловіки змушені бути ще наполегливішими, щоб максимізувати свої шанси, і ця петля тільки посилюється, що ще раз показує нам недосконалість поточних механік у дейтинг-додатках. Адже просто виключивши чат і можливість перебирать по тисячі анкет на день, обмеживши це механіками додатка, мы вже позбавляємося більшості головних проблем.",
    "thesis.p11": "Сьогодні люди знаходять рішення в особистих матчмейкерах, або як їх ще називають — професійних свахах. Але не кожен може їх собі дозволити, та й у них теж є свої мінуси.",
    "thesis.p12": "Так, уклад життя і загалом ритм життя багатьох людей змінився. З переїздом у великі міста та мегаполіси у людей все менше часу на особисте життя: ми все більше працюємо, і в нас залишається все менше часу на те, щоб займати себе цим нескінченним пошуком.",
    "thesis.p13": "Тому ми однозначно бачимо всі ці проблеми: велику кількість фейків, шахрайство, вигорання та втому від нескінченного свайпінгу та скролінгу анкет, а також низьку ефективність і конверсію в побачення.",
    "thesis.p14": "З сьогоднішніми технологіями, звичкою людей надавати свої особисті дані та інформацію для вдосконалення свого цифрового досвіду та вже усталеним очікуванням персоналізованого сервісу, просто дивно, що ринок дейтингу так довго залишався без уваги.",

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
    "places.title.pre": "Справжні місця для",
    "places.title.highlight": "реальних побачень",
    "places.cta": "Оберіть місто, щоб побачити, де проходять побачення",
    "places.subtitle": "Ці місця",
    "places.desc": "Ці локації відображають реальну картину: які саме заклади та місця загалом схвалені нашою командою для проведення побачень і реально беруть участь в алгоритмі підбору.",
    "places.view_all": "Переглянути всі схвалені місця",
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
    "countdown.nextMatch": "Следующий день мэтчей:",
    "countdown.joined": "Уже присоединились:",
    "countdown.students": "студентов",

    // How It Works
    "howItWorks.title": "Как это",
    "howItWorks.highlight": "работает",
    "step.1.title": "Расскажи Gennety свой тип",
    "step.1.desc": "Отправь свои предпочтения до вторника 23:59.",
    "step.2.title": "Четверговый дроп",
    "step.2.desc":
      "Проверь Telegram в 19:00. Мы пришлем тебе персональный мэтч и организуем свидание!",
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

    // Difference
    "difference.title.highlight": "В чём",
    "difference.title.rest": "разница?",
    "difference.insteadOfThis": "Вместо этого",
    "difference.doThis": "Делай так",
    "difference.description": "Gennety избавляет от бесконечных свайпов, пустой болтовни и игнора. Наш AI-ассистент подбирает пару и организует свидание за тебя.",
    "difference.tinder.nope": "Мимо",
    "difference.tinder.like": "Лайк",
    "difference.tinder.distance": "Рядом с кампусом",
    "difference.tinder.profile1.name": "София, 21",
    "difference.tinder.profile1.bio": "Люблю уютные кофейни и виниловые пластинки ☕️🎶",
    "difference.tinder.profile1.college": "NYU",
    "difference.tinder.profile2.name": "Анна, 20",
    "difference.tinder.profile2.bio": "Автопутешествия, утренние пробежки и айс матча латте 🚗🍵",
    "difference.tinder.profile2.college": "Columbia",
    "difference.tinder.profile3.name": "Алекс, 22",
    "difference.tinder.profile3.bio": "Ищу напарника для тенниса и инди-рок концертов 🎾🎸",
    "difference.tinder.profile3.college": "NYU",
    "difference.tinder.profile4.name": "Дмитрий, 19",
    "difference.tinder.profile4.bio": "Кожу всю ночь, пью кофе весь день. Давай учиться вместе 💻☕️",
    "difference.tinder.profile4.college": "Brooklyn College",
    "difference.tinder.profile5.name": "Мария, 22",
    "difference.tinder.profile5.bio": "Давай сходим в музей или арт-галерею 🎨🏛️",
    "difference.tinder.profile5.college": "Columbia",
    "difference.chat.status": "в сети",
    "difference.chat.msg1": "Привет! Давай найдем тебе пару на четверг. Уютное кафе или шумный бар?",
    "difference.chat.msg2": "Точно уютное кафе. Где тихо, чтобы можно было пообщаться.",
    "difference.chat.msg3": "Принято. Кофейный вайб. Какие главные ред флаги отсечь?",
    "difference.chat.msg4": "Люди, которые относятся к себе слишком серьезно. Сразу нет.",
    "difference.chat.msg5": "Записал! Анализирую анкеты в NYU... 🧠",
    "difference.chat.msg6": "Нашел отличную пару! Вот твой билет на четверг 🎫",
    "difference.chat.ticket.title": "Билет на свидание",
    "difference.chat.ticket.venue": "Campus Coffee House",
    "difference.chat.ticket.time": "Четверг @ 18:30",
    "difference.chat.ticket.match": "Пара: София, 21 (NYU)",
    "difference.chat.ticket.desc": "Совместимость: 94%",
    "difference.chat.ticket.verification": "Прошел проверку лица, что означает: фотографии в профиле соответствуют его личности и принадлежат лично ему.",
    "difference.chat.ticket.name": "София, 21",
    "difference.chat.ticket.verified": "Проверен",
    "difference.chat.ticket.synergy": "Синергия 94/99 — Вы оба цените интеллектуальную глубину и понятное, содержательное общение.",
    "difference.chat.ticket.synergyDesc": "София вдумчива и целеустремленна — реальный шанс сблизиться на почве глубоких идей и взаимного интеллектуального любопытства.",
    "difference.chat.ticket.timeRemaining": "Осталось 24 ч для ответа",
    "difference.chat.ticket.accept": "Принять",
    "difference.chat.ticket.pass": "Пас",
    "difference.chat.ticket.report": "Пожаловаться",
    "difference.options.title": "Выберите вариант превью:",
    "difference.options.1": "Вариант 1: Панель агента",
    "difference.options.2": "Вариант 2: Статус-бар",
    "difference.options.3": "Вариант 3: Записка",
    "difference.options.4": "Вариант 4: Апгрейд чата",
    "difference.options.all": "Показать всё",
    "difference.hud.title": "СТАТУС АГЕНТА",
    "difference.hud.mode": "Мэтчмейкинг 24/7",
    "difference.hud.scanned": "Анкет обработано",
    "difference.hud.scanned.val": "4,520+ студентов",
    "difference.hud.time": "Время в чате",
    "difference.hud.time.val": "0 минут",
    "difference.hud.badge": "100% Автопилот",
    "difference.status.ticker": "АГЕНТ АКТИВЕН: поиск 24/7 | Сегодня обработано 1,420 анкет",
    "difference.note.title": "Без чатов. Только свидания.",
    "difference.note.body": "Хватит тратить часы на бессмысленную переписку. Пока вы учитесь или спите, ваш персональный AI-агент работает 24/7, перебирая тысячи анкет, чтобы организовать вам реальную встречу.",
    "difference.chat.msg5.upgraded": "Анализирую анкеты NYU 24/7... Обработано 3,840 кандидатов для идеального мэтча. 🧠",
    "difference.chat.msg5.extra": "Переписка не требуется. Я подберу пару и организую свидание сам. ⚡️",

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
      "Каждый студент в нашей сети рассматривается для поиска идеального мэтча.",

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
    "comparison.gennetyDesc": "Один подобранный мэтч. Одно сообщение. Готово.",
    "comparison.unread": "1 000+ непрочитанных сообщений",
    "comparison.competitorsDesc":
      "Бесконечные свайпы. Бесконечные разговоры ни о чем. Никаких реальных свиданий.",

    // Safety
    "safety.title.pre": "проверено. приватно.",
    "safety.title.highlight": "безопасно.",
    "safety.1.title": "Только верифицированные студенты",
    "safety.1.desc":
      "Каждый проходит проверку через университетскую почту.",
    "safety.2.title": "Тебя видит твой мэтч",
    "safety.2.desc":
      "Твой профиль никому не виден, кроме того, с кем тебя познакомит Gennety.",
    "safety.3.title": "Встречи за кофе",
    "safety.3.desc":
      "Все свидания проходят в проверенных, людных и безопасных заведениях.",

    // FAQ
    "faq.title": "Частые вопросы",
    "faq.1.q": "Как Gennety подбирает пары?",
    "faq.1.a":
      "Gennety подбирает тебе пару, анализируя профили и сопоставляя предпочтения. Этот процесс использует мощные вычисления и симуляции для лучших инсайтов.",
    "faq.2.q": "Как работает Gennety",
    "faq.2.a":
      "Gennety организует свидания без необходимости свайпать или переписываться. После заполнения анкеты Gennety пришлет тебе план свидания с временем, местом и деталями о твоем мэтче.",
    "faq.3.q": "Что я узнаю о своем мэтче до свидания?",
    "faq.3.a":
      "Когда мы найдем для тебя хороший мэтч, ты получишь постер с фотографиями и кратким объяснением, почему вы подходите друг другу.",
    "faq.4.q": "Что если мне не понравился мой мэтч?",
    "faq.4.a":
      "Ты всегда можешь написать Gennety, если что-то пошло не так, и поделиться обратной связью. Gennety организует другое свидание с учётом твоих пожеланий.",
    "faq.5.q": "Кто участвует?",
    "faq.5.a":
      "Сейчас Gennety могут пользоваться только студенты старше 18 лет.",
    "faq.6.q": "Что если я не смогу прийти в последний момент?",
    "faq.6.a":
      "Если ты действительно не можешь прийти в последний момент, пожалуйста, отмени свидание, написав своему мэтчу как можно скорее, чтобы избежать бана.",
    "faq.7.q": "Сколько обычно это занимает времени?",
    "faq.7.a":
      "В среднем подбор идеальной пары занимает от нескольких дней до одной недели.",
    "faq.8.q": "Где проходят свидания?",
    "faq.8.a":
      "Свидания проходят в тщательно выбранных местах на кампусе для безопасного и приятного опыта.",

    // Marquee
    "marquee.text": "Свидания без свайпов",
    "marquee.manifesto": "Наша идея",

    // Footer
    "footer.slogan": "Друг, который организует для тебя свидание.",
    "footer.telegram": "Telegram",
    "footer.contact": "Контакты",
    "footer.terms": "Условия",
    "footer.privacy": "Конфиденциальность",
    "footer.rights": "Gennety. Все права защищены.",
    "footer.cookie_preferences": "Настройки Cookie",
    "footer.thesis": "Наш манифест",
    "thesis.title": "наш манифест",
    "thesis.p1": "Рынок дейтинга давно устарел. У всех есть потребность в отношениях, но современные технологии упрощают только первый шаг — знакомство в онлайне. Идея правильная, но формат, в котором это реализовано сегодня, превратился в проблему.",
    "thesis.p2": "Приложения отличаются только аудиторией, но суть одна: бесконечный перебор сотен анкет. Чтобы сходить на <strong>одно реальное свидание</strong>, пользователю в среднем нужно сделать <strong>9500 свайпов</strong>. Это отнимает огромное количество времени, но даже взаимный лайк не гарантирует встречу.",
    "thesis.list.title": "После этого вам всё ещё нужно:",
    "thesis.list.item1": "1. Дождаться взаимного лайка.",
    "thesis.list.item2": "2. Не потерять интерес на этапе банального приветствия.",
    "thesis.list.item3": "3. Не наткнуться на фейковый аккаунт или мошенников.",
    "thesis.list.item4": "4. Потратить дни на переписку, которая чаще всего ни к чему не приведёт.",
    "thesis.p4": "При личной встрече вы сразу видите мимику, жесты и реальные эмоции человека — то, что помогает принять решение. В чате это почувствовать невозможно.",
    "thesis.p5": "Кроме того, чаты стали идеальным инструментом для мошенников. Сегодня это целая теневая индустрия, а приложения для знакомств — её главный источник трафика.",
    "thesis.p6": "Так ли нужен чат? Раньше люди знакомились лично, сразу получали живой отклик. Теперь общение затягивается на недели и месяцы.",
    "thesis.p7": "Масштабы мошенничества огромны: только за один год в США мужчины потеряли более <strong>$400 000 000</strong> из-за скама в приложениях для знакомств. В Великобритании эта сумма превысила <strong>£105 000 000</strong>.",
    "thesis.p8": "Ещё одна фундаментальная проблема дейтинга — гендерный дисбаланс. Сильный перекос в сторону мужской аудитории создаёт токсичную среду, которую безуспешно пытаются исправить разработчики.",
    "thesis.p9": "В традиционных приложениях мужчины лайкают в 6 раз чаще женщин, пишут первыми и проводят в приложении больше времени.",
    "thesis.p10": "Из-за этого девушки становятся крайне избирательными, что вынуждает мужчин спамить лайками ещё активнее. Эта замкнута петля ломает весь опыт. <strong>Убрав чаты и бесконечные свайпы</strong>, мы решаем эту проблему на корню.",
    "thesis.p11": "Многие ищут альтернативу у профессиональных матчмейкеров, но это дорого и доступно далеко не всем.",
    "thesis.p12": "Темп жизни в городах ускорился. Люди много работают, и тратить часы на пустой скроллинг — непозволительная роскошь.",
    "thesis.p13": "Как итог — выгорание от свайпов, обилие фейков и нулевая конверсия в реальные свидания.",
    "thesis.p14": "Современные технологии позволяют создавать идеальный персонализированный опыт. Пора перенести этот подход в дейтинг и сделать поиск пары простым, безопасным и эффективным.",

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
    "places.title.pre": "Настоящие места для",
    "places.title.highlight": "реальных свиданий",
    "places.cta": "Выберите город, чтобы увидеть, где проходят свидания",
    "places.subtitle": "Эти места",
    "places.desc": "Эти локации отображают реальную картину: какие конкретно заведения и места в целом одобрены нашей командой для проведения свиданий и реально участвуют в алгоритме подбора.",
    "places.view_all": "Посмотреть все одобренные места",
  },

  de: {
    // Navbar
    "nav.login": "Anmelden",
    "nav.join": "Mitmachen",

    // Hero
    "hero.headline": "wähle echte",
    "hero.highlight": "dates",
    "hero.cta": "Gennety schreiben",
    "hero.disclaimer": "Durch das Fortfahren stimmst du unseren AGB und unserem Datenschutz zu.",
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
    "step.2.title": "Der Donnerstags-Match",
    "step.2.desc":
      "Checke Telegram um 19 Uhr. Wir senden dir ein personalisiertes Match und organisieren dein Date!",
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

    // Difference
    "difference.title.highlight": "Der",
    "difference.title.rest": "Unterschied",
    "difference.insteadOfThis": "Anstattdessen",
    "difference.doThis": "Mach es so",
    "difference.description": "Gennety eliminiert endloses Swipen, oberflächlichen Smalltalk und Ghosting. Unser KI-Matchmaker übernimmt die Arbeit und schickt dich direkt auf echte Dates.",
    "difference.tinder.nope": "NEIN",
    "difference.tinder.like": "JA",
    "difference.tinder.distance": "In der Nähe des Campus",
    "difference.tinder.profile1.name": "Sofia, 21",
    "difference.tinder.profile1.bio": "Liebt gemütliche Cafés & Schallplatten ☕️🎶",
    "difference.tinder.profile1.college": "NYU",
    "difference.tinder.profile2.name": "Anna, 20",
    "difference.tinder.profile2.bio": "Roadtrips, morgendliches Laufen & Iced Matcha Latte 🚗🍵",
    "difference.tinder.profile2.college": "Columbia",
    "difference.tinder.profile3.name": "Alex, 22",
    "difference.tinder.profile3.bio": "Suche Tennis-Partner & Indie-Rock-Konzerte 🎾🎸",
    "difference.tinder.profile3.college": "NYU",
    "difference.tinder.profile4.name": "Dmitry, 19",
    "difference.tinder.profile4.bio": "Nachts coden, tagsüber Kaffee. Lass uns zusammen lernen 💻☕️",
    "difference.tinder.profile4.college": "Brooklyn College",
    "difference.tinder.profile5.name": "Maria, 22",
    "difference.tinder.profile5.bio": "Lass uns Museen & Kunstgalerien erkunden 🎨🏛️",
    "difference.tinder.profile5.college": "Columbia",
    "difference.chat.status": "online",
    "difference.chat.msg1": "Hey! Lass uns dein Date für Donnerstag finden. Gemütliches Café oder laute Bar?",
    "difference.chat.msg2": "Definitiv gemütliches Café. Irgendwo ruhig, wo man sich unterhalten kann.",
    "difference.chat.msg3": "Verstanden. Café-Vibe. Irgendwelche Red Flags, die ich filtern soll?",
    "difference.chat.msg4": "Leute, die sich selbst zu ernst nehmen. Sofortiges K.o.-Kriterium.",
    "difference.chat.msg5": "Notiert! Analysiere Profile an der NYU... 🧠",
    "difference.chat.msg6": "Tolles Match gefunden! Hier ist dein Ticket für Donnerstag 🎫",
    "difference.chat.ticket.title": "Donnerstags-Ticket",
    "difference.chat.ticket.venue": "Campus Coffee House",
    "difference.chat.ticket.time": "Donnerstag @ 18:30",
    "difference.chat.ticket.match": "Match: Sofia, 21 (NYU)",
    "difference.chat.ticket.desc": "Synergie-Score: 94%",
    "difference.chat.ticket.verification": "Gesichtsverifizierung bestanden, das bedeutet: Die Profilbilder stimmen mit der Identität überein und gehören der Person selbst.",
    "difference.chat.ticket.name": "Sofia, 21",
    "difference.chat.ticket.verified": "Verifiziert",
    "difference.chat.ticket.synergy": "Synergie 94/99 — Sie legen beide Wert auf intellektuelle Tiefe und eine klare, bedeutungsvolle Kommunikation.",
    "difference.chat.ticket.synergyDesc": "Sofia ist nachdenklich und zielstrebig — eine echte Chance, sich über tiefgründige Ideen und gemeinsame intellektuelle Neugier auszutauschen.",
    "difference.chat.ticket.timeRemaining": "Noch 24 Std. zum Antworten",
    "difference.chat.ticket.accept": "Annehmen",
    "difference.chat.ticket.pass": "Ablehnen",
    "difference.chat.ticket.report": "Melden",
    "difference.options.title": "Vorschau-Option wählen:",
    "difference.options.1": "Option 1: Agenten-HUD",
    "difference.options.2": "Option 2: Live-Status",
    "difference.options.3": "Option 3: Notizzettel",
    "difference.options.4": "Option 4: Chat-Upgrade",
    "difference.options.all": "Alle anzeigen",
    "difference.hud.title": "AGENTEN-STATUS",
    "difference.hud.mode": "24/7 Matchmaking",
    "difference.hud.scanned": "Profile gescannt",
    "difference.hud.scanned.val": "4.520+ Studierende",
    "difference.hud.time": "Chat-Zeit",
    "difference.hud.time.val": "0 Minuten",
    "difference.hud.badge": "100% Autopilot",
    "difference.status.ticker": "AGENT AKTIV: 24/7 Suche | 1.420 Profile heute gescannt",
    "difference.note.title": "Kein Chat. Nur Dates.",
    "difference.note.body": "Hör auf, Stunden mit sinnlosen Nachrichten zu verschwenden. Während du lernst oder schläfst, arbeitet dein persönlicher KI-Agent 24/7 und scannt Tausende von Profilen, um dein nächstes echtes Date zu vereinbaren.",
    "difference.chat.msg5.upgraded": "Analysiere NYU-Profile 24/7... 3.840 Kandidaten geprüft für dein perfektes Match. 🧠",
    "difference.chat.msg5.extra": "Kein Chatten nötig. Ich kümmere mich um das Matching und plane das Date. ⚡️",

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
    "safety.3.title": "Kaffeetreffen",
    "safety.3.desc":
      "Alle Dates finden in geprüften, belebten und sicheren Orten statt.",

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
    "marquee.manifesto": "Unsere Idee",

    // Footer
    "footer.slogan": "Der Freund, der dir perfekte Dates organisiert.",
    "footer.telegram": "Telegram",
    "footer.contact": "Kontakt",
    "footer.terms": "AGB",
    "footer.privacy": "Datenschutz",
    "footer.rights": "Gennety. Alle Rechte vorbehalten.",
    "footer.cookie_preferences": "Cookie-Einstellungen",
    "footer.thesis": "Unser Manifest",
    "thesis.title": "unser manifest",
    "thesis.p1": "Seit langem ist der Dating-Markt reif für ein grundlegendes Umdenken. Jeder Mensch hat das Bedürfnis nach romantischen Beziehungen. Doch all die Technologien, die wir untersucht haben, halfen den Menschen vor allem dort, wo sie aus verschiedenen Gründen mit den meisten Barrieren und Hindernissen konfrontiert waren. Dieser Engpass war schon immer der erste Kontakt, und alle Marktteilnehmer haben stets versucht, ihn zu erleichtern und zu vereinfachen, indem sie ihn ins Internet verlegten. In diese Richtung zu denken ist zwar richtig, aber die Form, in die dieser erste Kontakt normalerweise verpackt wird, scheint wie verflucht zu sein und ist heute fast überall anzutreffen.",
    "thesis.p2": "Verschiedene Apps unterschieden sich meist nur durch ihre Zielgruppe: Apps für ernsthafte Beziehungen, für kurze Affären, für Übergewichtige, für Schlanke, für die LGBTQ+-Community, lokale Apps für bestimmte Länder und so weiter. Doch das Prinzip blieb immer das gleiche: Man sitzt vor einem Bildschirm und wühlt sich durch Profile, Hunderte von Profilen. Um über moderne Dating-Apps auf ein einziges Date zu gehen, benötigt eine durchschnittliche Person im Schnitt 9.500 Swipes, was 9.500 Profilen entspricht – das ist unverzeihlich viel und raubt ungeheuer viel Zeit. Und vergessen Sie nicht: Das Durchsuchen von zehntausend Profilen ist noch lange nicht das Ende.",
    "thesis.list.title": "Man muss noch:",
    "thesis.list.item1": "1. Auf ein gegenseitiges Like warten.",
    "thesis.list.item2": "2. Den Kontakt nicht beim ersten Chat-Beitrag abbrechen, der meist entweder sehr albern oder schrecklich klischeehaft ist.",
    "thesis.list.item3": "3. Kein Opfer von Betrug oder Fake-Profilen werden, was heutzutage in diesen Apps an der Tagesordnung ist.",
    "thesis.list.item4": "4. Und schließlich einen normalen Dialog im Chat aufbauen. Solche Unterhaltungen ziehen sich meist in die Länge und führen selten zu einem echten Treffen.",
    "thesis.p4": "Wir alle wissen, dass man bei einem persönlichen Treffen die Emotionen, Reaktionen, das Verhalten und die Gestik des anderen sieht – all diese unzähligen Signale, die eine Entscheidung erst möglich machen. All das fehlt in einem Chat.",
    "thesis.p5": "Zudem bietet ein Chat Betrügern mehr Möglichkeiten. Heute ist das eine ganze Industrie, für die gerade Dating-Apps einen großen Traffic-Kanal darstellen.",
    "thesis.p6": "Daher stellt sich die große Frage: Ist ein Chat in solchen Apps überhaupt notwendig? Früher lernten sich die Menschen auf der Straße kennen, ihr erster Kontakt war viel schneller und sie erhielten sofort Rückmeldung. Heute zieht sich diese Rückmeldung über Wochen, wenn nicht Monate hin.",
    "thesis.p7": "Es gibt auch ein großes Problem mit dem Betrugsmarkt. Zum Beispiel haben allein im Jahr 2025 Männer in den USA 400.000.000 Dollar in Dating-Apps verloren. Das Gleiche geschah in Großbritannien, wo sich der Schaden auf 105.000.000 Pfund belief (wiederum nur unter Männern und nur in Dating-Diensten).",
    "thesis.p8": "Einer der Hauptmängel der Dating-Branche heute und seit vielen Jahren ist wohl die ungleiche Verteilung der Nutzer nach Geschlecht innerhalb der Dienste. Dieses demografische Ungleichgewicht zwischen Frauen und Männern war in den letzten Jahren das drängendste Problem, das beispielsweise ehemalige Tinder-Mitarbeiter zu lösen versuchten.",
    "thesis.p9": "Das bekannteste Beispiel ist die Gründerin von Bumble, dem nach Marktkapitalisierung zweitgrößten Konzern, der heute mehrere große Dating-Apps wie Bumble, Badoo und andere im Portfolio hat. Dieses Problem ist zum einen durch unsere Natur und zum anderen durch die in bestehenden Apps eingebauten Mechanismen bedingt. Männer neigen zu einer aktiveren und hartnäckigeren Strategie: Sie vergeben etwa sechsmal häufiger ein Like als Frauen, schreiben öfter und verbringen mehr Zeit auf der Plattform.",
    "thesis.p10": "Frauen verhalten sich aufgrund dieses Verhaltens vorsichtiger und werden wählerischer. Dies zwingt Männer dazu, noch hartnäckiger zu sein, um ihre Chancen zu maximieren – eine Spirale, die sich immer weiter verstärkt und die Mängel der aktuellen Mechanismen in Dating-Apps verdeutlicht. Indem wir einfach den Chat und die Möglichkeit, täglich Tausende von Profilen zu durchstöbern, abschaffen und dies durch die App-Mechanik einschränken, beseitigen wir bereits die meisten Hauptprobleme.",
    "thesis.p11": "Heute finden Menschen Lösungen in persönlichen Matchmakern oder professionellen Heiratsvermittlern. Aber nicht jeder kann sie sich leisten, und auch sie haben ihre Nachteile.",
    "thesis.p12": "Ja, die Lebensweise und das allgemeine Lebenstempo vieler Menschen haben sich verändert. Mit dem Umzug in Großstädte und Metropolen bleibt den Menschen immer weniger Zeit für das Privatleben: Wir arbeiten immer mehr und haben immer weniger Zeit, uns mit dieser endlosen Suche zu beschäftigen.",
    "thesis.p13": "Daher sehen wir all diese Probleme ganz klar: eine große Anzahl von Fakes, Betrug, Burnout und Müdigkeit durch endloses Swipen und Scrollen von Profilen sowie eine geringe Effizienz und Conversion in Dates.",
    "thesis.p14": "Mit der heutigen Technologie, der Gewohnheit der Menschen, persönliche Daten zur Verbesserung ihrer digitalen Erfahrung bereitzustellen, und der etablierten Erwartung an einen personalisierten Service ist es wirklich erstaunlich, dass der Dating-Markt so lange unbeachtet geblieben ist.",

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
    "places.title.pre": "Echte Orte für",
    "places.title.highlight": "echte Dates",
    "places.cta": "Wähle deine Stadt, um zu sehen, wo Dates stattfinden",
    "places.subtitle": "Diese Orte",
    "places.desc": "Diese Orte zeigen das echte Bild: bestimmte Locations und Plätze, die von unserem Team für Dates genehmigt wurden und aktiv in unserem Matchmaking-Algorithmus verwendet werden.",
    "places.view_all": "Alle genehmigten Orte ansehen",
  },

  pl: {
    // Navbar
    "nav.login": "Zaloguj się",
    "nav.join": "Dołącz teraz",

    // Hero
    "hero.headline": "wybieraj prawdziwe",
    "hero.highlight": "randki",
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
    "step.2.title": "Czwartkowy Wynik",
    "step.2.desc":
      "Sprawdź Telegram o 19:00. Wyślemy Ci dopasowanie i zorganizujemy randkę!",
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

    // Difference
    "difference.title.highlight": "Różnica",
    "difference.title.rest": "w działaniu",
    "difference.insteadOfThis": "Zamiast tego",
    "difference.doThis": "Zrób tak",
    "difference.description": "Gennety eliminuje bezcelowe przewijanie, powierzchowny small talk i ghosting. Nasz AI matchmaker robi wszystko za Ciebie i wysyła Cię prosto na prawdziwe randki.",
    "difference.tinder.nope": "NIE",
    "difference.tinder.like": "TAK",
    "difference.tinder.distance": "Blisko kampusu",
    "difference.tinder.profile1.name": "Sofia, 21",
    "difference.tinder.profile1.bio": "Uwielbiam przytulne kawiarnie i płyty winylowe ☕️🎶",
    "difference.tinder.profile1.college": "NYU",
    "difference.tinder.profile2.name": "Anna, 20",
    "difference.tinder.profile2.bio": "Podróże, poranny bieg i mrożona matcha latte 🚗🍵",
    "difference.tinder.profile2.college": "Columbia",
    "difference.tinder.profile3.name": "Alex, 22",
    "difference.tinder.profile3.bio": "Szukam partnera do tenisa i koncertów rockowych 🎾🎸",
    "difference.tinder.profile3.college": "NYU",
    "difference.tinder.profile4.name": "Dmitry, 19",
    "difference.tinder.profile4.bio": "Kodowanie całą noc, kawa cały dzień. Uczmy się razem 💻☕️",
    "difference.tinder.profile4.college": "Brooklyn College",
    "difference.tinder.profile5.name": "Maria, 22",
    "difference.tinder.profile5.bio": "Odkryjmy razem muzea i galerie sztuki 🎨🏛️",
    "difference.tinder.profile5.college": "Columbia",
    "difference.chat.status": "aktywny",
    "difference.chat.msg1": "Hej! Znajdźmy Twoją randkę na czwartek. Przytulna kawiarnia czy głośny bar?",
    "difference.chat.msg2": "Zdecydowanie przytulna kawiarnia. Gdzieś cicho, żeby porozmawiać.",
    "difference.chat.msg3": "Jasne. Kawiarniany klimat. Jakieś główne red flagi do odrzucenia?",
    "difference.chat.msg4": "Ludzie biorący siebie zbyt poważnie. Natychmiastowa dyskwalifikacja.",
    "difference.chat.msg5": "Zapisane! Analizuję profile na NYU... 🧠",
    "difference.chat.msg6": "Znalazłem świetne dopasowanie! Oto Twój bilet na czwartek 🎫",
    "difference.chat.ticket.title": "Bilet czwartkowy",
    "difference.chat.ticket.venue": "Campus Coffee House",
    "difference.chat.ticket.time": "Czwartek @ 18:30",
    "difference.chat.ticket.match": "Dopasowanie: Sofia, 21 (NYU)",
    "difference.chat.ticket.desc": "Współczynnik synergii: 94%",
    "difference.chat.ticket.verification": "Przeszedł weryfikację twarzy, co oznacza: zdjęcia w profilu odpowiadają jego tożsamości i należą osobiście do niego.",
    "difference.chat.ticket.name": "Sofia, 21",
    "difference.chat.ticket.verified": "Zweryfikowano",
    "difference.chat.ticket.synergy": "Synergia 94/99 — Oboje cenicie intelektualną głębię oraz jasną, znaczącą komunikację.",
    "difference.chat.ticket.synergyDesc": "Sofia jest refleksyjna i zorientowana na cel — realna szansa na porozumienie wokół głębokich idei i wspólnej intelektualnej ciekawości.",
    "difference.chat.ticket.timeRemaining": "Zostało 24 godz. na odpowiedź",
    "difference.chat.ticket.accept": "Akceptuj",
    "difference.chat.ticket.pass": "Pomiń",
    "difference.chat.ticket.report": "Zgłoś",
    "difference.options.title": "Wybierz opcję podglądu:",
    "difference.options.1": "Opcja 1: HUD agenta",
    "difference.options.2": "Opcja 2: Status Live",
    "difference.options.3": "Opcja 3: Notatka",
    "difference.options.4": "Opcja 4: Ulepszenie czatu",
    "difference.options.all": "Pokaż wszystko",
    "difference.hud.title": "STATUS AGENTA",
    "difference.hud.mode": "Matchmaking 24/7",
    "difference.hud.scanned": "Sprawdzone profile",
    "difference.hud.scanned.val": "4,520+ studentów",
    "difference.hud.time": "Czas w wiadomościach",
    "difference.hud.time.val": "0 minut",
    "difference.hud.badge": "100% Autopilot",
    "difference.status.ticker": "AGENT AKTYWNY: wyszukiwanie 24/7 | Dzisiaj sprawdzono 1 420 profili",
    "difference.note.title": "Bez czatów. Tylko randki.",
    "difference.note.body": "Przestań marnować godziny na bezsensowne pisanie. Kiedy studiujesz lub śpisz, Twój osobisty agent AI działa 24/7, przeglądając tysiące profili, aby zorganizować Twoją następną prawdziwą randkę.",
    "difference.chat.msg5.upgraded": "Analizuję profile NYU 24/7... Sprawdzono 3 840 kandydatów, aby znaleźć ten idealny. 🧠",
    "difference.chat.msg5.extra": "Pisanie nie jest wymagane. Ja dopasowuję i planuję randkę. ⚡️",

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
    "safety.3.title": "Spotkania przy kawie",
    "safety.3.desc":
      "Wszystkie randki odbywają się w sprawdzonych, ludnych i bezpiecznych lokalach.",

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
      "Z Gennety mogą korzystać wyłącznie studenci w wieku od 18 lat.",
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
    "marquee.manifesto": "Nasza idea",

    // Footer
    "footer.slogan": "Przyjaciel, który organizuje Ci randki.",
    "footer.telegram": "Telegram",
    "footer.contact": "Kontakt",
    "footer.terms": "Regulamin",
    "footer.privacy": "Prywatność",
    "footer.rights": "Gennety. Wszelkie prawa zastrzeżone.",
    "footer.cookie_preferences": "Ustawienia plików cookie",
    "footer.thesis": "Nasz manifest",
    "thesis.title": "nasz manifest",
    "thesis.p1": "Rynek randkowy już od dawna wymagał naszego ponownego przemyślenia. Każdy człowiek ma potrzebę relacji romantycznych, jednak technologie przez cały ten czas, który mieliśmy okazję badać, pomagały ludziom głównie tam, gdzie napotykali najwięcej różnych barier i przeszkód z różnych przyczyn. Tym punktem zawsze był pierwszy kontakt, a wszyscy gracze na tym rynku starali się go ułatwić i uprościć, przenosząc go do online. Myślenie w tym kierunku jest słuszne, ale forma, w jaką zazwyczaj owijany był ten pierwszy kontakt, wydaje się wręcz przeklęta i dziś spotyka się ją niemal wszędzie.",
    "thesis.p2": "Różne aplikacje różniły się od siebie głównie grupą docelową: aplikacje do poważnych związków, do krótkich romansów, dla puszystych, dla szczupłych, dla społeczności LGBT, lokalne dla konkretnych krajów i tak dalej. Jednak zasada zawsze pozostawała ta sama: siedzisz przed ekranem i przeglądasz profile, setki profili. Aby pójść na jedną randkę, przeciętny człowiek korzystający ze współczesnych aplikacji randkowych musi wykonać średnio 9500 swipe'ów, co odpowiada 9500 profilom — to niewybaczalnie dużo i pochłania potwornie dużo czasu. A przecież nie zapominajmy, że przejrzenie kilkunastu tysięcy profili to jeszcze nie koniec.",
    "thesis.list.title": "Musisz jeszcze:",
    "thesis.list.item1": "1. Doczekać się wzajemnego polubienia.",
    "thesis.list.item2": "2. Nie zerwać kontaktu przy pierwszej wiadomości na czacie, które zazwyczaj są albo bardzo głupie, albo strasznie szablonowe.",
    "thesis.list.item3": "3. Nie stać się ofiarą oszustwa lub fake'a, co dziś jest na porządku dziennym w tych aplikacjach.",
    "thesis.list.item4": "4. No i wreszcie, nawiązać normalną rozmowę na czacie. Takie konwersacje są zazwyczaj dość długie i rzadko przekształcają się w prawdziwe spotkanie.",
    "thesis.p4": "Wszyscy rozumiemy, że podczas osobistego spotkania widzisz emocje człowieka, jego reakcje, zachowanie, gestykulację — tę ogromną liczbę sygnałów, które pozwalają podjąć decyzję. Tego wszystkiego no nie ma na czacie.",
    "thesis.p5": "Co więcej, obecność czatu daje większe pole do popisu oszustom. Dziś to cała branża, a aplikacje randkowe są dla niej ogromnym kanałem pozyskiwania ruchu.",
    "thesis.p6": "Dlatego pojawia się ważne pytanie: czy czat jest koniecznością w takich aplikacjach? Przecież dawniej ludzie poznawali się na ulicy, ich pierwszy kontakt następował znacznie szybciej, a informację zwrotną otrzymywali natychmiast. Dziś ten feedback przeciąga się na tygodnie, a nawet miesiące.",
    "thesis.p7": "Istnieje również ogromny problem związany z rynkiem scamów. Na przykład: tylko w 2025 roku męska populacja w USA straciła 400 000 000 dolarów w aplikacjach randkowych. To samo stało się w Wielkiej Brytanii, gdzie straty wyniosły 105 000 000 funtów (ponownie, tylko wśród mężczyzn i tylko w serwisach randkowych).",
    "thesis.p8": "Zapewne jedną z głównych wad branży randkowej dziś i na przestrzeni wielu lat jest nierówny podział użytkowników pod względem płci wewnątrz serwisów. Ta dysproporcja demograficzna między kobietami a mężczyznami była w ostatnich latach najostrzejszym problemem, który próbowali rozwiązać na przykład byli pracownicy Tindera.",
    "thesis.p9": "Najbardziej wyrazistym przypadkiem jest założycielka Bumble, drugiego pod względem kapitalizacji holdingu, który ma dziś w swoim portfolio kilka dużych aplikacji randkowych, takich jak Bumble, Badoo i kilka innych. Problem ten wynika w większości, po pierwsze, z naszej natury, a po drugie, z mechanizmów zaszytych w istniejących aplikacjach. Mężczyźni wykazują tendencję do bardziej aktywnej i natarczywej strategii: lajkują około 6 razy częściej niż dziewczyny, częściej piszą i spędzają w serwisie więcej czasu.",
    "thesis.p10": "Kobiety w konsekwencji takiego zachowania postępują ostrożniej i stają się bardziej wybredne. Przez co mężczyźni zmuszeni są do jeszcze większej natarczywości, aby zmaksymalizować swoje szanse, a ta pętla tylko się zapętla, co po raz kolejny pokazuje nam niedoskonałość obecnych mechanizmów w aplikacjach randkowych. Przecież samo wyeliminowanie czatu i możliwości przeglądania tysiąca profili dziennie, poprzez ograniczenie tego mechaniką aplikacji, pozwala nam pozbyć się większości głównych problemów.",
    "thesis.p11": "Dziś ludzie szukają rozwiązań w osobistych matchmakerach lub u profesjonalnych swatów. Jednak nie każdego na to stać, a ich usługi również mają swoje minusy.",
    "thesis.p12": "Owszem, styl życia i ogólne tempo życia wielu ludzi uległy zmianie. Wrawz z przeprowadzką do dużych miast i metropolii ludzie mają coraz mniej czasu na życie osobiste: pracujemy coraz więcej i mamy coraz mniej czasu na zajmowanie się tym niekończącym się poszukiwaniem.",
    "thesis.p13": "Dlatego jednoznacznie dostrzegamy te wszystkie problemy: dużą liczbę fake'ów, oszustwa, wypalenie i zmęczenie niekończącym się swipe'owaniem i scrollowaniem profili, a także niską skuteczność i konwersję na randki.",
    "thesis.p14": "Biorąc pod uwagę dzisiejszą technologię, przyzwyczajenie ludzi do udostępniania swoich danych osobowych i informacji w celu ulepszenia wrażeń cyfrowych oraz ugruntowane już oczekiwanie spersonalizowanej obsługi, to doprawdy zaskakujące, że rynek randkowy tak długo pozostawał bez uwagi.",

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
    "places.title.pre": "Prawdziwe miejsca na",
    "places.title.highlight": "prawdziwe randki",
    "places.cta": "Wybierz swoje miasto, aby zobaczyć, gdzie odbywają się randki",
    "places.subtitle": "Te miejsca",
    "places.desc": "Te lokalizacje pokazują rzeczywisty obraz: konkretne lokale i miejsca zatwierdzone przez nasz zespół do randek, które aktywnie uczestniczą w algorytmie dopasowywania.",
    "places.view_all": "Zobacz wszystkie zatwierdzone miejsca",
  },
} as const;

export type Dictionary = typeof translations.en;
