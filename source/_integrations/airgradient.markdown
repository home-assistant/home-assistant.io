---
title: AirGradient
description: Instructions on how to setup AirGradient devices in Home Assistant.
ha_category:
  - Health
  - Sensor
  - Update
ha_config_flow: true
ha_release: 2024.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@airgradienthq'
  - '@joostlek'
ha_domain: airgradient
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_zeroconf: true
works_with:
  - local
ha_quality_scale: platinum
---

The AirGradient integration will fetch data from your [AirGradient devices](https://www.airgradient.com/).
AirGradient creates indoor and outdoor air quality monitors that enable you to know if the air quality is healthy or not. They measure metrics such as PM2.5, CO2, TVOCs, and NOx. Both the software and hardware are open-source, allowing you to customize or extend the device functionality. 

## Use cases

- Monitor indoor and outdoor air quality.
- Warn to open windows when CO2 levels are too high.
- Control ventilation systems based on air quality.

## Supported devices

- [AirGradient Indoor Air Quality Monitor](https://www.airgradient.com/indoor/)
- [AirGradient Outdoor Air Quality Monitor](https://www.airgradient.com/outdoor/)

{% important %}
In order for the device to be set up or discovered by Home Assistant, the [firmware](https://www.airgradient.com/documentation/firmwares) version should be at least 3.1.1.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname for your AirGradient device."
{% endconfiguration_basic %}

## Supported functionality

Below is a complete overview of the entities this integration provides.

### Available sensors

The integration will fetch data from each device. The following sensors are supported:

- Carbon dioxide
- Humidity
- Nitrogen index
- PM0.3 count
- PM1 density
- PM2.5 density
- PM10 density
- Raw nitrogen
- Raw total volatile organic compounds
- Raw PM2.5
- Signal strength
- Temperature
- Total volatile organic compounds index

A number of configuration entities are available as sensors to automate with if you control the device via the AirGradient dashboard instead of set it to control locally.
- CO2 automatic baseline calibration days
- NOx learning offset
- Total volatile organic compounds learning offset
- Data used for the LED bar
- LED bar brightness
- Display temperature unit
- Display brightness

### Available configuration entities

The integration provides a few configuration entities to customize the device experience.
The settings are only available when the configuration source is set to local.
The following entities are supported:

- Display temperature unit
- Display brightness
- LED bar brightness
- Requesting CO2 calibration
- Requesting LED bar test
- Toggling sharing metrics with AirGradient
- Configuration source
- Data used for the LED bar
- Display PM standard
- CO2 automatic baseline calibration days
- NOx learning offset
- Total volatile organic compounds learning offset

### Updates

The AirGradient integration provides an update entity that checks for firmware updates for your AirGradient device.
To install the update, the device needs to be rebooted.

## Data updates

This integration uses local {% term polling %}, meaning it checks for changes to all entities by regularly communicating with the AirGradient device.

The integration will retrieve data from the device every minute.

The updates for the device are checked once every hour.

## Actions

This integration does not provide additional actions. All actions available
for this integration are provided by their respective entities.

## Examples

The following examples show how to use the AirGradient integration in Home
Assistant automations. These examples are just a starting point, and you can
use them as inspiration to create your own automations.

### Notify when the CO2 level is too high

The following example sends a notification to your mobile device when the CO2 level exceeds 1000 ppm.

{% raw %}

```yaml
automation:
  - alias: "Notify when CO2 level is too high"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.airgradient_carbon_dioxide
        above: 1000

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "High CO2 Level Alert"
          message: >
            The CO2 level is too high at {{ states('sensor.airgradient_carbon_dioxide') }} ppm.
            Please consider ventilating the room.
```

{% endraw %}

## Known limitations

The AirGradient integration currently has the following limitations:
- The update entity is not able to install updates automatically. You will need to reboot the device manually after installing the update.

## Troubleshooting

If you're experiencing issues with your AirGradient integration, try these general troubleshooting steps:

1. Make sure your AirGradient is powered on and properly connected to your home network.
2. If the integration shows as unavailable, try restarting both your AirGradient and Home Assistant.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
