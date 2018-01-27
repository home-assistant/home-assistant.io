---
layout: page
title: "Frontend development"
description: "Tips and hints if you are starting on Home Assistant frontend development"
date: 2014-12-21 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant is built on top of the [Polymer](https://www.polymer-project.org/) webcomponents framework. Polymer allows building encapsulated custom HTML elements. [Home-Assistant-Polymer source code on GitHub.][hass-polymer]

<p class='note warning'>
Do not use development mode in production. Home Assistant uses aggressive caching to improve the mobile experience. This is disabled during development so that you do not have to restart the server in between changes.
</p>

## {% linkable_title Setting up the environment %}

<p class='note'>
All commands below need to be run from inside the home-assistant-polymer repository.
</p>

Home Assistant will by default serve the compiled version of the frontend from the hass_frontend Python package. For development you want to work with the unbundled source files which are in the home-assistant-polymer repository.

First step is to configure Home Assistant to use the development mode for the frontend. Do this by updating the frontend config in your `configuration.yaml` and set the path to the polymer repo:

```yaml
frontend:
  development_repo: <absolute path to home-assistant-polymer>
```

Next step is to git clone the [home-assistant-polymer repository][hass-polymer]. You can place the repository anywhere on your system but to keep these instructions simple we're cloning the home-assistant-polymer repository as a sibling to the Home Assistant repo.

```bash
$ git clone https://github.com/home-assistant/home-assistant-polymer.git
$ cd home-assistant-polymer
```

After cloning, your folder structure should look like this:

```text
/home-assistant
/home-assistant-polymer
```

Node.js is required to build the frontend. The preferred method of installing node.js is with [nvm](https://github.com/creationix/nvm). Install nvm using the instructions in the [README](https://github.com/creationix/nvm#install-script), and install the correct node.js by running the following command:

```bash
$ nvm install node
```

[Yarn](https://yarnpkg.com/en/) is used as the package manager for node modules. [Install yarn using the instructions here.](https://yarnpkg.com/en/docs/install)

Next, development dependencies need to be installed to bootstrap the frontend development environment. First activate the right Node version and then download all the needed modules and do a first build:

```bash
$ nvm use
$ script/bootstrap
```

This script will use yarn and bower to install all the necessary dependencies necessary for development and do an initial build.

### {% linkable_title Creating pull requests %}

If you're planning on issuing a PR back to the Home Assistant codebase you need to fork the polymer project and add your fork as a remote to the Home Assistant Polymer repo.

```bash
$ git remote add <remote name> <github URL to your fork>
```

When you've made your changes and are ready to push them change to the working directory for the polymer project and then push your changes

``` bash
$ git add -A
$ git commit -m "Added new feature X"
$ git push -u <remote name> HEAD
```

## {% linkable_title Development %}

If you are changing `html` files under `/src` or `/panels` - just reload the page in your browser to see changes.
If you are changing javascript files under `/js` you need to have gulp running to watch the source files for changes and build when necessary.

```bash
$ yarn run dev-watch
```

The source code for the frontend can be found in different directories:

 - UI: `/home-assistant-polymer/src/`
 - Panels: `/home-assistant-polymer/panels/`
 - Javascript code: `/home-assistant-polymer/js/`

# {% linkable_title Building the Polymer frontend %}

Building a new version of the frontend is as simple as running `script/build_frontend`.
To use a built version package it: `python setup.py sdist`
Install it: `pip3 install dist/home-assistant-frontend-xxxxxxxx.0.tar.gz --upgrade`
Run Home Assistant without trying to reinstall production package: `hass --skip-pip`

[hass-polymer]: https://github.com/home-assistant/home-assistant-polymer
