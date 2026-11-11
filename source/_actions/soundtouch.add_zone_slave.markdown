---
title: "Add zone follower"
action: soundtouch.add_zone_slave
domain: soundtouch
description: "Adds media players to an existing Bose SoundTouch zone."
related_actions:
  - soundtouch.create_zone
  - soundtouch.remove_zone_slave
  - soundtouch.play_everywhere
---

Use this action to add one or more follower devices to an existing multi-room zone.

{% include actions/ui_header.md %}

To add a follower from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bose SoundTouch: Add zone follower**.
6. Select the **Leader**: the media player that coordinates the existing zone.
7. Select one or more **Follower** media players to add to the zone.
8. Select **Save**.

This action does not support targets. In the UI, you choose the devices in the **Leader** and **Follower** fields.

### Options in the UI

{% options_ui %}
Leader:
  description: The media player that coordinates the existing zone.
  required: true
Follower:
  description: The media players to add to the existing zone.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `soundtouch.add_zone_slave`. A basic example looks like this:

{% example %}
action: |
  action: soundtouch.add_zone_slave
  data:
    master: media_player.living_room
    slaves:
      - media_player.office
{% endexample %}

This adds the office device to the zone led by the living room device.

### Options in YAML

{% options_yaml %}
master:
  description: >
    The media player that coordinates the existing zone.
  required: true
  type: string
slaves:
  description: >
    The media players to add to the existing zone.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
