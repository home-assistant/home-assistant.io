---
title: Orange and Rockland Utility (ORU)
description: Instructions on how to integrate the Orange and Rockland Utility real-time energy usage sensor within Home Assistant.
ha_release: 0.101
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bvlaicu'
ha_domain: oru
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Orange and Rockland Utility](https://oru.com) is an energy provider in NY and NJ, USA.
The `oru` sensor {% term integration %} fetches your current energy usage from your ORU smart meter.

## Configuration

To add the `oru` {% term integration %} to your installation, add your `meter_number` to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: oru
    meter_number: YOUR_METER_NUMBER
```

{% configuration %}
meter_number:
  description: The meter number of your smart meter with Orange and Rockland Utility. 
  required: true
  type: string
{% endconfiguration %}

`meter_number` is the smart meter number. It can be found on your energy bill, on the top left corner, alongside your account number.
