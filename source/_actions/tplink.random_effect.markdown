---
title: Random effect
action: tplink.random_effect
domain: tplink
description: "Sets a random light effect on a TP-Link light strip."
related_actions:
  - tplink.sequence_effect
---

The **Random effect** action plays a generated, ever-changing color effect on a TP-Link light strip. You set the colors, ranges, and timing, and the light keeps cycling through random combinations within those bounds.

This effect is available on devices that support light effects, such as bulbs and light strips, except for [Kasa bulbs](/integrations/tplink/#no-light-effects-on-kasa-bulbs). Colors are expressed as HSV sequences, where each value is hue, saturation, and brightness.

{% include actions/ui_header.md %}

To play a random effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the light strip you want to control.
6. From the actions shown for that target, select **Random effect**.
7. Set the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Initial states:
  description: The initial HSV sequence to start the effect from.
  required: true
Backgrounds:
  description: A list of HSV sequences to use as background colors. Up to 16 entries.
  required: false
Segments:
  description: The list of segments to apply the effect to. Use `0` for all segments.
  required: false
Brightness:
  description: The initial brightness, from 1 to 100%.
  required: false
Duration:
  description: How long the effect runs, in milliseconds. Use `0` to run continuously.
  required: false
Transition:
  description: The transition time between colors, in milliseconds.
  required: false
Fade off:
  description: The fade-off time when the effect ends, in milliseconds.
  required: false
Hue range:
  description: The range of hue values the effect can pick from.
  required: false
Saturation range:
  description: The range of saturation values the effect can pick from.
  required: false
Brightness range:
  description: The range of brightness values the effect can pick from.
  required: false
Transition range:
  description: The range of transition times the effect can pick from, in milliseconds.
  required: false
Random seed:
  description: The seed used to generate the random effect.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tplink.random_effect`. A basic example looks like this:

{% example %}
action: |
  action: tplink.random_effect
  target:
    entity_id: light.strip
  data:
    init_states: [199, 99, 96]
    backgrounds:
      - [199, 89, 50]
      - [160, 50, 50]
      - [180, 100, 50]
    segments: [0, 2, 4, 6, 8]
    brightness: 90
    transition: 2000
    fadeoff: 2000
    hue_range: [340, 360]
    saturation_range: [40, 95]
    brightness_range: [90, 100]
    transition_range: [2000, 6000]
    random_seed: 80
{% endexample %}

This plays a random effect on `light.strip` within the given color and timing ranges.

### Options in YAML

{% options_yaml %}
init_states:
  description: >
    The initial HSV sequence to start the effect from.
  required: true
  type: list
backgrounds:
  description: >
    A list of HSV sequences to use as background colors. Up to 16 entries.
  required: false
  type: list
segments:
  description: >
    The list of segments to apply the effect to. Use `0` for all segments.
  required: false
  default: 0
  type: list
brightness:
  description: >
    The initial brightness, from 1 to 100%.
  required: false
  default: 100
  type: integer
duration:
  description: >
    How long the effect runs, in milliseconds, from 0 to 5000. Use `0` to run
    continuously.
  required: false
  default: 0
  type: integer
transition:
  description: >
    The transition time between colors, in milliseconds, from 0 to 6000.
  required: false
  default: 0
  type: integer
fadeoff:
  description: >
    The fade-off time when the effect ends, in milliseconds, from 0 to 3000.
  required: false
  default: 0
  type: integer
hue_range:
  description: >
    The range of hue values the effect can pick from.
  required: false
  type: list
saturation_range:
  description: >
    The range of saturation values the effect can pick from.
  required: false
  type: list
brightness_range:
  description: >
    The range of brightness values the effect can pick from.
  required: false
  type: list
transition_range:
  description: >
    The range of transition times the effect can pick from, in milliseconds.
  required: false
  type: list
random_seed:
  description: >
    The seed used to generate the random effect, from 1 to 600.
  required: false
  default: 100
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- Light effects are only available on supported devices, such as bulbs and light strips. Kasa bulbs do not support them.
- Colors use HSV sequences, where each value is hue, saturation, and brightness.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
