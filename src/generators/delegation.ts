function* foo() {
  try {
    yield "nano";
    yield "giant";
  } finally {
    console.log("foo returned early");
  }
}

function* bar(): Generator<string, void, undefined> {
  const alphabet = ["a", "b", "c"];
  // iterable, iterator or generator
  yield* alphabet;
  yield* foo();
}

for (const value of bar()) {
  console.log(value);
  break;
}
