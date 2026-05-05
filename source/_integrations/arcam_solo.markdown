---
title: Arcam Solo
description: Integrate Arcam Solo receivers with Home Assistant over a local serial connection.
ha_release: 2026.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@pantherale0'
ha_domain: arcam_solo
ha_integration_type: device
related:
  - url: https://developers.home-assistant.io/docs/documenting/standards
    title: Documentation standard
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/
    title: Integration Quality Scale - Rules
  - docs: /docs/glossary/
    title: Glossary
---

The **Arcam Solo** {% term integration %} lets you control compatible Arcam Solo receivers from Home Assistant using a local serial device path (for example `/dev/ttyUSB0`).

Use case: add your Arcam Solo receiver as a `media_player` to automate power, source selection, volume, and playback controls from Home Assistant dashboards and automations.

## Supported devices

The integration supports Arcam Solo receivers that can be reached through a serial connection.

## Prerequisites

1. Connect your Arcam Solo receiver to the Home Assistant host via serial (direct or adapter).
2. Identify the serial device path on your Home Assistant host (for example `/dev/ttyUSB0`).
3. Ensure the receiver is powered and responsive on the selected serial port.

{% include integrations/config_flow.md %}

During setup, you provide:

- **Name**: Friendly name used in Home Assistant.
- **Serial port**: Serial device path used to connect to the receiver.

{% configuration_basic %}
Name:
  description: Friendly name used for this Arcam Solo in Home Assistant.
Serial port / connection URI:
  description: Connection target used to reach the receiver. This can be a local serial device path (for example `/dev/ttyUSB0`) or an advanced URI such as a TCP serial bridge (`socket://192.168.1.50:2000`). ESPHome serial proxies also show up here automatically.
{% endconfiguration_basic %}

## Advanced setups

Besides direct local serial paths, advanced connection methods can be used when supported by your serial stack.

### TCP serial bridge (for example ser2net)

If your receiver is attached to another host exposing a serial-over-TCP bridge, use:

- `socket://<ip>:<port>`
- Example: `socket://192.168.1.50:2000`

Enter this value in the **Serial port / connection URI** field during setup.

## Troubleshooting advanced setups

- Verify the remote endpoint is reachable from Home Assistant.
- Confirm only one client is connected to the serial endpoint at a time.
- For TCP bridges, verify firewall/NAT rules and that the configured port matches your bridge service.
- If setup fails with cannot-connect, test with a direct local serial path first to isolate whether the issue is the proxy/bridge.

## Configuration options

This integration does not provide additional configuration options after setup.

## Supported functionality

The **Arcam Solo** integration provides the following entities.

### Media player

- **Receiver** (`media_player`)
  - **Description**: Main control entity for the Arcam Solo receiver.
  - **Core controls**: Turn on/off, source selection, set volume, volume up/down, mute/unmute.
  - **Playback controls** (source-dependent):
    - `CD`, `USB`: play, pause, stop, next/previous track, shuffle, repeat.
    - `DAB`, `FM`, `AM`: next/previous track mapped to station navigation.
  - **State behavior**:
    - Reports `off` when receiver is in standby.
    - For `CD`, maps playback states (playing/paused/loading/stopped, etc.) to media player states.
  - **Media metadata**:
    - Shows station title for `DAB`.
    - Shows track position and track numbers for `CD`/`USB` when available.

## Examples

Use this integration to:

- Build a single “living room audio” dashboard card for receiver power, source, and volume.
- Create automations that set source and volume for movie night.
- Trigger morning routines that power on the receiver and switch to radio.

{% include docs/paste_yaml_tip.md %}

### Start radio at a fixed time

```yaml
automation:
  - alias: "Start Arcam Solo radio in the morning"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: media_player.turn_on
        target:
          entity_id: media_player.receiver
      - action: media_player.select_source
        target:
          entity_id: media_player.receiver
        data:
          source: "DAB"
      - action: media_player.volume_set
        target:
          entity_id: media_player.receiver
        data:
          volume_level: 0.35
```
          
## Data updates

The **Arcam Solo** integration is classified as {% term local polling %}.  
It communicates locally over the configured serial port and does not use a cloud connection.

## Known limitations

- Setup is manual; automatic discovery is not available.
- A working local serial connection is required.
- The integration currently exposes a single media player entity.

## Troubleshooting

### Can’t set up the device

#### Symptom: “Failed to connect” / cannot connect

When adding the integration, setup fails with a cannot-connect error.

#### Description

Home Assistant could not open or communicate with the configured serial device.

#### Resolution

1. Verify the receiver is powered on.
2. Confirm the serial path is correct (for example `/dev/ttyUSB0`).
3. Check that the Home Assistant host has permission to access the serial device.
4. Ensure no other process is already using the same serial port.
5. Retry setup after reconnecting the serial adapter/cable.

### Integration is already configured

#### Symptom: setup aborts because device is already configured

#### Description

This integration allows one config entry per serial device path.

#### Resolution

- Remove the existing Arcam Solo entry for that serial path, or
- Add a different serial device path.

### Entity is unavailable

If the media player becomes unavailable, verify serial connectivity and that the receiver is still reachable on the same port.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
