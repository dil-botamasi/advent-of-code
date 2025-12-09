import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

const points = lines.map((l) => l.split(',').map(Number));

let max = 0;
for (let i = 0; i < points.length; i++) {
  const a = points[i];

  for (let j = i + 1; j < points.length; j++) {
    const b = points[j];
    const x = area(a, b);

    if (x > max) {
      max = x;
    }
  }
}

console.log(max);

function area(a: number[], b: number[]): number {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}
