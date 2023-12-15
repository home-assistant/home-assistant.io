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
- `sensor.qbittorrent_total_torrents`: The current total torrents in QBittorrent.
- `sensor.qbittorrent_active_torrents`: The current active torrents in QBittorrent.
- `sensor.qbittorrent_inactive_torrents`: The current inactive torrents in QBittorrent.
- `sensor.qbittorrent_paused_torrents`: The current paused torrents in QBittorrent.
- `sensor.qbittorrent_seeding_torrents`: The current seeding torrents in QBittorrent.
- `sensor.qbittorrent_started_torrents`: The current totstartedal torrents in QBittorrent.

## Templating

### Attribute `torrent_info`

All `*_torrents` sensors e.g. `sensor.qbittorrent_total_torrents` or `sensor.qbittorrent_started_torrents` have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in **Developer Tools** -> **States** -> `sensor.qbittorrent_total_torrents` -> **Attributes**, or by adding a [Markdown card](/dashboards/markdown/) to a dashboard with the following code:

{% raw %}

```yaml
content: >
  {% set payload = state_attr('sensor.qbittorrent_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}

  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, {{ data.eta }} remaining {% endfor %}
type: markdown
```

{% endraw %}
