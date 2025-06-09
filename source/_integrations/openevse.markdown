---
title: OpenEVSE
description: Instructions on how to integrate a WiFi-equipped OpenEVSE Charging station with Home Assistant
ha_category:
  - Car
ha_release: 0.38
ha_iot_class: Local Polling
ha_domain: openevse
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This `openevse` sensor {% term integration %} pulls data from an [OpenEVSE](https://www.openevse.com/) Charging station equipped with an ESP8266-based Wi-Fi connection.

## Configuration

To enable this sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: openevse
    host: IP_ADDRESS
    monitored_variables:
      - status
```

{% configuration %}
host:
  description: The IP address or hostname of your charger.
  required: true
  type: string
monitored_variables:
  description: Conditions to display on the frontend.
  required: true
  type: list
  keys:
    status:
      description: The status of the charger (i.e., "Connected", "Charging", etc.).
    charge_time:
      description: The number of minutes the charging has been charging, or 0 if it is not charging.
    rtc_temp:
      description: The temperature reported by the real time clock sensor, or 0 if the sensor is not installed.
    ir_temp:
      description: The temperature reported by the IR remote sensor, or 0 if the sensor is not installed.
    ambient_temp:
      description: The temperature reported by the ambient sensor, or 0 if the sensor is not installed.
    usage_session:
      description: The energy usage for the current charging session.
    usage_total:
      description: The total energy usage for the device.
{% endconfiguration %}
