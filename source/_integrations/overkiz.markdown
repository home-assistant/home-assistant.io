---
title: Overkiz
description: Instructions on how to integrate hubs whom use the Overkiz platform with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
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
  - Water heater
ha_release: 2022.2
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@imicknl'
  - '@vlebourl'
  - '@tetienne'
  - '@nyroDev'
  - '@tronix117'
  - '@alexfp14'
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

### Zigbee, Z-Wave, Hue, and Sonos devices not supported

Even though most Overkiz hubs support adding Zigbee, Z-Wave, Hue, and Sonos devices, this isn't supported in the Overkiz integration. All these platforms have native integrations in Home Assistant which are more stable and feature-rich.

### Stateless RTS covers 

Covers that use the RTS protocol are stateless and do not report their state back to the hub. This means that Home Assistant will not know the state of the device after it has been controlled.

If you only control your RTS cover from Home Assistant, you can use the [template cover](/integrations/cover.template/) to create a stateful cover entity. This will allow you to keep track of the current state (open or closed) and use the cover in automations and scenes.

```yaml
cover:
  - platform: template
    covers:
      stateful_rts_test_shutter: # unique ID
        friendly_name: "Stateful RTS Test Shutter" # your name
        optimistic: true # default when no state is available
        open_cover:
          - action: cover.open_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
        close_cover:
          - action: cover.close_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
        stop_cover:
          - action: cover.stop_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
```

### Overkiz API limits

**Server busy, please try again later. (Too many executions)**

During peak hours, it could happen that the Overkiz platform is unable to execute your command. The integration will try to retry this command, however, this is not guaranteed to succeed.

**Execution queue is full on gateway**

The Overkiz API only supports 10 requests in its execution queue. If you try to command more devices at the same time, for example with a group, this will fail with `EXEC_QUEUE_FULL`. To work around this, you can create a scenario in the corresponding application and call that scenario instead after syncing it in the integration.

### Internet connectivity required

This integration communicates via the cloud-based Overkiz API in most cases. Depending on your hub and devices, there are options which communicate over your local network.

#### Local API via Somfy TaHoma Developer Mode

The Somfy TaHoma v2, Somfy Connexoon and Somfy TaHoma Switch support the [Somfy TaHoma Developer Mode (local API)](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode). During setup, you can choose **Local API**. This allows you to use the local API in Home Assistant. Climate devices are not supported via the Somfy TaHoma Developer Mode.

#### Local API via HomeKit Controller

If your hub (e.g. Somfy Connectivity Kit) supports HomeKit natively, your setup code will be added as a sensor in Home Assistant. Find your hub in Home Assistant and retrieve the value from the **HomeKit Setup Code** sensor. You can now configure the [HomeKit Controller](/integrations/homekit_controller/) integration in Home Assistant and benefit from local support. Only a [limited set of devices is supported](https://service.somfy.com/downloads/nl_v5/tahoma-homekitcompatibilitylist_eng.pdf).

#### Local API via Velux KLF200 hub

If you are only using Somfy IO-compatible devices, you could purchase a Velux KLF200 hub and use [the Velux integration](/integrations/velux/) which has a local API.
