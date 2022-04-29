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
---

The `yeelightsunflower` light platform allows you to control your Yeelight Sunflower light bulbs with Home Assistant.

<div class='note warning'>
The "Yeelight Sunflower" bulbs are not the same as the "Yeelight WiFi" bulbs.
</div>

To enable your lights, add the following lines to your `configuration.yaml` file:

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

<div class='note'>
When the hub is loaded, your lights will appear as devices with their Zigbee IDs as part of the entity name.
</div>

<div class='note warning'>
The Yeelight Sunflower hub supports SSDP discovery, but that has not been built into the platform. Let the developer know if that would be helpful to you.
</div>
