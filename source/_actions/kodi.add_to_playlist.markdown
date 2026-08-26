---
title: "Add music to the Kodi playlist"
action: kodi.add_to_playlist
domain: kodi
description: "Adds music to the default Kodi playlist."
related_actions:
  - kodi.call_method
---

Use this action to add music to the default Kodi playlist, for example to queue an album or all songs by an artist. You can add a specific entry by its ID, or let Kodi search its music library by name.

{% include actions/ui_header.md %}

To add music to the playlist from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Kodi media player.
6. From the actions shown for that target, select **Kodi: Add to playlist**.
7. Enter the **Media type** and the details of the music to add.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media type:
  description: The type of media to add. Must be `SONG` or `ALBUM`.
Media ID:
  description: The unique ID of the media entry to add (`songid` or `albumid`). If you leave it out, the media name and artist name are used to search the Kodi music library.
  required: false
Media name:
  description: The media name to filter on. Can be `ALL` when the media type is `ALBUM` and an artist name is given, to add all songs from one artist.
  required: false
Artist name:
  description: The artist name to filter on.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kodi.add_to_playlist`. A basic example looks like this:

{% example %}
action: |
  action: kodi.add_to_playlist
  target:
    entity_id: media_player.kodi
  data:
    media_type: ALBUM
    media_name: "Highway to Hell"
    artist_name: "AC/DC"
{% endexample %}

### Options in YAML

{% options_yaml %}
media_type:
  description: The type of media to add. Must be `SONG` or `ALBUM`.
  required: true
  type: string
media_id:
  description: The unique ID of the media entry to add (`songid` or `albumid`). If you leave it out, the media name and artist name are used to search the Kodi music library.
  required: false
  type: string
media_name:
  description: The media name to filter on. Can be `ALL` when the media type is `ALBUM` and an artist name is given, to add all songs from one artist.
  required: false
  type: string
artist_name:
  description: The artist name to filter on.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
