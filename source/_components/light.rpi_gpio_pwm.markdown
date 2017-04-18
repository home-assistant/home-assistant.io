---
layout: page
title: "PWM LED"
description: "Instructions on how to setup pwm leds within Home Assistant."
date: 2017-04-04 13:00
sidebar: true
layout: page
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Push"
ha_release: 0.43
---

The `rpi_gpio_pwm` platform allows to control multiple lights using pulse-width modulation, for example led strips. It supports one-color, RGB and RGBW leds driven by GPIOs of an Raspberry Pi or a PCA9685 controller.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
light:
  platform: rpi_gpio_pwm
  leds:
    # One-color led directly connected to GPIO
    - name: Lightstrip Cupboard
      driver: gpio
      pins: [17]
      type: simple
    # RGB led connected to PCA9685 controller
    - name: TV Backlight
      driver: pca9685
      pins: [0, 1, 2] # [R, G, B]
      type: rgb
    # RGBW led connected to PCA9685 controller
    - name: Lightstrip Desk
      driver: pca9685
      pins: [3, 4, 5, 6] # [R, G, B, W]
      type: rgbw
```

Configuration variables:

- **leds** array (*Required*):
  - **name** (*Required*): The name of the led.
  - **driver** (*Required*): The driver, which controls the led. Choose either `gpio` or `pca9685`.
  - **pins** (*Required*): The pins connected to the led. The order of pins is determined by the specified type.
  - **type** (*Required*): The type of led. Choose either `rgb`, `rgbw` or `simple`.
  - **freq** (*Optional*): The PWM frequency. (Default: `200`)
  - **address** (*Optional*): The address of the PCA9685 driver. (Default: `0x40`)
