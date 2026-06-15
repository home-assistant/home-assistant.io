---
title: "Calibrate"
action: utility_meter.calibrate
domain: utility_meter
description: "Sets a utility meter sensor to a specific value."
related_actions:
  - utility_meter.reset
---

The **Calibrate** action sets a utility meter sensor to a value you choose. Instead of resetting the sensor to zero, you give it the exact reading you want it to show.

Use it to match a sensor to a real-world meter, for example aligning your energy utility meter with the figure on your physical electricity meter, or correcting a value after a restart or a configuration change.

You target the utility meter's sensor {% term entity %} directly.

{% include actions/ui_header.md %}

To calibrate a utility meter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the utility meter sensor you want to calibrate.
6. From the actions shown for that target, select **Calibrate**.
7. Enter the **Value** you want the sensor to show.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The value to set the meter sensor to.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `utility_meter.calibrate`. A basic example looks like this:

{% example %}
action: |
  action: utility_meter.calibrate
  target:
    entity_id: sensor.daily_energy
  data:
    value: "100"
{% endexample %}

This sets the `daily_energy` sensor to a reading of 100.

### Options in YAML

{% options_yaml %}
value:
  description: The value to set the meter sensor to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="sensor" %}

## Good to know

- Calibrating sets the sensor to the value you provide. It does not add to the current value.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
