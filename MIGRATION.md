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

The big move:

```bash
git mv source/static/images static/images

git mv source/_addons content/en/addons
git mv source/addons/index.html content/en/addons/index.html

git mv source/_components content/en/components
git mv source/components/* content/en/components

git mv source/_cookbook content/en/cookbook
git mv source/cookbook/* content/en/cookbook

git mv source/_docs content/en/docs
git mv source/docs/* content/en/docs

git mv source/_faq content/en/faq
git mv source/faq/*   content/en/faq

git mv source/_lovelace content/en/lovelace
git mv source/lovelace/* content/en/lovelace

git mv source/_posts content/en/blog
git mv source/cloud content/en/cloud
git mv source/code_of_conduct content/en/code_of_conduct
git mv source/demo content/en/demo
git mv source/developers content/en/developers
git mv source/getting-started content/en
git mv source/hassio content/en/hassio
git mv source/help content/en/help
git mv source/join-chat content/en/join-chat
git mv source/latest-release-notes content/en/latest-release-notes
git mv source/privacy content/en/privacy
git mv source/tos content/en/tos
```

Rename some indexes:

```bash
git mv content/en/getting-started/index.markdown content/en/getting-started/_index.markdown
git mv content/en/components/index.html content/en/components/_index.html
git mv content/en/docs/index.markdown content/en/docs/_index.markdown
```

## 4. Content fixes

**Note**: In case your are running Hugo in watch mode, the following command WILL crash it.

Replace all `linkable_title` headers:

```bash
find content -type f -exec sed -i "s/{\% linkable_title \(.*\) \%}/\1/" {} +
```

Remove `{{ site_root }}`:

```bash
find content -type f -exec sed -i "s/{{.*site_root.*}}//" {} +
```

Remove `{% raw %}` and `{% endraw %}`:

```bash
find content -type f -exec sed -i "s/{\%.*raw.*\%}//"  {} +
find content -type f -exec sed -i "s/{\%.*endraw.*\%}//"  {} +
```

## 5. Cleanup

```bash
rm -fr source/addons
rm -fr source/components
rm -fr source/cookbook
rm -fr source/docs
rm -fr source/faq
rm -fr source/lovelace
```

## Other notes

Lorem ipsum
