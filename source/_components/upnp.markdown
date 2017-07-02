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

The IGD can also automatically create port forwarding mappings on your router for Home Assistant. By default it port forwards the tcp port being used by Home Assistant (default 8123), this can be changed with the optional external_port parameter.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this component to work.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
upnp:
  external_port: 80
```

A port mapping will be created using the IP address and port that Home Assistant is running on. The mapping will never automatically expire. Upon stopping Home Assistant, the mapping will be removed from your router.

If you which to have the statistics without having port mapping done through IGD, add the option:
```yaml
# Example configuration.yaml entry with port mapping disabled 
upnp:
  port_mapping: false
```
