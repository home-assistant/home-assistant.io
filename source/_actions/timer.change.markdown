---
title: "Change a timer"
action: timer.change
domain: timer
description: "Adds or subtracts time on a running timer."
related_actions:
  - timer.start
  - timer.pause
  - timer.cancel
  - timer.finish
---

Use this action to change a running timer by adding or subtracting time. This is handy when you want to extend or shorten a countdown that is already running, for example to add a few more minutes to a cooking timer without restarting it.

{% include actions/ui_header.md %}

To change a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer you want to change.
6. From the actions shown for that target, select **Change timer**.
7. Set the **Duration** to add or subtract.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The duration to add to or subtract from the running timer, as a number of seconds or in `HH:MM:SS` format. Use a negative value to subtract time.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.change`. A basic example looks like this:

{% example %}
action: |
  action: timer.change
  target:
    entity_id: timer.laundry
  data:
    duration: "00:01:00"
{% endexample %}

To subtract time, use a negative duration:

{% example %}
action: |
  action: timer.change
  target:
    entity_id: timer.laundry
  data:
    duration: -60
{% endexample %}

### Options in YAML

{% options_yaml %}
duration:
  description: The duration to add to or subtract from the running timer, as a number of seconds or in `HH:MM:SS` format. Use a negative value to subtract time.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="timer" %}

## Good to know

- You cannot extend a timer beyond the duration set when it was started.
- The timer must be running for this action to have an effect.

{% include actions/stuck.md %}

{% include actions/related.md %}
