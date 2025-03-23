import { readDB, writeDB } from '$lib/server/db';
import { logs, type NewLog } from '$lib/server/db/schema/logs';
import { desc, eq, asc } from 'drizzle-orm';

export const insertLog = async (entry: NewLog) => {
  return writeDB.insert(logs).values(entry);
}

export const getRecentLogs = async (limit = 20) => {
  return readDB.select().from(logs).orderBy(desc(logs.insertedAt)).limit(limit);
}

export const getLogById = async (id: string) => {
  return readDB.select().from(logs).where(eq(logs.id, id));
};

export const getLogsByUserId = async (userId: string, limit = 20, sort = 'desc') => {
  return readDB.select().from(logs).where(eq(logs.dbUser, userId)).orderBy(sort === 'desc' ? desc(logs.insertedAt) : asc(logs.insertedAt)).limit(limit);
};
