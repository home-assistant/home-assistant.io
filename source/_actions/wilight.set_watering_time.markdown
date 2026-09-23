---
title: "Set watering time"
action: wilight.set_watering_time
domain: wilight
description: "Sets how long a WiLight watering switch stays on."
---

Use this action to set how long a WiLight irrigation watering switch stays on.

{% include actions/ui_header.md %}

To set the watering time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the WiLight watering switch.
6. From the actions shown for that target, select **Set watering time**.
7. Enter the watering duration.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The watering duration in seconds. The value must be from 1 through 1800.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `wilight.set_watering_time`. A basic example looks like this:

{% example %}
action: |
  action: wilight.set_watering_time
  target:
    entity_id: switch.irrigation_watering
  data:
    watering_time: 30
{% endexample %}

This sets the watering time for `switch.irrigation_watering` to 30 seconds.

### Options in YAML

{% options_yaml %}
watering_time:
  description: The watering duration in seconds. The value must be from 1 through 1800.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

## Good to know

This action works with WiLight watering switch entities. The watering switch also supports standard switch actions, such as turn on and turn off.

{% include actions/stuck.md %}

{% include actions/related.md %}
