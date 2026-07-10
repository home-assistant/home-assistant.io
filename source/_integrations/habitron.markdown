---
title: Habitron
description: Instructions on how to integrate Habitron SmartHub into Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dneprojects'
ha_domain: habitron
ha_integration_type: hub
ha_platforms:
  - sensor
ha_ssdp: true
ha_quality_scale: bronze
---

The **Habitron** {% term integration %} connects Home Assistant to a [Habitron](https://www.habitron.de/) SmartHub and the modules on its Smart-X bus. This initial version exposes the Habitron measured values (temperature, humidity, illuminance, air quality, wind, logic counters, and hub diagnostics) as sensor entities; further entity types are being added in follow-up releases. Values are refreshed by a coordinator-driven heartbeat that also detects when the SmartHub becomes unreachable.

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

The coordinator's heartbeat interval is fixed at 10 seconds, in line with Home Assistant's guideline that polling intervals are not user-configurable.

## Supported functions

- **Sensor**: Temperature, humidity, illuminance, air quality, wind, ekey identifier and finger, logic counters, hub diagnostics, channel currents/voltages/timeouts, hub status, frequencies, and percentages.

## Data updates

Every 10 seconds the coordinator pulls the compact system status from the SmartHub and refreshes the entities from it. The same heartbeat serves as a liveness probe—entities become *unavailable* when it fails (timeout, network error, or refused connection). Push-style delivery of individual bus events is planned for a follow-up release.

## Known limitations

- **Module discovery is configuration-time**, not bus-side hot-plug. New modules must first be registered in the SmartHub web UI; afterwards, reloading the integration picks them up. Stale modules are removed from the device registry automatically on the next setup pass.
- **No re-authentication flow.** The SmartHub does not push authentication-failure states back into Home Assistant.

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


## Removing the integration

This integration follows standard integration removal. No extra steps are required.
