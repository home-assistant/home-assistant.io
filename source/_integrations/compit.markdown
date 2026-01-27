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
  - sensor
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

## Supported functionality

The **Compit** {% term integration %} provides the following {% term entities %}.

### Sensors

The integration provides various sensors depending on your device model. Below is a complete list of available sensors and the devices that support them.

#### Temperature sensors

- **Outdoor temperature**
  - **Description**: Current outdoor temperature.
  - **Available for devices**: R 810, R350 T3, Nano Color, CO2 SHC, r470, BioMax742, R350.CWU, BioMax772, SPM - Nano Color 2, R770RS / R771RS, BioMax775, R350.M, Nano Color 2, R 900, SPM - Nano Color, AF-1

- **Boiler temperature**
  - **Description**: Current temperature of the boiler.
  - **Available for devices**: BioMax742, BioMax772, R770RS / R771RS, BioMax775, EL750

- **Calculated heating temperature**
  - **Description**: Calculated target heating temperature.
  - **Available for devices**: R 810, BWC310

- **Target heating temperature**
  - **Description**: Target heating temperature setting.
  - **Available for devices**: R 810, BWC310

- **Return circuit temperature**
  - **Description**: Temperature of the return circuit.
  - **Available for devices**: R 810, AF-1

- **Calculated target temperature**
  - **Description**: Calculated target temperature for the system.
  - **Available for devices**: R350 T3, R350.CWU

- **Circuit target temperature**
  - **Description**: Target temperature for the heating circuit.
  - **Available for devices**: R350 T3

- **Mixer temperature**
  - **Description**: Temperature at the mixer valve.
  - **Available for devices**: R350 T3, R350.M

- **Mixer temperature zone 1**
  - **Description**: Mixer temperature for zone 1.
  - **Available for devices**: R770RS / R771RS

- **Mixer temperature zone 2**
  - **Description**: Mixer temperature for zone 2.
  - **Available for devices**: R770RS / R771RS

- **Collector temperature**
  - **Description**: Temperature of the solar collector.
  - **Available for devices**: SolarComp 951, SolarComp971, SolarComp971C

- **Tank temperature T2 (bottom)**
  - **Description**: Temperature at the bottom of the tank (sensor T2).
  - **Available for devices**: SolarComp 951, SolarComp971, SolarComp971C

- **Tank temperature T3 (top)**
  - **Description**: Temperature at the top of the tank (sensor T3).
  - **Available for devices**: SolarComp 951, SolarComp971, SolarComp971C

- **Tank temperature T4**
  - **Description**: Temperature at sensor T4 location.
  - **Available for devices**: SolarComp 951

- **DHW temperature**
  - **Description**: Domestic hot water temperature.
  - **Available for devices**: EL750

- **DHW measured temperature**
  - **Description**: Measured domestic hot water temperature.
  - **Available for devices**: R350.CWU, R480

- **Buffer return temperature**
  - **Description**: Temperature of the buffer return.
  - **Available for devices**: EL750

- **Lower source temperature**
  - **Description**: Temperature of the lower heat source.
  - **Available for devices**: r490

- **Upper source temperature**
  - **Description**: Temperature of the upper heat source.
  - **Available for devices**: r490

- **Actual buffer temperature**
  - **Description**: Current buffer temperature.
  - **Available for devices**: R480, R 900

- **Actual DHW temperature**
  - **Description**: Current domestic hot water temperature.
  - **Available for devices**: R480, R 900

- **Protection temperature**
  - **Description**: Protection temperature sensor reading.
  - **Available for devices**: R350.M

- **Buffer set temperature**
  - **Description**: Buffer temperature setpoint.
  - **Available for devices**: R377B

- **Actual heating circuit temperature zone 1**
  - **Description**: Current temperature in heating circuit zone 1.
  - **Available for devices**: R 900

- **Actual heating circuit temperature zone 2**
  - **Description**: Current temperature in heating circuit zone 2.
  - **Available for devices**: R 900

- **Actual heating circuit temperature zone 3**
  - **Description**: Current temperature in heating circuit zone 3.
  - **Available for devices**: R 900

- **Actual heating circuit temperature zone 4**
  - **Description**: Current temperature in heating circuit zone 4.
  - **Available for devices**: R 900

