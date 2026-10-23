---
title: Powersensor
description: Integrate Powersensor plugs and sensors into Home Assistant
ha_release: 2026.11
ha_category: Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jmattsson'
  - '@bookman-dius'
ha_domain: powersensor_au
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://dius.github.io/homeassistant-powersensor/
    title: External documentation
---

The **Powersensor** {% term integration %} integrates [Powersensor](https://www.powersensor.com.au) devices into Home Assistant. The integration lets you view data from Powersensor plugs and sensors and use them in automations.

## Supported devices

The following devices are known to be supported by the integration:

- Powersensor Plugs with firmware >=8129
- Powersensor Sensors with firmware >=8129

## Unsupported devices

Devices running firmware <8129 are not supported and should be upgraded, though devices with firmware >=8100 may have partial functionality within Home Assistant.

## Prerequisites

Before setting up this integration, make sure that the following criteria are met:

- Your Powersensor devices are powered on and connected to the same Wi-Fi network as Home Assistant
  - Please note: Installing Powersensor devices in your home requires the mobile app which provides step-by-step instructions on initial configuration. This is only required for initial set up. Once your devices are connected to Wi-Fi, the Home Assistant integration should work regardless of whether or not you subsequently delete the mobile app from your devices.
- Your devices are running firmware 8129 or later (check via the Powersensor mobile app)
- UDP and multicast traffic are allowed between Home Assistant and your Powersensor plugs
  - Home Assistant finds your plugs using mDNS, which relies on multicast. If your network blocks multicast, for example between separate VLANs, Home Assistant can't discover your plugs.

{% include integrations/config_flow.md %}

## Reconfiguration

Each Powersensor sensor has a role that describes what it measures: your home's mains supply, your solar panels, water, or a single appliance. The role decides which entities the sensor has, and which sensors the household view uses. Sensors normally report their role themselves, based on how you set them up in the Powersensor app.

Some older sensors (revision 6) can lose their role, for example when their battery runs flat, and don't report it again. You can set the role of these sensors in Home Assistant:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **Powersensor** integration, select the three-dot {% icon "mdi:dots-vertical" %} menu and then select **Reconfigure**.
3. Select the **Role** of the sensor shown, then select **Next** to move to the next sensor.
4. For the last sensor, select **Submit**. Home Assistant reloads the integration to apply the new roles.

A role that a sensor reports always takes priority. If a sensor reports a different role, it replaces the one you set here. To change the role of a sensor that reports its own, use the Powersensor app.

You can reconfigure the integration once it has found at least one sensor.

## Supported functionality

The **Powersensor** integration provides the following entities.

### Sensors

Which entities a sensor has depends on its role.

- **Battery**
  - **Description**: The battery level of the sensor. This is an estimate, see [Known limitations](#known-limitations).
  - **Available for**: All sensors
- **Power**
  - **Description**: The power measured by the sensor.
  - **Available for**: Sensors with the mains, solar, or appliance role
- **Energy**
  - **Description**: The total energy measured by the sensor. The sensor measures energy flowing in both directions, so this value can go down as well as up.
  - **Available for**: Sensors with the mains, solar, or appliance role
- **Volume flow rate**
  - **Description**: The rate of water flow measured by the sensor.
  - **Available for**: Sensors with the water role
  - **Remarks**: If it stays unavailable, see [Troubleshooting](#troubleshooting).
- **Water**
  - **Description**: The total amount of water measured by the sensor.
  - **Available for**: Sensors with the water role
  - **Remarks**: If it stays unavailable, see [Troubleshooting](#troubleshooting).
- **Device role**
  - **Description**: The sensor's current role.
  - **Available for**: All sensors
  - **Remarks**: Diagnostic entity
- **Signal strength (Bluetooth)**
  - **Description**: The strength of the Bluetooth signal between the sensor and the plug that relays its data.
  - **Available for**: All sensors
  - **Remarks**: Diagnostic entity

### Plugs

Every plug has the following entities.

- **Power**
  - **Description**: The power used by the appliance connected to the plug.
- **Voltage**
  - **Description**: The mains voltage at the plug.
- **Apparent current**
  - **Description**: The total current drawn by the appliance connected to the plug.
- **Active current**
  - **Description**: The part of the current that is in phase with the voltage and delivers power to the appliance.
- **Reactive current**
  - **Description**: The part of the current that is out of phase with the voltage and does not deliver power to the appliance.
- **Energy**
  - **Description**: The total energy used by the appliance connected to the plug.
- **Device role**
  - **Description**: The plug's role, which is always **Appliance**.
  - **Remarks**: Diagnostic entity

### Household view

The integration adds a **Household view** device that combines the readings from your mains and solar sensors into figures for your whole home. Its entities appear once Home Assistant has found a mains sensor. The solar entities appear once it has also found a solar sensor.

- **Power - home use**
  - **Description**: The power your home is using.
  - **Available for**: Homes with a mains sensor
- **Power - from grid**
  - **Description**: The power your home is drawing from the grid.
  - **Available for**: Homes with a mains sensor
- **Energy - home usage**
  - **Description**: The total energy your home has used.
  - **Available for**: Homes with a mains sensor
- **Energy - from grid**
  - **Description**: The total energy your home has drawn from the grid.
  - **Available for**: Homes with a mains sensor
- **Power - to grid**
  - **Description**: The power your home is sending to the grid.
  - **Available for**: Homes with a mains sensor and a solar sensor
- **Power - solar generation**
  - **Description**: The power your solar panels are generating.
  - **Available for**: Homes with a mains sensor and a solar sensor
- **Energy - to grid**
  - **Description**: The total energy your home has sent to the grid.
  - **Available for**: Homes with a mains sensor and a solar sensor
- **Energy - solar generation**
  - **Description**: The total energy your solar panels have generated.
  - **Available for**: Homes with a mains sensor and a solar sensor

## Actions

This integration does not provide any custom actions.

## Known limitations

- The household view only calculates figures while all of its sensors are reporting. If your mains or solar sensor stops reporting, the household view entities keep their last values and stop updating until it reports again. If your home no longer has solar, for example after you move, set up your plugs and sensors again in the Powersensor app, then remove the integration and add it again.
- The household view supports only one solar sensor. If you have more than one, its figures are wrong: the power figures only include one solar sensor at a time, and the energy figures either don't update or jump by large amounts. Each solar sensor's own entities aren't affected and show correct values.
- The integration supports one Powersensor installation per network. If plugs and sensors from more than one installation are on the same network, Home Assistant adds all of them, and the household view may combine readings from the wrong sensors and show incorrect figures.
- Changing a sensor's role doesn't remove the entities that belonged to its previous role. Role changes are often temporary, and removing those entities would also remove their recorded history. After Home Assistant restarts, entities that no longer match the sensor's role show as unavailable, and you can delete the ones you no longer need.
- A role you set in Home Assistant is replaced as soon as the sensor reports a role itself. To change the role of a sensor that reports its own, use the Powersensor app.
- Sensors aren't linked to a specific plug in Home Assistant. Any plug within range can relay a sensor's data, and a sensor moves to another plug when it can't reach its current one. If you remove a plug, its sensors can take a few hours to find another plug, and their entities are unavailable until they do.
- The battery level is estimated from the battery's voltage, so it's approximate.

## Troubleshooting

### Water sensor entities stay unavailable

#### Symptom: Volume flow rate and Water show as unavailable

The **Volume flow rate** and **Water** entities of a water sensor show as unavailable and don't update.

#### Resolution

The water sensor may be missing its water meter scale. To set it:

1. In the Powersensor app, open the water sensor's device screen.
2. Set the **Water meter scale**.

## Removing a device

To remove a plug or sensor you no longer use from Home Assistant:

1. Unplug the plug, or switch off the sensor.
2. Wait about 5 minutes, until Home Assistant stops receiving data from it.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Powersensor**, and select the device.
4. Select the three dots {% icon "mdi:dots-vertical" %} menu and then select **Delete**.

A device that's still on your network can't be deleted, because it would come back with its next reading. The household view can't be deleted.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
