---
title: Control4
description: Instructions on adding a Control4 system to Home Assistant.
ha_release: '0.114'
ha_category:
  - Climate
  - Cover
  - Light
  - Media Player
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@lawtancool'
  - '@davidrecordon'
ha_domain: control4
ha_ssdp: true
ha_platforms:
  - climate
  - cover
  - light
  - media_player
ha_integration_type: hub
---

The **Control4** {% term integration %} allows you to control and monitor lights, Room Media, cover, and climate devices from your local Control4 system. Your Control4 controller must be running OS 3.0+.

## Prerequisites

Before setting up, you should assign a static IP address/DHCP reservation on your router to your Control4 controller. Home Assistant must be able to communicate with the controller over the local network; 4Sight remote access is not supported.

The username and password required for this integration are the same credentials you use to log in to the Control4 mobile app and the customer portal at [https://customer.control4.com/](https://customer.control4.com/).

{% include integrations/config_flow.md %}

## Data updates

This integration is mostly push-based over the local network. State changes are delivered in real time via a WebSocket connection to the Control4 Director. The media player platform is the only exception. It polls a small set of room state (power, volume, mute, source, and
playback status) on a fixed 5-second interval, since Control4 does not push updates for that data.

During setup or when the integration reloads, the integration contacts the Control4 cloud to obtain a short-lived local token. The token has an expiry date and is refreshed automatically in the background.
