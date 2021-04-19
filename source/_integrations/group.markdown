---
title: Group
description: Instructions on how to setup groups within Home Assistant.
ha_category:
  - Organization
ha_release: pre 0.7
ha_iot_class: Calculated
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: group
ha_platforms:
  - cover
  - light
  - notify
---

Groups allow the user to combine multiple entities into one.

Check **Developer Tools** -> **States** and browse the **Current entities:** listing for all available entities.

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

## Group state calculation

The system can calculate group state with entities from the following domains:

* alarm_control_panel
* binary_sensor
* climate
* cover
* device_tracker
* fan
* humidifier
* light
* lock
* media_player
* person
* plant
* remote
* switch
* vacuum
* water_heater

When entities all have a single on and off state, the group state will
be calculated as follows:

| Domain            | on     | off      |
|-------------------|--------|----------|
| device_tracker    | home   | not_home |
| cover             | open   | closed   |
| lock              | locked | unlocked |
| person            | home   | not_home |
| media_player      | ok     | problem  |

When a group contains entities from domains that have multiple `on` states or only use `on`
and `off`, the group state will be `on` or `off`.

It is possible to create a group that the system cannot calculate a group state.
Groups with entities from unsupported domains will always have an unknown state.

Devices like motion sensors that re-trigger their state change periodically will not be
bubbled up to the group. For automations with timeouts that need to re-trigger, like motion
sensor lights, instead create multiple triggers in the automation.

These groups can still be in templates with the `expand()` directive, called using the
`homeassistant.turn_on` and `homeassistant.turn_off` services, etc.
