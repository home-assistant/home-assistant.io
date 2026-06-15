---
title: "Cancel a timer"
action: timer.cancel
domain: timer
description: "Cancels a running or paused timer without firing the finished event."
related_actions:
  - timer.start
  - timer.pause
  - timer.finish
  - timer.change
---

Use this action to cancel a running or paused timer. The timer resets to its last initial value, and the timer finished event does not fire. This is handy when you want to stop a countdown without triggering whatever the timer was supposed to set off.

{% include actions/ui_header.md %}

To cancel a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer you want to cancel.
6. From the actions shown for that target, select **Cancel timer**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.cancel`. A basic example looks like this:

{% example %}
action: |
  action: timer.cancel
  target:
    entity_id: timer.laundry
{% endexample %}

{% include actions/targets.md domain="timer" %}

## Good to know

- Canceling does not fire the `timer.finished` event. To end a timer early and fire that event, use the [Finish a timer](/actions/timer.finish/) action instead.

{% include actions/stuck.md %}

{% include actions/related.md %}
