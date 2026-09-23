---
title: "Snapshot the current state of a Monoprice zone"
action: monoprice.snapshot
domain: monoprice
description: "Saves the current state of one or more Monoprice amplifier zones so you can restore it later."
related_actions:
  - monoprice.restore
---

A snapshot stores the power status, mute status, volume level, and selected source for each targeted zone. Take a snapshot first, change the zones however you like, and then use the [Restore](/actions/monoprice.restore/) action to bring everything back.

{% include actions/ui_header.md %}

To take a snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zones you want to snapshot.
6. From the actions shown for that target, select **Monoprice 6-Zone Amplifier: Snapshot**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `monoprice.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: monoprice.snapshot
  target:
    entity_id: media_player.living_room
{% endexample %}

This saves the current state of `media_player.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="media_player" %}

## Good to know

- A snapshot stores the power status, mute status, volume level, and source for each targeted zone.
- Only the most recent snapshot is kept per zone. Taking a new snapshot replaces the previous one.
- Editing the sources from the integration options removes any snapshot you saved.

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
