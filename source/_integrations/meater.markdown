---
title: Meater Smart Meat Thermometer
description: Instructions on how to integrate the Meater Temperature Probe within Home Assistant.
ha_category:
  - Sensor
ha_release: '2021.2'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Sotolotl'
ha_domain: meater
---

The Meater Smart Meat Thermometer integration allows for communicating with the [Meater Temperature Probe](https://meater.com/) from Apption Labs.

## Configuration

To use the integration, your probe must be connected to the Meater Cloud service.

To enable the integration, either set it up via the UI, or add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
meater:
  username: "YOUR_MEATER_CLOUD_USERNAME"
  password: "YOUR_MEATER_CLOUD_PASSWORD"
  
```

Probes will be added as soon as they're seen by Home Assistant. They will be marked unavailable when the probes are disconnected from Meater Cloud.

Currently, both the internal and external temperature of each probe will be displayed.

## Troubleshooting

Devices will only be returned from the Meater Cloud API after the following criteria are met. There may be a delay between the Meater Cloud seeing your device and it being returned by the API.

- Device must be seen by the Meater Cloud. Ensure you've completed a cook while connected to Meater Cloud.
- The Meater app or Block must have an active Bluetooth connection with the device.
- The Meater app or Block must have an active Meater Cloud connection.