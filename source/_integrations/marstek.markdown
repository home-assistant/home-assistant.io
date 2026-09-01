---
title: Marstek
description: Instructions on how to integrate Marstek energy storage systems into Home Assistant.
ha_release: 2026.9
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: marstek
ha_codeowners:
  - '@MarstekEnergy'
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

# Marstek

The **Marstek** integration allows you to monitor your Marstek energy storage system directly in Home Assistant. It communicates with the device over your local network using UDP, so no cloud connection or internet access is required.

{% note %}
This integration **only supports** the following Marstek product models:

- **VENUS E 3.0**
- **VENUS A**
- **VENUS D**

Other Marstek models are **not supported**.
{% endnote %}

## Supported devices

This integration supports the following Marstek models:

| Model | Description |
| ----- | ----------- |
| VENUS E 3.0 | Energy storage system |
| VENUS A | Energy storage system |
| VENUS D | Energy storage system |

Other Marstek models are not supported by this integration.

## Prerequisites

Before setting up the integration:

- Your Marstek device must be powered on and connected to the same local network as your Home Assistant instance.
- The device's **OpenAPI** must be enabled in the Marstek app.
- If you have not set up the device in the app yet, install the Marstek app from the App Store or Google Play, add your device, then open the device settings and enable the local API.

## Configuration

{% include integrations/config_flow.md %}

During setup, you can either let Home Assistant search for your device on the local network, or enter the device's IP address manually.

{% configuration_basic %}
Host:
  description: The IP address of your Marstek device on your local network. This is only needed when setting up the device manually.
{% endconfiguration_basic %}

## Sensors

The integration provides the following sensors for your device:

- **Battery level** — current state of charge of the battery, in percent.
- **Grid power** — current power exchanged with the grid, in watts.
- **Device mode** — current operating mode of the device.
- **Battery status** — current battery charge/discharge status.
- **PV power / voltage / current / state** — solar (PV) metrics for each of the four PV inputs (PV1–PV4).

## Data updates

The integration polls the device for new data every 10 seconds.

## Known limitations

- The integration is read-only and does not control charging or discharging.
- Only VENUS E 3.0, VENUS A, and VENUS D devices are supported.
- The device must be reachable on the same local network as Home Assistant.

## Troubleshooting

### No devices found during discovery

If Home Assistant cannot find your device during discovery:

- Make sure the device is powered on and connected to the same network as Home Assistant.
- Make sure the device's **Open API** is enabled.
- Make sure you are using a supported model (**VENUS E 3.0**, **VENUS A**, or **VENUS D**).
- If discovery still fails, select **Enter device IP address** and configure the device manually.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

No additional steps are required to remove the device from Home Assistant.
