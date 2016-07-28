---
layout: page
title: "Adding state card"
description: "Adding a state card to the frontend"
date: 2016-04-16 14:40 -07:00
sidebar: true
comments: false
sharing: true
footer: true
---

The main interface of Home Assistant is a list of the current entities and their states. For each entity in the system, a state card will be rendered. State cards will show an icon, the name of the entity, when the state has last changed and the current state or a control to interact with it.

![Cards in the frontend](/images/frontend/frontend-cards1.png)

The different card types can be found [here](https://github.com/home-assistant/home-assistant-polymer/tree/master/src/state-summary).

Sensors, when not [grouped](/components/group/), are shown as so-called badges on top of the state cards.

![Badges in the frontend](/images/frontend/frontend-badges.png)

The different badges are located in the file [`/src/components/entity/ha-state-label-badge.html`](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/components/entity/ha-state-label-badge.html).

Adding a custom card type can be done with a few simple steps. For this example we will add a new state card for the domain `camera`:

 1. Add `'camera'` to the array `DOMAINS_WITH_CARD` in the file [/util/hass-util.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/util/hass-util.html#L11).
 2. Create the files `state-card-camera.html` in the folder [/state-summary/](https://github.com/home-assistant/home-assistant-polymer/tree/master/src/state-summary).
 4. Add `<link rel="import" href="state-card-camera.html">` to [state-card-content.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/state-summary/state-card-content.html).
