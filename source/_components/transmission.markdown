---
layout: page
title: "Transmission"
description: "Instructions on how to integrate Transmission within Home Assistant."
date: 2018-12-12 22:44
sidebar: true
comments: false
sharing: true
footer: true
logo: transmission.png
ha_category: 
  - Downloading
  - Switch
  - Sensor
ha_release: 0.87
ha_iot_class: "Local Polling"
redirect_from:
  - /components/switch.transmission/
  - /components/sensor.transmission/
---

The `transmission` component allows you to monitor your downloads with [Transmission](http://www.transmissionbt.com/) from within Home Assistant and setup automation based on the information.

## {% linkable_title Setup %}

To use the monitoring, your transmission client needs to allow remote access. If you are running the graphical transmission client (transmission-gtk) go to **Edit** -> **Preferences** and choose the tab **Remote**. Check **Allow remote access**, enter your username and your password, and uncheck the network restriction as needed.

<p class='img'>
  <img src='{{site_root}}/images/components/transmission/transmission_perf.png' />
</p>

If everything is set up correctly, the details will show up in the frontend.

<p class='img'>
  <img src='{{site_root}}/images/components/transmission/transmission.png' />
</p>

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
transmission:
  host: 192.168.1.1
```

{% configuration %}
host:
  description: "This is the IP address of your Transmission daemon, e.g., `192.168.1.1`."
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
turtle_mode:
  description: If enabled, it creates a switch entity to control the 'Alternative Speed Limits' (aka 'Turtle mode') setting.
  required: false
  type: boolean
scan_interval:
  description: How frequently to query for new data. Defaults to 120 seconds.
  required: false
  type: integer
monitored_conditions:
  type: integer
  description: "List of monitored conditions. Possible values are:"
  required: false
  type: map
  keys:
    current_status:
      description: The status of your Transmission daemon.
    download_speed:
      description: The current download speed [MB/s].
    upload_speed:
      description: The current upload speed [MB/s].
    active_torrents:
      description: The current number of active torrents.
    paused_torrents:
      description: The current number of paused torrents.
    total_torrents:
      description: The total number of torrents present in the client.
    started_torrents:
      description: The current number of started torrents (downloading).
    completed_torrents:
      description: The current number of completed torrents (seeding)
{% endconfiguration %}

## {% linkable_title Event Automation %}

The Transmission component is continuously monitoring the status of torrents in the target client. Once a torrent is started or completed, an event is triggered on the Home Assistant Bus, which allows to implement any kind of automation.

Possible events are:
 - transmission_downloaded_torrent
 - transmission_started_torrent
 
Inside of the event, there is the name of the torrent that is started or completed, as it is seen in the Transmission User Interface.

Example of configuration of an automation with completed torrents:

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
