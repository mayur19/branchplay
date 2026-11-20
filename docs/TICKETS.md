# Implementation ticket index

Full issue descriptions include acceptance criteria, dependencies and verification notes.

- [ ] BP-101 | Foundation | backend,security | Add accounts, sessions and project membership | Establish revocable username-based access and project roles.
- [ ] BP-102 | Foundation | backend,database | Implement PostgreSQL graph repositories | Persist projects, nodes, choices and variables transactionally.
- [ ] BP-103 | Foundation | backend | Add project lifecycle and duplication | Support private, unlisted, public and archived projects.
- [ ] BP-104 | Authoring | frontend | Build authoring workspace shell | Provide project navigation, dirty-state protection and accessible dialogs.
- [ ] BP-105 | Authoring | frontend | Build visual scene graph | Support node creation, connection, positioning, focus and bounded rendering.
- [ ] BP-106 | Authoring | frontend | Build accessible outline editor | Match visual graph capabilities through keyboard-first tables and forms.
- [ ] BP-107 | Authoring | backend,frontend | Implement scene and choice editor | Cover node types, media, ordering, confirmation text and notes.
- [ ] BP-108 | Authoring | backend | Add typed variable definitions | Support booleans, bounded integers, enums and inventory counts.
- [ ] BP-109 | Authoring | backend,frontend | Build structured condition editor | Prevent executable expressions and validate every variable reference.
- [ ] BP-110 | Authoring | backend,testing | Implement atomic effect application | Enforce bounds, inventory rules and request idempotency.
- [ ] BP-111 | Validation | backend | Detect dangling and unreachable graph content | Return actionable scene and choice locations.
- [ ] BP-112 | Validation | backend,testing | Detect empty-choice states and redirect cycles | Block structural traps while allowing documented intentional loops.
- [ ] BP-113 | Validation | frontend | Build validation results workspace | Group blocking errors and warnings with direct editor navigation.
- [ ] BP-114 | Preview | backend,frontend | Build isolated preview playthroughs | Exclude previews from public state and metrics.
- [ ] BP-115 | Preview | frontend | Add debug-state inspector | Explain variables, inventory, visited scenes and hidden-choice reasons.
- [ ] BP-116 | Review | backend,database | Implement immutable review builds | Freeze content references for scene-specific feedback.
- [ ] BP-117 | Review | frontend | Build reviewer player and comment workflow | Support open, resolve and navigate-to-scene interactions.
- [ ] BP-118 | Publishing | backend,database | Implement release snapshots and manifests | Freeze graph, variables and referenced assets.
- [ ] BP-119 | Publishing | backend,testing | Enforce publication validation gates | Reject every structural error and stale release attempt.
- [ ] BP-120 | Player | backend,security | Implement safe current-scene response shapes | Never return future nodes, hidden choices or condition internals.
- [ ] BP-121 | Player | backend,database | Persist playthrough state and steps | Apply transitions atomically and resume without replaying effects.
- [ ] BP-122 | Player | frontend | Build responsive public player | Include reduced motion, contrast and text-size controls.
- [ ] BP-123 | Player | backend | Add anonymous recovery and registered saves | Store public tokens and recovery values hashed.
- [ ] BP-124 | Player | backend,frontend | Build ending completion and gallery | Reveal only reached endings with optional locked teasers.
- [ ] BP-125 | Insights | backend | Record privacy-safe play events | Exclude previews, duplicate requests and named paths.
- [ ] BP-126 | Insights | frontend | Build release-filtered path summaries | Show starts, completion, endings, choices and drop-off denominators.
- [ ] BP-127 | Media | backend,security | Implement safe asset library and release retention | Validate types, quotas and published references.
- [ ] BP-128 | Portability | backend,testing | Add versioned story export and import | Validate input and create conflict-free new projects.
- [ ] BP-129 | Quality | testing,security | Complete runtime and access browser suite | Cover hidden choices, idempotency, releases, recovery and isolation.
- [ ] BP-130 | Release | accessibility,devops | Complete accessibility, performance and deployment gates | Provide runbook, backups, monitoring and production configuration.

