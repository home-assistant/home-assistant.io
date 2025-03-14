---
title: Kaiterra
description: Instructions on how to integrate your Kaiterra device into Home Assistant.
ha_iot_class: Cloud Polling
ha_category:
  - Health
ha_release: '0.100'
ha_codeowners:
  - '@Michsior14'
ha_domain: kaiterra
ha_platforms:
  - air_quality
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `kaiterra` {% term integration %} allows you to view the readings from your Laser Egg or Sensedge device using the [Kaiterra REST API](https://dev.kaiterra.com/).

To use the {% term integration %}, you need to get the API key by signing up at [Kaiterra dashboard](https://dashboard.kaiterra.cn/), registering the device and create the key under `Settings -> Profile -> Developer`.

## Configuration

To enable `kaiterra` in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
kaiterra:
  api_key: YOUR_API_KEY
  devices:
    - device_id: YOUR_DEVICE_ID
      type: YOUR_DEVICE_TYPE
```

{% configuration %}
api_key:
  description: Your personal API key from Kaiterra Dashboard.
  required: true
  type: string
aqi_standard:
  description: The standard of Air Quality Index. Available values `us`, `in`, `cn`.
  required: false
  type: string
  default: us
scan_interval:
  description: The interval to scan for sensor state changes in seconds.
  required: false
  type: integer
  default: 30
preferred_units:
  description: The list of preferred units. Available values in the list `x`, `%`, `C`, `F`, `mg/m³`, `µg/m³`, `ppm`, `ppb`.
  required: false
  type: list
devices:
  description: The devices you want to get reading from.
  required: true
  type: list
  keys:
    device_id:
      description: The UUID of the device you want to monitor. You can take it from Kaiterra Dashboard.
      required: true
      type: string
    type:
      description: The device type. Available values `laseregg` and `sensedge`.
      required: true
      type: string
    name:
      description: The custom name of your device.
      required: false
      type: string
{% endconfiguration %}
