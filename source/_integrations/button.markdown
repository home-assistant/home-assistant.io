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

A button {% term entity %} is an entity that can fire an {% term event %} or trigger an {% term action %} toward a {% term device %} or {% term service %}, but remains stateless from the Home Assistant perspective.

It can be compared to a momentary switch, push-button, or other form of stateless switch.

{% include integrations/building_block_integration.md %}

## The state of a button

The button {% term entity %} is stateless. Unlike a normal switch entity, it does not have an `on` or `off` state.

The state of a button is a timestamp showing when the button was last pressed via the Home Assistant UI or an action.

<p class='img'>
<img src='/images/integrations/button/state_button.png' alt='Screenshot showing the state of a button entity in the developer tools' />
Screenshot showing the state of a button entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

You can use button entities in automations to react when a button is pressed, or to simulate pressing the button from Home Assistant, like pressing a physical button on the device itself.

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing different device classes for buttons:

<p class='img'>
<img src='/images/screenshots/button_classes_icons.png' alt='Screenshot showing different button icons for the identify, restart, and update device classes.' />
Example of device class icons.
</p>

The following device classes are supported for buttons:

- **None**: Generic button. This is the default and doesn't need to be set.
- **identify**: The button is used to identify a device.
- **restart**: The button restarts the device.
- **update**: The button updates the software of the device.

## Button automation examples

The following examples show how you can use button entities in automations.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when a button is pressed

Use the button trigger to react when you press a button entity, like a reset or maintenance button.

- **Trigger**: Button pressed
  - **Target**: Air purifier filter reset button
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a button-press notification" %}

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

### Automation: restart a device with a button action

Use the button action when an integration exposes a restart or update button that you want to run from an automation.

- **Trigger**: Internet connection turns off for 10 minutes
- **Action**: Press button
   - **Target**: Router restart button

{% details "YAML example for restarting a device with a button action" %}

{% example %}
automation: |
  - alias: "Restart the router when the internet has been down"
    triggers:
      - trigger: state
        entity_id: binary_sensor.internet_connection
        to: "off"
        for: "00:10:00"
    actions:
      - action: button.press
        target:
          entity_id: button.router_restart
{% endexample %}

{% enddetails %}
