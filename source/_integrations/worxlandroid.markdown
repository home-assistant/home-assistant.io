---
title: Worx Landroid
description: Instructions on how to integrate Worx Landroid WG796E.1 or WG797E as sensors within Home Assistant.
ha_category:
  - DIY
ha_release: 0.54
ha_iot_class: Local Polling
ha_domain: worxlandroid
ha_platforms:
  - sensor
---

The `worxlandroid` sensor platform allows you to get the current state, battery level and error status Worx Landroid WG796E.1 or WG797E.

To use your Worx Landroid mower in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: worxlandroid
  host: 192.168.0.10
  pin: 1234
```

{% configuration %}
host:
  description: The IP address or host name of the mower.
  required: true
  type: string
pin:
  description: The pin code for the mower.
  required: true
  type: integer
allow_unreachable:
  description: This will allow the mower to be outside of Wi-Fi range without raising an error.
  required: false
  type: boolean
  default: true
{% endconfiguration %}
