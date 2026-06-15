---
title: "Clear temperature setting"
action: netatmo.clear_temperature_setting
domain: netatmo
description: "Clears a manual temperature setting on a Netatmo climate device."
related_actions:
  - netatmo.set_temperature_with_end_datetime
  - netatmo.set_temperature_with_time_period
  - netatmo.set_preset_mode_with_end_datetime
  - netatmo.set_schedule
---

Use this action to clear any manual temperature setting on a Netatmo climate device. The device reverts to its current preset or schedule.

{% include actions/ui_header.md %}

To clear a temperature setting from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo climate device you want to control.
6. From the actions shown for that target, select **Clear temperature setting**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.clear_temperature_setting`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.clear_temperature_setting
  target:
    entity_id: climate.living_room
{% endexample %}

This clears any manual temperature setting on `climate.living_room`.

{% include actions/targets.md %}

## Good to know

- After clearing the setting, the device follows its current preset or schedule again. This is handy to undo a manual temperature set earlier in an automation.

{% include actions/try_it.md %}

{% include actions/related.md %}
