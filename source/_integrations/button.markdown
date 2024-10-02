---
title: Button
description: Instructions on how to set up your button with Home Assistant.
ha_category:
  - Button
ha_release: 2021.12
ha_quality_scale: internal
ha_domain: button
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

A button {% term entity %} is an entity that can fire an {% term event %} / trigger an {% term action %} towards
a {% term device %} or {% term service %} but remains stateless from the Home Assistant perspective.

It can be compared to a real live momentary switch, push-button, or some other
form of a stateless switch.

{% include integrations/building_block_integration.md %}

## The state of a button

The button {% term entity %} is stateless, as in, it cannot have a state like the `on` or
`off` state that, for example, a normal switch entity has.

The state of a button is a timestamp showing the date and time of the last time the button had been pressed in the Home Assistant UI or via an action.

<p class='img'>
<img src='/images/integrations/button/state_button.png' alt='Screenshot showing the state of a button entity in the developer tools' />
Screenshot showing the state of a button entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of a button entity in Home Assistant is a timestamp, it
means we can use it in our automations. For example:

```yaml
triggers:
  - trigger: state
    entity_id: button.my_button
actions:
  - action: notify.frenck
    data:
      message: "My button has been pressed!"
```

## Actions

The button entities exposes a single {% term action %}: {% my developer_call_service service="button.press" %}

This action can be called to trigger a button press for that entity.

```yaml
- action: button.press
  target:
    entity_id: button.my_button
```

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing different device classes for buttons:

<p class='img'>
<img src='/images/screenshots/button_classes_icons.png' />
Example of device class icons.
</p>

The following device classes are supported for buttons:

- **None**: Generic button. This is the default and doesn't need to be set.
- **identify**: The button is used to identify a device.
- **restart**: The button restarts the device.
- **update**: The button updates the software of the device.
