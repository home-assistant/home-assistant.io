---
title: "Get queue"
action: sonarr.get_queue
domain: sonarr
description: "Retrieves the episodes currently in the Sonarr download queue with their progress and details."
related_actions:
  - sonarr.get_series
  - sonarr.get_wanted
---

Use this action to retrieve all episodes currently in the download queue, together with their progress and details.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to notify yourself when a download is still in progress.

{% include actions/ui_header.md %}

To get the download queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sonarr: Get queue**.
6. Select the **Sonarr entry** to query and optionally set **Max items**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Sonarr entry:
  description: The Sonarr config entry to query.
  required: true
Max items:
  description: The maximum number of queue items to return. Use 0 for no limit. The maximum is 500.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonarr.get_queue`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonarr.get_queue
  data:
    entry_id: "01234567890abcdef1234567890abcde"
    max_items: 50
  response_variable: queue_data
{% endexample %}

This fetches up to 50 items from the download queue.

### Options in YAML

{% options_yaml %}
entry_id:
  description: The Sonarr config entry to query.
  required: true
  type: string
max_items:
  description: The maximum number of queue items to return. Use 0 for no limit. The maximum is 500.
  required: false
  default: 0
  type: integer
{% endoptions_yaml %}

## Response data

The response contains a `shows` key with a mapping of queue items keyed by download title. Each queue item includes the following fields:

- `id`: Internal queue item ID.
- `series_id`: Internal Sonarr series ID.
- `episode_id`: Internal episode ID.
- `title`: Series title.
- `download_title`: Download release name.
- `season_number`: Season number.
- `episode_number`: Episode number.
- `episode_title`: Episode title.
- `episode_identifier`: Formatted identifier, such as `S01E01`.
- `progress`: Download progress percentage.
- `size`: Total download size in bytes.
- `size_left`: Remaining download size in bytes.
- `status`: Download status, such as `downloading` or `paused`.
- `tracked_download_status`: Tracked download status, such as `ok` or `warning`.
- `tracked_download_state`: Tracked download state, such as `downloading`.
- `quality`: Quality profile name, such as `Bluray-1080p`.
- `languages`: List of language names.
- `download_client`: Download client name.
- `download_id`: The download client's ID for this download.
- `indexer`: Indexer name.
- `protocol`: Download protocol, such as `ProtocolType.TORRENT` or `ProtocolType.USENET`.
- `episode_has_file`: Whether the episode already has a file.
- `estimated_completion_time`: Estimated completion timestamp, or empty if unknown.
- `time_left`: Time remaining, or empty if unknown.
- `images`: Mapping of series image URLs by type, including poster, banner, fanart, and clearlogo.

A shortened example of the response looks like this:

```yaml
shows:
  "Homeland.S02.Bluray.EAC3.5.1.1080p.x265-iVy":
    id: 785716933
    series_id: 65
    episode_id: 2497
    title: "Homeland"
    download_title: "Homeland.S02.Bluray.EAC3.5.1.1080p.x265-iVy"
    season_number: 2
    episode_number: 12
    episode_title: "The Choice"
    episode_identifier: "S02E12"
    progress: "3.80%"
    size: 13525611258
    size_left: 13011284730
    status: "paused"
    quality: "Bluray-1080p"
    languages:
      - "English"
    download_client: "qBittorrent"
    protocol: "ProtocolType.TORRENT"
    episode_has_file: false
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
