---
title: "Previous track"
action: media_player.media_previous_track
domain: media_player
description: "Selects the previous track on a media player."
related_actions:
  - media_player.media_next_track
  - media_player.media_play
  - media_player.shuffle_set
---

Use this action to go back to the previous track on a media player.

{% include actions/ui_header.md %}

To go to the previous track from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Previous track**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.media_previous_track`. A basic example looks like this:

{% example %}
action: |
  action: media_player.media_previous_track
  target:
    entity_id: media_player.living_room
{% endexample %}

This goes back to the previous track on `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support skipping tracks.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: go to the previous track with a button

Skip back each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Previous track
  - **Target**: Living room speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Go to the previous track with a button"
    triggers:
      - trigger: state
        entity_id: input_button.previous_track
    actions:
      - action: media_player.media_previous_track
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
