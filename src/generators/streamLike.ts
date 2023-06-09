import { PathLike } from "node:fs";
import { FileHandle, open } from "node:fs/promises";

export async function* readFile(
  path: PathLike
): AsyncGenerator<string, undefined> {
  const chunkSize = 128;

  let fd: FileHandle | null = null;

  try {
    fd = await open(path, "r");

    const decoder = new TextDecoder("utf-8");
    const buffer = new Uint8Array(chunkSize);
    let position = 0;

    while (true) {
      const { bytesRead } = await fd.read(buffer, 0, chunkSize, position);
      position += bytesRead;
      if (bytesRead === 0) {
        break;
      }
      yield decoder.decode(buffer, { stream: true });
    }
  } catch (err) {
    if (fd !== null) {
      console.log("closing file...");
      await fd.close();
    }
    return;
  }

  if (fd !== null) {
    console.log("closing file...");
    await fd.close();
  }
  return;
}

for await (const text of readFile(new URL(import.meta.url))) {
  console.log(text);
}
