---
title: "Pause a timer"
action: timer.pause
domain: timer
description: "Pauses a running timer, keeping the remaining time."
related_actions:
  - timer.start
  - timer.cancel
  - timer.finish
  - timer.change
---

Use this action to pause a running timer. The remaining time is kept, so you can continue later. This is handy when you need to interrupt a countdown briefly, for example pausing a workout timer between sets.

{% include actions/ui_header.md %}

To pause a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer you want to pause.
6. From the actions shown for that target, select **Pause timer**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.pause`. A basic example looks like this:

{% example %}
action: |
  action: timer.pause
  target:
    entity_id: timer.laundry
{% endexample %}

{% include actions/targets.md domain="timer" %}

## Good to know

- To continue a paused timer, use the [Start a timer](/actions/timer.start/) action without a duration. It resumes with the time that was left.

{% include actions/stuck.md %}

{% include actions/related.md %}
