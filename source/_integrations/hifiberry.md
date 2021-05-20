---
title: HifiBerry
description: How to set up the HifiBerry media player platform
ha_category:
  - Media Player
ha_release: 2021.5.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@willholdoway'
  - '@dgomes'
ha_domain: hifiberry
ha_platforms:
  - media_player
---

The `HifiBerry` platform allows you to control a [HifiBerry OS](https://www.hifiberry.com/hifiberryos/) media player from Home Assistant. This is an end-to-end streaming lightweight OS built by HifiBerry for their Amp+, DAC+ or Digi+ HAT Raspberry Pi boards compatible with Airplay, Bluetooth, DLNA, LMS/Squeezebox, MPD, Snapcast, Spotify and Roon music services.


## Configuration

If you want to automatically discover new devices, just make sure you have discovery enabled. To manually add a HifiBerry device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: hifiberry
    host: 192.168.1.100
```

{% configuration %}
name:
  description: The name of the device.
  required: false
  default: HifiBerry
  type: string
host:
  description: The IP address or hostname of the device.
  required: true
  type: string
port:
  description: The Port number of HifiBerry audciocontrol2 rest service.
  required: false
  default: 81
  type: integer
{% endconfiguration %}
