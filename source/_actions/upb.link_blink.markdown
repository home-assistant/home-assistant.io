---
title: "Blink link"
action: upb.link_blink
domain: upb
description: "Starts a UPB scene blinking at a set rate."
related_actions:
  - upb.link_deactivate
  - upb.link_goto
---

Use this action to start a UPB scene blinking. The blink rate sets how long the lights stay on during each blink.

{% include actions/ui_header.md %}

To blink a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your UPB scene.
6. From the actions shown for that target, select **Blink link**.
7. Enter the blink rate, then select **Save**.

### Options in the UI

{% options_ui %}
Blink rate:
  description: The time in seconds that the lights stay on during each blink. Allowed values are between 0 and 4.25 seconds. The UPB system limits the blink rate to no faster than a third of a second.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `upb.link_blink`. A basic example looks like this:

{% example %}
action: |
  action: upb.link_blink
  target:
    entity_id: scene.interior_lights
  data:
    blink_rate: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
blink_rate:
  description: >
    The time in seconds that the lights stay on during each blink. Allowed
    values are between 0 and 4.25 seconds. The UPB system limits the blink rate
    to no faster than a third of a second.
  required: false
  type: float
  default: 0.5
{% endoptions_yaml %}

{% include actions/targets.md domain="scene" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
