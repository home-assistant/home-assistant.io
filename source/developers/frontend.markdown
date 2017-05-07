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

Home Assistant is built on top of the [Polymer](https://www.polymer-project.org/) webcomponents framework. Polymer allows building encapsulated custom HTML elements. [Home-Assistant-Polymer source code on GitHub.](https://github.com/home-assistant/home-assistant-polymer)

<p class='note warning'>
Do not use development mode in production. Home Assistant uses aggressive caching to improve the mobile experience. This is disabled during development so that you do not have to restart the server in between changes.
</p>

## {% linkable_title Setting up the environment %}

Home Assistant will by default serve the compiled version of the frontend. As everything is compiled into the file `frontend.html` you do not want to work with the compiled version but with the separate files during development. To enable development mode for Home Assistant, update your `configuration.yaml` to have these lines:

```yaml
http:
  development: 1
```

Node.js is required to setup the frontend development environment. The preferred method of installing node.js is [nvm](https://github.com/creationix/nvm). Install nvm using the instructions in the [README](https://github.com/creationix/nvm#install-script), and install the correct node.js by running the following command from the `home-assistant-polymer` directory:

```bash
$ cd homeassistant/components/frontend/www_static/home-assistant-polymer
$ nvm install < .nvmrc
```

[Yarn](https://yarnpkg.com/en/) is used as the package manager for node modules. [Install yarn using the instructions here.](https://yarnpkg.com/en/docs/install)

Next step is to get the frontend code. When you clone the Home Assistant repository, the frontend repository is not cloned by default. You can setup the frontend development environment by running from the `home-assistant` directory:

```bash
$ script/bootstrap_frontend
```

This script will update the git submodule for the polymer project in 

`home-assistant/homeassistant/components/frontend/www_static/home-assistant-polymer`. 

If you're planning on issuing a PR back to the Home Assistant codebase you need to fork the polymer project and add your fork as a remote.

```bash
$ cd homeassistant/components/frontend/www_static/home-assistant-polymer
$ git remote add <remote name> <github URL to your fork>
```

When you've made your changes and are ready to push them change to the working directory for the polymer project and then push your changes

``` bash
$ cd homeassistant/components/frontend/www_static/home-assistant-polymer
$ git push -u <remote name> HEAD
```

## {% linkable_title Development %}

While you are developing, you need to have Rollup running to have changes you make to the JavaScript app-core made available.

```bash
$ cd homeassistant/components/frontend/www_static/home-assistant-polymer
$ npm run js_dev
```

The source code for the frontend can be found in two different directories:

 - UI: `homeassistant/components/frontend/www_static/home-assistant-polymer/src/`
 - Panels: `homeassistant/components/frontend/www_static/home-assistant-polymer/panels/`

# {% linkable_title Building the Polymer frontend %}

Building a new version of the frontend is as simple as running `script/build_frontend`. This fires off the following commands:

 * **home-assistant-polymer**: Install NPM dependencies.
 * **home-assistant-polymer**: start frontend build.
   * Compile all used JavaScript.
   * Install Bower dependencies.
   * Vulcanize and minify the core and panel sources to build dir.
 * Copy the webcomponents polyfill `webcomponents-lite.min.js` from **home-assistant-polymer** to `components/frontend/www_static/webcomponents-lite.min.js`.
 * Copy the final frontend build `frontend.html` and panel sources from **home-assistant-polymer** to `components/frontend/www_static/frontend/`.
 * Generate MD5 hashes of core and panel sources.
 * Create gzip versions of all the sources.
