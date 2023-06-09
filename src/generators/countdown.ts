export function* countdown(startAt: number): Generator<number> {
  console.log("Ready, set...");
  yield 3;
  yield 2;
  yield 1;
  console.log("go!");
  for (let i = startAt; i >= 0; i--) {
    yield i;
  }
}

const counter = countdown(10);
for (const count of counter) {
  console.log(count);
}
