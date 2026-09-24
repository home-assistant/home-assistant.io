// Builds the live dashboard card package (see
// src/components/LiveCard.astro) from the Home Assistant frontend and
// installs it into the Astro workspace.
//
// Run it from astro/ with `npx pnpm run build:website-cards` when the
// cards should be updated, then commit website-cards.tgz together with
// pnpm-lock.yaml. Regular website builds only unpack the committed
// package: they never build the frontend.
//
// Steps:
// 1. Check out FRONTEND_REF of the frontend repository into a cache
//    directory outside the repository (HA_FRONTEND_DIR, default
//    ~/.cache/home-assistant-website-cards/frontend). It must not be
//    inside a node_modules directory: the frontend build treats every
//    file under one as a third-party package.
// 2. Apply frontend.patch (the website-cards build target and a few
//    asset path fixes) and copy src/ in as website-cards/src/.
// 3. Install the frontend's dependencies and build the package.
// 4. Replace website-cards.tgz and reinstall it, which updates the
//    package checksum in pnpm-lock.yaml.
//
// The frontend build takes a few minutes and about 4 GB of memory the
// first time. To update the frontend version, change FRONTEND_REF; if
// frontend.patch no longer applies, update it against the new version.
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FRONTEND_REF = "20260826.7";
const FRONTEND_REPO = "https://github.com/home-assistant/frontend.git";

const here = path.dirname(fileURLToPath(import.meta.url));
const astroDir = path.resolve(here, "..");
const frontendDir = path.resolve(
  process.env.HA_FRONTEND_DIR ??
    path.join(
      process.env.XDG_CACHE_HOME ?? path.join(os.homedir(), ".cache"),
      "home-assistant-website-cards/frontend",
    ),
);
const packageFile = path.join(here, "website-cards.tgz");

const step = (message) => console.log(`\n== ${message}\n`);
const run = (command, args, cwd = frontendDir) =>
  execFileSync(command, args, { cwd, stdio: "inherit" });

step(`Checking out frontend ${FRONTEND_REF} in ${frontendDir}`);
if (!existsSync(path.join(frontendDir, ".git"))) {
  mkdirSync(frontendDir, { recursive: true });
  run("git", ["init", "--quiet"]);
  run("git", ["remote", "add", "origin", FRONTEND_REPO]);
}
run("git", ["fetch", "--depth", "1", "origin", "tag", FRONTEND_REF]);
run("git", ["checkout", "--quiet", "--force", FRONTEND_REF]);
// Removes the previous run's patch files but keeps node_modules, which
// is ignored by git, so later runs install much faster.
run("git", ["clean", "--quiet", "--force", "-d"]);

step("Applying frontend.patch");
run("git", ["apply", path.join(here, "frontend.patch")]);
cpSync(path.join(here, "src"), path.join(frontendDir, "website-cards/src"), {
  recursive: true,
});

step("Installing frontend dependencies");
const yarnPath = readFileSync(path.join(frontendDir, ".yarnrc.yml"), "utf-8")
  .match(/^yarnPath:\s*(.+)$/m)[1]
  .trim();
run("node", [yarnPath, "install", "--immutable"]);

step("Building the package (takes a few minutes)");
run("node", ["node_modules/gulp/bin/gulp.js", "build-website-cards"]);

step("Installing the package into the Astro workspace");
const built = readdirSync(path.join(frontendDir, "website-cards")).find(
  (file) => file.endsWith(".tgz"),
);
cpSync(path.join(frontendDir, "website-cards", built), packageFile);
// pnpm keeps a package file's contents by path, so drop the old copy
// and its lockfile entry before adding the new one.
const { dependencies } = JSON.parse(
  readFileSync(path.join(astroDir, "package.json"), "utf-8"),
);
if ("@home-assistant/website-cards" in dependencies) {
  run("npx", ["pnpm", "remove", "@home-assistant/website-cards"], astroDir);
}
for (const dir of readdirSync(path.join(astroDir, "node_modules/.pnpm"))) {
  if (dir.startsWith("@home-assistant+website-cards")) {
    rmSync(path.join(astroDir, "node_modules/.pnpm", dir), {
      recursive: true,
    });
  }
}
run(
  "npx",
  ["pnpm", "add", "file:website-cards/website-cards.tgz"],
  astroDir,
);

step(
  "Done. Commit astro/website-cards/website-cards.tgz and astro/pnpm-lock.yaml.",
);
