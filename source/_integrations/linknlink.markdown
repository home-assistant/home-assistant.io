---
title: LinknLink
description: Instructions on how to integrate LinknLink eMotion Ultra devices with Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 2026.11
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

The **LinknLink** {% term integration %} connects eMotion Ultra presence sensors directly to Home Assistant over the local network. It provides environmental, people-count, zone-count, and nearest-person distance sensors without requiring a cloud service or MQTT broker.

## Supported devices

- LinknLink eMotion Ultra

## Prerequisites

Before setting up the integration, connect the device to Wi-Fi with the LinknLink app:

1. Install the **LinknLink** app from the App Store or Google Play and sign in or create a LinknLink account.
2. Put the device in setup mode. If its blue LED is not flashing intermittently, press and hold the reset button for 5 seconds until it does.
3. Turn on Bluetooth on your phone. In the app, select **+** > **Add device** > **Add a new device** > **eMotion series device**, then select the eMotion Ultra.
4. Select your 2.4 GHz Wi-Fi network, enter its password, and select **Connect now**. The LED flashes slower and then turns off when the device is connected.

Then prepare the network:

1. Connect Home Assistant and the device to the same local network.
2. Find the device IP address in your router or in the device details in the LinknLink app. Assigning a stable DHCP lease is recommended.
3. Allow Home Assistant to send UDP traffic to port `80` on the device.
4. Allow the device to send UDP radar updates to Home Assistant. The integration selects and maintains the destination port automatically.
5. Allow Home Assistant to open TCP connections to port `6053` on the device. The integration's client library uses the device's ESPHome native API on this port to read environmental and count states.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the eMotion Ultra device."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensor entities:

- **Detected people**: The number of people the radar currently detects anywhere in its detection area.
- **People in zones**: The number of people inside any of the detection zones configured on the device.
- **People in zone 1** through **People in zone 4**: The number of people inside each configured detection zone. A person in a zone is also counted in **People in zones** and **Detected people**, so these counts overlap and should not be added together.
- **Nearest person horizontal distance**
- **Nearest person distance**
- Temperature
- Humidity
- Illuminance
- Wi-Fi signal strength (disabled by default)

**Detected people** and the distance entities use real-time local radar updates. The distance entities show an unknown state when nobody is detected. These three entities become unavailable when the radar subscription is disconnected or the most recent radar update is more than 30 seconds old.

The horizontal distance is the nearest person's distance projected onto the radar's horizontal plane. The distance is the straight-line (three-dimensional) distance from the radar to the nearest person.

Temperature and humidity require the optional sensor power cable. Their entities remain unavailable when the device does not detect that cable. After connecting the cable and restarting the device, the integration discovers the sensors automatically. When a detected sensor temporarily omits a measurement, its entity shows an unknown state.

Other environmental and zone-count sensors show an unknown state when the device omits an individual measurement.

If Home Assistant cannot read the device state, all entities of the device become unavailable until the device can be reached again.

## Data updates

Radar updates (detected people and nearest distances) use a local UDP push subscription that is renewed every 40 seconds. Rapid radar updates are coalesced so that sensor states are written at most once per second. Environmental, zone-count, and Wi-Fi states are read every 30 seconds through the device's local API. If this read fails, all entities of the device become unavailable. The integration renews authentication and retries after device restarts or network interruptions.

## Actions

This integration does not provide custom actions.

## Known limitations

- The integration does not configure Wi-Fi. Connect the device to Wi-Fi with the LinknLink app before adding it to Home Assistant.
- The device must be restarted after connecting or disconnecting the optional temperature and humidity sensor power cable.
- The device stores one local UDP radar update destination. Other software that subscribes to the same radar stream redirects updates away from Home Assistant.
- Automatic network discovery is not provided in the initial release.
- Assigning a stable DHCP lease to the device is recommended. If its address changes, start the LinknLink setup flow again and enter the new address to update the existing device entry.

## Troubleshooting

### The device cannot be added

1. Confirm that the device is powered on and connected to Wi-Fi.
2. Confirm that the entered IP address belongs to the eMotion Ultra device.
3. Check that client isolation or a firewall does not block UDP traffic from Home Assistant to port `80` on the device.
4. If setup fails after the device is found, check that Home Assistant can open a TCP connection to port `6053` on the device. The integration uses the device's ESPHome native API on this port.
5. Stop other local software controlling the device temporarily, then retry setup.

### Entities are unavailable

Confirm that the device still uses the configured IP address. If all entities are unavailable, confirm that Home Assistant can open a TCP connection to port `6053` on the device. If only **Detected people** and the distance sensors are unavailable, confirm that Home Assistant can send UDP traffic to port `80` on the device and that the device can send UDP radar updates to Home Assistant. If only temperature and humidity are unavailable, check the optional sensor power cable.

## Removing the integration

This integration follows standard integration removal. No data needs to be removed from the device.

{% include integrations/remove_device_service.md %}
