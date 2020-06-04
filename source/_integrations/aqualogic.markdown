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
---

The AquaLogic integration provides connectivity to a Hayward/Goldline AquaLogic/ProLogic pool controller. Note that an RS-485 to Ethernet or serial adapter connected to the pool controller is required.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To add the AquaLogic integration to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
aqualogic:
  device: socket
  host: IP_ADDRESS
  port: PORT
```

{% configuration %}
device:
  description: The type of device used to connect to the pool controller, socket or serial.
  required: false
  type: string
  default: socket
host:
  description: For socket devices, the domain name or IP address of the RS-485 to Ethernet adapter, e.g., 192.168.1.1.
  required: false
  type: string
  default: localhost
port:
  description: For socket devices, the port of the RS-485 to Ethernet adapter.
  required: false
  type: integer
  default: 23
path:
  description: For serial devices, the path to the RS-485 to serial adapter.
  required: false
  type: string
  default: /dev/ttyUSB0
{% endconfiguration %}

## Sensor

Once you have enabled the AquaLogic component, add the following to your `configuration.yaml` file:

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

Once you have enabled the AquaLogic component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: aqualogic
    monitored_conditions:
      - lights
      - filter
```

Note that due to the lack of a dedicated hardware interface, switches may not be 100% reliable. The system attempts to monitor and retry switch commands as required, but failures may still occur. Use switches in automations with caution.

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
    heater_1:
      description: Controls the heater.
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
    aux_8:
      description: Controls the Aux 8 relay.
    aux_9:
      description: Controls the Aux 9 relay.
    aux_10:
      description: Controls the Aux 10 relay.
    aux_11:
      description: Controls the Aux 11 relay.
    aux_12:
      description: Controls the Aux 12 relay.
    aux_13:
      description: Controls the Aux 13 relay.
    aux_14:
      description: Controls the Aux 14 relay.
    valve_3:
      description: Controls the Valve 3 relay.
    valve_4:
      description: Controls the Valve 4 relay.
{% endconfiguration %}
