import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const ranges = input.split(',');

let acc = 0;

for (const range of ranges) {
  const [from, to] = range.split('-').map(Number);

  console.log('--------');
  console.log(from, '-', to);

  for (let i = from; i <= to; i++) {
    const num = i.toString();

    for (let chunkSize = 1; chunkSize <= num.length / 2; chunkSize++) {
      const chunks: string[] = [];

      for (let i = 0; i < num.length; i += chunkSize) {
        chunks.push(num.slice(i, i + chunkSize));
      }

      if (new Set(chunks).size === 1) {
        acc += i;
        console.log(i);
        break;
      }
    }
  }
}
console.log('--------');
console.log(acc);

