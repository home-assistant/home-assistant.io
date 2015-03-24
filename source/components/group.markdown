---
layout: page
title: "Group support"
description: "Instructions how to setup groups within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

Groups allow the user to combine multiple entities into 1. If all entities are switches or lights they can be controlled as one.

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
