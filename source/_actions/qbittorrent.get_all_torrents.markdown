---
title: "Get all torrents"
action: qbittorrent.get_all_torrents
domain: qbittorrent
description: "Gets the current torrents from all qBittorrent instances."
related_actions:
  - qbittorrent.get_torrents
---

Use this action to get the current torrents from all of your qBittorrent instances at once, for example to show a combined overview on a dashboard. You can narrow the result down with a filter, such as only the active or paused torrents.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the torrents from all instances in an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **qBittorrent: Get all torrents**.
6. Choose the **Torrent filter** you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Torrent filter:
  description: Which torrents to return, such as all, active, inactive, paused, seeding, started, or errored.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `qbittorrent.get_all_torrents`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: qbittorrent.get_all_torrents
  data:
    torrent_filter: active
  response_variable: all_torrents
{% endexample %}

This returns the active torrents from every configured qBittorrent instance.

### Options in YAML

{% options_yaml %}
torrent_filter:
  description: >
    Which torrents to return. One of `all`, `active`, `inactive`, `paused`,
    `seeding`, `started`, or `errored`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a dictionary keyed by each qBittorrent instance, and each instance contains a dictionary of matching torrents keyed by torrent name.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
