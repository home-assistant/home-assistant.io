---
title: MyPermobil
description: Instructions on how to integrate Permobil wheelchair into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2023.12
ha_domain: permobil
ha_codeowners:
  - '@IsakNyberg'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The **MyPermobil** integration allows you to view various sensors with information about your Permobil wheelchair. For example: battery status, distance traveled, and number of seating adjustments. The values of the sensors may be delayed by several minutes and should not be relied on for any crucial applications. For the integration to work, you must ensure that _voice assistant linking_ is activated in the MyPermobil app. To do this, open the app and navigate to **Settings** > **My Account** > **Connection Settings**.

{% include integrations/config_flow.md %}

## Sensors

A total of 13 sensors are available:

- **Battery charge**
  The current battery state of the wheelchair as a percentage.
- **Battery health**
  The maximum amount of charge the battery can hold. Measured as a percentage of the battery's original capacity.
- **Charge time left**
  A number indicating how many hours the battery needs until it is fully charged. The battery needs to be charging for this sensor to work.
- **Distance left**
  The distance the wheelchair can travel on its current charge. This figure is an estimate and should not be relied upon.
- **Indoor drive time**
  The estimated number of hours of indoor drive time that is left on the current battery charge.
- **Battery max watt hours**
  The number of watt hours of energy stored in the battery when it is at maximum capacity.
- **Watt hours left**
  The number of watt hours of energy stored in the battery on its current charge.
- **Full charge distance**
  The distance the wheelchair can travel on a full charge. This figure is an estimate and should not be relied upon.
- **Distance traveled**
  The distance the wheelchair has traveled today.
- **Number of adjustments**
  The number of adjustments sessions today. Multiple different adjustment within a short time period are counted as a single sessions.
- **Highest number of adjustments**
  The highest number of adjustments ever recorded in a single day.
- **Longest distance traveled**
  The largest distance traveled ever recorded in a single day.
- **Is charging**
  Binary sensor that is true when the Permobil wheelchair is charging.
