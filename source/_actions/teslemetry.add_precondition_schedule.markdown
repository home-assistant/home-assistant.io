---
title: "Add precondition schedule"
action: teslemetry.add_precondition_schedule
domain: teslemetry
description: "Adds or modifies a preconditioning schedule for the vehicle."
related_actions:
  - teslemetry.remove_precondition_schedule
  - teslemetry.add_charge_schedule
  - teslemetry.set_scheduled_departure
---

The **Add precondition schedule** action creates a location-based preconditioning schedule for your Tesla vehicle, or modifies an existing one. Preconditioning warms the battery for improved performance and warms up or cools down the cabin so the car is comfortable by a set time on the days you choose.

Use it to have the cabin ready for your routine, for example preconditioning on weekday mornings before you leave for work. To change an existing schedule, pass its schedule ID.

{% include actions/ui_header.md %}

To add a precondition schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Add precondition schedule**.
6. Select the **Vehicle** to schedule.
7. Select the **Days of week** the schedule should run on.
8. Turn **Enable** on so the schedule is active.
9. Set the **Precondition time** the vehicle should be ready by.
10. _Optional_: set the **Location** and a **Name** for the schedule.
11. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to schedule.
Days of week:
  description: The days this schedule runs on. You can select multiple days.
Enable:
  description: Whether this schedule should be active.
Location:
  description: The approximate location the vehicle must be at to use this schedule. Defaults to your Home Assistant location.
  required: false
Precondition time:
  description: The time the vehicle should finish preconditioning, for example 01:05 for 1:05 AM.
One-time:
  description: Whether this is a one-time schedule.
  required: false
Schedule ID:
  description: The ID of the schedule. Use an existing ID to modify a schedule.
  required: false
Name:
  description: A name for the schedule.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.add_precondition_schedule`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.add_precondition_schedule
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    days_of_week:
      - monday
      - tuesday
      - wednesday
      - thursday
      - friday
    enable: true
    precondition_time: "07:30"
{% endexample %}

This preconditions the cabin to be ready by 7:30 AM on weekdays.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to schedule.
  required: true
  type: string
days_of_week:
  description: >
    The days this schedule runs on. Use the lowercase day names, such as `monday` or `saturday`.
  required: true
  type: list
enable:
  description: >
    Whether this schedule should be active.
  required: true
  type: boolean
location:
  description: >
    The approximate location the vehicle must be at to use this schedule, as a mapping with `latitude` and `longitude`. Defaults to your Home Assistant location.
  required: false
  type: map
precondition_time:
  description: >
    The time the vehicle should finish preconditioning, in `HH:MM` format.
  required: true
  type: string
id:
  description: >
    The ID of the schedule. Use an existing ID to modify a schedule.
  required: false
  type: integer
one_time:
  description: >
    Whether this is a one-time schedule.
  required: false
  type: boolean
  default: false
name:
  description: >
    A name for the schedule.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
