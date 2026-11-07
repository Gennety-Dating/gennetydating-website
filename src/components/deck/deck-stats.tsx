"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { OWNER_FLAG } from "@/lib/deck-tracker";
import styles from "./deck-stats.module.css";

const TOKEN_KEY = "gn_deck_stats_token";

type Session = {
  id: string;
  ref: string | null;
  label: string | null;
  started_at: number;
  last_at: number;
  country: string | null;
  city: string | null;
  device: string | null;
  os: string | null;
  browser: string | null;
  lang: string | null;
  referrer: string | null;
  active_ms: number;
  max_scroll: number;
  video_ms: number;
  video_max: number;
  clicks: number;
  visitor: string | null;
  client_start: number | null;
};
type Dwell = { kind: string; key: string; ms: number; sessions: number };
type Action = { type: string; target: string | null; n: number; sessions: number };
type Link = { slug: string; label: string; created_at: number };
type StatsData = {
  days: number;
  slides: string[];
  sessions: Session[];
  dwell: Dwell[];
  actions: Action[];
  slideReach: { key: string; sessions: number }[];
  links: Link[];
};
type Detail = {
  session: Session;
  dwell: { kind: string; key: string; ms: number }[];
  events: { at: number; type: string; target: string | null; value: number | null }[];
};

const SECTION_NAMES: Record<string, string> = {
  hero: "Шапка",
  video: "Ролик",
  deck: "Презентация",
  screens: "Экраны приложения",
  round: "Раунд",
  market: "Конкуренты",
  contact: "Контакты",
};

const EVENT_NAMES: Record<string, string> = {
  click: "Нажатие",
  download: "Скачал PDF",
  fullscreen: "Презентация на весь экран",
  fullscreen_exit: "Вышел из полноэкранного",
  copy_email: "Скопировал почту",
  video_play: "Запустил ролик",
  video_pause: "Пауза ролика",
  video_seek: "Перемотал ролик",
  video_end: "Досмотрел ролик",
  video_progress: "Ролик пройден на",
  video_fullscreen: "Ролик на весь экран",
  slide_nav: "Слайд",
};

const SITE = "https://www.gennety.com";

function fmtDuration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} с`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} мин ${String(s % 60).padStart(2, "0")} с`;
  return `${Math.floor(m / 60)} ч ${m % 60} мин`;
}

