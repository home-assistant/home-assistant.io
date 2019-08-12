---
title: "Google Cast"
description: "Instructions on how to integrate Google Cast into Home Assistant."
logo: google_cast.png
ha_category:
  - Media Player
featured: true
ha_release: pre 0.7
ha_iot_class: Local Polling
redirect_from: /components/media_player.cast/
---

Google Cast devices like Android TVs and Chromecasts will be automatically
discovered if you enable [the discovery integration](/components/discovery/). If
you don't have the discovery integration enabled, you can enable the Cast
integration by going to the Integrations page inside the config panel.

## Advanced use

The Cast integration has some extra configuration options available for advanced
users. You will still need to create a config entry to initialize the Cast
integration.

For example, Cast devices can only be discovered if they are on the same subnet
as Home Assistant. If this is not the case,
you want to configure the IP address of the Cast device directly:

```yaml
# Example configuration.yaml entry
cast:
  media_player:
    - host: 192.168.1.10
```

<div class='note'>
You may need to enable Multicast DNS (MDNS) on your router if you are on a different subnet or VLAN.
</div>

{% configuration %}
media_player:
  description: A list that contains all Cast devices.
  required: true
  type: list
  keys:
    host:
      description: Use only if you don't want to scan for devices.
      required: false
      type: string
    ignore_cec:
      description: >
        A list of Chromecasts that should ignore CEC data for determining the
        active input. [See the upstream documentation for more information.](https://github.com/balloob/pychromecast#ignoring-cec-data)
      required: false
      type: list
{% endconfiguration %}

If you want to manually configure multiple Cast media players, you can define
those as follows:

```yaml
# Example configuration.yaml entry for multiple devices
cast:
  media_player:
    - host: IP_ADDRESS_DEVICE_1
    - host: IP_ADDRESS_DEVICE_2
```
