import { Pool, type QueryResultRow } from "pg";

const globalForPg = globalThis as typeof globalThis & {
  gennetyPgPool?: Pool;
};

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL");
  }
  return databaseUrl;
}

export function getPgPool(): Pool {
  if (!globalForPg.gennetyPgPool) {
    globalForPg.gennetyPgPool = new Pool({
      connectionString: getDatabaseUrl(),
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      allowExitOnIdle: true,
    });
  }

  return globalForPg.gennetyPgPool;
}

export function pgQuery<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values?: unknown[],
) {
  return getPgPool().query<T>(text, values);
}
