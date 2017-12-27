---
layout: page
title: "Insteon (Local) Light"
description: "Instructions how to setup the Insteon Hub Lights locally within Home Assistant."
date:  2016-12-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Light
ha_version: 0.36
ha_iot_class: "Local Push"
---

The `insteon_local` light component lets you control your lights connected to an [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate add a light, configure your hub Insteon(local) with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
  timeout: 10
  port: 25105
```

The lights will be auto discovered by the hub. The names of the devices will be the insteon address of the devices.
