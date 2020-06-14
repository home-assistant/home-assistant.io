---
title: pi4ioe5v9xxxx IO Expander
description: Instructions on how to integrate the pi4ioe5v9xxxx IO pin expander with I2C interface into Home Assistant.
logo: diodes.png
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.109
ha_iot_class: Local Polling
ha_domain: pi4ioe5v9xxxx
ha_codeowners:
  - '@antonverburg'
---

The `pi4ioe5v9xxxx` integration provides support for the quasi-bidirectional devices PI4IOE5V9570, PI4IOE5V9674, PI4IOE5V9673, PI4IOE5V96224 and PI4IOE5V96248 from [diodes.com](https://www.diodes.com).

For more details about the pi4ioe5v9xxxx I2C I/O port expander you can find the datasheets here:
- [PI4IOE5V9570](https://www.diodes.com/assets/Datasheets/PI4IOE5V9570.pdf)
- [PI4IOE5V9674](https://www.diodes.com/assets/Datasheets/PI4IOE5V9674.pdf)
- [PI4IOE5V9673](https://www.diodes.com/assets/Datasheets/PI4IOE5V9673.pdf)
- [PI4IOE5V96224](https://www.diodes.com/assets/Datasheets/PI4IOE5V96224.pdf)
- [PI4IOE5V96248](https://www.diodes.com/assets/Datasheets/PI4IOE5V96248.pdf).

## Binary Sensor

The `pi4ioe5v9xxxx` binary sensor platform allows you to read sensor values from the I/O pins of your I/O expander.

The pin numbers are from 1 to X where: 1-8 correspond to port 0 (00-07) and 9-16 to port 1, etc.

### Configuration

To use the I/O pins of an pi4ioe5v9xxxx connected to an I2C bus of your Raspberry Pi as binary sensors, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
- platform: pi4ioe5v9xxxx
  pins:
    1: Pin_01/PI0_0
    2: Pin_02/PI0_1
    3: Pin_03/PI0_2
    4: Pin_04/PI0_3
    5: Pin_05/PI0_4
    6: Pin_06/PI0_5
    7: Pin_07/PI0_6
    8: Pin_08/PI0_7
```

{% configuration %}
pins:
  description: List of used pins.
  required: true
  type: map
  keys:
    "pin: name":
      description: The pin numbers (from 1 to X) and corresponding names.
      required: true
      type: [integer, string]
i2c_bus:
  description: i2c bus containing the pi4ioe5v9xxxx chip.
  required: false
  type: integer
  default: "`1`"
i2c_address:
  description: i2c address of pi4ioe5v9xxxx chip.
  required: false
  type: integer
  default: "`0x20`"
bits:
  description: number of bits of pi4ioe5v9xxxx chip, see particular datasheet for your device for the right number.
  required: false
  type: integer
  default: "`24`"
invert_logic:
  description: If `true`, inverts the input logic to ACTIVE LOW.
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
{% endconfiguration %}


## Switch

The `pi4ioe5v9xxxx` switch platform allows you to write to the I/O pins of your I2C I/O expander.

The pin numbers are from 1 to X, where 1-8 correspond to port A (A1-A8) and 9-16 to port B (B1-B8), etc.

### Configuration

To use the I/O pins of an pi4ioe5v9xxxx connected to an I2C bus as switches, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: pi4ioe5v9xxxx
    pins:
     1: Pin_01/PI0_0
     2: Pin_02/PI0_1
     3: Pin_03/PI0_2
     4: Pin_04/PI0_3
     5: Pin_05/PI0_4
     6: Pin_06/PI0_5
     7: Pin_07/PI0_6
     8: Pin_08/PI0_7
```

{% configuration %}
pins:
  description: List of used pins.
  required: true
  type: map
  keys:
    "pin: name":
      description: The pin numbers (from 1 to X) and corresponding names.
      required: true
      type: [integer, string]
i2c_bus:
  description: i2c bus containing the pi4ioe5v9xxxx chip.
  required: false
  type: integer
  default: "`1`"
i2c_address:
  description: i2c address of pi4ioe5v9xxxx chip.
  required: false
  type: integer
  default: "`0x20`"
bits:
  description: number of bits of pi4ioe5v9xxxx chip, see particular datasheet for your device for the right number.
  required: false
  type: integer
  default: "`24`"
invert_logic:
  description: If `true`, inverts the output logic to ACTIVE LOW.
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
{% endconfiguration %}
