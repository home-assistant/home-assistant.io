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

## {% linkable_title Special Row Elements %}

### {% linkable_title Call Service %}

{% configuration %}
type:
  required: true
  description: call-service
  type: string
name:
  required: true
  description: Main Label.
  type: string
icon:
  required: true
  description: "Icon to display (e.g., `mdi:home`)"
  type: string
action_name:
  required: true
  description: Button label.
  type: string
service:
  required: true
  description: "Service like `media_player.media_play_pause`"
  type: string
service_data:
  required: true
  description: The service data to use.
  type: object
{% endconfiguration %}

### {% linkable_title Divider %}

{% configuration %}
type:
  required: true
  description: divider
  type: string
style:
  required: false
  description: Style the element using CSS.
  type: object
  default: "height: 1px, background-color: var(--secondary-text-color)"
{% endconfiguration %}

### {% linkable_title Section %}

{% configuration %}
type:
  required: true
  description: section
  type: string
label:
  required: false
  description: Section label
  type: string
{% endconfiguration %}

### {% linkable_title Weblink %}

{% configuration %}
type:
  required: true
  description: weblink
  type: string
name:
  required: true
  description: Link label.
  type: string
icon:
  required: true
  description: "Icon to display (e.g., `mdi:home`)"
  type: string
url:
  required: true
  description: "Website URL (or internal URL e.g. `/hassio/dashboard` or `/panel_custom_name`)"
  type: string
{% endconfiguration %}

## {% linkable_title Example %}

Entity rows:

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

Special rows:

```yaml
- type: entities
  title: Entities card sample
  show_header_toggle: true
  entities:
    - type: call-service
      icon: mdi:power
      name: Bed light
      action_name: Toggle light
      service: light.toggle
      service_data:
        entity_id: light.bed_light
    - type: divider
    - type: weblink
      name: Home Assistant
      url: https://www.home-assistant.io/
      icon: mdi:home-assistant
```
