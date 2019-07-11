---
title: "Switchbot"
description: "Instructions on how to set up Switchbot switches."
logo: switchbot.png
ha_category:
  - Switch
ha_release: 0.78
ha_iot_class: Local Polling
redirect_from:
 - /components/switch.switchbot/
---

The `switchbot` switch platform allows you to control Switchbot [devices](https://www.switch-bot.com/).

## Manual Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
switch:
  - platform: switchbot
    mac: 'MAC_ADDRESS'
```

{% configuration %}
mac:
  description: The device MAC address with lower-case letters.
  required: true
  type: string
name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string
{% endconfiguration %}
