---
title: "Restore a saved Monoprice zone snapshot"
action: monoprice.restore
domain: monoprice
description: "Restores one or more Monoprice amplifier zones to a previously saved state."
related_actions:
  - monoprice.snapshot
---
Use this action to return one or more zones on your Monoprice 6-Zone Amplifier to a state you saved earlier with the [Snapshot](/actions/monoprice.snapshot/) action. It is most useful after playing a doorbell or notification sound, so each zone goes back to whatever it was doing before.

Restoring brings back the power status, mute status, volume level, and selected source for each targeted zone.

{% include actions/ui_header.md %}

To restore a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zones you want to restore.
6. From the actions shown for that target, select **Monoprice 6-Zone Amplifier: Restore**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `monoprice.restore`. A basic example looks like this:

{% example %}
action: |
  action: monoprice.restore
  target:
    entity_id: media_player.living_room
{% endexample %}

This restores `media_player.living_room` to its saved state.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="media_player" %}

- This action only works on zones that have a snapshot saved with the [Snapshot](/actions/monoprice.snapshot/) action.
- Restoring brings back the power status, mute status, volume level, and source for each targeted zone.
- Editing the sources from the integration options removes any snapshot you saved, so there is nothing left to restore.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: play a doorbell sound and resume playback

Save the state of a zone, play a notification sound, and then restore the zone afterward.

- **Trigger**: State: Doorbell button is pressed
- **Action**: Monoprice 6-Zone Amplifier: Snapshot
  - **Target**: Living room
- **Action**: Play the doorbell sound
- **Action**: Monoprice 6-Zone Amplifier: Restore
  - **Target**: Living room

{% details "YAML example for doorbell announcement on the living room speakers" %}

{% example %}
automation: |
    alias: "Doorbell announcement on the living room speakers"
    triggers:
      - trigger: state
        entity_id: binary_sensor.doorbell
        to: "on"
    actions:
      - action: monoprice.snapshot
        target:
          entity_id: media_player.living_room
      - action: media_player.play_media
        target:
          entity_id: media_player.living_room
        data:
          media_content_id: "/local/doorbell.mp3"
          media_content_type: music
      - delay: "00:00:10"
      - action: monoprice.restore
        target:
          entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
