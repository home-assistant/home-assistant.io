---
layout: page
title: "Automation Actions"
description: "Automations result in action."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

When an automation rule fires, it calls a service. For this service you can specify the entity_id that it should apply to and optional service parameters (to specify for example the brightness).

```yaml
automation:
  # Change the light in the kitchen and living room to 150 brightness and color red.
  action:
    service: homeassistant.turn_on
    entity_id:
      - light.kitchen
      - light.living_room
    data:
      brightness: 150
      rgb_color: [255, 0, 0]
```

```yaml
automation:
  # Notify me on my mobile phone of an event
  action:
    service: notify.notify
    data:
      message: Something just happened, better take a look!
```

If you want to specify multiple services to be called, or to include a delay, have a look at the [script component](/components/script/). If you want to describe the desired state of certain entities, check out the [scene component](/components/scene/).
