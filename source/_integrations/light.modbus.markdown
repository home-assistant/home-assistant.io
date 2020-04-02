---
title: "Modbus Light"
description: "Instructions on how to integrate Modbus lights into Home Assistant."
ha_category:
  - Light
ha_release: 0.109
ha_iot_class: Local Push
ha_domain: modbus
---

The `modbus` light platform allows you to control [Modbus](http://www.modbus.org/)-enabled lights. We support two types of Modbus lights — coil-based and register-based. Note that our implementation of Modbus register light supports only holding registers, because input registers are not writable, and don't give us any control over connected lights.

## Configuration

To enable Modbus lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: modbus
  coils:
    - name: Light1
      hub: hub1
      slave: 1
      coil: 13
    - name: Light2
      slave: 2
      coil: 14
  registers:
    - name: Light3
      hub: hub1
      slave: 1
      register: 11
```

{% configuration %}
coils:
  description: A list of relevant coils to read from/write to.
  required: false
  type: map
  keys:
    hub:
      description: The name of the hub.
      required: false
      default: default
      type: string
    slave:
      description: The number of the slave (can be omitted for tcp and udp Modbus).
      required: true
      type: integer
    name:
      description: Name of the switch.
      required: true
      type: string
    coil:
      description: Coil number.
      required: true
      type: integer
registers:
  description: A list of relevant registers to read from/write to.
  required: false
  type: map
  keys:
    hub:
      description: The hub to use.
      required: false
      default: default
      type: string
    slave:
      description: The number of the slave (can be omitted for tcp and udp Modbus).
      required: true
      type: integer
    name:
      description: Name of the switch.
      required: true
      type: string
    register:
      description: Register number.
      required: true
      type: integer
    command_on:
      description: Value to write to turn on the switch.
      required: false
      default: 1
      type: integer
    command_off:
      description: Value to write to turn off the switch.
      required: false
      default: 0
      type: integer
    verify_state:
      description: Define if is possible to readback the status of the switch.
      required: false
      default: true
      type: boolean
{% endconfiguration %}

It's possible to change the default 30 seconds scan interval for the switch state updates as shown in the [Platform options](/docs/configuration/platform_options/#scan-interval) documentation.

## Examples

In this section, you find some real-life examples of how to use this light.

### Full configuration for a Modbus coil light

The example below shows a full configuration for a Modbus coil light, for which the state is polled from Modbus every 10 seconds.

```yaml
light:
  platform: modbus
  scan_interval: 10
  coils:
    - name: Light1
      hub: hub1
      slave: 1
      coil: 13
    - name: Light2
      hub: hub1
      slave: 2
      coil: 14
```

### Full configuration for a Modbus register light

The example below shows a full configuration for a Modbus register light, for which the state is polled from Modbus every 15 seconds.

```yaml
light:
  platform: modbus
  scan_interval: 15
  registers:
    - name: Light1
      hub: hub1
      slave: 1
      register: 11
      command_on: 1
      command_off: 0,
      verify_state: true
```