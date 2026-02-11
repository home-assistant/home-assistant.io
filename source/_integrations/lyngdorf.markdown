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
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---

The **Lyngdorf** {% term integration %} allows you to control [Lyngdorf](https://lyngdorf.steinwaylyngdorf.com/electronics/) audio processors from Home Assistant. Lyngdorf Audio manufactures high-end audio processors and amplifiers featuring advanced room correction technology called RoomPerfect. With this integration, you can control power, volume, source selection, audio modes, and various audio processing parameters directly from Home Assistant.

## Supported devices

The following devices are supported by the integration:

- [MP-40](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-40/)
- MP-50
- [MP-60](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-60/)
- [TDAI-1120](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-1120/)
- TDAI-2170
- [TDAI-3400](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-3400/)

{% note %}
The MP-60 is the only model that has been tested in the wild so far. Other models should work but may not support all features. If you have a different model, please report any issues on GitHub.
{% endnote %}

## Prerequisites

- Your Lyngdorf device must be connected to the same network as Home Assistant.
- UPnP/SSDP must be enabled on your network for automatic discovery.

{% include integrations/config_flow.md %}

If automatic discovery doesn't find your device, you can add the integration manually by entering the hostname or IP address of your Lyngdorf device.

## Supported functionality

### Entities

The **Lyngdorf** integration provides the following entities.

#### Media players

- **Main zone**
  - Controls your Lyngdorf device, including power, volume, mute, source selection, and sound mode.
- **Zone B**
  - Controls the Zone B output, including power, volume, mute, and source selection.

#### Numbers

- **Lip sync**
  - Adjusts the lip sync delay (0 to 200 ms in 1 ms steps).
- **Trim bass**
  - Adjusts the bass level (-12.0 to +12.0 dB in 0.5 dB steps).
- **Trim treble**
  - Adjusts the treble level (-12.0 to +12.0 dB in 0.5 dB steps).
- **Trim centre**
  - Adjusts the center channel level (-10.0 to +10.0 dB in 0.5 dB steps).
- **Trim height**
  - Adjusts the height speaker level (-10.0 to +10.0 dB in 0.5 dB steps).
- **Trim LFE**
  - Adjusts the low frequency effects level (-10.0 to +10.0 dB in 0.5 dB steps).
- **Trim surround**
  - Adjusts the surround speaker level (-10.0 to +10.0 dB in 0.5 dB steps).

#### Selects

- **RoomPerfect position**
  - Chooses the RoomPerfect listening position (such as Global or Focus 1).
- **Voicing**
  - Selects the RoomPerfect voicing preset (such as Neutral, Music, or Relaxed).

#### Sensors

All sensor entities are diagnostic and report the current signal information from the device.

- **Audio information**
  - Shows the current audio signal format (such as PCM or Dolby Atmos).
- **Audio input**
  - Shows the active audio input connector.
- **Video information**
  - Shows the current video signal format.
- **Video input**
  - Shows the active video input connector.
- **Streaming source**
  - Shows the current streaming source name.
- **Zone B audio input**
  - Shows the active audio input for Zone B.
- **Zone B streaming source**
  - Shows the current streaming source for Zone B.

## Data updates

The **Lyngdorf** integration uses local push to receive real-time updates from the device over a TCP connection. State changes on the device are pushed to Home Assistant immediately.

## Known limitations

- The integration has only been tested with the Lyngdorf MP-60. Other models may not support all features.
- Only local network control is supported.

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
