---
title: eSterownik eCoal.pl Boiler
description: Instructions on how to integrate eSterownik.pl eCoal.pl controller into Home Assistant.
ha_category:
  - Water heater
ha_release: 0.87
ha_iot_class: Local Polling
ha_domain: ecoal_boiler
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ecoal_boiler` {% term integration %} is the base for pumps and sensors managed by [esterownik.pl eCoal boiler controller](https://esterownik.pl/nasze-produkty/ecoal).

## Configuration

To use your eCoal pumps or sensors in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ecoal_boiler:
  host: YOUR_IP_ADDRESS
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  switches:
    monitored_conditions:
      - central_heating_pump
      - central_heating_pump2
  sensors:
    monitored_conditions:
      - outdoor_temp
      - indoor_temp
```

{% configuration %}
host:
  description: The IP address or the hostname of eCoal controller.
  required: true
  type: string
username:
  description: Login used to connect to controller.
  required: false
  default: admin
  type: string
password:
  description: Password for username.
  required: false
  default: admin
  type: string
switches:
  description: switch-related configuration options
  required: false
  type: map
  keys:
    monitored_conditions:
      description: controller available source of switches
      required: false
      type: list
      default: all (`central_heating_pump`, `central_heating_pump2`, `domestic_hot_water_pump`)
sensors:
  description: sensor-related configuration options
  required: false
  type: map
  keys:
    monitored_conditions:
      description: controller available source of sensors
      required: false
      type: list
      default: all (`outdoor_temp`, `indoor_temp`, `indoor2_temp`, `domestic_hot_water_temp`, `target_domestic_hot_water_temp`,
                    `feedwater_in_temp`, `feedwater_out_temp`, `target_feedwater_temp`,
                    `fuel_feeder_temp`, `exhaust_temp`)
{% endconfiguration %}
