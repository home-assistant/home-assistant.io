---
title: madVR Envy
description: Instructions on how to integrate a madVR Envy into Home Assistant.
ha_category:
  - Button
  - Binary Sensor
  - Remote
  - Select
  - Sensor
  - Switch
ha_release: '2026.4'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@binarylogic'
ha_domain: madvr
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - remote
  - select
  - sensor
  - switch
ha_integration_type: device
---

The **madVR Envy** {% term integration %} allows for the automation and control of [madVR Envy devices](https://madvrenvy.com).

## Supported Devices

This integration supports all current madVR Envy models.

{% include integrations/config_flow.md %}

## Remote

The madVR Envy remote platform creates a [remote](/integrations/remote/) entity for the device.

`remote.send_command` supports:

- Remote key names directly (for example: `MENU`, `INFO`, `OK`, `BACK`, `LEFT`, `RIGHT`, `UP`, `DOWN`, `POWER`).
- Action aliases using `action:<name>` (for example: `action:restart`, `action:standby`, `action:power_off`, `action:hotplug`, `action:reload_software`, `action:tone_map_on`, `action:tone_map_off`).

```yaml
# Send keys
action: remote.send_command
data:
  command:
    - MENU
    - INFO
target:
  entity_id: remote.madvr_envy
```

```yaml
# Run predefined action
action: remote.send_command
data:
  command: action:restart
target:
  entity_id: remote.madvr_envy
```

### Services

The integration provides these domain services:

- `madvr.press_key`
- `madvr.activate_profile`
- `madvr.run_action`

### Select and switch entities

- `select.power_mode`: Select `on`, `standby`, or `off`.
- `select.active_profile`: Select profile across all known profile groups.
- Group-scoped profile selects are created when profile groups are available.
- `switch.tone_map`: Toggle tone mapping.

### Buttons

The integration exposes button entities for common one-shot actions, including:
- Power on / standby / power off
- Hotplug
- Restart
- Reload software
- Optional remote-key buttons (menu/info/ok/back)

### Binary sensor

The integration creates a `signal_present` binary sensor.

### Sensor

Sensors include:
- Power state
- GPU / HDMI input / CPU / mainboard temperatures
- Active profile
- Additional advanced sensors (`version`, `current_menu`, `aspect_ratio_mode`) can be enabled via options.

### Options

The options flow allows tuning:
- Sync/connect/command/read timeouts
- Reconnect backoff and jitter
- Advanced entity enable/disable
