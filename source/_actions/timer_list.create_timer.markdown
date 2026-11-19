---
title: "Create timer"
action: timer_list.create_timer
domain: timer_list
description: "Creates a timer and starts it immediately."
response: optional
---

Use this action to start a new countdown on a timer list. You can give the timer a name and keep its ID for later actions.

{% include actions/ui_header.md %}

Prerequisites: An integration must provide a [timer list entity](/integrations/timer_list/) that supports this action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. For a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the timer list.
6. From the actions shown for that target, select **Create timer**.
7. Set **Duration** and, optionally, **Name**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the new timer should run.
  required: true
Name:
  description: An optional name for the timer. No name is set by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

Use `timer_list.create_timer` as the `action` value. Put the list selection under `target` and the fields below under `data`.

### Options in YAML

{% options_yaml %}
duration:
  description: How long the new timer should run. For accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: true
  type: [string, integer, map]
name:
  description: An optional name for the timer. No name is set by default.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md entity_type="timer list" %}

## Action response data

{% include actions/response.md %}

The response is a mapping keyed by the targeted entity ID. Each entry contains `timer_id`, the ID of the newly created timer.

## Good to know

- The timer starts immediately. It does not need a separate start action.
- Available actions depend on the integration that provides the timer list.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
