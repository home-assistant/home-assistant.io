---
title: AirGradient
description: Instructions on how to set up AirGradient devices in Home Assistant.
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

The **AirGradient** {% term integration %} will fetch data from your [AirGradient devices](https://www.airgradient.com/).
AirGradient creates indoor, outdoor, and portable air quality monitors that enable you to know if the air quality is healthy or not. They measure metrics such as PM2.5, CO2, TVOCs, and NOx. Both the software and hardware are open-source, allowing you to customize or extend the device functionality.

## Use cases

- Monitor indoor and outdoor air quality.
- Warn to open windows when CO2 levels are too high.
- Control ventilation systems based on air quality.

## Supported devices

- [AirGradient Indoor Air Quality Monitor](https://www.airgradient.com/indoor/)
- [AirGradient Outdoor Air Quality Monitor](https://www.airgradient.com/outdoor/)
- [AirGradient Portable Air Quality Monitor](https://www.airgradient.com/portable/)

{% important %}
Devices using the legacy local API require [firmware](https://www.airgradient.com/documentation/firmwares) version 3.1.1 or later to be set up or discovered by Home Assistant. This minimum version does not apply to the portable monitor, AirGradient Go.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname for your AirGradient device."
{% endconfiguration_basic %}

## Supported functionality

The following entities are available depending on your device model and the features it supports.

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
- Battery percentage
- Battery voltage (disabled by default)
- Input voltage (disabled by default)
- PM0.5 particle count (disabled by default)
- PM1 particle count (disabled by default)
- PM2.5 particle count (disabled by default)
- PM5 particle count (disabled by default)
- PM10 particle count (disabled by default)

Input voltage measures the charging input voltage; it does not indicate whether the battery is charging.

Several configuration entities are available as sensors to use in automations when you control the device via the AirGradient dashboard instead of locally:

- CO2 automatic baseline calibration days
- NOx learning offset
- Total volatile organic compounds learning offset
- Data used for the LED bar
- LED bar brightness
- Display temperature unit
- Display PM standard
- Display brightness

### Available configuration entities

The integration provides a few configuration entities to customize the device experience.
Set **Configuration source** to **Local** to access the supported settings and calibration or test buttons. The configuration source selector itself remains available when the source is set to **Cloud**.
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
- Measurement interval
- CO2 automatic baseline calibration days
- NOx learning offset
- Total volatile organic compounds learning offset
- GPS mode
- Front LED brightness
- Back LED brightness
- Touch LED intensity
- Buzzer
- Cloud connection

On devices with a **Cloud connection** setting, turning it off disables cloud communication while keeping the local connection to Home Assistant available.

### Updates

The AirGradient integration provides an update entity that checks for firmware updates for your AirGradient device.
To install the update, the device needs to be rebooted.

## Data updates

This integration uses local {% term polling %}, meaning it checks for changes to all entities by regularly communicating with the AirGradient device.

The **Measurement interval** setting controls how often the device takes measurements (1 to 3600 seconds). Home Assistant continues to retrieve the latest measurements every minute, regardless of this setting.

The integration will retrieve data from the device every minute.

The integration checks for firmware updates every hour.

## Actions

This integration does not provide additional actions. All actions available
for this integration are provided by their respective entities.

## Examples

The following examples show how to use the AirGradient integration in Home
Assistant automations. These examples are just a starting point, and you can
use them as inspiration to create your own automations.

### Notify when the CO2 level is too high

The following example sends a notification to your mobile device when the CO2 level exceeds 1000 ppm.


```yaml
automation:
  - alias: "Notify when CO2 level is too high"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.airgradient_carbon_dioxide
        above: 1000

    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "High CO2 Level Alert"
          message: >
            The CO2 level is too high at {{ states('sensor.airgradient_carbon_dioxide') }} ppm.
            Please consider ventilating the room.
```


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
