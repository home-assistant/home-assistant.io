---
title: "Set scheduled departure"
action: teslemetry.set_scheduled_departure
domain: teslemetry
description: "Sets a departure time so the vehicle schedules charging and preconditioning."
related_actions:
  - teslemetry.set_scheduled_charging
  - teslemetry.add_precondition_schedule
  - teslemetry.navigation_gps_request
---

The **Set scheduled departure** action tells your Tesla vehicle when you plan to leave. The car uses this to finish charging and to warm up or cool down the cabin so it's ready by your departure time. You can also let it shift charging into off-peak hours.

Use it to have the car comfortable and fully charged for your morning commute, while charging during cheaper off-peak periods overnight.

{% include actions/ui_header.md %}

To set a scheduled departure from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Set scheduled departure**.
6. Select the **Vehicle** to schedule.
7. Turn **Enable** on to schedule a departure, or off to clear the schedule.
8. _Optional_: turn on **Preconditioning enabled** and set the **Departure time** so the cabin is ready in time.
9. _Optional_: turn on **Off-peak charging enabled** and set the **End off-peak time** to shift charging into cheaper hours.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to schedule.
Enable:
  description: Turn the scheduled departure on or off.
  required: false
Preconditioning enabled:
  description: Warm up or cool down the cabin so it's ready by the departure time.
  required: false
Preconditioning weekdays only:
  description: Apply preconditioning on weekdays only.
  required: false
Departure time:
  description: The time you plan to leave. Required when you enable preconditioning.
  required: false
Off-peak charging enabled:
  description: Allow charging to continue into off-peak hours.
  required: false
Off-peak charging weekdays only:
  description: Apply off-peak charging on weekdays only.
  required: false
End off-peak time:
  description: The time by which charging should finish. Required when you enable off-peak charging.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.set_scheduled_departure`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.set_scheduled_departure
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    enable: true
    preconditioning_enabled: true
    departure_time: "07:00"
{% endexample %}

This schedules a 7:00 departure and preconditions the cabin so it's ready in time.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to schedule.
  required: true
  type: string
enable:
  description: >
    Turn the scheduled departure on or off.
  required: false
  type: boolean
  default: true
preconditioning_enabled:
  description: >
    Warm up or cool down the cabin so it's ready by the departure time.
  required: false
  type: boolean
  default: false
preconditioning_weekdays_only:
  description: >
    Apply preconditioning on weekdays only.
  required: false
  type: boolean
  default: false
departure_time:
  description: >
    The time you plan to leave, in `HH:MM` format. Required when you enable preconditioning.
  required: false
  type: string
off_peak_charging_enabled:
  description: >
    Allow charging to continue into off-peak hours.
  required: false
  type: boolean
  default: false
off_peak_charging_weekdays_only:
  description: >
    Apply off-peak charging on weekdays only.
  required: false
  type: boolean
  default: false
end_off_peak_time:
  description: >
    The time by which charging should finish, in `HH:MM` format. Required when you enable off-peak charging.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you enable preconditioning, you must provide a departure time.
- When you enable off-peak charging, you must provide an end off-peak time.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
