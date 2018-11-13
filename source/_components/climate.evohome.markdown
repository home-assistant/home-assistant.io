---
layout: page
title: "Honeywell evohome CH/DHW system"
description: "Instructions on how to integrate a Honeywell evohome system with Home Assistant."
date: 2018-09-25 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Climate
ha_release: 0.80
ha_iot_class: "Cloud Polling"
---

The `evohome` climate platform integrates your _EU-based_ [Honeywell Connect Comfort](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW system into Home Assistant, enabling integration with its Controller (since v0.80), and its Zones (since v0.8x).

This component is related to the honeywell climate component](/components/climate.honeywell/), which allows more limited integration with evohome heating Zones (only). These two components should be usable side-by-side but YMMV, and beware API rate limits.

Although the evohome evotouch Controller supports seven distinct modes (e.g. DayOff), only the standard HA operating modes are supported: `Eco` (AutoWithEco), and `Off` (HeatingOff), and `Auto` (all other evohome modes). `Away` mode is supported separately in the HA fashion.

Note that evohome Zones 'inherit' their operating mode from their Controller is thay are in FollowSchedule mode.

The actual operating mode and all other features reported by the client API (e.g. activeFaults) are tracked/reported via `device_state_attributes`.

Support for a DHW controller will be added in the future.

<p class='note'>
Full configuration details can be found on the main [evohome component](/components/evohome/) page.
</p>
