---
layout: page
title: "Hunter Douglas Powerview Scenes"
description: "Instructions how to setup Powerview scenes within Home Assistant."
date: 2016-03-11 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hunter-douglas-powerview.png
ha_category: Organization
---

Implements the Hunter Douglas Powerview platform scene control.
It queries the Powerview Hub and HASS displays them as scenes.

Scenes can be activated using the service `scene.turn_on`.

```yaml
# Example configuration.yaml entry
scene:
  - platform: hunterdouglas_powerview
    address: <powerview hub ip address>