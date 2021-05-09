---
title: Geocaching
description: Instructions on how to integrate Geocaching accounts within Home Assistant.
ha_category:
  - Sensor
ha_release: 2021.6.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Sholofly'
  - '@reinder83'
ha_domain: geocaching
ha_platforms:
  - sensor
---

Geocaching is a real-world, outdoor adventure that is happening all the time, all around the world. To play, participants use the Geocaching app and/or a GPS device to navigate to cleverly hidden containers called geocaches.

The Geocaching integration in Home Assistant pulls data from your [Geocaching.com](https://www.geocaching.com/) account.

{% include integrations/config_flow.md %}

## Sensors

The following sensors are available for each account:

- Username
- Reference code
- Find count
- Hide count
- Favorite points
- Souvenir count
- Awarded favorite points
