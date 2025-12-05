import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const [rawRanges, rawIds] = input.split('\n\n');

const ranges = rawRanges.split('\n').map((r) => r.split('-').map(Number));
const ids = rawIds.split('\n');

let fresh = 0;

for (const id of ids) {
  for (const range of ranges) {
    if (range[0] <= Number(id) && Number(id) <= range[1]) {
      fresh++;
      break;
    }
  }
}

console.log(fresh);
