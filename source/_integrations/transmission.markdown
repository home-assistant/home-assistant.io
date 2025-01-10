---
title: Transmission
description: Instructions on how to integrate Transmission within Home Assistant.
ha_category:
  - Downloading
  - Sensor
  - Switch
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
ha_integration_type: integration
---

The Transmission integration allows you to monitor your [Transmission](https://www.transmissionbt.com/) BitTorrent downloads from within Home Assistant and set up automations based on that information.

## Setup

Your Transmission client must first be configured to allow remote access. In your Transmission client navigate to **Preferences** -> **Remote** tab and then click the **Allow remote access** checkbox.

{% include integrations/config_flow.md %}

## Supported functionality

The Transmission integration will add the following sensors and switches.

### Sensors

- The status of your Transmission daemon.
- The current download speed [MB/s].
- The current upload speed [MB/s].
- The current number of active torrents.
- The current number of paused torrents.
- The total number of torrents present in the client.
- The current number of started torrents (downloading).
- The current number of completed torrents (seeding).

### Switches

- A switch to start/stop all torrents.
- A switch to enable turtle mode (a.k.a. alternative speed limits).

## Event automation

The Transmission integration is continuously monitoring the status of torrents in the target client. Once a torrent is started or completed, an event is triggered on the Home Assistant Bus containing the torrent name and ID, which can be used with automations.

Possible events are:

- `transmission_downloaded_torrent`
- `transmission_started_torrent`
- `transmission_removed_torrent`

Inside the event, there is the name of the torrent that is started or completed and the path where the files are downloaded, as seen in the Transmission User Interface.

Example of an automation that notifies on successful download and removes the torrent from the client:

{% raw %}

```yaml
- alias: "Notify and remove completed torrent"
  triggers:
    - trigger: event
      event_type: transmission_downloaded_torrent
  actions:
    - action: notify.telegram_notifier
      data:
        title: "Torrent completed!"
        message: "{{trigger.event.data.name}} downloaded to {{trigger.event.data.download_path}}"
    - action: transmission.remove_torrent
      data:
        entry_id: eeb52bc78e11d813a1e6bc68c8ff93c8
        id: "{{trigger.event.data.id}}"
```

{% endraw %}

## Actions

All Transmission actions require integration `entry_id`. To find it, go to **Developer tools** > **Actions**. Choose the desired action and select your integration from dropdown. Then switch to YAML mode to see `entry_id`.

### Action `add_torrent`

Adds a new torrent to download. It can either be a URL (HTTP, HTTPS or FTP), magnet link or a local file (make sure that the path is [white listed](/integrations/homeassistant/#allowlist_external_dirs)).

| Data attribute | Optional | Description              |
| ---------------------- | -------- | ------------------------ |
| `entry_id`             | no       | The integration entry_id |
| `torrent`              | no       | Torrent to download      |
| `download_path`        | yes      | Absolute path to the download directory. If not specified, the Transmission's default directory will be used. |

### Action `remove_torrent`

Removes a torrent from the client.

| Data attribute | Optional | Description                                                                                 |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `entry_id`             | no       | The integration entry_id                                                                    |
| `id`                   | no       | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors |
| `delete_data`          | yes      | Delete torrent data (Default: false)                                                        |

### Action `start_torrent`

Starts a torrent.

| Data attribute | Optional | Description                                                                                 |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `entry_id`             | no       | The integration entry_id                                                                    |
| `id`                   | no       | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors |

### Action `stop_torrent`

Stops a torrent.

| Data attribute | Optional | Description                                                                                 |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `entry_id`             | no       | The integration entry_id                                                                    |
| `id`                   | no       | ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors |

## Templating

### Attribute `torrent_info`

All `*_torrents` sensors e.g. `sensor.transmission_total_torrents` or `sensor.transmission_started_torrents` have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in **Developer Tools** -> **States** -> `sensor.transmission_total_torrents` -> **Attributes**, or by adding a [Markdown card](/dashboards/markdown/) to a dashboard with the following code:

{% raw %}

```yaml
content: >
  {% set payload = state_attr('sensor.transmission_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}

  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, {{ data.eta }} remaining {% endfor %}
type: markdown
```

{% endraw %}
