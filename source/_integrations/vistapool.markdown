---
title: Vistapool
description: Monitor and control Hayward-branded pool controllers via the Hayward cloud API.
ha_category:
  - Sensor
  - Switch
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: vistapool
ha_platforms:
  - sensor
  - switch
ha_integration_type: hub
---

The **Vistapool** integration connects Home Assistant to **Hayward-branded pool controllers**, including AquaRite, Vistapool, Sugar Valley, Poolwatch, Kripsol, and Dagen devices.

It communicates with the official Hayward cloud API using real-time push updates (no polling), giving you instant visibility and control over your pool equipment.

{% include integrations/config_flow.md %}

## Prerequisites

- A supported Hayward-compatible pool controller
- A Wi-Fi module connected to the internet
- The controller must already be linked to your Hayward cloud account

## Supported devices

Any pool controller compatible with the Hayward / AquaRite cloud platform, including:

- Hayward AquaRite
- Vistapool
- Sugar Valley
- Poolwatch
- Kripsol
- Dagen

## Sensors

The integration provides the following sensors:

- **Water temperature**: current pool water temperature
- **pH**: current pH level (if pH module installed)
- **ORP / Rx**: redox potential in mV (if Rx module installed)
- **Chlorine (Cl)**: chlorine level (if Cl module installed)
- **CD**: conductivity level (if CD module installed)
- **UV**: UV module reading (if UV module installed)
- **Electrolysis / Hydrolysis**: current production level in gr/h
- **Filtration intel time**: daily runtime in Intel mode
- **Wi-Fi signal strength**: controller RSSI (diagnostic, disabled by default)

## Switches

The integration provides the following switch {% term entities %}, grouped by what they control.

### Pool equipment

- **Filtration**: toggle the filtration pump on or off.
- **Relay 1**, **Relay 2**, **Relay 3**, **Relay 4**: toggle the four generic relay outputs on the controller. The switch reads as on when the controller is currently driving the relay, even if the toggle was last set the other way. This is useful for automations that need to reflect the actual relay state, not just the last command sent.

### Electrolysis / hydrolysis cell

These are available if your controller has a hydrolysis or electrolysis module installed.

- **Electrolysis cover**: enable cover-mode production reduction (lowers cell output while the pool cover is closed).
- **Electrolysis boost**: enable boost dosing for shock chlorination.

### Mode toggles

- **Heating climate**: switch heating into climate mode. Available only if your controller supports HEAT mode.
- **Smart mode freeze**: enable freeze protection in Smart filtration mode. Available only if your controller supports SMART mode.

## Known limitations

- The integration requires an active internet connection as it communicates via the Hayward cloud API
- Sensor availability depends on which modules are physically installed on your controller

## Troubleshooting

### Entities show "Unavailable"

Check your internet connection and verify the controller is online in the Hayward app. The integration will automatically reconnect when the connection is restored.

### Reauth notification appears

Your credentials may have changed or expired. Select the notification to re-enter your Hayward username and password.

### Entities not updating

The integration uses real-time cloud push. If updates stop, try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
