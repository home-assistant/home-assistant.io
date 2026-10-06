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
Start item:
  description: "The item to start playback from, instead of the first one. Use `latest` to play a podcast from its newest episode, or enter the URI, ID, or part of the name of the track or episode to start from."
Username:
  description: Use this Music Assistant user to adjust the playlog entry. If the specified user has provider filtering configured, the media item selection will be made accordingly. For example, this has an effect on the resume point retrieval of an audiobook. When left empty, it defaults to the Home Assistant user that made the request, if their username matches a Music Assistant user. When you call this action from an automation or script, set the username explicitly so the request is attributed to the right user.
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
start_item:
  description: "The item to start playback from, instead of the first one. Use `latest` (or `newest`) to play a podcast from its newest episode, or give the URI, ID, or part of the name (at least 3 characters) of the track or episode to start from."
  required: false
  type: string
username:
  description: Use this Music Assistant user to adjust the playlog entry. If the specified user has provider filtering configured, the media item selection will be made accordingly. For example, this has an effect on the resume point retrieval of an audiobook. When left empty, it defaults to the Home Assistant user that made the request, if their username matches a Music Assistant user. When you call this action from an automation or script, set the username explicitly so the request is attributed to the right user.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The `media_id` can be a track, artist, or album name (for example, `Queen`), a name combined with an artist (for example, `Queen - Innuendo`), a streaming provider URI (for example, `spotify://artist/12345`), or a streaming provider URL.
- When you play a podcast, Music Assistant queues its episodes from the oldest one. To hear the newest episode, for example in a morning news routine, set `start_item` to `latest`:

{% example %}
action: |
  action: music_assistant.play_media
  target:
    entity_id: media_player.kitchen_speaker
  data:
    media_id: spotify://podcast/aabbccddeeff
    media_type: podcast
    start_item: latest
{% endexample %}

  Some providers, such as Spotify, refresh their episode lists less often, so the newest episode they offer can lag behind the podcast's own feed.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
