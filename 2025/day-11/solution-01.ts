import { readFile } from 'node:fs/promises';

interface Device {
  name: string;
  outputs: string[];
}

const input = await readFile(new URL('./input.txt', import.meta.url), 'utf-8');
const devices = new Map<string, Device>();
input.split('\n').map((d) => {
  const [tag, outputs] = d.split(': ');

  devices.set(tag, {
    name: tag,
    outputs: outputs.split(' '),
  });
});

devices.set('out', {
  name: 'out',
  outputs: [],
});

const start = devices.get('you')!;
const queue: Device[] = [start];

let acc = 0;
while (queue.length) {
  let x = queue.pop()!;

  if (x.name === 'out') {
    acc++;
  }

  for (const childTag of x.outputs) {
    const next = devices.get(childTag)!;
    queue.push(next);
  }
}

console.log(acc);
