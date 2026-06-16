---
title: "Get torrents"
action: qbittorrent.get_torrents
domain: qbittorrent
description: "Gets the current torrents from one qBittorrent instance."
related_actions:
  - qbittorrent.get_all_torrents
---

Use this action to get the current torrents from one of your qBittorrent instances, for example to show them on a dashboard or send a summary in a notification. You can narrow the result down with a filter, such as only the active or paused torrents.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the torrents from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **qBittorrent: Get torrents**.
6. Choose the qBittorrent **Device** and the **Torrent filter** you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The qBittorrent instance to get the torrents from.
Torrent filter:
  description: Which torrents to return, such as all, active, inactive, paused, seeding, started, or errored.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `qbittorrent.get_torrents`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: qbittorrent.get_torrents
  data:
    device_id: YOUR_DEVICE_ID
    torrent_filter: active
  response_variable: torrents
{% endexample %}

This returns the active torrents from the selected qBittorrent instance.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The qBittorrent instance to get the torrents from.
  required: true
  type: string
torrent_filter:
  description: >
    Which torrents to return. One of `all`, `active`, `inactive`, `paused`,
    `seeding`, `started`, or `errored`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a dictionary of torrents that match the filter. Each torrent is keyed by its name.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
