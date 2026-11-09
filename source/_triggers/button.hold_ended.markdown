---
title: "Button hold ended"
trigger: button.hold_ended
domain: button
description: "Triggers when one or more buttons are released after being held."
related_triggers:
  - button.held
  - button.pressed
  - event.received
---

Use this trigger when you want an automation to run when you release a button after holding it down. It works with [event entities](/integrations/event/) that have the button device class, such as the buttons of a remote control or a wall switch, if the button reports both the start and the end of a hold.

This is useful together with the [Button held](/triggers/button.held/) trigger: start something when you hold a button, and stop it when you release the button. For example, you can make the blinds move only while you hold a button on your remote control.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the button event entity you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Button hold ended**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `button.hold_ended`. A basic example looks like this:

{% example %}
trigger: |
  trigger: button.hold_ended
  target:
    entity_id: event.bedroom_switch_button
{% endexample %}

This fires every time the button of `event.bedroom_switch_button` is released after a hold.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md entity_type="button event entity" example="event.living_room_remote_open_button" custom_trigger_variables="true" %}

### Trigger variables

When the trigger reacts, the `trigger` variable contains the following data:

- `trigger.entity_id`: Entity ID of the button event entity that is released.
- `trigger.from_state`: State object of the entity before the release was reported.
- `trigger.to_state`: State object of the entity when the release was reported.
- `trigger.for`: Always `None`, because this trigger has no duration option. It doesn't tell you how long the button was held.
- `trigger.description`: `state of` followed by the entity ID, such as `state of event.living_room_remote_open_button`.

For example, use {% raw %}`{{ trigger.to_state.name }}`{% endraw %} in an action to include the name of the released button in a notification.

For the data that all triggers include, refer to [Trigger data in templates](/docs/automation/trigger-data/#properties-of-all-triggers).

## Good to know

- This trigger works with [event entities](/integrations/event/) with the button device class (domain `event`). Event entities with another device class are skipped, even if you select them directly. Button entities and [button helpers](/integrations/input_button/) can't report a hold, so they don't work with this trigger.
- This trigger reacts to the **Long press end** (`long_press_end`) [event type](/integrations/event/#event-types), which the button reports when you release it after a hold.
- This trigger only works with button event entities that support both **Long press start** and **Long press end**. A button that only supports **Long press end** reports a hold only when you release it, and the [Button held](/triggers/button.held/) trigger already reacts to that. This way, the two triggers never fire for the same event. To see which event types a button supports, add an [Event received](/triggers/event.received/) trigger for it, and open the **Event type** list.
- You can still select a button event entity that is missing **Long press start**, **Long press end**, or both, but it never starts the automation. Each event it receives records a **Did not trigger** trace instead. For details, refer to [Testing automations](/docs/automation/testing/#how-many-traces-are-kept).
- Changes to **Unavailable** or **Unknown** don't count as releases. The first release after Home Assistant starts also counts, even if the entity showed **Unknown** before. If the entity comes back from **Unavailable**, that recovery doesn't count as a release.
- To react to the start of a hold, use the [Button held](/triggers/button.held/) trigger. If you set an interval on **Button held**, its repeats stop when you release the button. To react to a press of the same button, use the [Button pressed](/triggers/button.pressed/) trigger. To react to other event types, such as **Multi-press**, use the [Event received](/triggers/event.received/) trigger instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: stop the blinds when you release a remote button

Use this automation to stop the blinds when you release a button on your remote control. Together with an automation that opens the blinds with the [Button held](/triggers/button.held/) trigger, the blinds only move while you hold the button.

- **Trigger**: Button hold ended
  - **Target**: Living room remote open button
- **Action**: Stop cover
  - **Target**: Living room blinds

{% details "YAML example for stopping the blinds when a button is released" %}

{% example %}
automation: |
  - alias: "Stop the living room blinds when the remote button is released"
    triggers:
      - trigger: button.hold_ended
        target:
          entity_id: event.living_room_remote_open_button
    actions:
      - action: cover.stop_cover
        target:
          entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

### Automation: close a garden water valve when you release a button

Use this automation to let water run from the garden hose only while you hold a button, like when you fill a watering can. Together with an automation that opens the valve with the [Button held](/triggers/button.held/) trigger, the water stops as soon as you release the button. To make sure the water also stops if Home Assistant doesn't receive the release, for example because the battery of the button runs out, add another automation that closes the valve after it has been open for a few minutes.

- **Trigger**: Button hold ended
  - **Target**: Garden switch button
- **Action**: Close valve
  - **Target**: Garden hose valve

{% details "YAML example for closing a water valve when a button is released" %}

{% example %}
automation: |
  - alias: "Close the garden hose valve when the button is released"
    triggers:
      - trigger: button.hold_ended
        target:
          entity_id: event.garden_switch_button
    actions:
      - action: valve.close_valve
        target:
          entity_id: valve.garden_hose
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
