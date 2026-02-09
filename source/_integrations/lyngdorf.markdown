---
title: Lyngdorf
description: Instructions on how to integrate Lyngdorf audio processors into Home Assistant.
ha_category:
  - Media player
ha_release: 2026.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@fishloa'
ha_domain: lyngdorf
ha_ssdp: true
ha_platforms:
  - media_player
  - number
  - select
ha_integration_type: device
ha_quality_scale: bronze
---

The **Lyngdorf** {% term integration %} allows you to control Lyngdorf audio processors from Home Assistant. Lyngdorf Audio manufactures high-end audio processors and amplifiers featuring advanced room correction technology called RoomPerfect. With this integration, you can control power, volume, source selection, audio modes, and various audio processing parameters directly from Home Assistant.

## Supported devices

The following devices are known to be supported by the integration:

- MP-60 2.1

Other Lyngdorf models may work but have not been tested.

## Prerequisites

- Your Lyngdorf device must be connected to the same network as Home Assistant.
- UPnP/SSDP must be enabled on your network for automatic discovery.

{% include integrations/config_flow.md %}

If automatic discovery doesn't find your device, you can add the integration manually by entering the hostname or IP address of your Lyngdorf device.

## Supported functionality

### Entities

The **Lyngdorf** integration provides the following entities.

#### Media players

- **Lyngdorf**
  - **Description**: Controls your Lyngdorf device, including power, volume, mute, and source selection.

#### Numbers

- **Bass trim**
  - **Description**: Adjusts the bass level (-120 to +120 in 0.1 dB steps).
- **Treble trim**
  - **Description**: Adjusts the treble level (-120 to +120 in 0.1 dB steps).
- **Center trim**
  - **Description**: Adjusts the center channel level (-120 to +120 in 0.1 dB steps).
- **LFE trim**
  - **Description**: Adjusts the low frequency effects level (-120 to +120 in 0.1 dB steps).
- **Surround trim**
  - **Description**: Adjusts the surround speaker level (-120 to +120 in 0.1 dB steps).
- **Height trim**
  - **Description**: Adjusts the height speaker level (-120 to +120 in 0.1 dB steps).

#### Selects

- **Audio mode**
  - **Description**: Selects the audio processing mode (such as None, Stereo, or Party).
- **Source**
  - **Description**: Selects the active audio source for the main zone.
- **Zone source**
  - **Description**: Selects the source for zone 2 (if your device supports multiple zones).
- **RoomPerfect focus**
  - **Description**: Chooses the RoomPerfect listening position (such as Global or Focus 1).
- **RoomPerfect voicing**
  - **Description**: Selects the RoomPerfect voicing preset (such as Neutral, Music, or Relaxed).

## Data updates

The **Lyngdorf** integration uses local push to receive real-time updates from the device over a TCP connection. State changes on the device are pushed to Home Assistant immediately.

## Known limitations

- The integration has only been tested with the Lyngdorf MP-60 2.1. Other models may not support all features.
- Only local network control is supported. Remote access requires Home Assistant remote access to be configured.

## Troubleshooting

### Device not discovered

#### Symptom: "Device not found during setup"

The Lyngdorf device is not automatically discovered by Home Assistant.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure your Lyngdorf device is powered on and connected to the same network as Home Assistant.
2. Check that UPnP/SSDP is enabled on your router.
3. Try adding the device manually using its IP address.

### Connection issues

#### Symptom: "Device unavailable"

The integration shows as unavailable or disconnects frequently.

#### Resolution

To resolve this issue, try the following steps:

1. Ensure your Lyngdorf device has a static IP address or DHCP reservation.
2. Check your network for stability issues.
3. Verify that no firewall rules are blocking TCP communication between Home Assistant and your device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
