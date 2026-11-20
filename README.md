# BranchPlay

BranchPlay is an open-source visual authoring and playback platform for choice-driven stories.

## Implemented foundation

- typed story nodes and choices;
- structural validation and reachability analysis;
- boolean conditions and effects without executable expressions;
- deterministic, idempotent play transitions;
- request validation and a PostgreSQL foundation schema;
- unit and request tests;
- an initial public landing page.

## Local setup

```sh
npm install
npm test
npm run dev
```

Open http://localhost:3102. The remaining work is organized in [the roadmap](docs/ROADMAP.md) and public issues.

## License

MIT

