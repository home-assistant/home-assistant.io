---
title: ALLNET
description: Instructions on how to integrate ALLNET MSR devices into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Switch
ha_release: "2026.x"
ha_iot_class: Local polling
ha_config_flow: true
ha_codeowners:
  - "@polsa"
ha_domain: allnet
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: hub
ha_zeroconf:
  - type: "_http._tcp.local."
    name: "all*"
---

The **ALLNET** integration connects Home Assistant to [ALLNET](https://www.allnet.de) MSR (Messen Steuern Regeln) devices. These are industrial-grade measurement and control units that expose sensors, binary inputs, and relay actors over a local JSON API.

Supported device families include the **ALL3500** and compatible MSR central units.

## Supported entities

Depending on which sensors and actors are attached to the device, the integration creates:

| Entity type | Examples |
|---|---|
| **Sensor** | Temperature (°C/°F), humidity (%), CO₂ (ppm), current (A), power (W), energy (kWh), voltage (V), frequency (Hz), power factor, atmospheric pressure, illuminance, particulate matter (PM1/PM2.5/PM4/PM10) |
| **Binary sensor** | Motion detectors, door/window contacts, leak sensors, smoke detectors |
| **Switch** | Relay outputs, digital actors, remote socket strips |

New sensors and actors plugged into the device after initial setup are **automatically discovered** on the next polling cycle — no restart required.

## Prerequisites

Your ALLNET device must have the local JSON API enabled. This is available on firmware version 335 and later for the ALL3500. The device must be reachable on your local network.

If the web interface requires a username and password, you will need these credentials during setup.

{% include integrations/config_flow.md %}

## Configuration

| Field | Required | Description |
|---|---|---|
| **Host** | Yes | Hostname or IP address of the ALLNET device (e.g. `192.168.1.100`) |
| **Username** | No | Username for the device web interface, if authentication is enabled |
| **Password** | No | Password for the device web interface, if authentication is enabled |
| **Use SSL** | No | Enable if the device is configured for HTTPS (default: off) |
| **Device profile** | No | Select *Auto-detect* to let the integration determine the device type automatically |

## Data updates

Home Assistant retrieves the device data every 60 seconds. Switch commands trigger an immediate refresh.

## Device information

The integration reads the following information from the device and exposes it in the Home Assistant device registry:

- Manufacturer: ALLNET
- Model (e.g. ALL3500)
- Firmware version
- Hardware revision
- MAC address
- Link to the device web interface

## Automatic discovery

ALLNET MSR devices advertise themselves on the local network via mDNS (Zeroconf). Home Assistant will automatically detect devices whose mDNS instance name starts with `all` (e.g. `all3500._http._tcp.local.`) and prompt you to add them without entering the host address manually.

## Re-authentication

If the device credentials change, the integration will notify you and prompt for updated credentials without requiring a full reconfiguration.

## Troubleshooting

### The device is not found automatically

Ensure the device is on the same network segment as Home Assistant and that mDNS traffic is not blocked by a firewall or VLAN configuration. You can always add the device manually using its IP address.

### Entities show as unavailable

Sensors connected via I²C or as remote devices may show as unavailable if:

- The sensor module is powered off or disconnected
- The remote device (e.g. ALL4176) is offline

This is expected behavior. The entity will become available again when the sensor comes back online, without any configuration change.

### The integration fails to connect

- Verify the host address is correct and the device is reachable (`ping <host>`)
- Check that the JSON API is enabled in the device web interface
- If authentication is required, verify the username and password
- The JSON API requires firmware version 335 or later — check the device web interface for the current firmware version

### Unsupported firmware

If you see the *Unsupported firmware* error, the device does not expose the local JSON API. Update the firmware via the device web interface to version 335 or later.
