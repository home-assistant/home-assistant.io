---
title: "Add torrent"
action: transmission.add_torrent
domain: transmission
description: "Adds a new torrent to download in Transmission."
related_actions:
  - transmission.remove_torrent
  - transmission.start_torrent
  - transmission.get_torrents
---

Use this action to add a new torrent to download in Transmission. You can add a torrent from a URL, a magnet link, a Base64-encoded torrent file, or a local file.

{% include actions/ui_header.md %}

To add a torrent from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Transmission: Add torrent**.
6. Select your **Transmission entry** and enter the **Torrent** to add.
7. Select **Save**.

This action does not support targets. In the UI, you select the Transmission integration through the **Transmission entry** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Transmission entry:
  description: The Transmission integration entry to add the torrent to.
  required: true
Torrent:
  description: The torrent to add. This can be an HTTP, HTTPS, or FTP URL, a magnet link, a Base64-encoded torrent file, or a path to a local file. Local file paths must be in the `allowlist_external_dirs` list.
  required: true
Download path:
  description: The absolute path to the download directory. When you leave this empty, Transmission uses its default download directory.
  required: false
Labels:
  description: A comma-separated list of labels to assign to the torrent.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `transmission.add_torrent`. A basic example looks like this:

{% example %}
action: |
  action: transmission.add_torrent
  data:
    entry_id: YOUR_TRANSMISSION_ENTRY_ID
    torrent: "http://releases.ubuntu.com/24.04/ubuntu-24.04-desktop-amd64.iso.torrent"
{% endexample %}

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    The Transmission integration entry to add the torrent to. To find the
    value, go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}, select this action, choose
    your integration, then switch to YAML mode to read the `entry_id`.
  required: true
  type: string
torrent:
  description: >
    The torrent to add. This can be an HTTP, HTTPS, or FTP URL, a magnet link,
    a Base64-encoded torrent file, or a path to a local file. Local file paths
    must be in the `allowlist_external_dirs` list.
  required: true
  type: string
download_path:
  description: >
    The absolute path to the download directory. When you leave this empty,
    Transmission uses its default download directory.
  required: false
  type: string
labels:
  description: >
    A comma-separated list of labels to assign to the torrent.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: download a torrent from a feed item

This script adds a torrent and tags it with a label, so a follow-up automation can act on it later, for example to remove it once it finishes.

- **Action**: Transmission: Add torrent

{% details "YAML example for adding a labeled torrent" %}

{% example %}
script: |
  alias: "Add labeled torrent"
  sequence:
    - action: transmission.add_torrent
      data:
        entry_id: YOUR_TRANSMISSION_ENTRY_ID
        torrent: "http://releases.ubuntu.com/24.04/ubuntu-24.04-desktop-amd64.iso.torrent"
        labels: "Notify,Remove"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
