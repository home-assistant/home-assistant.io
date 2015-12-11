---
layout: component
title: "Group"
description: "Instructions how to setup groups within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Organization
---

Groups allow the user to combine multiple entities into one. If all entities are switches or lights they can be controlled as one with a switch at the top of the card.

```yaml
# Example configuration.yaml entry
# A comma seperated list of states that have to be tracked as a single group
# Grouped states should share the same type of states (ON/OFF or HOME/NOT_HOME)
group:
  living_room:
    - light.Bowl
    - light.Ceiling
    - light.TV_back_light
  children:
   - device_tracker.child_1
   - device_tracker.child_2
```
