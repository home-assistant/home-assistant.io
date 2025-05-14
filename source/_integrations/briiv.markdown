---
title: Briiv
description: Instructions on how to integrate Briiv air purifier into Home Assistant.
ha_category:
  - Environment
  - Health
  - Sensor
  - Fan
ha_release: 2025.2.4
ha_iot_class: Local Polling
ha_codeowners:
  - '@JWFIVE'
  - '@FiveCreate'
ha_domain: briiv
ha_config_flow: true
ha_platforms:
  - sensor
  - fan
ha_integration_type: device
---

The **Briiv** {% term integration %} allows you to control a [Briiv air purifier](https://www.briiv.co.uk).

{% include integrations/config_flow.md %}

Upon initial installation of the **Briiv** integration, it will automatically scan for available devices on the network. As a fallback, it will allow manual entry of the devices’ IP addresses or a re-scan of the network. You will then be presented with a list of new devices and pre-existing ones. Select one and associate it with a room. Afterward, the device will be added and accessible via normal means.

Note that the device may have a schedule. Any interaction with Home Assistant will suspend the schedule for exactly one hour. After this lapse, the **Briiv** device will resume its internal schedule routine. If you want Home Assistant to determine the schedule behavior, it is recommended to remove all schedules from our native app and set desired states using Home Assistant.

It is also crucial to ensure that both Home Assistant and **Briiv** are connected to the same Wi-Fi network.

## Sensors

Currently, the integration supports the following sensors:

| Sensor metric        | Unit of measurement |
|----------------------|---------------------|
| Temperature          | °C                  |
| Humidity             | %RH                 |
| CO2                  | ppm                 |
| NO2                  | ppm                 |
| VOC                  | ppm                 |
| PM1, PM2.5, PM10     | µg/m³               |

## Actions

### Fan control actions

Available actions:
`fan.set_percentage`, `fan.turn_on`, `fan.turn_off`, `fan.increase_speed`, `fan.decrease_speed`
