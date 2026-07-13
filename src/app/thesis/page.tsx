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
        className="fixed -inset-10 bg-[url('/images/thesis-bg.jpg')] bg-cover bg-center pointer-events-none filter blur-[2px] opacity-45 z-0 scale-105" 
        aria-hidden="true"
      />
      {/* Dark overlay for contrast */}
      <div className="fixed -inset-10 bg-midnight/50 z-0 pointer-events-none" />

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
        <h1 className="text-4xl md:text-6xl font-sans font-light text-white/95 mb-16 tracking-tight lowercase">
          {t("thesis.title")}
        </h1>

        {/* Content Container (beautifully left-aligned) */}
        <div className="space-y-10 text-gray-300/90 text-[17px] md:text-[19px] font-light tracking-wide leading-relaxed max-w-3xl font-sans">
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p1") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p2") }} />

          {/* List Section */}
          <div className="space-y-6 py-4">
            <h3 className="font-medium text-white text-xl md:text-2xl tracking-tight">{t("thesis.list.title")}</h3>
            <ul className="list-none space-y-4 pl-2">
              <li className="flex items-start gap-4">
                <span className="text-white font-sans font-semibold mt-0.5 text-lg">1.</span>
                <span dangerouslySetInnerHTML={{ __html: t("thesis.list.item1").replace(/^\d+\.\s*/, "") }} />
              </li>
              <li className="flex items-start gap-4">
                <span className="text-white font-sans font-semibold mt-0.5 text-lg">2.</span>
                <span dangerouslySetInnerHTML={{ __html: t("thesis.list.item2").replace(/^\d+\.\s*/, "") }} />
              </li>
              <li className="flex items-start gap-4">
                <span className="text-white font-sans font-semibold mt-0.5 text-lg">3.</span>
                <span dangerouslySetInnerHTML={{ __html: t("thesis.list.item3").replace(/^\d+\.\s*/, "") }} />
              </li>
              <li className="flex items-start gap-4">
                <span className="text-white font-sans font-semibold mt-0.5 text-lg">4.</span>
                <span dangerouslySetInnerHTML={{ __html: t("thesis.list.item4").replace(/^\d+\.\s*/, "") }} />
              </li>
            </ul>
          </div>

          <p dangerouslySetInnerHTML={{ __html: t("thesis.p4") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p5") }} />
          
          {/* Big Question Highlight as a minimalist quote */}
          <blockquote className="pl-4 md:pl-8 my-12 text-white/95 text-2xl md:text-3xl font-serif italic tracking-wide leading-relaxed">
            {t("thesis.p6")}
          </blockquote>

          {/* Scam Market Stats Highlight Card */}
          <div className="p-8 rounded-2xl bg-white/[0.03] my-10 backdrop-blur-sm">
            <p className="font-sans text-gray-300/90 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: t("thesis.p7") }} />
          </div>

          <p dangerouslySetInnerHTML={{ __html: t("thesis.p8") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p9") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p10") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p11") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p12") }} />
          <p dangerouslySetInnerHTML={{ __html: t("thesis.p13") }} />
          
          {/* Final Callout */}
          <p className="font-medium text-white/95 text-xl md:text-2xl pt-10 mt-16 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: t("thesis.p14") }} />
        </div>
      </div>

      <Footer theme="dark" />
    </main>
  );
}
