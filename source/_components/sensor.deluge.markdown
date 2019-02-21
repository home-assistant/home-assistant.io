---
layout: page
title: "Deluge Sensor"
description: "Instructions on how to integrate Deluge sensors within Home Assistant."
date: 2017-10-24 17:06
sidebar: true
comments: false
sharing: true
footer: true
logo: deluge.png
ha_category: Downloading
ha_release: 0.57
ha_iot_class: "Local Polling"
---


The `deluge` platform allows you to monitor your downloads with [Deluge](http://deluge-torrent.org/) from within Home Assistant and setup automation based on the information.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: deluge
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
```

{% configuration %}
host:
  required: true
  type: string
  description: This is the IP address of your Deluge daemon, e.g., 192.168.1.32.
port:
  required: false
  type: integer
  description: The port your Deluge daemon uses. Warning, this is not the port of the WebUI.
  default: 58846
name:
  required: false
  type: string
  default: Deluge
  description: The name to use when displaying this Deluge instance.
username:
  required: true
  type: string
  description: Your Deluge daemon username.
password:
  required: true
  type: string
  description: Your Deluge daemon password.
monitored_variables:
  required: true
  type: list
  description: Conditions to display in the frontend.
  keys:
    current_status:
      description: The status of your Deluge daemon.
    download_speed:
      description: The current download speed.
    upload_speed:
      description: The current upload speed.
  {% endconfiguration %}
