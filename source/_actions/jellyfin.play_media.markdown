---
title: "Play specified media"
action: media_player.play_media
domain: jellyfin
description: "Plays Jellyfin media on a Jellyfin client."
related_actions:
  - jellyfin.play_media_shuffle
---

Use this action to play Jellyfin media on a Jellyfin client. To play media, you need the media content ID of the item you want to play.

{% include actions/ui_header.md %}

To play Jellyfin media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a Jellyfin media player.
6. From the actions shown for that target, select **Play specified media**.
7. Enter the media content ID and media content type.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media content ID:
  description: The unique identifier of the content you want to play.
Media content type:
  description: The type of content you are playing, such as `episode`, `season`, `tvshow`, `movie`, or `music`.
Enqueue:
  description: How to add the media to the queue. Jellyfin supports `next` and `add`. If this is not set, the current play queue is replaced.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.living_room
  data:
    media_content_id: a982a31451450daeda02c89952e6d7cf
    media_content_type: movie
{% endexample %}

This plays the selected movie on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
media_content_id:
  description: The unique identifier of the content you want to play.
  required: true
  type: string
media_content_type:
  description: The type of content you are playing, such as `episode`, `season`, `tvshow`, `movie`, or `music`.
  required: true
  type: string
enqueue:
  description: How to add the media to the queue. Jellyfin supports `next` and `add`. If this is not set, the current play queue is replaced.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- To find the media content ID of the content you want to play, use the [Browse media](/actions/jellyfin.browse_media/) or [Search media](/actions/jellyfin.search_media/) action.
- Jellyfin supports the enqueue options `next` and `add` only. The options `play` and `replace` act as if `enqueue` was not set, and replace the current play queue.
- The selection of `media_content_type` is generally inconsequential to Jellyfin, and any string can be supplied here to pass validation.

{% include actions/more_examples.md %}

### Add an episode to the queue

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.living_room
  data:
    media_content_id: 5ae55567cae75c26671a0a6b027bdd5b
    media_content_type: episode
    enqueue: next
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
