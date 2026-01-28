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
  - '@andrew-codechimp'
ha_domain: transmission
ha_platforms:
  - sensor
  - switch
ha_integration_type: service
ha_quality_scale: bronze
---

The **Transmission** {% term integration %} allows you to monitor your [Transmission](https://www.transmissionbt.com/) BitTorrent downloads from within Home Assistant and set up automations based on that information.

## Prerequisites

Before setting up the Transmission integration, ensure you have:

1. Transmission installed and running on your network.
2. The IP address or hostname and port of your Transmission instance.
3. The username and password of your Transmission instance, if set.
4. Your Transmission client must first be configured to allow remote access. In your Transmission client navigate to **Preferences** > **Remote** tab and then click the **Allow remote access** checkbox.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your Transmission instance. For example: `192.168.1.100` or `transmission.local`."
Path:
  description: "The RPC request target path, for example, `/transmission/rpc`."
Port:
  description: "The port Transmission is running on. Default is `9091`."
Username:
  description: "Your Transmission username, if set."
Password:
  description: "Your Transmission password, if set."
Verify SSL certificate:
  description: "Enable SSL certificate verification when connecting via HTTPS."
{% endconfiguration_basic %}

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

The Transmission integration is continuously monitoring the status of torrents in the target client. Once a torrent is started or completed, an event is triggered on the Home Assistant Bus containing the torrent name, ID, and labels, which can be used with automations.

Possible events are:

- `transmission_downloaded_torrent`
- `transmission_started_torrent`
- `transmission_removed_torrent`

Inside the event, there is the name of the torrent that is started or completed and the path where the files are downloaded, as seen in the Transmission User Interface.

Example of an automation that notifies on successful download and removes the torrent from the client if the torrent has a label of Remove:

{% raw %}

```yaml
alias: Transmission download complete
description: "Notify on download complete and remove if label set"
triggers:
  - trigger: event
    event_type: transmission_downloaded_torrent
actions:
  - action: notify.persistent_notification
    metadata: {}
    data:
      message: >-
        {{trigger.event.data.name}} downloaded to
        {{trigger.event.data.download_path}} with labels
        {{trigger.event.data.labels}}
  - if:
      - condition: template
        value_template: "{{ 'Remove' in trigger.event.data.labels }}"
    then:
      - action: transmission.remove_torrent
        data:
          delete_data: false
          entry_id: YOUR_TRANSMISSION_ENTRY_ID
          id: "{{trigger.event.data.id}}"
```

{% endraw %}

## Actions

All Transmission actions require integration `entry_id`. To find it, go to **Developer tools** > **Actions**. Choose the desired action and select your integration from dropdown. Then switch to YAML mode to see `entry_id`.

### Action: Add torrent

The `transmission.add_torrent` action is used to add a new torrent to download.

- **Data attribute**: `entry_id`
  - **Description**: The ID of the Transmission config entry.
  - **Optional**: No

- **Data attribute**: `torrent`
  - **Description**:  The torrent to download. It can either be a URL (HTTP, HTTPS or FTP), magnet link or a local file (make sure that the path is [white listed](/integrations/homeassistant/#allowlist_external_dirs)).
  - **Optional**: No

- **Data attribute**: `download_path`
  - **Description**: The absolute path to the download directory. If not specified, the Transmission's default directory will be used.
  - **Optional**: Yes

- **Data attribute**: `labels`
  - **Description**: A comma-separated list of labels to assign to the torrent.
  - **Optional**: Yes

### Action: Remove torrent

The `transmission.remove_torrent` action is used to remove a torrent from the client.

- **Data attribute**: `entry_id`
  - **Description**: The ID of the Transmission config entry.
  - **Optional**: No

- **Data attribute**: `id`
  - **Description**:  The ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors.
  - **Optional**: No

- **Data attribute**: `delete_data`
  - **Description**: Delete torrent data (Default: false).
  - **Optional**: Yes

### Action: Start torrent

The `transmission.start_torrent` action is used to start a torrent downloading or seeding within the client.

- **Data attribute**: `entry_id`
  - **Description**: The ID of the Transmission config entry.
  - **Optional**: No

- **Data attribute**: `id`
  - **Description**:  The ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors.
  - **Optional**: No

### Action: Stop torrent

The `transmission.stop_torrent` action is used to stop a torrent downloading or seeding within the client.

- **Data attribute**: `entry_id`
  - **Description**: The ID of the Transmission config entry.
  - **Optional**: No

- **Data attribute**: `id`
  - **Description**:  The ID of the torrent, can be found in the `torrent_info` attribute of the `*_torrents` sensors.
  - **Optional**: No

### Action: Get torrents

The `transmission.get_torrents` action populates [Response Data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) with a dictionary of torrents based on the provided filter.

- **Data attribute**: `entry_id`
  - **Description**: The ID of the Transmission config entry.
  - **Optional**: No

- **Data attribute**: `torrent_filter`
  - **Description**:  The type of torrents you want in the response (all, active, started, paused, or completed).
  - **Optional**: No

```yaml
action: transmission.get_torrents
data:
  entry_id: YOUR_TRANSMISSION_ENTRY_ID
  torrent_filter: "all"
response_variable: torrents
```

## Templating

### Attribute `torrent_info`

All `*_torrents` sensors e.g. `sensor.transmission_total_torrents` or `sensor.transmission_started_torrents` have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in {% my developer_states title="**Developer Tools** > **States**" %} > `sensor.transmission_total_torrents` > **Attributes**, or by adding a [Markdown card](/dashboards/markdown/) to a dashboard with the following code:

{% raw %}

```yaml
content: >
  {% set payload = state_attr('sensor.transmission_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}

  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, with {{ data.ratio }} ratio, {{ data.eta }} remaining {% endfor %}
type: markdown
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal. After removal, your Transmission instance continues running with its current configuration.

{% include integrations/remove_device_service.md %}
