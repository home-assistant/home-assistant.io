---
title: Natural Resources Wales
description: Instructions on how to use the Natural Resources Wales river levels sensor in Home Assistant.
ha_category:
  - Weather
ha_release: 0.109
ha_iot_class: Local Polling
ha_domain: natural_resources_wales
---

The `Natural Resources Wales` integration provides sensors for the river level monitoring stations in Wales using the [National Resources Wales River Levels API](https://api-portal.naturalresources.wales/docs/services/).

## Configuration

To obtain an API key to access the river levels data first go to the [National Resources Wales API portal](https://api-portal.naturalresources.wales/) and create an account. Next, go to the [River Levels API Data](https://api-portal.naturalresources.wales/products/5775297acff72d1aac51beab/) product page and subscribe to obtain your API key.

Subscribers will be able to run 10 calls/minute up to a maximum of 2880 calls/day after which access is denied.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: natural_resources_wales
    api_key: YOUR_API_KEY_HERE
```

{% configuration %}
scan_interval:
  description: Interval (in seconds) for polling. Values below 30 will result in exceeding the allowed calls/day limit.
  required: false
  type: integer
  default: 60
monitored_stations:
  description: Array of station IDs to add to Home Assistant. By default every station is added.
  required: false
  type: [list, string]
language:
  description: The language to use for the sensor properties. EN or CY.
  required: false
  type: string
  default: EN
{% endconfiguration %}
