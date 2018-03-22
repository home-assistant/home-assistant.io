---
layout: page
title: "Handling states"
description: "Instructions on how to handle states with your component."
date: 2016-07-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

It is the responsibility of the component to maintain the states of the devices in your domain. Each device should be a single state and, if possible, a group should be provided that tracks the combined state of the devices.

A state can have several attributes that will help the frontend in displaying your state:

- `friendly_name`: this name will be used as the name of the device
- `entity_picture`: this picture will be shown instead of the domain icon
- `unit_of_measurement`: this will be appended to the state in the interface
- `hidden`: This is a suggestion to the frontend on if the state should be hidden

These attributes are defined in [homeassistant.helpers.entity](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/helpers/entity.py#L180).

