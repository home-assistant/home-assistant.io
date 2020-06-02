---
title: Dune HD
description: Instructions on how to integrate Dune HD media players into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.34
ha_domain: dunehd
---

The `dunehd` media player platform allows you to control a [Dune HD media player](https://dune-hd.com/eng/products/full_hd_media_players) from Home Assistant. Support is based on the official [IP protocol](https://dune-hd.com/support/ip_control/dune_ip_control_overview.txt) published by Dune.

Devices with firmware 110127_2105_beta or above are supported. Some functions may depend on the version of the protocol (volume / mute control is only available with version 2 onwards).

To add a Dune HD player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: dunehd
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: IP address or hostname of the device, e.g., 192.168.1.32.
  required: true
  type: string
name:
  description: Name of the device.
  required: false
  default: DuneHD
  type: string
{% endconfiguration %}
