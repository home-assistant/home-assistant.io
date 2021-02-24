---
title: Tesla Powerwall
description: Instructions on how to integrate Tesla Power Walls into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@jrester'
ha_domain: powerwall
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
---

The `powerwall` integration allows you to integrate your [Tesla Powerwall](https://www.tesla.com/powerwall) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

{% include integrations/config_flow.md %}

### Binary Sensor

The following binary sensors are added for each Powerwall:

- Powerwall Status
- Powerwall Connected to Tesla
- Grid Status

### Sensor

The following sensors are added for each Powerwall:

- Powerwall Charge
- Powerwall Site Now
- Powerwall Load Now
- Powerwall Battery Now
- Powerwall Frequency Now (if applicable)
- Powerwall Busway Now (if applicable)
- Powerwall Solar Now (if applicable)
- Powerwall Generator Now (if applicable)
