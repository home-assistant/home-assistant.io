---
layout: page
title: "Adding more info dialogs"
description: "Adding a more info dialog to the frontend"
date: 2016-04-16 14:40 -07:00
sidebar: true
comments: false
sharing: true
footer: true
---

Whenever the user taps or clicks on one of the cards, a more info dialog will show. The header of this dialog will be the state card, followed by the history of this entity for the last 24 hours. Below this the more info component is rendered for that entity. The more info component can show more information or allow more ways of control.

<p class='img' style='max-width: 400px; margin-left: auto; margin-right: auto;'>
  <img src='/images/frontend/frontend-more-info-light.png'>
  The more info dialog for a light allows the user to control the color and the brightness.
</p>

The instructions to add a more info dialog are very similar to adding a new card type. This example will add a new more info component for the domain `camera`:

 1. Add `'camera'` to the array `DOMAINS_WITH_MORE_INFO` in the file [util/hass-util.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/util/hass-util.html#L24).
 2. Create the files `more-info-camera.html` in the folder [/more-infos](https://github.com/home-assistant/home-assistant-polymer/tree/master/src/more-infos).
 4. Add `<link rel="import" href="more-info-camera.html">` to [more-info-content.html](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/more-infos/more-info-content.html)
