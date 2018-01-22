---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Daikin AC(s) with Home Assistant."
date: 2017-12-03 05:00
sidebar: true
comments: false
sharing: true
footer: true
logo: daikin.png
ha_category: Climate
ha_release: 0.59
ha_iot_class: "Local Polling"
---


The `daikin` climate platform integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- **mode** (cool, heat, dry, fan only or auto)
- **fan speed** (on supported models)
- **target temperature**
- **swing mode** (on supported models)

Current temperature is displayed.

<p class='note warning'>
Please note, the `daikin` platform integrates **ONLY the european versions of Daikin ACs (models BRP069A41, 42, 43, 45)** into Home Assistant. BRP069A42 does not support setting of fan speed or fan swing mode.
</p>

The component has been integrated with discovery so all your Daikin AC's climate devices can be automatically discovered.

To enable the platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: daikin
    host: 10.0.0.1
```

{% configuration %}
host:
  description: IP or hostname of the device.
  required: true
  type: string
name:
  description: If the device has a name previously set by the user than that name will be used.
  required: false
  type: string
{% endconfiguration %}

