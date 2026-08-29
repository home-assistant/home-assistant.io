---
title: Sky effect
action: lifx.effect_sky
domain: lifx
description: "Run the firmware-based Sky effect on LIFX Ceiling lights."
related_actions:
  - lifx.effect_morph
  - lifx.effect_stop
---

Use this action to run the firmware-based Sky effect, which animates a sky scene across the device. This is a hardware effect that only works on LIFX Ceiling lights. The effect emulates three types of sky: Sunrise, Sunset, and Clouds. The default values and palette for each type match those used by the LIFX smartphone app.

By default, the light is turned on when the effect starts. Turn off the power on option to leave a light that is off untouched.

{% include actions/ui_header.md %}

To run the sky effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX Ceiling lights you want to animate.
6. From the actions shown for that target, select **Sky effect**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: For the Sunrise and Sunset sky types, how long the effect takes to complete, in seconds. For the Clouds sky type, the speed of the clouds across the device (1 to 86400).
Sky type:
  description: "The style of sky to animate. One of: `Clouds`, `Sunrise`, or `Sunset`."
Cloud saturation minimum:
  description: The minimum cloud saturation for the Clouds sky type (0 to 255).
Cloud saturation maximum:
  description: The maximum cloud saturation for the Clouds sky type (0 to 255).
Palette:
  description: A list of up to 6 colors to use for the effect, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000).
Power on:
  description: Turn this off to keep a light that is off from being turned on before the effect starts.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_sky`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_sky
  target:
    entity_id: light.lifx_ceiling
  data:
    sky_type: Sunrise
    speed: 600
{% endexample %}

This runs a five-minute Sunrise across the LIFX Ceiling.

### Options in YAML

{% options_yaml %}
speed:
  description: For the Sunrise and Sunset sky types, how long the effect takes to complete, in seconds. For the Clouds sky type, the speed of the clouds across the device (1 to 86400).
  required: false
  type: integer
  default: 50
sky_type:
  description: "The style of sky to animate. One of: `Clouds`, `Sunrise`, or `Sunset`."
  required: false
  type: string
  default: Clouds
cloud_saturation_min:
  description: The minimum cloud saturation for the Clouds sky type (0 to 255).
  required: false
  type: integer
  default: 50
cloud_saturation_max:
  description: The maximum cloud saturation for the Clouds sky type (0 to 255).
  required: false
  type: integer
  default: 180
palette:
  description: A list of up to 6 colors to use for the effect, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000).
  required: false
  type: list
power_on:
  description: Set to false to keep a light that is off from being turned on before the effect starts.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

## Good to know

- The palette is shared between all three sky types. To use a custom palette, provide all six colors in this order:
  1. Sky: the background sky color for the Clouds sky type.
  2. Night sky: the starting or finishing color of the sky when no sun is visible, for the Sunrise and Sunset sky types.
  3. Dawn sky: the color of the sky just as the sun appears.
  4. Dawn sun: the color of the sun just as it appears.
  5. Full sun: the color of the sun as it covers the whole light.
  6. Final sun: the color of the full sun at the end of the effect.

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
