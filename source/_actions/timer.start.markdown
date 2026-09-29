---
title: "Start a timer"
action: timer.start
domain: timer
description: "Starts a timer, or restarts it with a new duration."
related_actions:
  - timer.pause
  - timer.cancel
  - timer.finish
  - timer.change
---

Use this action to start a timer, or to restart one with a new duration. If you don't give a duration, the timer restarts with its configured value, or continues a paused timer with the time that was left. This is the action you use to begin counting down, for example to start a cooking timer or to resume one you paused earlier.

{% include actions/ui_header.md %}

To start a timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer you want to start.
6. From the actions shown for that target, select **Timer: Start timer**.
7. Optionally, set a **Duration** to start the timer with.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: The duration to start the timer with, as a number of seconds or in `HH:MM:SS` format. If omitted, the timer uses its configured duration or the remaining time of a paused timer.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.start`. A basic example looks like this:

{% example %}
action: |
  action: timer.start
  target:
    entity_id: timer.laundry
  data:
    duration: "00:05:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
duration:
  description: The duration to start the timer with, as a number of seconds or in `HH:MM:SS` format. If omitted, the timer uses its configured duration or the remaining time of a paused timer.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="timer" %}

## Good to know

- To resume a paused timer, start it again without a duration. It continues with the time that was left.
- When you start a running timer with a new duration, that duration applies until the timer finishes or is canceled, after which it resets to its configured value.

{% include actions/stuck.md %}

{% include actions/related.md %}
