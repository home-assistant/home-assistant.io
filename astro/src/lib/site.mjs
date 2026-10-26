// Site-wide data shared with the Jekyll build: settings from the
// repository's _config.yml, the latest release (for the header's
// version badge).
//
// _config.yml is read with a deliberately small reader instead of a
// YAML package (see the ground rules in astro/README.md): it supports
// the plain `key: value` scalars and nested maps of scalars that the
// settings below use, and nothing else. Read a setting through
// `setting("social.twitter.account")`.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "..");

function readConfig() {
  const config = {};
  const parents = [];
  const lines = fs.readFileSync(path.join(root, "_config.yml"), "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^( *)([\w-]+):(?:\s+(.*?))?\s*$/);
    if (!match || lines[i].trimStart().startsWith("#")) continue;
    const [, indent, key, value] = match;
    while (parents.length && parents.at(-1).indent >= indent.length) parents.pop();
    const target = parents.length ? parents.at(-1).map : config;
    if (/^[>|][+-]?$/.test(value ?? "")) {
      // Block scalar: the more indented lines below, folded (>) into
      // one line or kept as lines (|).
      const block = [];
      while (i + 1 < lines.length && (lines[i + 1].trim() === "" || lines[i + 1].search(/\S/) > indent.length)) {
        block.push(lines[++i].trim());
      }
      target[key] = block.join(value.startsWith(">") ? " " : "\n").trim();
    } else if (value === undefined) {
      target[key] = {};
      parents.push({ indent: indent.length, map: target[key] });
    } else {
      target[key] = value.replace(/^(["'])(.*)\1$/, "$2");
    }
  }
  return config;
}

const config = readConfig();

export function setting(name) {
  return name.split(".").reduce((value, key) => value?.[key], config);
}

// The newest post in the "Core" category, as Jekyll's
// `site.categories['Core'].first`: post file names start with their
// date, so the newest Core post is the last one in name order.
function latestReleasePost() {
  const dir = path.join(root, "source/_posts");
  const files = fs.readdirSync(dir).filter((file) => /^\d{4}-\d\d-\d\d-.+\.(markdown|md)$/.test(file));
  for (const file of files.sort().reverse()) {
    const frontMatter = fs.readFileSync(path.join(dir, file), "utf8").split(/^---$/m)[1] ?? "";
    if (!/^categories:(?:.*\bCore\b|(?:\n\s+-\s.*)*\n\s+-\s+Core\s*$)/m.test(frontMatter)) continue;
    const [, year, month, day, slug] = file.match(/^(\d{4})-(\d\d)-(\d\d)-(.+)\.\w+$/);
    return `/blog/${year}/${month}/${day}/${slug}/`;
  }
}

export const release = {
  version: ["current_major_version", "current_minor_version", "current_patch_version"]
    .map(setting)
    .join("."),
  releasedOn: setting("date_released"),
  url: latestReleasePost(),
};

// Deploy details from Netlify's build environment, as Jekyll's
// `site.netlify` (plugins/environment_variables.rb), with the same
// fallbacks for local builds. Like that plugin, it reads the lowercase
// `context` variable.
const repositoryUrl = (
  process.env.REPOSITORY_URL ?? "https://github.com/home-assistant/home-assistant.io"
).replace(/^git@github\.com:/, "https://github.com/");

let deployUrl = setting("url");
if (process.env.context === "production") deployUrl = process.env.URL ?? deployUrl;
else if (process.env.context === "branch-deploy") deployUrl = process.env.DEPLOY_URL ?? deployUrl;

export const netlify = {
  repositoryUrl,
  branch: process.env.BRANCH ?? "current",
  head: process.env.HEAD ?? "current",
  url: deployUrl.replace(/\/$/, ""),
};
