---
title: "Set pause time"
action: wilight.set_pause_time
domain: wilight
description: "Sets how long WiLight irrigation watering is paused."
---

Use this action to set how long a WiLight irrigation pause switch pauses watering.

{% include actions/ui_header.md %}

To set the pause time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the WiLight pause switch.
6. From the actions shown for that target, select **Set pause time**.
7. Enter the pause duration.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The pause duration in hours. The value must be from 1 through 24.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `wilight.set_pause_time`. A basic example looks like this:

{% example %}
action: |
  action: wilight.set_pause_time
  target:
    entity_id: switch.irrigation_pause
  data:
    pause_time: 4
{% endexample %}

This sets the pause time for `switch.irrigation_pause` to 4 hours.

### Options in YAML

{% options_yaml %}
pause_time:
  description: The pause duration in hours. The value must be from 1 through 24.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

## Good to know

This action works with WiLight pause switch entities. The pause switch also supports standard switch actions, such as turn on and turn off.

{% include actions/stuck.md %}

{% include actions/related.md %}
