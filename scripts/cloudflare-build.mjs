import { spawnSync } from "node:child_process";

function run(command, options = {}) {
  const result = spawnSync(command, {
    stdio: "inherit",
    shell: true,
    ...options,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npm --prefix apps/frontend ci --no-audit --no-fund");
run("npm run frontend:build", {
  env: {
    ...process.env,
    CI: "false",
    GENERATE_SOURCEMAP: "false",
    REACT_APP_API_BASE_URL: "",
  },
});
