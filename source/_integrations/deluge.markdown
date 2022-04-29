---
title: Deluge
description: Instructions on how to integrate Deluge within Home Assistant.
ha_category:
  - Downloading
  - Sensor
  - Switch
ha_release: 0.57
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: deluge
ha_platforms:
  - sensor
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: integration
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

To be able to use this integration, you have to enable the following option in deluge settings: Daemon > Allow Remote Connections

{% include integrations/config_flow.md %}

## Sensor

The `deluge` platform allows you to monitor your downloads with [Deluge](https://deluge-torrent.org/) from within Home Assistant and setup automation based on the information.

## Switch

The `deluge` switch platform allows you to control your [Deluge](https://deluge-torrent.org/) client from within Home Assistant. The platform enables you switch all your torrents in pause, and then unpause them all.
