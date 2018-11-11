---
layout: page
title: "SCSGate Cover"
description: "Instructions on how to integrate SCSGate motorized devices into Home Assistant."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: bus_scs.png
ha_category: Cover
ha_iot_class: "Local Polling"
---

The SCSGate devices can control motorized covers connected to the BTicino MyHome system.

To enable SCSGate covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: scsgate
    devices:
      living_room:
        name: Living Room
        scs_id: XXXXX
```

{% configuration %}
devices:
  description: A list of devices.
  required: true
  type: list
  keys:
    slug:
      description: Slug of the device.
      required: true
      type: list
      keys:
        name:
          description: Name to use in the frontend.
          required: true
          type: string
        scs_id:
          description: The ID of your SCSGate device.
          required: true
          type: string
{% endconfiguration %}

<p class='note'>
**Known limitation:** It is not possible to know the current state of the cover.
</p>