function fmtDate(ms: number) {
  return new Date(ms).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function api<T>(token: string, path: string, init?: RequestInit & { query?: Record<string, string> }): Promise<T> {
  const query = new URLSearchParams({ p: path, ...(init?.query ?? {}) });
  const response = await fetch(`/api/deck/admin?${query}`, {
    ...init,
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    cache: "no-store",
  });
  if (response.status === 401) throw new Error("unauthorized");
  if (!response.ok) throw new Error(`Сервис статистики ответил ${response.status}`);
  return response.json() as Promise<T>;
}

/** Single-series horizontal bars with a hover tooltip on every bar. */
function Bars({ rows, format, label }: { rows: { name: string; value: number; note?: string }[]; format: (v: number) => string; label: string }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <ol className={styles.bars} aria-label={label}>
      {rows.map((row) => (
        <li key={row.name} className={styles.barRow}>
          <span className={styles.barName}>{row.name}</span>
          <span className={styles.barTrack}>
            <span className={styles.bar} style={{ width: `${(row.value / max) * 100}%` }} />
            <span className={styles.tip} role="tooltip">
              {row.name}: {format(row.value)}{row.note ? ` · ${row.note}` : ""}
            </span>
          </span>
          <span className={styles.barValue}>{format(row.value)}</span>
        </li>
      ))}
    </ol>
  );
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function DeckStats() {
  const [token, setToken] = useState<string | null>(() => readStorage(TOKEN_KEY));
  const [draft, setDraft] = useState("");
  const [days, setDays] = useState(30);
  const [data, setData] = useState<StatsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(() => window.location.hash.slice(1) || null);
  const [detailData, setDetailData] = useState<Detail | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [created, setCreated] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [owner, setOwner] = useState(() => readStorage(OWNER_FLAG) === "1");

  const requestKey = `${days}|${reloadKey}`;
  const loading = token !== null && loadedKey !== requestKey;
  const load = useCallback(() => setReloadKey((key) => key + 1), []);
  const detail = detailData && detailData.session.id === openId ? detailData : null;

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const key = `${days}|${reloadKey}`;
    api<StatsData>(token, "stats", { query: { days: String(days) } })
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
        setLoadedKey(key);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setLoadedKey(key);
        if (e.message === "unauthorized") {
          setError("Токен не подошёл. Введите его заново.");
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        } else {
          setError(e.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token, days, reloadKey]);

  useEffect(() => {
    if (!token || !openId) return;
    let cancelled = false;
    api<Detail>(token, "session", { query: { id: openId } })
      .then((result) => {
        if (!cancelled) setDetailData(result);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [token, openId]);

  const saveToken = (event: React.FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    localStorage.setItem(TOKEN_KEY, value);
    localStorage.setItem(OWNER_FLAG, "1");
    setOwner(true);
    setToken(value);
    setDraft("");
  };

  const toggleOwner = () => {
    const next = !owner;
    if (next) localStorage.setItem(OWNER_FLAG, "1");
    else localStorage.removeItem(OWNER_FLAG);
    setOwner(next);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  const createLink = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token || !newLabel.trim()) return;
    try {
      const result = await api<{ url: string }>(token, "links", { method: "POST", body: JSON.stringify({ label: newLabel.trim() }) });
      setCreated(result.url);
      setNewLabel("");
      void copy(result.url);
      void load();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const deleteSession = async (id: string) => {
    if (!token) return;
    await api(token, "session", { method: "DELETE", query: { id } });
    setOpenId(null);
    void load();
  };

  const summary = useMemo(() => {
    if (!data) return null;
    const visits = data.sessions.filter((s) => s.active_ms >= 3_000);
    const lastSlide = String(data.slides.length);
    const reachLast = data.slideReach.find((r) => r.key === lastSlide)?.sessions ?? 0;
    return {
      total: data.sessions.length,
      engaged: visits.length,
      named: new Set(data.sessions.map((s) => s.ref).filter(Boolean)).size,
      median: median(visits.map((s) => s.active_ms)),
      video: visits.filter((s) => s.video_max >= 75).length,
      reachLast,
      engagedCount: Math.max(1, visits.length),
    };
  }, [data]);

  const slideRows = useMemo(() => {
    if (!data) return { time: [], reach: [] };
    const reach = new Map(data.slideReach.map((r) => [r.key, r.sessions]));
    const visits = Math.max(1, data.sessions.filter((s) => s.active_ms >= 3_000).length);
    return {
      time: data.slides.map((title, i) => {
        const row = data.dwell.find((d) => d.kind === "slide" && d.key === String(i + 1));
        const seen = reach.get(String(i + 1)) ?? 0;
        return { name: `${i + 1}. ${title}`, value: row && seen ? row.ms / seen : 0, note: `видели ${seen}` };
      }),
      reach: data.slides.map((title, i) => ({
        name: `${i + 1}. ${title}`,
        value: ((reach.get(String(i + 1)) ?? 0) / visits) * 100,
        note: `${reach.get(String(i + 1)) ?? 0} из ${visits}`,
      })),
    };
  }, [data]);

  const sectionRows = useMemo(() => {
    if (!data) return [];
    return Object.keys(SECTION_NAMES).map((key) => {
      const row = data.dwell.find((d) => d.kind === "section" && d.key === key);
      return { name: SECTION_NAMES[key], value: row ? row.ms / Math.max(1, row.sessions) : 0, note: row ? `в ${row.sessions} визитах` : "" };
    });
  }, [data]);

  const linkStats = useMemo(() => {
    if (!data) return [];
    return data.links.map((link) => {
      const own = data.sessions.filter((s) => s.ref === link.slug);
      return {
        ...link,
        visits: own.length,
        last: own[0]?.started_at ?? null,
        time: own.reduce((sum, s) => sum + s.active_ms, 0),
      };
    });
  }, [data]);

  if (!token) {
    return (
      <main className={styles.page}>
        <form className={styles.login} onSubmit={saveToken}>
          <h1>Статистика питч-страницы</h1>
          <p>Введите токен доступа. Он сохранится только в этом браузере, а ваши собственные заходы на /deck перестанут считаться.</p>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="password"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Токен"
            autoComplete="off"
            aria-label="Токен доступа"
          />
          <button type="submit">Открыть статистику</button>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <div>
          <h1>Питч-страница</h1>
          <p>
            <a href="/deck" target="_blank" rel="noreferrer">gennety.com/deck</a>
            {loading && " · обновляю…"}
          </p>
        </div>
        <div className={styles.headControls}>
          <label>
            Период
            <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
              <option value={7}>7 дней</option>
              <option value={30}>30 дней</option>
              <option value={90}>90 дней</option>
              <option value={365}>год</option>
            </select>
          </label>
          <button type="button" onClick={() => void load()}>Обновить</button>
        </div>
      </header>

      {error && <p className={styles.error}>{error}</p>}

      {summary && (
        <section className={styles.tiles} aria-label="Итоги">
          <div><strong>{summary.total}</strong><span>визитов{summary.engaged !== summary.total ? `, из них ${summary.engaged} дольше 3 с` : ""}</span></div>
          <div><strong>{summary.named}</strong><span>именных ссылок открыто</span></div>
          <div><strong>{fmtDuration(summary.median)}</strong><span>медиана времени на странице</span></div>
          <div><strong>{Math.round((summary.video / summary.engagedCount) * 100)}%</strong><span>досмотрели ролик до 75 %</span></div>
          <div><strong>{Math.round((summary.reachLast / summary.engagedCount) * 100)}%</strong><span>дошли до последнего слайда</span></div>
        </section>
      )}

      <section className={styles.card}>
        <h2>Ссылки для инвесторов</h2>
        <p className={styles.hint}>У каждого инвестора своя ссылка: так видно, кто открыл, сколько смотрел и что нажимал. В боте Gennety WORKSPACE придёт уведомление, когда ссылку откроют, и итог визита.</p>
        <form className={styles.inline} onSubmit={createLink}>
          <input value={newLabel} onChange={(event) => setNewLabel(event.target.value)} placeholder="Имя или фонд, например Sequoia — Jane" aria-label="Кому ссылка" />
          <button type="submit">Создать ссылку</button>
        </form>
        {created && (
          <p className={styles.created}>
            {created} <button type="button" onClick={() => void copy(created)}>{copied === created ? "Скопировано" : "Копировать"}</button>
          </p>
        )}
        {linkStats.length > 0 && (
          <table className={styles.table}>
            <thead><tr><th>Кому</th><th>Ссылка</th><th>Визиты</th><th>Время</th><th>Последний</th></tr></thead>
            <tbody>
              {linkStats.map((link) => {
                const url = `${SITE}/deck?r=${link.slug}`;
                return (
                  <tr key={link.slug}>
                    <td>{link.label}</td>
                    <td><button type="button" className={styles.linkCopy} onClick={() => void copy(url)}>{copied === url ? "Скопировано" : `?r=${link.slug}`}</button></td>
                    <td>{link.visits}</td>
                    <td>{link.time ? fmtDuration(link.time) : "—"}</td>
                    <td>{link.last ? fmtDate(link.last) : "не открывали"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      {data && (
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>Время на слайде</h2>
            <p className={styles.hint}>В среднем на один визит, который этот слайд видел.</p>
            <Bars rows={slideRows.time} format={fmtDuration} label="Среднее время на каждом слайде" />
          </section>
          <section className={styles.card}>
            <h2>Сколько визитов дошли до слайда</h2>
            <p className={styles.hint}>Доля визитов, где слайд был на экране хотя бы 1,5 с.</p>
            <Bars rows={slideRows.reach} format={(v) => `${Math.round(v)}%`} label="Доля визитов, видевших слайд" />
          </section>
          <section className={styles.card}>
            <h2>Время по разделам</h2>
            <p className={styles.hint}>В среднем на визит, который до раздела дошёл.</p>
            <Bars rows={sectionRows} format={fmtDuration} label="Среднее время по разделам страницы" />
          </section>
          <section className={styles.card}>
            <h2>Нажатия и действия</h2>
            {data.actions.length === 0 ? (
              <p className={styles.hint}>Пока никто ничего не нажимал.</p>
            ) : (
              <table className={styles.table}>
                <thead><tr><th>Что</th><th>Раз</th><th>Визитов</th></tr></thead>
                <tbody>
                  {data.actions.map((action) => (
                    <tr key={`${action.type}:${action.target}`}>
                      <td>{EVENT_NAMES[action.type] ?? action.type}{action.target ? ` · ${action.target}` : ""}</td>
                      <td>{action.n}</td>
                      <td>{action.sessions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      )}

      {data && (
        <section className={styles.card}>
          <h2>Визиты</h2>
          {data.sessions.length === 0 ? (
            <p className={styles.hint}>Визитов за этот период нет. Отправьте инвестору ссылку — первый заход появится здесь через несколько секунд.</p>
          ) : (
            <table className={`${styles.table} ${styles.visits}`}>
              <thead>
                <tr><th>Когда</th><th>Кто</th><th>Откуда</th><th>Устройство</th><th>На странице</th><th>Ролик</th><th>Прокрутка</th><th>Нажатий</th></tr>
              </thead>
              <tbody>
                {data.sessions.map((session) => (
                  <tr
                    key={session.id}
                    className={openId === session.id ? styles.selected : undefined}
                    onClick={() => {
                      setOpenId(session.id);
                      history.replaceState(null, "", `#${session.id}`);
                    }}
                  >
                    <td>{fmtDate(session.started_at)}</td>
                    <td>{session.label ?? session.ref ?? "—"}</td>
                    <td>{[session.city, session.country].filter(Boolean).join(", ") || "—"}</td>
                    <td>{session.device ?? "—"} · {session.os}</td>
                    <td>{fmtDuration(session.active_ms)}</td>
                    <td>{session.video_ms ? `${fmtDuration(session.video_ms)} · ${session.video_max}%` : "—"}</td>
                    <td>{session.max_scroll}%</td>
                    <td>{session.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {detail && (
        <section className={styles.card} aria-label="Подробности визита">
          <div className={styles.detailHead}>
            <h2>{detail.session.label ?? detail.session.ref ?? "Визит без метки"} · {fmtDate(detail.session.started_at)}</h2>
            <button type="button" className={styles.danger} onClick={() => void deleteSession(detail.session.id)}>Удалить визит</button>
          </div>
          <p className={styles.hint}>
            {[detail.session.city, detail.session.country].filter(Boolean).join(", ") || "Место неизвестно"} · {detail.session.device} · {detail.session.os} · {detail.session.browser}
            {detail.session.lang ? ` · ${detail.session.lang}` : ""}{detail.session.referrer ? ` · пришёл с ${detail.session.referrer}` : ""}
            {detail.session.visitor ? " · браузер узнаваем между визитами" : ""}
          </p>
          <div className={styles.grid}>
            <div>
              <h3>Слайды</h3>
              <Bars
                rows={(data?.slides ?? []).map((title, i) => ({
                  name: `${i + 1}. ${title}`,
                  value: detail.dwell.find((d) => d.kind === "slide" && d.key === String(i + 1))?.ms ?? 0,
                }))}
                format={fmtDuration}
                label="Время на каждом слайде в этом визите"
              />
              <h3>Разделы</h3>
              <Bars
                rows={Object.keys(SECTION_NAMES).map((key) => ({
                  name: SECTION_NAMES[key],
                  value: detail.dwell.find((d) => d.kind === "section" && d.key === key)?.ms ?? 0,
                }))}
                format={fmtDuration}
                label="Время по разделам в этом визите"
              />
            </div>
            <div>
              <h3>Хронология</h3>
              <ol className={styles.timeline}>
                {detail.events.length === 0 && <li>Только просмотр, без нажатий.</li>}
                {detail.events.map((event, i) => (
                  <li key={i}>
                    <time>{fmtDuration(Math.max(0, event.at - (detail.session.client_start ?? detail.events[0]?.at ?? event.at)))}</time>
                    <span>
                      {EVENT_NAMES[event.type] ?? event.type}
                      {event.type === "slide_nav" && event.value ? ` ${event.value} (${event.target})` : ""}
                      {event.type === "video_progress" ? ` ${event.target}` : ""}
                      {event.type !== "slide_nav" && event.type !== "video_progress" && event.target ? ` · ${event.target}` : ""}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <footer className={styles.foot}>
        <label>
          <input type="checkbox" checked={owner} onChange={toggleOwner} /> Не считать мои заходы на /deck в этом браузере
        </label>
        <button type="button" onClick={() => { localStorage.removeItem(TOKEN_KEY); setToken(null); setData(null); }}>Выйти</button>
      </footer>
    </main>
  );
}
