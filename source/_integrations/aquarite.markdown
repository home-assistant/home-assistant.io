---
title: Aquarite
description: Monitor and control Hayward-branded pool controllers via the Hayward cloud API.
ha_category:
  - Sensor
  - Binary sensor
  - Switch
  - Number
  - Select
  - Light
  - Button
  - Time
ha_release: "2025.x"
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@fdebrus"
ha_domain: aquarite
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_integration_type: integration
---

The **Aquarite** integration connects Home Assistant to **Hayward-branded pool controllers**, including AquaRite, Vistapool, Sugar Valley, Poolwatch, Kripsol, and Dagen devices.

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
- **Pool location** — city, street, zipcode, country, coordinates (diagnostic)

## Binary sensors

- **Filtration status** — whether the filtration pump is running
- **Backwash status** — whether backwash is active
- **Heating status** — whether heating is active
- **Hydrolysis flow status** — flow sensor state
- **pH pump alarm** — pH pump alarm condition
- **pH acid/base pump** — pump running states
- **Chlorine pump / Rx pump** — pump running states (if modules installed)
- **Acid tank** — low tank level warning
- **Electrolysis/Hydrolysis low** — low production warning
- **Connected** — cloud connectivity status
- **Module presence** — CD, CL, RX, pH, IO, hydrolysis module installed (diagnostic, disabled by default)

## Controls

### Switches

- **Filtration** — turn the filtration pump on/off
- **Electrolysis cover** — enable/disable cover reduction
- **Electrolysis boost** — enable/disable boost mode
- **Relay 1–4** — control auxiliary relays
- **Heating climate** — heating climate toggle (if Heat mode available)
- **Smart mode freeze protection** — freeze protection toggle (if Smart mode available)

### Number setpoints

- **pH low / pH max** — pH target range
- **Redox setpoint** — ORP target in mV
- **Electrolysis setpoint** — production target in gr/h
- **Intel mode temperature** — target temperature for Intel mode
- **Heating mode min/max temperature** — heating temperature range (if Heat mode available)
- **Smart mode min/max temperature** — smart temperature range (if Smart mode available)

### Select

- **Pump mode** — Manual, Auto, Heat, Smart, or Intel
- **Pump speed** — Slow, Medium, or High
- **Filtration timer speed 1–3** — speed setting per filtration interval

### Time

- **Filtration interval 1–3 start/end** — set your filtration schedule directly from Home Assistant using native time pickers

### Light

- **Pool light** — on/off control

### Button

- **LED pulse** — advances the pool LED to its next color (only available when controller has LED hardware)

## Actions

### Action `aquarite.sync_pool_time`

Synchronize the pool controller's internal clock with Home Assistant's local time. Useful after power outages or controller restarts.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| None | | This action takes no parameters. It syncs all loaded pool controllers. |

## Configuration options

After setup, you can adjust integration settings via **Settings → Devices & Services → Aquarite → Configure**:

| Option | Default | Range | Description |
| ------ | ------- | ----- | ----------- |
| Health check interval | 300 seconds | 60–3600 | How often to verify the cloud connection is alive |

## Known limitations

- The integration requires an active internet connection as it communicates via the Hayward cloud API
- Entity availability depends on which modules are physically installed on your controller
- The LED pulse button is only available on controllers with LED hardware (`hasLED` flag)
- Select state values use lowercase keys (`manual`, `auto`, `slow`, etc.)

## Troubleshooting

### Entities show "Unavailable"

Check your internet connection and verify the controller is online in the Hayward app. The integration will automatically reconnect when the connection is restored.

### Reauth notification appears

Your credentials may have changed or expired. Click the notification to re-enter your Hayward username and password.

### Entities not updating

The integration uses real-time cloud push. If updates stop, try reloading the integration from **Settings → Devices & Services**.

## Removing the integration

{% include integrations/remove_device_service.md %}
