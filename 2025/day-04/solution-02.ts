import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const lines = input.split('\n');
const map = lines.map((l) => l.split(''));

let totalRemoved = 0;

while ('the earth is rotating') {
  let removed = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== '@') {
        continue;
      }

      // prettier-ignore
      const stuff = [
        map[y - 1]?.[x - 1] ?? '.',
        map[y - 1]?.[x    ] ?? '.',
        map[y - 1]?.[x + 1] ?? '.',
        map[y    ]?.[x - 1] ?? '.',
        map[y    ]?.[x + 1] ?? '.',
        map[y + 1]?.[x - 1] ?? '.',
        map[y + 1]?.[x    ] ?? '.',
        map[y + 1]?.[x + 1] ?? '.',
      ];

      const count = stuff.filter((val) => val === '@').length;
      const removable = count < 4;

      if (removable) {
        map[y][x] = '.';
        removed++;
      }
    }
  }

  totalRemoved += removed;
	console.log('Removed paper amount:', removed);

  if (removed === 0) {
    break;
  }
}

console.log(totalRemoved, 'Paper rolls removed');
