---
title: "Modbus Light"
description: "Instructions on how to integrate Modbus lights into Home Assistant."
ha_category:
  - Light
ha_release: 0.116
ha_iot_class: Local Polling
ha_domain: modbus
---

The `modbus` light platform allows you to control [Modbus](http://www.modbus.org/)-enabled lights. We support two types of Modbus lights — coil-based and register-based. Note that our implementation of Modbus register light supports only holding registers, because input registers are not writable, and don't give us any control over connected lights.

## Configuration

To enable Modbus lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    lights:
      - name: Light1
        slave: 1
        coil: 0
        scan_interval: 10
      - name: Light2
        register: 0
        command_on: 1
        command_off: 0
        scan_interval: 10
```

{% configuration %}
lights:
  description: The array contains a list of all your Modbus lights.
  required: true
  type: map
  keys:
    name:
      description: Name of the light.
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
      description: Value to write to turn on the light. This value can be specified only for register-based lights.
      required: false
      default: 1
      type: integer
    command_off:
      description: Value to write to turn off the light. This value can be specified only for register-based lights.
      required: false
      default: 0
      type: integer
    verify_state:
      description: Define if is possible to readback the status of the light.
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

In this section, you find some real-life examples of how to use this light.

### Full configuration for a Modbus coil light

The example below shows a full configuration for a Modbus coil light, for which the state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    lights:
      - name: Light1
        slave: 1
        coil: 13
        scan_interval: 10
      - name: Light2
        slave: 2
        coil: 14
        scan_interval: 10
```

### Full configuration for a Modbus register light

The example below shows a full configuration for a Modbus register light, for which the state is polled from Modbus every 15 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    lights:
      - name: Light1
        slave: 1
        register: 11
        command_on: 1
        command_off: 0
        verify_state: true
        scan_interval: 15
```