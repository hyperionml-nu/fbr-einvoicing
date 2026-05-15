import { cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(scriptDir, "..");

const assets = [
  {
    from: join(backendRoot, "src", "data"),
    to: join(backendRoot, "dist", "src", "data"),
  },
];

for (const asset of assets) {
  if (existsSync(asset.from)) {
    cpSync(asset.from, asset.to, { recursive: true });
  }
}
