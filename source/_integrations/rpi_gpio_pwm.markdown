---
title: pigpio Daemon PWM LED
description: Instructions on how to setup PWM LEDs within Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Push
ha_release: 0.43
ha_domain: rpi_gpio_pwm
ha_codeowners:
  - '@soldag'
ha_platforms:
  - light
---

The `rpi_gpio_pwm` platform allows to control multiple lights using pulse-width modulation, for example LED strips. It supports one-color, RGB and RGBW LEDs driven by GPIOs of a Raspberry Pi (same host or remote) or a PCA9685 controller.

For controlling the GPIOs, the platform connects to the [pigpio-daemon](http://abyz.me.uk/rpi/pigpio/pigpiod.html), which must be running. On Raspbian Jessie 2016-05-10 or newer the `pigpio` library is already included. On other operating systems it needs to be installed first (see [installation instructions](https://github.com/soldag/python-pwmled#installation)).

## Configuration

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
light:
  - platform: rpi_gpio_pwm
    leds:
      - name: Lightstrip Cupboard
        driver: gpio
        pins: [17]
        type: simple
```

{% configuration %}
leds:
  description: Can contain multiple LEDs.
  required: true
  type: list
  keys:
    name:
      description: The name of the LED.
      required: true
      type: string
    driver:
      description: The driver which controls the LED. Choose either `gpio` or `pca9685`.
      required: true
      type: string
    pins:
      description: The pins connected to the LED as a list. The order of pins is determined by the specified type.
      required: true
      type: [list, integer]
    type:
      description: The type of LED. Choose either `rgb`, `rgbw` or `simple`.
      required: true
      type: string
    frequency:
      description: The PWM frequency.
      required: false
      default: 200
      type: integer
    address:
      description: The address of the PCA9685 driver.
      required: false
      default: 0x40
      type: string
    host:
      description: The remote host address for the GPIO driver.
      required: false
      type: string
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### RGB LED connected to PCA9685 controller

This example uses a [PCA9685 controller](https://www.nxp.com/products/interfaces/ic-bus-portfolio/ic-led-display-control/16-channel-12-bit-pwm-fm-plus-ic-bus-led-controller:PCA9685) to control a RGB LED.

```yaml
# Example configuration.yaml entry
light:
  - platform: rpi_gpio_pwm
    leds:
      - name: TV Backlight
        driver: pca9685
        pins: [0, 1, 2] # [R, G, B]
        type: rgb
```

### RGBW LED connected to PCA9685 controller

This example uses a [PCA9685 controller](https://www.nxp.com/products/interfaces/ic-bus-portfolio/ic-led-display-control/16-channel-12-bit-pwm-fm-plus-ic-bus-led-controller:PCA9685) to interact with a RGBW LED.

```yaml
# Example configuration.yaml entry
light:
  - platform: rpi_gpio_pwm
    leds:
      - name: Lightstrip Desk
        driver: pca9685
        pins: [3, 4, 5, 6] # [R, G, B, W]
        type: rgbw
```

### RGB LED connected to the GPIO pins of an remote Raspberry Pi.

On the Raspberry Pi the pigpio daemon is running on the default port 6666.

```yaml
# Example configuration.yaml entry
light:
  - platform: rpi_gpio_pwm
    leds:
      - name: Lightstrip Sideboard
        driver: gpio
        host: 192.168.0.66
```
