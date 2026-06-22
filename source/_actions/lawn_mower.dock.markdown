---
title: "Return lawn mower to dock"
action: lawn_mower.dock
domain: lawn_mower
description: "Returns a lawn mower to its dock."
related_actions:
  - lawn_mower.start_mowing
  - lawn_mower.pause
---

Use this action to send a robotic lawn mower back to its dock, for example to end a run early when it starts to rain.

{% include actions/ui_header.md %}

To send a lawn mower to its dock from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lawn mower you want to send to its dock.
6. From the actions shown for that target, select **Return lawn mower to dock**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lawn_mower.dock`. A basic example looks like this:

{% example %}
action: |
  action: lawn_mower.dock
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This sends `lawn_mower.backyard` back to its dock.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with lawn mowers that support returning to a dock.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: return the mower to dock when rain starts

Send the mower back to its dock when rain is detected while it is mowing.

- **Trigger**: State: Rain sensor turns on
- **Condition**: Lawn mower is mowing
- **Action**: Return lawn mower to dock
  - **Target**: Backyard mower

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Dock the mower when it starts raining"
    triggers:
      - trigger: state
        entity_id: binary_sensor.rain_detected
        to: "on"
    conditions:
      - condition: lawn_mower.is_mowing
        target:
          entity_id: lawn_mower.backyard
    actions:
      - action: lawn_mower.dock
        target:
          entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
