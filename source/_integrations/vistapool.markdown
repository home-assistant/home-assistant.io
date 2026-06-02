---
title: Vistapool
description: Monitor and control Hayward-branded pool controllers via the Hayward cloud API.
ha_category:
  - Button
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: vistapool
ha_platforms:
  - button
  - sensor
ha_integration_type: hub
---

The **Vistapool** integration connects Home Assistant to **Hayward-branded pool controllers**, including AquaRite, Vistapool, Sugar Valley, Poolwatch, Kripsol, and Dagen devices.

It communicates with the official Hayward cloud API using real-time push updates (no polling), giving you instant visibility and control over your pool equipment.

When your pool controller's Wi-Fi module joins your network, Home Assistant detects it automatically and offers to set up the integration for you. You only need to enter your Vistapool cloud account credentials to finish.

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

## Button

If your controller drives a multi-color LED light fixture, the integration exposes a one-shot button to cycle through the available colors from Home Assistant.

- **LED next color**: advance the LED fixture to its next color. The integration briefly toggles the pool light off and back on (or just turns it on if it was off). The physical fixture interprets the power cycle as the color-advance signal, just as the **Next** button under **LED Color** does in the Vistapool app's **Illumination** screen. Available only if your controller reports an LED fixture.

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
