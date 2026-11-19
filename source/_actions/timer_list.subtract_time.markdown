---
title: "Subtract time"
action: timer_list.subtract_time
domain: timer_list
description: "Subtracts time from an active or paused timer."
---

Use this action to shorten a countdown. A paused timer stays paused unless the adjustment finishes it.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Subtract time**.
7. Enter the **Timer ID** and set **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
Duration:
  description: How much time to subtract.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.subtract_time` as the `action` value. Put the list selection under `target` and the fields below under `data`.

### Options in YAML

{% options_yaml %}
timer_id:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
  type: string
duration:
  description: How much time to subtract. For accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: true
  type: [string, integer, map]
{% endoptions_yaml %}

{% include actions/targets.md entity_type="timer list" %}

## Good to know

- Subtracting all remaining time or more finishes the timer and fires [Timer finished](/triggers/timer_list.timer_finished/). Otherwise, the adjustment fires [Timer time changed](/triggers/timer_list.timer_time_changed/). Subtracting zero changes nothing.
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error. Finished or canceled timers are unchanged.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
