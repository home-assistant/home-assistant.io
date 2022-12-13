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
---

The `touchline` climate platform let you control [Roth EnergyLogic Touchline](https://www.roth-uk.com/en/roth-touchline.htm) floor heating thermostats from Roth.

<div class='note'>
This integration does not work with the newer Roth Softline and Touchline SL/PL.
</div>

{% include integrations/config_flow.md %}

To manually set it up, add the following information to your `configuration.yaml` file:

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
