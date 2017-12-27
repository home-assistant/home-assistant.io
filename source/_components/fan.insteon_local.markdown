---
layout: page
title: "Insteon (Local) Fan"
description: "Instructions how to setup the Insteon Hub Fans locally within Home Assistant."
date:  2017-04-06 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Fan
ha_version: 0.48
---

The `insteon_local` fan component lets you control your fan connected to an [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate add a fan, configure your hub Insteon(local) with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
  timeout: 10
  port: 25105
```

The devices will be discovered by the hub and added to Homeassistant. The name of the devices will be the Insteon address. 
