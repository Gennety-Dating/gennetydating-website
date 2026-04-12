"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { UserRow } from "@/types/admin";

interface UsersTableProps {
  users: UserRow[];
  total: number;
  limit: number;
  offset: number;
  loading: boolean;
  onSelect: (id: string) => void;
  onPageChange: (offset: number) => void;
}

const STATUS_BADGE: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  onboarding: "bg-amber-500/20 text-amber-400",
  paused: "bg-white/10 text-white/40",
};

const STEP_BADGE: Record<string, string> = {
  completed: "bg-emerald-500/20 text-emerald-400",
  conversational: "bg-sky-500/20 text-sky-400",
  language: "bg-amber-500/20 text-amber-400",
  consent: "bg-white/10 text-white/40",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function UsersTable({
  users,
  total,
  limit,
  offset,
  loading,
  onSelect,
  onPageChange,
}: UsersTableProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrev = offset > 0;
  const hasNext = offset + limit < total;

  return (
    <div className="flex flex-col gap-4">
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                Gender
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                Preference
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                Onboarding
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                Registered
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-white/40">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
                    Loading users…
                  </div>
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-white/30 italic">
                  No users found.
                </td>
              </tr>
            )}

            {!loading &&
              users.map((user, i) => {
                const name =
                  [user.firstName, user.surname].filter(Boolean).join(" ") ||
                  `tg:${user.telegramId}`;
                const isLast = i === users.length - 1;
                return (
                  <tr
                    key={user.id}
                    onClick={() => onSelect(user.id)}
                    className={`cursor-pointer transition-colors hover:bg-fuchsia-500/5 ${
                      !isLast ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/15 text-xs font-semibold text-fuchsia-400">
                          {(user.firstName?.[0] ?? "?").toUpperCase()}
                        </div>
                        <span className="font-medium text-white">{name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 capitalize text-white/70">
                      {user.gender ?? <span className="text-white/25">—</span>}
                    </td>
                    <td className="px-4 py-3.5 capitalize text-white/70">
                      {user.preference ?? <span className="text-white/25">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[user.status] ?? "bg-white/10 text-white/40"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STEP_BADGE[user.onboardingStep] ?? "bg-white/10 text-white/40"}`}
                      >
                        {user.onboardingStep}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-white/50">{formatDate(user.createdAt)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-white/40">
        <p>
          {total > 0
            ? `${offset + 1}–${Math.min(offset + limit, total)} of ${total} users`
            : "0 users"}
        </p>
        <div className="flex items-center gap-1">
          <button
            disabled={!hasPrev}
            onClick={() => onPageChange(offset - limit)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-2 text-white/60">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={!hasNext}
            onClick={() => onPageChange(offset + limit)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
