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
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Kii Audio** {% term integration %} lets you control Kii Audio systems from Home Assistant over the local network. Home Assistant represents each Kii zone as a media player entity.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Kii system on the local network. If discovery does not work, you can usually find this in your router's client list or in the Kii app.
System ID:
  description: The unique identifier of your Kii system. You can find it in the system information for your setup.
{% endconfiguration_basic %}

## Supported functionality

The integration creates entities for each discovered Kii zone.

### Media player

The media player entity supports:

- Turning the zone on and off
- Changing volume
- Muting and unmuting
- Selecting the active source

## Discovery

Kii Audio systems are discovered on the local network using mDNS. If discovery is not available in your network setup, you can add the integration manually by entering the host and system ID.

## Supported devices

The integration supports Kii Audio systems running device software version `1_1_1` or newer.

## Known limitations

- Speaker-specific setup and calibration options are not exposed.
- Parametric filter configuration is not supported.
- Systems running device software versions older than `1_1_1` are not supported.
