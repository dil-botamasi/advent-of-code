import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const rotations = input.split('\n');

let dial = 50;
let code = 0;

for (const rotation of rotations) {
  const direction = rotation[0] === 'R' ? 1 : -1;
  const amount = Number(rotation.slice(1));

  const wasAt0 = dial === 0;

  dial = dial + direction * amount;

  if (dial < 1 && !wasAt0) {
    code++;
  }
  code += Math.abs(Math.trunc(dial / 100));

  dial = dial % 100;

  if (dial < 0) {
    dial = 100 + dial;
  }
}

console.log(code);
