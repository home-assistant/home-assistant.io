---
title: Blinkt!
description: Instructions on how to setup Blinkt! RGB LED lights within Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Push
ha_release: 0.44
ha_domain: blinkt
ha_platforms:
  - light
---

The `blinkt` light platform lets you control the [Blinkt!](https://shop.pimoroni.com/products/blinkt) board, featuring eight super-bright RGB LEDs.

## Configuration

To enable `blinkt` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: blinkt
```
