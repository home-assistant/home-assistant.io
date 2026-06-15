---
title: "Transfer queue"
action: music_assistant.transfer_queue
domain: music_assistant
description: "Transfers a player's queue to another Music Assistant player."
related_actions:
  - music_assistant.play_media
  - music_assistant.get_queue
---

Use this action to move a player's queue to another Music Assistant player. Combined with presence sensors, this lets your music follow you around the house.

The target player you select is where the queue moves to. The **Source media player** option sets where the queue comes from. When you omit it, the first playing player is used.

{% include actions/ui_header.md %}

To transfer a queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player you want to transfer the queue to.
6. From the actions shown for that target, select **Transfer queue**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Source media player:
  description: The source media player that has the queue you want to transfer. When omitted, the first playing player is used.
Autoplay:
  description: Starts playing the queue on the target player. Omit to use the default behavior.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.transfer_queue`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.transfer_queue
  target:
    entity_id: media_player.kitchen_speaker
  data:
    source_player: media_player.living_room_speaker
{% endexample %}

This transfers the queue from the living room speaker to the kitchen speaker.

### Options in YAML

{% options_yaml %}
source_player:
  description: The source media player that has the queue you want to transfer. When omitted, the first playing player is used.
  required: false
  type: string
auto_play:
  description: Starts playing the queue on the target player. Omit to use the default behavior.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
