---
title: "Button pressed"
trigger: button.pressed
domain: button
description: "Triggers when one or more buttons are pressed."
related_triggers:
  - button.held
  - event.received
---

Use this trigger when you want an automation to run every time a button is pressed. It works with button {% term entities %} provided by your devices and integrations, with [button helpers](/integrations/input_button/) you create yourself, and with [event entities](/integrations/event/) that have the button device class, such as the buttons of a remote control or a wall switch. This is useful when a button starts a task on a device and you also want Home Assistant to take a follow-up action, or when you want to start an automation from a button on your dashboard or a physical button.

You can also make the trigger react to a double, triple, or quadruple press instead of a single press, if the button reports it. This is useful to give one button several functions, like turning on a light with a single press and turning off all the lights in the room with a double press.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the button entity, button helper, or button event entity you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Button pressed**.
6. Under **Number of presses**, keep **Single press** to react to a single press, or select **Double press**, **Triple press**, or **Quadruple press** to react only when the button is pressed that many times in quick succession.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Number of presses:
  description: |
    How many times the button is pressed in quick succession:

    - **Single press**: when the button is pressed once. This is the default.
    - **Double press**, **Triple press**, or **Quadruple press**: only when the button is pressed that many times in quick succession. Only button event entities that report **Multi-press** support this. Other entities never start the automation.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.pressed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.pressed
  target:
    entity_id: button.air_purifier_reset_filter
{% endexample %}

This fires every time `button.air_purifier_reset_filter` is pressed.

To fire only when the button is pressed twice in quick succession, add the `press_count` option:

{% example %}
trigger: |
  trigger: button.pressed
  target:
    entity_id: event.living_room_remote_button
  options:
    press_count: 2
{% endexample %}

### Options in YAML

{% options_yaml %}
press_count:
  description: >
    How many times the button is pressed in quick succession. Must be `1` or more. Use `1` for a single press. With a number above `1`, the trigger only reacts to button event entities that report **Multi-press**, and only when the number of presses they report matches. Other entities never start the automation. Unlike the UI, which goes up to **Quadruple press**, you can use any higher count your button reports.
  required: false
  type: integer
  default: 1
{% endoptions_yaml %}

{% include triggers/targets.md entity_type="button, button helper, or button event entity" example="button.restart_router" %}

## Good to know

- This trigger works with button entities provided by your devices and integrations (domain `button`), [button helpers](/integrations/input_button/) you create yourself (domain `input_button`), and [event entities](/integrations/event/) with the button device class (domain `event`).
- For button entities and button helpers, this trigger fires when Home Assistant detects a button press from the entity.
- When **Number of presses** is set to **Single press**, this trigger reacts to only one [event type](/integrations/event/#event-types) of a button event entity, so one press of the button starts the automation only once. It uses the first of these event types that the entity supports:
  1. **Single press** (`single_press`)
  2. **Press end** (`press_end`), when the button is released
  3. **Press start** (`press_start`), when the button is pushed down
- When **Number of presses** is set to **Double press** or more, this trigger only reacts to the **Multi-press** (`multi_press`) event type, and only when the number of presses the button reports matches. To see which event types a button supports, add an [Event received](/triggers/event.received/) trigger for it, and open the **Event type** list.
- A button that reports both **Single press** and **Multi-press** waits briefly after a press to see if more presses follow, and only reports **Single press** if none do. So an automation set to **Single press** starts after a short delay, and a double press of that button never starts it.
- Some buttons report each press separately and don't report **Multi-press**. With these buttons, a double press starts an automation set to **Single press** twice, and an automation set to **Double press** never starts. If the button reports its double press as another event type, use the [Event received](/triggers/event.received/) trigger to react to it.
- Button entities and button helpers only support **Single press**. With any other number of presses, they never start the automation.
- Other event types, such as **Long press start** or **Long press end**, don't start the automation. To react to a button being held, use the [Button held](/triggers/button.held/) trigger. To react to other event types, use the [Event received](/triggers/event.received/) trigger instead.
- When **Number of presses** is set to **Single press**, if the button supports **Press start** but neither **Single press** nor **Press end**, this trigger also fires when you start holding the button. If you also use the [Button held](/triggers/button.held/) trigger for the same button, both triggers fire when you hold it.
- Event entities with another device class are skipped, even if you select them directly.
- An entity that doesn't support the selected number of presses never starts the automation. This includes button event entities that support none of **Single press**, **Press end**, or **Press start**, when **Number of presses** is set to **Single press**. Each press or event it receives records a **Did not trigger** trace instead. For details, refer to [Testing automations](/docs/automation/testing/#how-many-traces-are-kept). If a button supports **Multi-press** but reports a different number of presses, the automation doesn't start and no trace is recorded.
- Changes to `unavailable` or `unknown` do not count as button presses.
- If you only need to press a button from an automation, use the related [**Press button**](/actions/button.press/) action instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when a filter reset button is pressed

Use this automation to keep a record of when a maintenance button was pressed.

- **Trigger**: Button pressed
  - **Target**: Air purifier filter reset button
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a filter reset button notification" %}

{% example %}
automation: |
  - alias: "Notify when the filter reset button is pressed"
    triggers:
      - trigger: button.pressed
        target:
          entity_id: button.air_purifier_reset_filter
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: "The air purifier filter reset button was pressed."
{% endexample %}

{% enddetails %}

### Automation: turn on a light when an identify button is pressed

Use this automation when a button helps you locate a device and you want a nearby light to turn on at the same time.

- **Trigger**: Button pressed
  - **Target**: Front door camera identify button
- **Action**: Turn on light

{% details "YAML example for turning on a light from an identify button" %}

{% example %}
automation: |
  - alias: "Turn on the porch light when the camera identify button is pressed"
    triggers:
      - trigger: button.pressed
        target:
          entity_id: button.front_door_camera_identify
    actions:
      - action: light.turn_on
        target:
          entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
