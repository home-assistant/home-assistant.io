---
title: "Set number value"
action: number.set_value
domain: number
description: "Sets the value of a number entity."
---

Use this action to set a number entity to a specific value, for example a target temperature, a brightness limit, or any other adjustable number a device exposes.

{% include actions/ui_header.md %}

To set a number value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the number entity you want to set.
6. From the actions shown for that target, select **Set number value**.
7. Set the **Value** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The value to set on the number entity. It must be within the entity's allowed minimum, maximum, and step.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `number.set_value`. A basic example looks like this:

{% example %}
action: |
  action: number.set_value
  target:
    entity_id: number.thermostat_target
  data:
    value: 21
{% endexample %}

This sets `number.thermostat_target` to 21.

### Options in YAML

{% options_yaml %}
value:
  description: The value to set on the number entity. It must be within the entity's allowed minimum, maximum, and step.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with number entities.
- The value must respect the entity's minimum, maximum, and step. A value outside the allowed range is rejected.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: lower a target value at night

Set a number entity to a lower value every evening, for example to reduce a charging limit overnight.

- **Trigger**: Time: 23:00
- **Action**: Set number value
  - **Target**: Charger current limit
  - **Value**: 6

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Lower the charging limit at night"
    triggers:
      - trigger: time
        at: "23:00:00"
    actions:
      - action: number.set_value
        target:
          entity_id: number.charger_current_limit
        data:
          value: 6
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
