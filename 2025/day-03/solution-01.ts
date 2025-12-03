import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const banks = input.split('\n');

let acc = 0;
for (const bank of banks) {
  let max = 0;

  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const joltage = Number(bank[i] + bank[j]);

      if (joltage > max) {
        max = joltage;
      }
    }
  }
  acc += max;
  console.log(bank, max);
}
console.log(acc);
