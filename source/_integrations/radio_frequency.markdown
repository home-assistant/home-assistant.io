---
title: Radio frequency
description: Instructions on how to use radio frequency entities in Home Assistant.
ha_category:
  - Radio Frequency
ha_release: 2026.5
ha_quality_scale: internal
ha_domain: radio_frequency
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

A radio frequency (RF) {% term entity %} represents a radio frequency transmitter device, allowing other integrations to send RF commands to control devices such as remote outlets, garage doors, string lights, and other RF-controlled appliances.

The **Radio Frequency** {% term integration %} acts as an abstraction layer between RF transmitter hardware (such as ESPHome) and device-specific integrations that provide control for RF-controlled devices.

{% include integrations/building_block_integration.md %}

## The state of a radio frequency entity

The radio frequency entity is stateless in the traditional sense, as in, it cannot have a state like `on` or `off`. Instead, the state of a radio frequency entity is a timestamp showing the date and time when an RF command was last sent through the transmitter.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of a radio frequency entity in Home Assistant is a timestamp, it changes every time an RF command is sent. This means we can use it to track when the transmitter was last used. The logbook can also show context about which integration or action triggered the transmission.

## Setting up devices that use radio frequency

When setting up an integration for an RF-controlled device (such as the Honeywell String Lights), you will typically be asked to select which RF transmitter to use during the configuration process. This allows you to choose the specific radio frequency entity that is physically positioned to control your device.

The selected radio frequency entity must be provided by a hardware integration (such as ESPHome) that has already been set up with an RF transmitter compatible with the frequency and modulation that your device uses.
