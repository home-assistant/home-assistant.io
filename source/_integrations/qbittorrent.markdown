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
ha_platforms:
  - sensor
ha_integration_type: service
---

The `qbittorrent` platform allows you to monitor your downloads with [qBittorrent](https://www.qbittorrent.org/) from within Home Assistant and setup automations based on the information.

## Setup

This sensor requires the qBittorrent Web UI enabled. The [official reference](https://github.com/qbittorrent/qBittorrent/wiki#webui-related) describes how to set up the Web UI.

{% include integrations/config_flow.md %}

## Sensors

The qBittorrent integration will add the following sensors:

- `sensor.qbittorrent_status`: The status of qBittorrent - `up_down`, `seeding`, `downloading` or `idle`.
- `sensor.qbittorrent_up_speed`: The current total upload speed in kB/s.
- `sensor.qbittorrent_down_speed`: The current total download speed in kB/s.

When "Create sensors for torrent statuses" is enabled under Integrations > qBittorrent > Configure, the following additional sensors will be added:

- `sensor.qbittorrent_torrents`: The total number of torrents in qBittorrent.
- `sensor.qbittorrent_torrents_downloading`: The number of downloading torrents.
- `sensor.qbittorrent_torrents_uploading`: The number of uploading (seeding) torrents.
- `sensor.qbittorrent_torrents_stalled`: The number of torrents which have stalled to download.
- `sensor.qbittorrent_torrents_stopped`: The number of torrents which were stopped from downloading or uploading by the user.
- `sensor.qbittorrent_torrents_completed`: The number of torrents which have been downloaded and met their required upload threshold.
- `sensor.qbittorrent_torrents_queued`: The number of torrents which are in the download queue.
- `sensor.qbittorrent_torrents_checking`: The number of torrents which are being checked.
- `sensor.qbittorrent_torrents_error`: The number of torrents which experienced errors during download.

On each sensor, a state attribute `torrent_names` will contain an array of the affected torrent names.
