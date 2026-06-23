---
title: "Play everywhere"
action: soundtouch.play_everywhere
domain: soundtouch
description: "Plays the same content on all Bose SoundTouch devices."
related_actions:
  - soundtouch.create_zone
  - soundtouch.add_zone_slave
  - soundtouch.remove_zone_slave
---

Use this action to play the same content on all your Bose SoundTouch devices at once. It is a shortcut for creating a multi-room zone that includes every device, using the device you pick as the leader.

{% include actions/ui_header.md %}

To play everywhere from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Bose SoundTouch: Play everywhere**.
6. Select the **Leader**: the media player that coordinates the grouping and provides the content.
7. Select **Save**.

This action does not support targets. In the UI, you choose the device in the **Leader** field.

### Options in the UI

{% options_ui %}
Leader:
  description: The media player that coordinates the grouping. Its content plays on all devices.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `soundtouch.play_everywhere`. A basic example looks like this:

{% example %}
action: |
  action: soundtouch.play_everywhere
  data:
    master: media_player.living_room
{% endexample %}

This plays the content from the living room device on all your SoundTouch devices.

### Options in YAML

{% options_yaml %}
master:
  description: >
    The media player that coordinates the grouping. Its content plays on all
    devices.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
