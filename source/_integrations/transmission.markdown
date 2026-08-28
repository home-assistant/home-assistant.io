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
  - event
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

The **Transmission** integration provides the following sensors and switches.

### Sensors

- The status of your Transmission daemon.
- The current download speed [MB/s].
- The current upload speed [MB/s].
- The current number of active torrents.
- The current number of paused torrents.
- The total number of torrents present in the client.
- The current number of started torrents (downloading).
- The current number of completed torrents (seeding).
- The current session downloaded data [GB].
- The current session uploaded data [GB].
- The total downloaded data [GB].
- The total uploaded data [GB].
- The current session upload/download ratio.
- The total upload/download ratio.
- The available disk space of the download directory [GB].

### Switches

- A switch to start/stop all torrents.
- A switch to enable turtle mode (a.k.a. alternative speed limits).

## Event entity

The **Transmission** {% term integration %} provides an {% term "Event entity" %} that records the last torrent event. The entity state stores the time of that event, and several event attributes provide more details that you can use in automations.

- **State attribute**: `event_type`
  - **Description**: The type of the last torrent event. Possible states are Started, Downloaded, and Removed.

- **State attribute**: `name`
  - **Description**: The filename of the torrent.

- **State attribute**: `id`
  - **Description**: The ID of the torrent within **Transmission**.

- **State attribute**: `download_path`
  - **Description**: The path where the torrent content is downloaded.

- **State attribute**: `labels`
  - **Description**: The list of labels added to the torrent.

### Usage examples

Create a persistent notification when a torrent is downloaded.

```yaml
alias: Transmission torrent downloaded event
description: "Notify when a torrent is downloaded"
triggers:
  - trigger: state
    entity_id:
      - event.transmission_torrent
    not_from:
      - unavailable
conditions:
  - condition: state
    entity_id: event.transmission_torrent
    attribute: event_type
    state: "downloaded"
actions:
  - action: persistent_notification.create
    data:
      message: >
        {{ state_attr(trigger.entity_id, 'name') }} was downloaded
mode: single
```

## Event automation

The Transmission integration is continuously monitoring the status of torrents in the target client. Once a torrent is started or completed, an event is triggered on the Home Assistant Bus containing the torrent name, ID, and labels, which can be used with automations.

Possible events are:

- `transmission_downloaded_torrent`
- `transmission_started_torrent`
- `transmission_removed_torrent`

Inside the event, there is the name of the torrent that is started or completed and the path where the files are downloaded, as seen in the Transmission User Interface.

Example of an automation that notifies on successful download and removes the torrent from the client if the torrent has a label of Remove:

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

{% include integrations/actions.md %}

## Templating

### Attribute `torrent_info`

All `*_torrents` sensors, such as `sensor.transmission_total_torrents` or `sensor.transmission_started_torrents`, have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in {% my developer_states title="**Settings** > **Tools** > **States**" %} > `sensor.transmission_total_torrents` > **Attributes**, or by adding a [Markdown card](/dashboards/markdown/) to a dashboard with the following code:

```yaml
content: >
  {% set payload = state_attr('sensor.transmission_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}

  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, with {{ data.ratio }} ratio, {{ data.eta }} remaining {% endfor %}
type: markdown
```

## Removing the integration

This integration follows standard integration removal. After removal, your Transmission instance continues running with its current configuration.

{% include integrations/remove_device_service.md %}
