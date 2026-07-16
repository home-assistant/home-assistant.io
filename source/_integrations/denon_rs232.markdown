---
title: Denon RS-232
description: Instructions on how to integrate Denon receivers via their RS-232 serial port into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 2026.5
ha_codeowners:
  - '@balloob'
ha_config_flow: true
ha_domain: denon_rs232
ha_platforms:
  - media_player
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Denon RS-232** {% term integration %} lets you control Denon receivers by connecting to their RS-232 serial port. By connecting the receiver to your Home Assistant server using a serial (RS-232) cable or a USB-to-serial adapter, you get local control with push-based state updates.

## Prerequisites

- A Denon receiver that supports control over its RS-232 serial port.
- A physical serial connection between your receiver and the system running Home Assistant, or ESPHome-based serial proxy.

{% include integrations/config_flow.md %}

## Supported functionality

The integration adds media player entities as an {% term entity %} for your receiver.

### Media player controls

For supported receivers, you can use Home Assistant to:

- Turn the receiver on and off
- Change the volume
- Mute and unmute the main zone
- Select the input source
- Select a tuner preset or FM frequency

### Zones

If your receiver supports additional zones, Home Assistant adds separate media player entities for those zones.

- Main zone
- Zone 2
- Zone 3

The available zones depend on your receiver model.

### Source selection

The available input sources depend on the receiver model you select during setup.

### Selecting tuner presets and frequencies

On the main zone, you can tune the receiver to a stored tuner preset or directly to
an FM frequency. This works from the media browser, which lists the tuner presets, or
by calling the `media_player.play_media` action with a `media_content_type` of `channel`.

The `media_content_id` can be a preset name from `A1` through `G8`:
```yaml
action: media_player.play_media
target:
  entity_id: media_player.denon_avr
data:
  media_content_type: channel
  media_content_id: "A1"
```

It can also be tuned to an FM frequency between `8750` (87.50 MHz) and `10800` (108.0 MHz):
```yaml
action: media_player.play_media
target:
  entity_id: media_player.denon_avr
data:
  media_content_type: channel
  media_content_id: "9870"
```
