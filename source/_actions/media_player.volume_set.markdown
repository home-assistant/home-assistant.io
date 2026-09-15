---
title: "Set media player volume"
action: media_player.volume_set
domain: media_player
description: "Sets the volume level of a media player."
related_actions:
  - media_player.volume_up
  - media_player.volume_down
  - media_player.volume_mute
---

Use this action to set a media player to a specific volume level.

{% include actions/ui_header.md %}

To set the volume from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Set media player volume**.
7. Set the **Level** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Level:
  description: The volume level, from 0 (inaudible) to 1 (maximum).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.volume_set`. A basic example looks like this:

{% example %}
action: |
  action: media_player.volume_set
  target:
    entity_id: media_player.living_room
  data:
    volume_level: 0.5
{% endexample %}

This sets `media_player.living_room` to half volume.

### Options in YAML

{% options_yaml %}
volume_level:
  description: The volume level, from 0 (inaudible) to 1 (maximum).
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The volume level is a value between 0 and 1, where 0 is inaudible and 1 is the maximum volume.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a comfortable volume in the morning

Set a media player to a fixed volume at a set time, for example to ease into the day.

- **Trigger**: Time: 07:00
- **Action**: Set media player volume
  - **Target**: Kitchen speaker
  - **Level**: 0.3

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Set a comfortable volume in the morning"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: media_player.volume_set
        target:
          entity_id: media_player.kitchen
        data:
          volume_level: 0.3
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
