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
ha_integration_type: service
---

The `qbittorrent` platform allows you to monitor your downloads with [qBittorrent](https://www.qbittorrent.org/) from within Home Assistant and setup automations based on the information.

## Setup

This sensor requires the qBittorrent Web UI enabled. The [official reference](https://github.com/qbittorrent/qBittorrent/wiki#webui-related) describes how to set up the Web UI.

{% include integrations/config_flow.md %}

## Sensors

The qBittorrent integration will add the following sensors:

- `sensor.qbittorrent_status`: The status of qBittorrent - `up_down`, `seeding`, `downloading` or `idle`.
- `sensor.qbittorrent_upload_speed`: The current total upload speed in kB/s.
- `sensor.qbittorrent_download_speed`: The current total download speed in kB/s.
- `sensor.qbittorrent_all_torrents`: The current total torrents in qBittorrent.
- `sensor.qbittorrent_active_torrents`: The current active torrents in qBittorrent.
- `sensor.qbittorrent_inactive_torrents`: The current inactive torrents in qBittorrent.
- `sensor.qbittorrent_paused_torrents`: The current paused torrents in qBittorrent.

## Services

### Service `qbittorrent.get_torrents`

This service populates [Response Data](/docs/scripts/service-calls#use-templates-to-handle-response-data)
with a dictionary of torrents based on the provided filter.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `filter` | no | The type of torrents you want in the response | all, active, inactive, paused, downloading, seeding

</div>

```yaml
service: qbittorrent.get_torrents
data:
  filter: 'all'
response_variable: torrents
```

The response data contains the field `torrent_info` which contains a dictionary of torrents. The name of the torrents are the keys.
