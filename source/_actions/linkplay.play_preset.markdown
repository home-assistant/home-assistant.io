---
title: "Play preset"
action: linkplay.play_preset
domain: linkplay
description: "Plays a preset stored on a LinkPlay media player."
---

Use this action to play one of the presets stored on your LinkPlay media player. Companion apps, such as 4stream, let you save music presets, like a Spotify playlist or a radio station. This action starts playing one of those presets by its number.

This is handy in automations, for example to start your favorite radio station on a speaker when your morning alarm goes off.

{% include actions/ui_header.md %}

To play a preset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a LinkPlay media player.
6. From the actions shown for that target, select **Play preset**.
7. Set the **Preset number** you want to play.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset number:
  description: The number of the preset to play.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `linkplay.play_preset`. A basic example looks like this:

{% example %}
action: |
  action: linkplay.play_preset
  target:
    entity_id: media_player.living_room_speaker
  data:
    preset_number: 1
{% endexample %}

This plays the first preset on the selected LinkPlay media player.

### Options in YAML

{% options_yaml %}
preset_number:
  description: The number of the preset to play.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Presets are stored on the device itself. Use a companion app, such as 4stream, to save presets before you can play them with this action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
