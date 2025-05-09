---
title: Panasonic Blu-Ray Player
description: Instructions on how to integrate a Panasonic Blu-Ray player into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.83
ha_domain: panasonic_bluray
ha_platforms:
  - media_player
ha_integration_type: integration
ha_quality_scale: legacy
---

The `panasonic_bluray` platform allows you to control a Panasonic Blu-Ray player. Note that the device must be on the same subnet as Home Assistant; connections from a different subnet will return an error.

Currently known supported models:

- DMP-BDT120
- DMP-BDT220
- DMP-BDT221
- DMP-BDT320
- DMP-BDT500
- DMP-BBT01

The following newer models currently support a limited set of status commands:

- DP-UB420
- DP-UB820
- DP-UB9000
 
If your model is not on the list, then give it a try, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/panasonic_bluray.markdown).

Example configuration:

```yaml
media_player:
  - platform: panasonic_bluray
    host: 192.168.0.10
```

{% configuration %}
host:
  description: The IP of the Panasonic Blu-Ray device, e.g., `192.168.0.10`.
  required: true
  type: string
name:
  description: The name you would like to give to the Panasonic Blu-Ray device.
  required: false
  default: Panasonic Blu-Ray
  type: string
{% endconfiguration %}

### Supported operations

- These devices support play, pause, stop and power on/off operations. They will also report the current status, title duration and current playing position.
