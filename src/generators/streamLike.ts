import { PathLike } from "node:fs";
import { FileHandle, open } from "node:fs/promises";

export async function* readFile(
  path: PathLike
): AsyncGenerator<string, undefined> {
  const chunkSize = 64;

  let fd: FileHandle | null = null;
  try {
    fd = await open(path, "r");
    const buffer = new Uint8Array(chunkSize);
    const decoder = new TextDecoder();
    let position = 0;

    while (true) {
      const { bytesRead } = await fd.read(buffer, 0, chunkSize, position);
      position += bytesRead;

      if (bytesRead === 0) {
        return;
      }

      yield decoder.decode(buffer, { stream: true });
    }
  } finally {
    if (fd !== null) {
      console.log("close file");
      await fd.close();
      console.log("finished");
    }
  }
}

for await (const text of readFile(new URL(import.meta.url))) {
  console.log(text);
  break;
}
console.log("hello?");
