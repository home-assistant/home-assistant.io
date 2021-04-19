---
title: Overkiz by Somfy
description: Instructions on how to integrate Overkiz based platforms with Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Cover
  - Light
  - Lock
  - Scene
ha_release: 2021.6.0
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tetienne'
  - '@imicknl'
  - '@vlebourl'
ha_domain: overkiz
ha_platforms:
  - binary_sensor
  - cover
  - light
  - lock
  - scene
---

The `Overkiz by Somfy` integration platform is used by many different vendors, like Somfy, Hitachi and Atlantic. This integration will allow users to integrate their devices into Home Assistant using the Overkiz API.

## Supported hubs

- Atlantic Cozytouch
- Hitachi Hi Kumo
- Nexity Eugénie
- Rexel Energeasy Connect
- Somfy TaHoma Box
- Somfy Connexoon IO
- Somfy Connexoon RTS

## Supported devices

Over 6,000 devices from 60 brands compatible with the Overkiz platform. This integration will pull your devices and map them to the Home Assistant platforms.

{% include integrations/config_flow.md %}

## Options

Overkiz options are configured via Configuration -> Integrations -> Overkiz by Somfy -> Options.

### Update Interval

The Overkiz integration periodically retrieves new events. Change the update interval to a lower value if you want more frequent updates, for example when you also control your devices outside Home Assistant.

## Known limitations


### Z-Wave not supported

TODO

### Execution queue is full on gateway: #xxxx-xxxx-xxxx (soft limit: 10)

TODO

## Advanced
