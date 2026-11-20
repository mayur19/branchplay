import { createApp } from "./app.js";
const port = Number(process.env.PORT ?? 3102);
createApp().listen(port, () => process.stdout.write(`BranchPlay listening on http://localhost:${port}\n`));

