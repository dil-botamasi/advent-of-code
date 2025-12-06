import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');
const ops = lines
  .slice(-1)[0]
  .split(' ')
  .filter((s) => s !== '');
const finalSum = transpose(lines.slice(0, -1).map((line) => line.split('')))
  .map((n) => Number(n.join('')))
  .join()
  .split(',0,')
  .map((x) => x.split(','))
  .map((vals, i) =>
    ops[i] === '+'
      ? vals.reduce((acc, val) => acc + Number(val), 0)
      : vals.reduce((acc, val) => acc * Number(val), 1)
  )
  .reduce((acc, val) => acc + Number(val), 0);

function transpose<T>(x: T[][]): T[][] {
  const newArray = new Array(x[0].length)
    .fill('')
    .map((l) => new Array(x.length));

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x[i].length; j++) {
      newArray[j][i] = x[i][j];
    }
  }
  return newArray;
}

console.log(finalSum);
