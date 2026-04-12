"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import type { UserRow, UsersListResponse } from "@/types/admin";
import { UsersTable } from "@/components/admin/UsersTable";
import { UserProfileDrawer } from "@/components/admin/UserProfileDrawer";

const PAGE_SIZE = 20;

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchUsers = useCallback(async (off: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users?limit=${PAGE_SIZE}&offset=${off}`);
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as UsersListResponse;
      setUsers(data.data);
      setTotal(data.total);
      setOffset(off);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers(0);
  }, [fetchUsers]);

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-10 text-white md:px-10 lg:px-16">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15">
            <Users size={20} className="text-fuchsia-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">User Profiles</h1>
            <p className="text-sm text-white/40">
              {loading ? "Loading…" : `${total} registered users`}
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
        >
          ← Landing page
        </Link>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
          <span className="font-medium">Error:</span> {error}
          <button
            onClick={() => void fetchUsers(offset)}
            className="ml-auto rounded-lg border border-red-500/30 px-3 py-1 text-xs transition-colors hover:bg-red-500/10"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <UsersTable
        users={users}
        total={total}
        limit={PAGE_SIZE}
        offset={offset}
        loading={loading}
        onSelect={setSelectedId}
        onPageChange={(off) => void fetchUsers(off)}
      />

      {/* Drawer */}
      <UserProfileDrawer
        userId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
