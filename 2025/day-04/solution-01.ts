import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const lines = input.split('\n');
const map = lines.map((l) => l.split(''));

let counter = 0;

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

    if (count < 4) {
      counter++;
    }
  }
}

console.log(counter);
