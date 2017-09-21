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
  external_port: 80
```

If you which to have the statistics without having port mapping done through IGD, add the option **port_mapping**.

Configuration variables:

- **external_port** (*Optional*): Expose Home Assistant to the internet over this TCP port. Defaults to Home Assistant configured port.
- **port_mapping** (*Optional*): Disables port mapping  maintains the network statistics sensors)
- **unit** (*Optional*): UPnP sensors unit. Valid units are 'Bytes', 'KBytes', 'MBytes' and 'GBytes'.
