export function* countdown(startAt: number): Generator<number, void> {
  try {
    console.log("Ready, set...");
    yield 3;
    yield 2;
    yield 1;
  } finally {
    console.log("go!");
  }
}

const counter = countdown(10);
for (const count of counter) {
  console.log(count);
  counter.return();
  break;
}
