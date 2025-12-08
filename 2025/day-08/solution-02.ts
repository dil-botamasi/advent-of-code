import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

type Junction = [number, number, number];
const junctions = lines.map((l) => l.split(',').map(Number)) as Junction[];

const distances: Record<number, { a: number; b: number }> = {};

for (let i = 0; i < junctions.length; i++) {
  const a = junctions[i];

  for (let j = i + 1; j < junctions.length; j++) {
    const b = junctions[j];
    const dist = distance(a, b);

    distances[dist] = { a: i, b: j };
  }
}
let circuits: Set<number>[] = [];
const distancesArray = Object.values(distances);

let a = -1,
  b = -1;

for (let i = 0; i < distancesArray.length; i++) {
  const pair = distancesArray[i];
  a = pair.a;
  b = pair.b;

  const circuitA = circuits.findIndex((c) => c.has(a));
  const circuitB = circuits.findIndex((c) => c.has(b));
  const circuit = circuits[circuitA] ?? circuits[circuitB];

  if (circuitA !== circuitB && circuitA > -1 && circuitB > -1) {
    // merge circuits
    circuits[circuitA] = new Set([
      ...circuits[circuitA],
      ...circuits[circuitB],
    ]);
    circuits.splice(circuitB, 1);
  }

  if (circuit) {
    // add to circuit
    circuit.add(a);
    circuit.add(b);
  } else {
    // new circuit
    circuits.push(new Set([a, b]));
  }

  if (circuits.length === 1 && circuits[0].size === junctions.length) {
    console.log(junctions[a][0] * junctions[b][0]);
    break;
  }
}

function distance(a: Junction, b: Junction): number {
  return Math.abs(
    (a[0] - b[0]) * (a[0] - b[0]) +
      (a[1] - b[1]) * (a[1] - b[1]) +
      (a[2] - b[2]) * (a[2] - b[2])
  );
}
