---
title: "Local IP"
description: "Instructions on how to integrate the local IP sensor into Home Assistant."
logo: home-assistant.png
ha_category:
  - Network
ha_iot_class: Assumed State
ha_release: 0.104
---

The `localip` sensor will expose the local (LAN) IP address of your Home Assistant instance. This can be useful when your instance has a static public hostname (for example, if you use the Nabu Casa service), but have a dynamically allocated local LAN address (for example, configured via DHCP).

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
localip:
```

No additional configuration is needed.
