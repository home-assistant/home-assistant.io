---
layout: page
title: "Insteon (Local) Switch"
description: "Instructions how to setup the Insteon Hub switches locally within Home Assistant."
date: 2016-12-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Switch
ha_version: 0.36
---

The `insteon_local` switch component lets you control your switches connected to an [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate add a switch, configure your hub Insteon(local) with Home Assistant, add the following section to your `configuration.yaml` file:
```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
  timeout: 10
  port: 25105
```

The switches will be discovered by the hub and added to Homeassistant. The device names will be the Insteon address of the switch.
