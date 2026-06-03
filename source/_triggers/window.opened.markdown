---
title: "Window opened"
trigger: window.opened
domain: window
description: "Triggers after one or more windows open."
related_triggers:
  - window.closed
---

The **Window opened** trigger fires when a targeted window opens. Use it when you want Home Assistant to react right away, like sending an alert when a window opens after dark or pausing heating when fresh air starts coming in.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area the window is in, like your bedroom or kitchen. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Window opened**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple windows are targeted.
7. Under **For at least**, set how long the window must stay open before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple windows are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted window opens, **First** to fire only when the first targeted window opens, or **All** to fire only after every targeted window is open.
  required: true
For at least:
  description: How long the window must stay open before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `window.opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: window.opened
  target:
    entity_id: binary_sensor.kitchen_window
{% endexample %}

This fires when `binary_sensor.kitchen_window` opens.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple windows are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: true
  type: string
  default: each
for:
  description: >
    Duration the window must stay open before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a window transitions from a known, valid state. If a window comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- This trigger works with binary sensors and covers that use the `window` device class.
- To react when a window closes instead, use [Window closed](/triggers/window.closed/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when kitchen window opens after sunset

If a kitchen window opens after dark, a quick notification can help you notice it before you lock up for the night.

- **Trigger**: Window opened
  - **Target**: Kitchen window sensor
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Condition**: Sun is below horizon
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a nighttime window-open notification" %}

{% example %}
automation: |
  alias: "Notify when a kitchen window opens after sunset"
  triggers:
    - trigger: window.opened
      target:
        entity_id: binary_sensor.kitchen_window
      options:
        behavior: each
        for: "00:00:00"
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Kitchen window opened"
        message: "The kitchen window was opened after sunset."
{% endexample %}

{% enddetails %}

### Automation: pause cooling when skylight opens

When a motorized skylight opens, there is little point in keeping the air conditioning running. This automation turns cooling off after the skylight has been open for 2 minutes.

- **Trigger**: Window opened
- **Target**: Hallway skylight cover
- **Trigger when**: Each
- **For at least**: 00:02:00
- **Action**: Climate: Turn off

{% details "YAML example for pausing cooling when a skylight opens" %}

{% example %}
automation: |
  alias: "Turn off cooling when the skylight opens"
  triggers:
    - trigger: window.opened
      target:
        entity_id: cover.hallway_skylight
      options:
        behavior: each
        for: "00:02:00"
  actions:
    - action: climate.turn_off
      target:
        entity_id: climate.upstairs
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
