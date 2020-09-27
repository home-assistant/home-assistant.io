---
title: "Modbus Cover"
description: "Instructions on how to integrate Modbus covers into Home Assistant."
ha_category:
  - Cover
ha_release: 0.116
ha_iot_class: Local Polling
ha_domain: modbus
---

The `modbus` cover platform allows you to control [Modbus](http://www.modbus.org/) covers (such as blinds, a roller shutter, or a garage door).

## Configuration

At the moment, we support the opening and closing of a cover. You can control your covers either using coils or holding registers.

Cover that uses the `coil` attribute is not able to determine intermediary states such as opening and closing. Coil stores only two states — "0" means cover closed, and "1" implies cover open. To allow detecting intermediary states, we added an optional `status_register` attribute. It will enable you to write your command (e.g., to open a cover) into a coil, and read current cover status back through the register. Additionally, you can specify values for `state_open`, `state_opening`, `state_closed`, and `state_closing` attributes. These will be matched with the value read from the `status_register`.

If your cover uses holding register to send commands (defined by the `register` attribute), it can also read the intermediary states. To adjust which value represents what state, you can fine-tune the optional state attributes, like `state_open`. These optional state values are also used for specifying values written into the register. If you specify an optional status_register attribute, cover states will be read from status_register instead of the register used for sending commands.

To use Modbus covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        device_class: door
        scan_interval: 1
        coil: 0
      - name: Door2
        device_class: door
        scan_interval: 1
        coil: 1
        status_register: 1
      - name: Door3
        slave: 2
        device_class: door
        scan_interval: 1
        register: 0
        state_open: 1
        state_closed: 0
```

{% configuration %}
covers:
  description: The array contains a list of all your Modbus covers.
  required: true
  type: map
  keys:
    slave:
      description: The number of the slave (can be omitted for tcp and udp Modbus).
      required: false
      default: 1
      type: integer
    name:
      description: Name of the switch.
      required: true
      type: string
    coil:
      description: Coil address; can be omitted if a register attribute is specified. Coil and register attributes are mutually exclusive, and you need to always specify one of them.
      required: true
      type: integer
    register:
      description: Holding register address; can be omitted if a coil attribute is specified. Coil and register attributes are mutually exclusive, and you need to always specify one of them.
      required: true
      type: integer
    status_register:
      description: An address of an register, from which all the cover states will be read. If you specified `register` attribute, and not `status_register` attribute, your main register will also be used as a status register.
      required: false
      type: integer
    status_register_type:
      description: Modbus register type (holding, input), default holding.
      required: false
      type: string
    state_open:
      description: A value in `status_register` or `register` representing an open cover. If your configuration uses an `register` attribute, this value will be also written into a holding register to open the cover.
      required: false
      default: 1
      type: integer
    state_closed:
      description: A value in `status_register` or `register` representing a closed cover. If your configuration uses an `register` attribute, this value will be also written into a holding register to close the cover.
      required: false
      default: 0
      type: integer
    state_opening:
      description: A value in `status_register` or `register` telling us that the cover is opening at the moment. Note that this state should be also supported on your connected Modbus cover. If it won't write this intermediary state into the register, this state won't be detected.
      required: false
      default: 2
      type: integer
    state_closing:
      description: A value in `status_register` or `register` telling us that the cover is closing at the moment. Note that this state should be also supported on your connected Modbus cover. If it won't write this intermediary state into the register, this state won't be detected.
      required: false
      default: 2
      type: integer
    device_class:
      description: The [type/class](/integrations/cover/#device-class) of the cover to set the icon in the frontend.
      required: false
      type: device_class
      default: None
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
{% endconfiguration %}

## Examples

In this section, you find some real-life examples of how to use this light.

### Modbus cover controlled by a coil

This example shows a configuration for a Modbus cover controlled using a coil. Intermediary states like opening/closing are not supported. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        slave: 1
        coil: 1
        device_class: door
        scan_interval: 10
      - name: Door2
        slave: 2
        coil: 2
        device_class: door
        scan_interval: 10
```

### Modbus cover controlled by a coil, it's state is read from the register

This example shows a configuration for a Modbus cover controlled using a coil. Actual cover state is read from the `status_register`. We've also specified register values to match with the states open/opening/closed/closing. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        coil: 1
        status_register: 1
        status_register_type: input
        state_opening: 1
        state_open: 2
        state_closing: 3
        state_closed: 4
```

### Modbus cover controlled by a holding register

This example shows a configuration for a Modbus cover controlled using a holding register, from which we also read current cover state. We've also specified register values to match with the states open/opening/closed/closing. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        register: 1
        state_opening: 1
        state_open: 2
        state_closing: 3
        state_closed: 4
```

### Modbus cover controlled by a holding register, it's state is read from the status register

This example shows a configuration for a Modbus cover controlled using a holding register. However, cover state is read from a `status_register`. In this case, we've specified only values for `state_open` and `state_closed`, for the rest, default values are used. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        register: 1
        status_register: 2
        register_type: holding
        state_open: 1
        state_closed: 0
```
