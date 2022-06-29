---
title: HomeWizard Energy
description: Instructions on how to integrate HomeWizard Energy into Home Assistant.
ha_release: 2022.2
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: homewizard
ha_codeowners:
  - '@DCSBL'
ha_platforms:
  - diagnostics
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: integration
---

Integration for the [HomeWizard Energy](https://www.homewizard.nl/energy) platform. It can collect data locally from the HomeWizard Energy products and create them as sensors in Home Assistant.

**Supported devices**

- [Wifi P1 Meter](https://www.homewizard.nl/p1-meter): Depending on the connected DSMR meter: sensors for power import/export, energy consumption (single or three phases) and gas. (Model: `HWE-P1`)
- [Wifi Energy Socket](https://www.homewizard.nl/energy-socket): Sensors for power import/export and energy consumption and switches for controlling the outlet (model: `HWE-SKT`)
- [Wifi kWh Meter](https://www.homewizard.nl/kwh-meter): Sensors for power import/export and energy consumption. (Models: `SDM230-wifi`, `SDM630-wifi`)

## Enable the API

You have to enable the local API to allow Home Assistant to communicate with your device. Do this in the HomeWizard Energy app:

  1. Go to Settings. (Gear icon in the upper-right)
  2. Go to 'Meters'.
  3. Select your device.
  4. Scroll down and turn on 'Local API'.

{% include integrations/config_flow.md %}

## Sensors

The HomeWizard Energy API only exposes properties that are used within the HomeWizard Energy app. The available properties are listed below.

| Name | Unit | Availability | Description |
| --- | --- | --- | --- |
| Wifi SSID | | HWE-P1, SDM230-wifi, SDM630-wifi, HWE-SKT | The SSID of the connected network. |
| Wifi Strength | % | HWE-P1, SDM230-wifi, SDM630-wifi, HWE-SKT | Percentage of the wifi connection. |
| Total Energy Import_t1 | kWh | HWE-P1, SDM230-wifi, SDM630-wifi, HWE-SKT | Energy import reading. |
| Total Energy Import_t2 | kWh | HWE-P1 | Energy import reading for other tariff. |
| Total Energy Export_t1 | kWh | HWE-P1, SDM230-wifi, SDM630-wifi, HWE-SKT | Energy export reading. |
| Total Energy Export_t2 | kWh | HWE-P1 | Energy export reading for other tariff. |
| Active Power | w | HWE-P1, SDM230-wifi, SDM630-wifi, HWE-SKT | Active power usage. |
| Active Power_l1 | w | HWE-P1, SDM230-wifi, SDM630-wifi, HWE-SKT | Active power usage Line 1, for `SDM230-wifi` and`HWE-SKT` this value is the same as `Active Power`. |
| Active Power_l2 | w | HWE-P1, SDM630-wifi | Active power usage Line 2. |
| Active Power_l3 | w | HWE-P1, SDM630-wifi | Active power usage Line 3. |
| Total Gas | m3 | HWE-P1 | Current gas import reading, only available when your smart meter is connected to a gas meter. |
| DSMR Version | | HWE-P1 | The detected DSMR version. |
| Smart Meter Model | | HWE-P1 | The detected smart meter model. |

## Switches

The Wifi Energy Socket (`HWE-SKT`) outlet state can be controlled the switch platform. There are two switches:

- **Switch**: Controls the outlet state of the Energy Socket. This switch is locked out when `Switch Lock` is turned on. 
- **Switch Lock**: Forces the outlet state in the `on` position and disables the physical button. This option is useful when the socket is used for a device that must not be turned off, such as a refrigerator.
