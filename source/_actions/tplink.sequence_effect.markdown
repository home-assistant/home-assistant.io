---
title: Sequence effect
action: tplink.sequence_effect
domain: tplink
description: "Sets a sequence light effect on a TP-Link light strip."
related_actions:
  - tplink.random_effect
---

The **Sequence effect** action plays a repeating sequence of colors on a TP-Link light strip. Unlike the random effect, you define the exact colors and the order they appear in, and the light steps through them in sequence.

This effect is available on devices that support light effects, such as bulbs and light strips, except for [Kasa bulbs](/integrations/tplink/#no-light-effects-on-kasa-bulbs). Colors are expressed as HSV sequences, where each value is hue, saturation, and brightness.

{% include actions/ui_header.md %}

To play a sequence effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the light strip you want to control.
6. From the actions shown for that target, select **Sequence effect**.
7. Set the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sequence:
  description: The list of HSV sequences to step through, in order. Up to 16 entries.
  required: true
Segments:
  description: The list of segments to apply the effect to. Use `0` for all segments.
  required: false
Brightness:
  description: The initial brightness, from 1 to 100%.
  required: false
Duration:
  description: How long the effect runs, in milliseconds. Use `0` to run continuously.
  required: false
Repetitions:
  description: How many times to repeat the sequence. Use `0` for continuous.
  required: false
Transition:
  description: The transition time between colors, in milliseconds.
  required: false
Spread:
  description: The speed at which the effect spreads across the segments.
  required: false
Direction:
  description: The direction the effect moves in, from 1 to 4.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tplink.sequence_effect`. A basic example looks like this:

{% example %}
action: |
  action: tplink.sequence_effect
  target:
    entity_id: light.strip
  data:
    sequence:
      - [340, 20, 50]
      - [20, 50, 50]
      - [0, 100, 50]
    segments: [0, 2, 4, 6, 8]
    brightness: 80
    transition: 2000
    spread: 1
    direction: 1
{% endexample %}

This plays the defined color sequence on `light.strip`.

### Options in YAML

{% options_yaml %}
sequence:
  description: >
    The list of HSV sequences to step through, in order. Up to 16 entries.
  required: true
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
repeat_times:
  description: >
    How many times to repeat the sequence, from 0 to 10. Use `0` for continuous.
  required: false
  default: 0
  type: integer
transition:
  description: >
    The transition time between colors, in milliseconds, from 0 to 6000.
  required: false
  default: 0
  type: integer
spread:
  description: >
    The speed at which the effect spreads across the segments, from 0 to 16.
  required: false
  default: 0
  type: integer
direction:
  description: >
    The direction the effect moves in, from 1 to 4.
  required: false
  default: 4
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
