---
layout: page
title: "UPnP"
description: "Automatically creates port mappings on your router for Home Assistant."
date: 2016-04-10 19:16
sidebar: true
comments: false
sharing: true
footer: true
ha_category: "Other"
---

The `upnp` component automatically creates port forwarding mappings on your router for Home Assistant. UPnP or NAT-PMP needs to be enabled on your router for this component to work.

# Installation
You need to install [miniupnpc](https://github.com/miniupnp/miniupnp/tree/master/miniupnpc) before using the UPnP component:

```bash
$ git clone https://github.com/miniupnp/miniupnp.git
$ cd miniupnp/miniupnpc
$ make
$ make pythonmodule3
$ sudo make installpythonmodule3
```

# Configuration

```yaml
# Example configuration.yaml entry
upnp:
```

A port mapping will be created using the IP address and port that Home Assistant is running on. The mapping will never automatically expire. Upon stopping Home Assistant, the mapping will be removed from your router.
