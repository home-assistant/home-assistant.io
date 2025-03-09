---
title: Yeelight Sunflower
description: Instructions on how to setup Yeelight Sunflower hub and bulbs within Home Assistant.
ha_category:
  - Light
ha_release: 0.39
ha_iot_class: Local Polling
ha_codeowners:
  - '@lindsaymarkward'
ha_domain: yeelightsunflower
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `yeelightsunflower` {% term integration %} allows you to control your Yeelight Sunflower light bulbs with Home Assistant.

{% note %}
The "Yeelight Sunflower" bulbs are not the same as the "Yeelight WiFi" bulbs.
{% endnote %}

To enable your lights, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: yeelightsunflower
    host: 192.168.1.59
```

{% configuration %}
host:
  description: IP address of your Yeelight Sunflower hub.
  required: true
  type: string
{% endconfiguration %}

{% note %}
When the hub is loaded, your lights will appear as devices with their Zigbee IDs as part of the entity name.
{% endnote %}
