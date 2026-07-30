---
title: Lyngdorf
description: Instructions on how to integrate Lyngdorf audio processors into Home Assistant.
ha_category:
  - Media player
ha_release: 2026.8
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@fishloa'
ha_domain: lyngdorf
ha_ssdp: true
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: silver
---

The **Lyngdorf** {% term integration %} allows you to control [Lyngdorf] and [Steinway & Lyngdorf] audio processors and amplifiers from Home Assistant. Lyngdorf Audio is known for its RoomPerfect room correction technology. This integration lets you control power, volume, source selection, sound modes, and audio processing parameters.

[Lyngdorf]: https://lyngdorf.steinwaylyngdorf.com/electronics/
[Steinway & Lyngdorf]: https://steinwaylyngdorf.com/

## Supported devices

### Lyngdorf

- [MP-40](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-40/)
- MP-50
- [MP-60](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-mp-60/)
- [TDAI-1120](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-1120/)
- TDAI-2170
- [TDAI-3400](https://lyngdorf.steinwaylyngdorf.com/lyngdorf-tdai-3400/)

### Steinway & Lyngdorf

- P100
- P200
- P300

{% note %}
The MP-60 is the only model that has been tested in the wild so far. Other models should work but may not support all features. If you have a different model, please report any issues on [GitHub](https://github.com/home-assistant/core/issues).
{% endnote %}

## Prerequisites

- Your Lyngdorf device must be connected to the same network as Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Lyngdorf device."
{% endconfiguration_basic %}

## Supported functionality

### Media players

The integration creates two media player {% term entities %}:

- **Main zone**: Controls your Lyngdorf device, including power, volume, mute, source selection, and sound mode.
- **Zone B**: Controls the Zone B output, including power, volume, mute, and source selection.

## Data updates

The **Lyngdorf** integration uses local push to receive real-time updates from the device over a TCP connection. State changes on the device are pushed to Home Assistant immediately.

## Known limitations

- Only the MP-60 has been tested. Other models may not support all features.
- Only local network control is supported.

## Troubleshooting

### Device not discovered

#### Symptom: Device is not automatically discovered

The Lyngdorf device does not show up as a discovered device in Home Assistant.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure your Lyngdorf device is powered on and connected to the same network as Home Assistant.
2. Check that UPnP/SSDP is not blocked on your network.
3. Add the device manually using its IP address.

### Connection issues

#### Symptom: Device shows as unavailable

The integration shows as unavailable or disconnects frequently.

#### Resolution

To resolve this issue, try the following steps:

1. Ensure your Lyngdorf device has a static IP address or DHCP reservation.
2. Check your network for stability issues.
3. Verify that no firewall rules are blocking TCP communication between Home Assistant and your device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
