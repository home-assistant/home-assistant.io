---
title: EVSE WiFi
description: Instructions on how to integrate a Wi-Fi-equipped Simple EVSE Charging station with Home Assistant
ha_category:
  - Car
ha_release: 2023.1.1
ha_iot_class: Local Polling
ha_domain: evse_wifi
ha_platforms:
  - sensor
ha_integration_type: integration
---

This EVSE WiFi device platform pulls data from an [SimpleEvse-WiFi](https://github.com/CurtRod/SimpleEVSE-WiFi) Charging station equipped with an ESP8266-based Wi-Fi connection.

## Configuration

To enable this sensor in your installation, search for "Evse-Wifi" in the Integrations and add it via the Configuration-Flow

{% include integrations/config_flow.md %}

## Sensors

- Actual Power [kW]
- Charge Duration [s]
- Current P1 [A]
- Current P2 [A]
- Current P3 [A]
- Energy [kWh] (Energy charged in current charge phase)
- Last Action Uid 
- Last Action User
- Max Current [A] (Max current set in EVSE settings)
- Meter Reading [kW] (Meter Reading - Can be used in Energy Dashboard)
- Milage [km] (Milage charged in current charge phase)
- Vehicle State (State of the Vehicle as Integer)
- Vehicle State Text (State of the Vehilce as a String)
