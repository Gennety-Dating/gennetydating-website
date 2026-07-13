"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Languages,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import {
  completeRegistration,
  requestRegistrationOtp,
  resolveCity,
  searchCities,
  type RegistrationCity,
  type RegistrationLanguage,
  type RegistrationPurpose,
  type RegistrationTrack,
} from "@/lib/registration-api";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * The website owns the first slice of onboarding, and how much of it depends on
 * the track the visitor picks:
 *
 *   start ─┬─ (phone)  ──────────────────────────────► done → Telegram
 *          └─ (email) ─► email ─► city ─► code ──────► done → Telegram
 *
 * The phone number is never collected here on purpose — Telegram's one-tap
 * contact share is both nicer and the only source we actually trust, so a
 * phone-track visitor leaves the site after nothing more than language+consent.
 *
 * The city sits *between* the email and the code because the OTP is verified
 * only once, inside the final `complete` call: asking for the code last means a
 * mistyped digit never throws away a city the user already picked — and the
 * email has time to land while they choose.
 */
type RegistrationStep = "start" | "email" | "city" | "code" | "done";

interface RegistrationButtonProps {
  mode: RegistrationPurpose;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

const BOT_USERNAME = process.env.NEXT_PUBLIC_BOT_USERNAME || "gennetybot";

/** Only the languages the bot can actually converse in (see registration-api). */
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
  const [step, setStep] = useState<RegistrationStep>("start");
  const [track, setTrack] = useState<RegistrationTrack | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [city, setCity] = useState<RegistrationCity | null>(null);
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<RegistrationCity[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [language, setLanguage] = useState<RegistrationLanguage>(
    registrationLanguageFromLocale(locale),
  );
  const [prevLocale, setPrevLocale] = useState(locale);
  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setLanguage(registrationLanguageFromLocale(locale));
  }
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

  // The phone track is two screens; the student track is four. Show each its own
  // honest progress rather than a bar that pretends the other track's steps exist.
  const totalSteps = track === "general" ? 2 : 4;
  const progress = useMemo(() => {
    if (step === "done") return totalSteps;
    if (step === "code") return 4;
    if (step === "city") return 3;
    if (step === "email") return 2;
    return 1;
  }, [step, totalSteps]);

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

