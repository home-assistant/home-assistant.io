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

Home Assistant uses [Polymer](https://www.polymer-project.org/) for the UI and [NuclearJS](http://optimizely.github.io/nuclear-js/) for maintaing the app state.

 * Polymer allows building encapsulated custom HTML elements.
   [Home-Assistant-Polymer source code on GitHub.](https://github.com/home-assistant/home-assistant-polymer)
 * NuclearJS is a reactive flux built with ImmutableJS data structures.
   [Home-Assistant-JS source code on GitHub.](https://github.com/home-assistant/home-assistant-js)

<p class='note warning'>
Do not use development mode in production. Home Assistant uses aggressive caching to improve the mobile experience. This is disabled during development so that you do not have to restart the server in between changes.
</p>

## {% linkable_title Setting up the environment %}

Home Assistant will by default serve the compiled version of the frontend. To enable development mode for Home Assistant, update your `configuration.yaml` to have these lines:

```yaml
http:
  development: 1
```

Next step is to get the frontend code. When you clone the Home Assistant repository, the frontend repository is not cloned by default. You can setup the frontend development environment by running:

```bash
$ script/setup
```

## {% linkable_title Development %}

While you are developing, you need to have webpack running to have your JavaScript changes be made available.

```bash
$ cd homeassistant/components/frontend/www_static/home-assistant-polymer
$ npm run js_dev
```

The source code for the frontend can be found in two different directories:

 - UI: `homeassistant/components/frontend/www_static/home-assistant-polymer/src/`
 - Core: `homeassistant/components/frontend/www_static/home-assistant-polymer/node_modules/home-assistant-js/src/`

After your changes have been accepted into the home-assistant-js repository, you'll have to update Home Assistant Polymer to use the latest version of it. This can be done by updating `package.json`. Look for the line that contains home-assistant-js and update the SHA to the SHA of the last commit.

# {% linkable_title Building the Polymer frontend %}

Building a new version of the frontend is as simple as running `script/build_frontend`. This fires off the following commands:

 * **home-assistant-polymer**: Install NPM dependencies.
 * **home-assistant-polymer**: start frontend build.
   * Compile all used JavaScript to `_app_compiled.js`.
   * Install Bower dependencies.
   * Vulcanize all Webcomponents to `frontend.vulcan.html`.
   * Minify `frontend.vulcan.html` and save it as `frontend.html`.
 * Copy the webcomponents polyfill `webcomponents-lite.min.js` from **home-assistant-polymer** to `components/frontend/www_static/webcomponents-lite.min.js`.
 * Copy the final frontend build `frontend.html` from **home-assistant-polymer** to `components/frontend/www_static/frontend/`.
 * Generate MD5 hash of `frontend.html` to signal caches to redownload the UI.

<p class='img'>
<img src='/images/frontend/polymer-build-architecture.png' alt='Polymer build architecture diagram' />
Polymer build architecture diagram
</p>
