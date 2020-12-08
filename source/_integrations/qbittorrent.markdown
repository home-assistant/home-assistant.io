---
title: qBittorrent
description: Instructions on how to integrate qBittorrent sensors within Home Assistant.
ha_category:
  - Downloading
  - Sensor
ha_release: 0.84
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@geoffreylagaisse'
ha_domain: qbittorrent
---

The `qbittorrent` platform allows you to monitor your downloads with [qBittorrent](https://www.qbittorrent.org/) from within Home Assistant and setup automations based on the information.

## Setup

This sensor requires the qBittorrent Web UI enabled. The [official reference](https://github.com/qbittorrent/qBittorrent/wiki#webui-related) describes how to set up the Web UI.

## Configuration

This integration can now be configured entirely via the UI. <br>
The qBittorrent integration will add the following sensors.

**Sensors**:

- `sensor.qbittorrent_status`: The status of your qBittorrent server.
- `sensor.qbittorrent_down_speed`: The current download speed [MB/s].
- `sensor.qbittorrent_up_speed`: The current upload speed [MB/s].
- `sensor.qbittorrent_active_torrents`: The current number of active torrents.
- `sensor.qbittorrent_inactive_torrents`: The current number of inactive torrents.
- `sensor.qbittorrent_paused_torrents`: The current number of paused torrents.
- `sensor.qbittorrent_resumed_torrents`: The current number of resumed torrents after being paused.
- `sensor.qbittorrent_seeding`: The current number of torrents which are seeding.
- `sensor.qbittorrent_total_torrents`: The total number of torrents present in the client.
- `sensor.qbittorrent_downloading`: The current number of started torrents (downloading).
- `sensor.qbittorrent_completed_torrents`: The current number of completed torrents (seeding).

## Services

### Service `add_download`

Adds a new torrent to download. This only works with a magnet link.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `magnet_link`    | no | The Magnet link you want to download.
| `server_url` | yes | Only required when you have a multiple servers setup.
| `download_path` | yes | Only required when you want to download to another path that differentiates from the default configured path within the server.

### Service `remove_download`

Removes a torrent from the client.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `torrent_hash`    | no | The unique identifier for the torrent you want to remove.
| `server_url` | yes | Only required when you have a multiple servers setup.
| `delete_permanent` | yes | Remove file from permanently disk, default False (True or False).

## Deprecated Configuration

This section contains instructions for deprecated `configuration.yaml` declaration.

<div class='note warning'>
This method of configuration will be removed in one of the next versions
</div>

<details>
<summary>Click here for documentation for the deprecated configuration</summary>

## Old configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: qbittorrent
    url: 'http://<hostname>:<port>'
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
url:
  description: The URL of the Web UI of qBittorrent.
  required: true
  type: string
name:
  description: The name to use when displaying this qBittorrent instance.
  required: false
  type: string
username:
  description: The username of the Web UI of qBittorrent.
  required: true
  type: string
password:
  description: The password of the Web UI of qBittorrent.
  required: true
  type: string
{% endconfiguration %}