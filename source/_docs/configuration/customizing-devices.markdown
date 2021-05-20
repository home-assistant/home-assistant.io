---
title: "Customizing entities"
description: "Simple customization for entities in the frontend."
---

## Changing the entity_id

You can use the UI to change the `entity_id` and friendly name of supported entities. To do this:

1. Select the entity, either from the frontend or by clicking the info button next to the entity in the Developer Tools "States" tab.
2. Click on the cog in the right corner of the entity's dialog
3. Enter the new name or the new entity ID (remember not to change the domain of the entity - the part before the `.`)
4. Select *Save*

If your entity is not supported, or you cannot customize what you need via this method, please see below for more options:

## Customizing entities

By default, all of your devices will be visible and have a default icon determined by their domain. You can customize the look and feel of your front page by altering some of these parameters. This can be done by overriding attributes of specific entities.

### Customization using the UI

Under the *Configuration* menu you'll find the *Customizations* menu. If this menu item is not visible, enable advanced mode on your [profile page](/docs/authentication/#your-account-profile) first. When you select an entity to customize, you'll see all the existing attributes listed and you can customize those or select an additional supported attribute ([see below](/docs/configuration/customizing-devices/#possible-values)). You may also need to add the following to your `configuration.yaml` file, depending when you started using Home Assistant:

```yaml
homeassistant:
  customize: !include customize.yaml
```

#### Possible values

{% configuration customize %}
friendly_name:
  description: Name of the entity as displayed in the UI.
  required: false
  type: string
entity_picture:
  description: URL to use as picture for entity.
  required: false
  type: string
icon:
  description: "Any icon from [MaterialDesignIcons.com](http://materialdesignicons.com). Prefix name with `mdi:`, ie `mdi:home`. Note: Newer icons may not yet be available in the current Home Assistant release. You can check when an icon was added to MaterialDesignIcons.com at [MDI History](https://materialdesignicons.com/history)."
  required: false
  type: string
assumed_state:
  description: For switches with an assumed state two buttons are shown (turn off, turn on) instead of a switch. By setting `assumed_state` to `false` you will get the default switch icon.
  required: false
  type: boolean
  default: true
device_class:
  description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
  required: false
  type: device_class
  default: None
unit_of_measurement:
  description: Defines the units of measurement, if any. This will also influence the graphical presentation in the history visualization as continuous value. Sensors with missing `unit_of_measurement` are showing as discrete values.
  required: false
  type: string
  default: None
initial_state:
  description: Sets the initial state for automations, `on` or `off`.
  required: false
  type: boolean
  default: None
{% endconfiguration %}

#### Device Class

Device class is currently supported by the following platforms:

- [Binary Sensor](/integrations/binary_sensor/)
- [Cover](/integrations/cover/)
- [Media Player](/integrations/media_player/)
- [Sensor](/integrations/sensor/)
- [Switch](/integrations/switch/)

### Manual customization

<div class='note'>

If you implement `customize`, `customize_domain`, or `customize_glob` you must make sure it is done inside of `homeassistant:` or it will fail.

</div>

```yaml
homeassistant:
  name: Home
  unit_system: metric
  # etc

  customize:
    # Add an entry for each entity that you want to overwrite.
    thermostat.family_room:
      entity_picture: https://example.com/images/nest.jpg
      friendly_name: Nest
    switch.wemo_switch_1:
      friendly_name: Toaster
      entity_picture: /local/toaster.jpg
    switch.wemo_switch_2:
      friendly_name: Kitchen kettle
      icon: mdi:kettle
    switch.rfxtrx_switch:
      assumed_state: false
    media_player.my_media_player:
      source_list:
        - Channel/input from my available sources
  # Customize all entities in a domain
  customize_domain:
    light:
      icon: mdi:home
    automation:
      initial_state: "on"
  # Customize entities matching a pattern
  customize_glob:
    "light.kitchen_*":
      icon: mdi:description
    "scene.month_*_colors":
      icon: mdi:other
```

### Reloading customize

Home Assistant offers a service to reload the core configuration while Home Assistant is running. This allows you to change your customize section and see your changes being applied without having to restart Home Assistant.

To reload customizations, navigate to Configuration > Server Controls and then press the "Reload Location & Customizations" button. If you don't see this, enable Advanced Mode on your user profile page first.

Alternatively, you can reload via service call. Navigate to Developer Tools > Services tab, select `homeassistant.reload_core_config` from the dropdown and press the "Call Service" button.

<div class='note warning'>
New customize information will be applied the next time the state of the entity gets updated.
</div>
