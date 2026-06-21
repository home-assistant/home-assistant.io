---
title: "Play media"
action: music_assistant.play_media
domain: music_assistant
description: "Plays media on a Music Assistant player with fine-grained control options."
related_actions:
  - music_assistant.play_announcement
  - music_assistant.transfer_queue
---

Use this action to play media on a Music Assistant player. It gives you more control than the standard [Play media](/integrations/media_player/#action-play-media) action: you can queue multiple items at once, point at a specific track or album, and turn on radio mode to fill the queue with similar tracks.

{% include actions/ui_header.md %}

To play media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player you want to play media on.
6. From the actions shown for that target, select **Play media**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media ID(s):
  description: The URI or name of the item you want to play. Specify a list to play or enqueue multiple items.
Media type:
  description: "The type of content to play, such as artist, album, track, or playlist. Determined automatically when omitted."
Artist name:
  description: When specifying a track or album by name in the Media ID field, you can optionally restrict results by this artist name.
Album name:
  description: When specifying a track by name in the Media ID field, you can optionally restrict results by this album name.
Enqueue:
  description: Whether the content should be played now or added to the queue.
Enable radio mode:
  description: Turns on radio mode to auto-generate a playlist based on the selection.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.play_media`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.play_media
  target:
    entity_id: media_player.kitchen_speaker
  data:
    media_id: spotify://playlist/aabbccddeeff
{% endexample %}

### Options in YAML

{% options_yaml %}
media_id:
  description: The URI or name of the item you want to play. Specify a list to play or enqueue multiple items.
  required: true
  type: [string, list]
media_type:
  description: "The type of content to play. One of: `artist`, `album`, `audiobook`, `folder`, `playlist`, `podcast`, `track`, or `radio`. Determined automatically when omitted."
  required: false
  type: string
artist:
  description: When specifying a track or album by name in the `media_id` field, you can optionally restrict results by this artist name.
  required: false
  type: string
album:
  description: When specifying a track by name in the `media_id` field, you can optionally restrict results by this album name.
  required: false
  type: string
enqueue:
  description: "Whether the content should be played now or added to the queue. One of: `play`, `replace`, `next`, `replace_next`, or `add`."
  required: false
  type: string
radio_mode:
  description: Turns on radio mode to auto-generate a playlist based on the selection.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The `media_id` can be a track, artist, or album name (for example, `Queen`), a name combined with an artist (for example, `Queen - Innuendo`), a streaming provider URI (for example, `spotify://artist/12345`), or a streaming provider URL.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
