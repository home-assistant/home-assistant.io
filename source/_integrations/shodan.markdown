---
title: Shodan
description: Instructions on how to integrate Shodan sensors into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.51
ha_codeowners:
  - '@fabaff'
ha_domain: shodan
ha_platforms:
  - sensor
---

The `shodan` sensor platform is displaying the total of result of a
[Shodan](https://www.shodan.io/) query.

Use "Show API Key" in the upper right corner when you are logged in or got to
your "My Account" page to retrieve your API key.

To enable this sensor, add the following lines to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: shodan
    api_key: SHODAN_API_KEY
    query: "home-assistant"
```

{% configuration %}
  api_key:
    description: The API key for Shodan.io.
    required: true
    type: string
  query:
    description: The search string.
    required: true
    type: string
  name:
    description: Name of the Shodan sensor.
    required: false
    type: string
{% endconfiguration %}
