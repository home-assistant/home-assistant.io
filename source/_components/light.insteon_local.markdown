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
---

The `insteon_local` light component lets you control your lights connected to an [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate add a light, configure your hub Insteon(local) with Home Assistant, add the following section to your `configuration.yaml` file:
```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
# Example configuration.yaml light entry  
light:
  - platform: insteon_local
    lights:
      dining_room:
        device_id: 30DA8A
        name: Dining Room
      living_room:
        device_id: 30D927
        name: Living Room
```

