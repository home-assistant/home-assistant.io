---
layout: page
title: "rtorrent Sensor"
description: "Instructions on how to integrate rtorrent sensors within Home Assistant."
date: 2018-10-14 05:40
sidebar: true
comments: false
sharing: true
footer: true
logo: rtorrent.png
ha_category: Downloading
ha_release: 0.80
ha_iot_class: "Local Polling"
---

The `rtorrent` platform allows you to monitor your downloads with [rtorrent](https://rakshasa.github.io/rtorrent/) from within Home Assistant and setup automation based on the information.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rtorrent
    url: 'http://<user>:<password>@<host>:<port>/RPC2'
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
```

This sensor requires the rtorrent XMLRPC API exposed on HTTP (by default only SCGI).
([arch-rtorrentvpn](https://github.com/binhex/arch-rtorrentvpn) provides that API under the URL `http://admin:rutorrent@127.0.0.1:9080/RPC2`)

Configuration variables:

- **url** (*Required*): The URL of the HTTP XMLRPC rtorrent endpoint.
- **name** (*Optional*): The name to use when displaying this rtorrent instance.
- **monitored_variables** array (*Required*): Conditions to display in the frontend.
  - **current_status**: The status of your rtorrent daemon.
  - **download_speed**: The current download speed.
  - **upload_speed**: The current upload speed.
