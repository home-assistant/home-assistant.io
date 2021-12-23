---
title: Overkiz (by Somfy)
description: Instructions on how to integrate Overkiz based platforms with Home Assistant.
ha_category:
  - Hub
  - Sensor
ha_release: 2022.1.0
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tetienne'
  - '@imicknl'
  - '@vlebourl'
ha_domain: overkiz
ha_platforms:
  - sensor
---

The Overkiz (by Somfy) integration platform is used by many different vendors, like Somfy, Hitachi and Atlantic. This integration will allow users to integrate their devices into Home Assistant using the Overkiz API.

## Supported hubs

- Atlantic Cozytouch
- Hitachi Hi Kumo
- Nexity Eugénie
- Rexel Energeasy Connect
- Somfy Connexoon IO
- Somfy Connexoon RTS
- Somfy TaHoma
- Somfy TaHoma Switch [(instructions)](#tahoma-switch)
- Thermor Cozytouch

If you own a Somfy hub, you could also use the [Somfy integration](/integrations/somfy/) which uses the official API.

### TaHoma Switch

Multiple users reported that the TaHoma Switch will work with this integration **after** you create a scene in the TaHoma app and wait for a few hours.

## Supported devices

Over 6000 devices from 60 brands are compatible with the Overkiz platform. This integration will retrieve your devices and map them to the relevant Home Assistant platforms.

{% include integrations/config_flow.md %}

## Known limitations

### Z-Wave, Hue and Sonos not supported

Even though most Overkiz hubs supports adding Z-Wave, Hue and Sonos devices, this isn't supported in the Overkiz integration. All these platforms have native integrations in Home Assistant which are more stable and feature rich.

### Overkiz API limits

**Execution queue is full on gateway: #xxxx-xxxx-xxxx (soft limit: 10)**

The Overkiz has a limit of 10 actions that can be executed in parallel. Currently this can only be solved by adding a time-out in between your executions, where you need to take the execution time into account.

**Server busy, please try again later. (Too many executions)**

During peak hours, it could happen that the Overkiz platform is unable to execute your command. The integration will try to retry this command, however this is not guaranteed to succeed. 

### Internet connectivity required

This integration communicates via the cloud based Overkiz API, since Overkiz doesn't expose a local API on their hubs. If you are only using Somfy IO compatible devices, you could purchase a Velux KLF200 hub and use to [the Velux integration](/integrations/velux/) which has a local API.

#### Local API via HomeKit Controller

If your hub (e.g. Somfy TaHoma) supports HomeKit natively, your setup code will be added as a sensor in Home Assistant. Look up your hub in Home Assistant and retrieve the value from the 'HomeKit Setup Code' sensor. You can now configure the [HomeKit Controller](/integrations/homekit_controller/) integration in Home Assistant and benefit from local support.
