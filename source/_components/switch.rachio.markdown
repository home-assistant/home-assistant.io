---
layout: page
title: "Rachio Switch"
description: "Instructions on how to use Rachio switches with Home Assistant."
date: 2018-06-23 16:09
sidebar: true
comments: false
sharing: true
footer: true
logo: rachio.png
ha_category: Irrigation
ha_iot_class: "Cloud Push"
ha_release: 0.46
---

The `rachio` switch platform allows you to toggle zones connected to your [Rachio irrigation system](http://rachio.com/) on and off.

Once configured, a switch will be added for every zone that is enabled on every controller in the account provided, as well as a switch to toggle each controller's standby mode.

They will be automatically added if the [Rachio component](/components/rachio/) is loaded.

## {% linkable_title Examples %}

In this section, you find some real-life examples of how to use this switch.

### {% linkable_title `groups.yaml` example %}

```yaml
irrigation:
  name: Irrigation
  icon: mdi:water-pump
  view: true
  entities:
  - group.zones_front
  - group.zones_back
  - switch.side_yard

zones_front:
  name: Front Yard
  view: false
  entities:
  - switch.front_bushes
  - switch.front_yard

zones_back:
  name: Back Yard
  view: false
  entities:
  - switch.back_garden
  - switch.back_porch
```
