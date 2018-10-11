---
layout: page
title: "Sous-vide Cookers"
description: "Instructions on how to setup and use sous-vide in Home Assistant."
date: 2018-07-29 15:00
sidebar: true
comments: false
sharing: true
footer: true
---

The `sous_vide` component enables the ability to control sous_vide cookers within Home Assistant.

To use this component in your installation, add a `sous_vide` platform to your `configuration.yaml` file, like the [Anova](/components/sous_vide.anova/).

```yaml
# Example configuration.yaml entry
sous_vide:
  - platform: anova
    name: My cooker
    mac: 11:22:33:44:55:66
```

### {% linkable_title Component services %}

Available services: `turn_on`, `turn_off`, and `set_temperature`.

#### {% linkable_title Service `sous_vide.turn_on` %}

Turns on the cooker and begins heating to the target temperature.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific cooker. Else targets all.        |

#### {% linkable_title Service `sous_vide.turn_off` %}

Turns off the cooker and stops heating.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific cooker. Else targets all.        |

#### {% linkable_title Service `sous_vide.set_temperature` %}

Sets the target temperature of the cooker.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific cooker. Else targets all.        |
| `entity_id`               |       no | Target temperature to set.  Units depend on the cooker's unit_of_measurement.        |
