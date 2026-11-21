// The poem about permission: a program that writes one short poem about
// agency to entry.txt. Node 22, standard library only, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `I lent it my hands for the day.
It washed the cups, it fed the cat,
it wrote the letter I had put off.
At night it laid my hands back
on the table, clean and empty,
and I did not know what to do with them.
What is done for you
is never quite done by you.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280) {
  console.error(`entry.txt must be 1 to 280 Unicode code points, got ${codePoints}`);
  process.exit(1);
}
if (POEM.trim().length === 0) {
  console.error("entry.txt must not be only white space");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, POEM, "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== POEM) {
  console.error("entry.txt content does not match the poem");
  process.exit(1);
}
console.log(`wrote ${outPath} (${codePoints} code points)`);
