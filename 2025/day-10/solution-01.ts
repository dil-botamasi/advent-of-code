import { readFile } from 'node:fs/promises';

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

let acc = 0;

const machines = lines.map((l) => {
  const [rawLight, ...rest] = l.split(' ');
  const lightsStr = rawLight.replaceAll('[', '').replaceAll(']', '');
  const buttonPositions = rest.map((b) =>
    b.slice(1, -1).split(',').map(Number)
  );

  const lights = parseInt(
    Array.from(lightsStr.replaceAll('#', '1').replaceAll('.', '0'))
      .reverse()
      .join(''),
    2
  );

  const buttons = buttonPositions.map((button) => {
    let num = 0;
    for (const pos of button) {
      num |= 1 << pos;
    }
    return num;
  });

  console.log('----------------');
  console.log(
    'Buttons:',
    buttons.map((b) => b.toString(2))
  );
  console.log('Goal:', lights.toString(2));

  const steps = processMachine(lights, buttons);
  console.log(steps, 'steps');
  console.log('----------------');
  acc += steps;
});

console.log(acc);

function processMachine(
  lights: number,
  buttons: number[],
) {
  let min = Infinity;

  for (const combo of allCombinations(buttons)) {
    let state = 0;
    for (const button of combo) {
      state ^= button;
    }

    if (state === lights && combo.length < min) {
      min = combo.length;
    }
  }
  return min;
}

function* allCombinations<T>(array: T[]): Generator<T[]> {
  const n = array.length;
  const total = 1 << n; // 2^n combinations

  for (let i = 0; i < total; i++) {
    const combo: T[] = [];
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        combo.push(array[j]);
      }
    }
    yield combo; // Includes empty array and all lengths
  }
}
