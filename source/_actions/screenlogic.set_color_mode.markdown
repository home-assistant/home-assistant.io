---
title: "Set color mode"
action: screenlogic.set_color_mode
domain: screenlogic
description: "Sets the color mode for all color-capable lights on a ScreenLogic gateway."
related_actions:
  - screenlogic.start_super_chlorination
  - screenlogic.stop_super_chlorination
---

The **Set color mode** action changes the color mode for every color-capable light attached to your ScreenLogic gateway, such as IntelliBrite lights. You can switch the lights to a fixed color, a dynamic show like party or romance, or a control mode such as saving and recalling colors.

This is handy for setting the mood automatically, for example switching to a calm color in the evening or a festive show when guests arrive.

{% include actions/ui_header.md %}

To set the light color mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Pentair ScreenLogic: Set color mode**.
6. Choose the **Config entry** for your gateway and the **Color mode** to set.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The ScreenLogic gateway to set the color mode on.
  required: true
Color mode:
  description: The color mode to set. See the list of color modes below.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `screenlogic.set_color_mode`. A basic example looks like this:

{% example %}
action: |
  action: screenlogic.set_color_mode
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
    color_mode: romance
{% endexample %}

This sets all color-capable lights to the `romance` color mode.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The ScreenLogic gateway to set the color mode on.
  required: true
  type: string
color_mode:
  description: >
    The color mode to set. See the list of color modes below.
  required: true
  type: string
{% endoptions_yaml %}

## Color modes

The `color_mode` value accepts one of the following:

- `all_off`: Turns all light circuits off.
- `all_on`: Turns all light circuits on to their last mode.
- `color_set`: Sets light circuits to their preset colors as configured in the pool controller.
- `color_sync`: Synchronizes all IntelliBrite, SAm, SAL, or FIBERworks color-changing lights and matches their colors.
- `color_swim`: Cycles through white, magenta, blue, and green colors (emulates a Pentair SAm color-changing light).
- `party`: Rapid color changing that builds energy and excitement.
- `romance`: Slow color transitions for a calming effect.
- `caribbean`: Transitions between a variety of blues and greens.
- `american`: Patriotic red, white, and blue transitions.
- `sunset`: Dramatic transitions of orange, red, and magenta tones.
- `royal`: Richer, deeper color tones.
- `save`: Saves the exact colors currently being displayed.
- `recall`: Recalls the saved colors.
- `blue`: Fixed color blue.
- `green`: Fixed color green.
- `red`: Fixed color red.
- `white`: Fixed color white.
- `magenta`: Fixed color magenta.
- `thumper`: Toggles the solenoid thumper on MagicStream laminars.
- `next_mode`: Cycles to the next color mode.
- `reset`: Resets the light modes.
- `hold`: Holds the light transitions.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to a calm color in the evening

When the evening starts, set the pool lights to a slow, calming color show.

- **Trigger**: Sun, after sunset
- **Action**: Pentair ScreenLogic: Set color mode

{% details "YAML example for an evening color mode" %}

{% example %}
automation: |
  alias: "Evening pool lights"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: screenlogic.set_color_mode
      data:
        config_entry: YOUR_CONFIG_ENTRY_ID
        color_mode: romance
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
