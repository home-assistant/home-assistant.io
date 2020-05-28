---
title: "Xiaomi Air Quality Index Monitor"
description: "Instructions how to integrate your Xiaomi Mi Air Quality Index Monitor within Home Assistant."
ha_category:
  - Health
ha_iot_class: Local Polling
ha_release: 0.66
ha_domain: xiaomi_miio
---

The `xiaomi_miio` sensor platform is observing your Xiaomi Mi Air Quality Monitor (PM2.5) and reporting the air quality index.

Currently, the supported features are:

- Air Quality Index (AQI)
- Attributes
  - power
  - charging
  - battery
  - time_stat

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

## Configuration

To add a Xiaomi Mi Air Quality Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: xiaomi_miio
    host: IP_ADDRESS
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
name:
  description: The name of your miio device.
  required: false
  type: string
  default: Xiaomi Miio Sensor
{% endconfiguration %}
