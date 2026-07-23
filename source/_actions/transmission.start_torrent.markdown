---
title: "Start torrent"
action: transmission.start_torrent
domain: transmission
description: "Starts a torrent in Transmission."
related_actions:
  - transmission.stop_torrent
  - transmission.get_torrents
---

Use this action to start a torrent downloading or seeding in Transmission.

{% include actions/ui_header.md %}

To start a torrent from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Transmission: Start torrent**.
6. Select your **Transmission entry** and enter the **ID** of the torrent.
7. Select **Save**.

This action does not support targets. In the UI, you select the Transmission integration through the **Transmission entry** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Transmission entry:
  description: The Transmission integration entry the torrent belongs to.
  required: true
ID:
  description: The ID of the torrent. You can find it with the [Get torrents](/actions/transmission.get_torrents/) action or in the `torrent_info` attribute of the `*_torrents` sensors.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `transmission.start_torrent`. A basic example looks like this:

{% example %}
action: |
  action: transmission.start_torrent
  data:
    entry_id: YOUR_TRANSMISSION_ENTRY_ID
    id: 123
{% endexample %}

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    The Transmission integration entry the torrent belongs to.
  required: true
  type: string
id:
  description: >
    The ID of the torrent. You can find it with the
    [Get torrents](/actions/transmission.get_torrents/) action or in the
    `torrent_info` attribute of the `*_torrents` sensors.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
