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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Elgato Avea](https://www.evehome.com/en/news/elgato-avea-transform-your-home) is a Bluetooth light bulb that is no longer supported by the manufacturer. The `avea` integration allows you to control all your Avea bulbs with Home Assistant.

## Configuration

To enable Avea, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: avea
```
