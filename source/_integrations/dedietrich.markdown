---
title: De Dietrich
description: Instructions on how to monitor a De Dietrich Diematic boiler in Home Assistant using Modbus RTU over TCP.
ha_category:
  - Sensor
ha_release: '2026.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@DaanVervacke'
ha_domain: dedietrich
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **De Dietrich** {% term integration %} connects Home Assistant to a Diematic boiler through a network gateway. It reads temperatures, water pressure, and other measurements over your local network. You can use it to follow your heating system's readings.

## Supported devices

The integration provides a choice of three control panel systems:

- Diematic 3
- Diematic 4
- iSystem

Diematic 3 and Diematic 4 use the base register layout. iSystem uses a different layout, which determines where the integration reads the boiler's data. Choose the system that matches your control panel. The integration reads the boiler's identity during setup but does not automatically select the system.

Hardware testing of the underlying library has focused on one Diematic iSystem installation reporting the type code `D4`. Other Diematic 3 and Diematic 4 installations still need testing. Available readings depend on your control panel and fitted equipment. A reported type code such as `D4` does not reliably identify the physical boiler model or the layout you should select.

## Unsupported devices

Diematic Delta is not supported.

## Prerequisites

- A working connection from the boiler's Modbus interface to a serial-to-network gateway.
- A gateway that Home Assistant can reach over your local network.
- The gateway's hostname or IP address and TCP port, and the boiler's Modbus device address.
- The name of the Diematic system used by your control panel.

{% important %}
The gateway must forward Modbus RTU messages unchanged over TCP.
This is often called transparent mode or RTU over TCP.
A gateway configured to translate requests to standard Modbus TCP is not compatible with this integration.
{% endimportant %}

Configure the gateway's serial settings to match your boiler's Modbus interface. These settings belong to the gateway, not the Home Assistant setup form. Direct USB or serial connections to the Home Assistant host are not supported.

{% include integrations/config_flow.md %}

All four setup fields are required.

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the gateway connected to your boiler. You can find its address in your router or the gateway's settings."
Port:
  description: "The gateway's TCP port for forwarding Modbus RTU messages. The default is `502`. Match this to the gateway's configured port."
Modbus unit ID:
  description: "The boiler's Modbus device address. The default is `10`. Enter a value from `1` through `247` that matches your installation."
System:
  description: "Choose **Diematic 3**, **Diematic 4**, or **iSystem** to match your control panel. This field has no default."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides up to 11 read-only sensors:

- **Outdoor temperature**: The outdoor temperature reported by the controller.
- **Boiler temperature**: The measured boiler water temperature.
- **Return temperature**: The return-water temperature.
- **Flue gas temperature**: The temperature reported by the flue gas sensor.
- **Water pressure**: The heating system's water pressure, in bar.
- **Boiler temperature target**: The boiler's calculated temperature target, not a measured temperature or an editable setting.
- **Fan speed**: The reported fan speed, in revolutions per minute.
- **Ionization current**: The flame-sensing current, in microamperes.
- **Hot water temperature**: The domestic hot-water temperature.
- **Circuit A room temperature**: The room temperature reported for heating circuit A.
- **Circuit B room temperature**: The room temperature reported for heating circuit B.

Temperature readings use degrees Celsius. Home Assistant can display them in your preferred temperature unit. **Flue gas temperature**, **Boiler temperature target**, **Fan speed**, and **Ionization current** are diagnostic sensors.

A heating circuit is a separately controlled part of the heating system. The integration adds each circuit's room-temperature sensor only when the controller reports a room-temperature value for it. If that value becomes available on a later poll, the sensor appears without reloading the integration. A missing room-temperature sensor does not prove the heating circuit is absent.

Other sensors are created even when the corresponding probe is not fitted. A sensor can show **Unknown** when the controller does not provide a value.

## Data updates

The integration {% term polling polls %} the boiler every 15 seconds. It does not offer a polling interval setting.

If a group of readings fails to update, its sensors become unavailable while successfully updated groups remain available. A connection failure makes all sensors unavailable. The integration retries on subsequent polls.

## Known limitations

- The integration only monitors readings. It does not provide climate controls or actions to change temperatures, heating modes, schedules, or the boiler clock.
- Circuit C, burner and pump status, fault codes, energy consumption, and the library's other readings are not exposed as entities.
- Only RTU framing over a TCP connection is supported. Standard Modbus TCP framing and direct serial connections are not supported.
- The integration has no additional settings or **Reconfigure** option. To change the host, port, unit ID, or system, remove the integration entry and add it again. Check any automations or dashboards that reference its entities afterward.

## Troubleshooting

### Cannot connect to the boiler

1. Check that the boiler and gateway are powered on and that Home Assistant can reach the gateway on your local network.
2. Confirm the host and port match the gateway's settings. An open gateway web page does not confirm that its Modbus forwarding port is reachable.
3. Check that the gateway forwards RTU messages unchanged over TCP, rather than translating standard Modbus TCP requests.
4. Verify the boiler's Modbus unit ID and the gateway's serial settings against your installation.
5. Confirm that **System** matches the control panel. The boiler's reported type code alone is not enough to choose a layout.
6. If another application is polling the same boiler, pause that application's polling and try again. A busy serial bus or a gateway's connection limit can prevent a response.

### A sensor is missing or shows Unknown

Check whether the controller displays that measurement and whether the corresponding probe is fitted. In particular, circuit A and circuit B room-temperature sensors only appear after the controller supplies a room-temperature value. A flue gas sensor that is not fitted can leave **Flue gas temperature** as **Unknown**.

Compare **Boiler temperature target** with the controller's target, not with the measured **Boiler temperature**. These values describe different things and do not need to match.

### Sensors become unavailable

Check the connection settings above and look for communication errors under {% my logs title="**Settings** > **System** > **Logs**" %}. If only some sensors are unavailable, a group of readings may have failed while the rest of the boiler still responds. Allow subsequent polls to retry before changing the configuration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
