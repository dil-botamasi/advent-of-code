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

let acc = 0;
const memo = new Map<string, number>();

function sendSignal(
  device: Device,
  passedDac: boolean,
  passedFft: boolean
): number {
  const key = `${device.name}📀${passedDac}🪱${passedFft}`;

  if (memo.has(key)) {
    return memo.get(key)!;
  }

  const newPassedDac = passedDac || device.name === 'dac';
  const newPassedFft = passedFft || device.name === 'fft';

  if (device.name === 'out') {
    const result = newPassedDac && newPassedFft ? 1 : 0;
    memo.set(key, result);
    return result;
  }

  let count = 0;
  for (const childTag of device.outputs) {
    const next = devices.get(childTag)!;
    count += sendSignal(next, newPassedDac, newPassedFft);
  }

  memo.set(key, count);
  return count;
}

const start = devices.get('svr')!;
acc = sendSignal(start, false, false);

console.log(acc);
