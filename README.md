[![Discord](https://img.shields.io/discord/330944238910963714.svg)](https://www.home-assistant.io/join-chat/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[![Deploys by netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)](https://www.netlify.com)

# Home Assistant website

This is the source for the [Home-Assistant.io website](https://home-assistant.io).

## Access

You can access the site at the following URLs, depending on the target branch:

- **Production** (`current` branch): https://www.home-assistant.io
- **Beta** (`rc` branch): https://rc.home-assistant.io
- **Development** (`next` branch): https://next.home-assistant.io

Additionally, Netlify provides a preview deployment for every pull request, linked in the first PR comment.

## Prerequisites

- Ruby (see `.ruby-version` for required version)
- Bundler: `gem install bundler`
- Node.js (see `.nvmrc` for required version)
- npm: comes with Node.js

## Setup

Setting up to contribute to documentation and the process for submitting pull requests is explained in the [developer documentation](https://developers.home-assistant.io/docs/documenting/).

## README translations

Translations of the README are available in `README.translations.md`.
The file currently includes English, Spanish, and French sections.

## Language selector in the site navigation

The site header now includes a language dropdown with English, Spanish, and French options.

- Use the dropdown in the top navigation to switch language labels.
- Your selection is stored in local browser storage and reused on your next visit.
- The feature currently translates top-level navigation labels.

## Site preview

To make the preview available on `http://127.0.0.1:4000`, follow these steps using [Bundler](https://bundler.io/):

> **Note:** The first time you run `bundle exec rake preview`, Jekyll will perform a full initial build before the server starts.
> This may take up to 2 minutes.
> Subsequent file changes will trigger fast incremental rebuilds automatically.

## How to build the project

1. Install Ruby gems:

```bash
bundle install
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the local preview server:

```bash
bundle exec rake preview
```

If the preview is not running on your local machine, pass the IP of the target machine from where it should be served as a parameter, i.e. to access on `http://192.168.0.123:4000`:

```bash
bundle exec rake preview[192.168.0.123]
```

## Speeding up site generation

Every release we post long changelogs to the website. This slows down generation of the website significantly! We include some tools to temporarily exclude the blog posts that you're not working on out of the way.

```bash
bundle exec rake isolate[filename-of-blogpost]
```

When you're done working on the site, run the following command to move the posts back again:

```bash
bundle exec rake integrate
```

[![Home Assistant - A project from the Open Home Foundation](https://www.openhomefoundation.org/badges/home-assistant.png)](https://www.openhomefoundation.org/)
