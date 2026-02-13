---
title: AirPatrol
description: Instructions on how to integrate Airpatrol air conditioning controllers into Home Assistant.
ha_category:
  - Climate
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@antondalgren'
ha_domain: airpatrol
ha_platforms:
  - climate
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Airpatrol** {% term integration %} allows you to control air conditioning units through [Airpatrol](https://www.airpatrol.com/) devices in Home Assistant.


## Prerequisites


{% important %}
Your Airpatrol WiFi unit must be configured via the native Airpatrol application prior to being useable with this integration. This includes setting up the Wi-Fi connection and any initial device configuration.
{% endimportant %}


{% include integrations/config_flow.md %}


{% configuration_basic %}
Email:
    description: The email to your account with the Airpatrol application.
Password:
    description: The password to your account with the Airpatrol application.
{% endconfiguration_basic %}


## Supported functionality


### Climate


The integration will create a climate entity for each air conditioning system found. The climate entity allows you to control:


- **HVAC mode**: Set the operation mode, such as off, heat, and cool.
- **Target temperature**: Set the desired temperature for heating or cooling.
- **Fan mode**: Control the fan speed (if supported by your system).

### Sensors

The integration will create the following sensors for each air conditioning system found:

- **Temperature**: Shows the current temperature (°C) in the room.
- **Humidity**: Shows the current humidity in the room.


## Known limitations


Some features may not be available depending on your specific Airpatrol model and firmware version. Check the Airpatrol documentation for your specific device to understand available features. This integration has only been tested with **Airpatrol WiFi v5**.


## Removing the integration


This integration follows standard integration removal, no extra steps are required.


{% include integrations/remove_device_service.md %}
