---
layout: page
title: "PWM LED"
description: "Instructions on how to setup PWM LEDs within Home Assistant."
date: 2017-04-04 13:00
sidebar: true
layout: page
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Push"
ha_release: 0.43
logo: raspberry-pi.png
---

The `rpi_gpio_pwm` platform allows to control multiple lights using pulse-width modulation, for example led strips. It supports one-color, RGB and RGBW LEDs driven by GPIOs of a Raspberry Pi or a PCA9685 controller.

For controlling the GPIOs, the platform connects to the [pigpio-daemon](http://abyz.co.uk/rpi/pigpio/pigpiod.html), which must be running. On Raspbian Jessie 2016-05-10 or newer the `pigpio` library is already included. On other operating systems it needs to be installed first (see [installation instructions](https://github.com/soldag/python-pwmled#installation)). 

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

Configuration variables:

- **leds** array (*Required*): Can contain multiple LEDs.
  - **name** (*Required*): The name of the LED.
  - **driver** (*Required*): The driver which controls the LED. Choose either `gpio` or `pca9685`.
  - **pins** (*Required*): The pins connected to the LED as a list.. The order of pins is determined by the specified type.
  - **type** (*Required*): The type of LED. Choose either `rgb`, `rgbw` or `simple`.
  - **freq** (*Optional*): The PWM frequency. (Default: `200`)
  - **address** (*Optional*): The address of the PCA9685 driver. (Default: `0x40`)

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title RGB LED connected to PCA9685 controller %}

This example uses a [PCA9685 controller](http://www.nxp.com/products/interfaces/ic-bus-portfolio/ic-led-display-control/16-channel-12-bit-pwm-fm-plus-ic-bus-led-controller:PCA9685) to control a RGB LED.

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

### {% linkable_title RGBW LED connected to PCA9685 controller %}

This example uses a [PCA9685 controller](http://www.nxp.com/products/interfaces/ic-bus-portfolio/ic-led-display-control/16-channel-12-bit-pwm-fm-plus-ic-bus-led-controller:PCA9685) to interact with a RGBW LED.

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
