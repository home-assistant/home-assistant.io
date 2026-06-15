---
title: Move effect
action: lifx.effect_move
domain: lifx
description: "Run the firmware-based Move effect on LIFX multizone lights."
related_actions:
  - lifx.paint_theme
  - lifx.effect_stop
---

Use this action to run the firmware-based Move effect, which moves the current colors on the device in a direction you choose. This is a hardware effect for LIFX multizone lights such as the LIFX Z, Lightstrip, Beam, Neon, and String.

The effect is not visible if every LED on the device is set to the same color, and it is ignored by unsupported devices. While the effect runs, you can change its colors using the [`lifx.set_state`](/actions/lifx.set_state/) action.

By default, the light is turned on when the effect starts. Turn off the power on option to leave a light that is off untouched.

{% include actions/ui_header.md %}

To run the move effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX multizone lights you want to animate.
6. From the actions shown for that target, select **Move effect**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Speed:
  description: How many seconds the effect takes to move across the length of the light (0.1 to 60).
Direction:
  description: "The direction the effect moves across the device. One of: `right` or `left`."
Theme:
  description: A predefined color theme to set on the device before starting the effect.
Power on:
  description: Turn this off to keep a light that is off from being turned on before the effect starts.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.effect_move`. A basic example looks like this:

{% example %}
action: |
  action: lifx.effect_move
  target:
    entity_id: light.lifx_beam
  data:
    speed: 3
    direction: left
{% endexample %}

This moves the current colors on the LIFX Beam to the left.

### Options in YAML

{% options_yaml %}
speed:
  description: How many seconds the effect takes to move across the length of the light (0.1 to 60).
  required: false
  type: float
  default: 3.0
direction:
  description: "The direction the effect moves across the device. One of: `right` or `left`."
  required: false
  type: string
  default: right
theme:
  description: A predefined color theme to set on the device before starting the effect.
  required: false
  type: string
  default: exciting
power_on:
  description: Set to false to keep a light that is off from being turned on before the effect starts.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

## Good to know

- The available themes are `autumn`, `bias_lighting`, `blissful`, `calaveras`, `cheerful`, `christmas`, `dream`, `energizing`, `epic`, `evening`, `exciting`, `fantasy`, `focusing`, `gentle`, `halloween`, `hanukkah`, `holly`, `hygge`, `independence`, `intense`, `kwanzaa`, `love`, `mellow`, `party`, `peaceful`, `powerful`, `proud`, `pumpkin`, `relaxing`, `romance`, `santa`, `serene`, `shamrock`, `soothing`, `spacey`, `sports`, `spring`, `stardust`, `thanksgiving`, `tranquil`, `warming`, and `zombie`.

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
