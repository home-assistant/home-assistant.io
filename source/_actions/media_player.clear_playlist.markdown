---
title: "Clear media player playlist"
action: media_player.clear_playlist
domain: media_player
description: "Removes all items from a media player's playlist."
related_actions:
  - media_player.media_stop
  - media_player.play_media
---

Use this action to remove all items from a media player's playlist or queue.

{% include actions/ui_header.md %}

To clear the playlist from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to control.
6. From the actions shown for that target, select **Clear media player playlist**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.clear_playlist`. A basic example looks like this:

{% example %}
action: |
  action: media_player.clear_playlist
  target:
    entity_id: media_player.living_room
{% endexample %}

This clears the playlist on `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with media players that support clearing the playlist.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clear the queue at the end of the night

Clear a media player's playlist at a set time, for example to start fresh the next day.

- **Trigger**: Time: 02:00
- **Action**: Clear media player playlist
  - **Target**: Living room speaker

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Clear the queue at the end of the night"
    triggers:
      - trigger: time
        at: "02:00:00"
    actions:
      - action: media_player.clear_playlist
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
