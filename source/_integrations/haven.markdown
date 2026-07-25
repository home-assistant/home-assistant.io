---
title: HAVEN IAQ
description: Instructions on how to set up HAVEN IAQ devices in Home Assistant.
ha_category:
  - Health
  - Sensor
ha_config_flow: true
ha_release: 2026.8
ha_iot_class: Local Polling
ha_codeowners:
  - '@krhtzoa'
ha_domain: haven
ha_platforms:
  - sensor
ha_integration_type: device
ha_zeroconf: true
works_with:
  - local
ha_quality_scale: bronze
---

The **HAVEN IAQ** {% term integration %} connects supported HAVEN IAQ air quality monitors to Home Assistant over your local network. Depending on the device, the integration provides indoor air quality and airflow measurements.

## Prerequisites

- Connect the HAVEN IAQ device and Home Assistant to the same local network.
- Install firmware that supports the HAVEN local API:
  - Room Air Monitor: firmware 19 or later.
  - Central Air Monitor: firmware 2.4.2 or later.

Home Assistant discovers compatible devices automatically. If a device is not discovered, you can add it manually by entering its hostname or IP address.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the HAVEN IAQ device."
{% endconfiguration_basic %}

## Supported devices

The integration supports the following HAVEN IAQ products:

- Room Air Monitor
- Central Air Monitor

## Supported functionality

### Room Air Monitor

The Room Air Monitor provides these measurements:

- Temperature
- Humidity
- Dew point
- Carbon dioxide
- Total volatile organic compounds index
- Nitrogen oxides index
- PM1.0, PM2.5, PM4.0, and PM10 mass concentration
- PM0.5, PM1.0, PM2.5, PM4.0, and PM10 particle count

### Central Air Monitor

The Central Air Monitor provides these measurements:

- Temperature
- Humidity
- Pressure
- Carbon dioxide
- Total volatile organic compounds concentration
- PM2.5 and PM10 mass concentration
- PM2.5 and PM10 particle count
- Airflow
- Airflow duration

## Data updates

This integration uses local {% term polling %}. Home Assistant requests updated data from the device once per minute.

## Known limitations

- Communication uses unencrypted HTTP on the local network. Do not expose the device's HTTP port to the internet.

## Troubleshooting

### The device is not discovered

1. Confirm that Home Assistant and the HAVEN IAQ device are connected to the same local network.
2. Confirm that the device runs a supported firmware version.
3. Add the integration manually and enter the device's hostname or IP address.

### Entities are unavailable

1. Confirm that the HAVEN IAQ device is powered on and connected to Wi-Fi.
2. Confirm that Home Assistant can still reach the device at its configured hostname or IP address.
3. If a manually entered IP address changed and the device is not rediscovered automatically, remove and add the integration again using the new address.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
