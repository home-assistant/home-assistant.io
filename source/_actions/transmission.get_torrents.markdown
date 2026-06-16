---
title: "Get torrents"
action: transmission.get_torrents
domain: transmission
description: "Returns the current torrents in Transmission."
related_actions:
  - transmission.add_torrent
  - transmission.start_torrent
  - transmission.stop_torrent
---

Use this action to get the current torrents in Transmission. You can filter the result by torrent state, and the action returns the matching torrents as response data you can use in a template.

{% include actions/ui_header.md %}

To get torrents from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Transmission: Get torrents**.
6. Select your **Transmission entry** and choose a **Torrent filter**.
7. Select **Save**.

This action does not support targets. In the UI, you select the Transmission integration through the **Transmission entry** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Transmission entry:
  description: The Transmission integration entry to read the torrents from.
  required: true
Torrent filter:
  description: "Which torrents to return: all, active, started, paused, or completed."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `transmission.get_torrents`. A basic example looks like this:

{% example %}
action: |
  action: transmission.get_torrents
  data:
    entry_id: YOUR_TRANSMISSION_ENTRY_ID
    torrent_filter: all
  response_variable: torrents
{% endexample %}

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    The Transmission integration entry to read the torrents from.
  required: true
  type: string
torrent_filter:
  description: >
    Which torrents to return: `all`, `active`, `started`, `paused`, or
    `completed`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a `torrents` mapping, keyed by the name of each torrent. Each entry contains the following fields:

- `id`: The ID of the torrent.
- `name`: The name of the torrent.
- `status`: The current status of the torrent.
- `percent_done`: How much of the torrent has completed, as a percentage.
- `ratio`: The share ratio of the torrent.
- `eta`: The estimated time remaining, or empty when not available.
- `added_date`: When the torrent was added, in ISO 8601 format.
- `done_date`: When the torrent finished, in ISO 8601 format, or empty when not finished.
- `download_dir`: The download directory of the torrent.
- `labels`: The list of labels assigned to the torrent.

{% include actions/stuck.md %}

{% include actions/related.md %}
