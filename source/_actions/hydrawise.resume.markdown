---
title: "Resume automatic watering"
action: hydrawise.resume
domain: hydrawise
description: "Resumes an irrigation zone's automatic watering schedule."
related_actions:
  - hydrawise.suspend
  - hydrawise.start_watering
---

The **Resume automatic watering** action restarts an irrigation zone's automatic watering schedule after it has been suspended.

This is handy when you want to bring a zone back to its normal schedule early, for example resuming watering once a dry spell returns instead of waiting for a suspension to expire.

{% include actions/ui_header.md %}

To resume watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the irrigation zone's auto watering switch.
6. From the actions shown for that target, select **Resume automatic watering**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hydrawise.resume`. A basic example looks like this:

{% example %}
action: |
  action: hydrawise.resume
  target:
    entity_id: switch.front_lawn_auto_watering
{% endexample %}

This resumes automatic watering on the front lawn zone.

This action has no additional options in YAML.

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
