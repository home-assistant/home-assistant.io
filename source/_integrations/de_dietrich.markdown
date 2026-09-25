---
title: De Dietrich
description: Instructions on how to monitor and control a De Dietrich Diematic boiler in Home Assistant using Modbus RTU over TCP.
ha_category:
  - Sensor
ha_release: '2026.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@DaanVervacke'
ha_domain: de_dietrich
ha_platforms:
  - sensor
  - water_heater
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **De Dietrich** {% term integration %} connects Home Assistant to a Diematic boiler through a network gateway. It reads temperatures, water pressure, and other measurements over the local network, and exposes controls for the boiler's hot water.

## Supported devices

The integration detects the register layout automatically during setup. The library supports Diematic 3, Diematic 4, and iSystem layouts.

Hardware testing has focused on one iSystem installation reporting type code `D4`. Other Diematic 3 and Diematic 4 installations still need testing on real hardware. A reported type code such as `D4` does not reliably identify the physical boiler model.

## Unsupported devices

Diematic Delta and Diematic Evolution are not supported.

## Prerequisites

- A working connection from the boiler's Modbus interface to a serial-to-network gateway.
- A gateway that Home Assistant can reach over your local network.
- The gateway's hostname or IP address and TCP port, and the boiler's Modbus device address.

{% important %}
The gateway must forward Modbus RTU messages unchanged over TCP.

This is often called transparent mode or RTU over TCP.

A gateway configured to translate requests to standard Modbus TCP is not compatible with this integration.
{% endimportant %}

Configure the gateway's serial settings to match your boiler's Modbus interface. These settings belong to the gateway, not the Home Assistant setup form. Direct USB or serial connections to the Home Assistant host are not supported.

{% include integrations/config_flow.md %}

These three setup fields are required.

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the gateway connected to your boiler. You can find its address in your router or the gateway's settings."
Port:
  description: "The gateway's TCP port for forwarding Modbus RTU messages. The default is `502`. Match this to the gateway's configured port."
Modbus unit ID:
  description: "The boiler's Modbus device address. The default is `10`. Enter a value from `1` through `247` that matches your installation."
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
- **Circuit A room temperature**: The room temperature reported for heating circuit A.
- **Circuit B room temperature**: The room temperature reported for heating circuit B.
- **Circuit C room temperature**: The room temperature reported for heating circuit C. Only available on iSystem installations.

Temperature readings use degrees Celsius. Home Assistant can display them in your preferred temperature unit. **Flue gas temperature**, **Boiler temperature target**, **Fan speed**, and **Ionization current** are diagnostic sensors that are disabled by default. Enable them from the entity's settings if you need them.

A heating circuit is a separately controlled part of the heating system. Each circuit can serve one room or several rooms. The circuit room-temperature sensor only appears when the boiler reports at least one live reading for that circuit. A circuit with no readings configured on the boiler does not get a sensor.

Other sensors are created even when the corresponding probe is not fitted. A sensor can show **Unknown** when the controller does not provide a value.

### Water heater

When the boiler supports hot water, the integration creates a single **Hot water** water heater entity. It exposes the tank temperature and lets you change the operating mode and the day-mode target temperature.

- **Operating modes**: **Eco** matches the boiler's automatic mode, **Performance** matches the temporary comfort mode, and **High demand** matches the permanent comfort mode.
- **Target temperature**: 10 to 80 °C, in 1 °C steps. The integration writes the value to the boiler's day-mode setpoint. The boiler stores a separate night-mode setpoint that can only be changed on the boiler's panel.

If the boiler does not support hot water, no water heater entity is created.

## Data updates

The integration {% term polling polls %} the boiler every 15 seconds. It does not offer a polling interval setting.

If a group of readings fails to update, its sensors become unavailable while successfully updated groups remain available. A connection failure makes all sensors unavailable. The integration retries on subsequent polls.

## Known limitations

- The integration does not control heating circuits, heating modes, heating curves, weekly schedules, the boiler clock, the burner, or the pump. The only controls it exposes are the hot-water operating mode and the day-mode target temperature, both on the water heater entity.
- Burner and pump status, fault codes, energy consumption, and the library's other readings are not exposed as entities.
- Only RTU framing over a TCP connection is supported. Standard Modbus TCP framing and direct serial connections are not supported.
- The official De Dietrich Modbus communication gateway ([Modbus communication gateway for CTM and BMS](https://www.dedietrich-heating.com/products/product_ranges/control_panels/modbus_communication_gateway_for_ctm_and_bms)) has not been tested with this integration and might not work. The integration was tested with third-party RS485-to-TCP gateways.
- The integration has no additional settings or **Reconfigure** option. To change the host, port, or unit ID, remove the integration entry and add it again. Check any automations or dashboards that reference its entities afterward.

## Troubleshooting

### Cannot connect to the boiler

1. Check that the boiler and gateway are powered on and that Home Assistant can reach the gateway on your local network.
2. Confirm the host and port match the gateway's settings. An open gateway web page does not confirm that its Modbus forwarding port is reachable.
3. Check that the gateway forwards RTU messages unchanged over TCP, rather than translating standard Modbus TCP requests.
4. Verify the boiler's Modbus unit ID and the gateway's serial settings against your installation.
5. If another application is polling the same boiler, pause that application's polling and try again. A busy serial bus or a gateway's connection limit can prevent a response.

### A sensor is missing or shows Unknown

Check whether the controller displays that measurement and whether the corresponding probe is fitted. In particular, circuit room-temperature sensors only appear when the controller supplies a room-temperature value for that circuit. A flue gas sensor that is not fitted can leave **Flue gas temperature** as **Unknown**.

Compare **Boiler temperature target** with the controller's target, not with the measured **Boiler temperature**. These values describe different things and do not need to match.

### Diagnostic sensors are not visible

**Flue gas temperature**, **Boiler temperature target**, **Fan speed**, and **Ionization current** are added to the device, but they are disabled by default so they do not appear under the device's entities. Open the entity's settings page and enable it if you need its readings.

### Sensors become unavailable

Check the connection settings above and look for communication errors under {% my logs title="**Settings** > **System** > **Logs**" %}. If only some sensors are unavailable, a group of readings may have failed while the rest of the boiler still responds. Wait a bit to allow subsequent {% term polling polls %} to retry before changing the configuration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
