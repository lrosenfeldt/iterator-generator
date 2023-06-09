export class RequestBatch {
  batch: Map<number, Promise<{ id: number; response: Response }>> = new Map();
  abortController: AbortController = new AbortController();

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
    const { response, id } = await Promise.race(this.batch.values());
    this.batch.delete(id);
    return response;
  }

  [Symbol.asyncIterator](): AsyncIterator<Response, number> {
    return {
      next: async () => {
        const response = await this.pull();
        if (response === null) {
          return {
            done: true,
            value: 0,
          };
        }
        return {
          done: false,
          value: response,
        };
      },
      return: async () => {
        if (this.batch.size > 0) {
          this.abortController.abort();
        }
        this.batch = new Map();
        this.currentId = 0;
        return {
          done: true,
          value: this.batch.size,
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

for await (const res of batch) {
  const text = await res.text();
  const formattedResult = `
    ${res.url}: Status ${res.status}
    ${text.slice(0, 140)}
    ...

  `;
  console.log(formattedResult);
}
