---
title: WaterFurnace
description: Instructions on how to integrate WaterFurnace Geothermal System into Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 0.62
ha_iot_class: Cloud Polling
ha_domain: waterfurnace
ha_platforms:
  - climate
  - sensor
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: legacy
ha_codeowners:
  - '@sdague'
  - '@masterkoppa'
---

The **WaterFurnace** {% term integration %} communicates with the WaterFurnace Symphony website's WebSocket to show you many of the sensors in your system. While not an official API, this is the same backend the Symphony website is based on, and should be reasonably stable.

## Climate

The integration creates a {% term climate %} entity for each geothermal system found in your account. You can use this entity to set the target temperature, humidity setpoint, and HVAC mode directly from Home Assistant.

Setting the unit to E-Heat mode is not currently supported. If you need to use E-Heat, you can set it through the thermostat, Symphony website, or Symphony app.

## Sensors

The integration exposes the following sensors (if available):

- Thermostat Setpoint
- Thermostat Current Temp
- Leaving Air Temp
- Entering / Leaving Water Loop Temp
- Water Flow Rate
- Current Humidity
- Current Humidity Setpoint
- Total system power (in Watts)
- Furnace Mode
- Compressor Power
- Fan Power
- Aux Power
- Loop Pump Power
- Compressor Speed
- Fan Speed

## Energy

The integration is also able to track historic energy use. You can track the total energy consumption in the energy dashboard. This data is refreshed every 2 hours, so your energy use may lag behind.

On first setup, the integration tries to fetch the last 13 months of available data. This can take up to 40 minutes to complete.

## Prerequisites

To use Waterfurnace in your installation, you need to configure the integration with your Symphony Waterfurnace account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
username:
  description: The email address for your Symphony WaterFurnace account
password:
  description: The password for your Symphony WaterFurnace account
{% endconfiguration_basic %}

## Removing the integration

{% include integrations/remove_device_service.md %}

## Limitations

If your account has more than one location, only devices in the first location will be available.

The WebSocket interface used by this module requires active polling to prevent the server side shuts down the connection. By default, this polling is happening every 10 seconds. All sensors are updated during every polling cycle.
