---
title: AquaLogic
description: Instructions on how to integrate an AquaLogic controller within Home Assistant.
ha_category:
  - Hub
  - Sensor
  - Switch
ha_release: '0.80'
ha_iot_class: Local Push
ha_domain: aqualogic
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The AquaLogic integration provides connectivity to a Hayward/Goldline AquaLogic/ProLogic pool controller. Note that an RS-485 to Ethernet adapter connected to the pool controller is required.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To add the AquaLogic integration to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
aqualogic:
  host: IP_ADDRESS
  port: PORT
```

{% configuration %}
host:
  description: The domain name or IP address of the RS-485 to Ethernet adapter connected to the pool controller, e.g., 192.168.1.1.
  required: true
  type: string
port:
  description: The port provided by the RS-485 to Ethernet adapter.
  required: true
  type: integer
{% endconfiguration %}

## Sensor

Once you have enabled the AquaLogic integration, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: aqualogic
    monitored_conditions:
      - pool_temp
```

{% configuration %}
monitored_conditions:
  description: List of items you want to monitor.
  required: false
  default: all
  type: list
  keys:
    air_temp:
      description: The air temperature.
    pool_temp:
      description: The pool temperature.
    spa_temp:
      description: The spa temperature.
    pool_chlorinator:
      description: The pool chlorinator setting.
    spa_chlorinator:
      description: The spa chlorinator setting.
    salt_level:
      description: The current salt level.
    pump_speed:
      description: The current pump speed (Hayward VS pumps only).
    pump_power:
      description: The current pump power usage (Hayward VS pumps only).
    status:
      description: The current system status.
{% endconfiguration %}

## Switch

Once you have enabled the AquaLogic integration, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: aqualogic
    monitored_conditions:
      - lights
      - filter
```

{% configuration %}
monitored_conditions:
  description: List of items you want to monitor/control.
  required: false
  default: all
  type: list
  keys:
    filter:
      description: Controls the filter pump.
    filter_low_speed:
      description: Controls low speed mode on the filter pump (multi-speed pumps only).
    lights:
      description: Controls the Lights relay.
    aux_1:
      description: Controls the Aux 1 relay.
    aux_2:
      description: Controls the Aux 2 relay.
    aux_3:
      description: Controls the Aux 3 relay.
    aux_4:
      description: Controls the Aux 4 relay.
    aux_5:
      description: Controls the Aux 5 relay.
    aux_6:
      description: Controls the Aux 6 relay.
    aux_7:
      description: Controls the Aux 7 relay.
{% endconfiguration %}
