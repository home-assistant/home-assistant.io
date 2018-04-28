---
layout: page
title: "Lagute LW-12"
description: "Instructions on how to setup Lagute LW-12 Wifi LED controller within Home Assistant."
date: 2018-04-28 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
logo: lagute.png
ha_release: 0.69
---

The `lw12wifi` light platofrm supports Lagute LW-12 Wifi LED controller.

## {% linkable_title Configuration %}

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: decora
    host: IP_ADDRESS_CONTROLLER
```

{% configuration %}
host:
  description: Host name or IP of LW-12 LED stripe to control.
  required: true
  type: string
port:
  description: Some firmware versions of the LW-12 controller listen on different ports.
  required: false
  type: int
  default: 5000
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: LW-12 FC
transistion:
  description: "Transition speed for effects (Value: 0-255)."
  required: false
  type: int
  default: 128
brightness:
  description: "LED Brightness (Value: 0-255)."
  required: false
  type: string
  default: 255
rgb:
  description: RGB value array as standard color to set.
  required: false
  type: list
  default: [255, 255, 255]
{% endconfiguration %}

