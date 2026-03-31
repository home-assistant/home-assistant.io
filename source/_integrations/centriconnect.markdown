---
title: CentriConnect/MyPropane
description: Instructions on how to integrate CentriConnect/MyPropane monitors into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2025.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gresrun'
ha_domain: centriconnect
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
related:
  - url: https://developers.home-assistant.io/docs/documenting/standards
    title: Documentation standard
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/
    title: Integration Quality Scale - Rules
  - docs: /docs/glossary/
    title: Glossary
  - docs: /docs/tools/quick-search/#my-links
    title: My link
---

**CentriConnect/MyPropane** {% term integration %} allows you to monitor the level and status of propane tanks equiped with [centriconnect.com](https://www.centriconnect.com/) monitoring devices from within Home Assistant and setup automations based on the information.

## Supported devices

The following devices are known to be supported by the integration:

- MyPropane Tank Monitor (Above Ground)
- MyPropane Tank Monitor (Under Ground)

## Prerequisites

To use this integration, you need to register your tank monitor with CentriConnect and create an account

1. Make note of the full "Device ID" and "Device Authentication Code" printed on the setup card
1. Download the the **MyPropane** app and connect by scanning the QR code on the back of your tank monitor.
1. Follow the steps to create an account and register the device.
1. Select "Account" from the main menu
1. Copy or write down your "User ID"

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device ID:
    description: "The unique identifer for your tank monitor. You can find it on the back of the device or on the setup card."
Device Authorization Code:
    description: "The secret authorization code for the device. It is only located on the setup card."
User ID:
    description: "The unique identifier for your CentriConnect/MyPropane account. You can find it in the Account settings in the app."
{% endconfiguration_basic %}

## Supported functionality

The **CentriConnect/MyPropane** integration provides the following entities:

### Sensors

- **Alert Status**
  - **Description**: The alert status of the tank level with respect to the configured alert levels.
  - **Possible Values**: 'No Alert', 'Low Level', 'Critical Level'
  - **Remarks**: Alert levels are configured in the app and when the tank level falls below those levels this value is updated.

- **Altitude**
  - **Description**: Current altitude of the device in meters above sea level.
  - **Remarks**: Disabled by default.

- **Battery Level**
  - **Description**: Current battery percentage of the device.
  - **Remarks**: Battery is charged by the solar panel, if the battery is low, check to make sure the solar panel is clean and the device is oriented towards the sun.

- **Battery Voltage**
  - **Description**: Current battery voltage in volts
  - **Remarks**: Disabled by default. Usually between 3.5V and 4.05V.

- **Device Temperature**
  - **Description**: Current temperature measured by the device in °F
  - **Remarks**: Disabled by default. Not particularly useful as a thermometer since the value updates 2-3 times per day.

- **Last Post Time**
  - **Description**: Timestamp of the last device update
  - **Remarks**: Disabled by default.

- **Latitude**
  - **Description**: Latitude of the GPS coordinate of the device
  - **Remarks**: Disabled by default.

- **Longitude**
  - **Description**: Longitude of the GPS coordinate of the device
  - **Remarks**: Disabled by default.

- **LTE Signal Level**
  - **Description**: Current cellular signal level as a percentage
  - **Remarks**: -

- **LTE Signal Strength**
  - **Description**: Current cellular signal strength in dBm
  - **Remarks**: Disabled by default. Usually between -140 dBm and -70 dBm.

- **Next Post Time**
  - **Description**: Timestamp of the estimated next device update
  - **Remarks**: Disabled by default.

- **Solar Level**
  - **Description**: Current solar power level as a percentage
  - **Remarks**: -

- **Solar Voltage**
  - **Description**: Current solar power in volts
  - **Remarks**: Disabled by default. Usually between 0V and 2.86V.

- **Tank Level**
  - **Description**: Current tank level as a percentage
  - **Remarks**: This is the sensor you're looking for.

- **Tank Remaining Volume**
  - **Description**: Estimated remaining volume of fluid/gas in the tank
  - **Remarks**: Tank Level x Tank Size. The units of this sensor reflect the units provided for the tank size during device registration.

- **Tank Size**
  - **Description**: The volume of the tank. Provided during device registration.
  - **Remarks**: The units of this sensor reflect the units provided during device registration.

## Examples

### Display the current tank lavel as a gauge

The example below uses the common [gauge card](/dashboards/gauge/) in the {% term frontend %} to show the tank level with colored severity bands.

```yaml
type: gauge
entity: sensor.my_propane_tank_level
name: Tank Level
unit: '%'
needle: true
severity:
  green: 30
  yellow: 15
  red: 0
```

## Data updates

The **CentriConnect/MyPropane** integration {% term polling polls %} data from the API every 6 hours.

## Known limitations

The tank monitor only provides new data 2-3 times a day so more frequent polling is not configurable.

This integration exposes all the data provided in the API but not all data about the tank configuration shown in the app is exposed in the API.

## Troubleshooting

Before reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration.
As soon as the issue re-occurs, stop the debug logging again (_a download of the debug log file will start automatically_).
Additionally, download the {% term diagnostics %} data. Once you have collected the debug log and the diagnostics data, include them in the issue report.

## Remove the integration

{% include integrations/remove_device_service.md %}
