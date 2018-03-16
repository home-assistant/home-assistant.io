---
layout: page
title: "Light Group"
description: "Instructions for how to setup light groups within Home Assistant."
date: 2018-02-23 11:41
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_release: 0.65
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The group light platform lets you combine multiple lights into one entity. All child lights of a light group can still be used as usual, but controlling the state of the grouped light will forward the command to each child light.

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: group
    name: Kitchen Lights
    entities:
      - light.kitchen_ceiling_lights
      - light.kitchen_under_cabinet_lights
      - light.kitchen_spot_lights
      - light.pendant_lights
```

{% configuration %}
  name:
    description: The name of the light group. Defaults to "Light Group".
    required: false
    type: string
  entities:
    description: A list of entities to be included in the light group.
    required: true
    type: string list
{% endconfiguration %}

<p class='img'>
<img src='/images/components/light/group.png'>
Example of the light group "Kitchen Lights".
</p>

The supported features of all lights will be added together. For example, if you have one RGB light in a group of otherwise brightness-only lights, the light group will be shown with a color picker.
