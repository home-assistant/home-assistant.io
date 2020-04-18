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
---

The `transmission` integration allows you to monitor your downloads with [Transmission](https://www.transmissionbt.com/) from within Home Assistant and setup automation based on the information.

## Setup

To use the monitoring, your transmission client needs to allow remote access. If you are running the graphical transmission client (transmission-gtk) go to **Edit** -> **Preferences** and choose the tab **Remote**. Check **Allow remote access**, enter your username and your password, and uncheck the network restriction as needed.

<p class='img'>
  <img src='{{site_root}}/images/integrations/transmission/transmission_perf.png' />
</p>

If everything is set up correctly, the details will show up in the frontend.

<p class='img'>
  <img src='{{site_root}}/images/integrations/transmission/transmission.png' />
</p>

## Configuration

Set up the integration through **Configuration** -> **Integrations** -> **Transmission**. For legacy support old transmission configuration is imported and set up as new integration. Make sure to remove `monitored_condiditions` as they are now automatically added to Home Assistant

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
transmission:
  host: 192.168.1.1
```

{% configuration %}
host:
  description: "This is the IP address of your Transmission daemon, e.g., `192.168.1.1` or `https://example.com/transmission/rpc`."
  required: true
  type: string
port:
  description: The port your Transmission daemon uses.
  required: false
  type: integer
  default: 9091
name:
  description: The name to use when displaying this Transmission instance in the frontend.
  required: false
  type: string
username:
  description: Your Transmission username, if you use authentication.
  required: false
  type: string
password:
  description: Your Transmission password, if you use authentication.
  required: false
  type: string
scan_interval:
  description: How frequently to query for new data. Defaults to 120 seconds.
  required: false
  type: integer
{% endconfiguration %}
  
## Integration Entities

The Transmission Integration will add the following sensors and switches.

Sensors:
- transmission_current_status: The status of your Transmission daemon.
- transmission_download_speed: The current download speed [MB/s].
- transmission_upload_speed: The current upload speed [MB/s].
- transmission_active_torrents: The current number of active torrents.
- transmission_paused_torrents: The current number of paused torrents.
- transmission_total_torrents: The total number of torrents present in the client.
- transmission_started_torrents: The current number of started torrents (downloading).
- transmission_completed_torrents: The current number of completed torrents (seeding)

Switches:
- transmission_switch: A switch to start/stop all torrents
- transmission_turtle_mode: A switch to enable turtle mode.


## Event Automation

The Transmission integration is continuously monitoring the status of torrents in the target client. Once a torrent is started or completed, an event is triggered on the Home Assistant Bus, which allows to implement any kind of automation.

Possible events are:

- transmission_downloaded_torrent
- transmission_started_torrent

Inside of the event, there is the name of the torrent that is started or completed, as it is seen in the Transmission User Interface.

Example of configuration of an automation with completed torrents:

{% raw %}
```yaml
- alias: Completed Torrent
  trigger:
    platform: event
    event_type: transmission_downloaded_torrent
  action:
    service: notify.telegram_notifier
    data_template:
      title: "Torrent completed!"
      message: "{{trigger.event.data.name}}"
```
{% endraw %}

## Services

### Service `add_torrent`

Adds a new torrent to download. It can either be a URL (HTTP, HTTPS or FTP), magnet link or a local file (make sure that the path is [white listed](/docs/configuration/basic/#whitelist_external_dirs)).

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


## Templating

### Attribute `torrent_info`

All `*_torrents` sensors e.g. `sensor.transmission_total_torrents` or `sensor.transmission_started_torrents` have a state attribute `torrent_info` that contains information about the torrents that are currently in a corresponding state. You can see this information in **Developer Tools** -> **States** -> `sensor.transmission_total_torrents` -> **Attributes**, or by adding a Markdown Card to Lovelace.

{% raw %}
```yaml
content: >
  {% set payload = state_attr('sensor.transmission_total_torrents', 'torrent_info') %}

  {% for torrent in payload.items() %} {% set name = torrent[0] %} {% set data = torrent[1] %}
  
  {{ name|truncate(20) }} is {{ data.percent_done }}% complete, {{ data.eta }} remaining {% endfor %}
type: markdown
```
{% endraw %}
