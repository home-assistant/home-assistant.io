---
title: "Lawn mower returned to dock"
trigger: lawn_mower.returned_to_dock
domain: lawn_mower
description: "Triggers after one or more lawn mowers have returned to dock."
---

The **Lawn mower returned to dock** trigger fires when a mower finishes its run and reaches its dock.
Use it when you want Home Assistant to react the moment yard work is done, like sending a notification, turning off a patio light, or starting a follow-up task.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Lawn mower returned to dock**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the mower must stay docked before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lawn mowers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted mower docks, **First** to fire only when the first targeted mower docks, or **All** to fire only after every targeted mower has docked.
For at least:
  description: How long the mower must stay docked before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lawn_mower.returned_to_dock`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lawn_mower.returned_to_dock
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This fires when `lawn_mower.backyard` reaches the dock.

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
    How long the mower must stay docked before the trigger fires. Accepts a
    duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a mower changes into the docked state from a known state. If a mower comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you want to wait until the mower has fully settled at the dock before the automation runs.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Send a notification when mowing is finished

If you want a simple heads-up when yard work is done, use this trigger to send a message as soon as the mower gets back to its dock.

- **Trigger**: Lawn mower returned to dock
  - **Target**: Backyard mower
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when the mower docks" %}

{% example %}
automation: |
  alias: "Notify when the mower docks"
  triggers:
    - trigger: lawn_mower.returned_to_dock
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower is back at the dock."
{% endexample %}

{% enddetails %}

### Automation: Turn off the patio light after the mower is back

If you turn on the patio light earlier in the mowing routine to help the mower reach the dock, this trigger is a good way to end that routine. Waiting 30 seconds after docking gives the mower time to settle before the automation runs.

- **Trigger**: Lawn mower returned to dock
  - **Target**: Backyard mower
  - **For at least**: 00:00:30
- **Action**: Turn off light

{% details "YAML example for turning off the patio light" %}

{% example %}
automation: |
  alias: "Turn off the patio light after docking"
  triggers:
    - trigger: lawn_mower.returned_to_dock
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:00:30"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.patio
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
