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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ripple` sensor {% term integration %} displays Ripple wallet balances from [Ripple.com](https://ripple.com).

To add the Ripple {% term integration %} to your installation, specify a ripple address to watch in the {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
