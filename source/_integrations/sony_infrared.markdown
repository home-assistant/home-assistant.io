---
title: Sony Infrared
description: Control a Sony TV with an infrared emitter.
ha_release: 2026.12
ha_domain: sony_infrared
---

The **Sony Infrared** {% term integration %} lets you control a Sony TV using any infrared emitter you already have set up in Home Assistant.

Infrared only goes one way. Commands are sent to the TV, but the TV never reports back, so Home Assistant can't tell whether it's on or how loud it is. The integration uses assumed states.

If your Sony TV is on your network, the [Sony Bravia TV](/integrations/braviatv/) integration can read the TV's real state and is usually the better choice. This integration is for sets that aren't on the network, or when you'd rather not use the network API.

## Supported devices

The integration works with Sony TVs that use the standard Sony infrared command set (12-bit SIRC on address 1). That covers Bravia sets from the older KDL models through current Android TV and Google TV models, and many older Sony TVs before them.

## Prerequisites

{% include integrations/infrared_controlled.md %}

You need an infrared emitter pointed at the TV. For example, an ESPHome device with an IR LED.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: "The type of Sony device to control. Pick **TV**."
Infrared emitter:
  description: "The infrared emitter entity used to send commands to your TV. It must come from a hardware integration (such as ESPHome) that is already set up with an IR emitter."
{% endconfiguration_basic %}

## Supported functionality

### Media player

- **Sony TV**
  - **Description**: Represents the TV and controls it over infrared.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, next track (channel up), and previous track (channel down).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
