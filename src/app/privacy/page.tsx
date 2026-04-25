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
        <h1 className="text-4xl md:text-5xl font-serif mb-8 neon-text-sm">Privacy Policy for Gennety Dating</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p><strong>Effective Date:</strong> April 25, 2026</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Data Controller</h2>
            <p>The developer of the application and the data controller is an individual developer, Gleb [YOUR LAST NAME].</p>
            <p>Contact email for any privacy and data-related inquiries: <a href="mailto:legal@gennety.com" className="text-magenta hover:underline">legal@gennety.com</a></p>
            <p>Developer's Address: [YOUR COUNTRY, CITY]</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Data We Collect</h2>
            <p>To operate the platform, we collect the following categories of data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Account Data:</strong> Name, age, phone number / email address, and university affiliation data.</li>
              <li><strong>Biometric Data and Photos:</strong> Profile photos and facial liveness verification data to ensure the absence of fake accounts.</li>
              <li><strong>Psychological Profile:</strong> Data regarding your preferences and values, structured for our matchmaking algorithm.</li>
              <li><strong>Geolocation:</strong> Location data to match you with a partner and select the optimal venue for an offline date.</li>
              <li><strong>Technical Data:</strong> IP address, basic device information, and platform interaction logs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. How We Use Your Data</h2>
            <p>We process your data exclusively to provide the stated functionality:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Matchmaking &amp; Zero-Chat:</strong> Our AI analyzes psychological profiles and photos to form matches and autonomously schedule dates (following the "Go on a date every Thursday" concept), eliminating the need for manual chatting.</li>
              <li><strong>Security and Verification:</strong> Biometric verification ensures community safety and confirms your identity and student status.</li>
              <li><strong>Infrastructure:</strong> Sending push notifications and transactional emails (OTP codes).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Data Storage and Processing</h2>
            <p>User data is stored in a secure cloud infrastructure (Supabase), with servers physically located in the European Union (Frankfurt, Germany). We use modern encryption methods for data transmission and storage.</p>
            <p><strong>Storage and Deletion:</strong> We do not retain your data longer than necessary. Upon requesting account deletion via the app settings, all your personal data (including your profile, date history, photos, and active sessions) is deleted from the database immediately, cascaded, and irretrievably.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Sharing Data with Third Parties</h2>
            <p>We do not sell your data, nor do we share it with advertising networks or use third-party analytics systems. Data is processed only by strictly necessary infrastructural services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Persona:</strong> For mandatory identity verification and biometric Liveness verification procedures.</li>
              <li><strong>OpenAI API:</strong> For analyzing psychological profiles, text generation, and visual scoring. We use the closed API, ensuring your data is not used to train public AI models.</li>
              <li><strong>Supabase:</strong> Cloud database (PostgreSQL) and file storage provider.</li>
              <li><strong>Resend:</strong> For sending One-Time Passwords (OTP) to university email addresses.</li>
              <li><strong>Expo / Telegram API:</strong> For delivering push notifications and ensuring the operation of the app interface.</li>
            </ul>
            <p className="mt-4">All third-party providers are obligated to comply with strict privacy and data security standards.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. User Tracking</h2>
            <p>The Gennety Dating app does not use user tracking technologies across websites and apps of other companies to display targeted advertising. Your data is used exclusively within our platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. User Rights</h2>
            <p>At any time, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Request access to your personal data.</li>
              <li>Correct inaccurate data in your profile.</li>
              <li>Delete your account — this action erases all your data immediately and permanently.</li>
              <li>Withdraw consent for the processing of biometric data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Children's Privacy</h2>
            <p>The platform is strictly intended for individuals over 18 years of age. We intentionally do not collect data from minors, and our mandatory verification procedure blocks account creation by anyone under 18.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Changes to this Policy</h2>
            <p>We may update this document from time to time. In the event of material changes, we will notify you via the app or by email.</p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
