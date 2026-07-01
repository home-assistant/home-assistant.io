---
title: "Set scheduled charging"
action: teslemetry.set_scheduled_charging
domain: teslemetry
description: "Sets a time at which the vehicle should start charging."
related_actions:
  - teslemetry.set_scheduled_departure
  - teslemetry.add_charge_schedule
  - teslemetry.navigation_gps_request
---

The **Set scheduled charging** action tells your Tesla vehicle to start charging at a specific time of day. This is the same scheduled charging feature you can set on the car's screen, controlled from Home Assistant.

Use it to line up charging with cheaper electricity rates, for example starting a charge in the middle of the night when off-peak pricing begins.

{% include actions/ui_header.md %}

To set scheduled charging from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Set scheduled charging**.
6. Select the **Vehicle** to schedule.
7. Turn **Enable** on to schedule charging, or off to clear the schedule.
8. Set the **Time** at which charging should start.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to schedule.
Enable:
  description: Turn scheduled charging on or off.
Time:
  description: The time at which charging should start. Required when you enable scheduled charging.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.set_scheduled_charging`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.set_scheduled_charging
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    enable: true
    time: "06:00"
{% endexample %}

This schedules the vehicle to start charging at 6:00 in the morning.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to schedule.
  required: true
  type: string
enable:
  description: >
    Turn scheduled charging on or off.
  required: true
  type: boolean
  default: true
time:
  description: >
    The time at which charging should start, in `HH:MM` format. Required when you enable scheduled charging.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you enable scheduled charging, you must provide a time.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
