---
title: "Set music mode"
action: flux_led.set_music_mode
domain: flux_led
description: "Configures music mode on Magic Home lights with a built-in microphone."
related_actions:
  - flux_led.set_custom_effect
  - flux_led.set_zones
---

The **Set music mode** action turns on music mode on Magic Home lights that have a built-in microphone, so the light reacts to sound. It is supported on Controller RGB with MIC (0x08), Addressable v2 (0xA2), and Addressable v3 (0xA3) devices.

You can tune how sensitive the microphone is, set the brightness, and pick the foreground and background colors the effect uses.

{% include actions/ui_header.md %}

To set music mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Magic Home: Set music mode**.
6. Under **Targets**, choose the lights to apply music mode to.
7. Set the options you want to change.
8. Select **Save**.

{% include actions/targets.md domain="light" %}

### Options in the UI

{% options_ui %}
Sensitivity:
  description: Microphone sensitivity, from 1 to 100.
  required: false
Brightness:
  description: Light brightness, from 1 to 100.
  required: false
Light screen:
  description: Light screen mode for two-dimensional pixels. Addressable models only.
  required: false
Effect:
  description: The effect to use. 1 to 16 on Addressable models, 0 to 3 on RGB with MIC models.
  required: false
Foreground color:
  description: The foreground RGB color.
  required: false
Background color:
  description: The background RGB color. Addressable models only.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `flux_led.set_music_mode`. A basic example looks like this:

{% example %}
action: |
  action: flux_led.set_music_mode
  target:
    entity_id: light.addressable_v3_8e2f7f
  data:
    sensitivity: 100
    brightness: 100
    effect: 2
    foreground_color: [255, 0, 0]
    background_color: [0, 255, 0]
{% endexample %}

### Options in YAML

{% options_yaml %}
sensitivity:
  description: >
    Microphone sensitivity, from 1 to 100.
  required: false
  type: integer
brightness:
  description: >
    Light brightness, from 1 to 100.
  required: false
  type: integer
light_screen:
  description: >
    Light screen mode for two-dimensional pixels. Addressable models only.
  required: false
  type: boolean
  default: false
effect:
  description: >
    The effect to use. 1 to 16 on Addressable models, 0 to 3 on RGB with
    MIC models.
  required: false
  type: integer
foreground_color:
  description: >
    The foreground RGB color.
  required: false
  type: list
background_color:
  description: >
    The background RGB color. Addressable models only.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: activate music mode at a moderate sensitivity when a party scene is triggered

When a party scene is activated, enable music mode at moderate sensitivity and brightness rather than full power, so the lights react to music without running at maximum draw the entire evening.

- **Trigger**: Scene activated (`scene.party`)
- **Action**: Magic Home: Set music mode

{% details "YAML example for activating music mode using moderate settings" %}

{% example %}
automation: |
  alias: "Enable music mode at moderate power when party scene activates"
  triggers:
  - trigger: state
    entity_id: scene.party
  actions:
  - action: flux_led.set_music_mode
    target:
      entity_id: light.addressable_v3_living_room
    data:
      sensitivity: 60
      brightness: 50
      effect: 2
      light_screen: false
      foreground_color: [0, 100, 255]
      background_color: [0, 0, 0]
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
