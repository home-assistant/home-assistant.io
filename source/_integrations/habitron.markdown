---
title: Habitron
description: Instructions on how to integrate Habitron SmartHub into Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@dneprojects'
ha_domain: habitron
ha_integration_type: hub
ha_platforms:
  - diagnostics
  - sensor
ha_ssdp: true
ha_quality_scale: bronze
---

The **Habitron** {% term integration %} connects Home Assistant to a [Habitron](https://www.habitron.de/) SmartHub and the modules on its Smart-X bus. This initial version exposes the Habitron measured values (temperature, humidity, illuminance, air quality, wind, logic counters, and hub diagnostics) as sensor entities; further entity types are being added in follow-up releases. State changes are delivered push-style by the SmartHub, with a coordinator-driven heartbeat for liveness detection.

## Supported devices

The integration drives one **Habitron SmartHub** (SmartIP / SmartCenter) per config entry; multiple SmartHubs can be added side by side. Through the SmartHub it reads every module connected to the local Smart-X bus (Smart Controllers, Smart In/Out/Detect/Climate modules, and the router/hub) and surfaces their measured values.

Each module appears in Home Assistant as its own device under the SmartHub. Module discovery happens during entry setup via the SmartHub's own bus inventory—there is no per-module pairing step.

## Prerequisites

You need a reachable Habitron SmartHub (SmartIP or SmartCenter) on your network with its modules already configured in the SmartHub web UI. When Home Assistant and the SmartHub share the same network segment, the SmartHub is auto-discovered through SSDP and offered as a discovered integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host name or IP of SmartHub:
  description: "DNS name or IPv4 address of the SmartHub. Use the literal `local` when Home Assistant runs on the SmartCenter itself."
Token for WebSocket authentication:
  description: "Optional. Paste a long-lived access token from your Home Assistant profile here. Only required when Home Assistant runs on a separate host from the SmartHub."
{% endconfiguration_basic %}

The coordinator's heartbeat interval is fixed at 10 seconds, in line with Home Assistant's guideline that polling intervals are not user-configurable. Parameters can be changed later with the **Reconfigure** option on the integration entry, which updates the connection without removing devices or entities.

## Supported functions

- **Sensor**: Temperature, humidity, illuminance, air quality, wind, ekey identifier and finger, logic counters, hub diagnostics, channel currents/voltages/timeouts, hub status, frequencies, and percentages.

## Data updates

The integration combines **push** and **polling**:

- **Push updates**: The SmartHub publishes input/output/sensor changes as they happen, so entities update promptly.
- **Heartbeat polling**: Every 10 seconds the coordinator pulls the compact system status from the SmartHub. This serves as a liveness probe—entities become *unavailable* when the heartbeat fails (timeout, network error, or refused connection).

## Actions

All actions live on the `habitron` domain. When several SmartHubs are configured, singleton actions (everything except `update_entity`) target the first-loaded entry and log a warning. Failure cases raise a validation error with a translated message.

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

## Known limitations

- **Module discovery is configuration-time**, not bus-side hot-plug. New modules must first be registered in the SmartHub web UI; afterwards, reloading the integration picks them up. Stale modules are removed from the device registry automatically on the next setup pass.
- **No re-authentication flow.** The optional access token can be edited through the **Reconfigure** option, but the SmartHub does not push authentication-failure states back into Home Assistant.

## Troubleshooting

### Setup is stuck at "Setting up Habitron"

The SmartHub host name does not resolve, or the SmartHub port is unreachable. Switch to the IP form of the host and check firewalls between Home Assistant and the SmartHub.

### Every entity becomes unavailable shortly after a successful setup

This is a coordinator timeout—the SmartHub is no longer responding. Power-cycle the SmartHub and reload the integration. If it recovers within the next 10-second heartbeat, no further action is needed.

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
