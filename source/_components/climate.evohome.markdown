---
layout: page
title: "Honeywell evohome CH/DHW Controller"
description: "Instructions on how to integrate a Honeywell evohome controller with Home Assistant."
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

The `evohome` climate platform integrates your _EU-based_ [Honeywell Connect Comfort](https://international.mytotalconnectcomfort.com/Account/Login) CH/DHW controller into Home Assistant, enabling control of its operating mode.

It is related to the honeywell climate component](/components/climate.honeywell/), which allows limited integration with evohome Heating zones.  These two components should be usuable side-by-side, but YMMV.

The evohome evotouch controller supports seven distict modes: Auto, AutoWithEco, Away, DayOff, HeatingOff, and Custom; AutoWithReset is a 7th, hidden, mode.

Currently, only the standard HA operating modes are supported: 'Eco' (AutoWithEco), and 'Off' (HeatingOff), and 'Auto' (all other evohome modes). 'Away' (Away) mode is supported separately.

The actual operating modes are tracked/reported via `device_state_attributes`.

<p class='note'>
Full configuration details can be found on the main [evohome component](/components/evohome/) page.
</p>
