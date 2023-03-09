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
---

A button entity is an entity that can fire an event / trigger an action towards
a device or service but remains stateless from the Home Assistant perspective.

It can be compared to a real live momentary switch, push-button, or some other
form of a stateless switch.

The button entities cannot be implemented manually, but can be provided by
other integrations.

## The state of a button

The button entity is stateless, as in, it cannot have a state like the `on` or
`off` state that, for example, a normal switch entity has.

Every button entity does keep track of the timestamp of when the last time
the button entity has been pressed in the Home Assistant UI or pressed via
a service call.

Because the state of a button entity in Home Assistant is a timestamp, it
means we can use it in our automations. For example:

```yaml
trigger:
  - platform: state
    entity_id: button.my_button
action:
  - service: notify.frenck
    data:
      message: "My button has been pressed!"
```

## Services

The button entities exposes a single service: {% my developer_call_service service="button.press" %}

This service can be called to trigger a button press for that entity.

```yaml
- service: button.press
  target:
    entity_id: button.my_button
```

## Device Class

The way these buttons are displayed in the frontend can be modified in the [customize section](/docs/configuration/customizing-devices/).
The following device classes are supported for buttons:

<p class='img'>
<img src='/images/screenshots/button_classes_icons.png' />
Example of device class icons.
</p>

- **None**: Generic button. This is the default and doesn't need to be set.
- **restart**: The button restarts the device.
- **update**: The button updates the software of the device.
