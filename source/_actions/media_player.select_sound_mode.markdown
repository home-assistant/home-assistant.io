---
title: "Select media player sound mode"
action: media_player.select_sound_mode
domain: media_player
description: "Selects a sound mode of a media player."
related_actions:
  - media_player.select_source
  - media_player.volume_set
---

Use this action to select a sound mode of a media player, for example to switch a receiver to a movie or music preset.

{% include actions/ui_header.md %}

To select a sound mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Select media player sound mode**.
7. Set the **Sound mode** you want to switch to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sound mode:
  description: The name of the sound mode to switch to. The available modes depend on the media player.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.select_sound_mode`. A basic example looks like this:

{% example %}
action: |
  action: media_player.select_sound_mode
  target:
    entity_id: media_player.living_room
  data:
    sound_mode: "Movie"
{% endexample %}

This switches `media_player.living_room` to the Movie sound mode.

### Options in YAML

{% options_yaml %}
sound_mode:
  description: The name of the sound mode to switch to. The available modes depend on the media player.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The available sound modes depend on the media player.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to a movie sound mode when a film starts

Select a sound mode when a trigger fires, for example to switch a receiver to a movie preset.

- **Trigger**: TV starts playing
- **Action**: Select media player sound mode
  - **Target**: Living room receiver
  - **Sound mode**: Movie

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch to a movie sound mode when a film starts"
    triggers:
      - trigger: state
        entity_id: media_player.living_room_tv
        to: playing
    actions:
      - action: media_player.select_sound_mode
        target:
          entity_id: media_player.living_room_receiver
        data:
          sound_mode: "Movie"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
