"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import type { UserDetail } from "@/types/admin";
import { LlmDumpBlock } from "./LlmDumpBlock";
import { ChatHistoryFeed } from "./ChatHistoryFeed";

interface UserProfileDrawerProps {
  userId: string | null;
  onClose: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  onboarding: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  paused: "bg-white/10 text-white/50 border-white/20",
};

const STEP_LABELS: Record<string, string> = {
  consent: "Consent",
  language: "Language",
  conversational: "Onboarding Chat",
  completed: "Completed",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
      {children}
    </h3>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">{label}</p>
      <p className="mt-0.5 text-sm text-white/80">{value ?? <span className="text-white/25 italic">—</span>}</p>
    </div>
  );
}

export function UserProfileDrawer({ userId, onClose }: UserProfileDrawerProps) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOpen = userId !== null;

  const fetchUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const res = await fetch(`/api/admin/users/${id}`);
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as UserDetail;
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) fetchUser(userId);
  }, [userId, fetchUser]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const displayName =
    user ? [user.firstName, user.surname].filter(Boolean).join(" ") || `User ${user.telegramId}` : "";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[520px] flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-500/20 text-base font-bold text-fuchsia-400">
                {(user.firstName?.[0] ?? "?").toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">{displayName}</p>
                <p className="text-xs text-white/40">tg:{user.telegramId}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/40">User Profile</p>
          )}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex h-40 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {user && (
            <div className="space-y-8">
              {/* Status badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[user.status] ?? "bg-white/10 text-white/50"}`}
                >
                  {user.status}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50">
                  {STEP_LABELS[user.onboardingStep] ?? user.onboardingStep}
                </span>
                {user.language && (
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs uppercase text-white/50">
                    {user.language}
                  </span>
                )}
              </div>

              {/* Demographics */}
              <div>
                <SectionTitle>Demographics</SectionTitle>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Age" value={user.age} />
                  <Field label="Gender" value={user.gender} />
                  <Field label="Preference" value={user.preference} />
                  <Field label="Major" value={user.major} />
                  <Field label="University" value={user.universityDomain} />
                  <Field label="Email" value={user.email} />
                  {user.profile && (
                    <>
                      <Field
                        label="Height"
                        value={user.profile.height ? `${user.profile.height} cm` : null}
                      />
                      <Field
                        label="Age range sought"
                        value={
                          user.profile.ageRangeMin != null && user.profile.ageRangeMax != null
                            ? `${user.profile.ageRangeMin}–${user.profile.ageRangeMax}`
                            : null
                        }
                      />
                    </>
                  )}
                  <Field
                    label="Registered"
                    value={new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  />
                </div>

                {user.profile && user.profile.hobbies.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
                      Hobbies
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {user.profile.hobbies.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Analysis */}
              <div>
                <SectionTitle>AI Analysis</SectionTitle>
                {user.profile ? (
                  <LlmDumpBlock
                    psychologicalSummary={user.profile.psychologicalSummary}
                    negativeConstraints={user.profile.negativeConstraints}
                    partnerPreferences={user.profile.partnerPreferences}
                  />
                ) : (
                  <p className="text-sm text-white/30 italic">No profile data.</p>
                )}
              </div>

              {/* Chat History */}
              <div>
                <SectionTitle>
                  Conversation History ({user.messageHistory.filter((m) => m.role !== "system").length} messages)
                </SectionTitle>
                <div className="max-h-[400px] overflow-y-auto rounded-lg border border-white/10 bg-black/30 p-4">
                  <ChatHistoryFeed messages={user.messageHistory} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
