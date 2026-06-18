---
title: Habitron
description: Instructions on how to integrate Habitron SmartHub into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Climate
  - Cover
  - Event
  - Light
  - Media player
  - Notifications
  - Number
  - Select
  - Sensor
  - Switch
  - Update
  - Voice (Assist)
ha_release: 2026.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@dneprojects'
ha_domain: habitron
ha_integration_type: hub
ha_platforms:
  - assist_satellite
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - event
  - light
  - media_player
  - notify
  - number
  - select
  - sensor
  - switch
  - text
  - update
ha_ssdp: true
ha_quality_scale: platinum
---

The **Habitron** {% term integration %} connects Home Assistant to a [Habitron](https://www.habitron.de/) SmartHub and the modules on its Smart-X bus. It exposes every input, output, sensor, dimmer, color LED, blind, climate controller, and notification target of a Habitron installation as a Home Assistant entity. State changes are delivered push-style over a long-lived WebSocket from the SmartHub, with a coordinator-driven heartbeat for liveness detection.

## Supported devices

The integration drives one **Habitron SmartHub** (SmartIP / SmartCenter) per config entry. Multiple SmartHubs can be added side by side. Through the SmartHub it talks to every module connected to the local Smart-X bus, including:

| Family | Examples | Recognized entities |
| --- | --- | --- |
| Smart Controller | SC, SC Mini, SC Touch | Binary sensors, switches, lights, dimmers, climate, notify, group-mode selectors |
| Smart Controller Touch | SC Touch | Adds camera, media player, Assist satellite, microphone switch, and on-device speech button |
| Smart Out modules | Out8, Out16, Out8R, Out8R-relais | Switches, dimmers, blinds/shutter covers, RGB CLEDs |
| Smart In modules | In16, In16 24V, In16 230V | Binary sensors, button events |
| Smart Detect / Climate | Motion + rain sensors, ekey, wind | Motion, moisture, illuminance, wind-speed sensors plus event entities |
| GSM | Smart GSM | Per-recipient SMS notify entities |
| Router & Hub | SmartHub, integrated router | Diagnostic sensors (CPU, disk, memory, voltages, currents, timeouts), restart/reboot buttons, firmware update |

Each module appears in Home Assistant as its own device under the SmartHub. Module discovery happens during entry setup via the SmartHub's own bus inventory—there is no per-module pairing step.

## Prerequisites

You need a reachable Habitron SmartHub (SmartIP or SmartCenter) on your network with its modules already configured in the SmartHub web UI. When Home Assistant and the SmartHub share the same network segment, the SmartHub is auto-discovered through SSDP and offered as a discovered integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host name or IP of SmartHub:
  description: "DNS name or IPv4 address of the SmartHub. Use the literal `local` when Home Assistant runs on the SmartCenter itself."
Token for WebSocket authentication:
  description: "Optional. Paste a long-lived access token from your Home Assistant profile here. Only required when SC Touch and Assist run on a remote Home Assistant instance (not on a SmartCenter)."
{% endconfiguration_basic %}

The coordinator's heartbeat interval is fixed at 10 seconds, in line with Home Assistant's guideline that polling intervals are not user-configurable. Parameters can be changed later with the **Reconfigure** option on the integration entry, which updates the connection without removing devices or entities.

## Supported functions

The integration covers every Habitron entity domain that Home Assistant offers, except those that are not exposed by the bus:

- **Light**: On/off outputs, brightness dimmers, RGB corner and ambient CLEDs with the native color picker.
- **Switch**: Digital outputs, flag bits, indicator LEDs, climate-controller toggle, microphone mode.
- **Cover**: Blinds/shutter pairs with optional tilt and an auto-stop fail-safe at the endpoints.
- **Binary sensor**: Switch inputs, motion and rain detectors, hub state, SC Touch listening status.
- **Event**: Short-press, long-press, and long-press-end on push-button inputs, and ekey fingerprint users.
- **Sensor**: Temperature, humidity, illuminance, air quality, wind, ekey identifier and finger, logic counters, hub diagnostics, channel currents/voltages/timeouts, hub status, frequencies, percentages.
- **Number**: Dimmer levels, analog outputs, climate set points.
- **Select**: Per-group daytime/alarm/group mode, log level.
- **Climate**: Per Smart Controller climate group, with target temperature and system-OK readback.
- **Button**: Hub restart/reboot, module reset, restart forward table, counters, router channel power-cycle, voice-input trigger, and collective/direct/visualization commands.
- **Notify**: Per-module text messages and per-GSM-number SMS targets.
- **Media player**: SC Touch audio playback queue with text-to-speech resolution, group seek, history, and volume control.
- **Assist satellite**: SC Touch microphone as an Assist satellite (speech-to-text, pipeline routing, text-to-speech playback).
- **Camera**: SC Touch front camera over WebRTC.
- **Update**: Per-module firmware update entity plus SC Touch APK update.

## Data updates

The integration combines **push** and **polling**:

- **Push updates**: The SmartHub publishes input/output/sensor changes over a persistent WebSocket as they happen. Entities update instantly, typically in under 100 ms.
- **Heartbeat polling**: Every 10 seconds the coordinator pulls the compact system status from the SmartHub. This serves as a liveness probe—entities become *unavailable* when the heartbeat fails (timeout, network error, or refused connection).

## Actions

All actions live on the `habitron` domain. When several SmartHubs are configured, singleton actions (everything except `update_entity` and `sc_system_command`) target the first-loaded entry and log a warning. Failure cases raise a validation error with a translated message.

| Action | Purpose | Fields |
| --- | --- | --- |
| `habitron.hub_restart` | Soft-restart the SmartHub service. | — |
| `habitron.hub_reboot` | Reboot the SmartHub host. | — |
| `habitron.rtr_restart` | Restart the Habitron router. | — |
| `habitron.mod_restart` | Restart one or all Habitron modules. | `mod_nmbr` (optional, 1–64; omit for all) |
| `habitron.save_module_smc` | Persist a module's rule/name definitions. | `mod_nmbr` (1–64) |
| `habitron.save_module_smg` | Persist a module's settings. | `mod_nmbr` (1–64) |
| `habitron.save_router_smr` | Persist the router settings. | — |
| `habitron.save_module_status` | Persist live module status. | `mod_nmbr` (1–64) |
| `habitron.save_router_status` | Persist router status (currents/voltages/timeouts). | — |
| `habitron.update_entity` | Inject a state-change event into a specific SmartHub for HA → Habitron round-trips. | `hub_uid`, `mod_nmbr`, `evnt_type`, `evnt_arg1`, `evnt_arg2`, optional `evnt_arg3`–`evnt_arg5`, optional `rtr_nmbr` |
| `habitron.sc_system_command` | Send a system command to an SC Touch client. | `target_device`, `command` (`restart` or `factory_reset`), optional `new_ip` |

## Examples

### Save a module backup once a week

```yaml
automation:
  - alias: "Habitron: weekly module backup"
    triggers:
      - trigger: time
        at: "03:30:00"
    conditions:
      - condition: time
        weekday:
          - sun
    actions:
      - repeat:
          count: 10
          sequence:
            - action: habitron.save_module_smc
              data:
                mod_nmbr: "{{ repeat.index }}"
            - action: habitron.save_module_smg
              data:
                mod_nmbr: "{{ repeat.index }}"
            - delay: "00:00:02"
      - action: habitron.save_router_smr
      - action: habitron.save_router_status
```

### Reboot an SC Touch when its CPU temperature gets too high

```yaml
automation:
  - alias: "SC Touch: emergency reboot when overheating"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.smarthub_cpu_temperature
        above: 75
        for: "00:05:00"
    actions:
      - action: habitron.sc_system_command
        data:
          target_device:
            - <device_id of the SC Touch>
          command: restart
```

### Route an Assist pipeline through the SC Touch microphone

The microphone is exposed as an `assist_satellite` entity. Add it as a satellite to your Assist pipeline in **Settings** > **Voice assistants** > **Assist** and pick your preferred speech-to-text, conversation, and text-to-speech engines. Playback returns to the SC Touch's built-in speaker.

## Known limitations

- **Module discovery is configuration-time**, not bus-side hot-plug. New modules must first be registered in the SmartHub web UI; afterwards, reloading the integration picks them up. Stale modules are removed from the device registry automatically on the next setup pass.
- **No re-authentication flow.** The optional WebSocket token can be edited through the **Reconfigure** option, but the SmartHub does not push authentication-failure states back into Home Assistant.
- **WebRTC and voice handlers register WebSocket commands globally.** After the last SmartHub is removed, those handlers stay registered for the lifetime of the Home Assistant process. The provider itself is unregistered on unload, so no stream is double-served.

## Troubleshooting

### Setup is stuck at "Setting up Habitron"

The SmartHub host name does not resolve, or the SmartHub port is unreachable. Switch to the IP form of the host and check firewalls between Home Assistant and the SmartHub.

### Every entity becomes unavailable shortly after a successful setup

This is a coordinator timeout—the SmartHub is no longer responding. Power-cycle the SmartHub and reload the integration. If it recovers within the next 10-second heartbeat, no further action is needed.

### An action raises "hub_not_found"

The `hub_uid` you passed does not match any loaded SmartHub's host string. Use the host you configured in the entry, not the SmartHub serial.

### sc_system_command raises "no_matching_module"

The selected device is not an SC Touch or it does not expose a stream. Pick the SC Touch device, not its sub-modules.

To capture more detail, enable debug logging from the integration entry's menu, or add the following to your {% term "`configuration.yaml`" %} file:

```yaml
logger:
  logs:
    homeassistant.components.habitron: debug
    homeassistant.helpers.update_coordinator: debug
```

A [diagnostics](/integrations/diagnostics/) download from the entry's menu is the fastest way to share state with the maintainer.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
