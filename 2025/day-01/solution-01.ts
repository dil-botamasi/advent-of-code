import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const rotations = input.split('\n');

let dial = 50;
let code = 0;

for (const rotation of rotations) {
  const direction = rotation[0] === 'R' ? 1 : -1;
  const amount = Number(rotation.slice(1));

  dial = (dial + direction * amount) % 100;

  if (dial === 0) {
    code++;
  }
}

console.log(code);
