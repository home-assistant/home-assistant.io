---
layout: page
title: "Modbus Switch"
description: "Instructions on how to integrate Modbus switches into Home Assistant."
date: 2015-08-30 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Switch
ha_release: pre 0.7
ha_iot_class: "Local Push"
---


The `modbus` switch platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

## {% linkable_title Configuration %}

To use your Modbus switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: modbus
  slave: 1
  coils:
    - name: Switch1
      slave: 1
      coil: 13
    - name: Switch2
      slave: 2
      coil: 14
  registers:
    - name: Register1
      slave: 1
      register: 11
      command_on: 1
      command_off: 0
```

Configuration variables:

- **coils** (*Optional*): A list of relevant coils to read from/write to.
  - **slave** (*Required*): The number of the slave (can be omitted for tcp and udp Modbus).
  - **name** (*Required*): Name of the switch.
  - **coil** (*Required*): Coil number.
- **registers** (*Optional*): A list of relevant registers to read from/write to.
  - **slave** (*Required*): The number of the slave (can be omitted for tcp and udp Modbus).
  - **name** (*Required*): Name of the switch.
  - **register** (*Required*): Register number.
  - **command_on** (*Required*): Value to write to turn on the switch.
  - **command_off** (*Required*): Value to write to turn off the switch.
  - **verify_state** (*Optional*): Define if is possible to readback the status of the switch. (default: `true`)
  - **verify_register** (*Optional*): Register to readback. (default: same as register)
  - **register_type** (*Optional*): Modbus register type: holding or input. (default: holding)
  - **state_on** (*Optional*): Register value when switch is on. (default: same as command_on)
  - **state_off** (*Optional*): Register value when switch is off. (default: same as command_off)
