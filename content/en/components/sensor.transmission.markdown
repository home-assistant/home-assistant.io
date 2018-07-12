---
layout: page
title: "Transmission Sensor"
description: "Instructions on how to integrate Transmission sensors within Home Assistant."
date: 2015-04-25 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: transmission.png
ha_category: Downloading
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `transmission` platform allows you to monitor your downloads with [Transmission](http://www.transmissionbt.com/) from within Home Assistant and setup automation based on the information.

## {% linkable_title Setup %}

To use the monitoring, your transmission client needs to allow remote access. If you are running the graphical transmission client (transmission-gtk) go to **Edit** -> **Preferences** and choose the tab **Remote**. Check **Allow remote access**, enter your username and your password, and uncheck the network restriction as needed.

<p class='img'>
  <img src='{{site_root}}/images/components/transmission/transmission_perf.png' />
</p>

If everything is setup correctly, the details will show up in the frontend.

<p class='img'>
  <img src='{{site_root}}/images/components/transmission/transmission.png' />
</p>

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: transmission
    host: IP_ADDRESS
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
      - 'active_torrents'
      - 'paused_torrents'
      - 'total_torrents'
```

{% configuration %}
host:
  description: This is the IP address of your Transmission daemon, e.g., 192.168.1.32.
  required: true
  type: string
port:
  description: The port your Transmission daemon uses.
  required: false
  type: int
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
monitored_variables:
  description: Conditions to display in the frontend.
  required: false
  type: map
  keys:
    current_status:
      description: The status of your Transmission daemon.
    download_speed:
      description: The current download speed.
    upload_speed:
      description: The current upload speed.
    active_torrents:
      description: The current number of active torrents.
    paused_torrents:
      description: The current number of paused torrents.
    total_torrents:
      description: The total number of torrents present in the client.
{% endconfiguration %}

