import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const sections = input.split('\n\n');
const places = sections
  .splice(-1)[0]
  .split('\n')
  .map((l) => {
    const [size, ids] = l.split(': ');
    return {
      size: size.split('x').map(Number),
      amount: ids.split(' ').map(Number),
    };
  });
const shapes = new Map();
sections.forEach((l) => {
  const [id, shapeData] = l.split(':');
  shapes.set(Number(id), {
    shape: shapeData
      .trim()
      .replaceAll('#', '1')
      .replaceAll('.', '0')
      .split('\n')
      .map((l) => l.split('').map(Number)),
    area: shapeData.split('#').length - 1,
    blackOrWhiteSquares: shapeData
      .replaceAll('\n', '')
      .split('')
      .reduce((x, v, i) => {
        return x + (i % 2) * Number(v === '#');
      }, 0),
  });
});

let possible = 0;
for (const place of places) {
  const area = place.size[0] * place.size[1];
  let whiteSquares = Math.ceil(area / 2);
  let blackSquares = area - whiteSquares;

  for (let shapeId = 0; shapeId < place.amount.length; shapeId++) {
    const amount = place.amount[shapeId];

    const half = Math.ceil(amount / 2);
    const otherHalf = amount - half;

    const shape = shapes.get(shapeId);

    const aInShape = shape.blackOrWhiteSquares;
    const bInShape = shape.area - aInShape;

    whiteSquares -= aInShape * half + bInShape * otherHalf;
    blackSquares -= aInShape * otherHalf + bInShape * half;
  }

  if (!(whiteSquares < 0 || blackSquares < 0)) {
    possible++;
  }
}

console.log(possible);
