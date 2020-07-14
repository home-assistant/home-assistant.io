---
title: "Xiaomi Air Quality Monitor"
description: "Instructions how to integrate your Xiaomi Mi Air Quality Monitor within Home Assistant."
ha_category:
  - Health
ha_iot_class: Local Polling
ha_release: 0.102
ha_domain: xiaomi_miio
---

The `xiaomi_miio` sensor platform is observing your Xiaomi Mi Air Quality Monitor and reporting the air quality values.

Currently, the supported features are:

- Particulate matter 2.5
- Attributes
  - carbon_dioxide_equivalent
  - total_volatile_organic_compounds
  - temperature
  - humidity

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

## Configuration

To add a Xiaomi Mi Air Quality Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
air_quality:
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
  default: Xiaomi Miio Air Quality Monitor
{% endconfiguration %}
