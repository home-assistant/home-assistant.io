---
title: Compit
description: Instructions on how to integrate Compit devices within Home Assistant.
ha_category:
  - Climate
ha_release: '2025.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Przemko92'
ha_domain: compit
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Compit** {% term integration %} allows you to integrate air conditioning, ventilation, and heating controllers with Home Assistant. You need a Compit iNext account, which you can set up at [inext.compit.pl](https://inext.compit.pl).

## Prerequisites

1. Create an account on [inext.compit.pl](https://inext.compit.pl).
2. Configure your Compit devices in your account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username of your Compit iNext account."
Password:
    description: "The password of your Compit iNext account."
{% endconfiguration_basic %}

## Supported devices

This integration supports most of Compit device models across thermostats, controllers, and sensors.

### Thermostats

- [Nano Color](https://compit.pl/produkty/termostaty-pokojowe/8-termostat-pokojowy-nano-color.html?ic=1) – Room thermostat
- [Nano Color 2](https://compit.pl/produkty/termostaty-pokojowe/88-termostat-pokojowy-nano-color-2.html?ic=1) – Room thermostat
- [Nano One](https://compit.pl/produkty/termostaty-pokojowe/24-termostat-pokojowy-nano-one.html?ic=1) – Room thermostat

### Controllers

- [AF-1](https://compit.pl/produkty/osprzet/91-af-1.html?ic=1) – Anti-freeze system
- [BioMax742](https://compit.pl/dokumenty-do-pobrania/sterowniki-do-kot%C5%82%C3%B2w-dokumenty-do-pobrania/category/50-sterownik-kot%C5%82a-pelletowego-biomax-742.html?download=90:sterownik-kot%C5%82a-pelletowego-biomax-742-wersja-u7) – Pellet boiler controller
- [BioMax775](https://compit.pl/dokumenty-do-pobrania/sterowniki-do-kot%C5%82%C3%B3w-dokumenty-do-pobrania/category/126-sterownik-kotla-pelletowego-biomax-775.html?download=313:sterownik-kotla-pelletowego-biomax-775-wersja-7), BioMax772 – Pellet boiler controllers
- [BWC310](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1) – Mixing valve controller
- [COMBO](https://compit.pl/produkty/osprzet/92-combo.html?ic=1) – Combo module
- [EL750](https://compit.pl/produkty/sterowniki-do-kotlow/73-sterownik-kotla-elektrycznego-el750-1.html?ic=1) – Electric boiler controller
- [L2](https://compit.pl/produkty/sterowniki-ogrzewania-podlogowego/40-sterownik-ogrzewania-podlogowego-l2.html?ic=1) – Floor heating controller
- [R350.CWU](https://compit.pl/produkty/sterowniki-uniwerslane/78-sterownik-do-podgrzewania-wody-r350-cwu.html?ic=1) – Universal controller
- [R350 T3](https://compit.pl/produkty/sterowniki-instalacji/42-dwustopniowy-sterownik-temperatury-regulator-pi-regulator-krokowy-sterowanie-3-punktowe-r350-07.html?ic=1) – Universal controller
- [R350.M](https://compit.pl/produkty/sterowniki-uniwerslane/85-pogodowy-regulator-temperatury-obiegu-grzewczego-z-mieszaczem-r350m.html?ic=1) – Universal controller
- [R470](https://compit.pl/produkty/sterowniki-pomp-ciepla/10-sterownik-pompy-ciepla-r470-one.html?ic=1), R480 – Heat pump controllers
- [R490](https://compit.pl/produkty/sterowniki-pomp-ciepla/12-sterownik-pompy-ciepla-r490-one.html?ic=1) – Heat pump controller
- [R770RS](https://compit.pl/produkty/sterowniki-do-kotlow/83-pogodowy-regulator-kotla-retortowego-i-instalacji-grzewczej-r771-2.html?ic=1), [R771RS](https://compit.pl/produkty/sterowniki-do-kotlow/83-pogodowy-regulator-kotla-retortowego-i-instalacji-grzewczej-r771-2.html?ic=1) – Boiler controllers
- [R810](https://compit.pl/produkty/sterowniki-instalacji/43-pogodowy-regulator-temperatury-obiegu-grzewczego-r810.html?ic=1) – Heating circuit controller
- [R900](https://compit.pl/produkty/sterowniki-pomp-ciepla/89-r900.html?ic=1) – Heat pump controller

### Sensors

- [SHC](https://compit.pl/produkty/osprzet/67-czujnik-stezenia-dwutlenku-wegla-wilgotnosci-i-temperatury-w-pomieszczeniach-shc.html?ic=1) – CO₂, humidity, and temperature sensor
- [SPM](https://compit.pl/produkty/osprzet/87-czujnik-jakosci-powietrza-spm.html?ic=1) – Air quality sensor

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
