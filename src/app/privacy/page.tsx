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
        <h1 className="text-4xl md:text-5xl font-serif mb-8 neon-text-sm">Privacy Policy for Gennety Dating (GDPR &amp; App Store Compliant)</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p><strong>Last Updated:</strong> April 26, 2026</p>
          <p>Gennety ("we," "us," "our") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, process, and share information in compliance with the General Data Protection Regulation (GDPR) and Apple’s App Store privacy guidelines.</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. DATA CONTROLLER</h2>
            <p>The developer of the application and the Data Controller is an individual developer, Gleb Gosha.</p>
            <p>Contact Email for privacy inquiries: <a href="mailto:legal@gennety.com" className="text-magenta hover:underline">legal@gennety.com</a></p>
            <p>Developer's Address: Kiev</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. DATA WE COLLECT</h2>
            <p>To operate the platform and provide our matchmaking service, we collect the following data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Account &amp; Identification Data:</strong> Name, age, phone number, email address, and university affiliation.</li>
              <li><strong>Biometric Data &amp; Photos (Sensitive Data):</strong> Profile photos and facial liveness verification data. This is strictly used to ensure the absence of fake accounts and verify your identity.</li>
              <li><strong>Psychological &amp; Vector Data (Sensitive Data):</strong> Answers provided during onboarding regarding your personality, values, and dating preferences. This may include "special categories of data" under Art. 9 GDPR.</li>
              <li><strong>Geolocation:</strong> Location data to match you with a partner and select the optimal venue for your offline date.</li>
              <li><strong>Technical &amp; Interaction Data:</strong> IP address, device information, OS version, and your interaction logs with the AI matchmaking agents.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. LEGAL BASES FOR PROCESSING</h2>
            <p>Under GDPR, we rely on the following legal bases to process your data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Contractual Necessity (Art. 6(1)(b)):</strong> To provide the core functionality of the app, including AI matchmaking and autonomously scheduling dates ("Meet for a date every Thursday" concept).</li>
              <li><strong>Explicit Consent (Art. 9(2)(a)):</strong> For processing sensitive data, including biometric liveness checks and psychological profiling.</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> To prevent fraud, ensure platform security, and improve our matchmaking stability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. HOW WE PROCESS AND STORE DATA (PRIVACY BY DESIGN)</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Vectorization:</strong> Your identity and psychological profile are converted into high-dimensional mathematical representations (embeddings) using pgvector. This allows for high-privacy AI matching without exposing raw text to administrators.</li>
              <li><strong>Storage and Security:</strong> User data is stored in a secure cloud infrastructure (Supabase), with servers physically located in the European Union (Frankfurt, Germany). We use industry-standard encryption for data in transit and at rest.</li>
              <li><strong>Cascading Deletion:</strong> We do not retain active user data longer than necessary. Upon requesting account deletion via the app settings, all your personal data (including your profile, match history, photos, and active sessions) is immediately and permanently deleted from our primary database via a cascading delete operation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. THIRD-PARTY PROCESSORS (SDKs &amp; APIs)</h2>
            <p>We do not sell your data or share it with third-party advertising networks. To provide the service, we share strictly necessary data with the following infrastructure providers:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Persona:</strong> For mandatory KYC, identity verification, and biometric Liveness verification.</li>
              <li><strong>OpenAI API:</strong> For analyzing psychological profiles and visual scoring. We use the Enterprise/API tier, which by contract ensures your data is <strong>not used</strong> to train public AI models.</li>
              <li><strong>Supabase:</strong> Cloud database (PostgreSQL) and file storage hosting.</li>
              <li><strong>Resend:</strong> For sending One-Time Passwords (OTP) to university email addresses.</li>
              <li><strong>Expo:</strong> For delivering push notifications to your mobile device.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. USER TRACKING (NO TRACKING)</h2>
            <p>The Gennety Dating app <strong>does not use</strong> cross-app or cross-site tracking technologies to display targeted advertising. We do not use third-party behavioral analytics SDKs. Your data is used exclusively within our platform for app functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. YOUR GDPR RIGHTS</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Right to Access (Art. 15):</strong> Request a copy of the data we hold about you.</li>
              <li><strong>Right to Rectification (Art. 16):</strong> Update or correct inaccurate data directly in your profile.</li>
              <li><strong>Right to Erasure (Art. 17):</strong> Request immediate deletion via the "Delete Account" button in the app settings.</li>
              <li><strong>Right to Withdraw Consent:</strong> Revoke your consent for biometric and sensitive data processing at any time by deleting your account.</li>
              <li><strong>Automated Decision-Making (Art. 22):</strong> You have the right to contest matchmaking decisions made solely by our AI algorithms and request human intervention.</li>
            </ul>
            <p className="mt-4">For exercising any of these rights, please contact us at <a href="mailto:legal@gennety.com" className="text-magenta hover:underline">legal@gennety.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. CHILDREN'S PRIVACY</h2>
            <p>The platform is strictly intended for individuals over 18 years of age. We intentionally do not collect data from minors. Our mandatory Persona biometric verification procedure automatically blocks account creation by anyone under 18.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. CHANGES TO THIS POLICY</h2>
            <p>We may update this Privacy Policy from time to time. In the event of material changes, we will notify you via a push notification in the app or by email.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. COMPLAINTS</h2>
            <p>If you believe we have violated your privacy rights, you have the right to lodge a complaint with a Data Protection Authority in your country of residence.</p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
