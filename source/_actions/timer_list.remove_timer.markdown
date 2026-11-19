---
title: "Remove timer"
action: timer_list.remove_timer
domain: timer_list
description: "Removes a timer from a list."
---

Use this action to delete a timer from its list, including an archived timer you no longer need.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Remove timer**.
7. Enter the **Timer ID**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timer ID:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.remove_timer` as the `action` value. Put the list selection under `target` and the fields below under `data`.

### Options in YAML

{% options_yaml %}
timer_id:
  description: The ID of the timer within the targeted list. Obtain it from Create timer, Get timers, or a timer trigger.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md entity_type="timer list" %}

## Good to know

- You can remove a timer in any status. Removing an active timer does not finish or cancel it, so it fires neither the finished trigger nor the cancellation trigger.
- Available actions depend on the integration that provides the timer list.
- The timer ID must exist in each targeted list. An unknown ID causes an error.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
