---
title: Ripple
description: Instructions on how to integrate ripple.com data within Home Assistant.
ha_category:
  - Finance
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_domain: ripple
ha_platforms:
  - sensor
---

The `ripple` sensor platform displays Ripple wallet balances from [Ripple.com](https://ripple.com).

To add the Ripple sensor to your installation, specify a ripple address to watch in the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ripple
    address: "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV"
```

{% configuration %}
address:
  description: Ripple wallet address to watch.
  required: true
  type: string
name:
  description: Name for the sensor to use in the frontend.
  required: false
  type: string
  default: Ripple Balance
{% endconfiguration %}