- **Actual upper source temperature**
  - **Description**: Current upper source temperature.
  - **Available for devices**: R 900

- **Calculated buffer temperature**
  - **Description**: Calculated buffer temperature.
  - **Available for devices**: R 900

- **Calculated DHW temperature**
  - **Description**: Calculated domestic hot water temperature.
  - **Available for devices**: R 900

- **Calculated upper source temperature**
  - **Description**: Calculated upper source temperature.
  - **Available for devices**: R 900

- **Heating target temperature zone 1**
  - **Description**: Target heating temperature for zone 1.
  - **Available for devices**: R 900

- **Heating target temperature zone 2**
  - **Description**: Target heating temperature for zone 2.
  - **Available for devices**: R 900

- **Heating target temperature zone 3**
  - **Description**: Target heating temperature for zone 3.
  - **Available for devices**: R 900

- **Heating target temperature zone 4**
  - **Description**: Target heating temperature for zone 4.
  - **Available for devices**: R 900

#### Air quality sensors

- **PM2.5 level**
  - **Description**: PM2.5 particulate matter status level (normal, warning, exceeded).
  - **Available for devices**: Nano Color, Nano Color 2

- **PM10 level**
  - **Description**: PM10 particulate matter status level (normal, warning, exceeded).
  - **Available for devices**: Nano Color, Nano Color 2

- **PM2.5 measured**
  - **Description**: PM2.5 particulate matter concentration in µg/m³.
  - **Available for devices**: SPM - Nano Color 2, SPM - Nano Color

- **PM10 measured**
  - **Description**: PM10 particulate matter concentration in µg/m³.
  - **Available for devices**: SPM - Nano Color 2, SPM - Nano Color

- **PM1 level measured**
  - **Description**: PM1 particulate matter concentration in µg/m³.
  - **Available for devices**: SPM - Nano Color 2

- **PM4 level measured**
  - **Description**: PM4 particulate matter concentration in µg/m³.
  - **Available for devices**: SPM - Nano Color 2

- **CO₂ level**
  - **Description**: Carbon dioxide concentration in ppm.
  - **Available for devices**: SPM - Nano Color 2

- **CO₂ percent**
  - **Description**: Carbon dioxide level as percentage.
  - **Available for devices**: SPM - Nano Color 2

#### Humidity sensors

- **Humidity**
  - **Description**: Relative humidity in percent.
  - **Available for devices**: CO2 SHC, SPM - Nano Color 2, SPM - Nano Color

#### Power and energy sensors

- **Collector power**
  - **Description**: Current power output from solar collector in kW.
  - **Available for devices**: SolarComp 951, SolarComp971, SolarComp971C

- **Energy today**
  - **Description**: Energy collected today in kWh.
  - **Available for devices**: SolarComp971, SolarComp971C

- **Energy consumption**
  - **Description**: Current energy consumption in MW.
  - **Available for devices**: SolarComp 971SD1

- **Energy total**
  - **Description**: Total energy consumed in kWh.
  - **Available for devices**: R350.CWU

- **Energy yesterday**
  - **Description**: Energy consumed yesterday in kWh.
  - **Available for devices**: R350.CWU

- **Energy smart grid yesterday**
  - **Description**: Energy consumed via smart grid yesterday in kWh.
  - **Available for devices**: R350.CWU

#### Fuel and battery sensors

- **Fuel level**
  - **Description**: Current fuel level in percent.
  - **Available for devices**: BioMax742, BioMax772, R770RS / R771RS, BioMax775

- **Battery level**
  - **Description**: Battery charge level in percent.
  - **Available for devices**: AF-1

- **Charging power**
  - **Description**: Battery charging current in mA.
  - **Available for devices**: AF-1

#### Diagnostic sensors

- **Ventilation alarm**
  - **Description**: Ventilation system alarm status.
  - **Available for devices**: Nano Color, Nano Color 2

- **Ventilation gear**
  - **Description**: Current ventilation gear setting.
  - **Available for devices**: Nano Color 2

- **Alarm code**
  - **Description**: System alarm code.
  - **Available for devices**: AF-1

- **PK1 function**
  - **Description**: PK1 function mode status.
  - **Available for devices**: Combo

{% note %}
The available sensors depend on your specific Compit device configuration like installed sensors. Not all sensors will be available for every device.
{% endnote %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
