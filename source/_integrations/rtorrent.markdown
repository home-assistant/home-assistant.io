---
title: rTorrent
description: Instructions on how to integrate rTorrent sensors within Home Assistant.
ha_category:
  - Downloading
ha_release: 0.81
ha_iot_class: Local Polling
ha_domain: rtorrent
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rtorrent` {% term integration %} allows you to monitor your downloads with [rTorrent](https://rakshasa.github.io/rtorrent/) from within Home Assistant and setup automations based on the information.

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rtorrent
    url: "http://<user>:<password>@<host>:<port>/RPC2"
    monitored_variables:
      - 'current_status'
      - 'download_speed'
      - 'upload_speed'
      - 'all_torrents'
      - 'stopped_torrents'
      - 'complete_torrents'
      - 'uploading_torrents'
      - 'downloading_torrents'
      - 'active_torrents'
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
    all_torrents:
      description: The number of all torrents.
    stopped_torrents:
      description: The number of torrents that are stopped.
    complete_torrents:
      description: The number of torrents that are fully downloaded.
    uploading_torrents:
      description: The number of torrents that are seeding.
    downloading_torrents:
      description: The number of torrents that are leeching.
    active_torrents:
      description: The number of torrents that are actively ( measurable speed ) leeching, seeding or both.
{% endconfiguration %}
