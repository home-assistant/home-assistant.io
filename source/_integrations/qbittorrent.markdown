---
title: qBittorrent
description: Instructions on how to integrate qBittorrent sensors within Home Assistant.
ha_category:
  - Downloading
ha_release: 0.84
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: qbittorrent
ha_codeowners:
  - '@geoffreylagaisse'
  - '@finder39'
ha_platforms:
  - sensor
  - switch
ha_integration_type: service
---

The `qbittorrent` platform allows you to monitor your downloads with [qBittorrent](https://www.qbittorrent.org/) from within Home Assistant and setup automations based on the information.
You can control the alternative speed via the `Alternative speed` switch.

## Setup

This sensor requires the qBittorrent Web UI enabled. The [official reference](https://github.com/qbittorrent/qBittorrent/wiki#webui-related) describes how to set up the Web UI.

{% include integrations/config_flow.md %}

## Sensors

The qBittorrent integration will add the following sensors:

- `sensor.qbittorrent_status`: The status of qBittorrent - `up_down`, `seeding`, `downloading`, or `idle`.
- `sensor.qbittorrent_connection_status`: The connection status of qBittorrent - `connected`, `firewalled`, or `disconnected`.
- `sensor.qbittorrent_upload_speed`: The current total upload speed in kB/s.
- `sensor.qbittorrent_download_speed`: The current total download speed in kB/s.
- `sensor.qbittorrent_upload_speed_limit`: The active qBittorrent upload speed limit (disabled by default).
- `sensor.qbittorrent_download_speed_limit`: The active qBittorrent download speed limit (disabled by default).
- `sensor.qbittorrent_alltime_upload`: The total amount of uploaded data.
- `sensor.qbittorrent_alltime_download`: The total amount of downloaded data.
- `sensor.qbittorrent_global_ratio`: The global share ratio (disabled by default).
- `sensor.qbittorrent_all_torrents`: The current total torrents in qBittorrent.
- `sensor.qbittorrent_active_torrents`: The current active torrents in qBittorrent.
- `sensor.qbittorrent_inactive_torrents`: The current inactive torrents in qBittorrent.
- `sensor.qbittorrent_paused_torrents`: The current paused torrents in qBittorrent.

## Switch

The qBittorrent integration adds the following switch:

- `Alternative speed`: Allows you to enable or disable qBittorrent's alternative speed.

## Actions

### Action `qbittorrent.get_torrents`

This action populates [Response Data](/docs/scripts/perform-actions#use-templates-to-handle-response-data)
with a dictionary of torrents based on the provided filter.

| Data attribute | Optional | Description                                    | Example                                             |
| ---------------------- | -------- | ---------------------------------------------- | --------------------------------------------------- |
| `device`               | no       | The device you'd like to check the torrents of | all, active, inactive, paused, downloading, seeding |
| `torrent_filter`       | no       | The type of torrents you want in the response  | all, active, inactive, paused, downloading, seeding |

```yaml
action: qbittorrent.get_torrents
data:
  filter: "all"
response_variable: torrents
```

The response data contains the field `torrents` which contains a dictionary of torrents. The names of the torrents are the keys.

### Action `qbittorrent.get_all_torrents`

This action populates [Response Data](/docs/scripts/perform-actions#use-templates-to-handle-response-data)
with a dictionary of torrents based on the provided filter.

| Data attribute | Optional | Description                                   | Example                                             |
| ---------------------- | -------- | --------------------------------------------- | --------------------------------------------------- |
| `torrent_filter`       | no       | The type of torrents you want in the response | all, active, inactive, paused, downloading, seeding |

```yaml
action: qbittorrent.get_all_torrents
data:
  filter: "all"
response_variable: all_torrents
```

The response data contains the field `all_torrents`, which contains a dictionary of integrations, which each contains a dictionary of torrents. The names of the torrents are the keys.
