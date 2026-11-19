---
title: "Timer cancelled"
trigger: timer_list.timer_cancelled
domain: timer_list
description: "Triggers when a timer is canceled."
---

Use this trigger to react when a timer is canceled without finishing. The timer remains available as an archived item.

{% include triggers/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/).

<!-- textlint-disable terminology -->

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the timer list you want to watch.
5. From the triggers shown for that target, select **Timer cancelled**.
6. Select **Save**.

<!-- textlint-enable terminology -->

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

Use `timer_list.timer_cancelled` as the `trigger` value. Set `target` to the timer list entities, devices, areas, floors, or labels to monitor.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md entity_type="timer list" custom_trigger_variables="true" %}

### Trigger variables

When the trigger fires, it provides:

- `trigger.entity_id`: The entity ID of the timer list.
- `trigger.timer`: The complete [timer details](/integrations/timer_list/#timer-details) for the item that changed.

For data shared by all triggers, refer to [Trigger data in templates](/docs/automation/trigger-data/#properties-of-all-triggers).

## Good to know

- Canceling a timer does not fire [Timer finished](/triggers/timer_list.timer_finished/). Removing a timer is a separate operation and does not fire this trigger.
- The trigger responds to every matching timer in the targeted lists. It has no timer ID or name filter. Use a template condition with `trigger.timer.timer_id` or `trigger.timer.name` to restrict an automation to one timer.
- Changes to the entity's `unavailable` or `unknown` state do not fire this item trigger.

{% include triggers/try_it.md %}

For this trigger, perform the corresponding timer operation on the selected list. Changing the list's state alone does not produce a timer event.

{% include triggers/stuck.md %}

{% include triggers/related.md %}
