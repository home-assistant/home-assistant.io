# Migration guide from Jekyll to Hugo

This guide serves a log/handbook for the "big" migration.

During the development process, it keeps track of things that where done,
that need to be replayed on the final migration.

## 1. Cleanup Jekyll

Remove the files listed in these commits:

- <https://github.com/home-assistant/home-assistant.io/commit/f81551742cf67001aaab4e4d92ba70ba8e88694f>
- <https://github.com/home-assistant/home-assistant.io/commit/94172b8891b60ca6eb7a71fb904ddaf60c29e6f7>

## 2. Get in Hugo

Copy the following files from the `hugo` branch:

```text
archetypes/
i18n/
layouts/
resources/
static/css/
static/img/
static/js/
.editconfig
.eslintignore
.eslintrc.yml
.gitignore
.travis.yml
config.yaml
package.json
README.markdown
```

Create some folder structure:

```bash
mkdir -p /content/en
mkdir data
```

## 3. Move current content folders into their new locations

Lorem ipsum

