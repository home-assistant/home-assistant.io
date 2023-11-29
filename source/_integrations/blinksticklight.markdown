---
title: BlinkStick
description: Instructions on how to setup Blinkstick lights within Home Assistant.
ha_category:
  - DIY
ha_release: 0.7.5
ha_iot_class: Local Polling
ha_domain: blinksticklight
ha_platforms:
  - light
ha_integration_type: integration
---

The `blinkstick` platform lets you control your [Blinkstick](https://www.blinkstick.com/) lights from within Home Assistant.

## Setup

To use your Blinkstick, you need to allow the access to the device for [non-root users](https://github.com/arvydas/blinkstick-python#permission-problems-in-linux-and-mac-os-x).

```bash
sudo blinkstick --add-udev-rule
```

## Configuration

To add a Blinkstick to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: blinksticklight
    serial: BS000795-1.1
```

{% configuration %}
serial:
  description: The serial number of your stick.
  required: true
  default: 640
  type: string
name:
  description: Name of the stick.
  required: false
  type: string
  default: Blinkstick
{% endconfiguration %}
