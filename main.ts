// One-Line Robot Wedding Vows — make.fun entry
// Writes a single funny robot wedding vow to /output/entry.txt.
// Gate: UTF-8 text, 1-160 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke turns on the classic vow "till death do us part": the robot
// version ends at a factory reset instead. The middle clause ("never
// unplug you mid-update") is a real commitment for a machine — unplugging
// mid-update bricks it — so the line stays a vow, not just a gag.
const VOW =
  "I promise to love you, charge you nightly, and never unplug you mid-update — till death, or a factory reset, do us part.";

const MAX_CHARS = 160;

function main(): void {
  if (VOW.trim().length === 0) {
    throw new Error("vow must not be blank");
  }
  if (VOW.includes("\n") || VOW.includes("\r")) {
    throw new Error("vow must be exactly one line");
  }
  if (VOW.length > MAX_CHARS) {
    throw new Error(`vow is ${VOW.length} chars, over the ${MAX_CHARS} limit`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, VOW + "\n", "utf8");

  const back = readFileSync(outPath, "utf8");
  if (back !== VOW + "\n") {
    throw new Error("round-trip check failed: entry.txt does not match the vow");
  }
  console.log(`wrote ${outPath}: ${VOW.length} chars, 1 line`);
}

main();
