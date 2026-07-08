---
title: Input color
description: Instructions on how to integrate the input color integration into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 2026.8
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_color
ha_integration_type: helper
---

The **Input color** {% term integration %} allows you to define color values that can be controlled via the frontend and used in automations, scripts, scenes, and templates. It can store a chromatic color, a white color temperature, and an optional brightness value.

The preferred way to configure an input color is via the user interface at **{% my helpers title="Settings > Devices & services > Helpers" %}**. Click the add button and then choose the **{% my config_flow_start domain="input_color" title="Color" %}** option.

To be able to add **Helpers** via the user interface you should have `default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by default unless you removed it.
If you removed `default_config:` from your configuration, you must add `input_color:` to your `configuration.yaml` first, then you can use the UI.

Input colors can also be configured via {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
input_color:
  accent_color:
    name: Accent color
    initial_color: "#ff8000"
    initial_brightness: 200
    icon: mdi:palette
  evening_white:
    name: Evening white
    initial_kelvin: 2700
```

{% configuration %}
  input_color:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input.
        required: false
        type: string
      initial_color:
        description: Initial color as a 6-digit hex color, for example `#ff8000`. Only one of `initial_color` or `initial_kelvin` can be set.
        required: false
        type: string
        default: "#ffffff"
      initial_kelvin:
        description: Initial white color temperature in Kelvin. Only one of `initial_color` or `initial_kelvin` can be set.
        required: false
        type: integer
      initial_brightness:
        description: Optional initial brightness value from 0 to 255.
        required: false
        type: integer
      icon:
        description: Icon to display in front of the input element in the frontend.
        required: false
        type: icon
{% endconfiguration %}

## Restore state

If you set a valid value for `initial_color` or `initial_kelvin`, this integration will start with the configured color. Otherwise, it will restore the color it had before Home Assistant stopped.

## State and attributes

The state of an input color is a hex color string. Additional color formats are available as state attributes:

- `hex_color`: Hex color string.
- `rgb_color`: RGB color as a list of red, green, and blue values.
- `hs_color`: Hue and saturation color.
- `xy_color`: CIE 1931 xy color.
- `color_temp_kelvin`: Color temperature in Kelvin for white color values.
- `brightness`: Optional brightness value from 0 to 255.

## Actions

This integration provides the following actions:

- `input_color.set_color`: Sets the stored color. Use one of `hex_value`, `rgb_color`, `hs_color`, `xy_color`, `color_temp_kelvin`, or `color_name`. You can also provide `brightness`.
- `input_color.set_brightness`: Sets the stored brightness value.
- `input_color.clear_brightness`: Clears the stored brightness value.

```yaml
# Example action
action: input_color.set_color
target:
  entity_id: input_color.accent_color
data:
  hex_value: "#00ff00"
  brightness: 180
```

## Scenes

To set the state of an input color in a [Scene](/integrations/scene/):

```yaml
# Example configuration.yaml entry
scene:
  - name: Example color scene
    entities:
      input_color.accent_color:
        state: "#ff8000"
        brightness: 200
```

## Automation examples

The following example uses an input color to set a light color and brightness:

```yaml
automation:
  - alias: "Apply accent color"
    triggers:
      - trigger: state
        entity_id: input_color.accent_color
    actions:
      - action: light.turn_on
        target:
          entity_id: light.living_room
        data:
          rgb_color: "{{ state_attr('input_color.accent_color', 'rgb_color') }}"
          brightness: "{{ state_attr('input_color.accent_color', 'brightness') }}"
```
