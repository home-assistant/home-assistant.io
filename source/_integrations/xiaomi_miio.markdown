---
title: Xiaomi miio
description: Instructions how to integrate your Xiaomi Mi WiFi Repeater 2 within Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.67
ha_codeowners:
  - '@rytilahti'
  - '@syssi'
ha_domain: xiaomi_miio
---

The `xiaomi_miio` device tracker platform is observing your Xiaomi Mi WiFi Repeater 2 and reporting all associated WiFi clients.

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token.

To add a Xiaomi Mi WiFi Repeater device tracker to your installation, add the following to your `configuration.yaml` file:

```yaml
device_tracker:
  - platform: xiaomi_miio
    host: 192.168.130.73
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
{% endconfiguration %}
