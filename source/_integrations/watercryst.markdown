---
title: WATERCryst
description: Integrate with WATERCryst devices.
ha_category:
  - Sensor
  - Water Management
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@WATERCryst'
ha_config_flow: true
ha_domain: watercryst
ha_integration_type: device
ha_platforms:
  - sensor
---

The **WATERCryst** {% term integration %} is used to integrate with [WATERCryst](https://www.watercryst.com) devices.
They provide various devices for lime scale and leakage protection.

## Prerequisites

1. Open the [myBIOCAT Web App](https://app.watercryst.com).
2. Navigate to the details page of your device.
3. Open the **REST API** subpage.
4. Select **Activate device API** if it is not already activated.
5. Select **Add** to create a new endpoint.
6. Copy the API key for later use.

{% include integrations/config_flow.md %}

{% configuration_basic %}
BIOCAT serial number:
    description: The BIOCAT serial number. You can find it on the [myBIOCAT web app](https://app.watercryst.com) device details page and on the device itself.
Api key:
    description: The myBIOCAT REST API key. You can find it on the [myBIOCAT web app](https://app.watercryst.com) device details page under the **REST API** subpage.
{% endconfiguration_basic %}

## Supported functionality

The **WATERCryst** integration provides the following entities.

### Sensors

- **Device Mode**
  - **Description**: Designates the device's current mode of operation.
  - **Available for machines**: all
  - **Remarks**: See the [API documentation](https://appapi.watercryst.com/#get-/state) for details.

- **Event Category**
  - **Description**: The category of the event.
  - **Available for machines**: all

- **Event ID**
  - **Description**: The unique event identifier.
  - **Available for machines**: all

- **Last Water Tap Duration**
  - **Description**: Duration of the last water tapping in seconds [sec].
  - **Available for machines**: Devices that have a flow rate sensor.

- **Last Water Tap Volume**
  - **Description**: Volume of the last water tapping in liters [L].
  - **Available for machines**: Devices that have a flow rate sensor.

- **Microleakage Measurement State**
  - **Description**: Designates the state of the current/last microleakage measurement.
  - **Available for machines**: Devices that support leakage protection.
  - **Remarks**: See the [API documentation](https://appapi.watercryst.com/#get-/state) for details.

- **Pause Leakage Protection Until**
  - **Description**: UTC date and time when the leakage protection will be active again.
  - **Available for machines**: Devices that support leakage protection.

- **Today's Water Consumption**
  - **Description**: The total water consumption for the current day in liters [L].
  - **Available for machines**: Devices that have a flow rate sensor.
  
- **Total Water Consumption**
  - **Description**: The total water consumption in liters [L].
  - **Available for machines**: Devices that have a flow rate sensor.

- **Water Flow Rate**
  - **Description**: The current flow rate in liters per minute [L/min].
  - **Available for machines**: Devices that have a flow rate sensor.

- **Water Pressure**
  - **Description**: The current water pressure in [bar].
  - **Available for machines**: Devices that have a pressure sensor.

- **Water Temperature**
  - **Description**: The current water temperature in [°C].
  - **Available for machines**: Devices that have a temperature sensor.

## Data updates

The **WATERCryst** integration {% term polling polls %} state data from the device every 30 seconds and measurement data every minute by default.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
