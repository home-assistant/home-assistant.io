---
title: Qube heat pump
description: Instructions on how to integrate your Qube heat pump with Home Assistant.
ha_release: 2026.4
ha_category:
  - Binary sensor
  - Modbus-controlled
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
  - diagnostics
  - select
  - sensor
  - switch
  - water_heater
ha_integration_type: hub
ha_quality_scale: silver
---

The **Qube heat pump** {% term integration %} allows you to monitor and control [Qube](https://www.hr-energy.com/nl/pvt-systemen/onderdelen/qube-warmtepomp/) heat pumps via the Modbus TCP protocol.

## Use cases

- Monitor the heat pump's temperatures, power, energy use and coefficient of performance (COP), and add the electric consumption to the [energy dashboard](/docs/energy/).
- Use surplus solar power: switch the smart grid ready mode to **Plus** or **Max** when your solar panels export to the grid, so the heat pump stores the energy as heat.
- Heat domestic hot water when electricity is cheap, by boosting the water heater during low dynamic tariff hours.
- Switch between summer and winter mode, or block the heat pump during peak hours, from automations instead of the heat pump's panel.

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

## Diagnostics

The diagnostics download contains:

- The values the integration last read from the heat pump.
- The state of the switches.
- The smart grid ready mode.
- The software version of the heat pump.

The host address is redacted. Attach the downloaded file when reporting an issue. For more information, see [Download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

## Examples

{% include docs/paste_yaml_tip.md %}

### Automation: Store surplus solar power as heat

When your solar panels export more power than the heat pump needs, raise the smart grid ready mode to **Plus** so the heat pump uses the surplus. Switch back to **Off** when the export drops.

- **Trigger**: The grid export sensor is above 1500 W for 5 minutes, or below 500 W for 5 minutes.
- **Action**: Select **Plus** or **Off** in the smart grid ready mode select.

{% details "YAML example for storing surplus solar power" %}

{% example %}
automation: |
  alias: "Qube: use surplus solar power"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.grid_export_power
      above: 1500
      for:
        minutes: 5
      id: surplus
    - trigger: numeric_state
      entity_id: sensor.grid_export_power
      below: 500
      for:
        minutes: 5
      id: no_surplus
  actions:
    - action: select.select_option
      target:
        entity_id: select.qube_heat_pump_smart_grid_ready_mode
      data:
        option: "{{ 'plus' if trigger.id == 'surplus' else 'off' }}"
{% endexample %}

{% enddetails %}

### Automation: Heat hot water when electricity is cheap

Boost the domestic hot water when the electricity price is low, and return to normal operation afterwards.

- **Trigger**: The electricity price drops below 0.10 per kWh, or rises above it again.
- **Action**: Set the water heater operation mode to **Performance** or **Heat pump**.

{% details "YAML example for heating hot water at low prices" %}

{% example %}
automation: |
  alias: "Qube: heat hot water at low prices"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.electricity_price
      below: 0.10
      id: cheap
    - trigger: numeric_state
      entity_id: sensor.electricity_price
      above: 0.10
      id: expensive
  actions:
    - action: water_heater.set_operation_mode
      target:
        entity_id: water_heater.qube_heat_pump_domestic_hot_water
      data:
        operation_mode: "{{ 'performance' if trigger.id == 'cheap' else 'heat_pump' }}"
{% endexample %}

{% enddetails %}

Replace `sensor.grid_export_power` and `sensor.electricity_price` with the sensors of your energy meter and energy provider.

## Known limitations

- The integration communicates with the heat pump over Modbus TCP on your local network only. Settings that are not listed under [Supported functionality](#supported-functionality), such as the heating curve parameters, are configured on the heat pump's panel.
- Changes made on the heat pump's panel appear in Home Assistant after the next poll, within 15 seconds.
- Automatic discovery uses mDNS, which does not cross network or VLAN boundaries unless your router forwards it. Without it, add the heat pump manually.
- On some firmware versions the heat pump does not report its software version over Modbus. The device page then does not show a meaningful software version.
- When the heat pump's energy counters briefly report a lower value, the energy sensors keep the previous value until the counter passes it again, so the energy dashboard does not count the difference twice. A drop of more than 1 kWh that persists for three polls is treated as a counter reset.
- The heat pump cannot be restarted from Home Assistant. To restart it, power cycle the heat pump.

## Troubleshooting

{% details "Can't set up the heat pump" %}

### Symptom

When trying to set up the integration, the form shows "Failed to connect" or "Could not verify this is a Qube heat pump".

#### Description

Home Assistant connects to the heat pump over Modbus TCP on port 502 and reads a register to verify that it is a Qube heat pump. The connection fails when the address is wrong or the port can't be reached; the verification fails when another device answers on that address.

#### Resolution

1. Check the IP address or hostname of the heat pump, for example in your router's list of connected devices.
2. Make sure Home Assistant can reach port 502 on the heat pump. If the heat pump is on a separate network or VLAN, allow this traffic in your router or firewall.

{% enddetails %}

{% details "The heat pump is not discovered" %}

### Symptom

Home Assistant does not show the Qube heat pump as a discovered device.

#### Description

The heat pump announces itself with mDNS. These announcements only reach Home Assistant when both are on the same network, or when your router forwards mDNS between networks.

#### Resolution

1. Add the heat pump manually with its IP address or hostname.
2. Optionally, enable mDNS forwarding between the networks in your router (sometimes called mDNS reflector or multicast DNS).

{% enddetails %}

{% details "Entities are unavailable" %}

### Symptom

All entities of the heat pump show as unavailable.

#### Description

The heat pump stopped answering Modbus requests. The integration retries on every poll and the entities recover automatically when the heat pump answers again.

#### Resolution

1. Check that the heat pump is powered on and connected to your network.
2. If the IP address of the heat pump changed, Home Assistant updates it automatically when the heat pump is discovered again. To prevent this, give the heat pump a fixed IP address in your router.
3. If the problem persists, [download the diagnostics](#diagnostics) and include them when reporting an issue.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
