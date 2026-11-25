---
title: "Play queue item"
action: music_assistant.play_queue_item
domain: music_assistant
description: "Plays an item from the active queue of a Music Assistant player."
related_actions:
  - music_assistant.get_queue
  - music_assistant.transfer_queue
---

Use this action to jump to an item in the active queue of a Music Assistant player, for example from a dashboard that lists the queue. Playback continues with the items that follow it.

{% include actions/ui_header.md %}

To use this action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player whose queue you want to play from.
6. From the actions shown for that target, under **Music Assistant**, select **Play queue item**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Queue item ID:
  description: The ID of the queue item. You can get it from the `queue_items` returned by the [Get queue details](/actions/music_assistant.get_queue/) action when you set its **Limit**.
Username:
  description: Run the action as this Music Assistant user. When omitted, the action runs as the Home Assistant user who started it, if that user is linked to a Music Assistant user. If there is no linked user, the action runs as the default account.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.play_queue_item`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.play_queue_item
  target:
    entity_id: media_player.kitchen_speaker
  data:
    queue_item_id: "5d95dc5be77e4f7eb4939f62cfef527b"
{% endexample %}

This plays the given item of the kitchen speaker's queue.

### Options in YAML

{% options_yaml %}
queue_item_id:
  description: The ID of the queue item. You can get it from the `queue_items` returned by the [Get queue details](/actions/music_assistant.get_queue/) action when you set its **Limit**.
  required: true
  type: string
username:
  description: Run the action as this Music Assistant user. When omitted, the action runs as the Home Assistant user who started it, if that user is linked to a Music Assistant user. If there is no linked user, the action runs as the default account.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Running the action as a specific Music Assistant user requires Music Assistant server version 2.11 or later.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: start the queue over from the first item

Jump back to the first item of the queue, for example to restart an album or a playlist from a dashboard button.

- **Action**: Get playerQueue details
  - **Target**: Kitchen speaker
  - **Limit**: 1
  - **Response variable**: `queue_info`
- **Action**: Play queue item
  - **Target**: Kitchen speaker
  - **Queue item ID**: `{{ queue_info['media_player.kitchen_speaker'].queue_items[0].queue_item_id }}`

{% details "YAML example for starting the queue over" %}

{% example %}
script: |
  alias: "Start the kitchen queue over"
  sequence:
    - action: music_assistant.get_queue
      target:
        entity_id: media_player.kitchen_speaker
      data:
        limit: 1
      response_variable: queue_info
    - action: music_assistant.play_queue_item
      target:
        entity_id: media_player.kitchen_speaker
      data:
        queue_item_id: >
          {{ queue_info['media_player.kitchen_speaker']
             .queue_items[0].queue_item_id }}
{% endexample %}

{% enddetails %}

### Automation: play a track from the queue by voice

Ask your voice assistant to play a track that is already in the queue, without skipping through the items before it.

- **Trigger**: Sentence
  - **Sentence**: `play {track} from the queue`
- **Action**: Get playerQueue details
  - **Target**: Kitchen speaker
  - **Limit**: 100
  - **Response variable**: `queue_info`
- **Action**: Play queue item
  - **Target**: Kitchen speaker
  - **Queue item ID**: the ID of the first queue item whose name contains the spoken track

{% details "YAML example for playing a track from the queue by voice" %}

{% example %}
automation: |
  alias: "Play a track from the kitchen queue by voice"
  triggers:
    - trigger: conversation
      command: "play {track} from the queue"
  actions:
    - action: music_assistant.get_queue
      target:
        entity_id: media_player.kitchen_speaker
      data:
        limit: 100
      response_variable: queue_info
    - action: music_assistant.play_queue_item
      target:
        entity_id: media_player.kitchen_speaker
      data:
        queue_item_id: >
          {{ (queue_info['media_player.kitchen_speaker'].queue_items
              | selectattr('name', 'search', trigger.slots.track,
                           ignorecase=True)
              | first).queue_item_id }}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
