---
title: "Building blocks in automations and scripts"
description: "Use building blocks to wait, repeat, choose, and run steps at the same time in your automations and scripts, in the editor or in YAML."
toc: true
related:
  - docs: /building-blocks/
    title: List of building blocks
  - docs: /docs/automation/action/
    title: Actions
  - docs: /docs/script/
    title: Scripts
  - docs: /docs/automation/editor/
    title: Automation editors
  - docs: /docs/automation/yaml/
    title: Automations in YAML
  - docs: /docs/automation/trigger-data/
    title: Trigger data in templates
---

When an automation or script runs, it goes through a list of steps. Each step is an action or a building block:

- A **building block** controls whether, when, and in which order the other steps run. It can check a condition, wait, repeat steps, choose between steps, or run steps at the same time.
- An **action** makes something happen, for example, turning on a light or sending a notification. For more about actions, refer to [Actions in automations and scripts](/docs/automation/action/).

Automations and scripts use the same building blocks.

## How automations and scripts run their steps

When an automation starts, it first checks its conditions under **And if**. If they are met, it goes through the steps under **Then do**, from top to bottom. A script has no conditions section, so it goes through its steps under **Sequence** right away.

The difference is when they run: an automation runs by itself when one of its triggers reacts, and a script runs when you start it, for example, from a dashboard, from an automation, or with Assist. For more about the difference, refer to [Concepts and terminology](/getting-started/concepts-terminology/#scripts).

To add a step in the editor, select **Add action**. To add a building block, select **Blocks** in that dialog. In YAML, you write actions and building blocks in the same list. For details, refer to [Writing steps in YAML](#writing-steps-in-yaml).

For how to create scripts, pass them values, and wait for them to finish, refer to [Scripts](/docs/script/). For scripts in YAML, refer to the [Scripts integration](/integrations/script/).

## Available building blocks

Each building block has its own page with its options and examples, grouped by categories in the [list of building blocks](/building-blocks/).

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

`enabled` can also be a [limited template](/docs/templating/limited-templates/). The limited template can't use variables, such as `trigger`, `this`, or values from the `variables` section. It also can't use the state of entities or the current time. If the limited template refers to a variable, Home Assistant skips the step or stops the run with an error.

In a {% term blueprint %}, set `enabled` directly to a blueprint input with `!input`, not through a template. Use a [boolean selector](/docs/blueprint/selectors/#boolean-selector) for the input, so its value is `true` or `false`. With another selector, such as an entity selector, the value is an entity ID, which counts as `true`, so the step always runs.

```yaml
blueprint:
  name: "Optional delay"
  domain: automation
  input:
    use_delay:
      name: "Wait 35 minutes"
      selector:
        boolean:

actions:
  - delay: "0:35"
    enabled: !input use_delay
```

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

In an automation, templates in the steps can use the `trigger` variable, which describes what started the automation. For details, refer to [available trigger data](/docs/automation/trigger-data/#trigger-properties).
