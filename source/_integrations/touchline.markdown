---
title: Roth Touchline
description: Instructions on how to integrate Roth Touchline within Home Assistant.
ha_category:
  - Climate
ha_release: 0.61
ha_iot_class: Local Polling
ha_domain: touchline
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

The `touchline` climate platform let you control [ROTH Touchline](https://www.roth-uk.com/en/roth-touchline.htm) floor heating thermostats from Roth.

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
climate:
  - platform: touchline
    host: YOUR_IPADDRESS
```

{% configuration %}
host:
  description: The IP address of your controller, e.g., `http://192.168.1.1`.
  required: false
  type: string
{% endconfiguration %}
