---
title: "Set circulation schedule"
action: vicare.set_circulation_schedule
domain: vicare
description: "Sets the DHW circulation pump weekly schedule."
related_actions:
  - vicare.set_vicare_mode
---

Use this action to configure the weekly schedule of the domestic hot water (<abbr title="domestic hot water">DHW</abbr>) circulation pump on your Viessmann device. The circulation pump keeps hot water moving through your pipes so it reaches the tap faster, at the cost of extra energy use, so most people only run it during the hours they actually need instant hot water.

{% include actions/ui_header.md %}

To set the circulation schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater entity you want to control.
6. From the actions shown for that target, select **Viessmann ViCare: Set circulation schedule**.
7. For every day of the week, add the time slots you want. Days with no circulation still need to be included, just leave them empty.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Monday:
  description: The circulation slots for Monday. See [Good to know](#good-to-know) for the fields each slot needs.
  required: true
Tuesday:
  description: The circulation slots for Tuesday.
  required: true
Wednesday:
  description: The circulation slots for Wednesday.
  required: true
Thursday:
  description: The circulation slots for Thursday.
  required: true
Friday:
  description: The circulation slots for Friday.
  required: true
Saturday:
  description: The circulation slots for Saturday.
  required: true
Sunday:
  description: The circulation slots for Sunday.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vicare.set_circulation_schedule`. Each weekday field is a list of time slots for that day. A basic example looks like this:

{% example %}
action: |
  action: vicare.set_circulation_schedule
  target:
    entity_id: water_heater.main_water_heater
  data:
    monday:
      - start_time: "06:00"
        end_time: "22:00"
        mode: "on"
        position: 0
    tuesday: []
    wednesday: []
    thursday: []
    friday: []
    saturday: []
    sunday: []
{% endexample %}

This runs the circulation pump on Monday from 6:00 AM to 10:00 PM and turns it off for the rest of the week.

### Options in YAML

{% options_yaml %}
monday:
  description: >
    The circulation slots for Monday. See [Good to know](#good-to-know)
    for the fields each slot needs.
  required: true
  type: list
tuesday:
  description: >
    The circulation slots for Tuesday.
  required: true
  type: list
wednesday:
  description: >
    The circulation slots for Wednesday.
  required: true
  type: list
thursday:
  description: >
    The circulation slots for Thursday.
  required: true
  type: list
friday:
  description: >
    The circulation slots for Friday.
  required: true
  type: list
saturday:
  description: >
    The circulation slots for Saturday.
  required: true
  type: list
sunday:
  description: >
    The circulation slots for Sunday.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

## Good to know

Each time slot in a day's list is a mapping with the following keys:

- `start_time`: Required. The time the pump turns on, as `HH:MM`, on a 10-minute resolution, such as `06:00` or `06:10`.
- `end_time`: Required. The time the pump turns off, as `HH:MM`, on a 10-minute resolution. Use `24:00` for midnight.
- `mode`: Required. The circulation mode for this slot. Which modes your device supports varies by model, for example `on`, `5/25-cycles`, or `5/10-cycles`. If you use a mode your device doesn't support, the action fails and the error message lists the modes it does support.
- `position`: Required. The slot's position among the day's slots, starting at `0`.

All seven weekday fields are required on every call, even for days with no scheduled circulation. Use an empty list, for example `sunday: []`, for those days.

The maximum number of slots per day depends on your device. If you exceed it, the action fails and the error message includes your device's actual limit.

The current schedule is available as the `circulation_schedule` attribute of the water heater {% term entity %}. Not all devices support a circulation pump. If yours doesn't, this attribute is absent. Its field names (`mon` through `sun`, with `start`/`end` per slot) don't match this action's fields (`monday` through `sunday`, with `start_time`/`end_time`), so you can't pass its value straight back into this action — remap the keys first if you want to restore a saved schedule.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Turn off circulation when you leave

This automation stops the circulation pump as soon as everyone leaves home, so it doesn't run while nobody's there to use it.

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Turn off circulation pump when away"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        monday: []
        tuesday: []
        wednesday: []
        thursday: []
        friday: []
        saturday: []
        sunday: []
{% endexample %}

{% enddetails %}

### Automation: Restore the schedule when you get home

This automation puts a fixed weekly schedule back once someone returns. Adjust the times to match the hours you actually want the pump to run.

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Restore circulation schedule when home"
  triggers:
    - trigger: state
      entity_id: zone.home
      from: "0"
  actions:
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        monday:
          - start_time: "06:00"
            end_time: "22:00"
            mode: "on"
            position: 0
        tuesday:
          - start_time: "06:00"
            end_time: "22:00"
            mode: "on"
            position: 0
        wednesday:
          - start_time: "06:00"
            end_time: "22:00"
            mode: "on"
            position: 0
        thursday:
          - start_time: "06:00"
            end_time: "22:00"
            mode: "on"
            position: 0
        friday:
          - start_time: "06:00"
            end_time: "22:00"
            mode: "on"
            position: 0
        saturday:
          - start_time: "08:00"
            end_time: "22:00"
            mode: "on"
            position: 0
        sunday:
          - start_time: "08:00"
            end_time: "22:00"
            mode: "on"
            position: 0
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
