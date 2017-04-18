---
layout: component
title: "Group"
description: "Instructions how to setup groups within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Organization
---

Groups allow the user to combine multiple entities into one.

Check the **Set State** page from the **Developer Tools** and browse the **Current entities:** listing for all available entities.


```yaml
# Example configuration.yaml entry
group:
  information:
    - sensor.time
  living_room:
    - binary_sensor.tv
    - sensor.living_room_temperature
  kitchen:
    - switch.kitchen_pin_3
    - sensor.oven_temperature
```

If all entities are switches or lights they can be controlled as one with a switch at the top of the card. Grouped states should share the same type of states (ON/OFF or HOME/NOT_HOME).

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.bowl
    - light.ceiling
    - light.tv_back_light
  children:
   - device_tracker.child_1
   - device_tracker.child_2
```

