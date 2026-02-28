---
title: Infrared
description: Instructions on how to use infrared entities in Home Assistant.
ha_category:
  - Infrared
ha_release: 2026.3
ha_quality_scale: internal
ha_domain: infrared
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

An infrared {% term entity %} represents an infrared transmitter device, allowing other integrations to send IR commands to control devices such as TVs, air conditioners, and other IR-controlled appliances.

The **Infrared** {% term integration %} acts as an abstraction layer between IR emitter hardware (such as ESPHome) and device-specific integrations that provide control for IR-controlled devices (such as TVs or air conditioners from various brands).

{% include integrations/building_block_integration.md %}

## The state of an infrared entity

The infrared entity is stateless in the traditional sense, as in, it cannot have a state like `on` or `off`. Instead, the state of an infrared entity is a timestamp showing the date and time of the last time an IR command was sent through the transmitter.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of an infrared entity in Home Assistant is a timestamp, it changes every time an IR command is sent. This means we can use it to track when the transmitter was last used. The logbook can also show context about which integration or action triggered the transmission.

## Setting up devices that use infrared

When setting up an integration for an IR-controlled device (such as an LG TV via infrared), you will typically be asked to select which IR transmitter to use during the configuration process. This allows you to choose the specific infrared entity that is physically positioned to control your device.

The selected infrared entity must be provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
