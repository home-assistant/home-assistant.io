---
layout: page
title: "Frontend development"
description: "Tips and hints if you are starting on Home Assistant frontend development"
date: 2014-12-21 13:32
sidebar: false
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

# {% linkable_title Adding state cards %}

The main interface of Home Assistant is a list of the current entities and their states. For each entity in the system, a state card will be rendered. State cards will show an icon, the name of the entity, when the state has last changed and the current state or a control to interact with it.

![Cards in the frontend](/images/frontend/frontend-cards1.png)

The different card types can be found [here](https://github.com/home-assistant/home-assistant-polymer/tree/master/src/state-summary).

Sensors, when not [grouped](/components/group/), are shown as so-called badges on top of the state cards.

![Badges in the frontend](/images/frontend/frontend-badges.png)

The different badges are located in the file [`/src/components/entity/ha-state-label-badge.js`](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/components/entity/ha-state-label-badge.js).

Adding a custom card type can be done with a few simple steps. For this example we will add a new state card for the domain `camera`:

 1. Add `'camera'` to the array `DOMAINS_WITH_CARD` in the file [/util/state-card-type.js](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/util/state-card-type.js#L3-L4).
 2. Create the files `state-card-camera.html` and `state-card-camera.js` in the folder [/state-summary/](https://github.com/home-assistant/home-assistant-polymer/tree/master/src/state-summary).
 3. Add `require('./state-card-camera')` to [state-card-content.js](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/state-summary/state-card-content.js).
 4. Add `<link rel="import" href="state-card-camera.html">` to [state-card-content.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/state-summary/state-card-content.html).

# {% linkable_title More info screens for custom types %}

Whenever the user taps or clicks on one of the cards, a more info dialog will show. The header of this dialog will be the state card, followed by the history of this entity for the last 24 hours. Below this the more info component is rendered for that entity. The more info component can show more information or allow more ways of control.

<p class='img' style='max-width: 400px; margin-left: auto; margin-right: auto;'>
  <img src='/images/frontend/frontend-more-info-light.png'>
  The more info dialog for a light allows the user to control the color and the brightness.
</p>

The instructions to add a more info dialog are very similar to adding a new card type. This example will add a new more info component for the domain `camera`:

 1. Add `'camera'` to the array `DOMAINS_WITH_MORE_INFO` in the file [util/state-more-info-type.js](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/util/state-more-info-type.js#L1).
 2. Create the files `more-info-camera.html` and `more-info-camera.js` in the folder [/more-infos](https://github.com/home-assistant/home-assistant-polymer/tree/master/src/more-infos).
 3. Add `require('./more-info-camera')` to [more-info-content.js](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/more-infos/more-info-content.js)
 4. Add `<link rel="import" href="more-info-camera.html">` to [more-info-content.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/more-infos/more-info-content.html)
