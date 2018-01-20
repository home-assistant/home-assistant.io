---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Daikin AC(s) with Home Assistant."
date: 2017-12-03 05:00
sidebar: false
comments: false
sharing: true
footer: true
logo: N/A
ha_category: Climate
ha_release: 0.59
ha_iot_class: "Local Polling"
---

### Description ###

The climate component integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:
- **mode** (cool, heat, dry, fan only or auto)
- **fan speed** (on supported models)
- **target temperature**
- **swing mode** (on supported models)

Current temperature is displayed.

<p class='note warning'>
    Please note, the `daikin` platform integrates **ONLY the european versions of Daikin ACs (models BRP069A41, 42, 43, 45)** into Home Assistant.
    BRP069A42 does not support setting of fan speed or fan swing mode.
</p>

### Configuration ###

Manual configuration and customization is possible by using the sample configuration from below:

```yaml
# Example configuration.yaml entry
climate:
  - platform: daikin
      host: 10.0.0.1
      name: optional name
```

Configuration variables:

- **host** (*Required*): IP or hostname of the device
- **name** (*Optional*): If the device has a name previously set by the user than that name will be used

