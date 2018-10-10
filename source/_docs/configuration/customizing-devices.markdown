---
layout: page
title: "Customizing entities"
description: "Simple customization for entities in the frontend."
date: 2016-04-20 06:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/customizing-devices/
---

## {% linkable_title Changing the entity_id %}

You can use the UI to change the `entity_id` and friendly name of supported entities. To do this:

1. Select the entity, either from or from the frontend, or by clicking <img src='/images/frontend/entity_box.png' /> next to the entity in the dev-states menu
2. Click on the cog in the right corner of the entity's dialog
3. Enter the new name or the new entity ID (remember not to change the domain of the entity - the part before the `.`)
4. Select *Save*

## {% linkable_title Customizing entities %}

By default, all of your devices will be visible and have a default icon determined by their domain. You can customize the look and feel of your front page by altering some of these parameters. This can be done by overriding attributes of specific entities.

### {% linkable_title Customization using the UI %}

Under the *Configuration* menu you'll find the *Customization* menu. When you select an entity to customize, you'll see all the existing attributes listed and you can customize those, or select an additional supported attribute ([see below](/docs/configuration/customizing-devices/#possible-values)).

#### {% linkable_title Possible values %}

{% configuration customize %}
friendly_name:
  description: Name of the entity as displayed in the UI.
  required: false
  type: string
homebridge_name:
  description: Name of the entity in `HomeBridge`.
  required: false
  type: string
hidden:
  description: Set to `true` to hide the entity.
  required: false
  type: boolean
  default: False
homebridge_hidden:
  description: Set to `true` to hide the entity from `HomeBridge`.
  required: false
  type: boolean
  default: False
emulated_hue_hidden:
  description: Set to `true` to hide the entity from `emulated_hue` (this will be deprecated in the near future and should be configured in [`emulated_hue`](/components/emulated_hue)).
  required: false
  type: boolean
  default: False
entity_picture:
  description: URL to use as picture for entity.
  required: false
  type: string
icon:
  description: Any icon from [MaterialDesignIcons.com](http://MaterialDesignIcons.com) ([Cheatsheet](https://materialdesignicons.com/cheatsheet)). Prefix name with `mdi:`, ie `mdi:home`.
  required: false
  type: string
assumed_state:
  description: For switches with an assumed state two buttons are shown (turn off, turn on) instead of a switch. By setting `assumed_state` to `false` you will get the default switch icon.
  required: false
  type: boolean
  default: True
device_class:
  description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below).
  required: false
  type: boolean
initial_state:
  description: Sets the initial state for automations, `on` or `off`.
  required: false
  type: string
unit_of_measurement:
  description: Defines the units of measurement, if any.
  required: false
  type: string
{% endconfiguration %}

#### {% linkable_title Device Class %}

Device class is currently supported by the following components:

* [Binary Sensor](/components/binary_sensor/)
* [Sensor](/components/sensor/)
* [Cover](/components/cover/)

### {% linkable_title Manual customization %}

<p class='note'>
If you implement `customize`, `customize_domain`, or `customize_glob` you must make sure it is done inside of `homeassistant:` or it will fail.
</p>

```yaml
homeassistant:
  name: Home
  unit_system: metric
  # etc

  customize:
    # Add an entry for each entity that you want to overwrite.
    sensor.living_room_motion:
      hidden: true
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
  # Customize all entities in a domain
  customize_domain:
    light:
      icon: mdi:home
    automation:
      initial_state: 'on'
  # Customize entities matching a pattern
  customize_glob:
    "light.kitchen_*":
      icon: mdi:description
    "scene.month_*_colors":
      hidden: true
      emulated_hue_hidden: false
      homebridge_hidden: true
```

### {% linkable_title Reloading customize %}

Home Assistant offers a service to reload the core configuration while Home Assistant is running called `homeassistant.reload_core_config`. This allows you to change your customize section and see it being applied without having to restart Home Assistant. To call this service, go to the <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> service developer tools, select the service `homeassistant.reload_core_config` and click "CALL SERVICE".

<p class='note warning'>
New customize information will be applied the next time the state of the entity gets updated.
</p>
