---
title: Gitter
description: Instructions on how to integrate a Gitter room sensor with Home Assistant
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.47
ha_domain: gitter
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This `gitter` {% term integration %} allows one to monitor a [Gitter.im](https://gitter.im) chatroom for unread messages.

## Configuration

Visit [Gitter Developer Apps](https://developer.gitter.im/apps) to retrieve your "Personal Access Token".

To use a Gitter {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gitter
    api_key: YOUR_API_TOKEN
```

{% configuration %}
api_key:
  description: Your Gitter.im API token.
  required: true
  type: string
room:
  description: Gitter room to monitor.
  required: false
  type: string
  default: "`home-assistant/home-assistant`"
{% endconfiguration %}
