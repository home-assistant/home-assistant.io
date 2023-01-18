---
title: PoolSense
description: Instructions on how to integrate your PoolSense device within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.113
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@haemishkyd'
ha_domain: poolsense
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

[PoolSense](https://www.proautomation.co/) is a smart pool monitor that publishes data to the cloud via SigFox. PoolSense eliminates the time and effort spent fixing what’s wrong with your pool water. Accurate sensors, in the PoolSense smart pool monitor, send data to a cloud server in timed intervals. 

There is currently support for the following information within Home Assistant:

- Chlorine Level
- pH
- Water Temperature
- Battery
- pH Status Indicator
- Chlorine Status Indicator

## Prerequisites

You will need to use the associated standalone app for this device to register a username and password.

- [Google](https://play.google.com/store/apps/details?id=co.proautomation.app.poolSense&hl=en_ZA)
- [Apple](https://apps.apple.com/us/app/poolsense/id1288535609)

{% include integrations/config_flow.md %}

## Tips

It is recommended that you create your own card with the following sensors:

- `sensor.poolsense_chlorine`
- `sensor.poolsense_ph`
- `sensor.poolsense_battery`
- `sensor.poolsense_temperature`
- `sensor.poolsense_last_seen`

Leave `sensor.poolsense_ph_status` and `sensor.poolsense_chlorine_status` as badges.
