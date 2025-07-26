---
title: Probe Plus
description: Instructions on how to integrate Probe Plus food temperature probes into Home Assistant.
ha_release: 2025.6
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: probe_plus
ha_platforms:
  - sensor
ha_bluetooth: true
ha_codeowners:
  - '@pantherale0'
ha_integration_type: device
ha_quality_scale: bronze
---

The **Probe Plus** {% term integration %} allows you to view food temperature probe details supported by [Probe Plus](https://play.google.com/store/apps/details?id=com.yscoco.thermoex) through Home Assistant.

If your probe is within Bluetooth range to your Home Assistant host and the [Bluetooth](/integrations/bluetooth) integration is fully loaded, the probe should be discovered automatically provided that the model name starts with FM2. If you are configuring the device manually, your probe needs to be turned on during setup. 

Once the integration is set up, Home Assistant will try to connect to your probe every 15 seconds. This means there is sometimes a small delay between you removing the probe from its dock and Home Assistant connecting to it.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device:
  description: "The Bluetooth device that is your probe."
{% endconfiguration_basic %}

## Available functionality

### Sensors

- **Battery**: Current battery level of the relay and probe.
- **Temperature**: Current temperature reading from the probe.
- **Probe signal strength**: The signal strength of the probe to its charging dock.
- **Relay voltage**: Voltage of the battery within the charging dock (not supported on all models).
- **Probe voltage**: Voltage of the battery inside the probe.

## Supported devices

The following devices have been tested successfully with this integration:

- FMC210/FMC213

If you have successfully tested this integration with another probe model, please let us know by enhancing this documentation, or by opening an issue in GitHub.

## Possible use-cases

This integration can be used to monitor food temperatures, you could combine this with your Home Assistant Voice to alert you when the food has finished cooking. As a bonus, multiple probes are supported and therefore if you are cooking a large family meal, you can view all your food temperatures on one dashboard.

## Known limitations

- While this integration is configured for your device, you won't be able to use the official app, as only one connection at a time is supported.
- This assumes that the probe is configured to read the temperature in Celsius. Make sure you have changed this in the app before setting up in case you are using Fahrenheit. A template helper can be used to convert between units.

## Troubleshooting

{% details "Device not discovered or found" %}

Make sure your probe is removed from the charging dock and the dock is within Bluetooth range to your Home Assistant instance. [ESPHome Bluetooth Proxies](https://esphome.io/components/bluetooth_proxy.html) are a great way to increase the range if your instance is too far away. Turn on debug settings in the Probe Plus integration and check your logs.
{% enddetails %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
