---
title: Gitter
description: Instructions on how to integrate a Gitter room sensor with Home Assistant
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.47
ha_codeowners:
  - '@fabaff'
ha_domain: gitter
ha_platforms:
  - sensor
---

This `gitter` sensor allows one to monitor a [Gitter.im](https://gitter.im) chatroom for unread messages.

## Configuration

Visit [Gitter Developer Apps](https://developer.gitter.im/apps) to retrieve your "Personal Access Token".

To use a Gitter sensor in your installation, add the following to your `configuration.yaml` file:

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
  default: home-assistant/home-assistant
{% endconfiguration %}
