---
title: "Lawn mower started mowing"
trigger: lawn_mower.started_mowing
domain: lawn_mower
description: "Triggers after one or more lawn mowers start mowing."
---

The **Lawn mower started mowing** trigger fires when a mower begins a mowing run.
Use it to react when yard work starts, like muting another routine, sending a confirmation, or turning on a light along the first part of the route.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Lawn mower started mowing**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the mower must stay in the mowing state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lawn mowers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted mower starts mowing, **First** to fire only when the first targeted mower starts mowing, or **All** to fire only after every targeted mower has started mowing.
For at least:
  description: How long the mower must stay in the mowing state before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lawn_mower.started_mowing`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lawn_mower.started_mowing
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This fires when `lawn_mower.backyard` starts mowing.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls when the trigger fires.
    Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the mower must stay in the mowing state before the trigger fires.
    Accepts a duration like `00:02:00` for two minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a mower changes into the mowing state from a known state. If a mower comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you want to ignore a short transition while the mower leaves the dock.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Let your household know the mower has started

If someone is about to let pets or children into the yard, a quick message can help them avoid the mowing area.

- **Trigger**: Lawn mower started mowing
  - **Target**: Backyard mower
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a mowing-start notification" %}

{% example %}
automation: |
  alias: "Notify when the mower starts"
  triggers:
    - trigger: lawn_mower.started_mowing
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower has started mowing."
{% endexample %}

{% enddetails %}

### Automation: Turn off the sprinkler automation when mowing begins

If the mower and sprinklers should never run at the same time, turn off the sprinkler automation as soon as the mowing run starts.

- **Trigger**: Lawn mower started mowing
  - **Target**: Backyard mower
  - **For at least**: 00:02:00
- **Action**: Turn off automation

{% details "YAML example for pausing the sprinkler schedule" %}

{% example %}
automation: |
  alias: "Turn off sprinklers when mowing starts"
  triggers:
    - trigger: lawn_mower.started_mowing
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:02:00"
  actions:
    - action: automation.turn_off
      target:
        entity_id: automation.water_the_backyard
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
