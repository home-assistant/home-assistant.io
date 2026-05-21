---
title: Kii Audio
description: Instructions on how to integrate Kii Audio systems into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 2026.6
ha_codeowners:
  - '@KiiAudioGmbH'
ha_config_flow: true
ha_domain: kii_audio
ha_platforms:
  - media_player
  - number
  - select
  - switch
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Kii Audio** {% term integration %} lets you control Kii Audio systems from Home Assistant over the local network. Home Assistant represents each Kii zone as a device with entities for playback and zone configuration.

{% include integrations/config_flow.md %}

## Supported functionality

The integration creates entities for each discovered Kii zone.

### Media player

The media player entity supports:

- Turning the zone on and off
- Changing volume
- Muting and unmuting
- Selecting the active source

### Configuration entities

Depending on the capabilities reported by the Kii system, Home Assistant can also add entities for:

- Bass and treble tone controls
- Tone Control on or off
- Analogue input sensitivity
- Latency mode

## Discovery

Kii Audio systems are discovered on the local network using mDNS. If discovery is not available in your network setup, you can add the integration manually by entering the host and system ID.

## Supported devices

The integration supports Kii Audio systems running device software version `1_1_1` or newer.

## Known limitations

- Speaker-specific setup and calibration options are not exposed.
- Parametric filter configuration is not supported.
- Systems running device software versions older than `1_1_1` are not supported.
