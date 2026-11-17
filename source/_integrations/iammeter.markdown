---
description: Instructions on how to integrate IAMMETER sensor within Home Assistant.
ha_release: 0.107
ha_domain: iammeter
related:
  - docs: /docs/configuration/
    title: Configuration file
---

All [IAMMETER](https://www.iammeter.com/) energy meters support integration with Home Assistant for monitoring electricity consumption, grid import and export, and solar generation. For home users, IAMMETER recommends these three models:

- [WEM3080](https://www.iammeter.com/products/single-phase-meter): A single-channel meter for monitoring one single-phase circuit, such as the grid connection, solar inverter output, or a dedicated load.
- [WEM2067](https://www.iammeter.com/products/split-phase-meter-wem2067): A dual-channel meter for monitoring both the grid connection and solar generation in a single-phase home, or the two legs of a split-phase grid supply.
- [WEM3050T](https://www.iammeter.com/products/3phase-meter-3050t): A three-channel meter for residential energy monitoring in single-phase, split-phase, or three-phase systems.

## Integration options

IAMMETER energy meters can connect to Home Assistant in four ways:

- Built-in IAMMETER integration: Reads measurements over local HTTP and is configured in YAML, as described below.
- Modbus TCP: Uses Home Assistant's Modbus integration to read measurements from the meter.
- MQTT: Supports manually configured sensors or MQTT discovery, which automatically creates the device and sensor entities.
- HACS custom integrations: Provide HTTP and Modbus TCP options with configuration through the Home Assistant interface.

For a comparison and setup instructions, see the [IAMMETER Home Assistant integration guide](https://www.iammeter.com/docs/home-assistant).

### Recommended: MQTT discovery

For convenient setup with automatic device and entity creation, IAMMETER recommends MQTT discovery.

Connect Home Assistant's [MQTT integration](/integrations/mqtt/) to your broker, configure the same broker in the meter's web interface, and enable **HA MQTT Discovery**. Use meter firmware that supports this feature. See the [IAMMETER MQTT discovery guide](https://www.iammeter.com/newsshow/mqtt-discovery-energy-meter) for instructions.

MQTT discovery works through the MQTT integration and is an alternative to the IAMMETER YAML configuration below. In MQTT upload mode, the meter does not simultaneously upload measurements to IAMMETER Cloud.

## Configuration

To use this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iammeter
    host: IP_ADDRESS_OF_HOST
```

{% configuration %}
host:
  description: The IP address of your IAMMETER.
  required: true
  type: string
port:
  description: port of your IAMMETER.
  required: false
  default: 80
  type: integer
name:
  description: Name for the sensor entity.
  required: false
  type: string
  default: IamMeter
{% endconfiguration %}

## Sensors

Sensors available in the library:

### Single-phase energy meter (WEM3080/WEM3162)

| name                 | Unit | Description                  |
| -------------------- | ---- | :--------------------------- |
| wem3080_voltage      | V    | Voltage.                     |
| wem3080_current      | A    | current.                     |
| wem3080_power        | W    | active power.                |
| wem3080_importenergy | kWh  | Energy consumption from grid |
| wem3080_exportgrid   | kWh  | Energy export to grid        |

### Three-phase energy meter (WEM3080T)

| name                    | Unit | Description           |
| ----------------------- | ---- | :-------------------- |
| wem3080t_voltage_a       | V    | A phase voltage       |
| wem3080t_current_a       | A    | A phase current       |
| wem3080t_power_a         | W    | A phase active power  |
| wem3080t_importenergy_a  | kWh  | A phase import energy |
| wem3080t_exportgrid_a    | kWh  | A phase export energy |
| wem3080t_frequency_a     | Hz   | A phase frequency     |
| wem3080t_pf_a            |      | A phase power factor  |
|                         |      |                       |
| wem3080t_voltage_b       | V    | B phase voltage       |
| wem3080t_current_b       | A    | B phase current       |
| wem3080t_power_b         | W    | B phase active power  |
| wem3080t_importenergy_b  | kWh  | B phase import energy |
| wem3080t_exportgrid_b    | kWh  | B phase export energy |
| wem3080t_frequency_b     | Hz   | B phase frequency     |
| wem3080t_pf_b            |      | B phase power factor  |
|                         |      |                       |
| wem3080t_voltage_c       | V    | C phase voltage       |
| wem3080t_current_c       | A    | C phase current       |
| wem3080t_power_c         | W    | C phase active power  |
| wem3080t_importenergy_c  | kWh  | C phase import energy |
| wem3080t_exportgrid_c    | kWh  | C phase export energy |
| wem3080t_frequency_c     | Hz   | C phase frequency     |
| wem3080t_pf_c            |      | C phase power factor  |

## Test before using a physical meter

Before using a physical IAMMETER meter, you can use the [online simulator](https://simulator.iammeter.com/) to explore Home Assistant integration, view simulated readings, and test dashboards and automations.

Choose a connection method based on your network setup:

- If your MQTT broker is accessible from the internet, IAMMETER recommends MQTT discovery as the easiest option. The simulator connects to your broker and publishes discovery messages and simulated measurements, allowing Home Assistant to create the device and sensor entities automatically. Follow the [simulator and MQTT discovery tutorial](https://www.iammeter.com/newsshow/home-assistant-mqtt-discovery-simulator).
- If your MQTT broker is only accessible on your local network, use the HACS IAMMETER HTTP or Modbus TCP integration to test with the simulator instead. Home Assistant connects to the simulator's HTTP or Modbus TCP endpoint, so you do not need to make your MQTT broker publicly accessible. Follow the [simulator HTTP and Modbus TCP integration guide](https://simulator.iammeter.com/docs/home-assistant/).

For MQTT testing, Home Assistant and the simulator must connect to the same broker. The connection from the online simulator originates from its server, so a local-only broker address cannot be used.

For HTTP testing, use the HACS integration with full URL support, as described in the guide. The public simulator's custom URL paths are not assumed to work with the built-in IAMMETER YAML integration.
