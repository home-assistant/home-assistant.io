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
ha_iot_class: No
---

### Description ###

The 'daikin' climate component integrates the european versions of Daikin ACs (models BRP069A41, 42, 43, 45) into Home Assistant, enabling control of setting the following parameters:
- **mode** (cool, heat, dry, fan only or auto)
- **fan speed**
- **target temperature**
- **target humidity** (on supported models)
- **swing mode** (on supported models)

Current temperature and humidity (only on supported models) are also displayed.

### Configuration ###

The component has been integrated with discovery so all your Daikin AC's can be autodiscovered.
Manual configuration and customization is also possible by using the sample configuration from below

```yaml
# Example configuration.yaml entry
climate:
  - platform: daikin
      host: 10.0.0.1
      name: optional name
```

Configuration variables:

- **host** (*Required*): IP of the device
- **name** (*Optional*): If the device has a name previously set by the user than that name will be used

