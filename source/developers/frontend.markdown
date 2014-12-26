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

Home Assistant uses [Polymer](https://www.polymer-project.org/) for the frontend. Polymer allows building encapsulated and interoperable custom elements that extend HTML itself.

# Turning on development mode
Home Assistant will by default serve the compiled version of the frontend. To change it so that the components are served separately, update your `home-assistant.conf` to have these lines:

```
[http]
api_password=YOUR_PASSWORD
development=1
```

After turning on development mode, you will have to install the webcomponents that the frontend depends on. You can do this by running the `build_frontend` script.

<p class='note warning'>
Do not use development mode in production. Home Assistant uses aggresive caching to improve the mobile experience. This is disabled during development so that you do not have to restart the server in between changes.
</p>

# Building the frontend

To build the frontend you need to install node and the npm packages bower and vulcanize.

```bash
npm install -g bower vulcanize
```

After that you can run [`./build_frontend`](https://github.com/balloob/home-assistant/blob/master/build_frontend) from the project directory. This will take all the used webcomponents and 'vulcanize' it into a single file to be served by Home Assistant. The script also updates [`homeassistant/components/http/frontend.py`](https://github.com/balloob/home-assistant/blob/master/homeassistant/components/http/frontend.py) with an MD5 hash of the frontend.

# Adding new state cards

The main interface of Home Assistant is a list of current states in the State Machine. It will filter out the group states and offers options to filter by groups on the top.

Currently there are two supported card types:

 * Display: shows the state in the card
 * Toggle: allows the user to toggle a device on/off from its state

To add your own card type, follow the following steps:

 1. Adjust the cardType property of the State class in [home-assistant-api.html](https://github.com/balloob/home-assistant/blob/master/homeassistant/components/http/www_static/polymer/home-assistant-api.html) to return your new card type when appropriate.
 2. Create a new component following the naming convention state-card-CARDTYPE.html.
 3. Import your new component and add a template for it in [states-cards.html](https://github.com/balloob/home-assistant/blob/master/homeassistant/components/http/www_static/polymer/states-cards.html).




