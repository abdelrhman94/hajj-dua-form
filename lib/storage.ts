import fs from "fs";
import path from "path";
import { DuaEntry } from "./types";

export type { DuaEntry };

const DATA_PATH = path.join(process.cwd(), "data", "duas.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]", "utf-8");
  }
}

export function readEntries(): DuaEntry[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addEntry(name: string, duas: string[]): DuaEntry {
  const entries = readEntries();
  const entry: DuaEntry = {
    id: Date.now(),
    name,
    duas,
    submittedAt: new Date().toLocaleString("ar-EG", {
      timeZone: "Africa/Cairo",
    }),
  };
  entries.push(entry);
  fs.writeFileSync(DATA_PATH, JSON.stringify(entries, null, 2), "utf-8");
  return entry;
}
