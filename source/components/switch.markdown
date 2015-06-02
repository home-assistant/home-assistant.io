---
layout: page
title: "Switches"
description: "Instructions how to setup your switches with Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

Keeps track which switches are in the network, their state and allows you to control them.

 * Maintains a state per switch and a combined state `all_switches`.
 * Registers services `switch/turn_on` and `switch/turn_off` to control switches.

Optional service data:

 - `entity_id` - only act on specific switch. Else targets all.

Supported platforms:

 * `wemo` for Belkin WeMo switches
 * `tellstick` for Tellstick switches
