---
title: Qube Heat Pump
description: Instructions on how to integrate Qube Heat Pump within Home Assistant.
ha_category:
  - HVAC
ha_release: '2025.2'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MattieGit'
ha_domain: qube_heatpump
ha_platforms:
  - binary_sensor
  - button
  - select
  - sensor
  - switch
---

The **Qube Heat Pump** integration allows you to control and monitor
[Qube](https://qube-renewables.com/) heat pumps via the Modbus TCP protocol.

## Configuration

To add the **Qube Heat Pump** integration to your Home Assistant instance, use
this My button:

[![Open your Home Assistant instance and start configuration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=qube_heatpump)

Manual steps:

1. Browse to your Home Assistant instance.
2. Go to **Settings > Devices & Services**.
3. In the bottom right corner, select the **Add Integration** button.
4. From the list, search for and select **"Qube Heat Pump"**.
5. Follow the instructions on screen.

### Configuration Options

During the initial setup, you will be asked for:

- **Host**: The IP address or hostname of your Qube Heat Pump
  (default: `qube.local`).

### Options

After configuration, you can change the following settings by selecting
**Configure** on the integration entry:

- **Host**: Update the IP address if it changes.
- **Label**: An optional label to append to entity names (useful for
  differentiating multiple units).
- **Show label in name**: Toggle whether the label is included in the entity
  display name.
- **Friendly name language**: Select the language for entity names ([en](cci:1://file:///Users/matthijskeij/Documents/Github/qube_heatpump/custom_components/qube_heatpump/config_flow.py:61:0-76:15) for
  English, `nl` for Dutch).

## Platforms

The integration exposes various entities to monitor and control your heat pump.

### Sensor

- **Temperatures**: Inlet, Outlet, Buffer, Outside, and Domestic Hot Water (DHW)
  temperatures.
- **Flow**: Current flow rate.
- **Power & Energy**:
  - **Standby power/energy**: Tracks the fixed 17W standby consumption.
  - **Total electric consumption**: Combined total valid for billing/tracking.
  - **SCOP (month)**: Monthly Seasonal Coefficient of Performance for CV
    (heating) and DHW, calculated from thermal output divided by electrical
    input.
- **Status**: Operation hours and system counters.

### Binary Sensor

- **Components**: Status of the pump, compressor, and auxiliary systems.
- **I/O**: State of various inputs and outputs.
- **Alarms**: Active alarm states (e.g. *Flow CV*, *Supply too hot*).

### Select

- **SG Ready mode**: Consolidates the two SG Ready coil switches into a single
  readable selector:
  - **Off**: Normal operation.
  - **Block**: Heat pump operation blocked.
  - **Plus**: Regular heating curve, +1K room temp, tapwater day mode.
  - **Max**: Anti-legionella program once, surplus heating control, +1K room
    temp.

### Switch

- **Enable heating curve**: Toggles weather-compensated heating. When *Off*, the
  pump uses a fixed setpoint.
- **Activate central heating (Modbus Demand)**: Used for external thermostat
  control (see below).

## Thermostat Control

You can control the Qube heat pump using a virtual thermostat in Home Assistant.

1. **Enable Modbus Control**: Turn on the `Activate central heating` switch
   (and optionally `Activate DHW heating`).
2. **Disable Internal Thermostat**: On the physical heat pump controller,
   disable the "Linq" thermostat options for room temperature and domestic hot
   water.
   - *Note: Leaving Linq options enabled while using Modbus coils can lead to
     conflicting control.*
3. **Automation**: Use your Home Assistant automations or generic thermostat
   entity to toggle the demand switch based on your room temperature sensors.

### Button

- **Reload**: Refreshes all data from the heat pump immediately.

## Actions

### Action `qube_heatpump.write_register`

Write a value to a Modbus holding register exposed by the Qube heat pump. This
supports specific data types used by the device.

| Data attribute | Optional | Description |
| :--- | :--- | :--- |
| `address` | No | The Modbus holding register address to write (0-based). |
| `value` | No | The value to store in the register. |
| `data_type` | Yes | Register data type (e.g. `float32`). |
| `label` | Yes | Target a specific hub by its configured label (e.g. `qube1`) if multiple are present. |

## Multiple Hubs

If you have multiple Qube units:

- Each hub receives a persistent label (e.g. `qube1`, `qube2`) configured in the
  Options flow.
- Entity IDs are automatically prefixed (e.g.,
  `sensor.qube1_outlet_temperature`) to prevent collisions.
