---
title: "Turn up media player volume"
action: media_player.volume_up
domain: media_player
description: "Turns up the volume of a media player."
related_actions:
  - media_player.volume_down
  - media_player.volume_set
  - media_player.volume_mute
---

Use this action to turn up the volume of a media player by one step.

{% include actions/ui_header.md %}

To turn up the volume from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Turn up media player volume**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.volume_up`. A basic example looks like this:

{% example %}
action: |
  action: media_player.volume_up
  target:
    entity_id: media_player.living_room
{% endexample %}

This turns up the volume of `media_player.living_room` by one step.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Each call raises the volume by one step. To set a specific level instead, use [Set media player volume](/actions/media_player.volume_set/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn up the volume with a button

Raise the volume each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Turn up media player volume
  - **Target**: Living room speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn up the volume with a button"
    triggers:
      - trigger: state
        entity_id: input_button.volume_up
    actions:
      - action: media_player.volume_up
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
