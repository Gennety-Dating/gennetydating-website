import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { CONTACT_EMAIL, TELEGRAM_SUPPORT_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Support | Gennety",
  description:
    "Get help with Gennety: contact the team, delete your account, report or block someone, and manage your Premium subscription.",
};

const P = "text-gray-300 leading-relaxed my-4";
const H2 = "text-2xl font-semibold text-white mt-12 mb-4";
const UL = "list-disc pl-6 space-y-2 my-2 text-gray-300";
const A = "text-magenta hover:underline";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-sans font-bold mb-8 neon-text-sm">
          Gennety Support
        </h1>

        <div className="prose prose-invert max-w-none text-gray-300">
          <p className={P}>
            Need help with the Gennety app or the Telegram bot? Here is how to reach us and how to
            handle the most common requests yourself.
          </p>

          <hr className="border-gray-800 my-8" />
          <h2 className={H2}>Contact us</h2>
          <ul className={UL}>
            <li>
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={A}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              Telegram:{" "}
              <a href={TELEGRAM_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className={A}>
                @gennetysupport
              </a>
            </li>
          </ul>

          <hr className="border-gray-800 my-8" />
          <h2 className={H2}>Delete your account</h2>
          <p className={P}>
            In the iOS app, open <strong>Settings → Delete account</strong>. This permanently
            deletes your account and its data. A small set of records we must keep by law, or keep
            in anonymised form, is described in the{" "}
            <Link href="/privacy" className={A}>
              Privacy Policy
            </Link>{" "}
            (retention section).
          </p>
          <p className={P}>
            Deleting the app does not delete your account, and deleting your account does not
            cancel a subscription billed by Apple — cancel it first, as described below.
          </p>

          <hr className="border-gray-800 my-8" />
          <h2 className={H2}>Safety: report or block someone</h2>
          <p className={P}>
            You can <strong>report</strong> or <strong>block</strong> a match from the chat or from
            the date screen. Blocking ends any match you have with that person and stops them from
            being proposed to you again; they are not told. Reports are reviewed by the Gennety
            team. You can also report through{" "}
            <a href={TELEGRAM_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className={A}>
              @gennetysupport
            </a>{" "}
            on Telegram.
          </p>

          <hr className="border-gray-800 my-8" />
          <h2 className={H2}>Subscriptions and purchases</h2>
          <ul className={UL}>
            <li>
              <strong>Premium</strong> bought in the iOS app is an auto-renewing subscription billed
              by Apple through your Apple Account.
            </li>
            <li>
              To manage or cancel it, open iPhone <strong>Settings → your name (Apple Account) →
              Subscriptions</strong>. Cancel at least 24 hours before the end of the current period
              to avoid being charged for the next one.
            </li>
            <li>
              Refunds for App Store purchases are handled by Apple: request one at{" "}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className={A}
              >
                reportaproblem.apple.com
              </a>
              .
            </li>
          </ul>

          <hr className="border-gray-800 my-8" />
          <h2 className={H2}>Legal</h2>
          <ul className={UL}>
            <li>
              <Link href="/terms" className={A}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={A}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Footer theme="dark" />
    </main>
  );
}
