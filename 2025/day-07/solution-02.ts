import assert from 'node:assert';
import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');
const map = lines.map((l) => l.split(''));

const start = {
  pos: Number(map[0].findIndex((e) => e === 'S')),
  timelines: 1,
};
const beams = new Set([start]);
let splits = 0;

for (let h = 1; h < map.length; h++) {
  beams.forEach((beam) => {
    const hit = map[h][beam.pos];

    switch (hit) {
      case '^':
        beams.add({ pos: beam.pos + 1, timelines: beam.timelines });
        beams.add({ pos: beam.pos + -1, timelines: beam.timelines });
        beams.delete(beam);
        splits++;
        break;
      case '|':
        const other = [...beams.values()].find((b) => b.pos === beam.pos);
        assert(other);
        other.timelines += beam.timelines;
        beams.delete(beam);
        break;
      case '.':
      default:
        map[h][beam.pos] = '|';
        break;
    }
  });
}

console.log(map.map((l) => l.join('')).join('\n'));
console.log([...beams.values()].reduce((acc, b) => acc + b.timelines, 0));
