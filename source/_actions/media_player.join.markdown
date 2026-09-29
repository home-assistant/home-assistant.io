---
title: "Join media players"
action: media_player.join
domain: media_player
description: "Groups media players together for synchronous playback."
related_actions:
  - media_player.unjoin
---

Use this action to group media players together for synchronous playback. This only works on supported multiroom audio systems.

{% include actions/ui_header.md %}

To join media players from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player that plays the audio the others should follow.
6. From the actions shown for that target, select **Join media players**.
7. Set the **Group members** that should play in sync with the target.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Group members:
  description: The media players that should play in sync with the target media player.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.join`. The target plays the audio, and the group members follow it:

{% example %}
action: |
  action: media_player.join
  target:
    entity_id: media_player.living_room
  data:
    group_members:
      - media_player.kitchen
      - media_player.bedroom
{% endexample %}

This syncs the kitchen and bedroom speakers with the living room speaker.

### Options in YAML

{% options_yaml %}
group_members:
  description: The media players that should play in sync with the target media player.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works on multiroom audio systems that support player groups. To remove a player from a group, use [Unjoin media player](/actions/media_player.unjoin/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: group the speakers for a party

Sync several speakers when a trigger fires, for example to play the same music throughout the house.

- **Trigger**: Party scene activated
- **Action**: Join media players
  - **Target**: Living room speaker
  - **Group members**: Kitchen speaker, Bedroom speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Group the speakers for a party"
    triggers:
      - trigger: state
        entity_id: input_boolean.party_mode
        to: "on"
    actions:
      - action: media_player.join
        target:
          entity_id: media_player.living_room
        data:
          group_members:
            - media_player.kitchen
            - media_player.bedroom
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
