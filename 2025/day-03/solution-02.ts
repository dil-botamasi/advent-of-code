import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const banks = input.split('\n');

const size = 12;
let acc = 0;
for (const bank of banks) {
  let max = '';
  let start = 0;
  const batteries = bank
    .split('')
    .map((j, i) => ({ joltage: Number(j), pos: i }));

  for (let digit = 0; digit < size; digit++) {
    const nextBattery = batteries
      .slice(start, batteries.length - (size - digit - 1))
      .sort((a, b) => b.joltage - a.joltage)[0];

    max += nextBattery.joltage;
    start = 1 + nextBattery.pos;
  }

  acc += Number(max);
  console.log(bank, max);
}
console.log(acc);
