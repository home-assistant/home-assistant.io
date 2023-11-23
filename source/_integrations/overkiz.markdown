---
title: Overkiz
description: Instructions on how to integrate hubs whom use the Overkiz platform with Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
  - Button
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Number
  - Scene
  - Select
  - Sensor
  - Siren
  - Switch
  - Water Heater
ha_release: 2022.2
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@imicknl'
  - '@vlebourl'
  - '@tetienne'
  - '@nyroDev'
ha_domain: overkiz
ha_dhcp: true
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - water_heater
ha_integration_type: hub
---

The Overkiz (by Somfy) integration platform is used by many different vendors, like Somfy, Hitachi, and Atlantic. This integration will allow users to integrate their devices into Home Assistant using the Overkiz API.

## Supported hubs

- Atlantic Cozytouch
- Hitachi Hi Kumo
- Nexity Eugénie
- Somfy Connectivity Kit
- Somfy Connexoon IO _(local API available)_
- Somfy Connexoon RTS _(local API available)_
- Somfy TaHoma _(local API available)_
- Somfy TaHoma Beecon _(local API available)_
- Somfy TaHoma Switch _(local API available)_
- Thermor Cozytouch

## Supported devices

Over 6000 devices from 60 brands are compatible with the Overkiz platform. This integration will retrieve your devices and map them to the relevant Home Assistant platforms.

{% include integrations/config_flow.md %}

## Known limitations

### Z-Wave, Hue and Sonos not supported

Even though most Overkiz hubs support adding Z-Wave, Hue, and Sonos devices, this isn't supported in the Overkiz integration. All these platforms have native integrations in Home Assistant which are more stable and feature-rich.

### Overkiz API limits

**Server busy, please try again later. (Too many executions)**

During peak hours, it could happen that the Overkiz platform is unable to execute your command. The integration will try to retry this command, however, this is not guaranteed to succeed.

### Internet connectivity required

This integration communicates via the cloud-based Overkiz API in most cases. Depending on your hub and devices, there are options which communicate over your local network.

#### Local API via Somfy TaHoma Developer Mode

The Somfy TaHoma v2, Somfy Connexoon and Somfy TaHoma Switch support the [Somfy TaHoma Developer Mode (local API)](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode). During setup, you can choose **Local API**. This allows you to use the local API in Home Assistant. Climate devices are not supported via the Somfy TaHoma Developer Mode.

#### Local API via HomeKit Controller

If your hub (e.g. Somfy Connectivity Kit) supports HomeKit natively, your setup code will be added as a sensor in Home Assistant. Find your hub in Home Assistant and retrieve the value from the **HomeKit Setup Code** sensor. You can now configure the [HomeKit Controller](/integrations/homekit_controller/) integration in Home Assistant and benefit from local support. Only a [limited set of devices is supported](https://service.somfy.com/downloads/nl_v5/tahoma-homekitcompatibilitylist_eng.pdf).

#### Local API via Velux KLF200 hub

If you are only using Somfy IO-compatible devices, you could purchase a Velux KLF200 hub and use [the Velux integration](/integrations/velux/) which has a local API. 
