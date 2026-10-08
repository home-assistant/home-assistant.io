---
title: "Stop lawn mower"
action: lawn_mower.stop
domain: lawn_mower
description: "Stops a lawn mower's current task."
related_actions:
  - lawn_mower.pause
  - lawn_mower.dock
  - lawn_mower.start_mowing
---

Use this action to stop a robotic lawn mower and cancel its current task. The mower stays where it is and becomes idle: it does not return to the dock, and the next start begins a fresh run instead of resuming the old one.

This differs from pausing, which keeps the task so it can be resumed, and from docking, which sends the mower home. Use it when you want the mower to stop right away, like when a child or a pet enters the lawn, or when you want to abandon a run and start over later.

{% include actions/ui_header.md %}

To stop a lawn mower from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lawn mower you want to stop.
6. From the actions shown for that target, select **Stop lawn mower**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lawn_mower.stop`. A basic example looks like this:

{% example %}
action: |
  action: lawn_mower.stop
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This stops `lawn_mower.backyard` and cancels its current task.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with lawn mowers that support stopping.
- After a stop, the mower reports the idle state. Use the [Lawn mower became idle](/triggers/lawn_mower.became_idle/) trigger to react to it, for example to bring the mower home after a while.
- To send the mower back to its charging station instead, use the [Return lawn mower to dock](/actions/lawn_mower.dock/) action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop the mower when motion is detected on the lawn

Stop the mower as soon as someone or a pet is on the lawn, so it does not resume on its own once they leave.

- **Trigger**: State: Lawn motion sensor turned on
- **Action**: Stop lawn mower
  - **Target**: Backyard mower

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Stop the mower when someone is on the lawn"
    triggers:
      - trigger: state
        entity_id: binary_sensor.lawn_motion
        to: "on"
    actions:
      - action: lawn_mower.stop
        target:
          entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
