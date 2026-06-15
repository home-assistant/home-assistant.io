---
title: "Set temperature with time period"
action: netatmo.set_temperature_with_time_period
domain: netatmo
description: "Sets a target temperature for a Netatmo climate device for a chosen length of time."
related_actions:
  - netatmo.set_temperature_with_end_datetime
  - netatmo.set_preset_mode_with_end_datetime
  - netatmo.set_schedule
  - netatmo.clear_temperature_setting
---

Use this action to set a target temperature for a Netatmo climate device that stays active for a length of time you choose, such as the next three hours. When that period ends, the device returns to its regular schedule.

{% include actions/ui_header.md %}

To set a temperature for a time period from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo climate device you want to control.
6. From the actions shown for that target, select **Set temperature with time period**.
7. Set the **Target temperature** and the **Time period**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Target temperature:
  description: The target temperature for the device, between 7 and 30 degrees.
Time period:
  description: The length of time the target temperature stays active. Defaults to three hours.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.set_temperature_with_time_period`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.set_temperature_with_time_period
  target:
    entity_id: climate.living_room
  data:
    target_temperature: 19.5
    time_period:
      hours: 2
{% endexample %}

This sets `climate.living_room` to 19.5 degrees for the next two hours.

### Options in YAML

{% options_yaml %}
target_temperature:
  description: The target temperature for the device, between 7 and 30 degrees.
  required: true
  type: float
time_period:
  description: The length of time the target temperature stays active. Defaults to three hours.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- When the time period ends, the climate device returns to its active schedule.

{% include actions/try_it.md %}

{% include actions/related.md %}
