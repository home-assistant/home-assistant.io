---
title: BLANCO
description: Instructions on how to integrate BLANCO smart home devices in Home Assistant.
ha_category:
  - Water
ha_release: 2026.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@blancoGDPD"
ha_domain: blanco
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **BLANCO** {% term integration %} connects Home Assistant to the BLANCO Smart Home Cloud API and exposes data from supported BLANCO smart home devices as entities in Home Assistant. Depending on the device model, this includes water temperatures, filter and CO₂ capacities, connectivity information, and device error states.

## Supported devices

The integration is currently compatible with the following devices:

- **CHOICE.ALL**: All‑in‑one water system (still, sparkling, hot)
- **EVOL‑S PRO SODA (Rev F or later)**: Sparkling water system
- **AQUA**: Filtered water system with filter monitoring

All other BLANCO device types are not supported at this time.

## Prerequisites

Before setting up the integration, make sure the following requirements are met:

- The **BLANCO UNIT App** is installed on an iOS or Android device.
- The BLANCO device has already been added in the UNIT App.
- The device is connected to **Wi-Fi** and available online in the UNIT App.
- You are within **Bluetooth range** of the device during the Smart Home authorization step.

{% note %}
The Smart Home authorization must be granted from the BLANCO UNIT App while you are within Bluetooth range of the device.
{% endnote %}

### Authorizing the connection

Before starting the setup in Home Assistant, you must first authorize the connection in the **BLANCO UNIT App** by sending the **RCA (secure connection link)**. The authorization is valid for **5 minutes**.

1. Open the **BLANCO UNIT App**.
2. Select the device you want to connect.
3. Open **Settings**.
4. Navigate to **Smart Home**.
5. Send the **RCA (secure connection link)** by selecting **Activate**.
6. Within **5 minutes**, open Home Assistant and start the BLANCO integration setup.

To add the **BLANCO** integration to your Home Assistant instance, use this My button:

{% include integrations/config_flow.md %}

During setup in Home Assistant, confirm the integration and enter the **serial number** and **Service Code** shown in the UNIT App under **Smart Home**.

{% note %}
You must remain within Bluetooth range of the device when sending the RCA. If the 5‑minute authorization window expires, repeat the Smart Home authorization step in the UNIT App before trying again.
{% endnote %}

## Configuration variables

{% configuration_basic %}
Serial number:
  description: >
    The serial number of the device, available in the BLANCO UNIT App under
    **Settings** > **Smart Home** and on the device information label.
Service Code:
  description: >
    The Service Code for the device, shown in the BLANCO UNIT App under
    **Settings** > **Smart Home**.
{% endconfiguration_basic %}

## Available entities

The following entities are updated roughly every 30 seconds:

### Sensors

- **Last online**: The timestamp of the last successful connection to the BLANCO cloud.
- **Active errors**: The number of currently active errors reported by the device. To see detailed error information, open the BLANCO UNIT App.
- **Temperature: Cold**: The target temperature to which the cold water is cooled (if cooling is supported).
- **Temperature: Hot**: The target temperature to which the hot water is heated.
- **CO2: Remaining capacity**: Percentage of CO₂ remaining in the sparkling‑water system (EVOL‑S PRO SODA and CHOICE.ALL).
- **Filter: Remaining capacity**: Percentage of the filter's capacity remaining, depending on the device model.
- **Filter: Remaining quantity**: Remaining water volume in liters before the filter is exhausted (AQUA devices).
- **Filter: Remaining time**: Remaining time in days before the filter is exhausted (AQUA devices).

## Data updates

The integration uses {% term polling %} to retrieve data from the BLANCO Cloud API approximately every **30 seconds**.
Entity values are updated whenever the cloud reports a change. If no change is reported, values are refreshed at the next polling cycle.

The integration requires an active internet connection for both the device and the Home Assistant instance.

## Known limitations

- A single BLANCO device can only be linked to **one** Home Assistant instance at a time.
- The integration is **cloud‑based** and does not provide local communication.
- The integration provides monitoring entities only. Device control and actions are not supported.
- Initial Smart Home authorization requires **Bluetooth proximity** to the device.
- The following device types are currently not supported: all other BLANCO devices besides CHOICE.ALL, EVOL‑S PRO SODA (Rev F or later), and AQUA.

## Troubleshooting

### Setup fails with an invalid Service Code or serial number

Verify that both the **Serial number** and the **Service Code** were entered exactly as shown in the UNIT App. If necessary, open the device information page or the **Smart Home** page in the UNIT App and compare the values again.

### Setup fails while sending the RCA

Make sure you are within **Bluetooth range** of the device when sending the RCA (secure connection link) from the UNIT App. If Bluetooth proximity is missing, the authorization cannot be completed.

### Setup fails because the RCA expired

The RCA authorization is valid for **5 minutes** only. If the setup is not completed in time, repeat the Smart Home authorization step in the UNIT App and generate a new RCA.

### Device cannot be added to Home Assistant

A BLANCO device can only be connected to **one Home Assistant instance** at a time. If the device was previously linked to a different Home Assistant instance, remove that connection first before trying again.

## Removing the integration

The integration can be removed in two ways:

- In **Home Assistant**: Remove the integration as usual via **Settings** > **Devices & services**.
- In the **BLANCO UNIT App**: Open the UNIT App, go to **Settings** > **Smart Home**, select the device, and select **Deactivate** to end the Smart Home connection there.

If you want to link the device again to a Home Assistant instance later, repeat the Smart Home authorization step in the UNIT App and follow the setup procedure anew.
