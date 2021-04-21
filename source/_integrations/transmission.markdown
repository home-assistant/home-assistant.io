---
title: Transmission
description: Instructions on how to integrate Transmission within Home Assistant.
ha_category:
  - Downloading
  - Switch
  - Sensor
ha_release: 0.87
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@engrbm87'
  - '@JPHutchins'
ha_domain: transmission
ha_platforms:
  - sensor
  - switch
---

The Transmission integration allows you to monitor your [Transmission](https://www.transmissionbt.com/) BitTorrent downloads from within Home Assistant and set up automations based on that information.

## Setup

Your Transmission client must first be configured to allow remote access. In your Transmission client navigate to **Preferences** -> **Remote** tab and then click the **Allow remote access** checkbox.

{% include integrations/config_flow.md %}

## Integration Entities

The Transmission integration will add the following sensors and switches.

**Sensors**:
- `sensor.transmission_current_status`: The status of your Transmission daemon.
- `sensor.transmission_download_speed`: The current download speed [MB/s].
- `sensor.transmission_upload_speed`: The current upload speed [MB/s].
- `sensor.transmission_active_torrents`: The current number of active torrents.
- `sensor.transmission_paused_torrents`: The current number of paused torrents.
- `sensor.transmission_total_torrents`: The total number of torrents present in the client.
- `sensor.transmission_started_torrents`: The current number of started torrents (downloading).
- `sensor.transmission_completed_torrents`: The current number of completed torrents (seeding).

**Switches**:
- `switch.transmission_switch`: A switch to start/stop all torrents.
- `switch.transmission_turtle_mode`: A switch to enable turtle mode (a.k.a. alternative speed limits).

## Event Automation

The Transmission integration is continuously monitoring the status of torrents in the target client. Once a torrent is started or completed, an event is triggered on the Home Assistant Bus containing the torrent name and ID, which can be used with automations.

Possible events are:

- `transmission_downloaded_torrent`
- `transmission_started_torrent`
- `transmission_removed_torrent`

Inside of the event, there is the name of the torrent that is started or completed, as it is seen in the Transmission User Interface.

Example of an automation that notifies on successful download and removes the torrent from the client:

{% raw %}

```yaml
- alias: "Notify and remove completed torrent"
  trigger:
    platform: event
    event_type: transmission_downloaded_torrent
  action:
    - service: notify.telegram_notifier
      data:
        title: "Torrent completed!"
        message: "{{trigger.event.data.name}}"
    - service: transmission.remove_torrent
      data:
        name: "Transmission"
        id: "{{trigger.event.data.id}}"
```

{% endraw %}

## Services

### Service `add_torrent`

Adds a new torrent to download. It can either be a URL (HTTP, HTTPS or FTP), magnet link or a local file (make sure that the path is [white listed](/docs/configuration/basic/#allowlist_external_dirs)).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | yes | Name of the configured instance (Default: "Transmission")
| `torrent` | no | Torrent to download

### Service `remove_torrent`

Removes a torrent from the client.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | no | Name of the configured instance (Default: "Transmission")
| `id` | no | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors
| `delete_data` | yes | Delete torrent data (Default: false)

### Service `start_torrent`

Starts a torrent.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | no | Name of the configured instance (Default: "Transmission")
| `id` | no | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors

### Service `stop_torrent`

Stops a torrent.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name`    | no | Name of the configured instance (Default: "Transmission")
| `id` | no | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors

## Templating

### Attribute `torrent_info`

All `*_torrents` sensors e.g. `sensor.transmission_total_torrents` or `sensor.transmission_started_torrents` have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in **Developer Tools** -> **States** -> `sensor.transmission_total_torrents` -> **Attributes**, or by adding a [Markdown card](/lovelace/markdown/) to Lovelace with the following code:

{% raw %}

```yaml
content: >
  {% set payload = state_attr('sensor.transmission_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}

  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, {{ data.eta }} remaining {% endfor %}
type: markdown
```

{% endraw %}
