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
  - docs: /docs/automation/trigger/#event-trigger
    title: Event triggers
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Events are signals that are emitted when something happens, for example, when a user presses a physical button like a doorbell or when a button on a remote control is pressed.

The **Event** {% term integration %} provides {% term entities %} that trigger state change events, as do all other entity integrations.

These events do not capture a state in the traditional sense. For example, a doorbell does not have a state such as "on" or "off" but instead is momentarily pressed. Some events can have variations in the type of event that is emitted. For example, maybe your remote control is capable of emitting a single press, a double press, or a long press.

The event entity can capture these events in the physical world and makes them available in Home Assistant as an entity.

{% include integrations/building_block_integration.md %}

## The state of an event entity

The event entity does not capture a state such as **On** or **Off**. Instead, an event entity keeps track of the timestamp when the emitted event has last been detected.

<p class='img'>
  <img src='/images/integrations/event/event_timestamp.png' alt='Event entity with timestamp value in state and event type "pressed"'>
  Event entity with a timestamp value in state and event type "pressed".
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the state of an event entity in Home Assistant is a timestamp, it means we can use it in our automations. For example:

```yaml
triggers:
  - trigger: state
    entity_id: event.doorbell
actions:
  - action: notify.frenck
    data:
      message: "Ding Dong! Someone is at the door!"
```

## Event types

Besides the timestamp of the last event, the event entity also keeps track of the event type that has last been emitted. This can be used in automations to trigger different actions based on the type of event.

This allows you, for example, to trigger a different action when the button on a remote control is pressed once or twice, if your remote control is capable of emitting these different types of events.

When combining that with the [choose action](/docs/scripts/#choose-a-group-of-actions) script, you can assign multiple different actions to a single event entity. In the following example, short- or long-pressing the button on the remote will trigger a different scene:

```yaml
triggers:
  - trigger: state
    entity_id: event.hue_remote_control
actions:
  - alias: "Choose an action based on the type of event"
    choose:
      - conditions:
        - alias: "Normal evening scene if the button was pressed"
          condition: state
          entity_id: event.hue_remote_control_on_button
          attribute: "event_type"
          state: "short_release"
        sequence:
          - scene: scene.living_room_evening
      - conditions:
        - alias: "Scene for watching a movie if the button was long-pressed"
          condition: state
          entity_id: event.hue_remote_control_on_button
          attribute: "event_type"
          state: "long_release"
        sequence:
          - scene: scene.living_room_movie
```

When creating automations in the automation editor in the UI, the event types are available as a dropdown list, depending on the event entity you are using. This means you don't have to remember the different event types and can easily select them.

## Automating on a button press

This section shows a similar example to the example automation shown above in YAML. It's an automation that is triggered by an event state change, but shows how to implement it in the UI. To start an automation triggered by a button press (or a button press pattern), follow these steps.

### Prerequisites

- You have a device that takes button presses as inputs, such as a Tuo Smart Button, VTM31SN dimmer by Inovelli, or the Matter Pushbutton Module by Innovation Matters
- The device has been added to Home Assistant

### To automate on a button press

1. If you like, give your button event entity a friendly name.
   - Under {% my integrations title="**Settings** > **Devices & services**" %}, select the **Matter** integration card and select the device.
   - On the **Events** card, select the button entity.
     ![Select the button entity](/images/integrations/event/matter_button_event_entity.png)
   - Under **Name**, enter the new friendly name.
     ![Change the entity name](/images/integrations/event/matter_button_rename.png)
2. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create Automation**.

    ![The automation editor.](/images/getting-started/automation-editor.png)

   - Then, select **Create new automation**. This brings up an empty automation page.

     ![The start of a new automation.](/images/getting-started/new-automation.png)
3. Define what should {% term trigger %} the automation to run.
   - Select **Add trigger**, then, select **Entity** > **State**.
   - Type `event` and select your button entity.
   - **Important**: Leave the other fields **empty**.
     ![Select button event as trigger](/images/integrations/event/matter_trigger_on_button_event.png)
4. Define the condition when something should happen.
   - Under **Then do**, select **Add action**.
   - Type `choose` and select **Add condition**.
   - Select **Entity** > **State** and select your button event entity from the list.
   - Under **Attribute**, select **Event type**.
   - Under **State**, select the state change you want to act as trigger, for example **Pressed once**.
     - **Pressed once** is the event type. But the state of this event is the timestamp of when the button was pressed. This is why we automate on the state change so that it is triggered every time the button is pressed.
     ![Condition - button pressed](/images/integrations/event/matter_condition_button_pressed.png)
5. Define what should happen when your automation is triggered (when the button is pressed, for example).
   - Select **Add action** and define your action.
6. Repeat these steps for each event type you want to monitor.
   - In this example, we want to do something else when the button was pressed twice.
     ![Condition - add another option when the button is pressed twice](/images/integrations/event/matter_button_option_2.png)
7. **Save** the automation.

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

This comprehensive video tutorial explains how events work in Home Assistant and how you can set up Emulated Roku to control a media player using a physical remote control.

<lite-youtube videoid="nDHh1OjyuMA" videotitle="Event Triggers Unveiled: Control the Home Assistant Media Player with Your Remote Control!" posterquality="maxresdefault"></lite-youtube>
