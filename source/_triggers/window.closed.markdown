---
title: "Window closed"
trigger: window.closed
domain: window
description: "Triggers after one or more windows close."
related_triggers:
  - window.opened
---

The **Window closed** trigger fires when a targeted window closes. Use it to restore heating after airing out a room, confirm that windows are shut before bedtime, or start an automation only after a window has stayed closed for a while.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area the window is in, like your bedroom or kitchen. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Window closed**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple windows are targeted.
7. Under **For at least**, set how long the window must stay closed before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple windows are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted window closes, **First** to fire only when the first targeted window closes, or **All** to fire only after every targeted window is closed.
  required: true
For at least:
  description: How long the window must stay closed before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `window.closed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: window.closed
  target:
    entity_id: binary_sensor.bedroom_window
{% endexample %}

This fires when `binary_sensor.bedroom_window` closes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple windows are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
for:
  description: >
    Duration the window must stay closed before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a window transitions from a known, valid state. If a window comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- This trigger works with binary sensors and covers that use the `window` device class.
- To react when a window opens instead, use [Window opened](/triggers/window.opened/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn heating back on when bedroom window has been closed for 2 minutes

After you air out a room, it can help to wait until the window is fully closed before heating the room again.

- **Trigger**: Window closed
- **Target**: Bedroom window sensor
- **Trigger when**: Each
- **For at least**: 00:02:00
- **Action**: Climate: Set HVAC mode to heat

{% details "YAML example for restoring heating after a window closes" %}

{% example %}
automation: |
  alias: "Resume bedroom heating when the window closes"
  triggers:
    - trigger: window.closed
      target:
        entity_id: binary_sensor.bedroom_window
      options:
        behavior: any
        for: "00:02:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.bedroom
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

### Automation: lock patio door after all ground floor windows are closed

When everyone finishes airing out the house, you can wait until every ground floor window is shut before locking the patio door.

- **Trigger**: Window closed
- **Target**: Ground-floor windows label
- **Trigger when**: All
- **For at least**: 00:01:00
- **Action**: Lock: Lock

{% details "YAML example for locking a door after all windows close" %}

{% example %}
automation: |
  alias: "Lock the patio door when all ground-floor windows are closed"
  triggers:
    - trigger: window.closed
      target:
        label_id: ground_floor_windows
      options:
        behavior: last
        for: "00:01:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.patio_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
