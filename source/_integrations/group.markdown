---
title: Group
description: Instructions on how to setup groups within Home Assistant.
ha_category:
  - Organization
ha_release: pre 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: group
---

Groups allow the user to combine multiple entities into one.

Check the **States** <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> page from the **Developer Tools** and browse the **Current entities:** listing for all available entities.

```yaml
# Example configuration.yaml entry
group:
  kitchen:
    name: Kitchen
    entities:
      - switch.kitchen_pin_3
  climate:
    name: Climate
    entities:
      - sensor.bedroom_temp
      - sensor.porch_temp
  awesome_people:
    name: Awesome People
    entities:
      - device_tracker.dad_smith
      - device_tracker.mom_smith
```

{% configuration %}
name:
  description: Name of the group.
  required: false
  type: string
entities:
  description: Array or comma delimited string, list of entities to group.
  required: true
  type: list
all:
  description: Set this to `true` if the group state should only turn *on* if **all** grouped entities are *on*.
  required: false
  type: boolean
  default: false
icon:
  description: The icon that shows in the front end.
  required: false
  type: string
{% endconfiguration %}

## Group behavior

By default when any member of a group is `on` then the group will also be `on`. Similarly with a device tracker, when any member of the group is `home` then the group is `home`. If you set the `all` option to `true` though, this behavior is inverted and all members of the group have to be `on` for the group to turn on as well.
