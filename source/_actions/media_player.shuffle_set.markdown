---
title: "Set media player shuffle"
action: media_player.shuffle_set
domain: media_player
description: "Enables or disables shuffle mode on a media player."
related_actions:
  - media_player.repeat_set
  - media_player.media_next_track
  - media_player.media_previous_track
---

Use this action to turn shuffle mode on or off for a media player.

{% include actions/ui_header.md %}

To set shuffle mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Set media player shuffle**.
7. Turn **Shuffle mode** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Shuffle mode:
  description: Turn on to play media in randomized order, or off to play it in order.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.shuffle_set`. A basic example looks like this:

{% example %}
action: |
  action: media_player.shuffle_set
  target:
    entity_id: media_player.living_room
  data:
    shuffle: true
{% endexample %}

This turns on shuffle mode on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
shuffle:
  description: Set to true to play media in randomized order, or false to play it in order.
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support shuffle mode.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: shuffle the music for a party

Turn on shuffle mode when a trigger fires, for example when you start a party scene.

- **Trigger**: Party scene activated
- **Action**: Set media player shuffle
  - **Target**: Living room speaker
  - **Shuffle mode**: on

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Shuffle the music for a party"
    triggers:
      - trigger: state
        entity_id: input_boolean.party_mode
        to: "on"
    actions:
      - action: media_player.shuffle_set
        target:
          entity_id: media_player.living_room
        data:
          shuffle: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
