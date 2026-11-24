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
4. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
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

Replace `timer_list.kitchen` with a list supplied by your integration.

{% example %}
action: |
  action: timer_list.create_timer
  target:
    entity_id: timer_list.kitchen
  data:
    duration: "00:05:00"
    name: "Tea"
  response_variable: new_timer
{% endexample %}

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

{% include actions/more_examples.md %}

These examples require timer lists supplied by another integration. Replace the entity IDs with your own.

### Automation: start a tea timer when the kettle stops

When the kettle switches off, start a three-minute timer named Tea. This requires a kettle integration that exposes a switch.

- **Trigger**: State changes from `on` to `off`
  - **Target**: Kettle (`switch.kettle`)
- **Action**: Create timer
  - **Target**: Kitchen timers (`timer_list.kitchen`)
  - **Duration**: Three minutes
  - **Name**: Tea

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Start a tea timer when the kettle stops"
  triggers:
    - trigger: state
      entity_id: switch.kettle
      from: "on"
      to: "off"
  actions:
    - action: timer_list.create_timer
      target:
        entity_id: timer_list.kitchen
      data:
        duration: "00:03:00"
        name: "Tea"
{% endexample %}

{% enddetails %}

### Automation: schedule a stretching break

At 15:00, start a five-minute timer named Stretching on your office timer list.

- **Trigger**: Time, at 15:00
- **Action**: Create timer
  - **Target**: Office timers (`timer_list.office`)
  - **Duration**: Five minutes
  - **Name**: Stretching

{% details "YAML for this automation" %}

{% example %}
automation: |
  alias: "Start a stretching timer"
  triggers:
    - trigger: time
      at: "15:00:00"
  actions:
    - action: timer_list.create_timer
      target:
        entity_id: timer_list.office
      data:
        duration: "00:05:00"
        name: "Stretching"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
