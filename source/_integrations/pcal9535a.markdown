---
title: PCAL9535A I/O Expander
description: Instructions on how to integrate the PCAL9535A GPIO pin expander with I2C interface into Home Assistant.
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.102
ha_iot_class: Local Polling
ha_codeowners:
  - '@Shulyaka'
ha_domain: pcal9535a
ha_platforms:
  - binary_sensor
  - switch
---

The `pcal9535a` integration is the base for all related pcal9535a platforms in Home Assistant. There is no setup needed for the integration itself, for the platforms, please check their corresponding sections.

One of the use cases is [Seeed studio Raspberry Pi Relay Board](http://wiki.seeedstudio.com/Raspberry_Pi_Relay_Board_v1.0/).

For more details about the PCAL9535A I2C I/O port expander, you can find its datasheet here: [PCAL9535A](https://www.nxp.com/docs/en/data-sheet/PCAL9535A.pdf).

## Binary Sensor

The `pcal9535a` binary sensor platform allows you to read sensor values from the I/O pins of your [PCAL9535A I2C I/O expander](https://www.nxp.com/products/interfaces/ic-spi-serial-interface-devices/ic-general-purpose-i-o/low-voltage-16-bit-ic-bus-i-o-port-with-interrupt-and-agile-i-o:PCAL9535A).

The pin numbers are from 0 to 15, where: 0-7 correspond to port P0 (P0_0 - P0_7) and 8-15 to port P1 (P1_0 - P1_7).

### Configuration

To use the I/O pins of an PCAL9535A connected to an I2C bus of your Raspberry Pi as binary sensors, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pcal9535a
    pins:
      0: PIR Office
      1: PIR Bedroom
```

{% configuration %}
i2c_bus:
  description: i2c bus number of PCAL9535A chip.
  required: false
  type: integer
  default: 1
i2c_address:
  description: i2c address of PCAL9535A chip.
  required: false
  type: integer
  default: "`0x20`"
pins:
  description: List of used pins.
  required: true
  type: map
  keys:
    "pin: name":
      description: The pin numbers (from 0 to 15) and corresponding names.
      required: true
      type: [integer, string]
invert_logic:
  description: If `true`, inverts the input logic to ACTIVE LOW.
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
pull_mode:
  description: >
    Type of internal pull resistor to use.
    Options are `UP` - pull-up resistor, `DOWN` - pull-down resistor, `DISABLED` - resistors disconnected.
  required: false
  type: string
  default: "`DISABLED`"
{% endconfiguration %}

## Switch

The `pcal9535a` switch platform allows you to write to the I/O pins of your [PCAL9535A I2C I/O expander](https://www.nxp.com/products/interfaces/ic-spi-serial-interface-devices/ic-general-purpose-i-o/low-voltage-16-bit-ic-bus-i-o-port-with-interrupt-and-agile-i-o:PCAL9535A).

The pin numbers are from 0 to 15, where: 0-7 correspond to port P0 (P0_0 - P0_7) and 8-15 to port P1 (P1_0 - P1_7).

### Configuration

To use the I/O pins of a PCAL9535A connected to an I2C bus of your Raspberry Pi as switches, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: pcal9535a
    pins:
      11: Fan Office
      12: Light Desk
```

{% configuration %}
i2c_bus:
  description: i2c bus number of PCAL9535A chip.
  required: false
  type: integer
  default: 1
i2c_address:
  description: i2c address of PCAL9535A chip.
  required: false
  type: integer
  default: "`0x20`"
pins:
  description: Array of used pins.
  required: true
  type: list
  keys:
    pin:
      description: The pin numbers (from 0 to 15) and corresponding names.
      required: true
      type: [integer, string]
invert_logic:
  description: If true, inverts the output logic to ACTIVE LOW.
  required: false
  default: false
  type: boolean
strength:
  description: >
    Control the output drive level of the GPIO. Each GPIO can be configured independently to one of the four possible output current levels. By programming these bits, the user is changing the number of transistor pairs or ‘fingers’ that drive the I/O pad.
    Options are `0.25`, `0.5`, `0.75`, `1.0`.
  required: false
  default: "`1.0`"
  type: string
{% endconfiguration %}
