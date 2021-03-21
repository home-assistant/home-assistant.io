---
title: AVM FRITZ!Box Net Monitor
description: Instructions on how to integrate an AVM FRITZ!Box monitor into Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.36
ha_iot_class: Local Polling
ha_domain: fritzbox_netmonitor
ha_platforms:
  - sensor
---

The `fritzbox_netmonitor` sensor monitors the network statistics exposed by [AVM FRITZ!Box](https://avm.de/produkte/fritzbox/) routers.

## Configuration

For this integration to function properly, you need to have "UPnP Statusinformation transfer" activated on the AVM FRITZ!Box. Please make sure you have that enabled.

To use the FRITZ!Box network monitor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_netmonitor
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1. It is optional since every FRITZ!Box is also reachable by using the IP address 169.254.1.1.
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
|is_linked              |True if the FRITZ!Box is physically linked to the provider    |
|is_connected           |True if the FRITZ!Box has established an internet-connection  |
|external_ip            |External IP address                                          |
|uptime                 |Uptime in seconds                                            |
|bytes_sent             |Bytes sent                                                   |
|bytes_received         |Bytes received                                               |
|transmission_rate_up   |Current upstream speed in bytes/s                            |
|transmission_rate_down |Current downstream speed in bytes/s                          |
|max_byte_rate_up       |Maximum upstream-rate in bytes/s                             |
|max_byte_rate_down     |Maximum downstream-rate in bytes/s                           |

The sensor's state corresponds to the `is_linked` attribute and is either `online`, `offline`, or `unavailable` (in case connection to the router is lost).
