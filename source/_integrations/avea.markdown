---
title: Elgato Avea
description: Instructions on how to integrate Elgato Avea with Home Assistant.
ha_category:
  - Light
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@pattyland'
ha_domain: avea
ha_platforms:
  - light
---

[Elgato Avea](https://www.evehome.com/en/news/elgato-avea-transform-your-home) is a Bluetooth light bulb that is no longer supported by the manufacturer. The `avea` integration allows you to control all your Avea bulbs with Home Assistant.

### Configuration

To enable Avea, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: avea
```
