---
layout: page
title: "Nano Pi GPIO"
description: "Instructions on how to integrate the GPIO capability of a Nano Pi NEO/NEO2 into Home Assistant."
date: 2019-05-24 01:30
sidebar: true
comments: false
sharing: true
footer: true
logo: nanopi-logo.png
ha_category:
  - DIY
  - Binary Sensor
  - Cover
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Push
redirect_from:
  - /components/binary_sensor.npi_gpio/
  - /components/cover.npi_gpio/
  - /components/switch.npi_gpio/
---

The `npi_gpio` component is the base for all related GPIO platforms in Home Assistant. It is based on `rpi_gpio` component of Raspberry Pi.

## {% linkable_title Binary Sensor %}

The `npi_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your [Nano Pi](http://www.nanopi.org/).

## {% linkable_title Configuration %}

To use your Nano Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: npi_gpio
    ports:
      11: PIR Office
      12: PIR Bedroom
```

{% configuration %}
ports:
  description: List of used ports.
  required: true
  type: map
  keys:
    "port: name":
      description: The port numbers (BOARD mode pin numbers) and corresponding names.
      required: true
      type: string
bouncetime:
  description: The time in milliseconds for port debouncing.
  required: false
  type: integer
  default: 50
invert_logic:
  description: If `true`, inverts the output logic to ACTIVE LOW.
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
pull_mode:
  description: >
    Type of internal pull resistor to use.
    Options are `UP` - pull-up resistor and `DOWN` - pull-down resistor.
  required: false
  type: string
  default: "`UP`"
{% endconfiguration %}

Nano Pi use `BOARD` mode to match exacty the pin physical position on the board with a sequential number.
For more details about the GPIO layout, visit the Wiki [article](http://wiki.friendlyarm.com/wiki/index.php/NanoPi_NEO#Diagram.2C_Layout_and_Dimension) about the Nano Pi NEO.

## {% linkable_title Cover %}

The `npi_gpio` cover platform allows you to use a Nano Pi to control your cover such as Garage doors.

It uses two ports on the Nano Pi.

- The `state_port` will detect if the cover is closed, and
- the `relay_port` will trigger the cover to open or close.

## {% linkable_title Configuration %}

To enable Nano Pi Covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: npi_gpio
    covers:
      - relay_port: 10
        state_port: 11
```

{% configuration %}
relay_time:
  description: The time that the relay will be on for in seconds.
  required: false
  default: 0.2
  type: float
invert_relay:
  description: Invert the relay pin output so that it is active-high (True).
  required: false
  default: false
  type: boolean
state_pull_mode:
  description: The direction the State pin is pulling. It can be UP or DOWN.
  required: false
  default: UP
  type: string
invert_state:
  description: Invert the value of the State pin so that 0 means closed.
  required: false
  default: false
  type: boolean
covers:
  description: List of your doors.
  required: true
  type: list
  keys:
    relay_pin:
      description: The pin of your Nano Pi where the relay is connected.
      required: true
      type: integer
    state_pin:
      description: The pin of your Nano Pi to retrieve the state.
      required: true
      type: integer
    name:
      description: The name to use in the frontend.
      required: false
      type: string
{% endconfiguration %}

## {% linkable_title Full example %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: npi_gpio
    relay_time: 0.2
    invert_relay: false
    state_pull_mode: 'UP'
    invert_state: true
    covers:
      - relay_port: 10
        state_port: 11
      - relay_port: 12
        state_port: 13
        name: 'Right door'
```

## {% linkable_title Switch %}

The `npi_gpio` switch platform allows you to control the GPIOs of your [Nano Pi](http://www.nanopi.org/).

## {% linkable_title Configuration %}

To use your Nano Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: npi_gpio
    ports:
      11: Fan Office
      12: Light Desk
```

{% configuration %}
ports:
  description: Array of used ports.
  required: true
  type: list
  keys:
    port:
      description:  Port numbers and corresponding names (GPIO #).
      required: true
      type: [integer, string]
invert_logic:
  description: If true, inverts the output logic to ACTIVE LOW.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

For more details about the GPIO layout, visit the Wikipedia [article](http://wiki.friendlyarm.com/wiki/index.php/NanoPi_NEO#Diagram.2C_Layout_and_Dimension) about the Nano Pi NEO.

<p class='note warning'>
Note that a pin managed by HASS is expected to be exclusive to HASS.
</p>

A common question is what does Port refer to, in Nano Pi boards this number is the physical pin #.
For example, if you have a relay connected to pin 11 its GPIO # is 11.

```yaml
# Example configuration.yaml entry
switch:
  - platform: npi_gpio
    ports:
      17: Speaker Relay
```
