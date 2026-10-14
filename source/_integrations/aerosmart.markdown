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
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **aerosmart** {% term integration %} lets you monitor a combined aerosmart ventilation and heat-pump installation. Home Assistant connects locally through a Modbus TCP gateway, without a cloud service.

The integration represents the ventilation controller and heat-pump controller as one device. It provides operating values, filter information, and controller status.

## Supported devices

The integration supports an aerosmart installation that exposes the expected register map as two Modbus units on one Modbus TCP connection:

- A ventilation controller, typically at unit address `1`.
- A heat-pump and hot-water controller, typically at unit address `2`.

The register map was derived from one physical installation because no official manufacturer register specification was available. Other installations can use different addresses or return different values.

## Prerequisites

- Connect the controllers to your network through a gateway that translates their serial Modbus communication to Modbus TCP.
- Make sure Home Assistant can reach the gateway host and TCP port.
- Find the Modbus unit address for each controller. The defaults are `1` for ventilation and `2` for the heat pump.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Modbus TCP gateway. For example, `192.168.1.100`."
Port:
  description: "The TCP port of your Modbus gateway. The default is `502`."
Ventilation unit:
  description: "The Modbus unit address of the ventilation controller. The default is `1`."
Heat pump unit:
  description: "The Modbus unit address of the heat-pump and hot-water controller. The default is `2`."
{% endconfiguration_basic %}

## Configuration options

To change the gateway or either unit address, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **aerosmart**, and select **Configure**.

Before saving the new settings, Home Assistant checks that both controllers answer through the specified gateway.

## Supported functionality

The integration provides sensor entities for the complete installation.

### Sensors

Sensors report information such as:

- Supply, extract, outdoor, room, heat-pump, and hot-water temperatures.
- Supply and extract fan speeds and airflow values.
- Heat-pump status, pressure inputs, and remaining time in the current state.
- Filter operating hours, service life, and volume values.
- Operating-hour counters and controller information.

### Diagnostics

You can download diagnostics from the aerosmart device page. The diagnostics include the latest value of every known register and the state of both polling cycles. The gateway host is redacted.

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

The first update runs in the background so a slow gateway does not delay Home Assistant startup. Entities remain unavailable until their first successful update.

## Known limitations

- The register map was derived from one physical installation, not from an official manufacturer specification. Entity names and units might not match every aerosmart installation.
- The integration creates one Home Assistant device for the whole installation, even though the ventilation controller and heat-pump controller use separate Modbus units.
- Other Modbus clients can interfere with communication if the gateway accepts only one TCP client at a time.
- Each value is read separately because the reference controller rejects larger combined register reads. A complete update can therefore take more than 30 seconds through a slow gateway.

## Troubleshooting

{% details "The integration can't connect during setup" %}

### Symptom: Setup reports a connection failure

The setup form reports that Home Assistant cannot connect after you submit the gateway and unit details.

#### Resolution

1. Confirm that the gateway is powered on and reachable from Home Assistant.
2. Check the gateway host and TCP port.
3. Check the unit address for both controllers.
4. Make sure the gateway is translating to Modbus TCP, rather than forwarding raw serial data.
5. Stop any other Modbus client temporarily if the gateway accepts only one client.

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
