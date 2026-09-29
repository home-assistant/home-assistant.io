---
title: "Stop light fade"
action: upb.light_fade_stop
domain: upb
description: "Stops a running fade or transition on a UPB light."
related_actions:
  - upb.light_fade_start
  - upb.light_blink
---

Use this action to stop a UPB light while it transitions from one brightness to another. It stops either a fade or a transition started by turning the light on or off.

{% include actions/ui_header.md %}

To stop a light fade from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your UPB light.
6. From the actions shown for that target, select **Stop light fade**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `upb.light_fade_stop`. A basic example looks like this:

{% example %}
action: |
  action: upb.light_fade_stop
  target:
    entity_id: light.kitchen
{% endexample %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
