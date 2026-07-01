---
title: "Set fan speed"
action: vacuum.set_fan_speed
domain: romy
description: "Sets the fan speed of a ROMY vacuum."
---

Use this action to set the fan speed of a ROMY vacuum before or during cleaning.

{% include actions/ui_header.md %}

To set the fan speed from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ROMY vacuum.
6. From the actions shown for that target, select **Set fan speed**.
7. Enter the fan speed.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Fan speed:
  description: The fan speed to use. The available values depend on your vacuum.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vacuum.set_fan_speed`. A basic example looks like this:

{% example %}
action: |
  action: vacuum.set_fan_speed
  target:
    entity_id: vacuum.romy
  data:
    fan_speed: turbo
{% endexample %}

This sets `vacuum.romy` to the `turbo` fan speed.

### Options in YAML

{% options_yaml %}
fan_speed:
  description: The fan speed to use. The available values depend on your vacuum.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="vacuum" %}

## Good to know

The supported fan speeds depend on your ROMY vacuum model.

{% include actions/stuck.md %}

{% include actions/related.md %}
