---
title: "Create zone"
action: soundtouch.create_zone
domain: soundtouch
description: "Creates a Bose SoundTouch multi-room zone."
related_actions:
  - soundtouch.play_everywhere
  - soundtouch.add_zone_slave
  - soundtouch.remove_zone_slave
---

Use this action to create a multi-room zone from a leader device and one or more follower devices. The followers play the same content as the leader.

{% include actions/ui_header.md %}

To create a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bose SoundTouch: Create zone**.
6. Select the **Leader**: the media player that coordinates the zone.
7. Select one or more **Follower** media players to add to the zone.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Leader:
  description: The media player that coordinates the new zone.
  required: true
Follower:
  description: The media players to add to the new zone.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `soundtouch.create_zone`. A basic example looks like this:

{% example %}
action: |
  action: soundtouch.create_zone
  data:
    master: media_player.living_room
    slaves:
      - media_player.kitchen
      - media_player.bedroom
{% endexample %}

This creates a zone led by the living room device, with the kitchen and bedroom devices as followers.

### Options in YAML

{% options_yaml %}
master:
  description: >
    The media player that coordinates the new zone.
  required: true
  type: string
slaves:
  description: >
    The media players to add to the new zone.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
