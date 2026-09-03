---
title: "Lawn mower became idle"
trigger: lawn_mower.became_idle
domain: lawn_mower
description: "Triggers when one or more lawn mowers become idle."
---

The **Lawn mower became idle** trigger fires when a mower stops and stays in the yard, neither docked nor paused.
This is the state a mower enters after the stop action cancels its task, or when it is switched on away from the dock without a job. Use it when you want to react to a mower left standing, like sending a reminder or bringing it back to the dock after a while.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Lawn mower became idle**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the mower must stay idle before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple lawn mowers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted mower becomes idle, **First** to fire only when the first targeted mower becomes idle, or **All** to fire only after every targeted mower is idle.
For at least:
  description: How long the mower must stay idle before the trigger fires. Leave it at zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lawn_mower.became_idle`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lawn_mower.became_idle
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This fires when `lawn_mower.backyard` changes to the idle state.

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
    How long the mower must stay idle before the trigger fires. Accepts a
    duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a mower changes into the idle state from a known state. If a mower comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- A paused mower is not idle: it still has a task to resume. Use the [Lawn mower paused mowing](/triggers/lawn_mower.paused_mowing/) trigger for interrupted runs.
- Not every mower reports an idle state. Check the states your integration supports.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Send the mower back to the dock when it has been idle for a while

After a stop, the mower stays where it is. This automation brings it home if nobody has started a new run within 30 minutes.

- **Trigger**: Lawn mower became idle
  - **Target**: Backyard mower
  - **For at least**: 00:30:00
- **Action**: Return lawn mower to dock
  - **Target**: Backyard mower

{% details "YAML example for docking an idle mower" %}

{% example %}
automation: |
  alias: "Dock the mower when it stays idle"
  triggers:
    - trigger: lawn_mower.became_idle
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:30:00"
  actions:
    - action: lawn_mower.dock
      target:
        entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

### Automation: Notify when the mower stops in the yard

If the mower stops during a run, send a message so you can check whether something is in its way.

- **Trigger**: Lawn mower became idle
  - **Target**: Backyard mower
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an idle-mower notification" %}

{% example %}
automation: |
  alias: "Notify when the mower stops"
  triggers:
    - trigger: lawn_mower.became_idle
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower stopped and is waiting in the yard."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
