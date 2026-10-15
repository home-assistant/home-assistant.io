---
title: "Building blocks and actions in automations and scripts"
description: "Wait, repeat, choose, and perform steps at the same time in your automations and scripts, in the editor or in YAML."
toc: true
---

When an automation or script runs, it goes through a list of steps. Each step is an action or a building block:

- An **action** makes something happen, for example, turning on a light or sending a notification. Home Assistant performs the action on the targets you choose. For a list of all actions, refer to the [actions reference](/actions/).
- A **building block** controls whether, when, and in which order the other steps run. It can check a condition, wait, repeat steps, choose between steps, or perform steps at the same time.

Automations and scripts use the same actions and building blocks.

## How automations and scripts run their steps

When an automation starts, it first checks its conditions under **And if**. If they are met, it goes through the steps under **Then do**, from top to bottom. A script has no conditions section, so it goes through its steps under **Sequence** right away.

The difference is when they run: an automation runs by itself when one of its triggers reacts, and a script runs when you start it, for example, from a dashboard, from an automation, or with Assist. For more about the difference, refer to [Concepts and terminology](/getting-started/concepts-terminology/#scripts).

To add a step in the editor, select **Add action**. To add a building block, select **Blocks** in that dialog. In YAML, you write actions and building blocks in the same list. For details, refer to [Writing steps in YAML](#writing-steps-in-yaml).

For how to create scripts, pass them variables, and wait for them to finish, refer to the [Scripts integration](/integrations/script/).

<a id="perform-an-action"></a>

## Performing an action

To make something happen, such as turning on a light, add an action. Each action has its own page with its options, listed in the [actions reference](/actions/). For the options that most actions share, such as targets and data, refer to [Performing actions](/docs/scripts/perform-actions/).

Most actions come from integrations. Two are part of automations and scripts themselves: [**Fire manual event**](/actions/event/) and [**Set conversation response**](/actions/set_conversation_response/).

### Adding an action in the editor

To add an action in the automation or script editor, follow the steps in [Adding an action in the editor](/docs/scripts/perform-actions/#adding-an-action-in-the-editor).

### Performing an action in YAML

In YAML, use `action` with the name of the action, and optionally `target` and `data`:

{% example %}
action: |
  alias: "Bedroom lights on"
  action: light.turn_on
  target:
    entity_id: light.bedroom
  data:
    brightness: 100
{% endexample %}

<a id="activate-a-scene"></a>

In older YAML, you may find a shortcut to activate a {% term scene %}. It does the same as the [**Activate scene**](/actions/scene.turn_on/) action. When you open the step in the editor, the editor changes it to `action: scene.turn_on`.

{% example %}
action: |
  scene: scene.morning_living_room
{% endexample %}

## Controlling how steps run

Building blocks control the flow of your automation or script. They make decisions, repeat steps, wait, run steps together, and store values in variables. Each building block has its own page with its options and examples, grouped by categories in the [list of building blocks](/building-blocks/).

## Writing steps in YAML

In YAML, the steps are a list under `actions:` in an automation, or under `sequence:` in a script. If there is only one step, you can leave out the list.

Every step can have an `alias`. The alias is the name of the step that the editor and the trace show. In the editor, you set it with **Rename**.

In an automation, the steps go under `actions:`:

{% example %}
automation: |
  actions:
    - alias: "Turn on ceiling light"
      action: light.turn_on
      target:
        entity_id: light.ceiling
    - alias: "Notify that ceiling light is turned on"
      action: notify.notify
      data:
        message: "Turned on the ceiling light!"
{% endexample %}

In a script, the same steps go under `sequence:`:

{% example %}
script: |
  sequence:
    - alias: "Turn on ceiling light"
      action: light.turn_on
      target:
        entity_id: light.ceiling
    - alias: "Notify that ceiling light is turned on"
      action: notify.notify
      data:
        message: "Turned on the ceiling light!"
{% endexample %}

In an automation, templates in the steps can use the `trigger` variable, which describes what started the automation. For details, refer to [available trigger data](/docs/automation/templating/#available-trigger-data).

## Options for any step

These options work on every step, both actions and building blocks. The only exception is **Continue on error**, which conditions don't have.

<a id="continuing-on-error"></a>

### Continuing when a step fails

By default, an automation or script stops when a step fails. The run is marked as failed, and the error is logged. If a step can fail without affecting the rest, for example, a notification to an unreliable service, you can continue with the next step instead.

In the editor, in the **Menu** {% icon "mdi:dots-vertical" %} of the step, select **Continue on error**. For details, refer to [Continuing after an action fails](/docs/automation/editor/#continuing-after-an-action-fails).

In YAML, add `continue_on_error: true` to the step:

{% example %}
action: |
  - alias: "If this one fails..."
    continue_on_error: true
    action: notify.super_unreliable_service_provider
    data:
      message: "I'm going to error out..."

  - alias: "This one still runs"
    action: persistent_notification.create
    data:
      title: "Hi there!"
      message: "I'm fine..."
{% endexample %}

**Continue on error** doesn't ignore errors in the configuration, such as a broken template. The error is still shown in the trace and in the logs.

An action whose target is unavailable or doesn't exist doesn't fail. Home Assistant skips that target and logs a warning, so the next step runs even without **Continue on error**. The action does fail if an entity that you selected directly doesn't support it, or if the action should return response data and none of its targets match.

<a id="disabling-an-action"></a>

### Turning off a step

To try an automation or script without one of its steps, turn the step off instead of deleting it. Home Assistant skips it until you turn it on again.

In the editor, in the **Menu** {% icon "mdi:dots-vertical" %} of the step, select **Disable**. For details, refer to [Turning off a trigger, condition, or action](/docs/automation/editor/#turning-off-a-trigger-condition-or-action).

In YAML, add `enabled: false` to the step:

{% example %}
automation: |
  actions:
    # This step is skipped.
    - enabled: false
      alias: "Notify that the ceiling light is being turned on"
      action: notify.notify
      data:
        message: "Turning on the ceiling light!"

    # This step runs.
    - alias: "Turn on the ceiling light"
      action: light.turn_on
      target:
        entity_id: light.ceiling
{% endexample %}

`enabled` can also be a limited template, which can't use the state of entities. In a {% term blueprint %}, it can be a blueprint input. Home Assistant checks the value each time the step is about to run.

```yaml
actions:
  - delay: "0:35"
    enabled: !input input_boolean
```

[conditions page]: /conditions/
[shorthand-template]: /conditions/template/#shorthand-notation
[script variables]: /integrations/script/#variables
