---
title: Vistapool
description: Monitor and control Vistapool-compatible pool controllers via the Vistapool cloud API.
ha_category:
  - Binary sensor
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: vistapool
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

The **Vistapool** integration connects Home Assistant to **Vistapool-compatible pool controllers**, including AquaRite, Vistapool, Sugar Valley, Poolwatch, Kripsol, and Dagen devices.

It communicates with the official Vistapool cloud API using real-time push updates (no polling), giving you instant visibility and control over your pool equipment.

{% include integrations/config_flow.md %}

## Prerequisites

- A supported Vistapool-compatible pool controller
- A Wi-Fi module connected to the internet
- The controller must already be linked to your Vistapool cloud account

## Supported devices

Any pool controller compatible with the Vistapool cloud platform, including:

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

## Binary sensors

The integration provides the following binary sensors, grouped by what they report.

State of pool equipment:

- **Filtration**: whether the filtration pump is running
- **Backwash**: whether a backwash cycle is in progress
- **Heating**: whether the heating relay is on
- **pH acid pump**: whether the acid dosing pump is currently active (if pH module installed)
- **pH base pump**: whether the base dosing pump is currently active (if pH module installed)
- **Chlorine pump**: whether the chlorine dosing pump is currently active (if chlorine module installed)
- **Redox pump**: whether the redox dosing pump is currently active (if redox module installed)
- **Hidro cover reduction**: whether the cell is running at reduced output because the cover is closed (if hydrolysis/electrolysis module installed)

Alarms and faults:

- **pH pump alarm**: pH pump fault (if pH module installed)
- **Hidro flow**: flow alarm on the cell (if hydrolysis/electrolysis module installed)
- **Hidro FL2**: secondary flow alarm reported by the chlorine module (if chlorine module installed)
- **Electrolysis low** / **Hydrolysis low**: production has dropped below the configured threshold. The name reflects which cell technology your controller reports (if hydrolysis/electrolysis module installed)
- **Dosing tank**: at least one installed dosing tank reports a low level

Diagnostic entities, disabled by default, which let you template against which modules are installed on the controller:

- **Conductivity module**
- **Chlorine module**
- **Redox module**
- **pH module**
- **Hidro module**
- **IO module**

To use any of the diagnostic entities, enable them in {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.

## Known limitations

- The integration requires an active internet connection as it communicates via the Vistapool cloud API
- Sensor availability depends on which modules are physically installed on your controller

## Troubleshooting

### Entities show "Unavailable"

Check your internet connection and verify the controller is online in the Vistapool app. The integration will automatically reconnect when the connection is restored.

### Reauth notification appears

Your credentials may have changed or expired. Select the notification to re-enter your Vistapool username and password.

### Entities not updating

The integration uses real-time cloud push. If updates stop, try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
