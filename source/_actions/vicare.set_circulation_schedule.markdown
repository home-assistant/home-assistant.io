---
title: "Set circulation schedule"
action: vicare.set_circulation_schedule
domain: vicare
description: "Sets the domestic hot water circulation pump schedule."
related_actions:
  - vicare.get_circulation_schedule
---

Use this action to configure the weekly schedule of the domestic hot water (<abbr title="domestic hot water">DHW</abbr>) circulation pump on your Viessmann device. The circulation pump keeps hot water moving through your pipes so it reaches the tap faster, at the cost of extra energy use, so most people only run it during the hours they actually need instant hot water.

{% include actions/ui_header.md %}

To set the circulation schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater entity of your Viessmann device.
6. From the actions shown for that target, select **Viessmann ViCare: Set circulation schedule**.
7. For each day you want to change, add the time slots for that day. Days you leave out keep their current schedule.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Monday:
  description: The circulation slots for Monday. Each slot has a **from** time, a **to** time, and a **mode**. See [Good to know](#good-to-know) for details. If left out, Monday keeps its current schedule.
  required: false
Tuesday:
  description: The circulation slots for Tuesday. If left out, Tuesday keeps its current schedule.
  required: false
Wednesday:
  description: The circulation slots for Wednesday. If left out, Wednesday keeps its current schedule.
  required: false
Thursday:
  description: The circulation slots for Thursday. If left out, Thursday keeps its current schedule.
  required: false
Friday:
  description: The circulation slots for Friday. If left out, Friday keeps its current schedule.
  required: false
Saturday:
  description: The circulation slots for Saturday. If left out, Saturday keeps its current schedule.
  required: false
Sunday:
  description: The circulation slots for Sunday. If left out, Sunday keeps its current schedule.
  required: false
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
      - from: "06:00"
        to: "22:00"
        mode: "on"
    sunday: []
{% endexample %}

This runs the circulation pump on Monday from 6:00 AM to 10:00 PM and turns it off on Sunday. All other days keep their current schedule.

### Options in YAML

{% options_yaml %}
monday:
  description: >
    The circulation slots for Monday. See [Good to know](#good-to-know)
    for the fields each slot needs. If left out, Monday keeps its current
    schedule.
  required: false
  type: list
tuesday:
  description: >
    The circulation slots for Tuesday. If left out, Tuesday keeps its
    current schedule.
  required: false
  type: list
wednesday:
  description: >
    The circulation slots for Wednesday. If left out, Wednesday keeps its
    current schedule.
  required: false
  type: list
thursday:
  description: >
    The circulation slots for Thursday. If left out, Thursday keeps its
    current schedule.
  required: false
  type: list
friday:
  description: >
    The circulation slots for Friday. If left out, Friday keeps its
    current schedule.
  required: false
  type: list
saturday:
  description: >
    The circulation slots for Saturday. If left out, Saturday keeps its
    current schedule.
  required: false
  type: list
sunday:
  description: >
    The circulation slots for Sunday. If left out, Sunday keeps its
    current schedule.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

## Good to know

Each time slot in a day's list has the following fields:

- `from`: Required. The time the pump turns on, such as `06:00` or `06:10`. Times must be on a 10-minute grid.
- `to`: Required. The time the pump turns off, on a 10-minute grid. Use `24:00` for the end of the day. It must be later than `from`.
- `mode`: Required. The circulation mode for this slot. Which modes your device supports varies by model, for example `on`, `5/25-cycles`, or `5/10-cycles`. If you use a mode your device doesn't support, the action fails and the error message comes from your device.

To turn off circulation for a day, pass an empty list for that day, for example `sunday: []`.

The maximum number of slots per day depends on your device. If you exceed it, the action fails and the error message comes from your device.

To see the current schedule, use the [Get circulation schedule](/actions/vicare.get_circulation_schedule/) action. Its response uses the same format as this action, so you can save a schedule and restore it later.

Not all devices have a circulation pump. If yours doesn't, the action fails with an error saying the device does not support a domestic hot water circulation schedule.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Turn off circulation on weekends

This automation turns off the circulation pump on Saturday and Sunday every Friday evening, for example if you're usually away on weekends. The weekday schedule stays as it is.

- **Trigger**: the time is 8:00 PM on Friday
- **Action**: Set circulation schedule
  - **Target**: the water heater
  - **Saturday** and **Sunday**: no slots

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Turn off circulation on weekends"
  triggers:
    - trigger: time
      at: "20:00:00"
      weekday: fri
  actions:
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        saturday: []
        sunday: []
{% endexample %}

{% enddetails %}

### Automation: Restore the weekend schedule

This automation puts the weekend circulation schedule back every Monday morning, so the pump runs again next weekend. Adjust the times to match the hours you want the pump to run.

- **Trigger**: the time is 6:00 AM on Monday
- **Action**: Set circulation schedule
  - **Target**: the water heater
  - **Saturday** and **Sunday**: one slot from 8:00 AM to 10:00 PM in mode `on`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Restore weekend circulation schedule"
  triggers:
    - trigger: time
      at: "06:00:00"
      weekday: mon
  actions:
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        saturday:
          - from: "08:00"
            to: "22:00"
            mode: "on"
        sunday:
          - from: "08:00"
            to: "22:00"
            mode: "on"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
