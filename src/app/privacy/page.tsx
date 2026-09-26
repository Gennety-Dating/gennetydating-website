import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Privacy Policy | Gennety",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-sans font-bold mb-8 neon-text-sm">
          Privacy Policy for Gennety
        </h1>

        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="text-gray-300 leading-relaxed my-4"><strong>Last Updated: 26 September 2026</strong> · <strong>Version 4.2</strong></p>
<p className="text-gray-300 leading-relaxed my-4">This Privacy Policy explains how Gennety (&quot;<strong>Gennety</strong>&quot;, &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or &quot;<strong>our</strong>&quot;) collects, uses, shares, and protects your personal data when you use the Gennety matchmaking service through our Telegram bot (<code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">@gennetybot</code>), our Telegram Mini Apps, our native mobile application, and our website at <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">gennety.com</code> (together, the &quot;<strong>Service</strong>&quot;).</p>
<p className="text-gray-300 leading-relaxed my-4">Gennety is an AI-first matchmaking service. By design we process <strong>more context about you than a traditional dating app</strong> — psychological context, biometric data used for identity verification, and preferences you state for a date. Some of what we process is <strong>special-category data</strong> under GDPR Article 9 (biometric data; and, if you state them, dietary requirements that can reveal religion or accessibility needs that can reveal health). We process those only with your <strong>explicit consent</strong> — see Section 6.</p>
<p className="text-gray-300 leading-relaxed my-4">Please read this Policy carefully. Related documents: <a href="https://gennety.com/terms" className="text-magenta hover:underline">Terms of Service</a> and <a href="https://gennety.com/cookies" className="text-magenta hover:underline">Cookie Policy</a>.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">1. Quick Summary</h2>
<p className="text-gray-300 leading-relaxed my-4">This summary is for orientation only — it does not replace the full Policy below.</p>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Question</th><th className="border border-gray-800 px-4 py-3 font-semibold">Short answer</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top">Who is responsible?</td><td className="border border-gray-800 px-4 py-3 align-top">Gennety, operated from Kyiv, Ukraine. Contact: <strong>legal@gennety.com</strong> (Section 2).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">What do you collect?</td><td className="border border-gray-800 px-4 py-3 align-top">Account and contact-verification data (email <strong>or</strong> phone), profile answers, photos and optional video, a liveness selfie, location for your dating city and date logistics, your messages with our AI, payment records, and technical data (Section 4).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Do you use AI on my data?</td><td className="border border-gray-800 px-4 py-3 align-top">Yes. AI builds your psychological summary, an embedding, an attractiveness/&quot;league&quot; rating, icebreakers, and venue choices (Sections 7 and 8).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Do you use biometrics?</td><td className="border border-gray-800 px-4 py-3 align-top">Yes — a liveness selfie and face comparison against your photos, only with your explicit consent. The selfie is deleted after 90 days (Sections 6 and 10).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Do you sell my data?</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>No.</strong> We never sell personal data and we do not run advertising profiling.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Do you show my data to other users?</td><td className="border border-gray-800 px-4 py-3 align-top">Only to the one person you are matched with, in a forward/save-protected form (Section 12).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Does a human see my data?</td><td className="border border-gray-800 px-4 py-3 align-top">Yes — the operator of the service, through an internal administration interface and a private operations feed (Section 12.2 and 12.3).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Can I delete everything?</td><td className="border border-gray-800 px-4 py-3 align-top">Yes — freeze (reversible) or delete (irreversible cascading erasure), with one disclosed exception: an internal operational notification (Section 12.2).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Who do I complain to?</td><td className="border border-gray-800 px-4 py-3 align-top">Us first at <strong>legal@gennety.com</strong>; then your data-protection authority (Section 22).</td></tr>
</tbody>
</table>
</div>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">2. Data Controller</h2>
<p className="text-gray-300 leading-relaxed my-4">The data controller responsible for your personal data is:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Gennety</strong>, a service operated by <strong>Gleb Gosha</strong>, an individual established in Kyiv, Ukraine. There is no separate legal entity; the operator is the data controller personally.</li>
<li>Privacy contact: <strong>legal@gennety.com</strong></li>
</ul>
<blockquote className="border-l-4 border-magenta bg-magenta/5 p-4 my-6 rounded text-sm italic text-gray-400"><em>Article 27 GDPR representative: not yet appointed. Because we offer the Service in German and Polish and therefore target users in the EEA, a representative in the Union is required, and one will be appointed and named here. Until then, you can reach us directly at legal@gennety.com and we will handle your request under the GDPR exactly as set out in Section 18.</em></blockquote>
<p className="text-gray-300 leading-relaxed my-4">Although Gennety is established in Ukraine, where we offer the Service to users located in the European Economic Area (EEA) or the United Kingdom, we apply the EU General Data Protection Regulation (GDPR) and the UK GDPR to that processing.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">3. Scope</h2>
<p className="text-gray-300 leading-relaxed my-4">This Policy applies to all personal data we process about:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>users and prospective users of the Service, including during onboarding and before an account is fully created (for example, a phone number or email you submit to receive a verification code, even if you never finish sign-up);</li>
<li>visitors to <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">gennety.com</code>.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">It does <strong>not</strong> cover:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>third-party services you reach through our links or embeds — for example the Telegram app itself, the Apple App Store, or the Spotify player embedded on our website. Those services process data under their own privacy policies;</li>
<li>what another user does with information you choose to share with them.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4"><strong>Note on the website.</strong> Since 19 July 2026, the website runs <strong>no part of onboarding</strong>. It does not verify emails, does not create accounts, and does not hand any pre-filled data to the bot or the app. Its sign-up buttons only send you to Telegram or the App Store, where onboarding happens natively. The only personal data the website itself records is your cookie-consent choice (Section 5.4 and the <a href="https://gennety.com/cookies" className="text-magenta hover:underline">Cookie Policy</a>).</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">4. The Data We Collect</h2>
<p className="text-gray-300 leading-relaxed my-4">We collect data in three ways: data you give us, data generated by your use of the Service, and data we derive or generate to power matchmaking.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">4.1 Data you provide</h3>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Category</th><th className="border border-gray-800 px-4 py-3 font-semibold">Examples</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Account &amp; identity</strong></td><td className="border border-gray-800 px-4 py-3 align-top">First name (and optionally surname), age, gender, gender preference, language, UI theme, your Telegram user ID and public <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">@username</code> (if you have one), and the platform you use (Telegram / mobile).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Sign-up track</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Which registration track you chose — <strong>student</strong> (university email) or <strong>general</strong> (phone) — and the date you verified it.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>University email (student track)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">The email address you verify and its domain, used to confirm eligibility for the student community and its perks. A one-time passcode (OTP) is sent to verify it; the code is stored hashed, never in plain text.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Phone number (general track)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Your phone number in international format. On Telegram you share it in one tap, so we receive it directly from Telegram as trusted contact data; in the mobile app we send you a verification code by SMS (or, where configured, as a Telegram service message). One account per phone number.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Profile details</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Height, hobbies/interests, a free-text description of the partner you are looking for, your preferred partner age range, the city where you want to receive matches, and free-text &quot;vibe&quot; answers (for example, your ideal Friday night, and whether the experience or the company matters more to you). <strong>We do not ask for, and do not store, your nationality or ethnic origin.</strong></td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Photos &amp; video</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Profile photos (including the static frame of a Telegram &quot;Live Photo&quot;) and an optional short profile video. Images you attach to a chat with our AI concierge, including any you choose to add to your profile.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Identity verification (biometric)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">A liveness selfie captured by our verification provider, used to confirm you are a real person and that your profile photos are of you. See Section 10.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Follow-up questionnaire answers</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Short optional questions we send after onboarding (&quot;Profiler&quot;) to fuel icebreakers and date hints — you can skip any of them.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Visual type preference (optional feature)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Where we offer the visual &quot;type&quot; calibration step, the picks you make from a set of sample portraits, and the compiled preference this produces.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Location</strong></td><td className="border border-gray-800 px-4 py-3 align-top">The dating city you select and its coordinates; coordinates resolved from your browser/device geolocation or a place you pick on a map; the departure point you mark for a date, with its human-readable label if you selected it via search.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Explored areas (optional, off by default)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Only if you switch on map colouring: the <strong>approximate areas</strong> you have been in, stored as grid squares roughly 1.2 km across — never your exact position, and never a coordinate. Recorded only while the map screen is open, and only inside a city we operate in.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Date preferences (&quot;venue intent&quot;)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">What kind of date you want — experience, atmosphere, format — plus any requirements you explicitly confirm, including <strong>dietary requirements</strong> (e.g. vegan, vegetarian, halal, kosher, gluten-free), an <strong>alcohol-free</strong> requirement, and a <strong>step-free access</strong> requirement. See Section 6 — some of these can reveal special-category data.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Communications &amp; feedback</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Messages, images, and voice notes you send to our bot or AI concierge; post-date feedback (a chemistry rating, whether you want a second date, free text or a voice note); free-text reasons when you decline a match, cancel a date, or report a user; and messages you send through the optional pre-date anonymous relay chat.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Payments</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Your purchase records for Date Tickets, ticket bundles, paid venue changes, and the Gennety Premium subscription. <strong>We never receive or store your full card number</strong> — see Section 14.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Subscription cancellation reason</strong></td><td className="border border-gray-800 px-4 py-3 align-top">If you cancel Gennety Premium in chat and choose to answer, the free-text reason you give.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Support correspondence</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Anything you send us at our support handle or at legal@gennety.com.</td></tr>
</tbody>
</table>
</div>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">4.2 Data generated automatically</h3>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Category</th><th className="border border-gray-800 px-4 py-3 font-semibold">Examples</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Usage &amp; interaction logs</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Onboarding progress, actions in the bot, Mini Apps and app, match decisions (accept/decline), scheduling availability, venue likes, timestamps.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Onboarding funnel telemetry</strong></td><td className="border border-gray-800 px-4 py-3 align-top">For each onboarding step: which step it was, whether it was asked, answered or skipped, how long you spent on it, your language and platform. <strong>We never store your answer text in this telemetry</strong> — only the step key, its outcome, and timing.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Technical &amp; device data</strong></td><td className="border border-gray-800 px-4 py-3 align-top">IP address, device and operating-system information, app version, and diagnostic logs.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Session data</strong></td><td className="border border-gray-800 px-4 py-3 align-top">For the mobile app, sign-in sessions and refresh tokens (stored hashed) so you stay logged in and we can revoke access.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Push tokens</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Device push tokens for Apple push notifications and Live Activities (the live &quot;date day&quot; / &quot;decision&quot; widget), so we can notify you.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Voice &amp; video transcripts</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Text transcriptions of voice notes you send. The audio of a profile video is transcribed <strong>transiently</strong> for a safety check and is not retained.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Usage metering</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Per-user counters for how many messages and how much AI processing you use, so we can enforce fair-use limits and stop abuse. These are held in memory and are not a long-term profile.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Chat timeline</strong></td><td className="border border-gray-800 px-4 py-3 align-top">A short-lived record of what happened in your Telegram chat — the messages we sent, the buttons you tapped (by their visible label), what you typed, and actions you took in a Mini App. It lets our assistant answer a follow-up like &quot;why?&quot; against the message directly above it instead of guessing. A verification code you type is masked before storage. Kept <strong>30 days</strong>.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Promo attribution</strong></td><td className="border border-gray-800 px-4 py-3 align-top">If you arrive through a promo link, a short-lived, hashed device fingerprint (IP + browser + language) and the promo code, so the reward survives an App Store install. Held in memory only, for up to an hour, then discarded.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Website cookie-consent records</strong></td><td className="border border-gray-800 px-4 py-3 align-top">See Section 5.4.</td></tr>
</tbody>
</table>
</div>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">4.3 Data we derive or generate</h3>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Category</th><th className="border border-gray-800 px-4 py-3 font-semibold">Examples</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Psychological summary</strong></td><td className="border border-gray-800 px-4 py-3 align-top">A free-text summary of your personality, values, and preferences, generated from your onboarding answers.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Vector embedding</strong></td><td className="border border-gray-800 px-4 py-3 align-top">A numeric representation (embedding) of your psychological summary, used to compute compatibility. It is derived from your prose and is not stored as readable text.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Vibe axes</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Structured scores derived from your free-text vibe answers (a tempo axis, an experience-vs-connection axis, a social role, and short anchor tags).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Compatibility &amp; rating signals</strong></td><td className="border border-gray-800 px-4 py-3 align-top">A &quot;league&quot;/attractiveness score (Elo) seeded from an automated visual assessment of your photos, match scores, standby/priority counters, and the frozen score breakdown of each match we create.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Appearance tags (optional feature)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Where the visual type feature is active, coarse descriptive tags derived from your photos by an automated vision pass, used only to score how well you fit another user&apos;s stated visual preference.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Face-match scores</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Similarity scores between your verification selfie and each of your profile photos.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Safety signals</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Strikes, reports about you, suspension/investigation status, and records of media we rejected at upload (reason and time only — never the rejected media itself).</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Venue selection logs</strong></td><td className="border border-gray-800 px-4 py-3 align-top">A structured, raw-text-free record of how a venue was chosen for your date, used to debug and improve the concierge.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Life rhythm (Tempo Sync)</strong> — two labels: your usual activity level (calm / moderate / active) and when your day tends to be most active (earlier / middle / later, or unknown), plus how many days of data they are based on</td><td className="border border-gray-800 px-4 py-3 align-top">Computed <strong>on your iPhone</strong> from the last 28 days of your step count in Apple Health, only if you connect it. Only the labels reach us — never step counts, sleep, workouts, heart rate or any other Health data</td></tr>
</tbody>
</table>
</div>
<p className="text-gray-300 leading-relaxed my-4">We <strong>do not</strong> create per-message embeddings of your conversations. <strong>We do not sell your data</strong>, and we do not use your data for third-party advertising or ad-profiling.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">5. Where the Data Comes From</h2>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">5.1 From you</h3>
<p className="text-gray-300 leading-relaxed my-4">Most data comes directly from you — your answers, photos, messages, and choices.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">5.2 From Telegram</h3>
<p className="text-gray-300 leading-relaxed my-4">If you use the Telegram bot or a Mini App, Telegram provides us with your Telegram user ID, first name, language code, and public <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">@username</code> (if any). If you use the one-tap phone sharing, Telegram provides your phone number as trusted contact data. Everything you send in the chat is also processed by Telegram under <strong>Telegram&apos;s own privacy policy</strong>, which we do not control.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">5.3 From our providers</h3>
<p className="text-gray-300 leading-relaxed my-4">Our liveness provider (Amazon Rekognition Face Liveness) returns the verification selfie and the liveness result; our face-comparison provider (Amazon Rekognition) returns similarity scores and safety labels; our payment rails return payment confirmations and transaction identifiers.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">5.4 From your browser (website only)</h3>
<p className="text-gray-300 leading-relaxed my-4">When you make a cookie choice on <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">gennety.com</code>, we store an <strong>append-only consent record</strong>: the action (accepted / rejected / partial / withdrawn), which categories you allowed, the version of the cookie policy in force, a random session identifier held in your browser&apos;s local storage, the page URL where you made the choice, your browser&apos;s user-agent string, and a <strong>salted hash of your IP address</strong> (we do not store the raw IP). This record exists to prove that a valid consent was given, as consent laws require. Details are in the <a href="https://gennety.com/cookies" className="text-magenta hover:underline">Cookie Policy</a>.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">5.5 From Apple Health (iPhone app, optional)</h3>
<p className="text-gray-300 leading-relaxed my-4">If you connect Apple Health (Section 6), the iPhone app reads your step count for the last 28 days — including wheelchair pushes, if your iPhone records them — and turns it <strong>on the phone</strong> into the two life-rhythm labels described in Section 4.3. Only those labels are sent to us; the step counts never leave your device.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">6. Special-Category Data (GDPR Article 9)</h2>
<p className="text-gray-300 leading-relaxed my-4">Some of what the Service processes falls into the &quot;special categories&quot; that receive extra protection. We rely on your <strong>explicit consent</strong> (Art. 9(2)(a)) for each of them, we ask for that consent at the moment the data is collected, and you can withdraw it at any time (Section 18).</p>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Special-category data</th><th className="border border-gray-800 px-4 py-3 font-semibold">When it arises</th><th className="border border-gray-800 px-4 py-3 font-semibold">What happens if you say no</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Biometric data</strong> — a liveness selfie and face-comparison scores used to uniquely identify you</td><td className="border border-gray-800 px-4 py-3 align-top">When you complete identity verification. Verification is <strong>mandatory</strong> to be matched.</td><td className="border border-gray-800 px-4 py-3 align-top">You are not matched. You may delete your account instead. See Section 10.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Dietary requirements</strong> — if you confirm halal or kosher (which can reveal religious belief), or a medical requirement such as gluten-free</td><td className="border border-gray-800 px-4 py-3 align-top">Only if you explicitly confirm one when telling the concierge what kind of date you want.</td><td className="border border-gray-800 px-4 py-3 align-top">The concierge simply does not filter venues on that requirement. Nothing else changes.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Accessibility needs</strong> — a step-free venue requirement, which can reveal health data</td><td className="border border-gray-800 px-4 py-3 align-top">Only if you explicitly confirm it in the same flow.</td><td className="border border-gray-800 px-4 py-3 align-top">As above.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Life rhythm from Apple Health</strong> — derived from your step count, which can reveal health</td><td className="border border-gray-800 px-4 py-3 align-top">Only if you tap &quot;Connect Apple Health&quot; and allow access in the iOS permission sheet. Refreshed when you open the iPhone app, at most once a day.</td><td className="border border-gray-800 px-4 py-3 align-top">Nothing changes: you are matched and dates are planned exactly as for everyone else.</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Free-text you write</strong> — you may voluntarily reveal special-category information in a vibe answer, a chat message, a report, or feedback</td><td className="border border-gray-800 px-4 py-3 align-top">Only if you choose to write it.</td><td className="border border-gray-800 px-4 py-3 align-top">We ask you not to share more than you need to.</td></tr>
</tbody>
</table>
</div>
<p className="text-gray-300 leading-relaxed my-4">Dietary and accessibility requirements are used <strong>only</strong> to filter and rank date venues. They are never used to rank you, to score you, or to decide who you are matched with, and they are never shown to your match as a category — your match sees only the venue we chose.</p>
<p className="text-gray-300 leading-relaxed my-4"><strong>Life rhythm is different, and we say so plainly.</strong> If you connect Apple Health, your two rhythm labels are used (a) to plan the date — for example preferring a venue close to the metro, or suggesting a park or café nearby for afterwards — and (b) as <strong>one small factor in matching</strong>: when both people have a rhythm, a similar rhythm raises the pair&apos;s score slightly and a very different one lowers it slightly, by at most a few percent. It never excludes anyone, it does nothing when either person has not connected Apple Health, and it is far weaker than the other factors (Section 8). Your match never sees your labels or learns that rhythm played any part. The labels are never sent to our AI provider, never used in any text written about you, and never shown to our staff one person at a time — only as statistics over many pairs. Disconnect in the app (Settings → Your tempo → Disconnect) erases them from our servers immediately; revoke Health access in iOS Settings → Health → Data Access &amp; Devices → Gennety.</p>
<p className="text-gray-300 leading-relaxed my-4"><strong>Racial and ethnic origin: not collected.</strong> Until 1 August 2026 onboarding asked an optional &quot;nationality or ethnic background&quot; question, and the answer formed part of the text we turned into your matching profile. That was a special category under Article 9 feeding an automated matching decision, and it was removed: the question is gone, the stored values were erased, and nothing in the product asks for or infers your ethnicity. The visual preference feature (Section 8) deliberately uses only hair, build, style and tattoos — never skin tone or any proxy for ethnicity.</p>
<p className="text-gray-300 leading-relaxed my-4"><strong>Sexual orientation.</strong> Your gender and the gender you want to be matched with are, together, capable of revealing sexual orientation. We collect them because matchmaking is impossible without them, we use them only to match you, and we never share them outside the match itself.</p>
<p className="text-gray-300 leading-relaxed my-4">Withdrawing consent for biometric verification does not undo processing that was already lawful, but it stops further processing, removes you from matching, and lets you request erasure of the biometric material we still hold.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">7. How We Use Your Data and Our Legal Bases</h2>
<p className="text-gray-300 leading-relaxed my-4">&quot;Legal basis&quot; refers to GDPR Article 6 (and Article 9 for special-category data).</p>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Purpose</th><th className="border border-gray-800 px-4 py-3 font-semibold">Data used</th><th className="border border-gray-800 px-4 py-3 font-semibold">Legal basis</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top">Create and operate your account; deliver onboarding</td><td className="border border-gray-800 px-4 py-3 align-top">Account, profile, contact rail</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Contract</strong> (Art. 6(1)(b))</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Verify your contact rail (university email OTP, or phone code / Telegram one-tap)</td><td className="border border-gray-800 px-4 py-3 align-top">Email or phone, OTP, delivery metadata</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Contract</strong>; <strong>legitimate interests</strong> (Art. 6(1)(f)) in preventing duplicate and fake accounts</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Confirm eligibility for the student community and its perks</td><td className="border border-gray-800 px-4 py-3 align-top">University email domain</td><td className="border border-gray-800 px-4 py-3 align-top">Contract</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Identity &amp; anti-impersonation verification (biometric)</td><td className="border border-gray-800 px-4 py-3 align-top">Liveness selfie, profile photos, face-match scores</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Explicit consent</strong> (Art. 9(2)(a)); Art. 6(1)(f) for fraud prevention</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Validate uploaded photos and video for safety and duplicates</td><td className="border border-gray-800 px-4 py-3 align-top">Photos, video frames, audio transcript (transient), perceptual hashes</td><td className="border border-gray-800 px-4 py-3 align-top">Legitimate interests in a safe platform; <strong>legal obligation</strong> for illegal content</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Match you with compatible people</td><td className="border border-gray-800 px-4 py-3 align-top">Profile, psychological summary, embedding, vibe axes, location, rating signals, age-band preference</td><td className="border border-gray-800 px-4 py-3 align-top">Contract; legitimate interests in effective matchmaking</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Score how well a candidate fits your stated visual preference (where offered)</td><td className="border border-gray-800 px-4 py-3 align-top">Your type-preference picks</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Consent</strong> — the step is optional and skippable</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Derive coarse appearance tags (hair, build, style, tattoos) from your photos so you can be scored against another user&apos;s stated visual preference</td><td className="border border-gray-800 px-4 py-3 align-top">Your profile photos</td><td className="border border-gray-800 px-4 py-3 align-top">Legitimate interests in effective matchmaking. Unlike the picks above this runs for everyone, is not skippable, and produces no special-category data — see Section 8</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Generate pitches, icebreakers, date hints, and venue choices</td><td className="border border-gray-800 px-4 py-3 align-top">Profile, follow-up answers, location, vibe, date preferences</td><td className="border border-gray-800 px-4 py-3 align-top">Contract; legitimate interests</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Arrange and confirm dates; select and change venues</td><td className="border border-gray-800 px-4 py-3 align-top">Availability, departure point, date preferences, agreed time</td><td className="border border-gray-800 px-4 py-3 align-top">Contract</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Filter venues on dietary / alcohol-free / step-free requirements</td><td className="border border-gray-800 px-4 py-3 align-top">The requirement you confirmed</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Explicit consent</strong> (Art. 9(2)(a)) where the requirement is special-category; otherwise contract</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Process purchases (tickets, bundles, paid venue changes) and manage the Premium subscription</td><td className="border border-gray-800 px-4 py-3 align-top">Purchase records, ledger entries, processor confirmations, entitlement dates</td><td className="border border-gray-800 px-4 py-3 align-top">Contract; <strong>legal obligation</strong> for accounting</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Handle cancellations and understand why people leave</td><td className="border border-gray-800 px-4 py-3 align-top">Subscription records, the cancellation reason if you give one</td><td className="border border-gray-800 px-4 py-3 align-top">Contract; <strong>consent</strong> for the free-text reason</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Trust &amp; safety: moderation, reports, strikes, suspensions, investigations</td><td className="border border-gray-800 px-4 py-3 align-top">Reports, photos/video safety scans, relay-chat logs, strikes</td><td className="border border-gray-800 px-4 py-3 align-top">Legitimate interests in user safety; legal obligation</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Send service messages, reminders, push notifications and Live Activities</td><td className="border border-gray-800 px-4 py-3 align-top">Account, usage, push tokens</td><td className="border border-gray-800 px-4 py-3 align-top">Contract; legitimate interests</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Operate an internal founder/operations feed (Section 12.2)</td><td className="border border-gray-800 px-4 py-3 align-top">Profile card, photos, match and date summaries</td><td className="border border-gray-800 px-4 py-3 align-top">Legitimate interests in operating and quality-checking a small, early-stage service</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Measure onboarding drop-off and product health</td><td className="border border-gray-800 px-4 py-3 align-top">Step telemetry, aggregate counters</td><td className="border border-gray-800 px-4 py-3 align-top">Legitimate interests in improving the Service</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Improve and develop the Service using <strong>anonymised</strong> data</td><td className="border border-gray-800 px-4 py-3 align-top">Aggregated / anonymised data</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Consent</strong> (the optional research opt-in). We record your choice at sign-up; today we act on it only by counting how many people opted in, and we will not start any research use of your data without it</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Enforce fair-use limits and prevent abuse</td><td className="border border-gray-800 px-4 py-3 align-top">Usage counters, IP, technical data</td><td className="border border-gray-800 px-4 py-3 align-top">Legitimate interests in service availability and cost control</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Comply with law and respond to lawful requests</td><td className="border border-gray-800 px-4 py-3 align-top">As required</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Legal obligation</strong> (Art. 6(1)(c))</td></tr>
</tbody>
</table>
</div>
<p className="text-gray-300 leading-relaxed my-4">Where we rely on legitimate interests, we have balanced those interests against your rights and freedoms; you can object at any time (Section 18) and we will stop unless we have compelling legitimate grounds.</p>
<p className="text-gray-300 leading-relaxed my-4">You can withdraw any consent at any time without affecting the lawfulness of processing carried out before the withdrawal.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">8. Automated Decision-Making and Profiling</h2>
<p className="text-gray-300 leading-relaxed my-4">Matchmaking is <strong>automated</strong>. We use algorithms and AI to:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>build a psychological profile and an embedding of you;</li>
<li>extract structured &quot;vibe&quot; axes from your free-text answers;</li>
<li>estimate an attractiveness / &quot;league&quot; rating from your photos, which strongly influences who you are considered compatible with;</li>
<li>where the feature is active, derive coarse appearance tags from your photos (hair colour and length, build, style, tattoos — <strong>never</strong> skin tone, ethnicity, or any proxy for either) and score them against another user&apos;s stated visual preference;</li>
<li>decide which person (if any) you are matched with in each weekly round, and in what priority order;</li>
<li>bucket each of your photos as pass / borderline / fail / no-face during identity verification, which routes your account to verified, manual review, or rejected;</li>
<li>triage a report about you into a severity tier, which can produce a warning, a suspension, or an investigation;</li>
<li>where you have connected Apple Health, compare your two life-rhythm labels with another person&apos;s as a minor factor in the match score, and use the calmer of the two to lean the venue choice (Section 6);</li>
<li>select the venue for your date.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">These automated steps can affect <strong>whether and with whom you are matched, and whether your account stays open.</strong> We consider that no automated decision here produces a legal or similarly significant effect that you cannot question, and we build in the following safeguards:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Human intervention on request.</strong> You may ask us to review any verification outcome, moderation decision, or account restriction, express your point of view, and contest the result. Write to <strong>legal@gennety.com</strong>.</li>
<li><strong>Fail-safe routing.</strong> If our own infrastructure or a provider fails during verification, you are routed to manual review — never auto-rejected.</li>
<li><strong>Rehabilitation.</strong> Verification re-runs automatically whenever you change your photos, so a bad outcome is not permanent.</li>
<li><strong>Safety decisions are reviewable.</strong> Suspensions for repeated breaches expire automatically; investigations are reviewed by a person.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">9. AI Processing</h2>
<p className="text-gray-300 leading-relaxed my-4">To generate your psychological summary and matchmaking signals, we send relevant profile text to our AI provider for analysis, embedding, transcription, moderation, and visual scoring.</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>Your psychological summary is built from <strong>your ordinary onboarding answers</strong> — your hobbies, what you want in a partner, and your free-text &quot;vibe&quot; answers.</li>
<li>The summary and its embedding are treated as your personal data, are used only to build your profile and your matches, and are <strong>never shown to another user</strong>.</li>
<li>We use AI providers on terms that <strong>do not permit them to train their public models on our API data.</strong></li>
<li>AI outputs can be wrong. Nothing our AI produces is advice; see the <a href="https://gennety.com/terms" className="text-magenta hover:underline">Terms of Service</a>.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4"><strong>Retired: the personal AI export.</strong> Earlier versions of the Service invited you to paste in a psychological analysis produced by your own AI assistant (the &quot;Magic Prompt&quot;). <strong>That feature is no longer offered and we no longer accept such an export.</strong> If you provided one while it was available, the raw text was never retained — only the redacted signal summary and its embedding, which are erased with your account like everything else.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">10. Photos, Video, and Biometric Data</h2>
<p className="text-gray-300 leading-relaxed my-4">Identity verification and face-matching involve <strong>biometric data</strong> — a special category under GDPR Article 9. We process it <strong>only with your explicit consent</strong>, which we ask for on a dedicated screen before the check starts. That screen tells you what is captured, who processes it (Amazon Web Services, in the EU), how long it is kept, and what happens if you say no.</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Verification is mandatory to be matched.</strong> You cannot be shown to other users, or see them, without passing it. (A small legacy group of users who skipped verification before it became mandatory, and accepted a rating penalty, remain matchable under the terms they agreed to.)</li>
<li><strong>Liveness selfie.</strong> Your device streams a short liveness video <strong>directly to Amazon Rekognition Face Liveness</strong> — it does not pass through our servers. AWS returns a single still frame, which we store privately as your verification reference and compare against your profile photos. The AWS session and everything in it expires three minutes after it is created.</li>
<li><strong>Face-match scores.</strong> A similarity score is stored per profile photo to decide the verification outcome. Photos where no face is detected (group shots, scenery) do not count against you.</li>
<li><strong>Selfie retention.</strong> Your verification selfie is automatically <strong>deleted 90 days after verification</strong> (Article 9 data minimisation). You remain verified; only the reference image is erased. If you verify again later, a new selfie is captured.</li>
<li><strong>Re-verification on photo changes.</strong> Every time you add, replace, or delete a profile photo, the verification pipeline re-runs against your current photos.</li>
<li><strong>Photo safety, face presence, and duplicates.</strong> Uploaded photos are checked for prohibited content, for the presence of a usable face, and for duplicates (using a perceptual hash). Rejections are logged as a minimal audit record (reason, media type, time) — <strong>the rejected media and any biometric material from it are not retained.</strong></li>
<li><strong>Profile video.</strong> An optional profile video is scanned for <strong>safety only</strong>: a small number of frames and the audio are analysed transiently for prohibited content. The extracted frames, the audio, and the transcript are <strong>not retained</strong> — only a validation timestamp and version. The video itself is display-only and carries no identity check.</li>
<li><strong>Partner photo protection.</strong> When you are matched, your photos are shown to your match in a forward/save-protected form, and a shareable date card blurs the partner&apos;s face before it can leave the platform. If the blur cannot be produced, we refuse to send the shareable copy rather than send a clear one. (Note: operating-system screenshots cannot be technically blocked in a normal chat — this is a platform limit, not a choice.)</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">11. Location Data</h2>
<p className="text-gray-300 leading-relaxed my-4">We use location data for three narrow purposes. The first two are part of the service; the third is an optional feature that does nothing unless you turn it on:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Your dating city.</strong> The city you select — and its coordinates — determines your match pool. You can search for a city or let us resolve it from your browser/device geolocation. A raw coordinate alone does not make you eligible for matching; you must set a city.</li>
<li><strong>Date logistics.</strong> For a confirmed date, the <strong>departure point</strong> you mark (and any raw location pin you choose to share) is used to compute a fair meeting area and to find a venue that is convenient for both of you. Your match is <strong>never shown your departure point</strong> — only the agreed venue.</li>
</ul>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Colouring in the map you have explored (optional).</strong> If — and only if — you switch this on, we note the <strong>approximate area</strong> you are in while the map screen is open, so the map can show the parts of the city you have actually been to. We store it as a grid square roughly 1.2 km across, which is about a neighbourhood: it can record that you have been around a district, and it cannot record which street or which building. <strong>Your exact position is never stored for this</strong>, and the areas are yours alone — they are never shown to a match or to anyone else. You can switch it off at any time; switching it off stops the recording and keeps the map you have already uncovered. To erase the areas themselves, delete your account (Section 15).</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">We do <strong>not</strong> continuously track your location, and we do not run background location collection — including for the optional feature above, which records only while you have the map screen open in front of you, and which is off until you switch it on. Map tiles shown in our Mini Apps are proxied through our own servers, so the map provider does not receive your IP address.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">12. Who We Share Data With</h2>
<p className="text-gray-300 leading-relaxed my-4">We do not sell your personal data. We share it in the following situations only.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">12.1 With your match</h3>
<p className="text-gray-300 leading-relaxed my-4">When a match is created, the other person sees: your first name, age, photos (and profile video, if you added one), a verification indicator, and AI-generated text about you (a pitch, icebreakers, a hint). They do <strong>not</strong> see your contact details, your email or phone, your exact location or departure point, your psychological summary, your ratings or scores, or your safety history. Telegram contact details are exchanged only if you both explicitly choose to, through the pre-date coordination flow (Section 13).</p>
<p className="text-gray-300 leading-relaxed my-4">Your match never receives your life-rhythm labels, or any statement that rhythm influenced the match, the venue or an after-date suggestion. An after-date suggestion, when there is one, is shown to both of you with the same neutral wording.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">12.2 Internal operations feed</h3>
<p className="text-gray-300 leading-relaxed my-4">Because Gennety is an early-stage service operated by a very small team, our founder receives an internal notification feed through a separate, private Telegram bot. It carries:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>On a new activated profile:</strong> a profile card (first name, age, gender, preference, city, height, hobbies, partner preferences, language, sign-up track, verification status, attractiveness score, Telegram <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">@username</code> if any) and your profile photos. It deliberately <strong>excludes your psychological summary</strong>.</li>
<li><strong>After each weekly matching round:</strong> a link to a private, unlisted, search-engine-excluded report page showing that week&apos;s pairs with the same kind of profile cards and photos. Access to that page is controlled by an unguessable token in the URL, and the link stops working after 90 days.</li>
<li><strong>When a date is confirmed:</strong> the two date cards and the venue.</li>
<li><strong>When an account is frozen or deleted:</strong> the profile card described above, <strong>your phone number</strong>, and <strong>your profile photos</strong>, so the operator can see who left and, where appropriate, follow up personally. It still excludes your psychological summary. This goes to the same single, private, founder-only Telegram bot as every other item on this list — it is not published, not shared onward, and not held anywhere beyond that one operator&apos;s own chat with their own bot.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4"><strong>Please read this part carefully, because it is the one place where deleting your account does not erase everything.</strong> When you delete your account we erase your data from every Gennety-operated system — the database, our file storage, and any stored weekly-report snapshot containing you. The operational notification above is the exception: it is sent at the moment of deletion and remains in the operator&apos;s private chat afterwards.</p>
<p className="text-gray-300 leading-relaxed my-4">We disclose this plainly rather than bury it, because it is a real limit on your right to erasure. Two things follow from that:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>You can ask for it to be removed too.</strong> Write to <strong>legal@gennety.com</strong> and the corresponding messages will be deleted from that chat. We treat that as part of an erasure request, not as a separate favour.</li>
<li><strong>It is a deliberate, time-limited choice.</strong> Gennety is at an early stage and run by one person, for whom understanding exactly who leaves is currently the main way the service improves. We have recorded this internally as an accepted risk with a named tradeoff, and we review it as the service grows — it is not intended to be permanent.</li>
</ul>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">12.3 Staff and administrative access</h3>
<p className="text-gray-300 leading-relaxed my-4">The operator of the Service can access an internal administration interface that includes user profiles, conversation transcripts, photos, and verification state, for support, moderation, and investigating abuse. It runs on a separate, key-protected, rate-limited interface, and images are streamed through an authenticated proxy rather than published.</p>
<p className="text-gray-300 leading-relaxed my-4">Being straightforward about the scale: Gennety is run by one person, and that interface is protected by a single shared key rather than per-person accounts, so it does not currently produce a per-person audit trail of who viewed what. We treat that as a limitation to fix as the team grows, not as a feature.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">12.4 Processors (sub-processors)</h3>
<p className="text-gray-300 leading-relaxed my-4">We share personal data with the following service providers strictly to operate the Service. Each acts as our processor under a data-processing agreement and may process data outside Ukraine or your country (see Section 15).</p>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Processor</th><th className="border border-gray-800 px-4 py-3 font-semibold">Purpose</th><th className="border border-gray-800 px-4 py-3 font-semibold">Data shared</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Amazon Web Services (Rekognition Face Liveness)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Identity / liveness verification. Your device streams the liveness video directly to AWS; it never passes through our servers</td><td className="border border-gray-800 px-4 py-3 align-top">Liveness video and the reference selfie it produces</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Amazon Web Services (Rekognition)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Face comparison, face detection, and content-safety analysis of photos and video frames</td><td className="border border-gray-800 px-4 py-3 align-top">Profile photos, verification selfie, transient video frames</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>OpenAI</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Psychological analysis, embeddings, conversational agents, voice and video-audio transcription, content moderation, visual attractiveness scoring and (where active) appearance tagging</td><td className="border border-gray-800 px-4 py-3 align-top">Profile text, voice/video transcripts, chat messages, photos</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Supabase</strong></td><td className="border border-gray-800 px-4 py-3 align-top">PostgreSQL database hosting and private file storage (verification selfies, mobile profile photos, chat images)</td><td className="border border-gray-800 px-4 py-3 align-top">Account, profile, photos, embeddings, all relational data</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Resend</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Delivering university-email verification codes</td><td className="border border-gray-800 px-4 py-3 align-top">Email address, one-time code</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Twilio</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Delivering phone verification codes by SMS to mobile-app users (primary rail)</td><td className="border border-gray-800 px-4 py-3 align-top">Phone number, verification status</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Telegram Gateway</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Optional secondary rail for delivering a phone verification code as an official Telegram service message</td><td className="border border-gray-800 px-4 py-3 align-top">Phone number, verification code</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Telegram</strong></td><td className="border border-gray-800 px-4 py-3 align-top">The messaging platform the bot and Mini Apps run on; also the Telegram Stars payment rail</td><td className="border border-gray-800 px-4 py-3 align-top">Everything you exchange with the bot, processed by Telegram under its own policy; payment amount and confirmation</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Apple</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Push notifications and Live Activities (APNs); App Store purchases and subscriptions (App Store Server API)</td><td className="border border-gray-800 px-4 py-3 align-top">Device push token and notification content; transaction identifiers and subscription status</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Google (Places)</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Venue search, venue details and venue photos for arranging dates</td><td className="border border-gray-800 px-4 py-3 align-top">Approximate meeting-area coordinates of a matched pair (never your identity)</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>CARTO</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Base map tiles for the map pickers, proxied through our servers</td><td className="border border-gray-800 px-4 py-3 align-top">Tile coordinates only — <strong>not</strong> your IP address</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Open-Meteo</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Weather forecast for the date&apos;s city and hour, so an outdoor venue is not suggested into a thunderstorm</td><td className="border border-gray-800 px-4 py-3 align-top">Approximate city coordinates and a date — never your identity</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>DigitalOcean</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Hosting our application servers</td><td className="border border-gray-800 px-4 py-3 align-top">Technical data, all data processed by the application</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top"><strong>Vercel</strong></td><td className="border border-gray-800 px-4 py-3 align-top">Hosting the marketing website</td><td className="border border-gray-800 px-4 py-3 align-top">Technical data, website request logs</td></tr>
</tbody>
</table>
</div>
<p className="text-gray-300 leading-relaxed my-4">We update this list as our providers change. A current list is available on request at <strong>legal@gennety.com</strong>.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">12.5 Legal and safety disclosures</h3>
<p className="text-gray-300 leading-relaxed my-4">We may disclose personal data where we believe in good faith that it is necessary to comply with a law, regulation, legal process, or enforceable governmental request; to enforce our Terms; to detect, prevent, or address fraud, security, or technical issues; or to protect the rights, property, or safety of Gennety, our users, or the public — including reporting unlawful conduct to the authorities.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">12.6 Business transfers</h3>
<p className="text-gray-300 leading-relaxed my-4">If Gennety is involved in a merger, acquisition, financing, or sale of assets, personal data may be transferred as part of that transaction. We will notify you and, where required, give you a choice before your data becomes subject to a different privacy policy.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">13. Communications and the No-Chat Model</h2>
<p className="text-gray-300 leading-relaxed my-4">Gennety does <strong>not</strong> provide open user-to-user chat. Your conversations are with our bot and AI concierge, plus the structured pitch, decision, scheduling, venue, safety, and report flows.</p>
<p className="text-gray-300 leading-relaxed my-4">There are two narrow, optional exceptions, both <strong>after</strong> you are matched and scheduled:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Contact exchange.</strong> Shortly before the date, you may choose to share your own Telegram handle with your match, or to ask for theirs. Sharing your own needs only your tap; receiving theirs needs their explicit approval.</li>
<li><strong>Anonymous pre-date relay chat.</strong> A time-boxed relay that passes text between you and your match so you can find each other. When it is used: it opens shortly before the date and closes automatically after it; it is <strong>text-only</strong> (media is rejected, which also prevents metadata leaks); <strong>every relayed message is logged</strong> to provide a moderation and safety trail and to support the in-line report control; and those logs are deleted when the related match is deleted.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">14. Payments and Subscriptions</h2>
<p className="text-gray-300 leading-relaxed my-4">Paid features are optional. When you buy something:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Payment is processed by the platform&apos;s own rail</strong> — Telegram Stars inside Telegram, or Apple&apos;s In-App Purchase in the iOS app. <strong>We never receive or store your card number or payment credentials.</strong> Telegram or Apple handles those under their own terms and privacy policies.</li>
<li><strong>We retain a record of the transaction</strong> — amount, currency, status, time, the provider&apos;s transaction identifier, and what it relates to (a match, a bundle, a venue change, or a subscription period). This append-only ledger is what makes a purchase count exactly once, makes a refund possible, and meets our accounting obligations.</li>
<li><strong>For the Gennety Premium subscription</strong>, we additionally store when your entitlement started and ends, whether auto-renewal is on, which rail it came from, and the recurring transaction identifier we use to recognise renewals.</li>
<li><strong>If you cancel in chat and choose to tell us why</strong>, that free-text reason is stored against the cancellation record and used to understand churn.</li>
<li>Refunds and their conditions are described in the <a href="https://gennety.com/terms" className="text-magenta hover:underline">Terms of Service</a>.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">15. International Data Transfers</h2>
<p className="text-gray-300 leading-relaxed my-4">Some processors are located outside Ukraine, the EEA, or the UK (for example, in the United States). Where we transfer personal data internationally, we rely on appropriate safeguards such as the European Commission&apos;s Standard Contractual Clauses, the UK International Data Transfer Addendum, or an adequacy decision, as applicable. You can request a copy of the relevant safeguards at <strong>legal@gennety.com</strong>.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">16. Data Retention</h2>
<p className="text-gray-300 leading-relaxed my-4">We keep personal data only as long as necessary for the purposes above.</p>
<div className="overflow-x-auto my-6">
<table className="w-full border-collapse border border-gray-800 text-left text-sm text-gray-300">
<thead className="bg-gray-900/80 text-white font-semibold">
<tr><th className="border border-gray-800 px-4 py-3 font-semibold">Data</th><th className="border border-gray-800 px-4 py-3 font-semibold">Retention</th></tr>
</thead>
<tbody className="divide-y divide-gray-800">
<tr><td className="border border-gray-800 px-4 py-3 align-top">Account &amp; profile data</td><td className="border border-gray-800 px-4 py-3 align-top">While your account exists; erased on account deletion</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Frozen accounts (soft-delete)</td><td className="border border-gray-800 px-4 py-3 align-top">Retained intact while frozen, so you can return instantly; erased on request or on deletion</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Verification selfie</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>90 days</strong> after verification, then automatically deleted</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Face-match scores</td><td className="border border-gray-800 px-4 py-3 align-top">While your account exists (they are scores, not images)</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Profile video frames, audio, transcript</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>Not retained</strong> — transient safety validation only</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Rejected-media records</td><td className="border border-gray-800 px-4 py-3 align-top">Minimal audit record (reason, media type, time) — no media kept</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Email / phone one-time codes</td><td className="border border-gray-800 px-4 py-3 align-top">Short-lived; hashed, expire quickly, and are marked consumed after use</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Mobile sign-in sessions / refresh tokens</td><td className="border border-gray-800 px-4 py-3 align-top">Until they expire, you sign out, or the account is deleted; stored hashed</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Push and Live Activity tokens</td><td className="border border-gray-800 px-4 py-3 align-top">Until the device unregisters, the token is reported dead, or the account is deleted</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Relay-chat message logs</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>90 days</strong>, and in any case deleted with the match</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Chat timeline</td><td className="border border-gray-800 px-4 py-3 align-top"><strong>30 days</strong>, then automatically deleted</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Promo attribution fingerprint</td><td className="border border-gray-800 px-4 py-3 align-top">Up to <strong>1 hour</strong>, held in memory only</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Explored areas (map colouring)</td><td className="border border-gray-800 px-4 py-3 align-top">While your account exists; erased on account deletion. Switching the feature off stops new recording and keeps what you have uncovered</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Life rhythm (Tempo Sync)</td><td className="border border-gray-800 px-4 py-3 align-top">While connected. Replaced on every refresh; <strong>deleted 35 days after the last refresh</strong>, immediately on &quot;Disconnect&quot;, and on account deletion</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Match records, score breakdowns, venue selection logs</td><td className="border border-gray-800 px-4 py-3 align-top">While your account exists; erased on account deletion</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Onboarding funnel telemetry</td><td className="border border-gray-800 px-4 py-3 align-top">While your account exists; erased on account deletion (it contains no answer text)</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Payment and subscription ledger entries</td><td className="border border-gray-800 px-4 py-3 align-top">As required by accounting and tax law, typically several years, even after account deletion — kept minimal and separated from your profile</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Safety records after account deletion (moderation status, strikes, and reports and blocks made against the account)</td><td className="border border-gray-800 px-4 py-3 align-top">Kept only if the deleted account had them, linked solely to keyed hashes of its Telegram ID, verified phone number and verified email — never the identifiers themselves — and used only to stop a restricted or blocked person from resetting them by registering again; <strong>24 months</strong> after deletion, then deleted</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Internal weekly-report snapshots</td><td className="border border-gray-800 px-4 py-3 align-top">Deleted for your account when you delete your account</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Website cookie-consent records</td><td className="border border-gray-800 px-4 py-3 align-top">Kept as proof of consent for as long as required to demonstrate compliance (append-only; see the Cookie Policy)</td></tr>
<tr><td className="border border-gray-800 px-4 py-3 align-top">Diagnostic / technical logs</td><td className="border border-gray-800 px-4 py-3 align-top">Short-term, then rotated</td></tr>
</tbody>
</table>
</div>
<p className="text-gray-300 leading-relaxed my-4"><strong>On account deletion</strong> we erase the storage objects we hold for you (verification selfies, profile media, chat attachments, voice recordings — everything stored under your account, not only what your profile currently shows), remove any internal report snapshot containing your account, and then delete your account and the data tied to it across our database. Two kinds of record remain afterwards: payment and subscription ledger entries, detached from your profile, and — only if your account had them — the safety records described in the retention table above. If a refund connected to your account is still being processed, deletion waits until it has gone through, so the money has somewhere to go; you can retry then. If storage erasure is temporarily unavailable, the deletion does <strong>not</strong> report success and you can retry — we never leave a half-deleted account. Some records may be retained where required by law (for example, financial records), where a processor keeps them under its own disclosed legal duties, or in anonymised form that can no longer identify you.</p>
<p className="text-gray-300 leading-relaxed my-4">One further exception is disclosed in <strong>Section 12.2</strong>: the internal operational notification sent at the moment of deletion remains in the operator&apos;s private chat. You can ask for that to be removed as part of your erasure request.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">17. Data Security</h2>
<p className="text-gray-300 leading-relaxed my-4">We apply technical and organisational measures appropriate to the sensitivity of the data, including:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>encrypted transport (TLS) everywhere;</li>
<li>private storage buckets with short-lived signed access — media is never publicly addressable;</li>
<li>cryptographic verification of requests from Telegram Mini Apps and signed tokens for the mobile API, with refresh-token rotation and revocation. Our liveness result is read server-to-server from AWS rather than accepted from the client, so a device cannot claim to have passed a check it did not;</li>
<li>hashing of one-time codes and refresh tokens; salting and hashing of IP addresses in consent records; masking of any verification code you type before it is written to the chat timeline;</li>
<li>separate, key-protected, rate-limited administrative interfaces;</li>
<li>minimisation of biometric retention (90-day selfie deletion) and non-retention of transient media used for safety checks;</li>
<li>rate limiting and abuse controls on messaging and code-delivery endpoints.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">No system is perfectly secure. If a personal-data breach occurs that is likely to result in a risk to your rights and freedoms, we will notify the relevant supervisory authority and, where the law requires, you.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">18. Your Rights</h2>
<p className="text-gray-300 leading-relaxed my-4">Subject to applicable law (and in full where GDPR/UK GDPR applies), you have the right to:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Access</strong> the personal data we hold about you and receive a copy;</li>
<li><strong>Rectify</strong> inaccurate or incomplete data (note: some identity fields such as first name, age, and your verified contact rail are fixed after onboarding — contact us to correct them);</li>
<li><strong>Erase</strong> your data (&quot;right to be forgotten&quot;);</li>
<li><strong>Restrict</strong> processing, or <strong>object</strong> to it — including any processing based on legitimate interests, and including profiling;</li>
<li><strong>Data portability</strong> — receive the data you provided in a structured, commonly used, machine-readable format;</li>
<li><strong>Withdraw consent</strong> at any time — including biometric verification, the optional visual type step, dietary/accessibility requirements, and the research opt-in — without affecting processing already carried out;</li>
<li><strong>Not be subject to solely automated decisions</strong> that significantly affect you: you may request human intervention, express your view, and contest a decision (Section 8);</li>
<li><strong>Lodge a complaint</strong> with a supervisory authority (Section 22).</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4"><strong>How to exercise them.</strong> Write to <strong>legal@gennety.com</strong>. We respond within the time the law requires (generally one month under GDPR, extendable by two months for complex requests, in which case we will tell you). We may need to verify that the request comes from you.</p>
<p className="text-gray-300 leading-relaxed my-4"><strong>Self-service.</strong> You can also:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Pause matching</strong> at any time, from the menu or the app;</li>
<li><strong>Freeze</strong> your account (soft-delete) — you are removed from matching and your status is hidden, but your profile, photos, verification, and embedding are kept so you can return instantly. Any in-flight match is cancelled and your counterpart is told neutrally. You are silently reactivated the next time you open the bot or the app;</li>
<li><strong>Delete</strong> your account — permanent and irreversible erasure as described in Section 16.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4"><strong>Withdrawing biometric consent.</strong> There is no self-service button for this yet: write to <strong>legal@gennety.com</strong> and we will erase the verification selfie and the face-match scores we hold. Because verification is what admits you to matching, withdrawing it removes you from the matching pool — you can keep the account and re-verify later, or delete it outright.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">19. Children&apos;s Privacy</h2>
<p className="text-gray-300 leading-relaxed my-4">The Service is intended only for users who are <strong>at least 18 years old</strong>. We do not knowingly collect data from anyone under 18. If we learn that we have collected data from someone under 18, we will delete it and close the account. If you believe a minor is using the Service, contact <strong>legal@gennety.com</strong>.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">20. Cookies and Similar Technologies</h2>
<p className="text-gray-300 leading-relaxed my-4">Our website uses cookies and local storage; our Mini Apps and mobile app use local storage only for things they need to work (such as your language, theme, and an unsent form draft). Inside the bot we operate a <strong>no-third-party-tracking</strong> model.</p>
<p className="text-gray-300 leading-relaxed my-4">Full details — the categories, what each one enables, the optional Spotify embed, the consent record we keep, and how to change or withdraw your choice — are in the separate <strong><a href="https://gennety.com/cookies" className="text-magenta hover:underline">Cookie Policy</a></strong>.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">21. Changes to This Policy</h2>
<p className="text-gray-300 leading-relaxed my-4">We may update this Policy as the Service evolves. When we make material changes we will update the &quot;Last Updated&quot; date and the version number and, where appropriate, notify you in the app or the bot. Where a change requires new consent under the law, we will ask for it rather than rely on continued use. Continued use after a non-material update means you accept the revised Policy.</p>
<p className="text-gray-300 leading-relaxed my-4">Previous versions are available on request at <strong>legal@gennety.com</strong>.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">22. Complaints and Contact</h2>
<p className="text-gray-300 leading-relaxed my-4">For any privacy question, request, or complaint, contact us at <strong>legal@gennety.com</strong>. We would appreciate the chance to address your concern first.</p>
<p className="text-gray-300 leading-relaxed my-4">If you are in the EEA or the UK and believe we have not handled your data lawfully, you may lodge a complaint with your local data-protection supervisory authority. If you are in Ukraine, you may contact the Ukrainian Parliament Commissioner for Human Rights (Ombudsman).</p>
        </div>
      </div>

      <Footer theme="dark" />
    </main>
  );
}
