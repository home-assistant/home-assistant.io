---
title: "Button held"
trigger: button.held
domain: button
description: "Triggers when one or more buttons are held, optionally repeating at a set interval for as long as they stay held."
related_triggers:
  - button.pressed
  - event.received
---

Use this trigger when you want an automation to run when a button is held down. It works with [event entities](/integrations/event/) that have the button device class, such as the buttons of a remote control or a wall switch. This is useful to give a button a second function, like turning off all the lights in a room when you hold it.

You can also make the trigger fire again at a set interval for as long as the button stays held. This is useful to keep changing something while you hold the button, like dimming a light or turning up the volume.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the button event entity you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Button held**.
6. Optional: To make the trigger fire again while the button stays held, select **Interval**, and enter how often. If you don't select **Interval**, the trigger fires once per hold.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Interval:
  description: How often to fire again while the button stays held. Must be more than 0 and less than 30 seconds. Only buttons that report both **Long press start** and **Long press end** repeat. Other buttons fire once per hold. Repeats stop after 30 seconds, even if the button is still held. If you don't select it, the trigger fires once per hold.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.held`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.held
  target:
    entity_id: event.bedroom_switch_button
{% endexample %}

This fires once every time the button of `event.bedroom_switch_button` is held.

To fire again every half second for as long as the button stays held:

{% example %}
trigger: |
  trigger: button.held
  target:
    entity_id: event.living_room_remote_brightness_up
  options:
    interval:
      milliseconds: 500
{% endexample %}

### Options in YAML

{% options_yaml %}
interval:
  description: |
    How often to fire again while the button stays held. Leave it out to fire once per hold. Must be more than 0 and less than 30 seconds. Only buttons that report both **Long press start** and **Long press end** repeat. Other buttons fire once per hold. Repeats stop after 30 seconds, even if the button is still held. Accepts a duration string in `HH:MM:SS` format, such as `"00:00:01.5"`, or a time period mapping, such as `milliseconds: 500`. For a list of all accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map]
{% endoptions_yaml %}

{% include triggers/targets.md entity_type="button event entity" example="event.living_room_remote_brightness_up" custom_trigger_variables="true" %}

### Trigger variables

When the trigger reacts, the `trigger` variable contains the following data:

- `trigger.entity_id`: Entity ID of the button event entity that is held.
- `trigger.from_state`: State object of the entity before the hold was reported.
- `trigger.to_state`: State object of the entity when the hold was reported. The repeats while the button stays held use the same `from_state` and `to_state`.
- `trigger.repeat_count`: `0` for the run when the hold is reported, then `1`, `2`, and so on for each repeat while the button stays held.
- `trigger.description`: `state of` followed by the entity ID for the first run, such as `state of event.living_room_remote_brightness_up`. For each repeat, it's `hold of` followed by the entity ID.

This trigger doesn't include `trigger.for`.

For example, use {% raw %}`{{ trigger.repeat_count }}`{% endraw %} in a condition to only run an action after the button has been held for a while.

For the data that all triggers include, refer to [Trigger data in templates](/docs/automation/trigger-data/#properties-of-all-triggers).

## Good to know

- This trigger works with [event entities](/integrations/event/) with the button device class (domain `event`). Event entities with another device class are skipped, even if you select them directly. Button entities and [button helpers](/integrations/input_button/) can't report a hold, so they don't work with this trigger.
- This trigger reacts to a single [event type](/integrations/event/#event-types), so a hold reported as several event types doesn't fire it twice. It uses the first of these event types that the entity supports:
  1. **Long press start** (`long_press_start`), when the button has been pushed down for a while
  2. **Long press end** (`long_press_end`), when the button is released after a hold, for buttons that only report a hold on release
- You can still select a button event entity that supports neither of the event types above, but it never starts the automation. Each event it receives records a **Did not trigger** trace instead. For details, refer to [Testing automations](/docs/automation/testing/#how-many-traces-are-kept).
- The trigger only fires again at the interval for button event entities that support both **Long press start** and **Long press end**, since Home Assistant needs both to know when the hold ends. For other button event entities, the trigger fires once per hold, even if you set an interval. To see which event types a button supports, add an [Event received](/triggers/event.received/) trigger for it, and open the **Event type** list.
- The first repeat comes one interval after the trigger first fires. Repeating stops when:
  - The button is released, or the entity receives any other event.
  - The entity becomes unavailable or is removed.
  - The entity is no longer part of the target, for example, because you moved its device to another area.
  - 30 seconds have passed since the trigger first fired. This limit stops the repeats if Home Assistant misses the release of the button.
- If you select several buttons, each held button repeats on its own interval.
- Each repeat starts a new run of the automation. If the previous run is still going, the [automation mode](/docs/automation/modes/) decides what happens. With the default **Single** mode, the repeat is skipped and a warning is logged. Each repeat also records its own trace, so a long hold can replace the traces of earlier runs. For details, refer to [Why the trace you want is missing](/docs/automation/testing/#why-the-trace-you-want-is-missing).
- Changes to **Unavailable** or **Unknown** don't count as holds. The first hold after Home Assistant starts also counts, even if the entity showed **Unknown** before. If the entity comes back from **Unavailable**, that recovery doesn't count as a hold.
- To react to a press of the same button, use the [Button pressed](/triggers/button.pressed/) trigger. If the button reports **Press start** but neither **Single press** nor **Press end**, **Button pressed** also fires when you hold the button. To react to a double or triple press, use the **Number of presses** option of **Button pressed**. To react to other event types, use the [Event received](/triggers/event.received/) trigger instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: brighten a light while a remote button is held

Use this automation to keep making a light brighter for as long as you hold a button on your remote control. This needs a button that reports both **Long press start** and **Long press end**.

- **Trigger**: Button held
  - **Target**: Living room remote brightness up button
  - **Interval**: 500 milliseconds
- **Action**: Turn on light
  - **Target**: Living room light
  - **Brightness step**: 10%

{% details "YAML example for brightening a light while a button is held" %}

{% example %}
automation: |
    alias: "Brighten the living room light while the remote button is held"
    triggers:
      - trigger: button.held
        target:
          entity_id: event.living_room_remote_brightness_up
        options:
          interval:
            milliseconds: 500
    actions:
      - action: light.turn_on
        target:
          entity_id: light.living_room
        data:
          brightness_step_pct: 10
{% endexample %}

{% enddetails %}

### Automation: turn off all lights after a long hold of a button

Use this automation to turn off all the lights on a floor when you hold a wall switch button for a few seconds, so a short hold doesn't turn them off by accident. The trigger fires every second after the hold starts, and the condition only lets the third repeat through. This needs a button that reports both **Long press start** and **Long press end**.

- **Trigger**: Button held
  - **Target**: Hallway switch button
  - **Interval**: 1 second
- **Condition**: Template
  - **Value template**: {% raw %}`{{ trigger.repeat_count == 3 }}`{% endraw %}
- **Action**: Turn off light
  - **Target**: Ground floor

{% details "YAML example for turning off all lights after a long hold" %}

{% example %}
automation: |
    alias: "Turn off all ground floor lights after holding the hallway button"
    triggers:
      - trigger: button.held
        target:
          entity_id: event.hallway_switch_button
        options:
          interval:
            seconds: 1
    conditions:
      - "{{ trigger.repeat_count == 3 }}"
    actions:
      - action: light.turn_off
        target:
          floor_id: ground_floor
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
