---
layout: page
title: "Entities Card"
sidebar_label: Entities
description: "Entities will be the most common type of card that will also be the most familiar to people using the standard interface. It groups items together very close to how groups used to do."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Entities will be the most common type of card that will also be the most familiar to people using the standard interface. It groups items together very close to how groups used to do.

{% configuration %}
type:
  required: true
  description: entities
  type: string
entities:
  required: true
  description: "A list of entity IDs or an `entity` object."
  type: list
title:
  required: false
  description: The card title.
  type: string
show_header_toggle:
  required: false
  description: Button to turn on/off all entities.
  type: boolean
  default: true
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: entities
  title: Entities card sample
  show_header_toggle: true
  entities:
    - entity: alarm_control_panel.alarm
      name: Alarm Panel
    - device_tracker.demo_paulus
    - switch.decorative_lights
    - group.all_lights
    - group.all_locks
```
