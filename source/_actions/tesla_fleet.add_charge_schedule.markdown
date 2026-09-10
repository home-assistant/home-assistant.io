---
title: "Add charge schedule"
action: tesla_fleet.add_charge_schedule
domain: tesla_fleet
description: "Adds a charging schedule to a vehicle, or modifies an existing one."
related_actions:
  - tesla_fleet.remove_charge_schedule
---

Use this action to add a new charging schedule to a Tesla vehicle, or to change an existing one by giving its schedule ID.

This is handy in an automation, for example, to switch a vehicle to a different charging schedule when your electricity tariff changes.

{% include actions/ui_header.md %}

To add or modify a charge schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tesla Fleet: Add charge schedule**.
6. Select the **Vehicle** to schedule.
7. Set **Days of week** and **Enable**. Set **Start time**, **End time**, or both.
8. Optionally, set **Location**, **One-time**, and **Schedule ID**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to schedule.
  required: true
Days of week:
  description: The days this schedule should be enabled on. You can select multiple days.
  required: true
Enable:
  description: Whether this schedule should be considered for execution.
  required: true
Start time:
  description: The time this schedule begins, for example 01:05 for 1:05 AM. At least one of start time or end time is required.
  required: false
End time:
  description: The time this schedule ends, for example 01:05 for 1:05 AM. At least one of start time or end time is required.
  required: false
Location:
  description: The approximate location the vehicle must be at to use this schedule. When not set, this uses your Home Assistant instance's configured location.
  required: false
One-time:
  description: Whether this is a one-time schedule.
  required: false
Schedule ID:
  description: The ID of the schedule. Give the ID of an existing schedule to modify it instead of adding a new one.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tesla_fleet.add_charge_schedule`. A basic example looks like this:

{% example %}
action: |
  action: tesla_fleet.add_charge_schedule
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    days_of_week:
      - monday
      - wednesday
      - friday
    enable: true
    start_time: "01:00"
    end_time: "05:00"
  response_variable: schedule
{% endexample %}

This adds a new schedule that charges the vehicle between 1:00 AM and 5:00 AM on Monday, Wednesday, and Friday, and returns the ID of the new schedule in the `schedule` variable.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The vehicle to schedule.
  required: true
  type: string
days_of_week:
  description: >
    The days this schedule should be enabled on. Accepts a list of one or
    more of `monday`, `tuesday`, `wednesday`, `thursday`, `friday`,
    `saturday`, and `sunday`.
  required: true
  type: list
enable:
  description: >
    Whether this schedule should be considered for execution.
  required: true
  type: boolean
start_time:
  description: >
    The time this schedule begins. At least one of `start_time` or
    `end_time` is required.
  required: false
  type: string
end_time:
  description: >
    The time this schedule ends. At least one of `start_time` or
    `end_time` is required.
  required: false
  type: string
location:
  description: >
    The approximate location the vehicle must be at to use this schedule.
    When not set, this uses your Home Assistant instance's configured
    location.
  required: false
  type: object
one_time:
  description: >
    Whether this is a one-time schedule.
  required: false
  type: boolean
id:
  description: >
    The ID of the schedule. Give the ID of an existing schedule to modify
    it instead of adding a new one.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- This action returns the schedule's `id` as response data. Use `response_variable` to capture it if you need to modify or remove the schedule later.
- If you don't provide a schedule `id`, a new schedule is always added, even if an identical one already exists.
- Your Tesla Developer Application must have the vehicle charging commands scope selected, and the vehicle may need to wake up to receive the schedule, which can take a few seconds.
- Midnight (`00:00`) is a valid start or end time, but not when it is the only time given. Set both a start time and an end time if either one is midnight.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to an off-peak charging schedule

When your utility's off-peak electricity rate begins, add a charging schedule so the car only charges during those hours.

- **Trigger**: Off-peak tariff helper turns on
- **Action**: Tesla Fleet: Add charge schedule
  - **Target**: My Tesla
  - **Days of week**: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
  - **Enable**: On
  - **Start time**: 00:00
  - **End time**: 05:00

{% details "YAML example for an off-peak charging schedule" %}

{% example %}
automation: |
  alias: "Add off-peak charging schedule"
  triggers:
    - trigger: state
      entity_id: binary_sensor.off_peak_tariff
      to: "on"
  actions:
    - action: tesla_fleet.add_charge_schedule
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        days_of_week:
          - monday
          - tuesday
          - wednesday
          - thursday
          - friday
          - saturday
          - sunday
        enable: true
        start_time: "00:00"
        end_time: "05:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
