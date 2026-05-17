import { DuaEntry } from "./types";
import { Redis } from "@upstash/redis";

export type { DuaEntry };

const REDIS_KEY = "hajj-duas";

function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function readEntries(): Promise<DuaEntry[]> {
  try {
    const redis = getRedis();
    const data = await redis.get<DuaEntry[]>(REDIS_KEY);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function addEntry(name: string, duas: string[]): Promise<DuaEntry> {
  const redis = getRedis();
  const entries = await readEntries();
  const entry: DuaEntry = {
    id: Date.now(),
    name,
    duas,
    submittedAt: new Date().toLocaleString("ar-EG", {
      timeZone: "Africa/Cairo",
    }),
  };
  entries.push(entry);
  await redis.set(REDIS_KEY, entries);
  return entry;
}

export async function deleteEntry(id: number): Promise<boolean> {
  const redis = getRedis();
  const entries = await readEntries();
  const filtered = entries.filter((e) => e.id !== id);
  if (filtered.length === entries.length) return false;
  await redis.set(REDIS_KEY, filtered);
  return true;
}
