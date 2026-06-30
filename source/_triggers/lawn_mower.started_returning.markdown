---
title: "Lawn mower started returning to dock"
trigger: lawn_mower.started_returning
domain: lawn_mower
description: "Triggers when one or more lawn mowers start returning to dock."
---

The **Lawn mower started returning to dock** trigger fires when a mower stops mowing and starts returning to its dock.
Use it when you want to react before the mower arrives, like turning on a path light, delaying another task, or sending a message that mowing is almost done.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Lawn mower started returning to dock**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the mower must stay in the returning state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lawn mowers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted mower starts returning, **First** to fire only when the first targeted mower starts returning, or **All** to fire only after every targeted mower has started returning.
For at least:
  description: How long the mower must stay in the returning state before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lawn_mower.started_returning`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lawn_mower.started_returning
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This fires when `lawn_mower.backyard` starts heading back to the dock.

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
    How long the mower must stay in the returning state before the trigger
    fires. Accepts a duration like `00:01:00` for one minute.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a mower changes into the returning state from a known state. If a mower comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you only want to react after the mower has been returning for a short time.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Turn on the path light while the mower heads home

If the mower docks in a darker part of the yard, turn on a nearby light when it starts returning so the last part of its route stays visible.

- **Trigger**: Lawn mower started returning to dock
  - **Target**: Backyard mower
- **Condition**: Sun: after sunset
- **Action**: Turn on light

{% details "YAML example for lighting the path to the dock" %}

{% example %}
automation: |
  alias: "Turn on the path light when the mower returns"
  triggers:
    - trigger: lawn_mower.started_returning
      target:
        entity_id: lawn_mower.backyard
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garden_path
{% endexample %}

{% enddetails %}

### Automation: Send a message that mowing is almost done

If someone is waiting to use the yard, send a short message when the mower starts heading back so they know it is nearly finished.

- **Trigger**: Lawn mower started returning to dock
  - **Target**: Backyard mower
  - **For at least**: 00:01:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a return-to-dock notification" %}

{% example %}
automation: |
  alias: "Notify when the mower starts returning"
  triggers:
    - trigger: lawn_mower.started_returning
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:01:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower is on its way back to the dock."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
