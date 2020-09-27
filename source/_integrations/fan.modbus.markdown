---
title: "Modbus Fan"
description: "Instructions on how to integrate Modbus fans into Home Assistant."
ha_category:
  - Fan
ha_release: 0.116
ha_iot_class: Local Polling
ha_domain: modbus
---

The `modbus` fan platform allows you to control [Modbus](http://www.modbus.org/)-enabled fans. We support two types of Modbus fans — coil-based and register-based. Note that our implementation of Modbus register fan supports only holding registers, because input registers are not writable, and don't give us any control over connected fans.

## Configuration

To enable Modbus fans in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    fans:
      - name: Fan1
        slave: 1
        coil: 0
        scan_interval: 10
      - name: Fan2
        register: 0
        command_on: 1
        command_off: 0
        scan_interval: 10
```

{% configuration %}
fans:
  description: The array contains a list of all your Modbus fans.
  required: true
  type: map
  keys:
    name:
      description: Name of the fan.
      required: true
      type: string
    slave:
      description: The number of the slave (can be omitted for tcp and udp Modbus).
      required: false
      default: 1
      type: integer
    coil:
      description: Coil address; can be omitted if a register attribute is specified. Coil and register attributes are mutually exclusive, and you need to always specify one of them.
      required: true
      type: integer
    register:
      description: Holding register address; can be omitted if a coil attribute is specified. Coil and register attributes are mutually exclusive, and you need to always specify one of them.
      required: true
      type: integer
    command_on:
      description: Value to write to turn on the fan. This value can be specified only for register-based fans.
      required: false
      default: 1
      type: integer
    command_off:
      description: Value to write to turn off the fan. This value can be specified only for register-based fans.
      required: false
      default: 0
      type: integer
    verify_state:
      description: Define if is possible to readback the status of the fan.
      required: false
      default: true
      type: boolean
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
{% endconfiguration %}

## Examples

In this section, you find some real-life examples of how to use this fan.

### Full configuration for a Modbus coil fan

The example below shows a full configuration for a Modbus coil fan, for which the state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    fans:
      - name: Fan1
        slave: 1
        coil: 13
        scan_interval: 10
      - name: Fan2
        slave: 2
        coil: 14
        scan_interval: 10
```

### Full configuration for a Modbus register fan

The example below shows a full configuration for a Modbus register fan, for which the state is polled from Modbus every 15 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    fans:
      - name: Fan1
        slave: 1
        register: 11
        command_on: 1
        command_off: 0
        verify_state: true
        scan_interval: 15
```