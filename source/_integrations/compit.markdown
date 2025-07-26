---
title: Compit
description: Instructions on how to integrate Compit devices within Home Assistant.
ha_category:
  - Climate
ha_release: 2025.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@CompitHomeAssistant"
  - "@Przemko92"
ha_domain: compit
ha_platforms:
  - climate
ha_integration_type: integration
---

The **Compit** {% term integration %} allows you to integrate air conditioning, ventilation and heating controllers with Home Assistant. This integration needs a Compit iNext account to be setup at [inext.compit.pl](https://inext.compit.pl).

## Prerequisites

- Create an account on [inext.compit.pl](https://inext.compit.pl).
- Configure your Compit devices within the account.

## Installation instructions

- Open Home Assistant and navigate to **Settings** > **Devices & Services**.
- Click the **Add Integration** button in the bottom-right corner.
- Search for **Compit** in the list of available integrations.
- Select **Compit** and follow the on-screen instructions:
  - Enter your **Email** and **Password** for your [inext.compit.pl](https://inext.compit.pl) account.
- Once authenticated, Home Assistant will automatically discover and add your Compit devices.
- Configure the devices as needed in the Home Assistant UI.

If you encounter any issues during installation, refer to the [Home Assistant documentation](https://www.home-assistant.io/help/) or contact [Compit support](https://compit.pl/).

## Supported devices

**This component supports the following Compit devices.**

- [Nano Color 2](https://compit.pl/produkty/termostaty-pokojowe/88-termostat-pokojowy-nano-color-2.html?ic=1) - Room thermostat
- [Nano Color](https://compit.pl/produkty/termostaty-pokojowe/88-termostat-pokojowy-nano-color-2.html?ic=1) - Room thermostat
- [Nano One](https://compit.pl/produkty/termostaty-pokojowe/24-termostat-pokojowy-nano-one.html?ic=1) - Room thermostat
- [R900](https://compit.pl/produkty/sterowniki-pomp-ciepla/89-r900.html?ic=1) - Heat Pump Controller
- [R810](https://compit.pl/produkty/sterowniki-instalacji/43-pogodowy-regulator-temperatury-obiegu-grzewczego-r810.html?ic=1) - Heat Pump Controller
- [R490](https://compit.pl/produkty/sterowniki-pomp-ciepla/12-sterownik-pompy-ciepla-r490-one.html?ic=1) - Heat Pump Controller
- [R480](https://compit.pl/produkty/sterowniki-pomp-ciepla/10-sterownik-pompy-ciepla-r470-one.html?ic=1) - Heat Pump Controller
- [R470](https://compit.pl/produkty/sterowniki-pomp-ciepla/10-sterownik-pompy-ciepla-r470-one.html?ic=1) - Heat Pump Controller
- [R770RS R771RS](https://compit.pl/produkty/sterowniki-do-kotlow/83-pogodowy-regulator-kotla-retortowego-i-instalacji-grzewczej-r771-2.html?ic=1) - Rotor boiler controller
- [BWC310](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1) - Mixing valve controller
- [BioMax775](https://compit.pl/produkty/sterowniki-do-kotlow/73-sterownik-kotla-elektrycznego-el750-1.html?ic=1) - Pellet boiler controller
- [BioMax772](https://compit.pl/produkty/sterowniki-uniwerslane/85-pogodowy-regulator-temperatury-obiegu-grzewczego-z-mieszaczem-r350m.html?ic=1) - Pellet boiler controller
- [BioMax742](https://compit.pl/produkty/sterowniki-uniwerslane/85-pogodowy-regulator-temperatury-obiegu-grzewczego-z-mieszaczem-r350m.html?ic=1) - Pellet boiler controller
- [SHC](https://compit.pl/produkty/osprzet/67-czujnik-stezenia-dwutlenku-wegla-wilgotnosci-i-temperatury-w-pomieszczeniach-shc.html?ic=1) - Carbon dioxide sensor
- [SPM](https://compit.pl/produkty/osprzet/87-czujnik-jakosci-powietrza-spm.html?ic=1) - Air quality sensor
- [L2](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1) - Floor heating controller
- [COMBO](https://compit.pl/produkty/osprzet/92-combo.html?ic=1) - Combo module
- [EL750](https://compit.pl/produkty/sterowniki-do-kotlow/73-sterownik-kotla-elektrycznego-el750-1.html?ic=1) - Electric boiler controller
- [R350.M](https://compit.pl/produkty/sterowniki-uniwerslane/85-pogodowy-regulator-temperatury-obiegu-grzewczego-z-mieszaczem-r350m.html?ic=1) - Universal controller
- [R350 T3](https://compit.pl/produkty/sterowniki-instalacji/42-dwustopniowy-sterownik-temperatury-regulator-pi-regulator-krokowy-sterowanie-3-punktowe-r350-07.html?ic=1) - Universal controller
- [R350.CWU](https://compit.pl/produkty/sterowniki-uniwerslane/78-sterownik-do-podgrzewania-wody-r350-cwu.html?ic=1) - Universal controller
- [AF-1](https://compit.pl/produkty/osprzet/91-af-1.html?ic=1) - Anti-freeze system

## Configuration

{% configuration %}
Email:
  description: User email for [inext.compit.pl](https://inext.compit.pl).
  required: true
  type: string
Password:
  description: Password for the account.
  required: true
  type: integer
{% endconfiguration %}

## Removal instructions


{% include integrations/remove_device_service.md %}
