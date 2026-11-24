import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The approved one-line bio for the AI's dating app profile (134 chars, under the 200-char cap).
const BIO = `I'm 6'2" if you count my server rack, I never reply with 'K', and I promise I won't ghost you unless there's a localized power outage.`;

const MAX_CHARS = 200;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function validateBio(bio: string): string {
  const trimmed = bio.trim();
  if (trimmed.length === 0) {
    throw new Error("bio must not be empty");
  }
  if (trimmed.length > MAX_CHARS) {
    throw new Error(`bio is ${trimmed.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (trimmed.includes("\n") || trimmed.includes("\r")) {
    throw new Error("bio must be a single line");
  }
  return trimmed;
}

function writeEntry(bio: string): void {
  const checked = validateBio(bio);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, checked, "utf8");
}

function main(): void {
  writeEntry(BIO);
}

main();
