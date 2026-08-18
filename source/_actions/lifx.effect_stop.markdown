---
title: Stop effect
action: lifx.effect_stop
domain: lifx
description: "Stop any running software or hardware effect on LIFX lights."
related_actions:
  - lifx.effect_pulse
  - lifx.effect_colorloop
---

Use this action to stop any software or hardware effect that might be running on the target LIFX lights. It runs an effect that does nothing, which brings any active effect to a stop.

{% include actions/ui_header.md %}

To stop an effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX lights you want to stop.
6. From the actions shown for that target, select **Stop effect**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_stop`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_stop
  target:
    entity_id: light.living_room
{% endexample %}

This stops any effect running on the living room lights.

### Options in YAML

This action has no additional options in YAML.

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
