---
title: Flipr
description: Instructions on how to integrate your Flipr device within Home Assistant.
ha_category:
  - Sensor
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@cnico'
ha_domain: flipr
---

[Flipr](https://www.goflipr.com) is a smart pool monitor that publishes data to the cloud via SigFox.
Flipr sends data like ph, chlorine or temperature to a cloud server on a regular basis in order to monitor your pool.
This integration gives you access to this information on Home Assistant in addition to the vendor's smartphone application.

There is currently support for the following information within Home Assistant:

- Chlorine Level
- pH
- Water Temperature
- Red OX Level
- Last measure date
- pH Status Indicator
- Chlorine Status Indicator

## Prerequisites

You will need to use the standalone app for this device to register a username and password.

- [Google](https://play.google.com/store/apps/details?id=com.goflipr.flipr)
- [Apple](https://apps.apple.com/fr/app/flipr/id1225898851)

{% include integrations/config_flow.md %}

## Tips

It is recommended that you create your own card with the following sensors where \[fliprid\] is the id of your flipr:

- `sensor.flipr_[fliprid]_chlorine`
- `sensor.flipr_[fliprid]_ph`
- `sensor.flipr_[fliprid]_red_ox`
- `sensor.flipr_[fliprid]_water_temp`
- `sensor.flipr_[fliprid]_date_measure`

Leave `binary_sensor.flipr_[fliprid]_ph_status` and `binary_sensor.flipr_[fliprid]_chlorine_status` as badges.
