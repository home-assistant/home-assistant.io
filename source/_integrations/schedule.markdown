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

The schedule integration provides a way to create a weekly schedule in
Home Assistant that can be used to trigger or make decisions in your
automations and scripts.

The preferred way to configure a schedule is via the user interface at
**{% my helpers title="Settings > Devices & services > Helpers." %}** Click the add button
and then choose the **{% my config_flow_start domain=schedule title="Schedule" %}** option, or click the My button below.

{% include integrations/config_flow.md %}

To be able to add **{% my helpers title="Helpers" %}** via the user interface you should
have `default_config:` in your {% term "`configuration.yaml`" %}, it should already
be there by default unless you removed it.

If you removed `default_config:` from your configuration,
you must add it back or, alternatively, `schedule:` to your
`configuration.yaml` first, before you can create them via the UI.

Alternatively, a schedule can also be created and configured via YAML
configuration. For example:

```yaml
# Example configuration.yaml entry
schedule:
  thermostat_schedule:
    name: "Thermostat schedule"
    monday:
      - from: "17:00:00"
        to: "21:00:00"
    tuesday:
      - from: "17:00:00"
        to: "21:00:00"
    wednesday:
      - from: "17:00:00"
        to: "21:00:00"
    thursday:
      - from: "17:00:00"
        to: "21:00:00"
    friday:
      - from: "17:00:00"
        to: "23:00:00"
    saturday:
      - from: "07:00:00"
        to: "10:00:00"
      - from: "16:00:00"
        to: "23:00:00"
    sunday:
      - from: "07:00:00"
        to: "21:00:00"
```

Defining the schedule in YAML also allows adding extra data to each block, which will
appear as attributes on the schedule helper entity when that block is active. This can
be used to easily build schedule-based automations.

The `data` key of each block should be a mapping of attribute names to values. In this example,
the schedule helper entity will have "Brightness" and "Color temp" attributes when
the blocks are active:

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
      required: false
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
          description: Additional data to add to the entity's attributes when this block is active.
          required: false
          type: map
          default: {}
{% endconfiguration %}

### Attributes

A schedule entity's state exports attributes that can be useful in
automations and templates.

| Attribute | Description |
| ----- | ----- |
| `next_event` | A datetime object containing the next time the schedule is going to change state. |

### Automation example

A schedule creates an on/off (schedule) sensor within the times set. Using the thermostat schedule example above, you can turn on your thermostat:

```yaml
triggers:
    - trigger: state
      entity_id:
        - schedule.thermostat_schedule
      to: "on"
  actions:
    - action: climate.turn_on
      target:
        entity_id: climate.thermostat
```

Using the `light_schedule` example from above in an automation might look like this:

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
        kelvin: "{{ state_attr('schedule.light_schedule, 'temperature') }}"
```

{% endraw %}

### Actions

Available action: `schedule.reload`.

#### schedule.reload

`schedule.reload` action allows one to reload the schedule's configuration without restarting Home Assistant itself.
