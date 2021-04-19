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

If you use a Somfy hub, you could also try the [Somfy integration](/integrations/somfy/) which utilises the official API.

## Supported devices

Over 6000 devices from 60 brands are compatible with the Overkiz platform. This integration will retrieve your devices and map them to the supported Home Assistant platforms.

{% include integrations/config_flow.md %}

## Options

Overkiz options are configured via Configuration -> Integrations -> Overkiz by Somfy -> Options.

### Update Interval

The Overkiz integration periodically retrieves new events. Change the update interval to a lower value if you want more frequent updates, for example when you also control your devices outside Home Assistant.

## Known limitations

### Z-Wave, Hue and Sonos not supported

Even though Overkiz supports adding Z-Wave, Hue and Sonos devices, this isn't supported in the Overkiz integration. All these platforms have native integrations in Home Assistant which are more stable and have more features.

### Overkiz API limits

**Execution queue is full on gateway: #xxxx-xxxx-xxxx (soft limit: 10)**

The Overkiz has a limit of 10 actions that can be executed in parallel. Currently this can only be solved by adding a time-out in between your executions, where you need to take the execution time into account.

**Server busy, please try again later. (Too many executions)**

During peak hours, it could happen that the Overkiz platform is unable to execute your command. The integration will try to retry this command, however this is not guaranteed to succeed. 

### Internet connectivity required

This integration communicates via the cloud based Overkiz API, since Overkiz doesn't expose a local API on their hubs. If you are only using Somfy IO compatible devices, you could purchase a Velux hub and use to [the Velux integration](/integrations/velux/) which has a local API.
