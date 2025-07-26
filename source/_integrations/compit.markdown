---
title: Compit
description: Instructions on how to integrate Compit devices within Home Assistant.
ha_category:
  - Climate
  - Number
  - Select
  - Sensor
  - Switch
  - Water heater
ha_release: 2024.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@CompitHomeAssistant"
  - "@Przemko92"
ha_domain: compit
ha_platforms:
  - climate
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

This integration is created by [Compit](https://compit.pl/) to integrate air conditioning, ventilation and heating controllers with Home Assistant. This integration needs Compit iNext account setup at [inext.compit.pl](https://inext.compit.pl).

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

| Device        | Type                       | Description                                                                                                                                                                   |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nano Color 2  | Room thermostat            | [Product page](https://compit.pl/produkty/termostaty-pokojowe/88-termostat-pokojowy-nano-color-2.html?ic=1)                                                                   |
| Nano Color    | Room thermostat            |                                                                                                                                                                               |
| Nano One      | Room thermostat            | [Product page](https://compit.pl/produkty/termostaty-pokojowe/24-termostat-pokojowy-nano-one.html?ic=1)                                                                       |
| R900          | Heat Pump Controller       | [Product page](https://compit.pl/produkty/sterowniki-pomp-ciepla/89-r900.html?ic=1)                                                                                           |
| R810          | Heat Pump Controller       | [Product page](https://compit.pl/produkty/sterowniki-instalacji/43-pogodowy-regulator-temperatury-obiegu-grzewczego-r810.html?ic=1)                                           |
| R490          | Heat Pump Controller       | [Product page](https://compit.pl/produkty/sterowniki-pomp-ciepla/12-sterownik-pompy-ciepla-r490-one.html?ic=1)                                                                |
| R480          | Heat Pump Controller       |                                                                                                                                                                               |
| R470          | Heat Pump Controller       | [Product page](https://compit.pl/produkty/sterowniki-pomp-ciepla/10-sterownik-pompy-ciepla-r470-one.html?ic=1)                                                                |
| R770RS R771RS | Rotor boiler controller    | [Product page](https://compit.pl/produkty/sterowniki-do-kotlow/83-pogodowy-regulator-kotla-retortowego-i-instalacji-grzewczej-r771-2.html?ic=1)                               |
| BWC310        | Mixing valve controller    |                                                                                                                                                                               |
| BioMax775     | Pellet boiler controller   |                                                                                                                                                                               |
| BioMax772     | Pellet boiler controller   |                                                                                                                                                                               |
| BioMax742     | Pellet boiler controller   |                                                                                                                                                                               |
| SHC           | Carbon dioxide sensor      | [Product page](https://compit.pl/produkty/osprzet/67-czujnik-stezenia-dwutlenku-wegla-wilgotnosci-i-temperatury-w-pomieszczeniach-shc.html?ic=1)                              |
| SPM           | Air quality sensor         | [Product page](https://compit.pl/produkty/osprzet/87-czujnik-jakosci-powietrza-spm.html?ic=1)                                                                                 |
| L2            | Floor heating controller   | [Product page](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1)                                                 |
| COMBO         | Combo module               | [Product page](https://compit.pl/produkty/osprzet/92-combo.html?ic=1)                                                                                                         |
| EL750         | Electric boiler controller | [Product page](https://compit.pl/produkty/sterowniki-do-kotlow/73-sterownik-kotla-elektrycznego-el750-1.html?ic=1)                                                            |
| R350.M        | Universal controller       | [Product page](https://compit.pl/produkty/sterowniki-uniwerslane/85-pogodowy-regulator-temperatury-obiegu-grzewczego-z-mieszaczem-r350m.html?ic=1)                            |
| R350 T3       | Universal controller       | [Product page](https://compit.pl/produkty/sterowniki-instalacji/42-dwustopniowy-sterownik-temperatury-regulator-pi-regulator-krokowy-sterowanie-3-punktowe-r350-07.html?ic=1) |
| R350.CWU      | Universal controller       | [Product page](https://compit.pl/produkty/sterowniki-uniwerslane/78-sterownik-do-podgrzewania-wody-r350-cwu.html?ic=1)                                                        |
| AF-1          | Anti-freeze system         | [Product page](https://compit.pl/produkty/osprzet/91-af-1.html?ic=1)                                                                                                          |

## Configuration in the UI

| Parameter  | Description                                               |
| ---------- | --------------------------------------------------------- |
| `Email`    | User email for [inext.compit.pl](https://inext.compit.pl) |
| `Password` | Password for the account                                  |

## Removal instructions

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
