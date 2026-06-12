---
title: Dyson Infrared
description: Integration to control Dyson Fan using an infrared transmitter.
ha_category:
  - Fan
ha_release: "2026.7" 
ha_iot_class: Assumed State 
ha_codeowners:
  - "@elax46"
ha_domain: dyson_infrared
ha_config_flow: true
ha_platforms:
  - fan
ha_integration_type: device
ha_quality_scale: bronze
---

The **Dyson Infrared** {% term integration %} lets you control a Dyson device using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm the current state of the device. The integration therefore uses assumed states.

## Prerequisites

Before setting up the Dyson Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your Dyson device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of Dyson device to control. Currently, only **Fan** is supported.
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported devices

The integration supports Dyson Fan that can be controlled via the standard Dyson infrared protocol.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
