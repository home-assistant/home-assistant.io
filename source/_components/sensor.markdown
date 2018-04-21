---
layout: page
title: "Sensor"
description: "Instructions on how to setup your sensors with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
---

Sensors are gathering information about states and conditions.

Home Assistant currently supports a wide range of sensors. They are able to display information which are provides by Home Assistant directly, are gathered from web services, and, of course, physical devices. Please check the sidebar for a full list of supported sensor platforms.

The way these sensors are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for sensors:

- **None**: Generic on/off. This is the default and doesn't need to be set.
- **battery**: Percentage of battery that is left
- **humidity**: Percentage of humidity in the air
- **temperature**: Temperature in °C or °F.
