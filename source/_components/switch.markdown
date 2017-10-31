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

Go to the **Developer Tools**, then to **Call Service** in the frontend, and choose 
`switch/turn_on`, `switch/turn_off` or `switch/toggle` from the list of available services (**Available services:** on the left). 
Enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{"entity_id":"livingroom_pin2"}
```

### {% linkable_title `switch.turn_on` and `switch.turn_off` services %}

Turns on/off one or multiple switches using [groups]({{site_root}}/components/group/).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on specific switch. Else targets all.

### {% linkable_title `switch.toggle` service %}

Toggles the state of one or multiple switches using [groups]({{site_root}}/components/group/).

*Note*: If `switch.toggle` is used for a group of switches and no `state` attribute defined, it will toggle the individual state of each switch.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on specific switch. Else targets all.
| `state`                |      yes | State to be set for switches. Either `on` or `off`.
