---
title: Vistapool
description: Monitor and control Hayward-branded pool controllers via the Hayward cloud API.
ha_category:
  - Number
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: vistapool
ha_platforms:
  - number
  - sensor
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

## Numbers

The integration provides the following adjustable values, grouped by what they configure. Each is exposed as a configuration {% term entity %}, so they appear under the **Configuration** section of the device page rather than in the main controls.

### Chemical setpoints

- **Redox setpoint**: target redox potential in mV (500–800). Available if a redox module is installed.
- **pH minimum**: lower bound of the pH target window (6.00–8.00). Available if a pH module is installed.
- **pH maximum**: upper bound of the pH target window (6.00–8.00). Available if a pH module is installed.
- **Electrolysis setpoint**: target cell production in g/h. The maximum value is read from the cell's hardware-reported maximum, so the slider adapts automatically to different cell sizes. Available if a hydrolysis or electrolysis module is installed.

### Temperature targets

- **Intel temperature**: target temperature used by INTEL filtration mode (5–40 °C).
- **Heating minimum temperature**, **Heating maximum temperature**: lower and upper bounds of the HEAT mode temperature range (5–40 °C each). Available only if your controller supports HEAT mode.
- **Smart minimum temperature**, **Smart maximum temperature**: lower and upper bounds of the SMART mode temperature range (5–40 °C each). Available only if your controller supports SMART mode.

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
