---
layout: page
title: "Deluge Sensor"
description: "Instructions how to integrate Deluge sensors within Home Assistant."
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
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
```

Configuration variables:

- **host** (*Required*): This is the IP address of your Deluge daemon, eg. 192.168.1.32.
- **port** (*Optional*): The port your Deluge daemon uses. Defaults to 58846. Warning, this is not the port of the WebUI.
- **name** (*Optional*): The name to use when displaying this Deluge instance.
- **username** (*Optional*): Your Deluge username, if you use authentication.
- **password** (*Optional*): Your Deluge password, if you use authentication.
- **monitored_variables** array (*Required*): Conditions to display in the frontend.
  - **current_status**: The status of your Deluge daemon.
  - **download_speed**: The current download speed.
  - **upload_speed**: The current upload speed.
