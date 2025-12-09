import { readFile, writeFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

const points = lines.map((l) => l.split(',').map(Number));
const minX = Math.min(...points.map((p) => p[0]));
const maxX = Math.max(...points.map((p) => p[0]));
const minY = Math.min(...points.map((p) => p[1]));
const maxY = Math.max(...points.map((p) => p[1]));

//#region Outline
console.time('Outline');
const outline = new Set<string>();

for (let i = 0; i < points.length; i++) {
  const a = points.at(i - 1)!;
  const b = points[i];

  const dir = unit(sub(b, a));
  const norm = cw(dir);

  if (a[0] === b[0]) {
    // vertical
    for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
      outline.add(vstr(add([a[0], y], norm)));
    }
  }
  // horizontal
  for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
    outline.add(vstr(add([x, a[1]], norm)));
  }
}
console.timeEnd('Outline');
//#endregion

await writeFile('tmp.txt', JSON.stringify([...outline.values()]));

//#region Area
console.time('Area')
let max = 0;
for (let i = 0; i < points.length; i++) {
  const a = points[i];
  console.log(i, points.length);
  

  for (let j = i + 1; j < points.length; j++) {
    const b = points[j];
    const t = area(a, b);

    if (t <= max) {
      continue;
    }

    if (pointInside(outline, a, b)) {
      continue;
    }
    max = t;
  }
}
console.timeEnd('Area');
//#endregion

console.log(max);
// visualiseMap();

//#region Helpers
function area(a: number[], b: number[]): number {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function pointInside(points: Set<string>, a: number[], b: number[]): boolean {
  const minX = Math.min(a[0], b[0]);
  const maxX = Math.max(a[0], b[0]);
  const minY = Math.min(a[1], b[1]);
  const maxY = Math.max(a[1], b[1]);
  
  for (const p of points) {
    const [x, y] = p.split(',').map(Number);

    if (minX < x && x < maxX && minY < y && y < maxY) {
      return true;
    }
  }
  return false;
}
function visualiseMap() {
  // Visualize the outline as a map

  const grid: string[][] = [];
  for (let y = 0; y <= maxY + 1; y++) {
    grid[y] = [];
    for (let x = 0; x <= maxX + 1; x++) {
      grid[y][x] = '.';
    }
  }

  // Mark outline points
  for (const s of outline.values()) {
    const [x, y] = s.split(',').map(Number);
    grid[y][x] = '#';
  }

  // Mark original points
  for (const [x, y] of points) {
    grid[y][x] = 'O';
  }

  // Print the grid
  console.log('\nMap:');
  for (let y = 0; y <= maxY + 1; y++) {
    console.log(grid[y].join(''));
  }
  console.log();
}

function cw(v: number[]) {
  return [v[1], -v[0]];
}

function ccw(v: number[]) {
  return [-v[1], v[0]];
}

function add(a: number[], b: number[]): number[] {
  return [a[0] + b[0], a[1] + b[1]];
}

function sub(a: number[], b: number[]): number[] {
  return [a[0] - b[0], a[1] - b[1]];
}

function unit(v: number[]): number[] {
  return [v[0] / Math.abs(v[0]) || 0, v[1] / Math.abs(v[1]) || 0];
}

function vstr(v: number[]): string {
  return `${v[0]},${v[1]}`;
}
//#endregion
