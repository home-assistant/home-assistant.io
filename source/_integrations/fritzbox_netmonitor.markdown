---
title: AVM FRITZ!Box Net Monitor
description: Instructions on how to integrate an AVM FRITZ!Box monitor into Home Assistant.
logo: avm.png
ha_category:
  - System Monitor
ha_release: 0.36
ha_iot_class: Local Polling
---

The `fritzbox_netmonitor` sensor monitors the network statistics exposed by [AVM Fritz!Box](https://avm.de/produkte/fritzbox/) routers.

To use the Fritz!Box network monitor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_netmonitor
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
  required: false
  default: 169.254.1.1
  type: string
name:
  description: Give the sensor a friendly name for in the front-end.
  required: false
  default: fritz_netmonitor
  type: string
{% endconfiguration %}

The following statistics will be exposed as attributes.

|Attribute              |Description                                                  |
|:----------------------|:------------------------------------------------------------|
|is_linked              |True if the FritzBox is physically linked to the provider    |
|is_connected           |True if the FritzBox has established an internet-connection  |
|external_ip            |External IP address                                          |
|uptime                 |Uptime in seconds                                            |
|bytes_sent             |Bytes sent                                                   |
|bytes_received         |Bytes received                                               |
|transmission_rate_up   |Current upstream speed in bytes/s                            |
|transmission_rate_down |Current downstream speed in bytes/s                          |
|max_byte_rate_up       |Maximum upstream-rate in bytes/s                             |
|max_byte_rate_down     |Maximum downstream-rate in bytes/s                           |

The sensor's state corresponds to the `is_linked` attribute and is either `online`, `offline`, or `unavailable` (in case connection to the router is lost).

<div class='note info'>
This integration does not support "Fritz!Box 6490 Cable" with FritzOS 6.87 installed.
</div>
