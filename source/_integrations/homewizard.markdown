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

- [Wi-Fi P1 Meter](https://www.homewizard.nl/p1-meter): Depending on the connected DSMR meter: sensors for power import/export, energy consumption (single or three phases) and gas. (Model: `HWE-P1`)
- [Wi-Fi Energy Socket](https://www.homewizard.nl/energy-socket): Sensors for power import/export and energy consumption and switches for controlling the outlet (model: `HWE-SKT`)
- [Wi-Fi Watermeter](https://www.homewizard.com/watermeter): Sensors for active and total water usage (model: `HWE-WTR`)
- [Wi-Fi kWh Meter](https://www.homewizard.nl/kwh-meter): Sensors for power import/export and energy consumption. (Models: `SDM230-wifi`, `SDM630-wifi`)

<div class='note'>

The Wi-Fi Watermeter can be powered via a USB-C cable and with batteries. When using batteries they only connect to Wi-Fi every couple of hours. Because of this, the API can only be used when powered via the USB-C cable. It is not possible to add use this integration when the water meter is powered by batteries.

</div>

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
| Wi-Fi SSID | | HWE-P1, HWE-SKT, HWE-WTR, SDM230-wifi, SDM630-wifi  | The SSID of the connected network. |
| Wi-Fi strength | % | HWE-P1, HWE-SKT, HWE-WTR, SDM230-wifi, SDM630-wifi  | Percentage of the Wi-Fi connection. |
| Total energy import T1 | kWh | HWE-P1, HWE-SKT, SDM230-wifi, SDM630-wifi  | Energy import reading. |
| Total energy import T2 | kWh | HWE-P1 | Energy import reading for other tariff. |
| Total energy export T1 | kWh | HWE-P1, HWE-SKT, SDM230-wifi, SDM630-wifi  | Energy export reading. |
| Total energy export T2 | kWh | HWE-P1 | Energy export reading for other tariff. |
| Active power | w | HWE-P1, HWE-SKT, SDM230-wifi, SDM630-wifi  | Active power usage. |
| Active power L1 | w | HWE-P1, HWE-SKT, SDM230-wifi, SDM630-wifi  | Active power usage line 1, for `SDM230-wifi` and`HWE-SKT` this value is the same as `Active power`. |
| Active power L2 | w | HWE-P1, SDM630-wifi | Active power usage line 2. |
| Active power L3 | w | HWE-P1, SDM630-wifi | Active power usage line 3. |
| Total gas | m3 | HWE-P1 | Current gas import reading, only available when your smart meter is connected to a gas meter. |
| DSMR version | | HWE-P1 | The detected DSMR version. |
| Smart meter model | | HWE-P1 | The detected smart meter model. |
| Active water usage | liter per minute | HWE-WTR | The current usage of water. |
| Total water usage | m3 | HWE-WTR | Total of water measured since installation. |

## Switches

The Wifi Energy Socket (`HWE-SKT`) outlet state can be controlled the switch platform. There are two switches:

- **Switch**: Controls the outlet state of the Energy Socket. This switch is locked out when `Switch Lock` is turned on. 
- **Switch lock**: Forces the outlet state in the `on` position and disables the physical button. This option is useful when the socket is used for a device that must not be turned off, such as a refrigerator.
