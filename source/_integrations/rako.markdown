---
title: Rako Controls Lights
description: Instructions on how to integrate Rako Controls Lights with Home Assistant.
ha_category:
  - Light
ha_release: 2021.2.0
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@marengaz'
ha_domain: rako
---


Rako smart lighting controls lead the way in providing state-of-the-art digital dimming technology, providing innovative solutions to meet the needs of a diverse range of applications.

The [Rako Controls Hub](https://rakocontrols.com/wkhub/) and its predecessor, the Rako Controls Bridge module, offer local network control of Rako's lighting modules. The Bridge has since been discontinued in favour of the Hub.

This integration was written for and tested with the Bridge. [Rako Controls' Integration documentation](https://rakocontrols.com/integration/system-integration/) specifies that the The Rako Hub may also be accessed using the same interface as the Bridge, although this is untested.


## Configuration

This integration can be configured using the integrations screen in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Rako's lighting modules will be automatically discovered by
Home Assistant. They are listed on the Entities page.


## Lights

This integration adds the Bridge device and all its light entities in Home Assistant, and
allows you to control the brightness, and its on/off state.


### Room Lights

Room Lights control all the light channels in a room. Only 5 states are possible for a room; scenes 1, 2, 3, 4 and off, these scenes have been linearly mapped to brightness levels between 100% and 0%.


### Channel Lights

Many Channel Lights may make up a room. Channel lights may be independently controlled from the room.

