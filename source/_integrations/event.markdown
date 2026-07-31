---
title: Event
description: Instructions on how to use event entities in Home Assistant.
ha_category:
  - Event
ha_release: 2023.8
ha_quality_scale: internal
ha_domain: event
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /triggers/event.received/
    title: Event received trigger
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Events are signals that are emitted when something happens, for example, when a user presses a physical button like a doorbell or when a button on a remote control is pressed.

The **Event** {% term integration %} provides {% term entities %} that represent these momentary signals from physical devices.

These events do not capture a state in the traditional sense. For example, a doorbell does not have a state such as "on" or "off" but instead is momentarily pressed. Some events can have variations in the type of event that is emitted. For example, a remote control might emit a single press, a double press, or a long press.

The event entity captures these events from the physical world and makes them available in Home Assistant as an entity.

{% include integrations/building_block_integration.md %}

## The state of an event entity

The event entity does not capture a state such as **On** or **Off**. Instead, an event entity keeps track of the timestamp when the emitted event was last detected.

<p class='img'>
  <img src='/images/integrations/event/event_timestamp.png' alt='Event entity with timestamp value in state and event type "pressed"'>
  Event entity with a timestamp value in state and event type "pressed".
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Event types

Besides the timestamp of the last event, the event entity also keeps track of the event type that was last emitted. This lets you trigger different automation actions based on the type of event.

For example, you can trigger a different action when a remote control button is pressed once versus twice, if your remote control can emit those different event types.

When creating automations in the UI, the event types are available as a dropdown list, depending on the event entity you are using. This means you don't have to remember or look up the different event types.

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing device classes of the event entity:

<p class='img'>
<img src='/images/integrations/event/device_class_event_icons.png' alt='Screenshot showing different icons representing device classes of the event entity' />
Example of different icons representing device classes of the event entity.
</p>

The following device classes are supported by event entities:

- **None**: Generic event. This is the default and doesn't need to be set.
- **button**: For remote control buttons.
- **doorbell**: Specifically for buttons that are used as a doorbell.
- **motion**: For motion events detected by a motion sensor.

### Video tutorial

This video tutorial explains how events work in Home Assistant and how you can set up Emulated Roku to control a media player using a physical remote control.

<lite-youtube videoid="nDHh1OjyuMA" videotitle="Event Triggers Unveiled: Control the Home Assistant Media Player with Your Remote Control!" posterquality="maxresdefault"></lite-youtube>

{% include integrations/triggers.md %}

## Triggers for button events

Event entities that use the **button** device class also work with the triggers of the [Button](/integrations/button/) integration. Use them when you want to react to a press, a double press, or a hold without picking event types yourself:

- [Button pressed](/triggers/button.pressed/)
- [Button double pressed](/triggers/button.double_pressed/)
- [Button hold started](/triggers/button.hold_started/)
- [Button hold ended](/triggers/button.hold_ended/)

Which of these you can use depends on your hardware. A button that only reports single presses does not fire the double press or hold triggers. For anything these triggers do not cover, use the [Event received](/triggers/event.received/) trigger and select the event types your device reports.

## Event automation examples

### Automation: send a notification when the doorbell rings

Use this automation to get a message on your phone whenever someone presses the doorbell.

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
