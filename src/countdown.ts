class Countdown {
  count: number;
  constructor(startAt: number) {
    this.count = startAt;
  }

  next() {}
}

const counter = new Countdown(10);
