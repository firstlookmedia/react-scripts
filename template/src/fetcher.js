import 'isomorphic-fetch';
import envConfig from 'env-config';

// TODO: Update this when someone releases a real, production-quality solution
// for handling universal rendering with Relay Modern. For now, this is just
// enough to get things working.

class FetcherBase {
  constructor(url, isStaticQueries = false) {
    this.url = url;
    this.fetchVerb = isStaticQueries ? this.get : this.post;
  }

  async get(operation, variables) {
    const staticQueryUrl = encodeURIComponent(`${this.url}/${operation.id}?variables=${JSON.stringify(variables)}`);
    const response = await fetch(staticQueryUrl, {
      method: 'GET',
      credentials: 'same-origin',
    });
    return response;
  }

  async post(operation, variables) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: operation.text, variables }),
      credentials: 'same-origin',
    });
    return response;
  }

  async fetch(operation, variables) {
    try {
      const response = await this.fetchVerb(operation, variables);
      return response.json();
    } catch (err) {
      return { error: err };
    }
  }
}

export class ServerFetcher extends FetcherBase {
  constructor(url) {
    const isStaticQueries = process.env.PERSIST_QUERIES;
    super(url, isStaticQueries);

    this.payloads = [];
  }

  async fetch(...args) {
    const i = this.payloads.length;
    this.payloads.push(null);
    const payload = await super.fetch(...args);
    this.payloads[i] = payload;
    return payload;
  }

  toJSON() {
    return this.payloads;
  }
}

export class ClientFetcher extends FetcherBase {
  constructor(url, payloads) {
    const isStaticQueries = envConfig.PERSIST_QUERIES;
    super(url, isStaticQueries);

    this.payloads = payloads;
  }

  async fetch(...args) {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return super.fetch(...args);
  }
}
