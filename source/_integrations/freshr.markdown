---
title: Fresh-r
description: Instructions on how to integrate Fresh-R ventilation solutions within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.1.2
ha_iot_class: Cloud Polling
ha_domain: freshr
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@SierraNL'
---

The **Fresh-R** {% term integration %} connects to the [Fresh-R.me](https://www.fresh-r.me/) cloud dashboard, letting you monitor all Fresh-R ventilation devices linked to your account. It polls the Fresh-R cloud to keep your data up to date. Use it to keep an eye on your indoor air quality and ventilation performance, or to trigger automations when CO2 or humidity levels need attention.

## Supported devices

All Fresh-R ventilation units that are connected to your Fresh-R.me account are supported. The integration automatically discovers all devices available in your account.

## Prerequisites

- A Fresh-R account on [Fresh-R.me](https://www.fresh-r.me/).
- At least one Fresh-R ventilation unit connected to your Fresh-R account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address you use to sign in to your Fresh-R account.
Password:
  description: The password for your Fresh-R account.
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensors:

- **Inside temperature**: Temperature of the air leaving the ventilation unit, in °C.
- **Outside temperature**: Temperature of the incoming fresh air, in °C.
- **Inside CO2**: CO2 concentration of the indoor air, in ppm.
- **Inside humidity**: Relative humidity of the indoor air, in %.
- **Flow**: Air flow rate through the ventilation unit, in m³/h.
- **Dew point**: Dew point temperature of the indoor air, in °C.

## Examples

### Get notified when indoor CO2 levels are high

CO2 levels above 1000 ppm are generally considered poor for indoor air quality. You can create an automation that sends you a notification when the **Inside CO2** sensor crosses that threshold, so you know to check that your ventilation unit is running correctly and that its filter does not need cleaning.

### Monitor humidity to prevent condensation

High indoor humidity can lead to condensation and mold. Use the **Inside humidity** sensor to trigger an alert or switch on extra ventilation when humidity rises above a level you are comfortable with.

### Track ventilation performance

Use the **Flow** sensor to verify that your ventilation unit is delivering the expected amount of fresh air. A sudden drop in flow rate can indicate a dirty filter or a blocked duct.

## Data updates

The **Fresh-R** integration {% term polling polls %} data from the Fresh-R cloud every 60 minutes.

## Known limitations

- The integration is read-only. It is not possible to control the ventilation unit — such as changing the fan speed or operating mode — from Home Assistant.
- Some Fresh-R systems include an air quality sensor, which is not yet supported by this integration.
- Because data is {% term polling polled %} every 60 minutes, sensor values may be up to an hour behind real-time readings.
- The integration depends on the Fresh-R cloud service. If the service is unavailable, data will not update until the connection is restored.

## Troubleshooting

### Authentication failed

If the integration shows an authentication error during setup or stops working after some time, make sure the username (email address) and password you entered match the credentials you use to sign in to [Fresh-R.me](https://www.fresh-r.me/). If you recently changed your password, remove the integration and add it again with your updated credentials.

### Cannot connect to Fresh-R

If the integration cannot connect or sensor values stop updating, check that your Home Assistant instance has access to the internet. You can verify whether [Fresh-R.me](https://www.fresh-r.me/) is reachable from a browser on the same network. If the Fresh-R cloud service is temporarily unavailable, the integration will resume updating automatically once the service is restored.

### No devices appear after setup

If the integration is set up successfully but no devices or sensors appear in Home Assistant, make sure at least one Fresh-R ventilation unit is connected and visible in your [Fresh-R.me](https://www.fresh-r.me/) dashboard before setting up the integration. If you add a new device to your account later, remove and re-add the integration to pick it up.

## Removing the integration

{% include integrations/remove_device_service.md %}
