---
title: Ziggo Mediabox XL
description: Instructions on how to integrate the Ziggo Mediabox XL into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: '0.60'
ha_domain: ziggo_mediabox_xl
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Ziggo Mediabox XL** {% term integration %} allows you to control a [Ziggo](https://www.ziggo.nl/) Mediabox XL from Home Assistant.

To add a Ziggo Mediabox XL to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: ziggo_mediabox_xl
    host: 192.168.0.123
    name: Ziggo Mediabox
```

{% configuration %}
  host:
    description: The hostname or address of the device.
    required: true
    type: string
  name:
    description: The name of the device used in the frontend.
    required: false
    type: string
{% endconfiguration %}

The channel information (numbers and names) are downloaded from ziggo.nl on startup.

#### Preparation of the Mediabox

Makes sure to enable the Home Network ("mijn thuisnetwerk") service in the settings menu of the media box. Once you have set up the Media Library ("mediabiblotheek"), we can determine whether the device is turned on or off. Without this, the {% term integration %} will fail to start.
