"use client";

import { useEffect, useLayoutEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Languages,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import {
  completeRegistration,
  requestRegistrationOtp,
  type RegistrationLanguage,
  type RegistrationPurpose,
} from "@/lib/registration-api";
import { localeFlagEmoji, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type RegistrationStep = "email" | "code" | "done";

interface RegistrationButtonProps {
  mode: RegistrationPurpose;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

const languageOptions: Array<{ value: RegistrationLanguage; label: string }> = [
  { value: "en", label: "English" },
  { value: "uk", label: "Українська" },
  { value: "ru", label: "Русский" },
  { value: "de", label: "Deutsch" },
  { value: "pl", label: "Polski" },
];

function registrationLanguageFromLocale(locale: Locale): RegistrationLanguage {
  return languageOptions.some((option) => option.value === locale)
    ? (locale as RegistrationLanguage)
    : "en";
}

function errorLabel(raw: string, fallback: string): string {
  const value = raw.toLowerCase();
  if (value.includes("invalid university email")) return "Use your university email address.";
  if (value.includes("mismatch")) return "That code is not correct.";
  if (value.includes("expired")) return "That code expired. Request a new one.";
  if (value.includes("exhausted")) return "Too many attempts. Request a new code.";
  if (value.includes("too many")) return "Too many attempts. Try again later.";
  return raw || fallback;
}

export function RegistrationButton({
  mode,
  variant = "solid",
  size = "md",
  className,
  children,
}: RegistrationButtonProps) {
  const { locale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<RegistrationStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [language, setLanguage] = useState<RegistrationLanguage>(
    registrationLanguageFromLocale(locale),
  );
  const [languageOpen, setLanguageOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [researchOptIn, setResearchOptIn] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = mode === "login" ? t("registration.loginTitle") : t("registration.joinTitle");
  const description =
    mode === "login" ? t("registration.loginDescription") : t("registration.joinDescription");
  const selectedLanguage = languageOptions.find((option) => option.value === language);

  const progress = useMemo(() => {
    if (step === "done") return 3;
    if (step === "code") return 2;
    return 1;
  }, [step]);

  useEffect(() => {
    if (!open) return;
    setLanguage(registrationLanguageFromLocale(locale));
  }, [locale, open]);

  useLayoutEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.dataset.registrationModalOpen = "true";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    window.dispatchEvent(new Event("gennety:registration-modal"));

    return () => {
      delete document.body.dataset.registrationModalOpen;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      window.dispatchEvent(new Event("gennety:registration-modal"));
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (languageOpen) {
        setLanguageOpen(false);
        return;
      }
      if (!loading) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [languageOpen, loading, open]);

  useEffect(() => {
    if (step !== "done" || !telegramUrl) return;
    const timer = window.setTimeout(() => {
      window.location.assign(telegramUrl);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [step, telegramUrl]);

  async function handleRequestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!termsAccepted || !researchOptIn) {
      setError(t("registration.errorTerms"));
      return;
    }

    setLoading(true);
    try {
      await requestRegistrationOtp(email);
      setStep("code");
    } catch (err) {
      setError(errorLabel(err instanceof Error ? err.message : "", t("registration.errorGeneric")));
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await completeRegistration({
        email,
        otp,
        language,
        purpose: mode,
        termsAccepted: true,
        researchOptIn,
      });
      setTelegramUrl(result.telegramUrl);
      setStep("done");
    } catch (err) {
      setError(errorLabel(err instanceof Error ? err.message : "", t("registration.errorGeneric")));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setLoading(true);
    try {
      await requestRegistrationOtp(email);
    } catch (err) {
      setError(errorLabel(err instanceof Error ? err.message : "", t("registration.errorGeneric")));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>

      {open && (
        <div className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-midnight px-4 py-0 md:flex md:items-center md:justify-center md:py-6">
          {/* Полноэкранный фактурный фон тусовки (эффект отдельной страницы) */}
          <div
            className="fixed inset-0 bg-cover bg-center animate-fade-in"
            style={{ backgroundImage: `url('/images/party-bg.jpg')` }}
          />
          {/* Атмосферный слой затемнения/размытия поверх фона для премиального контраста */}
          <button
            type="button"
            className="fixed inset-0 bg-midnight/65 backdrop-blur-[6px] cursor-default"
            aria-label={t("registration.close")}
            onClick={() => !loading && setOpen(false)}
          />

          {/* Кнопка "Назад" в верхнем левом углу страницы */}
          <button
            type="button"
            className="fixed top-5 left-4 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 hover:scale-110 transition-all duration-300 backdrop-blur-md cursor-pointer md:top-8 md:left-8"
            aria-label="Go back"
            onClick={() => !loading && setOpen(false)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center py-20 md:min-h-0 md:py-0">
            {/* Увеличенное безрамочное окно с глубокими скруглениями */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="registration-title"
              className="w-full max-w-[400px] rounded-[32px] border border-white/10 bg-[#070708]/96 py-10 px-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.95),0_0_80px_rgba(208,173,252,0.03)] backdrop-blur-2xl"
            >
            <div>
              <h2 id="registration-title" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-400 max-w-[280px] mx-auto">
                {description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "h-[3px] flex-1 rounded-full transition-all duration-500",
                    item <= progress ? "bg-magenta shadow-neon-sm" : "bg-white/10",
                  )}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === "email" && (
                <motion.form
                  key="email"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="mt-6 space-y-7"
                  onSubmit={handleRequestOtp}
                >
                  <div>
                    <span className="mb-2.5 block text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                      {t("registration.emailLabel")}
                    </span>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-white/60 transition-colors duration-300">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        required
                        type="email"
                        value={email}
                        autoComplete="email"
                        placeholder="you@university.edu"
                        className="h-[54px] w-full rounded-2xl border border-white/10 bg-white/[0.02] pl-12 pr-4 text-base text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.04] focus:ring-[3px] focus:ring-white/5 hover:border-white/20"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    className="relative"
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setLanguageOpen(false);
                      }
                    }}
                  >
                    <span className="mb-2.5 block text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                      {t("registration.languageLabel")}
                    </span>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-white/60 transition-colors duration-300">
                        <Languages className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <button
                        type="button"
                        className={cn(
                          "flex h-[54px] w-full items-center justify-between rounded-2xl border bg-white/[0.02] pl-12 pr-4 text-left text-base text-white outline-none transition-all duration-300 hover:border-white/20 cursor-pointer",
                          languageOpen ? "border-white/30 bg-white/[0.04] ring-[3px] ring-white/5" : "border-white/10",
                        )}
                        aria-haspopup="listbox"
                        aria-expanded={languageOpen}
                        onClick={() => setLanguageOpen((value) => !value)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setLanguageOpen(true);
                          }
                        }}
                      >
                        <span className="flex items-center gap-2">
                          {selectedLanguage && (
                            <>
                              <span className="text-lg leading-none">
                                {localeFlagEmoji[selectedLanguage.value as Locale] || "🌐"}
                              </span>
                              <span>{selectedLanguage.label}</span>
                            </>
                          )}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-white/30 transition-transform duration-300 group-hover:text-white/60",
                            languageOpen && "rotate-180 text-white/80",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {languageOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          role="listbox"
                          aria-label={t("registration.languageLabel")}
                          className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl"
                        >
                          {languageOptions.map((option) => {
                            const selected = option.value === language;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                className={cn(
                                  "flex h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm transition-all duration-200 cursor-pointer",
                                  selected
                                    ? "bg-white/[0.08] text-white font-semibold"
                                    : "text-white/70 hover:bg-white/[0.04] hover:text-white",
                                )}
                                onClick={() => {
                                  setLanguage(option.value);
                                  setLanguageOpen(false);
                                }}
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className="text-lg leading-none">
                                    {localeFlagEmoji[option.value as Locale] || "🌐"}
                                  </span>
                                  <span>{option.label}</span>
                                </span>
                                {selected && (
                                  <Check className="h-4 w-4 text-white/70" aria-hidden="true" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <label className="flex items-start gap-3 text-sm leading-5 text-gray-400 select-none cursor-pointer hover:text-gray-300 transition-colors">
                    <input
                      required
                      type="checkbox"
                      checked={termsAccepted}
                      className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-magenta accent-magenta focus:ring-magenta/20 cursor-pointer transition-colors duration-200"
                      onChange={(event) => setTermsAccepted(event.target.checked)}
                    />
                    <span>
                      {t("registration.termsPrefix")}{" "}
                      <a href="/terms" className="text-white underline underline-offset-4 hover:text-magenta transition-colors" onClick={(e) => e.stopPropagation()}>
                        {t("registration.terms")}
                      </a>{" "}
                      {t("registration.and")}{" "}
                      <a href="/privacy" className="text-white underline underline-offset-4 hover:text-magenta transition-colors" onClick={(e) => e.stopPropagation()}>
                        {t("registration.privacy")}
                      </a>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-sm leading-5 text-gray-400 select-none cursor-pointer hover:text-gray-300 transition-colors">
                    <input
                      required
                      type="checkbox"
                      checked={researchOptIn}
                      className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-magenta accent-magenta focus:ring-magenta/20 cursor-pointer transition-colors duration-200"
                      onChange={(event) => setResearchOptIn(event.target.checked)}
                    />
                    <span>{t("registration.researchOptIn")}</span>
                  </label>

                  {error && <p className="text-sm text-red-300">{error}</p>}

                  <Button 
                    type="submit" 
                    size="md" 
                    className="w-full mt-2" 
                    disabled={loading || !termsAccepted || !researchOptIn}
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {t("registration.sendCode")}
                  </Button>
                </motion.form>
              )}

              {step === "code" && (
                <motion.form
                  key="code"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="mt-6 space-y-5"
                  onSubmit={handleComplete}
                >
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-gray-400 leading-relaxed">
                    {t("registration.codeSent")} <span className="text-white font-medium">{email}</span>
                  </div>
                  <div>
                    <span className="mb-2.5 block text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                      {t("registration.codeLabel")}
                    </span>
                    <div className="relative">
                      <input
                        required
                        inputMode="numeric"
                        pattern="[0-9]{4,8}"
                        value={otp}
                        autoComplete="one-time-code"
                        placeholder="123456"
                        className="h-[54px] w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 text-center text-xl font-mono tracking-[0.24em] text-white placeholder:text-white/10 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.04] focus:ring-[3px] focus:ring-white/5 hover:border-white/20"
                        onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-300">{error}</p>}

                  <Button type="submit" size="md" className="w-full" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="h-4 w-4" aria-hidden="true" />
                    )}
                    {t("registration.continueTelegram")}
                  </Button>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
                      disabled={loading}
                      onClick={() => {
                        setStep("email");
                        setOtp("");
                        setError("");
                      }}
                    >
                      {t("registration.changeEmail")}
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
                      disabled={loading}
                      onClick={handleResend}
                    >
                      {t("registration.resend")}
                    </button>
                  </div>
                </motion.form>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mt-6 space-y-5"
                >
                  <div className="rounded-2xl border border-magenta/25 bg-magenta/[0.03] px-4 py-5 text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-magenta filter drop-shadow-neon-sm" aria-hidden="true" />
                    <p className="mt-4 text-base font-semibold text-white">
                      {t("registration.readyTitle")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {t("registration.readyDescription")}
                    </p>
                  </div>
                  <Button href={telegramUrl} size="md" className="w-full">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {t("registration.openTelegram")}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
