---
title: Vistapool
description: Monitor and control Hayward-branded pool controllers via the Hayward cloud API.
ha_category:
  - Sensor
ha_release: "2025.x"
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: vistapool
ha_platforms:
  - sensor
ha_integration_type: integration
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

- **Water temperature** — current pool water temperature
- **pH** — current pH level (if pH module installed)
- **ORP / Rx** — redox potential in mV (if Rx module installed)
- **Chlorine (Cl)** — chlorine level (if Cl module installed)
- **CD** — conductivity level (if CD module installed)
- **UV** — UV module reading (if UV module installed)
- **Electrolysis / Hydrolysis** — current production level in gr/h
- **Filtration intel time** — daily runtime in Intel mode
- **Wi-Fi signal strength** — controller RSSI (diagnostic, disabled by default)

## Configuration options

After setup, you can adjust integration settings via **Settings → Devices & Services → Vistapool → Configure**:

| Option | Default | Range | Description |
| ------ | ------- | ----- | ----------- |
| Health check interval | 300 seconds | 60–3600 | How often to verify the cloud connection is alive |

## Known limitations

- The integration requires an active internet connection as it communicates via the Hayward cloud API
- Sensor availability depends on which modules are physically installed on your controller

## Troubleshooting

### Entities show "Unavailable"

Check your internet connection and verify the controller is online in the Hayward app. The integration will automatically reconnect when the connection is restored.

### Reauth notification appears

Your credentials may have changed or expired. Click the notification to re-enter your Hayward username and password.

### Entities not updating

The integration uses real-time cloud push. If updates stop, try reloading the integration from **Settings → Devices & Services**.

## Removing the integration

{% include integrations/remove_device_service.md %}
