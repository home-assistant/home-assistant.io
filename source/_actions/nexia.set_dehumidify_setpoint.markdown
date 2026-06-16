---
title: "Nexia: Set dehumidify setpoint"
action: nexia.set_dehumidify_setpoint
domain: nexia
description: "Sets the dehumidify setpoint on a Nexia thermostat."
related_actions:
  - nexia.set_humidify_setpoint
  - nexia.set_aircleaner_mode
  - nexia.set_hvac_run_mode
---

Use this action to set the dehumidify setpoint on a Nexia, American Standard, or Trane thermostat. This setting affects all zones on the same thermostat.

{% include actions/ui_header.md %}

To set the dehumidify setpoint from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the thermostat you want to control.
6. From the actions shown for that target, select **Nexia: Set dehumidify setpoint**.
7. Set the **Humidity** level.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Humidity:
  description: The dehumidify setpoint as a percentage, between 35 and 65.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nexia.set_dehumidify_setpoint`. A basic example looks like this:

{% example %}
action: |
  action: nexia.set_dehumidify_setpoint
  target:
    entity_id: climate.downstairs
  data:
    humidity: 45
{% endexample %}

This sets the dehumidify setpoint of `climate.downstairs` to 45%.

### Options in YAML

{% options_yaml %}
humidity:
  description: The dehumidify setpoint as a percentage, between 35 and 65.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- This setting affects all zones on the same thermostat.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
