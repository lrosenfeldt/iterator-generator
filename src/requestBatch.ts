export class RequestBatch {
  batch: Map<number, Promise<{ id: number; response: Response }>> = new Map();

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
    });
    // TODO: implement!
  }

  // TODO: implement pull
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
