---
layout: page
title: "Create an add-on repository for Hass.io"
description: "Add-ons repositories."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Look to our example [repository](https://github.com/home-assistant/hassio-addons-example).

Add-ons repository can have multible add-ons with diferents folders or it can be a single add-on. It is importent that you add the json file to root.

Add a `repository.json` to the root of your git repository with:

```json
{
  "name": "Needed, Name of repository",
  "url": "http://www.example/addons",
  "maintainer": "HomeAssistant Team <info@home-assistant.io>"
}
```
