# Persisted Static Queries

## Background

- Relay Classic generates queries at runtime. It can do things like allow string interpolation in the queries themselves. Unfortunately, this leads to a big performance cost at runtime and there is no compiled query that one could save and store. One of the biggest changes in Relay Modern is that all queries are compiled at build time. This [blog post](https://code.fb.com/data-infrastructure/relay-modern-simpler-faster-more-extensible/) goes into detail about this and other aspects of Relay Modern.

- With Relay Modern (but before persisted queries support), we have access to static queries that are generated before runtime, but we still send each query to the client. The query is then included in the `POST` request body from the client.

**Persisted static queries TLDR:** instead of sending the queries to the client and including them in the `POST` request, we now have the option to persist the queries on AWS. Each query has an associated deterministic (MD5) hash that we send to the client. The client then makes `GET` requests with the query hash and the query variables. This:

1. reduces the bundle size we ship to the client

2. reduces the size of the requests we make for each query

3. opens up everything else `GET` requests get, like better caching, CDN

## Prerequisites

1. Codebase must be entirely Relay Modern

2. An S3 bucket for storing queries

3. `react-scripts` version >= 2.0.0-rc2

4. First Look Media fork of `relay-compiler`: `https://github.com/firstlookmedia/relay/releases/download/v1.5.0-flm.1/relay-compiler-1.5.0-flm.1.tar.gz`

5. `PERSIST_QUERIES: "true"` and `QUERIES_S3_BUCKET` circle configuration

## Front-end details

1. Upgrading to `react-scripts` with persisted queries support requires no changes for apps that do not want to use persisted queries

2. Persisted queries are always turned off during local development

3. The client needs access to the `PERSIST_QUERIES` environment variable (`env-config`)

4. Most of the code changes live in `fetcher.js`. The APIs for `ClientFetcher` & `ServerFetcher` have not changed. Under the hood they make `GET` or `POST` requests depending on the value of `PERSIST_QUERIES`

5. The fork of `relay-compiler` takes a `--persist` flag to turn persisted queries on. There is [a PR open to merge this feature into Relay itself](https://github.com/facebook/relay/pull/2354), for now we will will need to maintain a fork that we can upgrade when we upgrade Relay. This requires an update to the fork of Relay, a build of the complier package, and a release of our fork