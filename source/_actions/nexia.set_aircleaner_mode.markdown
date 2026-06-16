---
title: "Nexia: Set air cleaner mode"
action: nexia.set_aircleaner_mode
domain: nexia
description: "Sets the air cleaner mode on a Nexia thermostat."
related_actions:
  - nexia.set_humidify_setpoint
  - nexia.set_dehumidify_setpoint
  - nexia.set_hvac_run_mode
---

Use this action to set the air cleaner mode on a Nexia, American Standard, or Trane thermostat. This setting affects all zones on the same thermostat.

{% include actions/ui_header.md %}

To set the air cleaner mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the thermostat you want to control.
6. From the actions shown for that target, select **Nexia: Set air cleaner mode**.
7. Set the **Air cleaner mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Air cleaner mode:
  description: "The air cleaner mode to set: `auto`, `quick`, or `allergy`."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nexia.set_aircleaner_mode`. A basic example looks like this:

{% example %}
action: |
  action: nexia.set_aircleaner_mode
  target:
    entity_id: climate.downstairs
  data:
    aircleaner_mode: allergy
{% endexample %}

This sets the air cleaner mode of `climate.downstairs` to allergy.

### Options in YAML

{% options_yaml %}
aircleaner_mode:
  description: "The air cleaner mode to set: `auto`, `quick`, or `allergy`."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- This setting affects all zones on the same thermostat.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
