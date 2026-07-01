---
title: "Add charge schedule"
action: teslemetry.add_charge_schedule
domain: teslemetry
description: "Adds or modifies a charging schedule for the vehicle."
related_actions:
  - teslemetry.remove_charge_schedule
  - teslemetry.add_precondition_schedule
  - teslemetry.set_scheduled_charging
---

The **Add charge schedule** action creates a location-based charging schedule for your Tesla vehicle, or modifies an existing one. A schedule tells the car which days and times to charge while it's parked at a particular place.

Use it to set up recurring charging at home or work, for example charging only on weekday nights when off-peak rates apply. To change an existing schedule, pass its schedule ID.

{% include actions/ui_header.md %}

To add a charge schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Add charge schedule**.
6. Select the **Vehicle** to schedule.
7. Select the **Days of week** the schedule should run on.
8. Turn **Enable** on so the schedule is active.
9. _Optional_: set the **Location**, **Start time**, **End time**, and a **Name** for the schedule.
10. Select **Save**.

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
Start time:
  description: The time the schedule begins, for example 01:05 for 1:05 AM.
  required: false
End time:
  description: The time the schedule ends, for example 01:05 for 1:05 AM.
  required: false
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

In YAML, refer to this action as `teslemetry.add_charge_schedule`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.add_charge_schedule
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    days_of_week:
      - monday
      - tuesday
      - wednesday
      - thursday
      - friday
    enable: true
    start_time: "23:00"
    end_time: "05:00"
{% endexample %}

This adds a weekday charging schedule that runs from 11:00 PM to 5:00 AM.

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
  default: true
location:
  description: >
    The approximate location the vehicle must be at to use this schedule, as a mapping with `latitude` and `longitude`. Defaults to your Home Assistant location.
  required: false
  type: map
start_time:
  description: >
    The time the schedule begins, in `HH:MM` format.
  required: false
  type: string
end_time:
  description: >
    The time the schedule ends, in `HH:MM` format.
  required: false
  type: string
one_time:
  description: >
    Whether this is a one-time schedule.
  required: false
  type: boolean
  default: false
id:
  description: >
    The ID of the schedule. Use an existing ID to modify a schedule.
  required: false
  type: integer
name:
  description: >
    A name for the schedule.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
