---
title: aerosmart
description: Instructions on how to integrate an aerosmart ventilation and heat-pump system with Home Assistant.
ha_release: 2026.11
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@kayloehmann'
ha_domain: aerosmart
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **aerosmart** {% term integration %} lets you monitor a combined aerosmart ventilation and heat-pump installation. Home Assistant connects locally through a Modbus TCP gateway or a directly connected serial Modbus RTU port, without a cloud service.

The integration represents the ventilation controller and heat-pump controller as one device. It provides operating values, filter information, and controller status.

## Supported devices

The integration supports an aerosmart installation that exposes the expected register map as two Modbus units on one Modbus connection, reached either over TCP or serial RTU:

- A ventilation controller, typically at unit address `1`.
- A heat-pump and hot-water controller, typically at unit address `2`.

The register map was derived from one physical installation because no official manufacturer register specification was available. Other installations can use different addresses or return different values.

## Prerequisites

- For a network setup, connect the controllers through a gateway that translates their serial Modbus communication to Modbus TCP, and make sure Home Assistant can reach its host and port.
- For a serial setup, connect the aerosmart Modbus bus to a serial port available to Home Assistant.
- Find the Modbus unit address for each controller. The defaults are `1` for ventilation and `2` for the heat pump.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Connection type:
  description: "Choose Network for a Modbus TCP gateway or Serial port for Modbus RTU."
Host:
  description: "The hostname or IP address of your Modbus TCP gateway. For example, `192.168.1.100`."
Port:
  description: "The TCP port of your Modbus gateway. The default is `502`."
Serial port:
  description: "The serial port connected to the aerosmart Modbus bus."
Baud rate:
  description: "The speed of the serial Modbus RTU connection. The default is `9600`."
Ventilation unit:
  description: "The Modbus unit address of the ventilation controller. The default is `1`."
Heat pump unit:
  description: "The Modbus unit address of the heat-pump and hot-water controller. The default is `2`."
{% endconfiguration_basic %}

## Supported functionality

The integration provides sensor entities for the complete installation.

### Sensors

Sensors report information such as:

- Supply, extract, outdoor, room, heat-pump, and hot-water temperatures.
- Supply and extract fan speeds and airflow values.
- Heat-pump status, pressure inputs, and remaining time in the current state.
- Filter operating hours, service life, and volume values.
- Operating-hour counters and controller information.

## Aerosmart automation examples

Use the aerosmart sensors in automations to react to changes in your installation. Create an automation in {% my automations title="**Settings** > **Automations & scenes**" %} with the trigger and action below.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the CO2 level is high

This automation sends a notification when the measured carbon dioxide level rises above 1000 ppm.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Aerosmart CO2 (`sensor.aerosmart_co2`)
  - **Above**: `1000`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The aerosmart CO2 level is above 1000 ppm.

{% details "YAML example for a high CO2 notification" %}

Replace the entity IDs with the ones from your aerosmart installation and notification device.

{% example %}
automation: |
  alias: "Notify when aerosmart CO2 is high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.aerosmart_co2
      above: 1000
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The aerosmart CO2 level is above 1000 ppm."
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} operating values and the controller clock every 60 seconds. It polls filter counters and other slow-changing values every 10 minutes.

Requests to both units are serialized because some serial-to-Modbus-TCP gateways need quiet time between requests. If one subsystem does not answer, only its entities become unavailable. Values from subsystems that answered remain available.

During setup, the integration waits for the first update from both controller units. A slow gateway can therefore delay setup for more than 30 seconds; if the initial update fails, Home Assistant retries setup. After setup, the integration polls values on its regular intervals.

## Known limitations

- The register map was derived from one physical installation, not from an official manufacturer specification. Entity names and units might not match every aerosmart installation.
- The integration creates one Home Assistant device for the whole installation, even though the ventilation controller and heat-pump controller use separate Modbus units.
- Other Modbus clients can interfere with communication when they share the same gateway or serial bus.
- Each value is read separately because the reference controller rejects larger combined register reads. A complete update can therefore take more than 30 seconds through a slow gateway.

## Troubleshooting

{% details "The integration can't connect during setup" %}

### Symptom: Setup reports a connection failure

The setup form reports that Home Assistant cannot connect after you submit the connection and unit details.

#### Resolution

1. For a network setup, confirm that the gateway is powered on and reachable from Home Assistant, then check its host and TCP port.
2. For a serial setup, confirm that the selected serial port and baud rate match the Modbus bus.
3. Check the unit address for both controllers.
4. Stop any other Modbus client temporarily if it shares the same gateway or serial bus.

{% enddetails %}

{% details "Entities become unavailable intermittently" %}

### Symptom: Some or all entities become unavailable

A slow gateway, a busy serial line, or another client can cause a polling cycle to time out. A failure in one subsystem only affects entities from that subsystem.

#### Resolution

1. Check {% my logs title="**Settings** > **System** > **Logs**" %} for Modbus timeouts or mismatched responses.
2. Make sure no external client is polling the same gateway too frequently.
3. Confirm that the gateway can keep separate TCP clients isolated, or use only Home Assistant as the client.
4. Wait for the next polling cycle. The integration reconnects and retries automatically.

{% enddetails %}

{% details "A specific entity shows an unexpected value" %}

### Symptom: A value does not match the installation

The register map might differ from the map used by the reference installation.

#### Resolution

1. Download diagnostics from the aerosmart device page.
2. Compare the raw value with the value shown by the aerosmart controller.
3. Include the affected entity and diagnostics when reporting the mismatch to the integration owner.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Home Assistant releases its use of the shared Modbus connection when the integration is unloaded.
