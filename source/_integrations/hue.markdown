---
title: Philips Hue
description: Instructions on setting up Philips Hue within Home Assistant.
ha_category:
  - Hub
  - Light
ha_iot_class: Local Push
featured: true
ha_release: '0.60'
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@balloob'
  - '@frenck'
  - '@marcelveldt'
ha_domain: hue
ha_ssdp: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - scene
ha_zeroconf: true
---

The Philips Hue integration allows you to control and monitor the lights and sensors connected to your Hue bridge.

There is currently support for the following device types within Home Assistant:

- Lights
- Motion sensors (including temperature and light level sensors)
- Hue remotes/switches (as device triggers for automations and also exposed as battery sensors when they are battery-powered)

{% include integrations/config_flow.md %}

## Lights for Hue zones and rooms

The Hue concept is based on Rooms and zones. Although the underlying Hue lights are exposed directly to Home Assistant it might also be useful to interact with the `grouped lights` of the Hue ecosystem, for example to turn all lights in a Hue group on/off at the same time.

Home Assistant creates lights for each Hue zone/room automatically but disables them by default.
If you'd like to use those `grouped lights`, you can enable them from Configuration --> Integrations --> Hue --> entities.

## Scenes

In the Hue concept you can create (dynamic) scenes for the lights within rooms and zones. These Hue scenes are automatically imported in Home Assistant and available as scene entities. Creating or editing Hue scenes in Home Assistant is not supported.


## Hue remotes and switches

Hue remotes such as the Dimmer Switch are stateless devices, meaning that they do not have a on/off state like regular entities in Home Assistant. Instead, such devices emit the event `hue_event` when a button is pressed. You can test what events come in using the event {% my developer_events title="developer tools in Home Assistant" %} and subscribe to the `hue_event`. Once you know what the event data looks like, you can use this to create automations.

## Support for legacy (V1) Hue bridges

Philips/Signify released a new version of their Hue bridge (square shape) and their legacy/V1 bridge (round shape) is now end of life and no longer supported by them. Home Assistant will continue to support the V1 Hue bridge as long as it is technically possible, although with a few limitations:

- Scene entities are not automatically created for V1 bridges. To call a Hue scene on a V1 bridge from Home Assistant we provide a service call to call a Hue scene by name.
- State updates for devices/entities on a V1 bridges are not received instantly but polled on interval.
- Light entities for Hue rooms are not automatically created for V1 bridges, you can opt-in for creating entities for rooms within the Integration's options.
