---
title: Color
description: Instructions on how to create and use color helpers in Home Assistant.
ha_category:
  - Helper
ha_release: "2026.9"
ha_quality_scale: internal
ha_codeowners:
  - '@kkilchrist'
ha_domain: color
ha_config_flow: true
ha_integration_type: helper
---

The **Color** {% term integration %} lets you store a reusable, named color value in Home Assistant.
Think of it like an [input number](/integrations/input_number/) or [input boolean](/integrations/input_boolean/) helper, but the value is a color.
You can edit the color from the UI or from automations, reference it in scripts and scenes, and apply it to any number of lights without hardcoding color values in each place.

A color {% term helper %} stores one of two kinds of color:

- **Chromatic**: a regular color, like a red or a blue. Internally it is stored as a device-independent CIE xy chromaticity, so the same helper renders consistently across lights from different manufacturers.
- **White**: a color temperature, like 2700 K warm white. The helper remembers that you picked a color temperature, so tunable-white lights receive a real Kelvin value instead of a converted color.

In addition to the color, the helper can store an optional brightness (0-255).
The brightness is independent of the color, so you can build presets that set both, or store only the color and let each light keep its current brightness.

Typical uses:

- **Cross-light presets**: pick one favorite color and apply it to whichever lights you want, without repeating the value in each scene or automation.
- **Dashboard-driven color selection**: give a dashboard a color value to change that isn't bound to any specific light.
- **Nightlight or accent presets**: store a color and a brightness together as one named thing.

## Configuration

The preferred way to configure a color {% term helper %} is through the user interface.
To add one, go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select **Create helper**.
Then, select **{% my config_flow_start domain=page.ha_domain title=page.title %}**.

{% configuration_basic %}
Name:
  description: Friendly name of the color helper.
Icon:
  description: Icon to display in the frontend for this helper.
Color kind:
  description: Whether this helper stores a chromatic color or a white color temperature.
Initial color:
  description: The starting color when the kind is chromatic. You can change it later with the **Set color** action.
Color temperature:
  description: The starting color temperature when the kind is white. You can change it later with the **Set color** action.
Initial brightness:
  description: Optional brightness (0-255) stored alongside the color.
{% endconfiguration_basic %}

The helper keeps its value across restarts, and you can change both the color and the brightness at any time with the actions below.

## State and attributes

The state of a color helper is its current color as a hex string, for example `#FF8000`.
All other representations are provided as attributes:

