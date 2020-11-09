---
title: Raspberry Pi GPIO Light
description: Instructions on how to integrate a light with relay and pushbutton controlled by GPIO of a Raspberry Pi into Home Assistant.
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: rpi_gpio_light
---

## Light

The `rpi_gpio` light platform allows you to use a Raspberry Pi to control your lights.

It uses two pins on the Raspberry Pi.

- The `light_button_pin` will detect if the light button pushed
- the `relay_pin` will turn on the light relay.


### Configuration

To enable Raspberry Pi Light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: rpi_gpio
    lights:
      - name: my light
        relay_pin: 18
        light_button_pin: 17
```

{% configuration %}
light_button_double_check_time_millis:
  description: The minimum time that the light button pin need to be activ in milliseconds to avoid electrical perturbation.
  required: false
  default: 25
  type: integer
light_button_double_check_time_millis:
  description: The time in milliseconds for port debouncing
  required: false
  default: 150
  type: integer
invert_relay:
  description: Invert the relay pin output so that it is active-high (True).
  required: false
  default: false
  type: boolean
light_button_pull_mode:
  description: The direction the light button pin is pulling. It can be UP or DOWN.
  required: false
  default: UP
  type: string
invert_light_button:
  description: Invert the value of the light button pin so that 0 means closed.
  required: false
  default: false
  type: boolean
lights:
  description: List of your lights.
  required: true
  type: list
  keys:
    relay_pin:
      description: The pin of your Raspberry Pi where the relay is connected.
      required: true
      type: integer
    light_button_pin:
      description: The pin of your Raspberry Pi where the light button is connected.
      required: true
      type: integer
    name:
      description: The name to use in the frontend.
      required: false
      type: string
{% endconfiguration %}

## Full example

```yaml
light:
  - platform: rpi_gpio
    lights:
      - name: bedroom
        relay_pin: 18
        light_button_pin: 17
      - name: kitchen
        relay_pin: 23
        light_button_pin: 27
      - name: living romm
        relay_pin: 24
        light_button_pin: 22
    light_button_pull_mode: DOWN
    invert_light_button: true
    invert_relay: true
    light_button_bouncetime_millis: 250
    light_button_double_check_time_millis: 50
```
