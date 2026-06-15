---
title: "Set temperature with end date & time"
action: netatmo.set_temperature_with_end_datetime
domain: netatmo
description: "Sets a target temperature for a Netatmo climate device until a chosen date and time."
related_actions:
  - netatmo.set_temperature_with_time_period
  - netatmo.set_preset_mode_with_end_datetime
  - netatmo.set_schedule
  - netatmo.clear_temperature_setting
---

Use this action to set a target temperature for a Netatmo climate device that stays active until a date and time you choose. When that moment is reached, the device returns to its regular schedule.

{% include actions/ui_header.md %}

To set a temperature with an end date and time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo climate device you want to control.
6. From the actions shown for that target, select **Set temperature with end date & time**.
7. Set the **Target temperature** and the **End date & time**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Target temperature:
  description: The target temperature for the device, between 7 and 30 degrees.
End date & time:
  description: The date and time until which the target temperature stays active.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.set_temperature_with_end_datetime`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.set_temperature_with_end_datetime
  target:
    entity_id: climate.living_room
  data:
    target_temperature: 19.5
    end_datetime: "2025-04-20 05:04:20"
{% endexample %}

This sets `climate.living_room` to 19.5 degrees until the given date and time.

### Options in YAML

{% options_yaml %}
target_temperature:
  description: The target temperature for the device, between 7 and 30 degrees.
  required: true
  type: float
end_datetime:
  description: The date and time until which the target temperature stays active.
  required: true
  type: datetime
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- When the end date and time is reached, the climate device returns to its active schedule.

{% include actions/try_it.md %}

{% include actions/related.md %}
