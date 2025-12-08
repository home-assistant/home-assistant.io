---
title: Samsung Family Hub
description: Instructions on how to integrate Samsung Family Hub refrigerator cameras within Home Assistant.
ha_category:
  - Camera
ha_release: '0.70'
ha_iot_class: Local Polling
ha_domain: familyhub
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `familyhub` {% term integration %}  allows you to get images of the inside of your [Samsung Family Hub refrigerator](https://www.samsung.com/us/explore/family-hub-refrigerator/connected-hub/) in Home Assistant.

## Configuration

To enable your Family Hub camera in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
camera:
  - platform: familyhub
    ip_address: "IP_ADDRESS"
```

{% configuration %}
ip_address:
  description: The IP address of your refrigerator.
  required: true
  type: string
{% endconfiguration %}
