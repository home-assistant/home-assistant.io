---
title: "Start lawn mower"
action: lawn_mower.start_mowing
domain: lawn_mower
description: "Starts or resumes a lawn mower's mowing task."
related_actions:
  - lawn_mower.pause
  - lawn_mower.dock
  - lawn_mower.stop
---

Use this action to start or resume mowing on a robotic lawn mower, for example to begin a scheduled run or pick up where a paused task left off.

{% include actions/ui_header.md %}

To start mowing from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lawn mower you want to start.
6. From the actions shown for that target, select **Start lawn mower**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lawn_mower.start_mowing`. A basic example looks like this:

{% example %}
action: |
  action: lawn_mower.start_mowing
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This starts mowing on `lawn_mower.backyard`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with lawn mowers that support starting a mowing task.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start mowing on a schedule

Start your mower automatically at a set time, for example on a dry weekday morning.

- **Trigger**: Time: 09:00
- **Action**: Start lawn mower
  - **Target**: Backyard mower

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Start mowing in the morning"
    triggers:
      - trigger: time
        at: "09:00:00"
    actions:
      - action: lawn_mower.start_mowing
        target:
          entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
