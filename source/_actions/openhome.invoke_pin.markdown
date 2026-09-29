---
title: "Play pin"
action: openhome.invoke_pin
domain: openhome
description: "Starts playing content pinned on a Linn or OpenHome device."
---

Use this action to start playing a pin on a Linn or OpenHome device. Pins are the presets you've saved on the device, such as a radio station or a playlist, so this is a quick way to start your favorite content from an automation or a script.

{% include actions/ui_header.md %}

To play a pin from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the device you want to play the pin on.
6. From the actions shown for that target, select **Play pin**.
7. Set the **Pin ID** of the content you want to play.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Pin ID:
  description: The ID of the pinned content to play.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `openhome.invoke_pin`. A basic example looks like this:

{% example %}
action: |
  action: openhome.invoke_pin
  target:
    entity_id: media_player.linn_bedroom
  data:
    pin: 1
{% endexample %}

This starts playing pin 1 on the bedroom Linn device.

### Options in YAML

{% options_yaml %}
pin:
  description: >
    The ID of the pinned content to play, between 0 and 1000.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Pins are the presets stored on the device itself. Set them up in the Linn or OpenHome app, then refer to them here by their ID.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: play a morning radio pin on a button press

When you press a physical button, start your favorite radio pin on the kitchen device to ease into the morning.

- **Trigger**: Button pressed
- **Action**: Linn / OpenHome: Play pin on the kitchen device

{% details "YAML example for a morning radio pin" %}

{% example %}
automation: |
  alias: "Play morning radio pin"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_button
      to: "on"
  actions:
    - action: openhome.invoke_pin
      target:
        entity_id: media_player.linn_kitchen
      data:
        pin: 1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
