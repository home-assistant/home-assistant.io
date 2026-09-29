---
title: "Mute/unmute media player"
action: media_player.volume_mute
domain: media_player
description: "Mutes or unmutes a media player."
related_actions:
  - media_player.volume_set
  - media_player.volume_up
  - media_player.volume_down
---

Use this action to mute or unmute a media player.

{% include actions/ui_header.md %}

To mute or unmute a media player from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Mute/unmute media player**.
7. Turn **Muted** on to mute, or off to unmute.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Muted:
  description: Turn on to mute the media player, or off to unmute it.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.volume_mute`. A basic example looks like this:

{% example %}
action: |
  action: media_player.volume_mute
  target:
    entity_id: media_player.living_room
  data:
    is_volume_muted: true
{% endexample %}

This mutes `media_player.living_room`.

### Options in YAML

{% options_yaml %}
is_volume_muted:
  description: Set to true to mute the media player, or false to unmute it.
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support muting.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: mute the TV when the phone rings

Mute a media player when something needs your attention, for example an incoming call.

- **Trigger**: Phone is ringing
- **Action**: Mute/unmute media player
  - **Target**: Living room TV
  - **Muted**: on

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Mute the TV when the phone rings"
    triggers:
      - trigger: state
        entity_id: binary_sensor.phone_ringing
        to: "on"
    actions:
      - action: media_player.volume_mute
        target:
          entity_id: media_player.living_room
        data:
          is_volume_muted: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
