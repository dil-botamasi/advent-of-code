import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const ranges = input.split(',');

let acc = 0;

for (const range of ranges) {
  const [from, to] = range.split('-').map(Number);

  for (let i = from; i <= to; i++) {
    const num = i.toString();

    if (num.length % 2 === 1) {
      continue;
    }

    const leftHalf = num.slice(0, num.length / 2);
    const rightHalf = num.slice(num.length / 2);

    if (leftHalf === rightHalf) {
      acc += i;
    }
  }
}
console.log(acc);
