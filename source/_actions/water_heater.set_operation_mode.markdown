---
title: "Set water heater operation mode"
action: water_heater.set_operation_mode
domain: water_heater
description: "Sets the operation mode of a water heater."
related_actions:
  - water_heater.set_temperature
  - water_heater.set_away_mode
  - water_heater.turn_on
  - water_heater.turn_off
---

Use this action to set the operation mode of a water heater, for example to switch it to an eco or high demand mode. The available modes and what each one does depend on the device.

{% include actions/ui_header.md %}

To set the operation mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to set.
6. From the actions shown for that target, select **Set water heater operation mode**.
7. Set the **Operation mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Operation mode:
  description: The operation mode to set. It must be one of the modes your water heater supports, for example "eco", "electric", or "heat_pump".
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `water_heater.set_operation_mode`. A basic example looks like this:

{% example %}
action: |
  action: water_heater.set_operation_mode
  target:
    entity_id: water_heater.demo
  data:
    operation_mode: eco
{% endexample %}

This sets `water_heater.demo` to the `eco` operation mode.

### Options in YAML

{% options_yaml %}
operation_mode:
  description: The operation mode to set. It must be one of the modes your water heater supports, for example "eco", "electric", or "heat_pump".
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with water heater entities.
- The action fails if the mode you provide is not one your water heater supports. Check the documentation of the integration that provides the water heater for its available modes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch a water heater to eco mode in the morning

Set a water heater to a specific operation mode at a set time.

- **Trigger**: Time: 07:15
- **Action**: Set water heater operation mode
  - **Target**: Utility room water heater
  - **Operation mode**: eco

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch the water heater to eco mode"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: water_heater.set_operation_mode
        target:
          entity_id: water_heater.utility_room
        data:
          operation_mode: eco
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
