---
title: HifiBerry
description: How to set up the HifiBerry media player platform
logo: hifiberry.png
ha_category:
  - Media Player
ha_release: 0.107.7
ha_domain: hifiberry
---

The `HifiBerry` platform allows you to control a [HifiBerry OS](https://www.hifiberry.com/hifiberryos/) media player from Home Assistant. This is an end-to-end streaming lightweight OS built by HifiBerry for their Amp+, DAC+ or Digi+ HAT Raspberry Pi boards compatible with Airplay, Bluetooth, DLNA, LMS/Squeezebox, MPD, Snapcast, Spotify and Roon music services.


## Configuration

To configure, you can add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: hifiberry
    host: hifiberry.local
    port: 81
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
  default: hifiberry.local
  type: string
port:
  description: The Port number of Volumio service.
  required: true
  default: 81
  type: integer
{% endconfiguration %}
