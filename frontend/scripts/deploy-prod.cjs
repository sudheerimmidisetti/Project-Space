const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const apiUrlInput = (process.argv[2] || process.env.VITE_API_URL || "").trim();

if (!apiUrlInput) {
  console.error(
    "Missing API URL. Usage: npm run deploy:prod -- https://your-backend.onrender.com",
  );
  process.exit(1);
}

const apiUrl = apiUrlInput.replace(/\/$/, "");

if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(apiUrl)) {
  console.error(
    "Invalid API URL for production deploy: localhost is not allowed.",
  );
  process.exit(1);
}

if (!/^https:\/\//i.test(apiUrl)) {
  console.error("Production API URL must use https://");
  process.exit(1);
}

const frontendRoot = path.resolve(__dirname, "..");
const productionEnvPath = path.join(frontendRoot, ".env.production");

fs.writeFileSync(productionEnvPath, `VITE_API_URL=${apiUrl}\n`, "utf8");
console.log(`Wrote ${productionEnvPath} with VITE_API_URL=${apiUrl}`);

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const deploy = spawnSync(npmCommand, ["run", "deploy"], {
  cwd: frontendRoot,
  stdio: "inherit",
});

process.exit(deploy.status ?? 1);
