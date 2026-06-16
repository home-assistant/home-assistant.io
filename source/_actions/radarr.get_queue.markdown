---
title: "Get queue"
action: radarr.get_queue
domain: radarr
description: "Gets all movies currently in the Radarr download queue with their progress and details."
related_actions:
  - radarr.get_movies
---

Use this action to get all movies currently in the Radarr download queue, including their progress and details.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to notify yourself when a download finishes.

{% include actions/ui_header.md %}

To get the download queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Radarr: Get queue**.
6. Select the **Radarr entry** to get the queue from, and optionally set the **Max items** to return.
7. In the **Response variable** field, enter a name to store the queue data in, such as `queue`. You'll use this name to read the queue in later steps.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Radarr entry:
  description: The Radarr config entry to get the queue from.
  required: true
Max items:
  description: The maximum number of queue items to return. Set to 0 to return all items.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `radarr.get_queue`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: radarr.get_queue
  data:
    entry_id: 01234567890abcdef1234567890abcde
  response_variable: queue
{% endexample %}

This fetches all movies in your Radarr download queue.

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    The Radarr config entry to get the queue from.
  required: true
  type: string
max_items:
  description: >
    The maximum number of queue items to return. Set to 0 to return all
    items.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

## Response data

The response contains a `movies` mapping, keyed by download title. Each queue item includes the following fields:

- `id`: The internal queue item ID.
- `movie_id`: The internal Radarr movie ID.
- `title`: The movie title.
- `download_title`: The download release name.
- `progress`: The download progress percentage.
- `size`: The total download size in bytes.
- `size_left`: The remaining download size in bytes.
- `status`: The download status, such as `downloading` or `queued`.
- `tracked_download_status`: The tracked download status.
- `tracked_download_state`: The tracked download state.
- `download_client`: The download client name.
- `download_id`: The download client's ID for this download.
- `indexer`: The indexer name.
- `protocol`: The download protocol, such as `torrent` or `usenet`.
- `estimated_completion_time`: The estimated completion time.
- `time_left`: The time remaining.
- `quality`: The quality profile name, such as `Bluray-1080p`.
- `languages`: A list of language names.
- `custom_format_score`: The custom format score.
- `images`: A mapping of image URLs by type, such as poster or fanart.

A shortened example of the response looks like this:

```yaml
movies:
  The.Matrix.1999.1080p.BluRay.x264:
    id: 123456789
    movie_id: 1
    title: The Matrix
    download_title: The.Matrix.1999.1080p.BluRay.x264
    progress: "45.32%"
    size: 8589934592
    size_left: 4697620070
    status: downloading
    tracked_download_status: ok
    tracked_download_state: downloading
    quality: Bluray-1080p
    languages:
      - English
    download_client: qBittorrent
    indexer: My Indexer
    protocol: torrent
    estimated_completion_time: "2024-01-15T18:30:00Z"
    time_left: "01:23:45"
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
