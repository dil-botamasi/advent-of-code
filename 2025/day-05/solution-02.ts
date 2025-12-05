import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const [rawRanges, rawIds] = input.split('\n\n');

const ranges = rawRanges
  .split('\n')
  .map((r) => r.split('-').map(Number))
  .map((r) => ({ min: r[0], max: r[1] }))
  .sort((a, b) => a.min - b.min);

// |--|
//   |---|
// |-----|

// |----|
//  |--|
// |----|

for (let i = 1; i < ranges.length; i++) {
  const prevRange = ranges[i - 1];
  const range = ranges[i];

  if (prevRange.max >= range.min) {
    range.min = prevRange.min;
    range.max = Math.max(prevRange.max, range.max);
    prevRange.max = prevRange.min = 0;
  }
}

let fresh = 0;

for (const range of ranges) {
  if (range.min === 0 && range.max === 0) {
    continue;
  }
  fresh += range.max - range.min + 1;
}

console.log(fresh);
