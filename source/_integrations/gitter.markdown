---
title: Gitter
description: Connect and control your Gitter devices using the Matrix integration
ha_category:
  - Hub
  - Notifications
ha_release: 0.69
ha_domain: gitter
ha_integration_type: virtual
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_supporting_domain: matrix
ha_supporting_integration: Matrix
ha_codeowners:
  - '@PaarthShah'
ha_platforms:
  - notify
ha_iot_class: Cloud Push
---

This **Gitter** {% term integration %} allows one to monitor a [Gitter.im](https://gitter.im) chatroom for unread messages.

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
