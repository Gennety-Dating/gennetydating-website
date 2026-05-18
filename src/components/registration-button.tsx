"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
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
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 overflow-y-auto">
          {/* Полноэкранный фактурный фон тусовки (эффект отдельной страницы) */}
          <div
            className="absolute inset-0 bg-cover bg-center animate-fade-in"
            style={{ backgroundImage: `url('/images/party-bg.jpg')` }}
          />
          {/* Атмосферный слой затемнения/размытия поверх фона для премиального контраста */}
          <button
            type="button"
            className="absolute inset-0 bg-midnight/65 backdrop-blur-[6px] cursor-default"
            aria-label={t("registration.close")}
            onClick={() => !loading && setOpen(false)}
          />

          {/* Кнопка "Назад" в верхнем левом углу страницы */}
          <button
            type="button"
            className="absolute top-8 left-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 hover:scale-110 transition-all duration-300 backdrop-blur-md cursor-pointer"
            aria-label="Go back"
            onClick={() => !loading && setOpen(false)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Увеличенное безрамочное окно с глубокими скруглениями */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
            className="relative z-10 w-full max-w-[400px] rounded-[32px] bg-[#070707]/95 py-10 px-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.9)] my-auto"
          >
            <div>
              <h2 id="registration-title" className="text-3xl font-semibold text-white">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-400 max-w-[280px] mx-auto">
                {description}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2" aria-hidden="true">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "h-1 rounded-full",
                    item <= progress ? "bg-magenta" : "bg-white/15",
                  )}
                />
              ))}
            </div>

            {step === "email" && (
              <form className="mt-6 space-y-5" onSubmit={handleRequestOtp}>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Mail className="h-4 w-4 text-magenta" aria-hidden="true" />
                    {t("registration.emailLabel")}
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    autoComplete="email"
                    placeholder="you@university.edu"
                    className="h-12 w-full rounded-[8px] border border-white/15 bg-white/5 px-3 text-base text-white outline-none transition focus:border-magenta"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>

                <div
                  className="relative"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setLanguageOpen(false);
                    }
                  }}
                >
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Languages className="h-4 w-4 text-magenta" aria-hidden="true" />
                    {t("registration.languageLabel")}
                  </span>
                  <button
                    type="button"
                    className={cn(
                      "flex h-12 w-full items-center justify-between rounded-[8px] border bg-white/5 px-3 text-left text-base text-white outline-none transition",
                      languageOpen ? "border-magenta shadow-neon-sm" : "border-white/15 hover:border-white/30",
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
                    <span>{selectedLanguage?.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-magenta transition-transform",
                        languageOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {languageOpen && (
                    <div
                      role="listbox"
                      aria-label={t("registration.languageLabel")}
                      className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[8px] border border-white/15 bg-[#111] p-1 shadow-2xl"
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
                              "flex h-11 w-full items-center justify-between rounded-[6px] px-3 text-left text-sm transition",
                              selected
                                ? "bg-magenta text-midnight"
                                : "text-white hover:bg-white/10",
                            )}
                            onClick={() => {
                              setLanguage(option.value);
                              setLanguageOpen(false);
                            }}
                          >
                            <span>{option.label}</span>
                            {selected && <Check className="h-4 w-4" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-3 text-sm leading-5 text-gray-400 select-none cursor-pointer hover:text-gray-300 transition-colors">
                  <input
                    required
                    type="checkbox"
                    checked={termsAccepted}
                    className="mt-1 h-4 w-4 accent-magenta cursor-pointer"
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
                    className="mt-1 h-4 w-4 accent-magenta cursor-pointer"
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
              </form>
            )}

            {step === "code" && (
              <form className="mt-6 space-y-4" onSubmit={handleComplete}>
                <div className="rounded-[8px] border border-white/10 bg-white/5 px-3 py-3 text-sm text-gray-300">
                  {t("registration.codeSent")} <span className="text-white">{email}</span>
                </div>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                    <Mail className="h-4 w-4 text-magenta" aria-hidden="true" />
                    {t("registration.codeLabel")}
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{4,8}"
                    value={otp}
                    autoComplete="one-time-code"
                    placeholder="123456"
                    className="h-12 w-full rounded-[8px] border border-white/15 bg-white/5 px-3 text-center text-xl tracking-[0.24em] text-white outline-none transition focus:border-magenta"
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                  />
                </label>

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
                    className="text-gray-400 hover:text-white"
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
                    className="text-gray-400 hover:text-white"
                    disabled={loading}
                    onClick={handleResend}
                  >
                    {t("registration.resend")}
                  </button>
                </div>
              </form>
            )}

            {step === "done" && (
              <div className="mt-6 space-y-5">
                <div className="rounded-[8px] border border-magenta/40 bg-magenta/10 px-4 py-5 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-magenta" aria-hidden="true" />
                  <p className="mt-3 text-base font-semibold text-white">
                    {t("registration.readyTitle")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {t("registration.readyDescription")}
                  </p>
                </div>
                <Button href={telegramUrl} size="md" className="w-full">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {t("registration.openTelegram")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
