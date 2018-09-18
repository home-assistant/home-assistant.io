---
layout: page
title: "KNX Scene"
description: "Instructions on how to integrate KNX Scenes into Home Assistant."
date: 2018-02-03 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Scene
ha_release: "0.63"
---

The `knx` scenes platform allows you to trigger [KNX](http://www.knx.org) scenes.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

## {% linkable_title Configuration %}

To use your KNX scence in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    platform: knx
    address: 8/8/8
    scene_number: 23
```

Configuration variables:

- **address** (*Required*): KNX group address of the binary sensor.
- **scene_number** (*Required*): Zero-indexed KNX scene number to be activated.
- **name** (*Optional*): A name for this device used within Home Assistant.

