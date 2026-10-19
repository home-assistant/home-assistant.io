---
title: "Set water heater target temperature"
action: water_heater.set_temperature
domain: water_heater
description: "Sets the target temperature of a water heater."
related_actions:
  - water_heater.set_operation_mode
  - water_heater.set_away_mode
  - water_heater.turn_on
  - water_heater.turn_off
---

Use this action to set the target temperature of a water heater, for example to keep stored water at a safe and comfortable temperature.

{% include actions/ui_header.md %}

To set the target temperature from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to set.
6. From the actions shown for that target, select **Set water heater target temperature**.
7. Set the **Temperature** you want to apply. Optionally, set an **Operation mode** to use at the same time.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Temperature:
  description: The target temperature to set, in your configured unit of measurement.
Operation mode:
  description: The operation mode to use while setting the target temperature. For a list of possible modes, refer to the documentation of the integration that provides the water heater.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `water_heater.set_temperature`. A basic example looks like this:

{% example %}
action: |
  action: water_heater.set_temperature
  target:
    entity_id: water_heater.demo
  data:
    temperature: 60
{% endexample %}

This sets the target temperature of `water_heater.demo` to 60 degrees.

### Options in YAML

{% options_yaml %}
temperature:
  description: The target temperature to set, in your configured unit of measurement.
  required: true
  type: float
operation_mode:
  description: The operation mode to use while setting the target temperature. For a list of possible modes, refer to the documentation of the integration that provides the water heater.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with water heater entities.
- To reduce the risk of Legionella bacteria growth, keep stored water at 60°C (140°F) or higher. Temperatures between 25°C and 45°C (77°F and 113°F) allow the bacteria to grow.
- The accepted temperature range depends on your water heater. The action fails if the value is outside the range your device supports.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set the water heater temperature in the morning

Set a water heater to a specific temperature and mode at a set time.

- **Trigger**: Time: 07:15
- **Action**: Set water heater target temperature
  - **Target**: Utility room water heater
  - **Temperature**: 60
  - **Operation mode**: eco

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set the water heater temperature in the morning"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: water_heater.set_temperature
        target:
          entity_id: water_heater.utility_room
        data:
          temperature: 60
          operation_mode: eco
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