  // Debounced city search. An in-flight request is aborted when the query moves
  // on, so a slow response can never overwrite the results of a newer one.
  const cityAbort = useRef<AbortController | null>(null);
  useEffect(() => {
    if (step !== "city") return;
    const query = cityQuery.trim();
    if (query.length < 2) {
      setCityResults([]);
      return;
    }

    const timer = window.setTimeout(() => {
      cityAbort.current?.abort();
      const controller = new AbortController();
      cityAbort.current = controller;
      setCityLoading(true);
      searchCities(query, controller.signal)
        .then((res) => setCityResults(res.results))
        .catch((err: unknown) => {
          if ((err as Error)?.name !== "AbortError") setCityResults([]);
        })
        .finally(() => {
          if (!controller.signal.aborted) setCityLoading(false);
        });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [cityQuery, step]);

  async function startTrack(chosen: RegistrationTrack) {
    setError("");
    if (!termsAccepted) {
      setError(t("registration.errorTerms"));
      return;
    }
    setTrack(chosen);

    // The phone track needs nothing else from the web: consent + language are
    // the whole payload, and Telegram verifies the number itself.
    if (chosen === "general") {
      setLoading(true);
      try {
        const result = await completeRegistration({
          track: "general",
          language,
          purpose: mode,
          termsAccepted: true,
          researchOptIn,
        });
        setTelegramUrl(result.telegramUrl);
        setStep("done");
      } catch (err) {
        setError(
          errorLabel(err instanceof Error ? err.message : "", t("registration.errorGeneric")),
        );
        setTrack(null);
      } finally {
        setLoading(false);
      }
      return;
    }

    setStep("email");
  }

  async function handleRequestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestRegistrationOtp(email);
      setStep("city");
    } catch (err) {
      setError(errorLabel(err instanceof Error ? err.message : "", t("registration.errorGeneric")));
    } finally {
      setLoading(false);
    }
  }

  async function useMyLocation() {
    if (!navigator.geolocation) return;
    setError("");
    setCityLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await resolveCity(position.coords.latitude, position.coords.longitude);
          setCity(res.city);
          setCityQuery(res.city.label);
          setCityResults([]);
        } catch {
          setError(t("registration.errorGeneric"));
        } finally {
          setCityLoading(false);
        }
      },
      () => setCityLoading(false),
      { timeout: 8000 },
    );
  }

  async function handleComplete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!city) {
      setError(t("registration.errorCity"));
      setStep("city");
      return;
    }

    setLoading(true);
    try {
      const result = await completeRegistration({
        track: "student",
        email,
        otp,
        city,
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

  // Logging in IS opening the bot: Telegram already knows who the user is, and a
  // phone-track account has no email to log in with anyway.
  if (mode === "login") {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        href={`https://t.me/${BOT_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Button>
    );
  }

  const fieldLabel = "mb-2.5 block text-left text-xs font-semibold uppercase tracking-wider text-white/40";
  const fieldBox =
    "h-[54px] w-full rounded-2xl border-0 bg-white/[0.04] pl-12 pr-4 text-base text-white placeholder:text-white/20 outline-none focus:outline-none focus:ring-0 focus:bg-white/[0.07] transition-all duration-300";

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => {
          setLanguage(registrationLanguageFromLocale(locale));
          setOpen(true);
        }}
      >
        {children}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-midnight px-4 py-0 md:flex md:items-center md:justify-center md:py-6"
          style={{ scrollbarGutter: "stable" }}
        >
          <div
            className="fixed inset-0 bg-cover bg-center animate-fade-in"
            style={{ backgroundImage: `url('/images/registration-bg.jpg')` }}
          />
          <button
            type="button"
            className="fixed inset-0 bg-midnight/65 backdrop-blur-[8px] cursor-default"
            aria-label={t("registration.close")}
            onClick={() => !loading && setOpen(false)}
          />

          <button
            type="button"
            className="fixed top-5 left-4 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 hover:scale-110 transition-all duration-300 backdrop-blur-md cursor-pointer md:top-8 md:left-8"
            aria-label={t("registration.back")}
            onClick={() => {
              if (loading) return;
              // Step back through the flow before leaving it altogether.
              if (step === "code") setStep("city");
              else if (step === "city") setStep("email");
              else if (step === "email") {
                setTrack(null);
                setStep("start");
              } else setOpen(false);
            }}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center py-20 md:min-h-0 md:py-0">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="registration-title"
              className="w-full max-w-[400px] rounded-[32px] bg-black/60 py-10 px-8 text-center shadow-2xl backdrop-blur-3xl"
            >
              <div>
                <h2
                  id="registration-title"
                  className="text-2xl font-bold tracking-tight text-heading-white md:text-3xl"
                >
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-400 max-w-[280px] mx-auto">
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-1.5" aria-hidden="true">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((item) => (
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
                {step === "start" && (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mt-6 space-y-7"
                  >
                    <div
                      className="relative"
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                          setLanguageOpen(false);
                        }
                      }}
                    >
                      <span className={fieldLabel}>{t("registration.languageLabel")}</span>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-white/60 transition-colors duration-300">
                          <Languages className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <button
                          type="button"
                          className={cn(
                            "flex h-[54px] w-full items-center justify-between rounded-2xl border-0 bg-white/[0.04] pl-12 pr-4 text-left text-base text-white outline-none focus:outline-none focus:ring-0 transition-all duration-300 cursor-pointer",
                            languageOpen ? "bg-white/[0.07]" : "",
                          )}
                          aria-haspopup="listbox"
                          aria-expanded={languageOpen}
                          onClick={() => setLanguageOpen((value) => !value)}
                          onKeyDown={(event) => {
                            if (
                              event.key === "ArrowDown" ||
                              event.key === "Enter" ||
                              event.key === " "
                            ) {
                              event.preventDefault();
                              setLanguageOpen(true);
                            }
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {selectedLanguage && <span>{selectedLanguage.label}</span>}
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
                            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-[240px] overflow-y-auto no-scrollbar rounded-2xl bg-black/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl"
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
                                  <span>{option.label}</span>
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
                        className="mt-1 h-4 w-4 shrink-0 rounded border-0 bg-white/10 text-magenta accent-magenta focus:ring-0 cursor-pointer transition-colors duration-200"
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                      />
                      <span>
                        {t("registration.termsPrefix")}{" "}
                        <a
                          href="/terms"
                          className="text-white underline underline-offset-4 hover:text-magenta transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("registration.terms")}
                        </a>{" "}
                        {t("registration.and")}{" "}
                        <a
                          href="/privacy"
                          className="text-white underline underline-offset-4 hover:text-magenta transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("registration.privacy")}
                        </a>
                      </span>
                    </label>

                    {/* Genuinely optional (GDPR): consent to research use must not
                        be the price of signing up. */}
                    <label className="flex items-start gap-3 text-sm leading-5 text-gray-400 select-none cursor-pointer hover:text-gray-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={researchOptIn}
                        className="mt-1 h-4 w-4 shrink-0 rounded border-0 bg-white/10 text-magenta accent-magenta focus:ring-0 cursor-pointer transition-colors duration-200"
                        onChange={(event) => setResearchOptIn(event.target.checked)}
                      />
                      <span>
                        {t("registration.researchOptIn")}{" "}
                        <span className="text-white/30">{t("registration.optional")}</span>
                      </span>
                    </label>

                    {error && <p className="text-sm text-red-300">{error}</p>}

                    <div className="space-y-3 pt-1">
                      <span className={fieldLabel}>{t("registration.trackTitle")}</span>

                      <button
                        type="button"
                        disabled={loading || !termsAccepted}
                        onClick={() => startTrack("student")}
                        className="flex w-full items-center gap-4 rounded-2xl bg-white/[0.04] p-4 text-left transition-all duration-300 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                      >
                        <GraduationCap className="h-6 w-6 shrink-0 text-magenta" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-white">
                            {t("registration.trackStudent")}
                          </span>
                          <span className="block text-xs leading-5 text-gray-400">
                            {t("registration.trackStudentHint")}
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        disabled={loading || !termsAccepted}
                        onClick={() => startTrack("general")}
                        className="flex w-full items-center gap-4 rounded-2xl bg-white/[0.04] p-4 text-left transition-all duration-300 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                      >
                        {loading && track === "general" ? (
                          <Loader2 className="h-6 w-6 shrink-0 animate-spin text-magenta" aria-hidden="true" />
                        ) : (
                          <Phone className="h-6 w-6 shrink-0 text-magenta" aria-hidden="true" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-white">
                            {t("registration.trackGeneral")}
                          </span>
                          <span className="block text-xs leading-5 text-gray-400">
                            {t("registration.trackGeneralHint")}
                          </span>
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}

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
                      <span className={fieldLabel}>{t("registration.emailLabel")}</span>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-white/60 transition-colors duration-300">
                          <Mail className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          required
                          autoFocus
                          type="email"
                          value={email}
                          autoComplete="email"
                          placeholder="you@university.edu"
                          className={fieldBox}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-300">{error}</p>}

                    <Button type="submit" size="md" className="w-full mt-2" disabled={loading}>
                      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                      {t("registration.sendCode")}
                    </Button>
                  </motion.form>
                )}

                {step === "city" && (
                  <motion.div
                    key="city"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mt-6 space-y-5"
                  >
                    <div>
                      <span className={fieldLabel}>{t("registration.cityLabel")}</span>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-white/60 transition-colors duration-300">
                          <MapPin className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          autoFocus
                          type="text"
                          value={cityQuery}
                          placeholder={t("registration.cityPlaceholder")}
                          className={fieldBox}
                          onChange={(event) => {
                            setCityQuery(event.target.value);
                            setCity(null);
                          }}
                        />
                        {cityLoading && (
                          <div className="absolute inset-y-0 right-4 flex items-center text-white/40">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-left text-xs leading-5 text-gray-500">
                        {t("registration.cityHint")}
                      </p>
                    </div>

                    {cityResults.length > 0 && !city && (
                      <div className="max-h-[200px] overflow-y-auto no-scrollbar rounded-2xl bg-black/60 p-1.5">
                        {cityResults.map((hit) => (
                          <button
                            key={`${hit.homeCityKey}:${hit.homePlaceId ?? hit.label}`}
                            type="button"
                            className="flex h-11 w-full items-center rounded-xl px-3 text-left text-sm text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white cursor-pointer"
                            onClick={() => {
                              setCity(hit);
                              setCityQuery(hit.label);
                              setCityResults([]);
                            }}
                          >
                            {hit.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {city && (
                      <div className="flex items-center gap-2 rounded-2xl bg-magenta/[0.06] px-4 py-3 text-left text-sm text-white">
                        <Check className="h-4 w-4 shrink-0 text-magenta" aria-hidden="true" />
                        <span className="truncate">{city.label}</span>
                      </div>
                    )}

                    <button
                      type="button"
                      className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
                      onClick={useMyLocation}
                    >
                      {t("registration.cityUseLocation")}
                    </button>

                    {error && <p className="text-sm text-red-300">{error}</p>}

                    <Button
                      type="button"
                      size="md"
                      className="w-full"
                      disabled={!city}
                      onClick={() => {
                        setError("");
                        setStep("code");
                      }}
                    >
                      {t("registration.continue")}
                    </Button>
                  </motion.div>
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
                    <div className="rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-gray-400 leading-relaxed">
                      {t("registration.codeSent")}{" "}
                      <span className="text-white font-medium">{email}</span>
                    </div>
                    <div>
                      <span className={fieldLabel}>{t("registration.codeLabel")}</span>
                      <div className="relative">
                        <input
                          required
                          autoFocus
                          inputMode="numeric"
                          pattern="[0-9]{4,8}"
                          value={otp}
                          autoComplete="one-time-code"
                          placeholder="123456"
                          className="h-[54px] w-full rounded-2xl border-0 bg-white/[0.04] px-4 text-center text-xl font-mono tracking-[0.24em] text-white placeholder:text-white/10 outline-none focus:outline-none focus:ring-0 focus:bg-white/[0.07] transition-all duration-300"
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
                    <div className="rounded-2xl bg-magenta/[0.05] px-4 py-5 text-center">
                      <CheckCircle2
                        className="mx-auto h-10 w-10 text-magenta filter drop-shadow-neon-sm"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-base font-semibold text-white">
                        {track === "general"
                          ? t("registration.readyTitleGeneral")
                          : t("registration.readyTitle")}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {track === "general"
                          ? t("registration.readyDescriptionGeneral")
                          : t("registration.readyDescription")}
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
