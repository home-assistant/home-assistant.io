---
title: Uptime Robot
description: Instructions on how to set up Uptime Robot within Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ludeeus'
ha_domain: uptimerobot
ha_platforms:
  - binary_sensor
---

The `uptimerobot` binary sensor platform allows you get the status for all of your monitors from your account on [Uptime Robot]( https://uptimerobot.com).

## Configuration

To enable the sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: uptimerobot
    api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your Uptime Robot API key.
  required: true
  type: string
{% endconfiguration %}

All the data will be fetched from [Uptime Robot](https://uptimerobot.com).

To get your API key, go to [My Settings](https://uptimerobot.com/dashboard#mySettings) on the Uptime Robot website, at the bottom you will find your "Read-Only API Key".
