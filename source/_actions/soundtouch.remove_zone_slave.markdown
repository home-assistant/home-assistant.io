---
title: "Remove zone follower"
action: soundtouch.remove_zone_slave
domain: soundtouch
description: "Removes media players from an existing Bose SoundTouch zone."
related_actions:
  - soundtouch.create_zone
  - soundtouch.add_zone_slave
  - soundtouch.play_everywhere
---

Use this action to remove one or more follower devices from an existing multi-room zone. Removing the last follower destroys the zone, and you need to create a new one to group devices again.

{% include actions/ui_header.md %}

To remove a follower from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bose SoundTouch: Remove zone follower**.
6. Select the **Leader**: the media player that coordinates the existing zone.
7. Select one or more **Follower** media players to remove from the zone.
8. Select **Save**.

This action does not support targets. In the UI, you choose the devices in the **Leader** and **Follower** fields.

### Options in the UI

{% options_ui %}
Leader:
  description: The media player that coordinates the existing zone.
  required: true
Follower:
  description: The media players to remove from the existing zone.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `soundtouch.remove_zone_slave`. A basic example looks like this:

{% example %}
action: |
  action: soundtouch.remove_zone_slave
  data:
    master: media_player.living_room
    slaves:
      - media_player.office
{% endexample %}

This removes the office device from the zone led by the living room device.

### Options in YAML

{% options_yaml %}
master:
  description: >
    The media player that coordinates the existing zone.
  required: true
  type: string
slaves:
  description: >
    The media players to remove from the existing zone.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
