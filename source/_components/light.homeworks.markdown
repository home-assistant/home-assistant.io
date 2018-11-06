---
layout: page
title: "Homeworks Light"
description: "How to use Lutron Homeworks Series 4 & 8 lights."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Light
featured: false
ha_release: 0.01
ha_iot_class: "Local Polling"
---

To enable this sensor, you first have to set up [homeworks](/components/homeworks/), and add the following lines to your `configuration.yaml` file"

```yaml
# Example configuration.yaml` entry
light:
  - platform: homeworks
    dimmers:
      - addr: "[02:08:02:13]"
        name: "Slow Light"
        rate: 3.5
      - addr: "[02:08:02:14]"
        name: "Fast Light"
        rate: 0
      - addr: "[02:08:02:15]"
        name: "Default Light"
```

{% configuration %}
dimmers:
  description: A list of Homeworks light switches of any kind (simple on/off units or dimmers).
  required: true
  type: list 
  keys:
    addr:
      description: The unique address of the dimmer on the controller.  The quotes, brackets, and number formatting must be of the form `"[##:##:##:##]"`.
      required: true
      type: string
    name:
      description: The name of the sensor will be the title of the button +`"_"` + the name of the keypad/
      required: true
      type: string
    rate:
      description: The amount of time it takes for the light to transition to a new brightness level.
      required: false
      type: float
{% endconfiguration %}
