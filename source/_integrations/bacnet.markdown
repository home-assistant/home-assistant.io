---
title: BACnet
description: Instructions on how to integrate BACnet devices with Home Assistant.
ha_category:
  - Number
  - Select
  - Sensor
  - Switch
ha_release: "2025.x"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@fishloa"
ha_domain: bacnet
ha_integration_type: hub
ha_quality_scale: silver
ha_platforms:
  - binary_sensor
  - number
  - select
  - sensor
  - switch
---

The **BACnet** {% term integration %} allows you to monitor [BACnet](https://www.bacnet.org/) devices on your local network. BACnet (Building Automation and Control Networks) is a communication protocol commonly used in building automation systems for <abbr title="heating, ventilation, and air conditioning">HVAC</abbr>, lighting, access control, and fire detection.

## Prerequisites

- One or more BACnet/IP devices accessible on your local network
- The Home Assistant host must be on the same network (or routed) as the BACnet devices
- BACnet devices must support BACnet/IP (UDP port 47808 by default)

{% include integrations/config_flow.md %}

When you add this integration, the configuration flow guides you through two stages: first configuring a hub (BACnet client), and then adding devices.

### Stage 1: Hub setup

{% configuration_basic %}
IP address:
  description: "The IP address of the network interface to bind the BACnet client to. Select a specific interface, enter one manually, or choose `0.0.0.0` to listen on all interfaces."
{% endconfiguration_basic %}

### Stage 2: Device setup

After the hub is configured, you can add BACnet devices. The integration discovers devices automatically using BACnet _Who-Is_ broadcasts. You can also add devices manually.

#### Automatic discovery

{% configuration_basic %}
Device:
  description: "The BACnet device to add to Home Assistant. Devices are shown with their name, vendor, model, and network address."
{% endconfiguration_basic %}

After selecting a device, the integration reads the device's object list. You can then choose which objects to monitor:

{% configuration_basic %}
Objects:
  description: "The BACnet objects to add from this device. Each object becomes an entity in Home Assistant (sensor, binary sensor, number, switch, or select depending on the object type)."
{% endconfiguration_basic %}

#### Manual configuration

{% configuration_basic %}
Device instance ID:
  description: "The BACnet device instance number."
Device network address:
  description: "The IP address and port of the BACnet device (for example, `192.168.1.100:47808`)."
{% endconfiguration_basic %}

## Configuration options

After a device is set up, you can change which BACnet objects are monitored through the integration options.

{% configuration_basic %}
Objects:
  description: "The BACnet objects to monitor from this device. Deselect objects you no longer want to track, or select new ones that were discovered."
{% endconfiguration_basic %}

### Reconfiguration

You can reconfigure both hub and device entries:

- **Hub**: Update the network interface IP address.
- **Device**: Update the device network address (for example, if the device IP changed).

## Supported functionality

### Entities

The **BACnet** integration provides the following entities.

#### Sensors

The integration creates read-only sensor entities for the following BACnet object types:

- Analog Input
- Analog Value
- Multi-state Input
- Multi-state Value

#### Binary sensors

The integration creates read-only binary sensor entities for the following BACnet object types:

- Binary Input
- Binary Value

#### Numbers

The integration creates writable number entities for the following BACnet object types:

- Analog Output

#### Switches

The integration creates writable switch entities for the following BACnet object types:

- Binary Output

#### Selects

The integration creates writable select entities for the following BACnet object types:

- Multi-state Output

All write operations use BACnet priority 16 (the lowest priority).

## Data updates

The integration uses a hybrid update strategy:

- **Change of Value (COV) subscriptions**: For supported objects, the device pushes value changes to Home Assistant in real time.
- **Polling**: Objects without COV support are polled at a regular interval as a fallback.

## Known limitations

- Only BACnet/IP is supported (not MS/TP or other data link layers).
- The integration binds to a single network interface per hub.
- BACnet routing (<abbr title="BACnet Broadcast Management Device">BBMD</abbr>) is not currently supported.
- Write operations are limited to output object types (analog-output, binary-output, multi-state-output) at priority 16.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the hub entry will disconnect from the BACnet network and remove all associated device entries.
