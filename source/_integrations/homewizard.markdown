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
  - button
  - diagnostics
  - number
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: integration
ha_quality_scale: platinum
works_with:
  - local
---

Integration for the [HomeWizard Energy](https://www.homewizard.com) platform. It can collect data locally from the HomeWizard Energy products and create them as sensors in Home Assistant.

**Supported devices**

- [Wi-Fi P1 Meter](https://www.homewizard.com/p1-meter): Sensors for power import/export, energy consumption (single or three phases). information about your smart meter and gas. (Model: `HWE-P1`)
- [Wi-Fi Energy Socket](https://www.homewizard.com/energy-socket): Sensors for power import/export and energy consumption and switches for controlling the outlet (model: `HWE-SKT`)
- [Wi-Fi Watermeter](https://www.homewizard.com/watermeter): Sensors for active and total water usage (model: `HWE-WTR`)
- [Wi-Fi kWh Meter](https://www.homewizard.com/kwh-meter): Sensors for power import/export and energy consumption. (Models: `HWE-KWH1`, `HWE-KWH3`, `SDM230-wifi`, and `SDM630-wifi`)

{% note %}
The Watermeter can be powered via a USB-C cable and with batteries. When using batteries they only connect to Wi-Fi every couple of hours. Because of this, the API can only be used when powered via the USB-C cable. It is not possible to use this integration when the water meter is powered by batteries.
{% endnote %}

## Enable the API

You have to enable the local API to allow Home Assistant to communicate with your device. Do this in the HomeWizard Energy app:

  1. Go to Settings. (Gear icon in the upper-right)
  2. Go to 'Meters'.
  3. Select your device.
  4. Scroll down and turn on 'Local API'.

{% include integrations/config_flow.md %}

## Sensors

Sensors for the P1 meter, Energy socket, and kWh meter:

- **Energy import/export (kWh)**: Total energy imported or exported since installation. Each tariff has its own sensor (e.g., T1, T2) and a sensor for the combined value.
- **Power (W)**: Active power that is measured on each phase.

Sensors for P1 meter, only available when smart meter exposes these values:

- **Gas usage (m³)**: Total gas used since the installation of the gas meter. A gas meter sends its measurement once every 5 minutes or per hour, depending on the version of the smart meter.
- **Tariff**: Current tariff that is used. Can be used to keep consumption as low as possible during peak hours.
- **Voltage (V)**: Active voltage that is measured on each phase.
- **Current (A)**: Active current that is measured on each phase.
- **Frequency (Hz)**: Net frequency.
- **Voltage sags and swells**: Number of times a voltage sag or well has been detected.
- **Power failures**: Two sensors that indicate the number of power failures that have been detected by the smart meter. One for all power failures and another for 'long' power failures.
- **Peak demand**: Belgium users are starting to get charged for the peak usage per month (see [capaciteitstarief](https://www.fluvius.be/thema/factuur-en-tarieven/capaciteitstarief)). Two sensors are available: One that shows the current quarterly average and another that shows the peak measured this month. Both these sensors are provided directly from the smart meter and can be used to keep the peak as low as possible.

Sensors for Energy Socket and kWh meter:
- **Voltage (V)**: Active voltage that is measured on each phase.
- **Current (A)**: Active current that is measured on each phase.
- **Frequency (Hz)**: Net frequency.
- **Reactive power (VAR)**: Active reactive power measurement on each phase.
- **Apparent power (VA)**: Active apparent power measurement on each phase.

Sensors for Water meter:

- **Water usage (L/min)**: Flow of water that is measured at that time.
- **Total Water usage (m³)**: Total water usage since the installation of the HomeWizard Water meter.

## Energy Socket

The Energy Socket outlet state and status light can be controlled. There are two switches:

- **Switch**: Controls the outlet state of the Energy Socket. This switch is locked out when _Switch Lock_ is turned on. 
- **Switch lock**: Forces the outlet state in the _on_ position and disables the physical button. This option is useful when the socket is used for a device that must not be turned off, such as a refrigerator.

You can also control the green status light brightness with **Status light brightness**. This light turns on when the switch is on.

## Identify

The identify button can be pressed to let the status light blink for a few seconds.
_This feature not available for the kWh Meter._

## Cloud communication

The HomeWizard Energy devices are designed to work with the HomeWizard Energy app and require communication with the HomeWizard cloud to make them function with the app. The "Cloud connection" configuration toggle can be used to turn off all communication with the HomeWizard cloud, making the device fully local. The device cannot communicate with the app, and the device won't receive any future firmware updates.

Cloud communication is restored when the switch is turned on again. Cloud communications are also restored after a factory reset, or when the device is put in pairing mode.
