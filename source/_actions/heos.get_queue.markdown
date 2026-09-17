---
title: "Get queue"
action: heos.get_queue
domain: heos
description: "Retrieves the play queue of a HEOS media player."
related_actions:
  - heos.move_queue_item
  - heos.remove_from_queue
---

Use this action to read the play queue of a HEOS media player. It returns the items currently queued, which you can use to inspect what's lined up or to find the queue IDs needed by the [Move queue item](/actions/heos.move_queue_item/) and [Remove from queue](/actions/heos.remove_from_queue/) actions.

{% include actions/ui_header.md %}

To get the queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the HEOS media player you want to read.
6. From the actions shown for that target, select **Get queue**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `heos.get_queue`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: heos.get_queue
  target:
    entity_id: media_player.office
  response_variable: queue
{% endexample %}

This stores the play queue of `media_player.office` in `queue`.

{% include actions/targets.md domain="media_player" %}

## Response data

The response is keyed by the entity ID of each targeted player. For every player, a `queue` list holds the queued items, each with the following fields:

- `queue_id`: The position of the item in the queue, starting at 1.
- `song`: The title of the track.
- `album`: The album the track belongs to.
- `artist`: The artist of the track.
- `image_url`: A link to the cover art.
- `media_id`: The HEOS identifier of the track.
- `album_id`: The HEOS identifier of the album.

```yaml
media_player.office:
  queue:
    - queue_id: 1
      song: Alone Again
      album: After Hours
      artist: The Weeknd
      image_url: >-
        http://resources.example.com/images/640x640.jpg
      media_id: "134788274"
      album_id: "134788273"
    - queue_id: 2
      song: Too Late
      album: After Hours
      artist: The Weeknd
      image_url: >-
        http://resources.example.com/images/640x640.jpg
      media_id: "134788275"
      album_id: "134788273"
```

## Good to know

- Use this action first to find the `queue_id` values, then pass them to [Move queue item](/actions/heos.move_queue_item/) or [Remove from queue](/actions/heos.remove_from_queue/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
