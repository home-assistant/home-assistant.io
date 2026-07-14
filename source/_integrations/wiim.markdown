---
title: WiiM
description: Instructions on how to integrate WiiM devices into Home Assistant.
ha_category:
  - Media player
ha_domain: wiim
ha_zeroconf: true
ha_integration_type: device
ha_release: 2026.4
ha_codeowners:
  - '@Linkplay2020'
ha_config_flow: true
ha_platforms:
  - media_player
ha_iot_class: Local Push
ha_quality_scale: gold
---

The **WiiM** {% term integration %} allows you to control different [WiiM](https://www.wiimhome.com) devices from Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the WiiM device. You can find the device IP address in the WiiM app or your router.
{% endconfiguration_basic %}

## Supported devices

The integration supports WiiM and Audio Pro speakers and streamers that advertise the `_linkplay._tcp.local.` zeroconf service and expose the WiiM UPnP/HTTP control interfaces on the local network.

The following WiiM devices are known to be supported:

- WiiM Mini
- WiiM Pro
- WiiM Pro Plus
- WiiM Amp
- WiiM Amp Pro
- WiiM Ultra
- WiiM Amp Ultra
- WiiM CI MOD S
- WiiM CI MOD A80

Compatible Audio Pro devices using LinkPlay/WiiM firmware may also work when they expose the required zeroconf and local control interfaces. Other LinkPlay-based products are not guaranteed to be compatible.

## Prerequisites

- The WiiM device must be powered on and connected to the same local network as Home Assistant.
- Home Assistant must have a valid internal URL configured so the device can send local UPnP event callbacks.
- Local network discovery must allow mDNS/zeroconf traffic.

## Supported functionality

### Media Player

The media player entity gives you complete control over your WiiM device from Home Assistant. In addition to standard playback functionality, it offers:

- **Playback controls**: Control playback state, skip tracks, adjust volume, seek, select input sources, and set repeat or shuffle modes directly from the Home Assistant UI or automations.

- **Multiroom Audio**: Seamlessly group multiple WiiM devices to create synchronized multiroom playback. Use the standard Home Assistant services: `media_player.join` and `media_player.unjoin`.

- **Media Browsing**: Browse presets, playlists, and the device’s current playback queue, enabling dynamic selection of media from the Home Assistant interface.

## Data updates

WiiM updates are received locally through UPnP event subscriptions. Home Assistant also performs lightweight availability polling every 60 seconds so the entity becomes unavailable if the device stops responding.

Playback metadata, volume, mute state, source, grouping state, and transport capabilities are refreshed from the device and reflected on the media player entity.

## Examples

### Play a preset on a schedule

Use the following Blueprint to play a selected WiiM preset every day at a configured time:

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/wiim_play_preset.yaml" %}

### Play a preset

Use the `media_player.play_media` action with a numeric preset ID:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_wiim
data:
  media_content_type: music
  media_content_id: "1"

### Group two WiiM players

```yaml
action: media_player.join
target:
  entity_id: media_player.living_room_wiim
data:
  group_members:
    - media_player.kitchen_wiim
```

## Known limitations

- The integration only supports devices reachable on the local network.
- Some playback sources expose limited transport capabilities, so next, previous, repeat, or shuffle controls may appear or disappear depending on the active source.
- Direct URL playback and Home Assistant media source browsing require the device HTTP API to be available.
- Authentication and cloud account features from the WiiM app are not used by this integration.

## Troubleshooting

### Device is not discovered

Check that the WiiM device and Home Assistant are on the same local network and that mDNS/zeroconf traffic is not blocked by the router, VLAN, firewall, or access point.

### Entity is unavailable

Confirm the device is powered on and reachable from Home Assistant. If the device IP address changed and discovery does not update it automatically, use the integration reconfigure flow and enter the current host or IP address.

### Playback controls are missing

Available media player features depend on the active source and the capabilities reported by the device. Try changing source or starting playback from the WiiM app, then refresh Home Assistant.

## Use cases

- Include WiiM players in Home Assistant media dashboards.
- Start a favorite preset from an automation.
- Synchronize multiple WiiM players with the standard media player grouping actions.
- Use playback, volume, mute, and source state in automations.

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
