---
title: rTorrent
description: Instructions on how to integrate rTorrent sensors within Home Assistant.
logo: rtorrent.png
ha_category:
  - Downloading
ha_release: 0.81
ha_iot_class: Local Polling
---

The `rtorrent` platform allows you to monitor your downloads with [rTorrent](https://rakshasa.github.io/rtorrent/) from within Home Assistant and setup automations based on the information.

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

This sensor requires the rTorrent XML-RPC API exposed on an HTTP interface.
Note that for security reasons, simply using the SCGI interface (default `localhost:5000`) of rTorrent won't work.
The [official reference](https://github.com/rakshasa/rtorrent/wiki/RPC-Setup-XMLRPC) describes how to set up that HTTP interface.

Alternatively, the [arch-rtorrentvpn](https://github.com/binhex/arch-rtorrentvpn) container can be used with `url` set to `http://admin:rutorrent@127.0.0.1:9080/RPC2`.

{% configuration %}
url:
  description: The URL to the HTTP endpoint of the rTorrent XML-RPC API.
  required: true
  type: string
name:
  description: The name to use when displaying this rTorrent instance.
  required: false
  type: string
monitored_variables:
  description: Conditions to be monitored.
  required: true
  type: list
  keys:
    current_status:
      description: The status of your rTorrent daemon.
    download_speed:
      description: The current download speed.
    upload_speed:
      description: The current upload speed.
{% endconfiguration %}
