---
layout: page
title: "Presenting your add-on"
description: "Details on how to present your Hass.io add-on."
date: 2018-01-24 22:15
sidebar: true
comments: false
sharing: true
footer: true
---

If you decide to share your add-on to the public, paying attention to details is recommended. Of course, your add-on should have a proper name and description, but Hass.io also gives you some other tools to present your add-on even nicer.

## {% linkable_title Adding documentation %}

Good documentation helps the consumer of your add-on to understand its usage, explains configuration options, points users in the right direction in the case they have questions or issues, and contains the license under which the add-on was published.

This file containing the documentation is usually referred to as the "README", which is generally published as the `README.md` file.

Take a look at other projects for inspiration. For example, see the `README.md` of the [Community Hass.io Add-ons: Homebridge](https://github.com/hassio-addons/addon-homebridge/blob/master/README.md) add-on.

In future versions of Hass.io, the `README.md` file will be displayed in the Home Assistant frontend.

## {% linkable_title Add-on icon & logo %}

A picture is worth a thousand words. Therefore, your add-on can be improved by adding a proper image icon and logo. Those images are used when showing your add-on in the Home Assistant Hass.io panel and which will significantly improve the visual representation of your add-on.

Requirements for the logo of your add-on:

- The logo must be in the Portable Network Graphics format (`.png`).
- The filename must be `logo.png`.
- It is recommended to keep the logo size around 250x100px. You may choose to use a different size or aspect ratio as you seem fit for your add-on.

Requirements for the icon of your add-on:

- The icon must be in the Portable Network Graphics format (`.png`).
- The filename must be `icon.png`.
- The aspect ratio of the icon must be 1x1 (square).
- It is recommended to use an icon size of 128x128px.

## {% linkable_title Keeping a changelog %}

It is likely you are going to release newer versions of your add-on in the future. In case that happens, the users of your add-on would see an upgrade notice and probably want to know what changes were made in the latest version.

A changelog is a file which contains a curated, chronologically ordered list of notable changes for each version of your add-on and is generally published as the `CHANGELOG.md` file.

If you are in need of a guide on keeping a changelog, we would recommend checking the [keep a changelog](http://keepachangelog.com) website. They have developed a standard that is used by many opensource projects around the world.

In future versions of Hass.io, the `CHANGELOG.md` file will be displayed in the Home Assistant frontend.
