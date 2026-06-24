---
title: "Set custom effect"
action: flux_led.set_custom_effect
domain: flux_led
description: "Sets a custom light effect on a Magic Home light."
related_actions:
  - flux_led.set_zones
  - flux_led.set_music_mode
---

The **Set custom effect** action plays a custom effect on a Magic Home light by cycling through a list of colors you provide. You control the colors, the effect speed, and how the light transitions from one color to the next.

This lets you build your own effects beyond the built-in ones, for example a slow fade through your favorite colors or a fast strobe for a party.

{% include actions/ui_header.md %}

To set a custom effect from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Magic Home: Set custom effect**.
6. Under **Targets**, choose the lights to apply the effect to.
7. Enter the **Colors**, and optionally a **Speed** and **Transition**.
8. Select **Save**.

{% include actions/targets.md domain="light" %}

### Options in the UI

{% options_ui %}
Colors:
  description: A list of up to 16 RGB colors to transition between in the effect.
  required: true
Speed:
  description: The speed of the effect, from 1 to 100 percent.
  required: false
Transition:
  description: "How the light transitions between colors: gradual, jump, or strobe."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `flux_led.set_custom_effect`. A basic example looks like this:

{% example %}
action: |
  action: flux_led.set_custom_effect
  target:
    entity_id: light.led_strip
  data:
    colors:
      - [255, 0, 0]
      - [0, 255, 0]
      - [0, 0, 255]
    speed_pct: 80
    transition: "jump"
{% endexample %}

### Options in YAML

{% options_yaml %}
colors:
  description: >
    A list of up to 16 RGB colors to transition between in the effect.
  required: true
  type: list
speed_pct:
  description: >
    The speed of the effect, from 1 to 100 percent.
  required: false
  type: integer
transition:
  description: >
    How the light transitions between colors: gradual, jump, or strobe.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: slow green-to-white breathing effect when all lights should dim for energy saving

At 22:00, shift the LED strip to a slow two-color gradual effect cycling between a dim green and warm white, replacing a static full-brightness white that consumes more power. The low speed and limited color palette keep the effect gentle.

- **Trigger**: Time: 22:00
- **Action**: Magic Home: Set custom effect

{% details "YAML example for slow and gradual effect of light cycling" %}

{% example %}
automation: |
  alias: "Switch LED strip to low-energy evening effect"
  triggers:
  - trigger: time
    at: "22:00:00"
  actions:
  - action: flux_led.set_custom_effect
    target:
      entity_id: light.led_strip
    data:
      colors:
        - [0, 60, 20]
        - [80, 80, 60]
      speed_pct: 20
      transition: gradual
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
