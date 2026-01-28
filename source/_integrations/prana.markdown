---
title: Prana recuperators
description: Integration to control Prana recuperators.
ha_release: 2026.2
ha_iot_class: Local Polling
ha_codeowners:
  - '@home-assistant/core'
ha_domain: prana
ha_integration_type: integration
related:
  - url: https://prana.ua
    title: Prana
---

The **Prana recuperators** {% term integration %} lets you control your Prana recuperator. You can manage motors and their operating modes, and monitor a range of sensors provided by the device.

Use case: If you have a Prana recuperator and want to automate ventilation, monitor filter status, or integrate the recuperator with other Home Assistant automations, this integration helps you do that.

## Supported devices

- Devices with Wi‑Fi control and firmware version 47 or newer

## Unsupported devices

- Models without a local network interface
- Devices with firmware version 46 or below

## Prerequisites

1. Connect the Prana recuperator to the same local network as Home Assistant.

## Configuration

This integration is installed via a **config flow** and uses mDNS to discover devices on your local network. Setup is two clicks: select the discovered device and confirm to add it.

### Discovery

This integration is discovered automatically over mDNS. There is no user input step. Select the discovered device and confirm to add it.

## Supported functionality

### Entities

The integration exposes the following entities.

#### Fans / sliders

- **Supply fan** (slider)
  - Description: Controls the supply (incoming) motor of the recuperator
  - Available actions: Turn on/off, set speed
  - Presets: Supports _Night_ and _Boost_ (preset_mode). _Night_ sets a minimal, quiet speed. _Boost_ temporarily increases fan output.

- **Extract fan** (slider)
  - Description: Controls the extract (exhaust) motor of the recuperator
  - Available actions: Turn on/off, set speed
  - Presets: Supports _Night_ and _Boost_ (preset_mode). _Night_ sets a minimal, quiet speed. _Boost_ temporarily increases fan output.

#### Switches

- **Auto**
  - Description: Enable automatic control
- **Auto+**
  - Description: Enhanced automatic mode with quieter operation
- **Winter**
  - Description: Winter mode for defrosting behavior
- **Heater**
  - Description: Turn on heater (if available)
- **Bound**
  - Description: Bind or synchronize both fans and related parameters

#### Selects

- **Operation mode**
  - Description: Select the overall operating mode, if available
  - Options: *Auto*, *Manual*, *Boost*, *Sleep*

#### Sensors

- **Inside temperature 1**
  - Description: Indoor temperature, sensor 1
- **Inside temperature 2**
  - Description: Indoor temperature, sensor 2
- **Outside temperature 1**
  - Description: Outdoor temperature, sensor 1
- **Outside temperature 2**
  - Description: Outdoor temperature, sensor 2
- **Supply temperature**
  - Description: Supply air temperature
- **Exhaust temperature**
  - Description: Exhaust air temperature
- **Supply fan speed**
  - Description: Current supply fan speed
- **Extract fan speed**
  - Description: Current extract fan speed
- **VOC**
  - Description: Volatile organic compound level, an indicator of air quality
- **CO2**
  - Description: Carbon dioxide level in the room
- **Humidity**
  - Description: Relative humidity in the room
- **Filter status**
  - Description: Filter status (OK, Replace)
- **Fault code**
  - Description: Current fault code, if any

Note: The available sensors depend on the device model and firmware. If your device does not expose a sensor, the corresponding entity will not be created.

#### Light / slider

- **Display brightness**
  - Description: Slider to set the device display brightness (0–100)

#### Buttons

- **Reset filter**
  - Description: Reset the filter replacement counter after you physically replace the filter

## Actions

- prana.set_fan_speed
  - Data attribute: `fan` (one of `supply`, `extract`)
  - Data attribute: `speed`
  - Description: Set the speed of the specified fan. For example:
    - `fan: "supply"`, `speed: 3` or `fan: "extract"`, `speed: 50`

- prana.set_mode
  - Data attribute: `mode`
  - Description: Set the operating mode (`Auto`, `Manual`, `Boost`, `Sleep`)

- prana.set_display_brightness
  - Data attribute: `brightness`
  - Description: Set the device display brightness (0–100)

## Data updates

The integration uses local polling. By default, Home Assistant polls the device every 10 seconds. If the device stops responding, entities are marked as *unavailable* until communication is restored.

## Known limitations

- No official support for some older Prana models
- Some indicators or device-specific details may only be available in the manufacturer's app
- This integration does not provide cloud or remote control

## Troubleshooting

### Device is not discovered

1. Make sure Home Assistant and the Prana device are on the same local network
2. Restart the device and Home Assistant
3. Check whether mDNS/LLMNR is allowed by your router

### Entities show as unavailable

- Check the device network connection
- Ensure the device is powered on and reachable; entities become available automatically when communication is restored

## Community notes

- If you have a model that does not work as expected, add a note in the repository or community and include the model and firmware version

## Removing the integration

This integration follows standard integration removal in Home Assistant. After you remove the integration from Home Assistant, we recommend checking the device settings in the Prana Online 2.0 app.