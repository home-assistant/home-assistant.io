---
title: "Pause lawn mower"
action: lawn_mower.pause
domain: lawn_mower
description: "Pauses a lawn mower's current task."
related_actions:
  - lawn_mower.start_mowing
  - lawn_mower.dock
---

Use this action to pause a robotic lawn mower's current task, for example to stop it briefly while you cross the lawn and resume it afterwards.

{% include actions/ui_header.md %}

To pause a lawn mower from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lawn mower you want to pause.
6. From the actions shown for that target, select **Pause lawn mower**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lawn_mower.pause`. A basic example looks like this:

{% example %}
action: |
  action: lawn_mower.pause
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This pauses `lawn_mower.backyard`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with lawn mowers that support pausing.
- To resume mowing later, use the [Start lawn mower](/actions/lawn_mower.start_mowing/) action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause the mower when a door opens

Pause the mower when someone steps into the garden, for example when a gate or back door opens.

- **Trigger**: State: Back door opens
- **Action**: Pause lawn mower
  - **Target**: Backyard mower

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Pause the mower when the back door opens"
    triggers:
      - trigger: state
        entity_id: binary_sensor.back_door
        to: "on"
    actions:
      - action: lawn_mower.pause
        target:
          entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
