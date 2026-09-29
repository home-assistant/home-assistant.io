---
title: "Deactivate link"
action: upb.link_deactivate
domain: upb
description: "Deactivates a UPB scene."
related_actions:
  - upb.link_goto
  - upb.link_fade_start
  - upb.link_fade_stop
  - upb.link_blink
---

Use this action to deactivate a UPB scene. Deactivate is a general UPB term that usually means turning to the off state, but each device manufacturer can define it differently for their device.

{% include actions/ui_header.md %}

To deactivate a scene from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your UPB scene.
6. From the actions shown for that target, select **Deactivate link**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `upb.link_deactivate`. A basic example looks like this:

{% example %}
action: |
  action: upb.link_deactivate
  target:
    entity_id: scene.interior_lights
{% endexample %}

{% include actions/targets.md domain="scene" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
