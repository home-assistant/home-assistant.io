---
title: "Sky+HD"
description: "Instructions on how to integrate a Sky+HD box into Home Assistant."
logo: sky_plus_hd.png
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.102
---

The `sky_plus_hd` integration allows you to control a [Sky](https://www.sky.com/)+HD box.

To add a Sky+HD box to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: sky_plus_hd
    host: IP_ADDRESS
```

{% configuration %}
  host:
    description: The IP address of the Sky+HD box.
    required: true
    type: string
  name:
    description: The name to use in the frontend.
    required: false
    default: "`Sky+HD`"
    type: string
{% endconfiguration %}
