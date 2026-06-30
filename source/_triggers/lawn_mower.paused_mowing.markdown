---
title: "Lawn mower paused mowing"
trigger: lawn_mower.paused_mowing
domain: lawn_mower
description: "Triggers when one or more lawn mowers pause mowing."
---

The **Lawn mower paused mowing** trigger fires when a mower stops in the middle of a run without docking.
Use it when you want to react to an interrupted job, like sending a reminder, pausing another yard task, or waiting before you restart the mower.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Lawn mower paused mowing**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the mower must stay paused before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lawn mowers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted mower pauses, **First** to fire only when the first targeted mower pauses, or **All** to fire only after every targeted mower has paused.
For at least:
  description: How long the mower must stay paused before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lawn_mower.paused_mowing`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lawn_mower.paused_mowing
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This fires when `lawn_mower.backyard` changes to the paused state.

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
    How long the mower must stay paused before the trigger fires. Accepts a
    duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a mower changes into the paused state from a known state. If a mower comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you only want to react when the pause lasts longer than a quick stop.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Remind yourself when the mower has been paused for a while

If the mower has been paused for 15 minutes, send a reminder so you can decide whether to resume the run or bring it back to the dock.

- **Trigger**: Lawn mower paused mowing
  - **Target**: Backyard mower
  - **For at least**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a paused-mowing reminder" %}

{% example %}
automation: |
  alias: "Remind me when the mower stays paused"
  triggers:
    - trigger: lawn_mower.paused_mowing
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:15:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The backyard mower has been paused for
          15 minutes.
{% endexample %}

{% enddetails %}

### Automation: Turn off the sprinkler schedule while the mower is paused

If the mower pauses because the yard is busy, you can also stop another outdoor routine until you decide what to do next.

- **Trigger**: Lawn mower paused mowing
  - **Target**: Backyard mower
  - **For at least**: 00:05:00
- **Action**: Turn off automation

{% details "YAML example for turning off another automation" %}

{% example %}
automation: |
  alias: "Pause sprinkler routine when mowing pauses"
  triggers:
    - trigger: lawn_mower.paused_mowing
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:05:00"
  actions:
    - action: automation.turn_off
      target:
        entity_id: automation.water_the_backyard
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
