import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Terms of Service | Gennety",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-sans font-bold mb-8 neon-text-sm">
          Terms of Service for Gennety
        </h1>

        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="text-gray-300 leading-relaxed my-4"><strong>Last Updated: 23 July 2026</strong> · <strong>Version 2.0</strong></p>
<p className="text-gray-300 leading-relaxed my-4">These Terms of Service (&quot;<strong>Terms</strong>&quot;) are a binding agreement between you and Gennety (&quot;<strong>Gennety</strong>&quot;, &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or &quot;<strong>our</strong>&quot;) governing your use of the Gennety matchmaking service through our Telegram bot (<code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">@gennetybot</code>), our Telegram Mini Apps, our native mobile application, and our website at <code className="bg-gray-800 px-1 py-0.5 rounded text-magenta font-mono text-sm">gennety.com</code> (together, the &quot;<strong>Service</strong>&quot;).</p>
<p className="text-gray-300 leading-relaxed my-4">By creating an account, tapping &quot;I agree&quot;, or otherwise using the Service, you accept these Terms and our <a href="https://gennety.com/privacy" className="text-magenta hover:underline">Privacy Policy</a>. <strong>If you do not agree, do not use the Service.</strong></p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">1. About Gennety</h2>
<p className="text-gray-300 leading-relaxed my-4">Gennety is an AI-first matchmaking service. Unlike traditional dating apps, Gennety acts as the matchmaker: our AI builds a deep profile of you, proposes one compatible match at a time, and helps arrange a real, in-person first date. <strong>There is no open user-to-user chat</strong> (see Section 7).</p>
<p className="text-gray-300 leading-relaxed my-4">Gennety launched inside university communities and keeps a first-class student community, but it is <strong>open to adults generally</strong> — students sign up with a university email and receive community perks, everyone else signs up with a phone number (Section 3).</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">2. Definitions</h2>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Account</strong> — your registered profile on the Service.</li>
<li><strong>Match</strong> — a compatible person proposed to you by our algorithm.</li>
<li><strong>Date Ticket</strong> (or &quot;<strong>Ticket</strong>&quot;) — an optional premium item used to confirm a scheduled date. Tickets are a virtual item, not currency.</li>
<li><strong>Premium</strong> — the optional <strong>Gennety Premium</strong> recurring subscription.</li>
<li><strong>Content</strong> — any text, photos, video, voice notes, or other material you submit.</li>
<li><strong>AI Export</strong> — the optional psychological analysis you paste from your own AI assistant during onboarding.</li>
<li><strong>Virtual Items</strong> — Tickets, bonuses, discounts, and any other non-monetary in-service item.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">3. Eligibility, Sign-Up Tracks, and Account Security</h2>
<p className="text-gray-300 leading-relaxed my-4">To use the Service, you confirm that you:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>are <strong>at least 18 years old</strong>;</li>
<li>can verify <strong>one</strong> of the two contact rails below;</li>
<li>provide <strong>accurate, current, and complete</strong> information about yourself;</li>
<li>create and maintain <strong>only one</strong> account; and</li>
<li>are not barred from using the Service under any applicable law, and have not previously been removed by us.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4"><strong>Two sign-up tracks.</strong> Verifying a contact rail is a mandatory condition of access. You choose one:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Student track</strong> — verify a valid <strong>university/corporate email address</strong> from an eligible domain with a one-time code. Students receive community perks, including a one-time grant of free Date Tickets.</li>
<li><strong>General track</strong> — verify a <strong>phone number</strong>. In Telegram this is a one-tap share; in the mobile app we send you a code by SMS (or, where available, as a Telegram service message).</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">A credential from one track never satisfies the other track&apos;s requirement. <strong>One account per phone number.</strong> Creating multiple accounts, or sharing an account, is a breach of these Terms.</p>
<p className="text-gray-300 leading-relaxed my-4">You are responsible for all activity under your account and for keeping your Telegram account, phone number, email, and device access secure. Tell us immediately at <strong>legal@gennety.com</strong> if you believe your account has been compromised. We may refuse, suspend, or terminate accounts that breach these Terms (Section 12).</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">4. Identity Verification Is Mandatory</h2>
<p className="text-gray-300 leading-relaxed my-4">We use a liveness check (via our verification provider) and a photo-to-selfie face comparison to confirm you are a real person and that your photos are of you.</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>Verification involves <strong>biometric data</strong> and is processed <strong>only with your explicit consent</strong>, as described in the Privacy Policy. If you do not consent, you cannot be matched — that is the trade-off that keeps the community real.</li>
<li><strong>You must pass verification to be matched.</strong> Until you do, you will not be shown to other users and no match will be proposed to you. There is no skip. (A small legacy group who skipped verification before it became mandatory, and who accepted a rating penalty at the time, remain matchable on those older terms.)</li>
<li>Verification <strong>re-runs automatically</strong> whenever you add, replace, or delete a profile photo. A previously verified account can therefore return to review status after a photo change.</li>
<li>If verification fails or is inconclusive, you may ask a human to review it (Privacy Policy, Section 8).</li>
<li>Submitting photos of another person, fake or AI-generated likenesses, or attempting to defeat verification is a <strong>serious breach</strong> of these Terms and may result in an immediate and permanent ban.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">Verification confirms liveness and photo consistency <strong>only</strong>. It is not a background check and does not vouch for anyone&apos;s character, safety, intentions, or honesty (Section 10).</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">5. How the Service Works (and Your Responsibilities)</h2>
<p className="text-gray-300 leading-relaxed my-4">Gennety relies on the information you provide. You are responsible for the accuracy and honesty of your profile, answers, photos, and any AI Export.</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>Our matching is <strong>automated</strong> and based on the data you give us. We do <strong>not</strong> guarantee any match, any number of matches, any particular quality of match, chemistry, a response, or a successful date.</li>
<li>Matches are proposed in <strong>weekly rounds</strong>. Some weeks you may receive no match. This is normal and is not a failure of the Service.</li>
<li>A <strong>blind decision</strong> applies: you will not learn your match&apos;s accept/decline choice before you make your own.</li>
<li>Once you decline, <strong>the decision is final</strong>, and we do <strong>not</strong> show you the same person twice — a matched pair is never re-proposed. Please decide carefully.</li>
<li>If you do not respond to a proposal within the stated window, it expires, and repeatedly ignoring proposals affects your internal rating and priority.</li>
<li>AI-generated suggestions (pitches, icebreakers, hints, venue choices, bios) are <strong>aids, not advice</strong>, and may be inaccurate. Use your own judgement.</li>
<li>We use an internal rating derived in part from an automated assessment of your photos. It influences who you are considered compatible with. It is an operational signal, not a statement about you as a person, and we do not publish it to other users.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">You must not misrepresent your identity, age, appearance, affiliation, or intentions.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">6. Your Content and Licence</h2>
<p className="text-gray-300 leading-relaxed my-4">You retain ownership of your Content. By submitting Content, you grant Gennety a worldwide, non-exclusive, royalty-free, sublicensable (to our processors only) licence to host, store, process, analyse, adapt, and display it <strong>solely to operate and provide the Service to you and your matches</strong> — including generating your profile, summaries, embeddings, icebreakers, date cards, and matches. This licence ends when you delete the Content or your account, except for copies we must retain by law or hold in anonymised/aggregated form.</p>
<p className="text-gray-300 leading-relaxed my-4">You represent that you own or have the rights to your Content, that it does not infringe anyone&apos;s rights or violate any law, and that every identifiable person in a photo you upload has agreed to appear in it.</p>
<p className="text-gray-300 leading-relaxed my-4"><strong>Other users&apos; content.</strong> Photos and information about your match are shown to you <strong>only</strong> to facilitate a date. You must <strong>not</strong> copy, save, screenshot-and-share, forward, publish, reverse-image-search, or otherwise misuse another user&apos;s photos or personal information. Doing so is a breach of these Terms and may be unlawful. Where we offer a shareable date card, it is deliberately produced with your partner&apos;s face blurred — do not attempt to defeat that.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">7. No User-to-User Chat (and the Narrow Exceptions)</h2>
<p className="text-gray-300 leading-relaxed my-4">Gennety deliberately does <strong>not</strong> offer open messaging between users. Your conversations are with our bot and AI concierge, plus the structured pitch, decision, scheduling, venue, safety, and reporting flows.</p>
<p className="text-gray-300 leading-relaxed my-4">The only exceptions apply <strong>after</strong> you are matched and scheduled:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>an optional <strong>contact exchange</strong> — you may share your own Telegram handle, or ask for your match&apos;s (which requires their explicit approval); and</li>
<li>an optional, time-boxed <strong>anonymous pre-date relay chat</strong> so you can find each other. It is text-only, opens and closes automatically around the date, and <strong>every message is logged</strong> for safety and moderation, with an in-line report control.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">You must not use these, or any free-text field the Service provides (a decline reason, an emergency-cancellation reason, feedback, or a report), to harass, threaten, solicit, advertise, or share another person&apos;s private information.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">8. Acceptable Use and Prohibited Conduct</h2>
<p className="text-gray-300 leading-relaxed my-4">You agree <strong>not</strong> to:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>harass, threaten, abuse, stalk, defame, or discriminate against anyone;</li>
<li>impersonate any person or misrepresent your identity or affiliation;</li>
<li>upload another person&apos;s photos, deepfakes, or AI-generated likenesses, or content that is sexually exploitative, hateful, violent, or otherwise illegal;</li>
<li>solicit money, advertise, recruit, spam, or run any commercial scheme, including sex work or any transactional arrangement;</li>
<li>contact, pressure, or attempt to identify a match outside the flows the Service provides, or against their wishes;</li>
<li>attempt to defeat verification, safety checks, rate limits, payment gates, or feature gates;</li>
<li>scrape, crawl, reverse-engineer, decompile, overload, probe, or interfere with the Service or its security;</li>
<li>use bots, automation, emulators, or multiple accounts;</li>
<li>resell, trade, or transfer your account, Tickets, or any Virtual Item; or</li>
<li>use the Service if you are under 18 or otherwise ineligible.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">We may remove Content, restrict features, suspend, or terminate accounts that breach this Section, and we may report unlawful conduct to the authorities.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">9. Dates, Venues, and Changes</h2>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>After both of you accept, you agree a time through the scheduling flow, and our concierge selects a venue based on where each of you is setting off from and what kind of place you each said you wanted.</li>
<li>Venue selection is automated and constrained to real, operating, open-at-the-time public places. We do <strong>not</strong> book, reserve, or hold a table for you, and we are not responsible if a venue is full, changes its hours, or closes.</li>
<li>Where offered, you may agree a <strong>venue change</strong> with your match before the date. Changing the venue is a paid action (Section 11). If nobody pays, or one of you decides against it, <strong>the originally assigned venue simply stands</strong> — the date is never cancelled because a venue change did not go through.</li>
<li>You may cancel a date through the emergency flow. Cancellation is <strong>irreversible</strong> — the match cannot be restored — and your reason is passed to the other person as you wrote it. Repeated or bad-faith cancellations may affect your standing.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">10. Offline Dates and Safety Disclaimer</h2>
<p className="text-gray-300 leading-relaxed my-4"><strong>Gennety helps arrange dates, but the date itself happens between users in the real world, and we are not a party to it.</strong></p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>We do <strong>not</strong> conduct criminal-background checks. Identity verification confirms liveness and photo consistency only — it does <strong>not</strong> guarantee a person&apos;s character, safety, intentions, or honesty.</li>
<li>You are solely responsible for your interactions with other users, online and in person. <strong>Use caution, meet in public, tell someone where you are going, keep your own transport, and trust your instincts.</strong></li>
<li>We provide safety prompts, a pre-date safety brief, and an emergency-cancellation flow, but these are aids only and do not make us responsible for any user&apos;s conduct.</li>
<li>To the fullest extent permitted by law, Gennety is <strong>not liable</strong> for the conduct of any user, or for any harm, loss, or injury arising from interactions with other users, whether online or offline.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">If you feel unsafe, contact your local emergency services first, and report the user to us afterwards.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">11. Paid Features, Virtual Items, and Payments</h2>
<p className="text-gray-300 leading-relaxed my-4">Some features are free; others are paid. Prices, and the currency or Star amount charged, are always shown to you <strong>before</strong> you confirm a purchase.</p>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">11.1 Payment rails</h3>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>Inside Telegram, purchases are made in <strong>Telegram Stars (XTR)</strong> and are processed by Telegram.</li>
<li>In our iOS app, purchases are made through <strong>Apple&apos;s In-App Purchase</strong> and are processed by Apple.</li>
<li>You agree to the payment provider&apos;s own terms for the payment itself. <strong>We do not receive or store your card number or payment credentials.</strong></li>
</ul>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">11.2 Date Tickets</h3>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>A <strong>Date Ticket</strong> is an optional premium item used to confirm a scheduled date. Where the ticket gate is active, both sides&apos; tickets must be settled before the scheduling step opens.</li>
<li>Tickets may be bought individually or in bundles, and may also be <strong>granted free</strong> as a welcome gift, an onboarding reward, or a community perk.</li>
<li>In an opposite-sex pair, a male user may choose to cover <strong>both</strong> tickets. This is voluntary; nobody is ever required to pay for another person.</li>
<li><strong>Tickets are a licence, not property.</strong> They have <strong>no cash value</strong>, are not currency, cannot be exchanged for money, and are <strong>non-transferable</strong> outside the flows we provide.</li>
<li>If a ticket-gated date does not proceed because payment stalls or the window expires, we return the ticket or the Stars charge and open scheduling anyway — an accepted match is never cancelled by a payment problem.</li>
</ul>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">11.3 Venue changes</h3>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>Where offered, agreeing a venue change is a <strong>flat one-off charge</strong>. Browsing, liking, and agreeing are free; you only pay at the moment a change is finalised, so there is nothing to refund if it does not happen.</li>
<li>Only one paid venue change per date.</li>
<li>If two payments race, the losing payment is <strong>automatically refunded</strong>.</li>
</ul>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">11.4 Gennety Premium (recurring subscription)</h3>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Gennety Premium is an auto-renewing subscription.</strong> It renews every 30 days at the then-current price until you cancel. The price is shown before you subscribe.</li>
<li><strong>How to cancel.</strong> In Telegram: through Telegram → Settings → Subscriptions, or by simply telling our bot you want to cancel, which gives you a confirmation button. On iOS: through iOS Settings → your Apple Account → Subscriptions — <strong>Apple, not Gennety, controls App Store subscriptions and we cannot cancel them for you.</strong></li>
<li><strong>Cancellation stops the next renewal.</strong> Your Premium access continues to the end of the period you already paid for; there is <strong>no partial refund of the current period</strong>.</li>
<li>Cancel at least 24 hours before the renewal date to avoid being charged for the next period.</li>
<li>We may change Premium&apos;s price or benefits for <strong>future</strong> periods. We will tell you before a price change takes effect, and you may cancel.</li>
<li>An entitlement you have already paid for stays valid even if we change or withdraw the offer.</li>
</ul>
<h3 className="text-xl font-semibold text-white mt-6 mb-3">11.5 Refunds</h3>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>EEA/UK consumers — right of withdrawal.</strong> You normally have 14 days to withdraw from a distance contract for digital content. By confirming a purchase you <strong>expressly request immediate performance</strong> and acknowledge that once the digital content or service has been fully supplied you <strong>lose that right of withdrawal</strong>. For a subscription, the right of withdrawal applies to the first period and, if exercised, we may charge for the part already supplied.</li>
<li>Except where consumer law requires otherwise, purchases are otherwise <strong>non-refundable</strong>.</li>
<li>Where a paid date does not proceed for a reason the Service recognises (a payment window expiring, a moderation action, a lost payment race), we return the <strong>ticket or charge</strong> automatically as described above.</li>
<li>A no-show, a bad date, a declined match, or your own change of mind does <strong>not</strong> entitle you to a refund.</li>
<li><strong>Apple purchases are refunded by Apple</strong>, under Apple&apos;s policies. Contact Apple Support; we cannot issue a refund for an App Store transaction.</li>
<li><strong>Telegram Stars purchases</strong> are refunded through the Telegram rail; contact us at <strong>legal@gennety.com</strong> and we will process the request where a refund is due.</li>
<li>Deleting your account does not entitle you to a refund of unused Virtual Items or of the remainder of a subscription period, except where the law requires.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">We reserve the right to change, add, or remove paid features, and to change prices for future purchases.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">12. Reports, Strikes, Suspension, and Termination</h2>
<p className="text-gray-300 leading-relaxed my-4">To keep the community safe, users can report each other after a match. Reports are triaged and may lead to:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>a note affecting your future matches, where the report reflects a personal preference rather than a safety issue (no penalty to the reported user);</li>
<li>a <strong>warning</strong>, then a <strong>suspension</strong>, then a <strong>ban</strong> for repeated ethical breaches; or</li>
<li>immediate <strong>investigation and suspension</strong> for a safety threat, with cancellation of any in-flight matches.</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">You may contest any restriction by writing to <strong>legal@gennety.com</strong>; a person will review it.</p>
<p className="text-gray-300 leading-relaxed my-4">We may suspend or terminate your account, with or without notice, if you breach these Terms or applicable law, or where necessary to protect users or the Service. We may also discontinue the Service or any feature. On termination, Sections 6 (as to licences already granted), 10, 11.5, 14, 15, 16, 17, 19 and 20 survive.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">13. Account Freeze and Deletion (&quot;The Total Wipe-Out&quot;)</h2>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>You may <strong>pause matching</strong> at any time — you keep everything and simply stop receiving proposals.</li>
<li>You may <strong>freeze</strong> your account, a soft-delete that removes you from matching and hides your status while keeping your profile so you can return instantly. Any in-flight match is cancelled and your counterpart is told neutrally.</li>
<li>You may <strong>delete</strong> your account at any time. Deletion is <strong>permanent and irreversible</strong>: it erases your stored media and triggers a cascading wipe-out of your data, subject to records we must keep by law or hold in anonymised form (see the Privacy Policy, Section 16).</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">14. Intellectual Property</h2>
<p className="text-gray-300 leading-relaxed my-4">The Service — including its software, design, text, branding, logos, and AI-generated outputs — is owned by Gennety or its licensors and is protected by intellectual-property laws. We grant you a limited, revocable, non-exclusive, non-transferable licence to use the Service for personal, non-commercial use in accordance with these Terms. You may not use our trademarks or content without our permission.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">15. Disclaimer of Warranties</h2>
<p className="text-gray-300 leading-relaxed my-4">To the fullest extent permitted by law, the Service is provided <strong>&quot;as is&quot; and &quot;as available&quot;</strong>, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, non-infringement, and any warranty about matches, results, availability, accuracy, or uninterrupted or error-free operation. <strong>AI outputs may be inaccurate, incomplete, or inappropriate.</strong> Your use of the Service is at your own risk.</p>
<p className="text-gray-300 leading-relaxed my-4">Nothing here excludes statutory guarantees that cannot be excluded under the consumer law that applies to you.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">16. Limitation of Liability</h2>
<p className="text-gray-300 leading-relaxed my-4">To the fullest extent permitted by law:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>Gennety, its operators, and its providers will <strong>not</strong> be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, or for emotional or physical harm arising from interactions with other users.</li>
<li>Our total aggregate liability for any claim relating to the Service is limited to the greater of (a) the amount you paid us in the <strong>12 months</strong> before the event giving rise to the claim, or (b) <strong>EUR 50</strong> (or local equivalent).</li>
</ul>
<p className="text-gray-300 leading-relaxed my-4">Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law — for example, for death or personal injury caused by our negligence, or for fraud.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">17. Indemnification</h2>
<p className="text-gray-300 leading-relaxed my-4">You agree to indemnify and hold Gennety harmless from any claims, damages, losses, and expenses (including reasonable legal fees) arising from your Content, your use of the Service, your interactions with other users, or your breach of these Terms or any law. This does not apply to the extent the claim arises from our own breach or negligence, or where the law does not allow it.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">18. Apple App Store — Additional Terms</h2>
<p className="text-gray-300 leading-relaxed my-4">These Terms apply to your use of our iOS application. Where you obtained the app from Apple&apos;s App Store, the following also applies and prevails over any conflicting provision:</p>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li>These Terms are between you and <strong>Gennety only, not Apple</strong>. Apple is not responsible for the app or its content.</li>
<li>Apple has <strong>no obligation</strong> to furnish any maintenance or support for the app.</li>
<li>If the app fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any). To the maximum extent permitted by law, Apple has <strong>no other warranty obligation</strong> with respect to the app.</li>
<li><strong>Gennety, not Apple</strong>, is responsible for addressing any claim relating to the app, including product-liability claims, claims that the app fails to conform to a legal requirement, and claims under consumer-protection or privacy law.</li>
<li><strong>Gennety, not Apple</strong>, is responsible for the investigation, defence, settlement, and discharge of any third-party intellectual-property infringement claim relating to the app.</li>
<li>You represent that you are not located in a country subject to a U.S. Government embargo or designated as &quot;terrorist supporting&quot;, and that you are not on any U.S. Government list of prohibited or restricted parties.</li>
<li>Apple and its subsidiaries are <strong>third-party beneficiaries</strong> of these Terms and may enforce them against you.</li>
<li>Your use of the app must comply with the <strong>Apple Media Services Terms and Conditions</strong> in force.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">19. Changes to These Terms and the Service</h2>
<p className="text-gray-300 leading-relaxed my-4">We may update these Terms as the Service evolves. When we make material changes we will update the &quot;Last Updated&quot; date and the version number and, where appropriate, notify you in the app or the bot. Continued use after an update means you accept the revised Terms; if you do not accept them, stop using the Service and delete your account. We may also modify, suspend, or discontinue the Service or any feature at any time.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">20. Governing Law and Dispute Resolution</h2>
<p className="text-gray-300 leading-relaxed my-4">These Terms are governed by the laws of <strong>Ukraine</strong>, without regard to its conflict-of-laws rules. Subject to any mandatory consumer-protection rights you have in your country of residence, the courts of <strong>Kyiv, Ukraine</strong> have non-exclusive jurisdiction over any dispute arising from these Terms or the Service.</p>
<p className="text-gray-300 leading-relaxed my-4"><strong>Please contact us first.</strong> Write to <strong>legal@gennety.com</strong> and we will try in good faith to resolve the matter informally within 30 days before either of us starts formal proceedings.</p>
<p className="text-gray-300 leading-relaxed my-4">If you are an EEA consumer, you may also use the European Commission&apos;s Online Dispute Resolution platform, or your national consumer dispute-resolution body. Nothing in this Section deprives you of the protection of mandatory rules of the country where you live.</p>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">21. Miscellaneous</h2>
<ul className="list-disc pl-6 space-y-2 my-2 text-gray-300">
<li><strong>Severability</strong> — if any provision is found unenforceable, the rest remain in effect.</li>
<li><strong>No waiver</strong> — our failure to enforce a provision is not a waiver of it.</li>
<li><strong>Assignment</strong> — you may not assign these Terms; we may assign them in connection with a merger, acquisition, or sale of assets.</li>
<li><strong>Force majeure</strong> — we are not liable for failures caused by events beyond our reasonable control, including war, outage of a provider we depend on, or a platform&apos;s policy change.</li>
<li><strong>Language</strong> — these Terms are published in English. A translation, if provided, is for convenience; the English text governs.</li>
<li><strong>Entire agreement</strong> — these Terms, the Privacy Policy, and the Cookie Policy are the entire agreement between you and Gennety regarding the Service.</li>
</ul>
<hr className="border-gray-800 my-8" />
<h2 className="text-2xl font-semibold text-white mt-12 mb-4">22. Contact</h2>
<p className="text-gray-300 leading-relaxed my-4">Questions about these Terms? Contact us at <strong>legal@gennety.com</strong>.</p>
        </div>
      </div>

      <Footer theme="dark" />
    </main>
  );
}
