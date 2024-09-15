---
title: EzBEQ
description: Instructions on how to integrate EzBEQ into Home Assistant.
ha_category:
  - Sensor
ha_release: '2024.8'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@iloveicedgreentea'
ha_domain: ezbeq
ha_platforms:
  - sensor
ha_integration_type: device
---

The EzBEQ allows for the automation and control of [EzBEQ](https://github.com/3ll3d00d/ezbeq). Its main purpose is to automate loading and unloading [BEQ](https://beqcatalogue.readthedocs.io/en/latest/) profiles.

## How It Works

It will listen for changes to the configured entities and, once conditions are met, will automatically search and load the correct BEQ profile. Once the Media Player stops playing, it will automatically unload the BEQ profile.

## Setup Instructions

First, you must have the [Plex](https://www.home-assistant.io/integrations/plex/) integration configured. Sensors from this integration is used to determine the correct BEQ profile to load. At a purely technical level, anything that supplies the required sensors *in the same format* will work, but Plex is the only one that has been tested.

Jellyfin support is in progress but not yet available.

For the `Source Media Player` field, you can technically use the Plex client Media Player entities, but it is recommended to use the native device Media Player as it will be much faster to update.

Once one of these integrations is set up, you need to match each sensor entity as listed. For example:

`sensor.plex_media_codec` -> `Codec Sensor`
`sensor.plex_edition` -> `Edition Sensor`

{% include integrations/config_flow.md %}

## Supported Devices

This integration supports the EzBEQ API. It should work with any device that is compatible with the EzBEQ API although it has only been tested with a MiniDSP 2x4HD.

### Sensor

This integration creates a sensor to show the currently loaded BEQ Profile.

`sensor.ezbeq_current_profile`
