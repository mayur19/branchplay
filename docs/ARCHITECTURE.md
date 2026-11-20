# Architecture

BranchPlay separates authoring data, immutable release snapshots and playthrough state.

- The authoring graph may change until publication.
- Validation blocks malformed, dangling and unreachable content.
- A release freezes nodes, choices, variables and assets.
- Runtime transitions accept only a currently visible choice and apply effects once.
- Player responses contain only the current scene and permitted choices.

The first slice implements the graph and runtime core. PostgreSQL repositories, access control and release persistence follow in the next milestone.