- `kind`: `chromatic` or `white`, depending on how the color was last set.
- `xy_color`: the color as `[x, y]` CIE chromaticity. This is the canonical stored value for chromatic colors.
- `rgb_color`: the color as an `[r, g, b]` list, derived for display.
- `hs_color`: the color as a `[hue, saturation]` list.
- `hex_color`: the color as a hex string, same as the state.
- `color_temp_kelvin`: the stored color temperature when the kind is white. Empty for chromatic colors.
- `brightness`: the stored brightness (0-255), or empty when no brightness is stored.
- `source_hex`: the exact hex value you entered, when the color was set from a hex value, RGB, HS, or a color name. Empty for xy or color temperature inputs. Read this attribute when you need the exact input value rather than the stored, gamut-mapped color.
- `color_params`: a ready-to-use mapping for the `light.turn_on` action. See [Applying a color to lights](#applying-a-color-to-lights).

## Actions

### Action color.set_color

Sets the stored color.
Provide exactly one of the color fields.
The brightness field is optional and independent of the color.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `hex_value` | yes | Hex color, for example `#FF8000`. |
| `rgb_color` | yes | RGB list, components 0-255, for example `[255, 128, 0]`. |
| `hs_color` | yes | Hue (0-360) and saturation (0-100), for example `[30, 100]`. |
| `xy_color` | yes | CIE 1931 chromaticity `[x, y]`, each 0-1. |
| `color_temp_kelvin` | yes | Color temperature in Kelvin (1000-20000). Sets the kind to white. |
| `color_name` | yes | CSS3 color name, for example `crimson`. |
| `brightness` | yes | Optional brightness (0-255) stored alongside the color. |

```yaml
actions:
  - action: color.set_color
    target:
      entity_id: color.evening_warm
    data:
      color_temp_kelvin: 2700
      brightness: 180
```

### Action color.set_brightness

Sets the stored brightness without changing the color.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `brightness` | no | Brightness (0-255). |

### Action color.clear_brightness

Clears the stored brightness.
After clearing, applying the color leaves each light's brightness unchanged.

## Applying a color to lights

The `color_params` attribute is a mapping that you can pass directly as the data of a `light.turn_on` action.
It always contains the best color representation for the stored value, plus the stored brightness when one is set:

```yaml
actions:
  - action: light.turn_on
    target:
      entity_id: light.living_room_strip
    data: "{{ state_attr('color.couch_color', 'color_params') }}"
```

What `color_params` contains, based on the helper's state:

| Helper kind | Stored brightness | `color_params` value |
| ----------- | ----------------- | -------------------- |
| Chromatic | none | `xy_color: [x, y]` |
| Chromatic | 150 | `xy_color: [x, y]`, `brightness: 150` |
| White (2700 K) | none | `color_temp_kelvin: 2700` |
| White (2700 K) | 200 | `color_temp_kelvin: 2700`, `brightness: 200` |

The [light integration](/integrations/light/) then converts this payload to whatever each target light supports:

| `color_params` contains | Target light supports | Result |
| ----------------------- | --------------------- | ------ |
| `xy_color` | `xy` | Passed through. The light clamps the value to its own color gamut. |
| `xy_color` | `rgb`, `rgbw`, or `rgbww` (no `xy`) | Converted from xy to RGB internally. |
| `xy_color` | `hs` only | Converted from xy to hue/saturation. |
| `xy_color` | `color_temp` only (tunable-white light) | Approximated to a Kelvin value. Meaningful for near-white colors, arbitrary for saturated colors. |
| `color_temp_kelvin` | `color_temp` | Passed through, clamped to the light's supported Kelvin range. |
| `color_temp_kelvin` | RGB, HS, or XY only (no `color_temp`) | Converted from Kelvin to the matching white chromaticity, then to the light's preferred format. |

In short: a white helper applied to a color-only light produces the correct warm or cool white.
A saturated chromatic color applied to a tunable-white light produces an approximation that may not be meaningful.
If you want stricter behavior, check the helper's `kind` attribute in your automation before applying the color.

If you want the color without the stored brightness, or with a different brightness for one specific call, use the individual color attributes instead of `color_params`:

```yaml
actions:
  - action: light.turn_on
    target:
      entity_id: light.gym
    data:
      xy_color: "{{ state_attr('color.gym_work_color', 'xy_color') }}"
      brightness: 255
```

## Scene support

Color helpers work together with [scenes](/integrations/scene/); they don't compete with them.
A scene that includes a color helper snapshots the helper's full value (kind, color, color temperature, and brightness) and restores it when the scene is activated.

This makes a useful two-layer pattern:

1. The color helper is the named, editable value. Change it whenever you like, from a dashboard or an automation.
2. A scene created with `scene.create` and `snapshot_entities` freezes the helper's value at capture time, together with the state of your lights.
3. Activating the scene later restores both the helper and the lights to the captured moment.

```yaml
script:
  capture_living_room:
    alias: "Capture living room scene"
    sequence:
      - action: scene.create
        data:
          scene_id: living_room_captured
          snapshot_entities:
            - color.living_room_color
            - light.living_room_lamp
            - light.living_room_strip
```

## Color automation examples

If you use a color {% term helper %} in automations, create the helper separately before using these examples.

### Automation: keep a light in sync with a color helper

Whenever the color helper changes, push the new value to a light.
This turns the helper into a live control for one or more lights.

{% raw %}

```yaml
automation:
  - alias: "Couch light follows couch color"
    triggers:
      - trigger: state
        entity_id: color.couch_color
    actions:
      - action: light.turn_on
        target:
          entity_id: light.couch
        data: "{{ state_attr('color.couch_color', 'color_params') }}"
```

{% endraw %}

### Automation: apply a favorite preset with a button

Store a favorite color and brightness in a helper, then apply it to several lights with a single tap on a [button helper](/integrations/input_button/) from a dashboard.

{% raw %}

```yaml
automation:
  - alias: "Apply evening preset to living room lights"
    triggers:
      - trigger: state
        entity_id: input_button.set_evening
    actions:
      - action: light.turn_on
        target:
          entity_id:
            - light.living_room_lamp
            - light.living_room_strip
            - light.kitchen_island
        data: "{{ state_attr('color.evening_warm', 'color_params') }}"
```

{% endraw %}

### Automation: restore a captured scene, including the helper

Restore a scene that was created with `snapshot_entities` including a color helper.
Both the helper's value and the lights return to the captured state.

```yaml
automation:
  - alias: "Restore living room at 7 PM"
    triggers:
      - trigger: time
        at: "19:00:00"
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.living_room_captured
```
