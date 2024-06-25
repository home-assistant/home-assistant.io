---
title: IoTMeter
description: Instructions on how to integrate IoTMeter within Home Assistant.
ha_category:
  - Energy
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_domain: iotmeter
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@lipic'
ha_integration_type: integration
---

The **IoTMeter** {% term integration %} allows you to monitor and manage your [IoT meters](http://evracing.cz/iotmeter/iotmeter_EN.pdf) within Home Assistant. This integration provides real-time data and control over your connected devices.

{% include integrations/config_flow.md %}

## Sensors

The {% term integration %} adds the following sensors:

- Total power (unit: kW)
  This sensor measures the total power being consumed at any given time. It is useful for monitoring overall power usage and identifying peak consumption periods.

- Total consumption energy (unit: kWh)
  This sensor tracks the total amount of energy consumed since the start of the measurement period. It helps in understanding long-term energy usage patterns and can be used for energy management and optimization.

- Total generation energy (unit: kWh)
  This sensor measures the total amount of energy generated since the start of the measurement period. It is particularly useful for systems that include renewable energy sources, such as solar panels, and helps in tracking the efficiency and output of these systems.

- EVSE status
  This sensor provides the current status of the Electric Vehicle Supply Equipment (EVSE). The possible statuses are:
  - EVSE not connected: Indicates that no electric vehicle is connected to the charger.
  - EVSE ready: Indicates that the EVSE is ready and waiting for a vehicle to be connected.
  - EV connected: Indicates that an electric vehicle is connected to the charger but not currently charging.
  - EV charging: Indicates that an electric vehicle is connected and currently charging.


## Number

The {% term integration %} adds the following number entities:

- Max charging current (Only for SmartModule)
