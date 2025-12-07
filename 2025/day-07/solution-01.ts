import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');
const map = lines.map((l) => l.split(''));

const start = Number(map[0].findIndex((e) => e === 'S'));

const beams = new Set([start]);
let splits = 0;

for (let h = 1; h < map.length; h++) {
  beams.forEach((beam) => {
    const hit = map[h][beam];

    switch (hit) {
      case '^':
        beams.add(beam + 1);
        beams.add(beam + -1);
        beams.delete(beam);
        splits++;
        break;
      case '|':
        break;
      case '.':
      default:
        map[h][beam] = '|';
        break;
    }
  });
}

console.log(map.map((l) => l.join('')).join('\n'));
console.log(splits);
