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

## Event states

The {% term state %} of an event entity is a timestamp showing the date and time when the last event was detected. Home Assistant stores the timestamp in UTC, for example, `2026-01-01T12:00:00.123+00:00`. The Home Assistant interface shows it in your local date and time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Event types

Besides the timestamp of the last event, the event entity also keeps track of the event type that was last emitted. This lets you trigger different automation actions based on the type of event.

For example, you can trigger a different action when a remote control button is pressed once versus twice, if your remote control can emit those different event types.

When creating automations in the UI, the event types are available as a dropdown list, depending on the event entity you are using. This means you don't have to remember or look up the different event types.

For buttons and doorbells, Home Assistant has standard event types. If the integration uses the standard event types and sets the matching device class, the interface shows them with readable names, such as **Long press start** for a button or **Ring** for a doorbell.

## Device class

The device class tells Home Assistant what kind of signal an event entity reports, such as a doorbell press. Home Assistant uses the device class to choose the icon, the default name, and readable names for the [event types](#event-types), such as **Ring**. Google Assistant, Alexa, and Apple Home use the device class to recognize doorbells.

The integration that provides the event entity sets the device class. When you create an event entity yourself with a [template helper](/integrations/template/), you choose the device class.

### Device classes in automations and templates

- Automations: The doorbell device class has its own trigger, [Doorbell rang](/triggers/doorbell.rang/). The trigger only reacts to event entities with that device class. The other device classes don't change how an event entity works in automations.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `doorbell`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

An event entity without a device class is a generic event and shows {% icon "mdi:eye-check" %}.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. If the device class has its own trigger, the trigger is listed below the item.

- {% icon "mdi:gesture-tap-button" %} **Button** (`button`): For buttons, such as the buttons of a remote control.
- {% icon "mdi:doorbell" %} **Doorbell** (`doorbell`): For buttons that are used as a doorbell.
  - Trigger: [Doorbell rang](/triggers/doorbell.rang/)
- {% icon "mdi:motion-sensor" %} **Motion** (`motion`): For motion detected by a motion sensor.

{% include integrations/triggers.md %}

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
