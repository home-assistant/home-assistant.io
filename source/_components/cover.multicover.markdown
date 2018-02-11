---
layout: page
title: "Multicover"
description: "Instructions how to integrate Multicover into Home Assistant."
date: 2018-02-11 10:00 +0000
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Cover
ha_release: 0.64
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `multicover` platform can create covers that combine multiple different cover entities into one.

To enable Multicover in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
cover:
  - platform: multicover
    covers:
      my_multicover:
        friendly_name: "My Multicover"
        entity_id:
          - cover.hall_window
          - cover.living_room_window
        tilt: true
        winter_protection:
          open_position: 90
          temp: 5 # °C
          temp_sensor: sensor.temperature # °C
```
{% endraw %}

{% configuration %}
  covers:
    description: List of your covers.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      entity_id:
        description: List of cover entities you want to control. At least one `entity_id` or `entity_id_regex` need to be specified.
        required: inclusive
        type: list
      entity_id_regex:
        description: Define a regex pattern to match entities. E.g. to match all cover entities use `(cover+\.[\w]+)`. At least one `entity_id` or `entity_id_regex` need to be specified.
        required: inclusive
        type: String
      tilt:
        description: Enable tilt controls.
        required: false
        type: boolean
        default: false
      winter_protection:
        description: Enables the winter protection features. See below.
        required: false
        type: map
        keys:
          open_position:
            description: The max open position if winter protection is enabled. At least one `open_position` or `close_position` need to be specified.
            required: inclusive
            type: int
          close_position:
            description: The max close position if winter protection is enabled. At least one `open_position` or `close_position` need to be specified.
            required: inclusive
            type: int
          temperature:
            description: The temperature limit to activate winter protection. The unit of measurement does not matter as long as the temperature sensor uses the same unit.
            required: true
            type: int
          temperature_sensor:
            description: The entity_id of the temperature sensor.
            required: true
            type: String
{% endconfiguration %}

## {% linkable_title Functionality %}

After you added a `multicover` entity to your configurations file, you can control all covers you have added under `entity_id` with the controls from the `multicover` entity. It is quite useful for example if you want to control all covers in one room or house at once.

It works best if you group covers with the same supported features together (like support for `open`/`close`/`stop`/`position`/`tilt controls`), but is not limited it. In case you have bundled covers with different features together, the controls will only affect those covers that support the actions.

## {% linkable_title Winter Protection %}

During winter to prevent damages to your covers, it could be necessary to open or close the covers only to a specific point. In that case configure the parameter `winter_prtection`. It will use the `set_cover_position` function of your covers to open/close them to a specific position.

<p class='note'>
Keep in mind that this feature does not work with covers which only support `open`/`close`.
</p>
