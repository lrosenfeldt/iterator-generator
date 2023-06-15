class RocketCountdown implements Iterable<number> {
  start = 10;

  [Symbol.iterator](): Iterator<number, undefined> {
    let count = this.start;
    return {
      next: () => {
        if (count < 0) {
          return {
            done: true,
            value: undefined,
          };
        }
        return {
          done: false,
          value: count--,
        };
      },
      return: () => {
        console.log("Take off!");
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }
}

function* bar(): Generator<string | number, void, undefined> {
  const alphabet = ["a", "b", "c"];
  // iterable, iterator or generator
  // yield* alphabet;
  yield* new RocketCountdown();
}

for (const value of bar()) {
  console.log(value);
  break;
}
