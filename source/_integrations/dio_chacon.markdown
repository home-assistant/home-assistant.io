---
title: Dio Chacon
description: Instructions on how to integrate your Dio Chacon devices within Home Assistant.
ha_category:
  - Cover
ha_release: 2024.5
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@cnico'
ha_domain: dio_chacon
ha_platforms:
  - cover
ha_integration_type: integration
---

[Dio Chacon devices](https://chacon.com/en/) are connected home devices that can be controlled via RF 433 Mhz or Wifi.
This integration gives you access to the Wifi connection that allows in Home Assistant to list your devices and interact with them in real time like vendor's smartphone application does.

There is currently support for the following information within Home Assistant:

- Cover devices (get statuses, moves up, down, stop and moves to a given percentage)

## Prerequisites

You will need to use the standalone app for this device to register a username and password.

- [Google](https://play.google.com/store/apps/details?id=com.chacon.dioone)
- [Apple](https://apps.apple.com/fr/app/dio-one/id1493503504)

{% include integrations/config_flow.md %}

## Tips

You can use any Cover card like the great custom [hass-shutter-card](https://github.com/Deejayfool/hass-shutter-card) from Deejayfool.

A reload_state service is available in the integration. It may be useful not to have to restart your Home Assistant instance to force a refresh of the devices statuses (ex : cover moved during a wifi lost period).
