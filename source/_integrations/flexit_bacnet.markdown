---
title: Flexit Nordic (BACnet)
description: Instructions on how to integrate Flexit air handling unit into Home Assistant.
ha_category:
  - Climate
ha_release: 2024.1
ha_iot_class: Local Polling
ha_domain: flexit_bacnet
ha_platforms:
  - binary_sensor
  - climate
  - number
  - sensor
  - switch
ha_integration_type: device
ha_codeowners:
  - '@lellky'
  - '@piotrbulinski'
ha_config_flow: true
---

Integrates [Flexit](https://www.flexit.no/en/) Nordic series air handling unit into Home Assistant.

## Prerequisites

Your Flexit device should be equipped with an ethernet port, and no additional modules should be required. This integration communicates with the BACnet protocol over Ethernet.

To configure the integration, you need to obtain the IP address and Device ID for the unit.

1. Open the Flexit Go app on your mobile.
2. On the main screen, select the **Find product** button.
3. Select your device and select **Connect**.
4. Enter the installer code (default: 1000) and select **Login**.
5. Go to **More** > **Installer** > **Communication**  > **BACnet settings**.
6. Note down the **IP address** and **Device ID**.

## Platforms

This integration supports the following platforms.

### Climate

The integration adds an entity for climate with controls for preset ventilation modes and fan mode. It also has state for temperatures.

### Sensor

The integration adds entities for sensors with different readings from the device. There is currently support for the following sensors:

 - Outside air temperature
 - Supply air temperature 
 - Exhaust air temperature
 - Extract air temperature
 - Room temperature
 - Fireplace ventilation remaining duration
 - Rapid ventilation remaining duration
 - Supply air fan control signal
 - Supply air fan
 - Exhaust air fan control signal
 - Exhaust air fan
 - Electric heater power
 - Air filter operating time
 - Heat exchanger efficiency
 - Heat exchanger speed

### Binary sensor

The integration adds an entity for a binary sensor called _Air filter polluted_ which tells if it's time to change the filters in the unit.

### Number

The integration adds entities for setting setpoints for the fan in the respective mode:

 - Away
 - Home
 - Fireplace
 - High
 - Cooker hood

### Switch

The integration adds an entity for a switch called _Electric heater_ that controls the heating element in the unit.

### A note about shutting down the device
 
Flexit recommends that the function to turn off the unit is not made accessible in the interface for an ordinary user. It will therefore be removed from the integration in the future.

The consequences of shutting down the unit can be costly and extensive. For example, there can be condensation issues in freezing temperatures, and rotary heat exchangers can freeze.

If you need to shut down the unit, make sure to take all necessary precautions, such as securing the system with frost protection dampers.

Furthermore, Flexit recommends unplugging the unit from the power socket before replacing a filter. To prevent damage, always initiate a controlled shutdown from the control panel (or, in the future, from an action in Home Assistant) before unplugging the device.

{% include integrations/config_flow.md %}
