---
layout: page
title: "UPnP"
description: "Internet Gateway Device (IGD) Protocol for Home Assistant."
date: 2016-04-10 19:16
sidebar: true
comments: false
sharing: true
footer: true
logo: upnp.png
ha_category: Network
ha_release: 0.18
---

The `upnp` component enables you to collect network statistics from your router such as bytes in/out and packets in/out. This information is provided by the [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)/[Internet Gateway Device (IGD) Protocol](https://en.wikipedia.org/wiki/Internet_Gateway_Device_Protocol) if enabled on your router.

The IGD can automatically create port forwarding mappings on your router for Home Assistant, exposing your installation to the internet. The mapping will never automatically expire. Upon stopping Home Assistant, the mapping will be removed from your router.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this component to work.

## {% linkable_title Configuration %}

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry with custom external portal
upnp:
  port_mapping: true
  ports:
    hass: 8000
    8080: 8080
```

With the default settings only the sensors are added for statistics. If you wish to have port mapping done through IGD, add the option **port_mapping** and **ports**.

{% configuration %}
port_mapping:
  description: If the component should try to map ports.
  required: false
  type: boolean
  default: false
sensors:
  description: If the component should enable the UPNP sensors.
  required: false
  type: boolean
  default: true
local_ip:
  description: The local IP address of the computer running Home Assistant.
  required: false
  type: string
  default: Try to auto-detect IP of host.
ports:
  description: Map of ports to map from internal to external. Pass 'hass' as internal port to use the port Home Assistant runs on. Note that you have to enable port_mapping if you wish to map ports.
  required: false
  type: map
  default: Open same port on external router as that HASS runs locally and forwards it.
{% endconfiguration %}
