---
title: Deluge
description: Instructions on how to integrate Deluge within Home Assistant.
ha_category:
  - Downloading
  - Switch
  - Sensor
ha_release: TODO
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: deluge
ha_platforms:
  - sensor
  - switch
---

The Deluge integration allows you to monitor your [Deluge](https://deluge-torrent.org/) BitTorrent downloads from within Home Assistant and set up automations based on that information.

## Setup

To be able to use this integration, you have to enable the following option in deluge settings: Daemon > Allow remote controls

{% include integrations/config_flow.md %}

## Integration Entities

The Deluge integration will add the following sensors and switches.

**Sensors**:
- `sensor.deluge_current_status`: The status of your Deluge daemon.
- `sensor.deluge_download_speed`: The current download speed [MiB/s].
- `sensor.deluge_upload_speed`: The current upload speed [MiB/s].
- `sensor.deluge_active_torrents`: The current number of active torrents.
- `sensor.deluge_paused_torrents`: The current number of paused torrents.
- `sensor.deluge_total_torrents`: The total number of torrents present in the client.
- `sensor.deluge_started_torrents`: The current number of started torrents (downloading).
- `sensor.deluge_completed_torrents`: The current number of completed torrents (seeding).

**Switches**:
- `switch.deluge_switch`: A switch to start/stop all torrents.

## Event Automation

The Deluge integration is continuously monitoring the status of torrents in the target client. Once a torrent is added, started, finished or removed, an event is triggered on the Home Assistant Bus containing the torrent ID, name and state, which can be used with automations.

Possible events are:

- `deluge_added_torrent`
- `deluge_started_torrent`
- `deluge_finished_torrent`
- `deluge_removed_torrent`

Inside of the event, there is the name of the torrent that is added, started, finished or removed, as it is seen in the Deluge User Interface.

Example of an automation that notifies on successful download and removes the torrent from the client:

{% raw %}

```yaml
- alias: "Notify and remove completed torrent"
  trigger:
    platform: event
    event_type: deluge_finished_torrent
  action:
    - service: notify.telegram_notifier
      data:
        title: "Torrent completed!"
        message: "{{trigger.event.data.name}}"
    - service: deluge.remove_torrent
      data:
        name: "Deluge"
        id: "{{trigger.event.data.id}}"
```

{% endraw %}

## Services

### Service `add_torrent`

Adds a new torrent to download. It can either be a URL (HTTP, HTTPS or FTP) or magnet link.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | yes | Name of the configured instance (Default: "Deluge")
| `torrent` | no | Torrent to download

### Service `resume_torrent`

Resumes a torrent.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | no | Name of the configured instance (Default: "Deluge")
| `id` | no | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors

### Service `pause_torrent`

Pauses a torrent.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | no | Name of the configured instance (Default: "Deluge")
| `id` | no | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors

### Service `remove_torrent`

Removes a torrent from the client.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | no | Name of the configured instance (Default: "Deluge")
| `id` | no | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors
| `delete_data` | yes | Delete torrent data (Default: false)

## Templating

### Attribute `free_space`

Status sensor e.g. `sensor.deluge_status` has a state attribute `free_space` that contains the free space [GiB] in the downloading path. You can see this information in **Developer Tools** -> **States** -> `sensor.deluge_status` -> **Attributes**.

### Attribute `torrent_info`

All `*_torrents` sensors e.g. `sensor.deluge_total_torrents` or `sensor.deluge_started_torrents` have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in **Developer Tools** -> **States** -> `sensor.deluge_total_torrents` -> **Attributes**, or by adding a [Markdown card](/lovelace/markdown/) to Lovelace with the following code:

{% raw %}

```yaml
content: >
  {% set payload = state_attr('sensor.deluge_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}

  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, {{ data.eta }} remaining {% endfor %}
type: markdown
```

{% endraw %}

