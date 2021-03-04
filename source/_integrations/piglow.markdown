---
title: Piglow
description: Instructions on how to setup Piglow LED's within Home Assistant.
ha_category:
  - DIY
ha_release: 0.37
ha_iot_class: Local Polling
ha_domain: piglow
ha_platforms:
  - light
---

The `piglow` platform lets you control the [Piglow](https://shop.pimoroni.com/products/piglow) lights on your Raspberry Pi from within Home Assistant.

## Configuration

To add piglow to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: piglow
```
