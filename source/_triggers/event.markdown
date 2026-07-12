---
title: "Manual event received"
trigger: event
domain: homeassistant
description: "Triggers when an event is fired on the Home Assistant event bus."
related_triggers:
  - event.received
  - homeassistant
  - state
---

The **Manual event received** trigger fires an automation when a named event is emitted on the Home Assistant event bus. Use it when an integration, a script, or an API call fires an internal event and you want to match the event type, event data, or the user who triggered it.

{% note %}
This trigger listens to the internal Home Assistant event bus. It is not the same as the [**Event received**](/triggers/event.received/) trigger, which fires when a physical event entity — such as a doorbell or a remote control button — detects an event type. If you want to react to a button press or doorbell ring, use the [**Event received**](/triggers/event.received/) trigger instead.
{% endnote %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select the type of trigger to add.
5. Select **Manual event received**.
6. In **Event type**, enter the event name you want to match.
7. Optional: In **Event data**, add event data that must match.
8. Optional: Under **Limit to events triggered by**, select a user.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Event type:
  description: The event name to listen for.
Event data:
  description: Optional event data that must match before the trigger fires.
Limit to events triggered by:
  description: Optional user filter. If set, only events triggered by that user will match.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: event`. A basic example looks like this:

{% example %}
trigger: |
  trigger: event
  event_type: shopping_list_updated
{% endexample %}

This runs when the `shopping_list_updated` event is fired.

### Options in YAML

YAML supports matching event data, full event context, multiple event types, and limited templates.

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `event`.
  required: true
  type: string
event_type:
  description: The event type to listen for. You can use one event type or a list of event types.
  required: true
  type: string
event_data:
  description: Optional event data that must match.
  required: false
  type: map
context:
  description: Optional event context that must match. In the UI, only user selection is available.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- This trigger listens for events on the Home Assistant event bus. It does not watch an entity state.
- In YAML, you can use one event type or a list of event types.
- In the UI, you can limit the trigger by user. In YAML, you can also match other context fields.
- Home Assistant does not allow the `state_reported` event with this trigger.
- Limited templates in `event_type`, `event_data`, and `context` are evaluated only when the trigger is set up.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, fire an event from {% my developer_events title="**Settings** > **Developer tools** > **Events**" %}.

{% include triggers/more_examples.md %}

### Automation: send a notification when the shopping list changes

If you want to know when the shopping list changes, this automation listens for the related event and sends a message to your phone.

- **Trigger**: Manual event received
- **Event type**: `shopping_list_updated`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a shopping list event notification" %}

{% example %}
automation: |
  alias: "Notify me when the shopping list changes"
  triggers:
    - trigger: event
      event_type: shopping_list_updated
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The shopping list was updated."
{% endexample %}

{% enddetails %}

### Automation: refresh an entity after an automation reload

If you reload automations while testing, this automation can refresh an entity right after the reload event is fired.

- **Trigger**: Manual event received
- **Event type**: `automation_reloaded`
- **Action**: Update entity

{% details "YAML example for reacting to an automation reload event" %}

{% example %}
automation: |
  alias: "Refresh an entity after automations reload"
  triggers:
    - trigger: event
      event_type: automation_reloaded
  actions:
    - action: homeassistant.update_entity
      target:
        entity_id: sensor.system_status
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
