CREATE TABLE story_projects (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  visibility text NOT NULL,
  current_release_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE story_nodes (
  id uuid PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES story_projects(id),
  node_type text NOT NULL,
  title text NOT NULL,
  body_markdown text NOT NULL,
  version integer NOT NULL DEFAULT 1
);
CREATE TABLE story_choices (
  id uuid PRIMARY KEY,
  source_node_id uuid NOT NULL REFERENCES story_nodes(id),
  destination_node_id uuid NOT NULL REFERENCES story_nodes(id),
  label text NOT NULL,
  condition_json jsonb,
  effects_json jsonb,
  sort_order integer NOT NULL
);
CREATE TABLE story_releases (
  id uuid PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES story_projects(id),
  label text NOT NULL,
  graph_snapshot jsonb NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, label)
);
CREATE TABLE playthroughs (
  id uuid PRIMARY KEY,
  release_id uuid NOT NULL REFERENCES story_releases(id),
  current_node_key text NOT NULL,
  state_json jsonb NOT NULL,
  status text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

