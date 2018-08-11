---
layout: page
title: "Tesla Switch"
description: "Instructions on how to integrate Tesla switches into Home Assistant."
date: 2018-04-14 14:20
sidebar: true
comments: false
sharing: true
footer: true
logo: tesla.png
ha_category: Switch
ha_iot_class: "Cloud Push"
ha_release: 0.54
---

The `Tesla` platform allows you to control your [Tesla](https://www.tesla.com/) charger (enable/disable charging, max range switch, enable polling updates) from within Home Assistant.  These switches allow starting and stopping charging, setting charging for maximum range, and turning off updates which may prevent a vehicle from sleeping to conserve powers.  Toggling the Update Switch takes effect for the next scheduled update and does not immediately perform an update when toggled.

The switch platform will be automatically configured if Tesla component is configured.

For more configuration information see the [Tesla component](/components/tesla/) documentation.
