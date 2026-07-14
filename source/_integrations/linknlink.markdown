---
title: LinknLink
description: Instructions on how to integrate LinknLink eMotion Ultra devices with Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 2026.8
ha_iot_class: Local Polling
ha_codeowners:
  - '@acmen0102'
ha_domain: linknlink
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: device
works_with:
  - local
ha_quality_scale: bronze
---

The **LinknLink** {% term integration %} connects eMotion Ultra and Ultra2
presence sensors directly to Home Assistant over the local network. Device
discovery, authentication, state updates, and control use the LinknLink DNA and
eMotion UDP protocols. The integration does not require a cloud service,
DeviceHub, MQTT, or the `linknlink-device-bridge` service.

## Supported devices

- LinknLink eMotion Ultra
- LinknLink eMotion Ultra2

## Prerequisites

Before setting up the integration:

1. Complete Wi-Fi setup for the device using the LinknLink app.
2. Connect Home Assistant and the device to the same local network.
3. Find the device IP address and MAC address in your router or on the device
   label.
4. Ensure that UDP traffic from Home Assistant to the device is allowed. The
   default device port is `80`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the eMotion Ultra device."
MAC address:
  description: "The MAC address printed on the device or shown by your router."
Port:
  description: "The DNA UDP port used by the device. The default is 80."
{% endconfiguration_basic %}

## Supported functionality

The available entities depend on the sensors and child devices reported by the
eMotion Ultra.

### Sensors

The integration can provide the following sensor entities:

- Temperature
- Humidity
- Illuminance
- Distance
- Target distance
- Target count
- Persons in fenced zones
- Detected position
- Wi-Fi signal strength

### Binary sensors

The integration can provide motion and presence binary sensor entities.

### Switches

When an eMotion child device reports a writable `power` or `switch` field, the
integration provides a switch entity for local control.

## Data updates

This integration uses local {% term polling %}. Home Assistant requests updated
device and child-device state every 30 seconds. A temporary communication error
makes the entities unavailable; polling resumes automatically and the local
session is re-established when the device becomes reachable again.

## Actions

This integration does not provide custom actions. Switch entities use the
standard Home Assistant switch actions.

## Known limitations

- The integration does not configure Wi-Fi. Initial BLE provisioning must be
  completed with the LinknLink app.
- Automatic network discovery is not provided in the initial release.
- The initial release uses polling and does not enable local UDP position push.
- Changing the device IP address requires removing and adding the integration
  again. Assigning a stable DHCP lease is recommended.

## Troubleshooting

### The device cannot be added

1. Confirm that the device is powered on and connected to Wi-Fi.
2. Confirm that the entered IP and MAC addresses belong to the same device.
3. Check that Home Assistant can reach the device network without client
   isolation or a firewall blocking UDP port 80.
4. Stop other local software controlling the device temporarily, then retry
   setup.

### Entities are unavailable

Confirm that the device still uses the configured IP address. Restart the
device and verify that UDP traffic between Home Assistant and the device is not
blocked.

## Removing the integration

This integration follows standard integration removal. No data needs to be
removed from the device.

{% include integrations/remove_device_service.md %}
