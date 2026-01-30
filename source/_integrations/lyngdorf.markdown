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

The Lyngdorf integration allows you to control Lyngdorf audio processors from Home Assistant.

Lyngdorf Audio manufactures high-end audio processors and amplifiers featuring advanced room correction technology called RoomPerfect. This integration provides control over power, volume, source selection, audio modes, and various audio processing parameters.

## Prerequisites

- Your Lyngdorf device must be connected to the same network as Home Assistant
- UPnP/SSDP must be enabled on your network for automatic discovery

## Supported devices

This integration has been tested with the following Lyngdorf models:

- MP-60 2.1

Other Lyngdorf models may work but have not been tested.

{% include integrations/config_flow.md %}

## Manual configuration

If automatic discovery doesn't work, you can manually add the integration:

1. Go to **{% my integrations title="Settings > Devices & services" %}**.
2. In the bottom right corner, select **{% my config_flow_start domain=page.ha_domain title="Add integration" %}**.
3. Select **Manual configuration**.
4. Enter the hostname or IP address of your Lyngdorf device.
5. Select **Submit**.

## Entities

### Media player

The media player entity allows you to control your Lyngdorf device:

- Turn on/off
- Adjust volume
- Mute/unmute
- Select source
- View current media information

### Number

The integration creates number entities for adjusting audio trim levels:

- **Bass trim** - Adjust bass level (-120 to +120 in 0.1 dB steps)
- **Treble trim** - Adjust treble level (-120 to +120 in 0.1 dB steps)
- **Center trim** - Adjust center channel level (-120 to +120 in 0.1 dB steps)
- **LFE trim** - Adjust low frequency effects level (-120 to +120 in 0.1 dB steps)
- **Surround trim** - Adjust surround speaker level (-120 to +120 in 0.1 dB steps)
- **Height trim** - Adjust height speaker level (-120 to +120 in 0.1 dB steps)

### Select

The integration creates select entities for audio processing options:

- **Audio mode** - Select audio processing mode (None, Stereo, Party, etc.)
- **Source** - Select the active audio source for the main zone
- **Zone source** - Select the source for zone 2 (if your device supports multiple zones)
- **RoomPerfect focus** - Choose the RoomPerfect listening position (Global, Focus 1, etc.)
- **RoomPerfect voicing** - Select the RoomPerfect voicing preset (Neutral, Music, Relaxed, etc.)

## Actions

You can use standard media player actions with your Lyngdorf device:

### Action `media_player.turn_on`

Turn on your Lyngdorf device.

### Action `media_player.turn_off`

Turn off your Lyngdorf device.

### Action `media_player.volume_set`

Set the volume level.

```yaml
action: media_player.volume_set
target:
  entity_id: media_player.lyngdorf_mp_60
data:
  volume_level: 0.5
```

### Action `media_player.volume_mute`

Mute or unmute the device.

```yaml
action: media_player.volume_mute
target:
  entity_id: media_player.lyngdorf_mp_60
data:
  is_volume_muted: true
```

### Action `media_player.select_source`

Select an input source.

```yaml
action: media_player.select_source
target:
  entity_id: media_player.lyngdorf_mp_60
data:
  source: "Apple TV"
```

## Troubleshooting

### Device not discovered

**Symptom**: Your Lyngdorf device is not automatically discovered.

**Resolution**:
- Verify that your Lyngdorf device is powered on and connected to the same network as Home Assistant
- Check that UPnP/SSDP is enabled on your router
- Try adding the device manually using its IP address

### Connection issues

**Symptom**: The integration shows as unavailable or disconnects frequently.

**Resolution**:
- Ensure your Lyngdorf device has a static IP address or DHCP reservation
- Check your network for stability issues
- Verify that no firewall rules are blocking communication on TCP port (check your device's network settings)
