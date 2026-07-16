---
title: LinknLink
description: Instructions on how to integrate LinknLink eMotion Ultra devices with Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@linknlink'
ha_domain: linknlink
ha_platforms:
  - sensor
ha_integration_type: device
works_with:
  - local
ha_quality_scale: bronze
---

The **LinknLink** {% term integration %} connects eMotion Ultra presence sensors directly to Home Assistant over the local network. It provides environmental, target-count, and nearest-target distance sensors without requiring a cloud service or MQTT broker.

## Supported devices

- LinknLink eMotion Ultra

## Prerequisites

Before setting up the integration:

1. Complete Wi-Fi setup using a supported provisioning method for the device.
2. Connect Home Assistant and the device to the same local network.
3. Find the device IP address in your router.
4. Ensure that UDP traffic from Home Assistant to port `80` on the device is allowed.
5. Ensure that the network allows reply UDP traffic from the device to Home Assistant. The integration selects and maintains the local position-listener port automatically.
6. Ensure that TCP traffic from Home Assistant to port `6053` on the device is allowed for environmental and count states.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the eMotion Ultra device."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensor entities:

- Nearest target horizontal distance
- Nearest target three-dimensional distance
- Temperature
- Humidity
- Illuminance
- Wi-Fi signal strength
- Current target count
- Number of persons in fenced zones
- Zone 1 through Zone 4 target counts

The distance entities use real-time local radar coordinates. They show an unknown state when no target is present or the most recent coordinate data is more than 30 seconds old. They become unavailable only when the local position subscription is disconnected.

Temperature and humidity require the optional sensor power cable. Their entities remain unavailable when the device does not detect that cable. After connecting the cable and restarting the device, the integration discovers the sensors automatically. When a detected sensor temporarily omits a measurement, its entity shows an unknown state.

Other environmental and count sensors show an unknown state when the device omits an individual measurement. They become unavailable when their local data source is disconnected.

## Data updates

Target positions use a local UDP push subscription that is renewed every 40 seconds. Environmental, target-count, zone-count, and Wi-Fi states are read every 30 seconds through the device's local API. The integration renews authentication and retries after device restarts or network interruptions. Position subscriptions and environmental states recover independently when the device becomes reachable again.

## Actions

This integration does not provide custom actions.

## Known limitations

- The integration does not configure Wi-Fi. Initial provisioning must be completed before adding the device to Home Assistant.
- The device must be restarted after connecting or disconnecting the optional temperature and humidity sensor power cable.
- The device stores one local UDP position destination. Other software that subscribes to the same position stream redirects updates away from Home Assistant.
- Automatic network discovery is not provided in the initial release.
- The device network address can be changed from the integration's **Reconfigure** action. Assigning a stable DHCP lease is still recommended.

## Troubleshooting

### The device cannot be added

1. Confirm that the device is powered on and connected to Wi-Fi.
2. Confirm that the entered IP address belongs to the eMotion Ultra device.
3. Check that Home Assistant can reach the device network without client isolation or a firewall blocking UDP port `80`.
4. Check that TCP port `6053` is reachable when environmental or count sensors are unavailable.
5. Stop other local software controlling the device temporarily, then retry setup.

### Entities are unavailable

Confirm that the device still uses the configured IP address. If only temperature, humidity, illuminance, or zone-count sensors are unavailable, verify TCP access to port `6053`. If only the distance sensors are unavailable, verify UDP access to port `80` and return UDP traffic from the device to Home Assistant.

## Removing the integration

This integration follows standard integration removal. No data needs to be removed from the device.

{% include integrations/remove_device_service.md %}
