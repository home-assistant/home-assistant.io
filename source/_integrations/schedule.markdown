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

The **Schedule** {% term integration %} lets you create a weekly schedule {% term entity %} in Home Assistant from time blocks with defined start and end times. The schedule is active when a time block starts and becomes inactive when it ends, so you can use it as a trigger or condition in automations and scripts.

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

Alternatively, you can configure and set up this integration manually via YAML. To enable the **Schedule** integration in your installation, add the following to your {% term "`configuration.yaml`" %} file.

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
      required: false
      type: list
      default: []
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

- `next_event`: A datetime object containing the next time the schedule is going to change state.
- `key_1`, `key_2`, ...: The mapping values from **Additional data** or `data` settings of a time block when that block is active.

## Behavior at block boundaries

Time blocks use an inclusive start and an exclusive end. A block from `09:00` to `12:00` is active from `09:00:00.000` up to but not including `12:00:00.000`.

When two time blocks on the same day touch (for example, one block from `07:00` to `10:00` and another from `10:00` to `12:00`), the schedule transitions cleanly from one to the other:

- The schedule's state stays `on` across the boundary. It does not briefly flip to `off` between two touching blocks.
- The `data` attributes are replaced with the new block's data at the moment of the transition.
- An automation triggering on the state changing to `off` does not fire at a boundary between two touching blocks.
- An automation triggering on an attribute change (for example, a new setpoint) fires once, with the new block's data.

Overlapping time blocks on the same day are not allowed and are rejected during configuration validation.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Actions

To interact with schedules from {% term scripts %} and {% term automations %}, the schedule integration provides the following {% term actions %}.

### Action: Reload

The `schedule.reload` action reloads the schedule's configuration from YAML without the need to restart Home Assistant itself.

### Action: Get schedule

The `schedule.get_schedule` action populates [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) with the configured time ranges of a schedule.
It can return multiple schedules.

```yaml
action: schedule.get_schedule
target:
  entity_id:
    - schedule.vacuum_robot
    - schedule.air_purifier
response_variable: schedules
```

The response data contains a field for every schedule entity (for example, `schedule.vacuum_robot` and `schedule.air_purifier` in this case).

Every schedule entity response has seven fields (one for each day of the week in lowercase), containing a list of the selected time ranges.
Days without any ranges will be returned as an empty list.

```yaml
schedule.vacuum_robot:
  monday:
    - from: "09:00:00"
      to: "15:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "09:00:00"
      to: "15:00:00"
  friday: []
  saturday: []
  sunday: []
schedule.air_purifier:
  monday:
    - from: "09:00:00"
      to: "18:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "09:00:00"
      to: "18:00:00"
  friday: []
  saturday:
    - from: "10:30:00"
      to: "12:00:00"
    - from: "14:00:00"
      to: "19:00:00"
  sunday: []
```

The example below uses the response data from above in a template for another action.

```yaml
action: notify.nina
data:
  title: Today's schedules
  message: >-
    Your vacuum robot will run today:
    {% for event in schedules["schedule.vacuum_robot"][now().strftime('%A').lower()] %}
    - from {{ event.from }} until {{ event.to }}<br>
    {% endfor %}
    Your air purifier will run today:
    {% for event in schedules["schedule.air_purifier"][now().strftime('%A').lower()] %}
    - from {{ event.from }} until {{ event.to }}<br>
    {% endfor %}
```

If you want to run the above action once per day, you can create an {% term automation %} with a time-based {% term trigger %}.

```yaml
triggers:
  - trigger: time
    at: "07:30:00"
```

## Schedule automation examples

You can use a schedule to decide when an automation should start, or to check whether a routine is currently active.
Here are two examples you can adapt to your own schedules.

{% include docs/paste_yaml_tip.md %}

### Automation: turn on the porch light when the evening schedule starts

If you use a schedule to define when your porch light should be active, you can start the light automatically when that schedule block begins.

- **Trigger**: Schedule block started
  - **Target**: Evening porch light schedule
- **Action**: Turn on light
  - **Target**: Porch light

{% details "YAML example for turning on the porch light when the evening schedule starts" %}

{% example %}
automation: |
  alias: "Turn on the porch light when the evening schedule starts"
  triggers:
    - trigger: schedule.turned_on
      target:
        entity_id: schedule.evening_porch_light
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: start the robot vacuum only when both quiet-time schedules are off

If you use schedules to keep certain times interruption-free, you can start your robot vacuum only when both of those schedules are no longer active.

- **Trigger**: Time: 14:00
- **Condition**: Schedule is off
  - **Target**: Quiet time schedule, Meeting schedule
  - **Condition passes if**: All
- **Action**: Start vacuum cleaner
  - **Target**: Living room vacuum

{% details "YAML example for starting the robot vacuum when both quiet-time schedules are off" %}

{% example %}
automation: |
  alias: "Start the robot vacuum when both quiet-time schedules are off"
  triggers:
    - trigger: time
      at: "14:00:00"
  conditions:
    - condition: schedule.is_off
      target:
        entity_id:
          - schedule.quiet_time
          - schedule.meeting_time
      options:
        behavior: all
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.living_room
{% endexample %}

{% enddetails %}
