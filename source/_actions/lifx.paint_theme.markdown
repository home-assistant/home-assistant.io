---
title: Paint theme
action: lifx.paint_theme
domain: lifx
description: "Paint a predefined theme or a custom color palette across LIFX lights."
related_actions:
  - lifx.set_state
  - lifx.effect_move
---

Use this action to paint one of the predefined LIFX themes, or a custom palette of your own, across one or more LIFX lights. The predefined themes mimic the themes of the same name in the LIFX smartphone app.

If you provide both a palette and a theme, the palette takes priority. If you provide neither, the `exciting` theme is used.

{% include actions/ui_header.md %}

To paint a theme from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX lights you want to paint.
6. From the actions shown for that target, select **Paint theme**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Palette:
  description: A list of 2 to 16 colors to paint across the target lights, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). This overrides the theme.
Theme:
  description: The predefined color theme to paint. This is overridden by the palette.
Transition:
  description: The duration, in seconds, to paint the theme across the target lights.
Power on:
  description: Turn the option off to keep lights that are off from being turned on before the theme is painted.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.paint_theme`. A basic example looks like this:

{% example %}
action: |
  action: lifx.paint_theme
  target:
    entity_id: light.living_room
  data:
    theme: halloween
    transition: 2
{% endexample %}

This paints the `halloween` theme across the living room lights over two seconds.

### Options in YAML

{% options_yaml %}
palette:
  description: A list of 2 to 16 colors to paint across the target lights, each defined as hue (0 to 360), saturation (0 to 100), brightness (0 to 100), and Kelvin (1500 to 9000). This overrides the theme.
  required: false
  type: list
theme:
  description: The predefined color theme to paint. This is overridden by the palette.
  required: false
  type: string
  default: exciting
transition:
  description: The duration, in seconds, to paint the theme across the target lights.
  required: false
  type: float
power_on:
  description: Set to false to keep lights that are off from being turned on before the theme is painted.
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
