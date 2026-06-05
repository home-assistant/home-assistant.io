---
title: Infrared
description: Instructions on how to use infrared entities in Home Assistant.
ha_category:
  - Infrared
ha_release: 2026.4
ha_quality_scale: internal
ha_domain: infrared
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

An infrared {% term entity %} represents either an infrared emitter or an infrared receiver. Emitters allow other integrations to send IR commands to control devices such as TVs, air conditioners, and other IR-controlled appliances. Receivers allow other integrations to react to IR signals captured by the hardware.

The **Infrared** {% term integration %} acts as an abstraction layer between IR hardware (such as ESPHome) and device-specific integrations that send commands to infrared-controlled devices, or receive signals from infrared remotes.

{% include integrations/building_block_integration.md %}

## The state of an infrared entity

The infrared entity is stateless in the traditional sense, as in, it cannot have a state like `on` or `off`. Instead, the state is a timestamp showing when the entity was last active:

- For an emitter, the state is the date and time the last IR command was sent.
- For a receiver, the state is the date and time the last IR signal was received.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

Because the {% term state %} of an infrared entity is a timestamp, it changes every time the entity is used. This means we can use it to track when the emitter last sent a command, or when the receiver last picked up a signal. The logbook can also show context about which integration or action triggered the IR event.

## Setting up devices that use infrared

When setting up an integration for an IR-controlled device (such as an LG TV via infrared), you will typically be asked to select which IR emitter and/or receiver to use during the configuration process. This allows you to choose the specific infrared entity that is physically positioned near your device.

The selected infrared entity must be provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter or receiver.
