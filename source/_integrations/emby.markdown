---
title: Emby
description: Instructions on how to integrate Emby into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.32
ha_iot_class: Local Push
ha_codeowners:
  - '@mezz64'
ha_domain: emby
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `emby` platform allows you to control a [Emby](https://emby.media/) multimedia system from Home Assistant.

To add Emby to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: emby
    host: YOUR_IP_ADDRESS
    api_key: YOUR_API_KEY
```

{% configuration %}
host:
  description: The host name or IP address of the device that is running Emby.
  required: false
  default: localhost
  type: string
api_key:
  description: The API key to use to authenticate.
  required: true
  type: string
ssl:
  description: Connect with HTTPS/WSS. Your SSL certificate must be valid.
  required: false
  default: false
  type: boolean
port:
  description: The port number of the device that is running Emby.
  required: false
  default: 8096 (No SSL),  8920 (SSL)
  type: integer
{% endconfiguration %}
