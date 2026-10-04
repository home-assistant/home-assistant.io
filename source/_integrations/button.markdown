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

A button {% term entity %} works like a physical push button: you press it to make something happen, such as restarting a router or identifying a device. It can be compared to a momentary switch, push button, or other form of stateless switch.

Unlike a switch, a button has no `on` or `off` state. Instead, it remembers when it was last pressed, so you can see when it was last used and react to each press in an {% term automation %}.

{% include integrations/building_block_integration.md %}

## Button states

The {% term state %} of a button is a timestamp showing when the button was last pressed from the Home Assistant interface or by an action. Home Assistant stores the timestamp in UTC, for example, `2026-01-01T12:00:00.123456+00:00`. The Home Assistant interface shows it in your local date and time format.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

You can use button entities in automations to react when a button is pressed, or to simulate pressing the button from Home Assistant, like pressing a physical button on the device itself.

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Device class

The device class tells Home Assistant what a button does, such as restarting a device.

The device class makes a difference in the following places:

- Icon and name: The icon matches what the button does. If the integration doesn't give the entity its own name, Home Assistant names it after the device class, such as **Restart**.
- History and Activity: If you have buttons with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the button sets the device class. When you create a button yourself with a [template helper](/integrations/template/), you choose it.

### List of available device classes

A button without a device class is a generic button and shows {% icon "mdi:button-pointer" %}.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- {% icon "mdi:crosshairs-question" %} **Identify** (`identify`): The button is used to identify a device.
- {% icon "mdi:restart" %} **Restart** (`restart`): The button restarts the device.
- {% icon "mdi:package-up" %} **Update** (`update`): The button updates the software of the device.

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `restart`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

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
