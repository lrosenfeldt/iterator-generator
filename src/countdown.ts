class Countdown implements Iterable<number> {
  count: number;
  constructor(startAt: number) {
    this.count = startAt;
  }

  [Symbol.iterator](): Iterator<number, null> {
    let count = this.count;
    return {
      next: () => {
        if (count < 0) {
          return {
            done: true as const,
            value: null,
          };
        }
        return {
          done: false as const,
          value: count--,
        };
      },
    };
  }

  entries(): IterableIterator<[number, number]> {
    let count = this.count;
    return {
      next: () => {
        if (count < 0) {
          return {
            done: true as const,
            value: null,
          };
        }
        return {
          done: false as const,
          value: [this.count - count, count--] as [number, number],
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

const counter = new Countdown(10);
for (const [index, count] of counter.entries()) {
  console.log(index, count);
}
