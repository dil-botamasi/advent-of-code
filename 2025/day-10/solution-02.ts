import { readFile } from 'node:fs/promises';
import { init } from 'z3-solver';
const {
  Z3, // Low-level C-like API
  Context, // High-level Z3Py-like API
} = await init();

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');

const lines = input.split('\n');

let acc = 0;
let problemIndex = 0;

for (const l of lines) {
  const { Optimize, Int } = Context(`problem_${problemIndex++}`);

  const rest = l.split(' ').slice(1);
  const joltage = rest
    .splice(-1)[0]
    .replaceAll('{', '')
    .replaceAll('}', '')
    .split(',')
    .map(Number);
  const buttonPositions = rest.map((b) =>
    b.slice(1, -1).split(',').map(Number)
  );

  const buttons = buttonPositions.map((button) => {
    let num = new Array(joltage.length).fill(0);
    for (const pos of button) {
      num[pos] = 1;
    }
    return num;
  });

  const optimizer = new Optimize();

  const x = buttons.map((_, i) => Int.const(`x${i}`));

  x.forEach((xi) => {
    optimizer.add(xi.ge(0));
  });

  for (let dim = 0; dim < joltage.length; dim++) {
    let sumTerms = x.map((xi, i) => xi.mul(buttons[i][dim]));
    let sum = sumTerms.reduce((a, b) => a.add(b));
    optimizer.add(sum.eq(joltage[dim]));
  }

  const l1NormExpr = x.reduce((a, b) => a.add(b));
  optimizer.minimize(l1NormExpr);

  const result = await optimizer.check();

  if (result === 'sat') {
    const model = optimizer.model();
    const solution = x.map((xi) => Number(model.eval(xi).toString()));

    const l1Norm = solution.reduce((a, b) => a + b, 0);
    acc += l1Norm;

    if (problemIndex % 10 === 0) {
      console.log(`Solved ${problemIndex} problems, current total: ${acc}`);
    }
  } else {
    console.log(`Problem ${problemIndex}: No solution found`);
  }
}

console.log('Total:', acc);
