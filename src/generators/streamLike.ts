import { PathLike } from "node:fs";
import { FileHandle, open } from "node:fs/promises";

export async function* readFile(
  path: PathLike
): AsyncGenerator<string, undefined> {
  const chunkSize = 128;

  yield "";
  return;
}

for await (const text of readFile(new URL(import.meta.url))) {
  console.log(text);
}
