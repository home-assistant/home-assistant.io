---
title: "Xiaomi Air Quality Monitor"
description: "Instructions how to integrate your Xiaomi Mi Air Quality Monitor within Home Assistant."
logo: xiaomi.png
ha_category:
  - Health
ha_iot_class: Local Polling
ha_release: 0.100.4
---

The `xiaomi_miio` sensor platform is observing your Xiaomi Mi Air Quality Monitor and reporting the air quality values.

Currently, the supported features are:

- Particulate matter 2.5
- Attributes
  - carbon_dioxide_equivalent
  - relative_humidity
  - temperature
  - total_volatile_organic_compounds
  - manufacturer
  - model
  - sw_version

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

## Configuration

To add a Xiaomi Mi Air Quality Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: xiaomi_miio
    name: Xiaomi Air Quality Monitor
    host: 192.168.130.73
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
  default: Xiaomi Miio Air Quality Monitor
{% endconfiguration %}
