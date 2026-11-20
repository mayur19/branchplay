# BranchPlay

**Interactive branching stories without executable story logic.** Write scenes, connect meaningful
choices and publish deterministic experiences with multiple endings.

BranchPlay is an open-source authoring and playback platform for interactive fiction, educational
journeys and nonlinear audio or illustrated stories. Its runtime evaluates structured conditions
and effects, preserving predictable player state without running arbitrary expressions.

> **Project status: early foundation.** Graph validation, reachability analysis, boolean
> conditions, atomic effects and idempotent transitions are implemented and tested. The remaining
> work is tracked in the [ticket index](docs/TICKETS.md): approximately 10% of the planned product
> is complete.

## Project status

| Area | Status | Tickets |
| --- | --- | --- |
| Repository standards, MIT license and continuous checks | Implemented | Foundation |
| Typed story graph and node model | Implemented | Foundation |
| Reachability, dangling-edge and dead-end validation | Implemented | Foundation |
| Deterministic play state and idempotent choices | Implemented | Foundation |
| Validation endpoint and foundation migration | Implemented | Foundation |
| Accounts, projects and durable graph repositories | Pending | BP-101 – BP-103 |
| Visual and accessible authoring tools | Pending | BP-104 – BP-110 |
| Validation workspace and preview | Pending | BP-111 – BP-115 |
| Review builds and immutable releases | Pending | BP-116 – BP-119 |
| Safe public player, saves and endings | Pending | BP-120 – BP-124 |
| Insights, media and portability | Pending | BP-125 – BP-128 |
| Complete verification and release readiness | Pending | BP-129 – BP-130 |

## Quick start

Requirements: Node.js 22 or later and npm.

    npm install
    npm run dev

Open:

- Web: <http://localhost:3102>
- Health endpoint: <http://localhost:3102/api/health>

POST a story graph to /api/stories/:id/validate to exercise the implemented validation boundary.

## Demo access (development only)

No account system or demo credentials exist yet. The local landing page and graph-validation
endpoint are available without authentication for foundation testing. Project membership and
private-story access are tracked by BP-101 through BP-103.

## Commands

| Command | What it does |
| --- | --- |
| npm run dev | Start the local server with file watching |
| npm test | Run domain and request tests |
| npm run typecheck | Check strict TypeScript |
| npm run build | Compile the production server into dist |
| npm start | Run the compiled server |

## Tech stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript in strict mode on Node.js 22+ |
| API | Express 5 with zod request validation |
| Data model | PostgreSQL forward migration plus repository boundary |
| Runtime | Structured graph, conditions, effects and play state |
| Web | Accessible static foundation page served by Express |
| Tests | Vitest and Supertest |
| Checks | GitHub Actions for type checks, tests and sensitive-data scanning |

## Repository layout

    branchplay/
    ├── src/
    │   ├── app.ts             graph-validation HTTP boundary
    │   ├── domain.ts          validator and deterministic runtime
    │   └── server.ts          process entry point
    ├── test/                  domain and request tests
    ├── migrations/            project, graph, release and playthrough schema
    ├── public/                initial player-facing landing page
    ├── docs/
    │   ├── ARCHITECTURE.md    authoring, release and runtime boundaries
    │   ├── ROADMAP.md         milestone sequence
    │   └── TICKETS.md         complete implementation index
    └── .github/               checks and issue template

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Delivery roadmap](docs/ROADMAP.md)
- [Implementation ticket index](docs/TICKETS.md)
- [Product requirements](https://github.com/mayur19/branchplay/issues/1)
- [Public issue tracker](https://github.com/mayur19/branchplay/issues)

## Known limitations

- Story graphs are held in process memory and are cleared on restart.
- There is no visual editor, preview interface or public player yet.
- The first runtime slice supports boolean conditions and effects only.
- Authentication, release persistence, assets and saved playthroughs are pending.
- The migration is not yet connected to the HTTP service.

## Contributing, security and license

- [Contributing guide](CONTRIBUTING.md): workflow and verification expectations.
- [Security policy](SECURITY.md): private vulnerability reporting.
- [Community conduct](CODE_OF_CONDUCT.md).
- Licensed under the [MIT License](LICENSE).

