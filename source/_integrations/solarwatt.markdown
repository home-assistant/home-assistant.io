---
title: Solarwatt
description: Instructions on how to connect your Solarwatt Battery flex to Home Assistant.
ha_category:
  - Energy
  - Solar
  - Storage
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_release: 2026.3
ha_codeowners:
  - '@christiangeie'
ha_domain: solarwatt
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

The **Solarwatt** {% term integration %} allows Home Assistant to read live data from [Solarwatt](http://www.solarwatt.com/) storage devices and present the values as sensors.

## Supported devices

The following devices are known to be supported by the integration:

- Battery flex

## Unsupported devices

The following devices are not supported by the integration:

- Battery vision

## Prerequisites

- No Solarwatt account or app is needed.
- No authentication is required.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address.
  required: true
  type: string
Port:
  description: The port number.
  required: false
  type: integer
  default: 8080
{% endconfiguration_basic %}

## Supported functionality

- State of Charge (SOC)
- State of Health (SOH)
- Battery current & voltage
- Accumulated charge/discharge
- AC/DC values
- Grid import/export
- Temperatures
- Firmware information

The Solarwatt integration provides the following entities.

### Sensors

The integration provides multiple sensors grouped by BatteryFlex serial number.

Example:

- `SN: 0004A20B000BF3A3 Battery State of Charge`
- `SN: 0004A20B000BF3A3 Grid Power`
- `SN: 0004A20B000BF3A3 Ambient Temperature`

All currently available sensors can be found below.

- **Battery State of Charge**
  - **Description**: Current battery charge level (SOC)
  - **Unit**: %
- **Battery State of Health**:
  - **Description**: Health status of the battery (SOH)
  - **Unit**: %
- **Battery Voltage**:
  - **Description**: Battery voltage
  - **Unit**: V
- **Battery Current**:
  - **Description**: Battery current (positive = charging, negative = discharging)
  - **Unit**: A
- **Cumulated Current Out**:
  - **Description**: Total discharged amp-hours
  - **Unit**: Ah
- **Cumulated Current In**:
  - **Description**: Total charged amp-hours
  - **Unit**: Ah
- **Battery Energy Out**:
  - **Description**: Total discharged energy
  - **Unit**: Wh
- **Battery Energy In**:
  - **Description**: Total charged energy
  - **Unit**: Wh
- **Home Power**:
  - **Description**: Household power consumption
  - **Unit**: W
- **Grid Power**:
  - **Description**: Power imported/exported from the grid
  - **Unit**: W
- **Grid Frequency**:
  - **Description**: Mains AC frequency
  - **Unit**: Hz
- **Ambient Temperature**:
  - **Description**: Internal ambient temperature
  - **Unit**: °C
- **AC Voltage**:
  - **Description**: AC output/input voltage
  - **Unit**: V
- **AC Current**:
  - **Description**: AC output/input current
  - **Unit**: A
- **AC Frequency**:
  - **Description**: AC frequency
  - **Unit**: Hz
- **DC Voltage**:
  - **Description**: DC bus voltage
  - **Unit**: V
- **DC Power Charge**:
  - **Description**: DC charging power into the battery
  - **Unit**: W
- **DC Power Discharge**:
  - **Description**: DC discharging power from the battery
  - **Unit**: W
- **System Voltage**:
  - **Description**: System internal low-voltage bus (19V)
  - **Unit**: mV
- **Cell Voltage**:
  - **Description**: Backup/auxiliary 2.5V–3V system cell voltage
  - **Unit**: mV
- **Cell Temperature**:
  - **Description**: Cell / module temperature (if exposed)
  - **Unit**: °C
- **Firmware Version**:
  - **Description**: Reported firmware version
  - **Unit**: -
- **Hardware Version**:
  - **Description**: Reported hardware version|
- **ACS Version**:
  - **Description**: AC Sensor firmware version
  - **Unit**: -
- **Device IP Address**:
  - **Description**: Reported IP address of the device
  - **Unit**: -

## Troubleshooting

- Ensure the device responds at `http://<host>:8080/all`
- Check that the device is on the same LAN
- Disable DNS caching or try accessing by IP address

## Known limitations

- Only local polling mode supported
- No control endpoints (read-only)
- Device must expose `/all` endpoint

## Removing the integration

This integration follows standard integration removal.
{% include integrations/remove_device_service.md %}
