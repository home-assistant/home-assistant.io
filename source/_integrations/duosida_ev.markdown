---
title: Duosida EV Charger
description: Instructions on how to integrate Duosida EV wall chargers with Home Assistant.
ha_category:
  - Car
ha_release: "2025.2"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@americodias'
ha_domain: duosida_ev
ha_platforms:
  - binary_sensor
  - button
  - number
  - sensor
  - switch
ha_integration_type: device
---

The **Duosida EV Charger** {% term integration %} allows you to monitor and control your Duosida EV wall charger locally over your network. This integration communicates directly with the charger via TCP, without requiring cloud services.

## Supported devices

- Duosida SmartChargePI wall chargers (single-phase and three-phase models)
- Other Duosida wall chargers with network connectivity on TCP port 9988

## Prerequisites

Before setting up this integration, ensure that:

- Your Duosida charger is connected to your local network.
- You know the charger's IP address (check your router's DHCP client list).
- TCP port 9988 is accessible on the charger from your Home Assistant instance.

{% tip %}
Set a DHCP reservation in your router to keep the charger's IP address stable.
{% endtip %}

{% include integrations/config_flow.md %}

## Sensors

The integration provides the following sensors:

- **Status**: Current charger state (Available, Preparing, Charging, etc.)
- **Voltage**: Line voltage (L1)
- **Voltage L2**: Line 2 voltage (disabled by default)
- **Voltage L3**: Line 3 voltage (disabled by default)
- **Current**: Charging current (L1)
- **Current L2**: Line 2 current (disabled by default)
- **Current L3**: Line 3 current (disabled by default)
- **Power**: Instantaneous power consumption
- **Temperature**: Charger station temperature
- **Session energy**: Energy consumed in current charging session
- **Session time**: Duration of current charging session
- **Total energy**: Lifetime energy consumption
- **CP voltage**: Control Pilot voltage

## Controls

### Switches

- **Charging**: Start or stop charging
- **Direct mode**: Enable plug-and-charge (auto-start when vehicle connected)
- **Stop on disconnect**: Stop session when vehicle disconnects

### Number controls

- **Max charging current** (6-32 A): Maximum allowed charging current
- **LED brightness** (0, 1, 3): Screen/LED brightness
- **Max voltage** (265-290 V): Maximum voltage protection threshold
- **Min voltage** (70-110 V): Minimum voltage protection threshold

### Buttons

- **Start charging**: Send start command to charger
- **Stop charging**: Send stop command to charger
- **Reset total energy**: Reset the lifetime energy counter

## Binary sensors

- **Charging**: Indicates if the charger is currently charging

## Data updates

The integration {% term polling polls %} the charger every 30 seconds. Since this is local network communication, the polling has minimal latency.

The **Total energy** sensor is calculated by integrating power readings over time and persists across Home Assistant restarts.

## Known limitations

- **LED brightness values**: Only 0 (off), 1 (low), and 3 (high) are supported by the charger hardware.
- **Settings persistence**: Settings cannot be retrieved from the charger and are marked as unknown until configured. Once set, values are stored locally and synced on restart.

## Troubleshooting

### Charger not found during setup

- Verify the charger is powered on and connected to your network
- Check that TCP port 9988 is accessible: `telnet <charger_ip> 9988`
- Ensure there are no firewall rules blocking the connection

### Entities show unavailable

- Check network connectivity to the charger
- Review the Home Assistant logs for connection errors
- Try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %}

### Settings show as unknown

This is expected behavior. Settings like LED brightness and direct mode cannot be read from the charger. Once you set a value via Home Assistant, it will be remembered.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
