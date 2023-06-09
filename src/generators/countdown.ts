export function* countdown(startAt: number): Generator<number> {
    console.l
  console.log("Ready, set...");
  yield 3;
  yield 2;
  yield 1;
  console.log("go!");
}

const counter = countdown(10);
// for (const count of counter) {
//   console.log(count);
// }
