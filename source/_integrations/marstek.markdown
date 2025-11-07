---
title: Marstek
description: Instructions on how to integrate Marstek energy storage systems with Home Assistant.
ha_category:
  - Energy
ha_release: 2025.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MarstekEnergy'
ha_domain: marstek
ha_platforms:
  - sensor
---

The Marstek integration allows you to monitor and control Marstek energy storage systems in Home Assistant.

## Prerequisites

- Marstek device (Venus A, Venus D, Venus E 3.0, or other models with OPEN API support)
- OPEN API must be enabled on your device
- Device and Home Assistant must be on the same local network
- UDP port 30000 must be accessible

## Supported devices

This integration supports the following Marstek devices:

- Venus A (latest firmware)
- Venus D (latest firmware)
- Venus E 3.0 (latest firmware)
- Other Marstek devices with OPEN API support

{% include integrations/config_flow.md %}

## Sensors

The integration provides the following sensors:

### Battery sensors

- **Battery SOC**: State of charge percentage
- **Battery power**: Current power (positive for discharge, negative for charge)
- **Battery voltage**: Current voltage
- **Battery current**: Current flow
- **Battery temperature**: Battery temperature

### Energy storage sensors

- **On-grid power**: Power flow to/from grid
- **PCS temperature**: Power conversion system temperature
- **ES mode**: Current operating mode

### Solar panel sensors (if available)

For each PV channel (up to 4):

- **PV voltage**: Solar panel voltage
- **PV current**: Solar panel current
- **PV power**: Solar panel power output

## Services

### Service `marstek.charge`

Start charging the battery.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | no | Config entry ID of the target device |
| `power` | no | Charging power in watts (positive value) |

### Service `marstek.discharge`

Start discharging the battery.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | no | Config entry ID of the target device |
| `power` | no | Discharging power in watts (positive value) |

### Service `marstek.stop`

Stop charging or discharging.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | no | Config entry ID of the target device |

## Device actions

The integration provides device actions that can be used in automations:

- **Charge**: Start charging the battery
- **Discharge**: Start discharging the battery
- **Stop**: Stop charging or discharging

## Communication

The integration uses UDP communication on port 30000 to communicate with Marstek devices locally. No cloud connection is required.

## Troubleshooting

### Device not discovered

- Verify OPEN API is enabled on your Marstek device
- Ensure device and Home Assistant are on the same network segment
- Check that UDP port 30000 is not blocked by firewall
- Try restarting the discovery process

### Connection timeout

The integration uses a 10-second timeout for device communication. If you experience frequent timeouts:

- Check network stability
- Ensure no firewall is blocking UDP traffic
- Verify the device is powered on and connected to the network

