---
title: "Set hot water schedule"
action: bsblan.set_hot_water_schedule
domain: bsblan
description: "Sets the hot water heating schedule for a BSB-LAN device."
related_actions:
  - bsblan.sync_time
---

Use this action to set the hot water heating schedule for your BSB-LAN device. Each day of the week can have one or more time slots during which hot water heating is active. You only need to set the days you want to change.

This is handy in automations, for example to switch between a winter and a summer heating schedule based on the season.

{% include actions/ui_header.md %}

To set the hot water schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **BSB-LAN: Set hot water schedule**.
6. Select the **Device** to configure.
7. For each day you want to change, add one or more time slots with a start and end time.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The BSB-LAN device to configure.
  required: true
Monday time slots:
  description: The time periods for Monday. Add multiple slots for different heating periods throughout the day.
  required: false
Tuesday time slots:
  description: The time periods for Tuesday.
  required: false
Wednesday time slots:
  description: The time periods for Wednesday.
  required: false
Thursday time slots:
  description: The time periods for Thursday.
  required: false
Friday time slots:
  description: The time periods for Friday.
  required: false
Saturday time slots:
  description: The time periods for Saturday.
  required: false
Sunday time slots:
  description: The time periods for Sunday.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bsblan.set_hot_water_schedule`. Each day's slots are a list of time periods, where each period has a `start_time` and an `end_time`. A basic example looks like this:

{% example %}
action: |
  action: bsblan.set_hot_water_schedule
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    monday_slots:
      - start_time: "06:00:00"
        end_time: "08:00:00"
      - start_time: "17:00:00"
        end_time: "21:00:00"
{% endexample %}

This sets two heating periods for Monday and leaves the other days unchanged.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The BSB-LAN device to configure.
  required: true
  type: string
monday_slots:
  description: >
    The time periods for Monday. Each period has a `start_time` and an
    `end_time`. Add multiple periods for different heating periods
    throughout the day.
  required: false
  type: list
tuesday_slots:
  description: >
    The time periods for Tuesday.
  required: false
  type: list
wednesday_slots:
  description: >
    The time periods for Wednesday.
  required: false
  type: list
thursday_slots:
  description: >
    The time periods for Thursday.
  required: false
  type: list
friday_slots:
  description: >
    The time periods for Friday.
  required: false
  type: list
saturday_slots:
  description: >
    The time periods for Saturday.
  required: false
  type: list
sunday_slots:
  description: >
    The time periods for Sunday.
  required: false
  type: list
{% endoptions_yaml %}

## Good to know

- You only need to set the days you want to change. Days you leave out keep their current schedule.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Set a weekday and weekend schedule

This example sets one schedule for the weekdays and a different one for the weekend.

{% details "YAML example for a weekday and weekend schedule" %}

{% example %}
action: |
  action: bsblan.set_hot_water_schedule
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    monday_slots:
      - start_time: "06:00:00"
        end_time: "08:00:00"
      - start_time: "17:00:00"
        end_time: "21:00:00"
    tuesday_slots:
      - start_time: "06:00:00"
        end_time: "08:00:00"
      - start_time: "17:00:00"
        end_time: "21:00:00"
    wednesday_slots:
      - start_time: "06:00:00"
        end_time: "08:00:00"
      - start_time: "17:00:00"
        end_time: "21:00:00"
    thursday_slots:
      - start_time: "06:00:00"
        end_time: "08:00:00"
      - start_time: "17:00:00"
        end_time: "21:00:00"
    friday_slots:
      - start_time: "06:00:00"
        end_time: "08:00:00"
      - start_time: "17:00:00"
        end_time: "21:00:00"
    saturday_slots:
      - start_time: "08:00:00"
        end_time: "22:00:00"
    sunday_slots:
      - start_time: "08:00:00"
        end_time: "22:00:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
