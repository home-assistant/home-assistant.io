---
title: Fresh-r
description: Instructions on how to integrate Fresh-r ventilation solutions within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_domain: freshr
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: hub
ha_codeowners:
  - '@SierraNL'
---

The **Fresh-r** {% term integration %} connects to the [fresh-r.me](https://www.fresh-r.me/) cloud dashboard, letting you monitor all Fresh-r ventilation devices linked to your account. It polls the Fresh-r cloud to keep your data up to date. Use it to keep an eye on your indoor air quality and ventilation performance, or to trigger automations when CO2 or humidity levels need attention.

## Supported devices

The following Fresh-r devices are supported:

- **Fresh-r**: The main heat recovery ventilation unit.
- **Forward**: A Fresh-r ventilation unit that forwards air to the main heat recovery ventilation unit.
- **Monitor**: A standalone indoor air quality monitor.

## Prerequisites

- A Fresh-r account on [fresh-r.me](https://www.fresh-r.me/).
- At least one Fresh-r ventilation unit connected to your Fresh-r account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address you use to sign in to your Fresh-r account.
Password:
  description: The password for your Fresh-r account.
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensors:

- **Inside temperature**
  - **Description**: Temperature of the air leaving the ventilation unit, in °C.
  - **Available for**: Fresh-r, Forward

- **Outside temperature**
  - **Description**: Temperature of the incoming fresh air, in °C.
  - **Available for**: Fresh-r, Forward

- **CO2**
  - **Description**: CO2 concentration of the indoor air, in ppm.
  - **Available for**: All devices

- **Humidity**
  - **Description**: Relative humidity of the indoor air, in %.
  - **Available for**: All devices

- **Air flow rate**
  - **Description**: Air flow rate through the ventilation unit, in m³/h.
  - **Available for**: Fresh-r, Forward

- **Dew point**
  - **Description**: Dew point temperature of the indoor air, in °C.
  - **Available for**: All devices
  - **Remarks**: Disabled by default.

- **Temperature**
  - **Description**: Indoor temperature, in °C.
  - **Available for**: Forward, Monitor

## Examples

### Get notified when indoor CO2 levels are high

CO2 levels above 1000 ppm are generally considered poor for indoor air quality. You can create an automation that sends you a notification when the **CO2** sensor crosses that threshold, so you know to check that your ventilation unit is running correctly and that its filter does not need cleaning.

### Monitor humidity to prevent condensation

High indoor humidity can lead to condensation and mold. Use the **Humidity** sensor to trigger an alert or switch on extra ventilation when humidity rises above a level you are comfortable with.

### Track ventilation performance

Use the **Air flow rate** sensor to verify that your ventilation unit is delivering the expected amount of fresh air. A sudden drop can indicate a dirty filter or a blocked duct.

## Data updates

The **Fresh-r** integration {% term polling polls %} sensor readings from the Fresh-r cloud every 10 minutes. The list of connected devices is refreshed every hour.

## Known limitations

- The integration is read-only. It is not possible to control the ventilation unit — such as changing the fan speed or operating mode — from Home Assistant.
- Some Fresh-r systems include an air quality sensor, which is not yet supported by this integration.
- Because data is {% term polling polled %} every 10 minutes, sensor values may be slightly behind real-time readings.
- The integration depends on the Fresh-r cloud service. If the service is unavailable, data will not update until the connection is restored.
- Devices that are removed from your Fresh-r account are not automatically removed from Home Assistant. Remove and re-add the integration to update the device list.

## Troubleshooting

### Authentication failed

If the integration shows an authentication error, make sure the username (email address) and password you entered match the credentials you use to sign in to [fresh-r.me](https://www.fresh-r.me/). If you recently changed your password, remove the integration and add it again with your updated credentials.

### Cannot connect to Fresh-r

If the integration cannot connect or sensor values stop updating, check that your Home Assistant instance has access to the internet. You can verify whether [fresh-r.me](https://www.fresh-r.me/) is reachable from a browser on the same network. If the Fresh-r cloud service is temporarily unavailable, the integration will resume updating automatically once the service is restored.

### No devices appear after setup

If the integration is set up successfully but no devices or sensors appear in Home Assistant, make sure at least one Fresh-r ventilation unit is connected and visible in your [fresh-r.me](https://www.fresh-r.me/) dashboard before setting up the integration. If you add or remove a device from your account, remove and re-add the integration to update the device list.

## Removing the integration

{% include integrations/remove_device_service.md %}
