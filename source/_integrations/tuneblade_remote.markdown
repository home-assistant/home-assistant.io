---
title: TuneBlade Remote
description: Integrate TuneBlade AirPlay-connected devices with Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 2025.08.1
ha_domain: tuneblade_remote
ha_codeowners:
  - '@spycle'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The **TuneBlade Remote** integration allows Home Assistant to control [TuneBlade](http://www.tuneblade.com/) — a Windows application that streams system audio to AirPlay receivers.

Each AirPlay device connected to TuneBlade is exposed in Home Assistant as a [Media Player](/integrations/media_player/) entity. You can toggle power (connect/disconnect) and control volume for each.

If the TuneBlade master control options are enabled, a separate "master" control is also available as an additional entity.


{% include integrations/config_flow.md %}

## Requirements

Before using this integration, ensure the following settings are enabled in the TuneBlade application:

- ✅ **Enable Remote Control**  
- ✅ **Show master control options** *(optional, but recommended)*

These can be found in TuneBlade’s preferences window.

## Entities

### Media Player

For each AirPlay device connected to TuneBlade, a `media_player` entity is created.

- **Features**:
  - Toggle connection (on/off)
  - Volume control
  - **Master Media Player** (optional):
    - Exposed when `Show master control options` is enabled in TuneBlade.

## Troubleshooting

### TuneBlade is not automatically discovered

- Restart TuneBlade — its Bonjour broadcast may stop after extended uptime.
- Ensure **Enable Remote Control** is checked in TuneBlade settings.

### Master volume is not displayed

- Ensure **Show master control options** is checked in TuneBlade settings.

## Debugging

To enable debug logging for this integration, add the following to your `configuration.yaml`:

```yaml
logger:
  logs:
    pytuneblade: debug
    homeassistant.components.tuneblade_remote: debug
