---
title: "Lawn mower encountered an error"
trigger: lawn_mower.errored
domain: lawn_mower
description: "Triggers when one or more lawn mowers encounter an error."
---

The **Lawn mower encountered an error** trigger fires when a mower reports a problem while it is working.
Use it to notify you quickly, pause related automations, or turn on a nearby light before you go outside to check what happened.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Lawn mower encountered an error**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the mower must stay in the error state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lawn mowers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted mower reports an error, **First** to fire only when the first targeted mower reports an error, or **All** to fire only after every targeted mower reports an error.
For at least:
  description: How long the mower must stay in the error state before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lawn_mower.errored`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lawn_mower.errored
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This fires when `lawn_mower.backyard` enters the error state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls when the trigger fires.
    Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the mower must stay in the error state before the trigger fires.
    Accepts a duration like `00:01:00` for one minute.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a mower changes into the error state from a known state. If a mower comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you want to ignore a brief status change while the mower recovers on its own.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Send an urgent alert when the mower needs help

If the mower gets stuck under a bush or reports another fault, send an alert right away so you can fix the problem before the schedule falls behind.

- **Trigger**: Lawn mower encountered an error
  - **Target**: Backyard mower
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an error alert" %}

{% example %}
automation: |
  alias: "Alert when the mower reports an error"
  triggers:
    - trigger: lawn_mower.errored
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Lawn mower needs attention"
        message: >
          The backyard mower reported an error.
          Check it in the yard or in the app.
{% endexample %}

{% enddetails %}

### Automation: Turn on the porch light before you go outside

If the mower reports an error after dark, turn on the porch light so you can see the yard before stepping outside.

- **Trigger**: Lawn mower encountered an error
  - **Target**: Backyard mower
  - **For at least**: 00:00:15
- **Condition**: Sun: after sunset
- **Action**: Turn on light

{% details "YAML example for lighting the yard on error" %}

{% example %}
automation: |
  alias: "Turn on the porch light when the mower errors"
  triggers:
    - trigger: lawn_mower.errored
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:00:15"
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
