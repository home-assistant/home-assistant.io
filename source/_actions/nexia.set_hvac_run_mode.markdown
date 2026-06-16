---
title: "Nexia: Set HVAC run mode"
action: nexia.set_hvac_run_mode
domain: nexia
description: "Sets the run mode and HVAC mode on a Nexia thermostat."
related_actions:
  - nexia.set_aircleaner_mode
  - nexia.set_humidify_setpoint
  - nexia.set_dehumidify_setpoint
---

Use this action to set the run mode, the HVAC mode, or both on a Nexia, American Standard, or Trane thermostat. The run mode controls whether the thermostat follows its schedule or holds a setting. The HVAC mode controls whether it heats, cools, or both.

{% include actions/ui_header.md %}

To set the run mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the thermostat you want to control.
6. From the actions shown for that target, select **Nexia: Set HVAC run mode**.
7. Set the **Run mode**, the **HVAC mode**, or both.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Run mode:
  description: "How the thermostat follows its schedule: `permanent_hold` to hold the current setting, or `run_schedule` to follow the schedule."
  required: false
HVAC mode:
  description: "The HVAC mode to set: `auto`, `cool`, or `heat`."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nexia.set_hvac_run_mode`. A basic example looks like this:

{% example %}
action: |
  action: nexia.set_hvac_run_mode
  target:
    entity_id: climate.downstairs
  data:
    run_mode: permanent_hold
    hvac_mode: cool
{% endexample %}

This holds `climate.downstairs` in cooling mode.

### Options in YAML

{% options_yaml %}
run_mode:
  description: "How the thermostat follows its schedule: `permanent_hold` to hold the current setting, or `run_schedule` to follow the schedule."
  required: false
  type: string
hvac_mode:
  description: "The HVAC mode to set: `auto`, `cool`, or `heat`."
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- Both options are optional, but you must provide at least one of **Run mode** or **HVAC mode**.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
