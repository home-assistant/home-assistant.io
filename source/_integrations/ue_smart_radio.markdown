---
title: Logitech UE Smart Radio
description: Instructions on how to integrate a Logitech UE Smart Radio player into Home Assistant.
ha_category:
  - Media Player
ha_release: '0.60'
ha_iot_class: Cloud Polling
ha_domain: ue_smart_radio
ha_platforms:
  - media_player
---

The `ue_radio` platform allows you to control a [Logitech UE Smart Radio](https://www.uesmartradio.com) from Home Assistant. This lets you control both Logitech UE Smart Radios and Logitech Squeezebox Radios that have been updated with the UE Smart Radio update.

To add your UE Smart Radio player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: ue_smart_radio
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email you use to log in to `uesmartradio.com`.
  required: true
  type: string
password:
  description: The password you use to log in to `uesmartradio.com`.
  required: true
  type: string
{% endconfiguration %}
