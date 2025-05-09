---
title: Nice G.O.
description: Control Nice G.O. garage doors
ha_release: '2024.9'
ha_category:
  - Cover
  - Event
  - Light
  - Switch
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: nice_go
ha_platforms:
  - cover
  - diagnostics
  - event
  - light
  - switch
ha_integration_type: hub
---

The **Nice G.O.** {% term integration %} is used to integrate with [Nice/Linear](https://linear-solutions.com/) and [Mighty Mule](https://mightymule.com/) products.
This integration is used for garage doors and gate openers created by these companies.

Device names in Home Assistant are generated based on the names defined in your Nice G.O. mobile app.

## Prerequisites

Make sure you have a working account with the Nice G.O. app and have your email and password ready.

{% include integrations/config_flow.md %}

## Cover

Garage doors linked to your Nice G.O. account will appear as covers.

## Event

The barrier obstructed event entity will be triggered whenever the barrier gets obstructed. This could be triggered by anything that results in the closure being unsuccessful. This may include beam block during closure, beam block before closure, and an object in the way.

## Light

Lights on your garage door will appear as lights.

## Switch

A switch for turning vacation mode on and off will be made available for each device. Vacation mode prevents the operation of the door from physical control points such as a wall station, wireless keypad, remote control, or HomeLink. It can still be controlled from Home Assistant.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
