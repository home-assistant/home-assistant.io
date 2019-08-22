---
title: "Viessmann climate controller"
description: "Instructions how to integrate Viessmann heating devices with Home Assistant"
logo: viessmann.png
ha_category: Climate
ha_release: 0.97
ha_iot_class: Cloud Push
---

The `ViCare` climate platform lets you control [Viessmann](https://www.viessmann.com) devices via the ViCare cloud.
All Viessmann gas boilers with WiFi or Ethernet connection should be supported.

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: vicare
    username: [VICARE_EMAIL]
    password: [VICARE_PASSWORD]
```

{% configuration %}
username:
  description: Your username for the ViCare App
  required: true
  type: string
password:
  description: Your password for the ViCare App
  required: true
  type: string
{% endconfiguration %}

This component opens a TCP connection with the ViCare API to receive temperature and status updates, and to issue commands.

Two climate components will be created: climate.vicare_heating and climate.vicare_water (for domestic hot water).

The climate.vicare_heating component has the following mapping of hvac modes to Viessmann operation modes:
 - HVAC_OFF - ForcedReduced
 - HVAC_AUTO - DHWandHeating
 - HVAC_HEAT - ForcedNormal
The presets eco and comfort are a 1:1 mapping to the respective Viessmann programs.

It is not possible to turn on/off water heating via the climate.vicare_water component since this would conflict with the operation modes of the heating component. Therefore the hvac modes are *information only* and only the temperature can be set.

### Supported services

Available services:

- `climate.set_temperature`
- `climate.set_hvac_mode`
