---
title: "Remove torrent"
action: transmission.remove_torrent
domain: transmission
description: "Removes a torrent from Transmission."
related_actions:
  - transmission.add_torrent
  - transmission.get_torrents
---

Use this action to remove a torrent from Transmission. You can optionally delete the downloaded data along with the torrent.

{% include actions/ui_header.md %}

To remove a torrent from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Transmission: Remove torrent**.
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
Delete data:
  description: Whether to also delete the downloaded data. When off, only the torrent is removed and the data stays on disk.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `transmission.remove_torrent`. A basic example looks like this:

{% example %}
action: |
  action: transmission.remove_torrent
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
delete_data:
  description: >
    Whether to also delete the downloaded data. When off, only the torrent is
    removed and the data stays on disk.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remove finished torrents that are labeled for removal

This automation listens for the Transmission download-complete event and removes the torrent, but keeps the downloaded data, when it carries the `Remove` label.

- **Trigger**: A Transmission torrent finishes downloading
- **Action**: Transmission: Remove torrent

{% details "YAML example for removing labeled torrents on completion" %}

{% example %}
automation: |
  alias: "Remove labeled torrent on completion"
  triggers:
    - trigger: event
      event_type: transmission_downloaded_torrent
  conditions:
    - "{{ 'Remove' in trigger.event.data.labels }}"
  actions:
    - action: transmission.remove_torrent
      data:
        entry_id: YOUR_TRANSMISSION_ENTRY_ID
        id: "{{ trigger.event.data.id }}"
        delete_data: false
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
