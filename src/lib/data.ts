/* ========================================
   GENNETY — Static Content / Mock Data
   ======================================== */

export const TELEGRAM_BOT_URL = "https://t.me/GennetyBot";
export const CONTACT_EMAIL = "gennetydating@gmail.com";

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
  { label: "68% Success Rate", color: "gold" },
  { label: "93% Want a 2nd Date", color: "sky" },
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
    title: "Verified students at your school only",
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
