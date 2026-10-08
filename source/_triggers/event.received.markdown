---
title: "Event received"
trigger: event.received
domain: event
description: "Triggers when one or more event entities receive a matching event type."
related_triggers:
  - event
  - state
---

The **Event received** trigger runs an automation when a physical event entity — such as a doorbell, a remote control button, or a motion sensor — detects a specific type of event. Use it when you want to react to a particular event type, like a doorbell ring or a double press, rather than any state change on the entity.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to monitor.
5. From the triggers shown for that target, select **Event received**.
6. Under **Event type**, select one or more event types you want to match.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Event type:
  description: "The event types to trigger on. Select one or more types. The available types depend on the target entity. Required."
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `event.received`. A basic example looks like this:

{% example %}
trigger: |
  trigger: event.received
  target:
    entity_id: event.front_door_doorbell
  options:
    event_type:
      - ring
{% endexample %}

This fires every time `event.front_door_doorbell` receives a `ring` event.

### Options in YAML

YAML uses an `options` mapping for trigger-specific settings.

{% options_yaml %}
event_type:
  description: "One or more event types to match. The available event types depend on the target entity. Use a list for multiple types."
  required: true
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Use an event entity that supports the event type you want to select.
- This trigger fires only when the entity receives one of the specified event types. Changes to **Unavailable** or **Unknown** do not fire the trigger.
- You can select multiple event types in a single trigger to react to any of them.
- To trigger on any event type from an entity, use the [**State** trigger](/docs/automation/trigger/#state-trigger) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when the doorbell rings

Use this automation to get a message on your phone whenever someone presses your doorbell.

- **Trigger**: Event received
  - **Target**: Front door doorbell (`event.front_door_doorbell`)
  - **Event type**: Ring
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a doorbell ring notification" %}

{% example %}
automation: |
  - alias: "Notify me when the doorbell rings"
    triggers:
      - trigger: event.received
        target:
          entity_id: event.front_door_doorbell
        options:
          event_type:
            - ring
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: "Someone is at the front door."
{% endexample %}

{% enddetails %}

### Automation: turn on a scene when the remote is double-pressed

Use this automation to activate a scene when a remote control button is pressed twice.

- **Trigger**: Event received
  - **Target**: Living room remote (`event.living_room_remote_on_button`)
  - **Event type**: Double press
- **Action**: Activate scene

{% details "YAML example for activating a scene on a remote double press" %}

{% example %}
automation: |
  - alias: "Activate movie scene on remote double press"
    triggers:
      - trigger: event.received
        target:
          entity_id: event.living_room_remote_on_button
        options:
          event_type:
            - double_short_release
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.living_room_movie
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
