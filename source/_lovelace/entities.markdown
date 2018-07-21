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
  description: "A list of entity IDs or `entity` objects, see below."
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

## {% linkable_title Options For Entities %}

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
type:
  required: false
  description: "Sets a custom card type: `custom:my-custom-card`"
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture.
  type: string
secondary_info:
  required: false
  description: "Show additional info. Values: `entity-id`, `last-changed`."
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
