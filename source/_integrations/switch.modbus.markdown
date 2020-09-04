---
title: "Modbus Switch"
description: "Instructions on how to integrate Modbus switches into Home Assistant."
ha_category:
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: modbus
---

The `modbus` switch platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

## Configuration

To use your Modbus switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: modbus
  coils:
    - name: Switch1
      hub: hub1
      slave: 1
      coil: 13
    - name: Switch2
      slave: 2
      coil: 14
  registers:
    - name: Register1
      hub: hub1
      slave: 1
      register: 11
      command_on: 1
      command_off: 0
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
      required: true
      type: integer
    command_off:
      description: Value to write to turn off the switch.
      required: true
      type: integer
    verify_state:
      description: Define if is possible to readback the status of the switch.
      required: false
      default: true
      type: boolean
    verify_register:
      description: Register to readback.
      required: false
      default: same as register
      type: string
    register_type:
      description: Modbus register types are holding or input.
      required: false
      default: holding
      type: string
    state_on:
      description: Register value when switch is on.
      required: false
      default: same as command_on
      type: integer
    state_off:
      description: Register value when switch is off.
      required: false
      default: same as command_off
      type: integer
{% endconfiguration %}

It's possible to change the default 30 seconds scan interval for the switch state updates as shown in the [Platform options](/docs/configuration/platform_options/#scan-interval) documentation.

### Full example

Example switches, for which the state is polled from Modbus every 10 seconds.

```yaml
switch:
  platform: modbus
  scan_interval: 10
  coils:
    - name: Switch1
      hub: hub1
      slave: 1
      coil: 13
    - name: Switch2
      hub: hub1
      slave: 2
      coil: 14
```
