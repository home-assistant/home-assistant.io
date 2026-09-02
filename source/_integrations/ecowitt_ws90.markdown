---
title: Ecowitt WS90
description: Instructions on how to integrate an Ecowitt WS90 weather sensor within Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.10"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@iainchesworth'
ha_domain: ecowitt_ws90
ha_platforms:
  - sensor
ha_integration_type: device
---

The **Ecowitt WS90** {% term integration %} reads a [Fine Offset / Ecowitt WS90](https://www.ecowitt.com/) all-in-one weather sensor over Modbus.

## Prerequisites

- The WS90 is reachable over Modbus. This is typically an RTU-over-TCP serial gateway bridging the sensor's RS-485 connection onto your network, not the sensor speaking Modbus TCP natively.
- The host/IP address and port of the gateway. Most gateways use port 502.

{% include integrations/config_flow.md %}

## Configuration

| Field | Description |
| ----- | ----------- |
| Host | The WS90's Modbus gateway hostname or IP address. |
| Port | The Modbus TCP port of the gateway. |
| Unit ID | The WS90's Modbus device address. The factory default is `0x90` (144). |

During setup, the integration connects to the given address and reads the device's identity register to confirm a WS90 answers there. Setup does not complete if it does not.

## Supported functionality

### Sensors

- **Light**: Light intensity (lx).
- **UV index**: Current UV index value.
- **Temperature**: Ambient temperature (°C or °F).
- **Humidity**: Relative humidity (%).
- **Wind speed**: Current wind speed (km/h or mph).
- **Gust speed**: Current gust speed (km/h or mph).
- **Wind direction**: Wind direction (degrees).
- **Rainfall**: Cumulative rainfall total (mm or in).
- **Absolute pressure**: Absolute atmospheric pressure (hPa or inHg).
- **Rain counter**: The same cumulative rainfall total as **Rainfall**, at a finer (0.01 mm) resolution. Disabled by default.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
