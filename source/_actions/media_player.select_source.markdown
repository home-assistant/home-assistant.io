---
title: "Select media player source"
action: media_player.select_source
domain: media_player
description: "Changes the input source of a media player."
related_actions:
  - media_player.select_sound_mode
  - media_player.turn_on
  - media_player.play_media
---

Use this action to change the input source of a media player, for example to switch a receiver to a different input.

{% include actions/ui_header.md %}

To select a source from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Select media player source**.
7. Set the **Source** you want to switch to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Source:
  description: The name of the source to switch to. The available sources depend on the media player.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.select_source`. A basic example looks like this:

{% example %}
action: |
  action: media_player.select_source
  target:
    entity_id: media_player.living_room
  data:
    source: "HDMI 1"
{% endexample %}

This switches `media_player.living_room` to the HDMI 1 source.

### Options in YAML

{% options_yaml %}
source:
  description: The name of the source to switch to. The available sources depend on the media player.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The available sources depend on the media player.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch the receiver to the TV input when the TV turns on

Select a source when a trigger fires, for example to switch a receiver to the TV input.

- **Trigger**: TV turns on
- **Action**: Select media player source
  - **Target**: Living room receiver
  - **Source**: TV

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch the receiver to the TV input when the TV turns on"
    triggers:
      - trigger: state
        entity_id: media_player.living_room_tv
        to: "on"
    actions:
      - action: media_player.select_source
        target:
          entity_id: media_player.living_room_receiver
        data:
          source: "TV"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
