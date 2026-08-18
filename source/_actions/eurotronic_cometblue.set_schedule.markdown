---
title: "Set schedule"
action: eurotronic_cometblue.set_schedule
domain: eurotronic_cometblue
description: Push a schedule to a thermostat.
since: "2026.7"
related_actions:
  - eurotronic_cometblue.get_schedule
---

The **Set schedule** action pushes a new schedule to a Eurotronic Comet Blue thermostat.

During the times when the schedule is active, the device will automatically try to reach the **Comfort** preset temperature.
When inactive, the **Eco** preset is used.

You can set up to four time ranges per day. If you omit a day, that day's schedule is left unchanged. If you send an empty list for a day, that day's schedule is cleared.

Time ranges cannot overlap. The device supports 10-minute intervals, so other times are rounded down to the previous 10-minute mark.

{% include actions/ui_header.md %}

To push the device schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Eurotronic Comet Blue: Set schedule**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick one or more thermostats.
7. Set the desired schedules for each day.
8. Select **Save**.

### Options in the UI

For each day, add one or more heating periods by entering a start time and an end time.

{% options_ui %}
Monday:
  description: "Heating time periods for Monday. Up to 4 heat times can be set."
Tuesday:
  description: "Heating time periods for Tuesday. Up to 4 heat times can be set."
Wednesday:
  description: "Heating time periods for Wednesday. Up to 4 heat times can be set.."
Thursday:
  description: "Heating time periods for Thursday. Up to 4 heat times can be set."
Friday:
  description: "Heating time periods for Friday. Up to 4 heat times can be set."
Saturday:
  description: "Heating time periods for Saturday. Up to 4 heat times can be set."
Sunday:
  description: "Heating time periods for Sunday. Up to 4 heat times can be set."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `eurotronic_cometblue.set_schedule`. A basic example looks like this:

{% example %}
action: |
  action: eurotronic_cometblue.set_schedule
  target:
    entity_id: climate.kitchen
  data:
    monday:
      - from: "05:00"
        to: "07:00"
      - from: "16:00"
        to: "23:30"
{% endexample %}

This updates the schedule of `climate.kitchen` for Monday.
The climate entity will use the **Comfort** preset between 5:00 AM and 7:00 AM, as well as between 4:00 PM and 11:30 PM.
As no other days are defined, they will not be changed.

### Options in YAML

{% options_yaml %}
monday:
  description: >
    Heating periods for Monday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
tuesday:
  description: >
    Heating periods for Tuesday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
wednesday:
  description: >
    Heating periods for Wednesday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
thursday:
  description: >
    Heating periods for Thursday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
friday:
  description: >
    Heating periods for Friday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
saturday:
  description: >
    Heating periods for Saturday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
sunday:
  description: >
    Heating periods for Sunday. Provide up to four time ranges using `from`
    and `to`.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/targets.md %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
