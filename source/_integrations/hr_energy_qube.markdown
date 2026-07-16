---
title: Qube heat pump
description: Instructions on how to integrate your Qube heat pump with Home Assistant.
ha_release: 2026.4
ha_category:
  - Binary sensor
  - Select
  - Sensor
  - Switch
  - Water heater
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MattieGit'
ha_domain: hr_energy_qube
ha_platforms:
  - binary_sensor
  - select
  - sensor
  - switch
  - water_heater
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Qube heat pump** {% term integration %} allows you to monitor and control [Qube](https://www.hr-energy.com/nl/pvt-systemen/onderdelen/qube-warmtepomp/) heat pumps via the Modbus TCP protocol.

## Supported devices

The following devices are known to be supported by the integration:

- Qube heat pump

## Unsupported devices

The following devices are not supported by the integration:

- Qbooster heat pump (the predecessor of the Qube heat pump)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your Qube heat pump.
{% endconfiguration_basic %}

## Supported functionality

### Binary sensors

- **Source pump**
  - **Description**: Indicates whether the source pump is running.
- **User pump**
  - **Description**: Indicates whether the user pump is running.
- **Buffer pump**
  - **Description**: Indicates whether the buffer pump is running.
- **Four-way valve**
  - **Description**: Indicates the state of the four-way valve.
- **Three-way valve**
  - **Description**: Indicates the state of the three-way valve.
- **Cooling output**
  - **Description**: Indicates whether the cooling output is active.
- **Heater step 1 / 2 / 3**
  - **Description**: Indicates whether the electric heater step is active.
- **Keypad**
  - **Description**: Indicates whether the keypad is enabled.
- **Day mode**
  - **Description**: Indicates whether day mode is active.
- **Summer mode**
  - **Description**: Indicates whether summer mode (cooling) is active.
- **Anti-legionella**
  - **Description**: Indicates whether an anti-legionella cycle is running.
- **Dewpoint**
  - **Description**: Indicates whether the dewpoint input is active.
- **Booster security**
  - **Description**: Indicates whether the booster security input is active.
- **Source flow**
  - **Description**: Indicates whether source flow is detected.
- **PV surplus**
  - **Description**: Indicates whether photovoltaic surplus energy is available.
- **Thermostat demand**
  - **Description**: Indicates whether the thermostat is requesting heating or cooling.
- **Plant demand**
  - **Description**: Indicates whether the plant controller is requesting heating or cooling.
- **External demand**
  - **Description**: Indicates whether an external demand signal is active.
- **Anti-legionella timeout alarm**
  - **Description**: Indicates whether the anti-legionella cycle exceeded its maximum time.
- **DHW timeout alarm**
  - **Description**: Indicates whether the domestic hot water cycle exceeded its maximum time.
- **Dewpoint alarm**
  - **Description**: Indicates a dewpoint-related alarm condition.
- **Supply too hot alarm**
  - **Description**: Indicates the supply temperature exceeded the safety limit.
- **Flow alarm**
  - **Description**: Indicates a flow-related alarm condition.
- **Central heating alarm**
  - **Description**: Indicates a central heating alarm condition.
- **Cooling alarm**
  - **Description**: Indicates a cooling-related alarm condition.
- **Heating alarm**
  - **Description**: Indicates a heating-related alarm condition.
- **Working hours alarm**
  - **Description**: Indicates a working hours alarm condition.
- **Source alarm**
  - **Description**: Indicates a source-related alarm condition.
- **Global alarm**
  - **Description**: Indicates any active alarm on the heat pump.
- **Compressor alarm**
  - **Description**: Indicates a compressor-related alarm condition.
- **Room sensor enabled**
  - **Description**: Indicates whether the room temperature sensor is enabled. Disabled by default.
- **Plant sensor enabled**
  - **Description**: Indicates whether the plant temperature sensor is enabled. Disabled by default.
- **Buffer sensor enabled**
  - **Description**: Indicates whether the buffer temperature sensor is enabled. Disabled by default.
- **DHW controller enabled**
  - **Description**: Indicates whether the domestic hot water controller is enabled. Disabled by default.

### Selects

- **SG Ready mode**
  - **Description**: Controls the Smart Grid Ready (SG Ready) mode for load shifting based on grid conditions or solar surplus.
  - **Options**:
    - **Off**: Normal operation.
    - **Block**: Block heat pump operation (grid requests reduced consumption).
    - **Plus**: Regular heating curve with room setpoint +1K and DHW day mode (grid has surplus energy).
    - **Max**: Run anti-legionella cycle once, use surplus curve with room setpoint +1K (maximum energy absorption).

### Sensors

- **Supply temperature CH**
  - **Description**: Current supply temperature for central heating.
- **Return temperature**
  - **Description**: Current return temperature.
- **Source temperature in**
  - **Description**: Temperature of the source fluid entering the heat pump.
- **Source temperature out**
  - **Description**: Temperature of the source fluid leaving the heat pump.
- **Room temperature**
  - **Description**: Current room temperature as measured by the heat pump.
- **DHW temperature**
  - **Description**: Current domestic hot water temperature.
- **Outside temperature**
  - **Description**: Current outside temperature.
- **Thermal power**
  - **Description**: Current thermal power output.
- **Electric power**
  - **Description**: Current electric power consumption.
- **Total electric consumption**
  - **Description**: Cumulative electric energy consumed.
- **Total thermal yield**
  - **Description**: Cumulative thermal energy produced.
- **COP**
  - **Description**: Current coefficient of performance.
- **Compressor speed**
  - **Description**: Current compressor speed in revolutions per minute.
- **Measured PVT flow**
  - **Description**: Current photovoltaic-thermal flow rate.
- **Room setpoint heating (day)**
  - **Description**: Target room temperature for heating during daytime.
- **Room setpoint heating (night)**
  - **Description**: Target room temperature for heating during nighttime.
- **Room setpoint cooling (day)**
  - **Description**: Target room temperature for cooling during daytime.
- **Room setpoint cooling (night)**
  - **Description**: Target room temperature for cooling during nighttime.
- **Heat pump status**
  - **Description**: Current operational status of the heat pump.

### Switches

- **Summer mode**
  - **Description**: Toggle between heating and cooling mode.
- **Anti-legionella cycle**
  - **Description**: Manually start an anti-legionella prevention cycle.
- **Heating curve**
  - **Description**: Enable or disable dynamic heating curve compensation.
- **Heating demand**
  - **Description**: Activate or deactivate heating demand via Modbus.

### Water heater

- **Domestic hot water**
  - **Description**: Controls domestic hot water temperature and operation mode.
  - **Current temperature**: The measured DHW temperature.
  - **Target temperature**: The user-defined DHW setpoint (adjustable).
  - **Operation modes**: Heat pump (normal operation) and performance (DHW boost, forces an immediate heating cycle).

## Data updates

The integration polls the heat pump every 15 seconds via Modbus TCP.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
