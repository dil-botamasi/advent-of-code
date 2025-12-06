import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

const nums = lines.slice(0, -1).map((line) =>
  line
    .split(' ')
    .filter((s) => s !== '')
    .map(Number)
);

const op = lines
  .slice(-1)[0]
  .split(' ')
  .filter((s) => s !== '');

let solution = 0;
for (let i = 0; i < op.length; i++) {
  let acc = 0;

  if (op[i] === '*') {
    acc = 1;
  }
  for (let j = 0; j < nums.length; j++) {
    if (op[i] === '*') {
      acc *= nums[j][i];
    } else {
      acc += nums[j][i];
    }
  }
  solution += acc;
}

console.log(solution);
