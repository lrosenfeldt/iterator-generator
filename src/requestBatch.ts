import { createReadStream } from "node:fs";
export class RequestBatch implements AsyncIterable<Response> {
  batch: Map<number, Promise<{ id: number; response: Response }>> = new Map();
  abortController = new AbortController();

  private currentId = 0;
  private getId() {
    return this.currentId++;
  }

  push(url: string) {
    const id = this.getId();
    const request = new Request(new URL(url), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/html",
      },
      signal: this.abortController.signal,
    });
    this.batch.set(
      id,
      fetch(request).then(response => ({ id, response }))
    );
  }

  async pull(): Promise<Response | null> {
    if (this.batch.size === 0) {
      return null;
    }
    const { id, response } = await Promise.race(this.batch.values());
    this.batch.delete(id);
    return response;
  }

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        const response = await this.pull();
        if (response === null) {
          return {
            done: true as const,
            value: undefined,
          };
        }
        return {
          done: false as const,
          value: response,
        };
      },
      return: async () => {
        console.log("stop requests");
        this.abortController.abort();
        return {
          done: true as const,
          value: undefined,
        };
      },
    };
  }
}

const batch = new RequestBatch();
[
  "https://developer.mozilla.org/en-US/docs/Web/API/fetch",
  "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
  "https://nanogiants.de/",
].forEach(url => batch.push(url));

const formatResponse = async (response: Response): Promise<string> => {
  const text = await response.text();
  return `
${response.url}: Status ${response.status}

${text.slice(0, 140)}
...
`;
};

for await (const response of batch) {
  console.log(await formatResponse(response));
  // throw new Error("foo!");
}

const stream = createReadStream("package.json");
for await (const chunk of stream) {
  console.log(chunk);
}
