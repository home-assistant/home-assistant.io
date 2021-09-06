---
title: HomeWizard Energy
description: Instructions on how to integrate HomeWizard Energy into Home Assistant.
ha_release: 2021.10
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: homewizard_energy
ha_codeowners:
  - '@DCSBL'
ha_platforms:
  - sensor
  - switch
ha_zeroconf: true
---
Integration for the [HomeWizard Energy](https://www.homewizard.nl/energy) platform. It
can collect data locally form the HomeWizard Energy products create them as sensors in Home Assistant.

**Supported devices**
- [Wifi P1 Meter](https://www.homewizard.nl/p1-meter): Depending on the connected DSMR meter: sensors for power import/export, energy consumption (single or three phases) and gas.
- [Wifi kWh Meter](https://www.homewizard.nl/kwh-meter): Sensors for power import/export and energy consumption.
- Wifi Energy Socket: Sensors for power import/export and energy consumption. Switches for the on/off state of the socket and 'Switch Lock' feature.

<div class='note'>
The Wifi Energy Socket is currently only available for a selected group of betatesters.
</div>

## Enable the API
You have to enable the local API to allow Home Assistant to communicate with your device. Do this in the HomeWizard Energy app.
  1. Go to Settings. (Gear icon in the upper-right)
  2. Go to 'Meters'.
  3. Select your device.
  4. Scroll down and turn on 'Local API'.

{% include integrations/config_flow.md %}
