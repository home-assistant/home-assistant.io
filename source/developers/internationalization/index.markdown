---
layout: page
title: "Internationalization"
description: "Home Assistant internationalization summary"
date: 2018-03-01 18:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.64
---

The Home Assistant internationalization project includes preparing platforms and the frontend for localization, as well as the actual translation of localized strings.

Some compmonents and platforms will have strings that need to be localized specifically for that platform. These strings are managed in the core [home-assistant](https://github.com/home-assistant/home-assistant) repository. The Home Assistant backend will serve strings to the clients based on the loaded components in the running instance.

There are also localizable strings that exist only on the frontend. These strings are managed in the [home-assistant-polymer](https://github.com/home-assistant/home-assistant-polymer) repository. These strings are stored with the frontend and don’t depend on the backend configuration.

Our strings are translated by the community using the online translation tool [Lokalise](https://lokalise.co/).
