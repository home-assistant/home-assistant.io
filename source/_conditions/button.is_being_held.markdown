---
title: "Button is being held"
condition: button.is_being_held
domain: button
description: "Tests if one or more buttons are being held."
---

The **Button is being held** condition passes while a button is held down. It checks [event entities](/integrations/event/) with the button device class, such as the buttons of a remote control or a wall switch. Use it to check whether a button is held when something else happens. For example, you can give a button a second function that only runs while you hold another button.

A button counts as held from the moment it reports a **Long press start** (`long_press_start`) event until it reports any other event, such as **Long press end** (`long_press_end`) or an event type that is specific to the integration. A hold also ends 30 seconds after it starts, even if the button is still held.

{% include conditions/ui_header.md %}

To use **Button is being held** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), select the button event entity you want to check. You can also select a device, an area, a floor, or a label.
5. From the conditions shown for that target, select **Button is being held**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple buttons are targeted.
7. Under **For at least**, set how long the button must have been held before the condition passes. It must be less than 30 seconds. Leave it at zero to pass as soon as the button is held.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple buttons are targeted, controls how results combine. Pick **Any** to pass if at least one targeted button is being held, or **All** to pass only when every targeted button is being held. Default is **Any**.
For at least:
  description: How long the button must have been held before the condition passes. The time counts from the latest **Long press start** of the button, not from when you pushed the button down. Must be less than 30 seconds. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `button.is_being_held`. A basic example looks like this:

{% example %}
condition: |
  condition: button.is_being_held
  target:
    entity_id: event.hallway_switch_button_1
{% endexample %}

This passes while button 1 of the hallway switch is held.

To pass only once the button has been held for a while, add `for` under `options`:

{% example %}
condition: |
  condition: button.is_being_held
  target:
    entity_id: event.hallway_switch_button_1
  options:
    for: "00:00:02"
{% endexample %}

This passes once button 1 has been held for at least 2 seconds.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple buttons are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the button must have been held before the condition passes. The time counts from the latest `long_press_start` of the button, not from when you pushed the button down. Must be less than 30 seconds. Accepts a duration string in `HH:MM:SS` format. For a list of all accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map]
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md entity_type="button event entity" example="event.hallway_switch_button_1" %}

{% include conditions/behavior.md %}

## Good to know

- This condition only checks event entities with the button device class. Button entities (domain `button`) and [button helpers](/integrations/input_button/) can't be held, so they are skipped. Event entities with another device class are skipped too, even if you select them directly.
- A button must support both the **Long press start** and **Long press end** [event types](/integrations/event/#event-types). Buttons that only report a hold when you release them, or that use their own event types for holds, are always skipped, even though you can still select them as a target. To see which event types a button supports, add an [Event received](/triggers/event.received/) trigger for it, and open the **Event type** list.
{% include conditions/unavailable_targets.md entities="buttons" %}
- Entities skipped for the other reasons above count the same way: if all targeted entities are skipped, **All** passes and **Any** fails.
- The condition relies on the button reporting when you release it. If Home Assistant misses the release, for example because it restarted while you held the button, the condition keeps passing until the button reports its next event, for at most 30 seconds.
- After Home Assistant restarts, or after a held button was `unavailable`, **For at least** and the 30-second limit count from when Home Assistant restarted or the button came back, instead of from the start of the hold.
- To start an automation when a button is held, use the [Button held](/triggers/button.held/) trigger. To react to a short press, use the [Button pressed](/triggers/button.pressed/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: give a button a second function while another one is held

Use this automation to give a button of a wall switch a second function. A press of button 2 of the hallway switch turns on the hallway light. If you press it while you hold button 1, it turns on all the lights on the ground floor instead. Hold button 1 until the switch reports a long press, then press button 2. This needs button 1 to report both **Long press start** and **Long press end**, and a switch that reports a press of one button while another is held.

- **Trigger**: Button pressed
  - **Target**: Hallway switch button 2 (`event.hallway_switch_button_2`)
- **Action**: If-then
  - **If**: Button is being held
    - **Target**: Hallway switch button 1 (`event.hallway_switch_button_1`)
  - **Then**: Turn on light
    - **Target**: Ground floor
  - **Else**: Turn on light
    - **Target**: Hallway light (`light.hallway`)

{% details "YAML example for a second button function" %}

{% example %}
automation: |
  alias: "Hallway switch button 2, with a second function while button 1 is held"
  triggers:
    - trigger: button.pressed
      target:
        entity_id: event.hallway_switch_button_2
  actions:
    - if:
        - condition: button.is_being_held
          target:
            entity_id: event.hallway_switch_button_1
      then:
        - action: light.turn_on
          target:
            floor_id: ground_floor
      else:
        - action: light.turn_on
          target:
            entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Automation: turn off the lights when two buttons are held together

Use this automation to turn off all the lights on the ground floor when you hold both buttons of the hallway switch at the same time. Holding a single button does nothing. The trigger fires when either button is held, and the conditions only pass once both are held. This needs buttons that report both **Long press start** and **Long press end**, and a switch that reports each button on its own.

Each button has its own condition. If you use a single condition for both buttons with **Condition passes if** set to **All** instead, a skipped button is left out of the check. For example, if button 2 is `unavailable`, or has not reported any event yet, holding button 1 alone would turn off the lights.

- **Trigger**: Button held
  - **Target**: Hallway switch button 1 (`event.hallway_switch_button_1`) and Hallway switch button 2 (`event.hallway_switch_button_2`)
- **Condition**: Button is being held
  - **Target**: Hallway switch button 1
- **Condition**: Button is being held
  - **Target**: Hallway switch button 2
- **Action**: Turn off light
  - **Target**: Ground floor

{% details "YAML example for turning off the lights with a two-button hold" %}

{% example %}
automation: |
  alias: "Turn off the ground floor lights when both hallway switch buttons are held"
  triggers:
    - trigger: button.held
      target:
        entity_id:
          - event.hallway_switch_button_1
          - event.hallway_switch_button_2
  conditions:
    - condition: button.is_being_held
      target:
        entity_id: event.hallway_switch_button_1
    - condition: button.is_being_held
      target:
        entity_id: event.hallway_switch_button_2
  actions:
    - action: light.turn_off
      target:
        floor_id: ground_floor
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
