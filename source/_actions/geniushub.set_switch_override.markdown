---
title: "Set switch override"
action: geniushub.set_switch_override
domain: geniushub
description: "Turns on a Genius Hub switch for a set duration."
related_actions:
  - geniushub.set_zone_mode
  - geniushub.set_zone_override
---

Use this action to turn on a Genius Hub switch for a set duration, up to 24 hours. After the duration passes, the switch returns to its scheduled behavior.

{% include actions/ui_header.md %}

To override a switch from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the switch you want to override.
6. From the actions shown for that target, select **Genius Hub: Set switch override**.
7. Optionally set a **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the override stays active, between 5 minutes and 24 hours. If you leave this empty, the override lasts 1 hour.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `geniushub.set_switch_override`. A basic example looks like this:

{% example %}
action: |
  action: geniushub.set_switch_override
  target:
    entity_id: switch.smart_plug
  data:
    duration:
      minutes: 135
{% endexample %}

This turns on `switch.smart_plug` for 2 hours and 15 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: "How long the override stays active, given as a time mapping such as `minutes: 135`. The value must be between 5 minutes and 24 hours. If you omit it, the override lasts 1 hour."
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
