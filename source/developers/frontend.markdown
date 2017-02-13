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

Home Assistant uses [Polymer](https://www.polymer-project.org/) for the UI and [NuclearJS](http://optimizely.github.io/nuclear-js/) for maintaining the app state.

 * Polymer allows building encapsulated custom HTML elements.
   [Home-Assistant-Polymer source code on GitHub.](https://github.com/home-assistant/home-assistant-polymer)
 * NuclearJS is a reactive flux built with ImmutableJS data structures.
   [Home-Assistant-JS source code on GitHub.](https://github.com/home-assistant/home-assistant-js)

<p class='note warning'>
Do not use development mode in production. Home Assistant uses aggressive caching to improve the mobile experience. This is disabled during development so that you do not have to restart the server in between changes.
</p>

## {% linkable_title Setting up the environment %}

Home Assistant will by default serve the compiled version of the frontend. As everything is compiled into the file `frontend.html` you do not want to work with the compiled version but with the separate files during development. To enable development mode for Home Assistant, update your `configuration.yaml` to have these lines:

```yaml
http:
  development: 1
```

Node.js is required to setup the frontend development environment. The preferred method of installing node.js is [nvm](https://github.com/creationix/nvm). Install nvm using the instructions in the [README](https://github.com/creationix/nvm#install-script), and install node.js by running the following command:

```bash
$ nvm install node
```
Next step is to get the frontend code. When you clone the Home Assistant repository, the frontend repository is not cloned by default. You can setup the frontend development environment by running:

```bash
$ script/setup
```

## {% linkable_title Development %}

While you are developing, you need to have Rollup running to have your JavaScript changes be made available.

```bash
$ cd homeassistant/components/frontend/www_static/home-assistant-polymer
$ npm run js_dev
```

The source code for the frontend can be found in three different directories:

 - UI: `homeassistant/components/frontend/www_static/home-assistant-polymer/src/`
 - Core: `homeassistant/components/frontend/www_static/home-assistant-polymer/home-assistant-js/src/`
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
