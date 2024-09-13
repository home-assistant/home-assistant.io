---
title: ROMY Vacuum Cleaner
description: Integrate your ROMY vacuum robot with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2024.2
ha_config_flow: true
ha_codeowners:
  - '@xeniter'
ha_domain: romy
ha_platforms:
  - binary_sensor
  - sensor
  - vacuum
ha_integration_type: integration
ha_zeroconf: true
---

The **ROMY** integration allows you to control your [ROMY](https://www.romyrobot.com) vacuum robot.

This integration currently supports the following models:

- ROMY C5
- ROMY L6 Performance
- ROMY L6 Animal

{% include integrations/config_flow.md %}

## Actions

Currently supported actions are:

- `start`
- `pause`
- `continue`
- `stop`
- `return_to_base`

## Integration entities

The ROMY will add the following sensors.

Binary Sensors:

- **Dustbin present**: True if dustbin is inserted.
- **Robot docked**: True if the robot is docked.
- **Watertank present**: True if watertank is mounted (only present for ROMY's with wet cleaning function).
- **Watertank empty**: True if watertank is empty and water infill is required (only present for ROMY's with wet cleaning function).

Sensors:

- **Battery Level**: The battery level in percent.
- **RSSI**: Wi-Fi signal strength.
- **Dustbin Dirt Level**: The raw dustbin dirt sensor value (not every ROMY has one).
- **Total cleaning time**: How many hours the robot has spent cleaning in total.
- **Total cleaning runs**: The total number of cleaning runs.
- **Total cleaned area**: The total area in m² the robot has cleaned.
- **Total distance driven**: The total distance in m the robot has driven.

## Troubleshooting

### Local HTTP interface password

You have to enable the local interface first with a password. This is printed as QR Code on a label directly under the dust bin inside the robot.

### ROMY robot interface protocol

Is available as download under [romy-robot-interface-protocol](https://www.romyrobot.com/en-AT/romy-robot-interface-protocol)
