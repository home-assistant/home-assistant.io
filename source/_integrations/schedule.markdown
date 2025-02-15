---
title: Schedule
description: Instructions on how to make a weekly schedule in Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 2022.9
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: schedule
ha_integration_type: helper
---

The **Schedule** {% term integration %} provides a way to create a weekly schedule {% term entity %} in Home Assistant, consisting of time blocks with defined start and end times. The schedule is active when a time block starts and becomes inactive when it ends, allowing it to be used for triggering or making decisions in automations and scripts.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: Friendly name of the schedule.
Icon:
  description: Icon to display in the frontend for this schedule.
Schedule blocks:
  description: >
    Press and drag to select time blocks for each day of the week.
    It is not possible to create overlapping time blocks on the same day.
{% endconfiguration_basic %}

After creating schedule blocks, you can press a block to edit the details.

{% configuration_basic %}
Start:
  required: true
  type: time
  description: The start time to mark the schedule as active/on.
End:
  required: true
  type: time
  description: The end time to mark as inactive/off again.
Additional data:
  required: false
  type: map
  description: A mapping of attribute names to values, which will be added to the entity's attributes when the block is active.
{% endconfiguration_basic %}

### Adding additional data

Adding the following as `Additional data` will show `brightness` and `color_temp` as {% term entity %} attributes when the block is active:

```yaml
brightness: 100
color_temp: 4000
```

## YAML configuration

Alternatively, this {% term integration %} can be configured and set up manually via YAML instead.
To enable the Integration sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.

{% note %}

The `data` field follows the same logic as described above in *Adding additional data*.

{% endnote %}


```yaml
schedule:
  light_schedule:
    name: "Light schedule"
    wednesday:
      - from: "17:00:00"
        to: "21:00:00"
        data:
          brightness: 100
          color_temp: 4000
    thursday:
      - from: "17:00:00"
        to: "23:00:00"
        data:
          brightness: 90
          color_temp: 3500
    friday:
      - from: "07:00:00"
        to: "10:00:00"
        data:
          brightness: 80
          color_temp: 3000
      - from: "16:00:00"
        to: "23:00:00"
        data:
          brightness: 60
          color_temp: 2500
```

{% configuration %}
schedule:
  description: Alias for the schedule. Multiple entries are allowed.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the schedule.
      required: true
      type: string
    icon:
      description: Icon to display in the frontend for this schedule.
      required: false
      type: icon
    "monday|tuesday|wednesday|thursday|friday|saturday|sunday":
      description: A schedule for each day of the week.
      required: true
      type: list
      keys:
        from:
          description: The start time to mark the schedule as active/on.
          required: true
          type: time
        to:
          description: The end time to mark as inactive/off again.
          required: true
          type: time
        data:
          description: A mapping of attribute names to values, which will be added to the entity's attributes when the block is active.
          required: false
          type: map
          default: {}
{% endconfiguration %}

## Attributes

A schedule entity exports state attributes that can be useful in automations and templates.

| Attribute | Description |
| ----- | ----- |
| `next_event` | A datetime object containing the next time the schedule is going to change state. |
| `key_1`, `key_2`, ... | The mapping values from **Additional data** / `data` settings of a time block when the respective block is active. |

## Automation example

A schedule creates an on/off (schedule) sensor within the times set.
By incorporating the `light_schedule` example from above in an automation, we can turn on a light when the schedule is active.

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - schedule.light_schedule
    to: "on"
actions:
  - action: light.turn_on
    target:
      entity_id: light.kitchen
    data:
      brightness_pct: "{{ state_attr('schedule.light_schedule', 'brightness') }}"
      kelvin: "{{ state_attr('schedule.light_schedule', 'color_temp') }}"
```

{% endraw %}

Another automation can be added to turn the lights off once the schedule is inactive: 

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - schedule.light_schedule
    to: "off"
actions:
  - action: light.turn_off
    target:
      entity_id: light.kitchen
```

{% endraw %}

### Actions

Available action: `schedule.reload`.

#### schedule.reload

`schedule.reload` action allows one to reload the schedule's configuration without restarting Home Assistant itself.
