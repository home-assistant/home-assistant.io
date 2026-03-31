# Contributing

Thanks for contributing to the Home Assistant website. This guide helps you set up locally, create a branch, and open a pull request.

For the full documentation style and process, refer to the Home Assistant developer docs:

- https://developers.home-assistant.io/docs/documenting/

## Prerequisites

- Ruby (see `.ruby-version`)
- Bundler (`gem install bundler`)
- Node.js (see `.nvmrc`)
- npm (included with Node.js)

## Local setup

1. Fork this repository and clone your fork.
2. Install Ruby dependencies:

```bash
bundle install
```

3. Install Node.js dependencies:

```bash
npm install
```

4. Generate and preview the site:

```bash
bundle exec rake generate
bundle exec rake preview
```

5. Open the local preview at `http://127.0.0.1:4000`.

## Branch naming

Use a short, descriptive branch name. Examples:

- `docs/readme-prerequisites`
- `docs/integration-clarify-prerequisites`
- `fix/rake-preview-error-handling`

## Pull request guidelines

1. Keep each pull request focused on one logical change.
2. Use a clear title in imperative style, like `docs: clarify README setup steps`.
3. Explain what you changed and why in the pull request description.
4. Link related issues when applicable.
5. Update documentation and examples when behavior or contributor steps change.
6. Ensure checks pass before requesting review.

## Commit message guidance

Use concise, scoped commit messages. Examples:

- `docs: add prerequisites to README`
- `docs: add local contributing guide`
- `fix: improve preview startup error handling`

## Code of conduct and license

By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
