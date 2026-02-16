---
title: WaterFurnace
description: Instructions on how to integrate WaterFurnace Geothermal System into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.62
ha_iot_class: Cloud Polling
ha_domain: waterfurnace
ha_platforms:
  - sensor
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: legacy
ha_codeowners:
  - '@sdague'
  - '@masterkoppa'
---

The **WaterFurnace** {% term integration %} communicates with the WaterFurnace Symphony website's WebSocket to show you many of the sensors in your system. While not an official API, this is the same backend the Symphony website is based on, and should be reasonably stable.

The sensors provided include:

- Thermostat Setpoint
- Thermostat Current Temp
- Leaving Air Temp
- Entering Water Loop Temp
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

## Configuration


## Prerequisites

To use Waterfurnace in your installation, you need to configure the integration with your Symphony Waterfurnace account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
username:
  description: The email address for your Symphony WaterFurnace account
password:
  description: The password for your Symphony WaterFurnace account
{% endconfiguration_basic %}

## Limitations

If your account has more than one device or location, only the first device on the first location will be used.

The WebSocket interface used by this module requires active polling to prevent the server side shuts down the connection. By default, this polling is happening every 10 seconds. All sensors are updated during every polling cycle.

While this is communicating with a thermostat, geothermal systems operate most efficiently when setbacks are not used, and the home is kept at a constant temperature. It remains useful to collect the data from the system to understand its performance, but a full climate interface won't be implemented.
