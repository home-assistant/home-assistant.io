---
title: Raspberry Pi GPIO
description: Instructions on how to integrate the GPIO capability of a Raspberry Pi into Home Assistant.
ha_category:
  - DIY
  - Binary Sensor
  - Cover
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: rpi_gpio
ha_platforms:
  - binary_sensor
  - cover
  - switch
---

The `rpi_gpio` integration is the base for all related GPIO platforms in Home Assistant. There is no setup needed for the integration itself, for the platforms please check their corresponding pages.

## Binary Sensor

The `rpi_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

### Configuration

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rpi_gpio
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
      description: The port numbers ([BCM mode pin numbers](https://pinout.xyz/resources/raspberry-pi-pinout.png)) and corresponding names.
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

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#GPIO_connector) about the Raspberry Pi.

## Cover

The `rpi_gpio` cover platform allows you to use a Raspberry Pi to control your cover such as Garage doors.

It uses two pins on the Raspberry Pi.

- The `state_pin` will detect if the cover is closed, and
- the `relay_pin` will trigger the cover to open or close.

Although you do not need Andrews Hilliday's software controller when you run Home Assistant, he has written clear instructions on how to hook your garage door and sensors up to your Raspberry Pi, which can be found [here](https://github.com/andrewshilliday/garage-door-controller#hardware-setup).

### Configuration

To enable Raspberry Pi Covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rpi_gpio
    covers:
      - relay_pin: 10
        state_pin: 11
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
      description: The pin of your Raspberry Pi where the relay is connected.
      required: true
      type: integer
    state_pin:
      description: The pin of your Raspberry Pi to retrieve the state.
      required: true
      type: integer
    name:
      description: The name to use in the frontend.
      required: false
      type: string
{% endconfiguration %}

## Full example

```yaml
# Example configuration.yaml entry
cover:
  - platform: rpi_gpio
    relay_time: 0.2
    invert_relay: false
    state_pull_mode: "UP"
    invert_state: true
    covers:
      - relay_pin: 10
        state_pin: 11
      - relay_pin: 12
        state_pin: 13
        name: "Right door"
```

## Remote Raspberry Pi Cover

If you don't have Home Assistant running on your Raspberry Pi and you want to use it as a remote cover instead, there is a project called [GarageQTPi](https://github.com/Jerrkawz/GarageQTPi) that will work remotely with the [MQTT Cover Component](/integrations/cover.mqtt/). Follow the GitHub instructions to install and configure GarageQTPi and once configured follow the Home Assistant instructions to configure the MQTT Cover.

## Switch

The `rpi_gpio` switch platform allows you to control the GPIOs of your [Raspberry Pi](https://www.raspberrypi.org/).

### Configuration

To use your Raspberry Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_gpio
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

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#General_purpose_input-output_(GPIO)_connector) about the Raspberry Pi.

<div class='note warning'>
Note that a pin managed by Home Assistant is expected to be exclusive to Home Assistant.
</div>

A common question is what does Port refer to, this number is the actual GPIO #, not the pin #.
For example, if you have a relay connected to pin 11 its GPIO # is 17.

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_gpio
    ports:
      17: Speaker Relay
```
