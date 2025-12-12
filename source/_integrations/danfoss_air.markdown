---
title: Danfoss Air
description: How to integrate Danfoss Air HRV in Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Switch
ha_release: 0.87
ha_iot_class: Local Polling
ha_domain: danfoss_air
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Danfoss Air** {% term integration %} allows you to access information from your Danfoss Air HRV unit.

*Note*: Danfoss Air CCM only accepts one TCP connection at a time. Due to this the integration will not work while you have the HRV PC-Tool open.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

To enable Danfoss Air, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
danfoss_air:
  host: IP_ADDRESS_OF_CCM
```

{% configuration %}
host:
  description: Danfoss Air CCM IP.
  required: true
  type: string
{% endconfiguration %}

## Binary sensor

The following binary sensor is supported.

- **Bypass active:** Indicator if heat recovery is currently bypassed.

## Sensor

The following sensors are supported.

- **Outdoor temperature:** Outdoor air temperature.
- **Supply temperature:** Air temperature of the air supplied to the house.
- **Extract temperature:** Air temperature of the air extracted from the house.
- **Exhaust temperature:** Exhausted air temperature.
- **Remaining filter lifetime:** Remaining filter lifetime measured in percent.
- **Humidity:** Relative humidity in percent.
- **Fan step:** Fan step.
- **Exhaust fan speed:** Exhausted fan speed.
- **Supply fan speed:** Supply fan speed.
- **Dial battery:** Dial battery level in percent.

## Switch

The following switches are supported.

- **Boost:** Switch to manually activate boost.
- **Bypass:** Switch to manually activate bypass.
- **Automatic bypass:** Switch to enable automatic bypass.
