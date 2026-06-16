---
title: "Finish a timer"
action: timer.finish
domain: timer
description: "Finishes a running or paused timer earlier than scheduled."
related_actions:
  - timer.start
  - timer.pause
  - timer.cancel
  - timer.change
---

Use this action to finish a running or paused timer earlier than scheduled. The timer ends right away and fires its finished event, just as it would when the countdown reaches zero. This is handy when you want to trigger the timer's outcome immediately, for example to skip the rest of a countdown.

{% include actions/ui_header.md %}

To finish a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer you want to finish.
6. From the actions shown for that target, select **Timer: Finish timer**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.finish`. A basic example looks like this:

{% example %}
action: |
  action: timer.finish
  target:
    entity_id: timer.laundry
{% endexample %}

{% include actions/targets.md domain="timer" %}

## Good to know

- Finishing fires the `timer.finished` event. To stop a timer without firing that event, use the [Cancel a timer](/actions/timer.cancel/) action instead.

{% include actions/stuck.md %}

{% include actions/related.md %}
