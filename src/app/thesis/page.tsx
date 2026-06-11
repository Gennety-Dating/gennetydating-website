"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ThesisPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-midnight text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background image */}
      <div 
        className="fixed inset-0 bg-[url('/images/thesis-bg.jpg')] bg-cover bg-center pointer-events-none filter blur-[2px] opacity-45 z-0" 
        aria-hidden="true"
      />
      {/* Dark overlay for contrast */}
      <div className="fixed inset-0 bg-midnight/50 z-0 pointer-events-none" />

      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6 md:px-10 max-w-4xl mx-auto w-full flex flex-col justify-start relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 self-start group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-16 tracking-tight lowercase">
          {t("thesis.title")}
        </h1>

        {/* Content Container (beautifully left-aligned) */}
        <div className="space-y-10 text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
          <p>{t("thesis.p1")}</p>
          <p>{t("thesis.p2")}</p>

          {/* List Section */}
          <div className="space-y-6 py-4">
            <h3 className="font-semibold text-white text-xl md:text-2xl">{t("thesis.list.title")}</h3>
            <ul className="list-none space-y-4 pl-2">
              <li className="flex items-start gap-4">
                <span className="text-gray-400 font-mono font-bold mt-1 text-xl">1.</span>
                <span>{t("thesis.list.item1").replace(/^\d+\.\s*/, "")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gray-400 font-mono font-bold mt-1 text-xl">2.</span>
                <span>{t("thesis.list.item2").replace(/^\d+\.\s*/, "")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gray-400 font-mono font-bold mt-1 text-xl">3.</span>
                <span>{t("thesis.list.item3").replace(/^\d+\.\s*/, "")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gray-400 font-mono font-bold mt-1 text-xl">4.</span>
                <span>{t("thesis.list.item4").replace(/^\d+\.\s*/, "")}</span>
              </li>
            </ul>
          </div>

          <p>{t("thesis.p4")}</p>
          <p>{t("thesis.p5")}</p>
          
          {/* Big Question Highlight as a blockquote with subtle gray border */}
          <blockquote className="border-l-2 border-white/20 pl-6 py-3 my-10 italic text-white text-xl md:text-2xl font-serif">
            {t("thesis.p6")}
          </blockquote>

          {/* Scam Market Stats Highlight Card */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 my-10 backdrop-blur-md">
            <p className="font-sans text-gray-300 leading-relaxed">
              {t("thesis.p7")}
            </p>
          </div>

          <p>{t("thesis.p8")}</p>
          <p>{t("thesis.p9")}</p>
          <p>{t("thesis.p10")}</p>
          <p>{t("thesis.p11")}</p>
          <p>{t("thesis.p12")}</p>
          <p>{t("thesis.p13")}</p>
          
          {/* Final Callout */}
          <p className="font-medium text-white text-xl md:text-2xl border-t border-white/10 pt-10 mt-16 leading-relaxed">
            {t("thesis.p14")}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
