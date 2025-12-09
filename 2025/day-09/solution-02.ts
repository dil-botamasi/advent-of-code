import { readFile, writeFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

const points = lines.map((l) => l.split(',').map(Number));

//#region Outline
console.time('Outline');
const outlines: number[][][] = [];

for (let i = 0; i < points.length; i++) {
  const a = points.at(i - 1)!;
  const b = points[i];

  const dir = unit(sub(b, a));
  const norm = cw(dir);

  outlines.push([add(a, norm), add(b, norm)]);
}
console.timeEnd('Outline');
//#endregion

//#region Area
console.time('Area');
let max = 0;

for (let i = 0; i < points.length; i++) {
  const a = points[i];

  for (let j = i + 1; j < points.length; j++) {
    const b = points[j];
    const t = area(a, b);

    if (t <= max) {
      continue;
    }

    if (lineInRectangle(outlines, [a, b])) {
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
function lineInRectangle(outline: number[][][], rectangle: number[][]) {
  for (const line of outline) {
    const [lx0, ly0] = line[0];
    const [lx1, ly1] = line[1];

    const [rx0, ry0] = rectangle[0];
    const [rx1, ry1] = rectangle[1];

    const minX = Math.min(rx0, rx1);
    const maxX = Math.max(rx0, rx1);
    const minY = Math.min(ry0, ry1);
    const maxY = Math.max(ry0, ry1);

    if (
      // line end 0 inside rectangle
      (minX < lx0 && lx0 < maxX && minY < ly0 && ly0 < maxY) ||
      // line end 1 inside rectangle
      (minX < lx1 && lx1 < maxX && minY < ly1 && ly1 < maxY)
    ) {
      return true;
    }

    if (lx0 === lx1) {
      // vertical line
      if (
        minX < lx0 &&
        lx0 < maxX &&
        Math.min(ly0, ly1) <= minY &&
        maxY <= Math.max(ly0, ly1)
      ) {
        return true;
      }
    } else if (ly0 === ly1) {
      // horizontal line
      if (
        minY < ly0 &&
        ly0 < maxY &&
        Math.min(lx0, lx1) <= minX &&
        maxX <= Math.max(lx0, lx1)
      ) {
        return true;
      }
    }
  }

  return false;
}

function area(a: number[], b: number[]): number {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function cw(v: number[]) {
  return [v[1], -v[0]];
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
//#endregion
