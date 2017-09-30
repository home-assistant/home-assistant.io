---
layout: page
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
 * Registers services `switch/turn_on`, `switch/turn_off`, and `switch/toggle` to control switches.

### {% linkable_title Use the services %}

Go the **Developer Tools**, then to **Call Service** in the frontend, and choose `switch/turn_on` or `switch/turn_off` from the list of available services (**Available services:** on the left). Enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{"entity_id":"livingroom_pin2"}
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on specific switch. Else targets all.
