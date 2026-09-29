---
title: "Calibrate a utility meter"
action: utility_meter.calibrate
domain: utility_meter
description: "Sets a utility meter sensor to a specific value."
related_actions:
  - utility_meter.reset
---

Use this action to calibrate a utility meter by setting one of its sensors to a specific value. This is handy when you want the meter to match a real-world reading, for example to line it up with the number printed on your physical energy or water meter.

{% include actions/ui_header.md %}

To calibrate a utility meter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the utility meter sensor you want to calibrate.
6. From the actions shown for that target, select **Calibrate**.
7. Set the **Value** to calibrate the sensor with.
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
    entity_id: sensor.energy_monthly
  data:
    value: 100
{% endexample %}

### Options in YAML

{% options_yaml %}
value:
  description: The value to set the meter sensor to.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="sensor" %}

## Good to know

- If your meter does not use tariffs, you can reset it by running this action with `value: 0`.
- Calibrate each tariff sensor separately. If your meter tracks several tariffs, target the specific sensor you want to set.
{% include actions/stuck.md %}

{% include actions/related.md %}
