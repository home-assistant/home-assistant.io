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

## {% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: entities
  type: string
entities:
  required: true
  description: "Entity id's or an `entity` object (see structure below)."
  type: list
title:
  required: false
  description: Card title
  type: string
show_header_toggle:
  required: false
  description: Button to turn on/off all entities
  type: boolean
  default: true
{% endconfiguration %}

`entity` object

{% configuration %}
entity:
  required: true
  description: "An entity_id. Example: 'device_tracker.demo_paulus'."
  type: string
name:
  required: true
  description: A new name for the entity_id
  type: string
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
