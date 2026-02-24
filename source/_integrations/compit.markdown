---
title: Compit
description: Instructions on how to integrate Compit devices within Home Assistant.
ha_category:
  - Climate
  - Water Heater
ha_release: '2025.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Przemko92'
ha_domain: compit
ha_platforms:
  - climate
  - binary_sensor
  - select
  - water_heater
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
- [SolarComp951](https://compit.pl/produkty/regulatory-solarne/22-sterownik-ukladu-solarnego-solarcomp-951.html) – Solar system controller
- [SolarComp971](https://compit.pl/produkty/regulatory-solarne/23-sterownik-ukladu-solarnego-z-pwm-solarcomp-971.html) – Solar system controller
- [SolarComp971C](https://compit.pl/produkty/regulatory-solarne/70-sterownik-ukladu-solarnego-z-pwm-solarcomp-971c.html) – Solar system controller

### Sensors

- [SHC](https://compit.pl/produkty/osprzet/67-czujnik-stezenia-dwutlenku-wegla-wilgotnosci-i-temperatury-w-pomieszczeniach-shc.html?ic=1) – CO₂, humidity, and temperature sensor
- [SPM](https://compit.pl/produkty/osprzet/87-czujnik-jakosci-powietrza-spm.html?ic=1) – Air quality sensor

{% note %}
When the SPM sensor is connected to a Nano Color thermostat, it is displayed as `SPM - Nano Color` in Home Assistant. When connected to a Nano Color 2 thermostat, it is displayed as `SPM - Nano Color 2`.
{% endnote %}

## Supported functionality

The **Compit** integration provides the following entities.

### Binary sensors

- **Airing**
  - **Description**: Indicates whether a window is open for airing.
  - **Available for devices**: Nano Color 2 (Room thermostat)

- **Battery charging**
  - **Description**: Indicates whether the battery is currently charging.
  - **Available for devices**: AF-1 (Anti-freeze system)

- **CO₂ alert**
  - **Description**: Indicates whether the CO₂ level has exceeded the threshold.
  - **Available for devices**: SPM - Nano Color 2 (Air quality sensor connected to Nano Color 2)

- **CO₂ level**
  - **Description**: Indicates whether the CO₂ level is problematic.
  - **Available for devices**: Nano Color (Room thermostat), Nano Color 2 (Room thermostat), SPM (Air quality sensor), SHC (CO₂, humidity, and temperature sensor)

- **Dust alert**
  - **Description**: Indicates whether the dust level has exceeded the threshold.
  - **Available for devices**: SPM - Nano Color 2 (Air quality sensor connected to Nano Color 2)

- **Has battery**
  - **Description**: Indicates whether the device has a battery installed.
  - **Available for devices**: AF-1 (Anti-freeze system)

- **Has external power**
  - **Description**: Indicates whether the device is connected to external power.
  - **Available for devices**: AF-1 (Anti-freeze system)

- **Pump status**
  - **Description**: Indicates whether the pump is currently running.
  - **Available for devices**: AF-1 (Anti-freeze system)

- **Temperature alert**
  - **Description**: Indicates whether the temperature has exceeded the threshold.
  - **Available for devices**: SPM - Nano Color 2 (Air quality sensor connected to Nano Color 2)

Binary sensors provide status information about your Compit devices.

### Climate

The climate entity reflects the current heating or cooling state and the **active** target temperature. Use the climate entity when you want to change the target temperature temporarily or for the current session (for example, turning up the heat for the evening). The climate entity is where you set what temperature the device is aiming for right now.

### Numbers

Number entities let you set **default** temperature setpoints and other configuration values. These are the preset target temperatures used for each operating mode (such as Comfort, Eco, or Holiday). They are not used for temporary or one-off changes; for those, use the climate entity instead.

- **Comfort target temperature**
  - **Description**: Target room temperature for comfort mode.
  - **Range**: 0–40 °C
  - **Available for devices**: Nano One (Room thermostat), Nano Color (Room thermostat), Nano Color 2 (Room thermostat)

- **Eco target temperature**
  - **Description**: Target room temperature for eco mode.
  - **Range**: 0–40 °C
  - **Available for devices**: Nano One (Room thermostat)

- **Holiday target temperature**
  - **Description**: Target room temperature while you are on holiday.
  - **Range**: 0–40 °C
  - **Available for devices**: Nano One (Room thermostat)

- **Eco winter target temperature**
  - **Description**: Target room temperature for eco mode during the winter
    season.
  - **Range**: 0–40 °C
  - **Available for devices**: Nano Color (Room thermostat), Nano Color 2 (Room thermostat)

- **Eco cooling target temperature**
  - **Description**: Target room temperature for eco mode during cooling.
  - **Range**: 0–40 °C
  - **Available for devices**: Nano Color (Room thermostat), Nano Color 2 (Room thermostat)

- **Out-of-home target temperature**
  - **Description**: Target room temperature when nobody is at home.
  - **Range**: 0–40 °C
  - **Available for devices**: Nano Color (Room thermostat), Nano Color 2 (Room thermostat)

- **Constant target temperature**
  - **Description**: Constant target temperature for the heating circuit.
  - **Range**: 0–95 °C
  - **Available for devices**: R810 (Heating circuit controller)

- **Heating constant target temperature**
  - **Description**: Constant target temperature for the heat pump heating
    circuit.
  - **Range**: 0–95 °C
  - **Available for devices**: R470 (Heat pump controller)

- **Mixer target temperature**
  - **Description**: Target temperature for the mixing valve circuit.
  - **Range**: 0–90 °C
  - **Available for devices**: R350.M (Universal controller)

- **Mixer target temperature zone 1**
  - **Description**: Target temperature for mixing valve circuit in zone 1.
  - **Range**: 0–95 °C
  - **Available for devices**: R770RS (Boiler controller), R771RS (Boiler controller)

- **Mixer target temperature zone 2**
  - **Description**: Target temperature for mixing valve circuit in zone 2.
  - **Range**: 0–95 °C
  - **Available for devices**: R770RS (Boiler controller), R771RS (Boiler controller)

- **Boiler target temperature**
  - **Description**: Target temperature for the boiler.
  - **Range**: 0–95 °C
  - **Available for devices**: BioMax742 (Pellet boiler controller), EL750 (Electric boiler controller)

- **Boiler constant target temperature**
  - **Description**: Constant target temperature for the boiler.
  - **Range**: 0–90 °C
  - **Available for devices**: BioMax742 (Pellet boiler controller), BioMax772 (Pellet boiler controller), BioMax775 (Pellet boiler controller)

### Selects

- **Language**
  - **Description**: Language of the device interface.
  - **Options**: Polish, English
  - **Available for devices**: Nano Color (Room thermostat), Nano Color 2 (Room thermostat), Nano One (Room thermostat)

- **Aero by pass**
  - **Description**: Bypass mode for ventilation systems.
  - **Options**: Off, Auto, On
  - **Available for devices**: Nano Color (Room thermostat), Nano Color 2 (Room thermostat)

- **Nano work mode**
  - **Description**: Operating mode for the thermostat.
  - **Options**: Manual 3, Manual 2, Manual 1, Manual 0, Schedule, Christmas, Out of home
  - **Available for devices**: Nano One (Room thermostat)

- **Operating mode**
  - **Description**: Primary operating mode of the device.
  - **Options**: Disabled, Eco, Hybrid (for R900, R490, R480); Disabled, Auto, Eco (for R470)
  - **Available for devices**: R900 (Heat pump controller), R490 (Heat pump controller), R470 (Heat pump controller), R480 (Heat pump controller)

- **Work mode**
  - **Description**: Seasonal operating mode.
  - **Options**: Winter, Summer, Cooling
  - **Available for devices**: R490 (Heat pump controller)

- **Heating source of correction**
  - **Description**: Source for heating temperature corrections.
  - **Options**: No corrections, Schedule, Thermostat, Nano nr 1, Nano nr 2, Nano nr 3, Nano nr 4, Nano nr 5
  - **Available for devices**: R470 (Heat pump controller), BioMax742 (Pellet boiler controller)

- **SolarComp operating mode**
  - **Description**: Operating mode for solar controllers.
  - **Options**: Auto, De-icing, Holiday, Disabled
  - **Available for devices**: SolarComp951 (Solar system controller), SolarComp971 (Solar system controller) and SolarComp971C (Solar system controller)

- **Mixer mode zone 1**
  - **Description**: Zone 1 mixing valve operating mode.
  - **Options**: Disabled, Without thermostat, Schedule, Thermostat, Nano nr 1, Nano nr 2, Nano nr 3, Nano nr 4, Nano nr 5
  - **Available for devices**: BioMax775 (Pellet boiler controller), BioMax772 (Pellet boiler controller)

- **Mixer mode zone 2**
  - **Description**: Zone 2 mixing valve operating mode.
  - **Options**: Disabled, Without thermostat, Schedule, Thermostat, Nano nr 1, Nano nr 2, Nano nr 3, Nano nr 4, Nano nr 5
  - **Available for devices**: BioMax775 (Pellet boiler controller), BioMax772 (Pellet boiler controller)

- **Mixer mode**
  - **Description**: Mixing valve operating mode.
  - **Options**: No corrections, Schedule, Thermostat, Nano nr 1, Nano nr 2, Nano nr 3, Nano nr 4, Nano nr 5
  - **Available for devices**: R350 T3 (Universal controller), BioMax742 (Pellet boiler controller)

- **DHW circulation**
  - **Description**: Domestic hot water circulation mode.
  - **Options**: Disabled, Constant, Schedule
  - **Available for devices**: BioMax775 (Pellet boiler controller), BioMax742 (Pellet boiler controller), BioMax772 (Pellet boiler controller)

- **Buffer mode**
  - **Description**: Buffer tank operating mode.
  - **Options**: Schedule, Manual, Disabled
  - **Available for devices**: R480 (Heat pump controller)

### Water heaters

- **Water heater**
  - **Description**: Controls the domestic hot water parameters.
  - **Available for devices**: BioMax742, BioMax772, BioMax775, EL750, R350.CWU, R377B, R470, R480, R490, R770RS, R771RS, R900, SolarComp951, SolarComp971, SolarComp971C
  - **Remarks**:
    - Solar controllers and R350.CWU only support setting the target temperature.
    - Other devices also support On/Off and operation modes.
      - State `off` maps to `off` in Compit
      - State `performance` maps to `on` in Compit
      - State `eco` maps to `schedule` in Compit
    - Solar controllers don't support current temperature attribute.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
