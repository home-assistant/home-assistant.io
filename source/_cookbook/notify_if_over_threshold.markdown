---
layout: page
title: "Send notification based on sensor"
description: "Basic example of how to send a templated notification if a sensor is over a given threshold"
date: 2016-02-25 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

The following example sends a notification via pushbullet if a sensor is over a critical value:

```yaml

notify me:
  platform: pushbullet
  api_key: "API_KEY_HERE"
  name: mypushbullet

automation:
  - alias: FanOn
    trigger:
      platform: numeric_state
      entity_id: sensor.furnace
      above: 2
    action:
      service: notify.mypushbullet
      data:
        title: "Furnace fan is running"
        message: "Fan running because current is {% raw %}{{ states.sensor.furnace.state }}{% endraw %} amps"
```

If you also want a notification when it drops back down below that limit, you could add this as well:

```yaml
  - alias: FanOff
    trigger:
      platform: numeric_state
      entity_id: sensor.furnace
      below: 2
    action:
      service: notify.mypushbullet
      data:
        title: "Furnace fan is stopped"
        message: "Fan stopped because current is {% raw %}{{ states.sensor.furnace.state }}{% endraw %} amps"
```
