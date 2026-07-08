---
title: "Start watering"
action: hydrawise.start_watering
domain: hydrawise
description: "Starts a watering cycle in the selected irrigation zone."
related_actions:
  - hydrawise.suspend
  - hydrawise.resume
---

The **Start watering** action starts a watering cycle in an irrigation zone.

This is handy when you want to water on demand or from an automation, for example giving the lawn an extra run on a hot afternoon. You can set how long the cycle runs, or let it fall back to the default duration configured in the Hydrawise app.

{% include actions/ui_header.md %}

To start watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the irrigation zone's manual watering switch.
6. From the actions shown for that target, select **Start watering**.
7. Optionally set the **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: Length of time in minutes to run the watering cycle. If not specified or zero, the default watering duration set in the Hydrawise app for the zone is used.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hydrawise.start_watering`. A basic example looks like this:

{% example %}
action: |
  action: hydrawise.start_watering
  target:
    entity_id: switch.front_lawn_manual_watering
  data:
    duration: 15
{% endexample %}

This runs a 15-minute watering cycle on the front lawn zone.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    Length of time in minutes to run the watering cycle. If not specified or
    zero, the default watering duration set in the Hydrawise app for the zone
    is used.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
