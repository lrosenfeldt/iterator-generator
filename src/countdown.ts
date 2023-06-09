class Countdown implements Iterator<number, undefined> {
  count: number;
  constructor(startAt: number) {
    this.count = startAt;
  }

  next() {
    if (this.count < 0) {
      return {
        done: true as const,
      };
    }
    return {
      done: true as false,
      value: this.count--,
    };
  }
}

const counter = new Countdown(10);
while (true) {
  const { done, value } = counter.next();
  if (done) {
    break;
  }
  console.log(value);
}
