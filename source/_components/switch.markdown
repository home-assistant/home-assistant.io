---
layout: component
title: "Switches"
description: "Instructions how to setup your switches with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
---

Keeps track which switches are in your environment, their state and allows you to control them.

 * Maintains a state per switch and a combined state `all_switches`.
 * Registers services `switch/turn_on` and `switch/turn_off` to control switches.

Optional service data:

 - `entity_id` - only act on specific switch. Else targets all.

