---
title: Mill WiFi Official
description: Instructions on how to integrate Mill devices via the official Mill WiFi cloud API.
ha_category:
  - Climate
  - Sensor
  - Switch
  - Number
ha_release: 2025.6
ha_iot_class: cloud_polling
ha_config_flow: true
ha_codeowners:
  - '@Mill-International-AS'
ha_domain: mill_wifi
ha_platforms:
  - climate
  - number
  - sensor
  - switch
ha_integration_type: hub
---

The **Mill WiFi Official** integration allows you to connect your Mill devices to Home Assistant using the official Mill cloud API.

{% include integrations/config_flow.md %}

This integration works with a wide range of Mill devices. Upon successful login, the integration will automatically add all your supported devices to Home Assistant.

## Supported devices

This integration supports a variety of Mill devices, including panel heaters, oil heaters, convection heaters, sockets, air purifiers, and heat pumps.

- GL-WIFI Socket G2, G3, G4
- GL-Sense
- GL-Panel Heater G2, G3, G3 M, G3 MV2, G4
- GL-Oil Heater G2, G3, G3 V2
- GL-Convection Heater G2, G3
- GL-WIFI Convection MAX 1500W G3
- GL-Air Purifier M, L
- GL-Heat Pump

## Provided entities

This integration will create several entities for each of your Mill devices, depending on their specific capabilities.

### Climate

For heaters and devices with temperature controls, a **Climate** entity will be created. This allows you to:

- View the current temperature.
- Set the target temperature.
- Change the HVAC mode (Off, Heat, Cool).
- See the current action (e.g., Heating, Cooling, Idle).

### Sensor

The integration creates multiple **Sensor** entities to provide detailed measurements from your devices:

- **Temperature, Humidity, CO2, TVOC, PM1, PM2.5, PM10, and Particles (AQI):** Air quality and environmental metrics.
- **Power and Daily Energy:** Power consumption monitoring.
- **Battery:** The remaining battery percentage for battery-powered devices.
- **Max Heater Power:** The maximum power a heater can draw.
- **Filter Status:** The condition of the air purifier filter.

### Switch

Several features of your Mill devices are exposed as **Switch** entities for easy control:

- **Power:** Turn the device on or off (for devices without a climate entity).
- **Child Lock:** Prevent manual changes to the device.
- **Open Window Detection:** Enable or disable the automatic open-window detection feature.
- **Predictive Heating:** Enable or disable the predictive heating feature.
- **Individual Control:** Allow the device to be controlled individually, outside of any room programs.
- **Cooling Mode:** Switch between heating and cooling modes on compatible devices.
- **Display Light:** Turn the device's display light on or off.

### Number

For devices that allow adjusting specific settings, **Number** entities are created:

- **Target Temperature:** Adjust the target temperature (for devices without a full climate entity).
- **Max Power Limit:** Limit the maximum power consumption of a heater, in percentage.
