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
ha_category: "Other"
ha_release: 0.18
---

The `upnp` component enables you to collect network statistics from your router such as bytes in/out and packets in/out. This information is provided by the Internet Gateway Device (IGD) Protocol if enabled on your router.

The IGD automatically creates port forwarding mappings on your router for Home Assistant, exposing your installation to the internet.  The mapping will never automatically expire. Upon stopping Home Assistant, the mapping will be removed from your router.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this component to work.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry with custom external portal
upnp:
  ports:
    hass: 8000
    8080: 8080
```

If you which to have the statistics without having port mapping done through IGD, add the option **port_mapping**.

Configuration variables:

{% configuration binary_sensor.template %}
  ports:
    description: Map of ports to map from internal to external. Pass 'hass' as internal port to use the port Home Assistant runs on.
    required: false
    type: map
    default: open same port on external router as that HASS runs locally and forwards it.
  port_mapping:
    description: If the component should try to map ports.
    required: false
    type: boolean
    default: false
  units:
    description: Define the units used for the UPNP sensor. Possible values are Bytes, KBytes, MBytes, GBytes.
    required: false
    type: string
    default: Mbytes
  local_ip:
    description: The local IP address of the computer running Home Assistant.
    required: false
    type: string
    default: Try to auto-detect IP of host.
{% endconfiguration %}
