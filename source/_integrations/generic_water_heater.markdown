---
title: Generic Water Heater
description: Turn Home Assistant into a Water Heater
ha_category:
  - Water Heater
ha_release: 2021.3
ha_iot_class: Local Polling
ha_domain: generic
---

The `Generic Water Heater` water_heater platform is a Water Heater implemented in Home Assistant. It uses a sensor and a switch connected to a domestic hot water (DHW) reservoir and a heat source (eg. resistance). When "on", if the measured temperature is cooler than the target temperature, the heater will be turned on, and turned off when the required temperature is reached. 

```yaml
# Example configuration.yaml entry
generic_water_heater:
  bath water:
    heater_switch: switch.dhw_switch
    temperature_sensor: sensor.dhw_temperature
    target_temperature: 50
    delta_temperature: 5
```

{% configuration %}
heater_switch:
  description: "`entity_id` for heater switch, must be a toggle device."
  required: true
  type: string
temperature_sensor:
  description: "`entity_id` for a temperature sensor, temperature_sensor.state must be temperature."
  required: true
  type: string
target_temperature:
  description: Set initial target temperature. Failure to set this variable will result in target temperature being set to null on startup.
  required: false
  type: float
delta_temperature:
  description: In order to avoid continuous on/off triggering of the heater a delta_temperature can be defined, where by the heater turns off below the target_temperature minus the delta_temperature.
  required: false
  type: float
{% endconfiguration %}

Currently the `Generic Water Heater` climate platform supports 'on' and 'off' modes. 

The `Generic Water Heater` has a failsafe mechanism by which if the temperature sensor becomes unavailable the heater is turned off.
