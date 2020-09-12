---
title: Easee Charger
description: Instructions on setting up Easee charging stations with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.x
ha_config_flow: true
ha_codeowners:
  - '@fondberg'
ha_domain: easee
---

The easee integration allows you to monitor your Easee charger (wallbox). It polls information from the EaseeCloud API (see https://api.easee.cloud/index.html).

This component provides the following platforms:

- Sensors: status, power, energy, currents, voltages, schedules.

## Configuration

To set up this integration, click Configuration in the sidebar and then click Integrations. Click the + icon in the lower right and find easee. Click configure and you will be presented with the intergation dialog where you enter your easee.cloud login username and password. The username is your phone number, including + sign and country code, example: +46123456789.	

## Options

Various options and sensors can be enabled/disabled in the integration option window as described below. 

### Sites to include

Select which sites the easee component should create sensors for, thus limiting sensor clutter.

### Sensors monitored

Selects which of the senors in the table below to enable/disable.
In addition to providing a state/value each sensor also provides a lot of extra information in attributes.

| Sensor name | Main state |
|-------------|------------|
| status| STANDBY/PAUSED/CHARGING/READY_TO_CHARGE/UNKNOWN/CAR_CONNECTED |
| total_power | Total charging power |
| session_energy | Total energy in charging session |
| energy_per_hour | Energy in the last hour |
| online | Online network status, can be either WiFi or LTE |
| output_current | Ouptut current (to the car) |
| in_current | Input current (from the grid) |
| circuit_current | Circuit current |
| dynamic_circuit_current | Circuit dynamic current |
| max_circuit_current | Circuit max current |
| dynamic_charger_current | Charger dynamic current |
| max_charger_current | Charger max current |
| voltage | Charger voltage |
| reason_for_no_current | Diagnostic reason for no current |
| update_available | Firmware update available |
| basic_schedule | The programmed schedule |
| cost_per_kwh | Cost per kWh |

Each sensor will have a complete name on the form of sensor.easee_charger_<charger_id>_<sensor_name>

### Consumption monitoring days

Selects which sensors for energy consumptions should be created, options are 1, 7, 14, 30 and 365 days.

The sensor vill have a complete name on the form of sensor.easee_chager_<charger_id>_consumptions_days_<1/7/14/30/365>.

### Custom Units

Selects the units for power, kW or W, and for energy, kWh or Wh.

## Background on the Easee ecosystem

The easee chargers are connected in a rather complex ecosystem consisting of chargers and cloud servers. Depending on your needs, it may be required to understand some of the concepts.

### Sites, circuits and chargers

In the easee ecosystem there are sites, circuits and chargers.

A site typically corresponds to a building, i.e. a single household home or an apartment building. Each site has a main fuse rating associated. A site may have an associated equipmant that measures the current load on the phases of the building, thus allowing the chargers to limit their current to not overload the main fuses. This can be equipment as a Watty, Tibber Pulse or Easee Equalizer, but in theory any device capable of measureing the phase currents could be used if integrated with the Easee ecosystem.

A circuit corresponds to a circuit breaker in the building electrical distribution panel. Each circuit have a fuse rating associated. Up to three chargers can be connected to the same circuit and they will then share the current that is allowed by the rating of that circuit. The chargers communicates with each other wirelessly to accomplish this. Chargers can also be connected to different circuits and will thus not share the current with other chargers, but will still be limited by and share the site main fuse rating.

A charger corresponds to a physical charging station.

### Voltages, currents, phases and terminals

The easee charger supports several different electrical systems and configurations.
Inside the charger there are 5 terminals that connects to the electrical net. The voltages and currents that are relevant to measure varies with the type of network.
To provide full insight, all of the possible combination of voltages and currents are available as attributes to sensors. E.g. inCurrentT3 means the current flowing through terminal 3, and voltageT2T3 means the the voltage between terminal 2 and 3.

Typical connections for different electrical systems:
|Terminal|3-phase TN|3-phase IT|1-phase TN|1-phase IT|
|--------|----------|----------|----------|----------|
|T1|PE|PE|PE|PE|
|T2|N|L1|N|L1|
|T3|L1|L2|L1|L2|
|T4|L2|L3|||
|T5|L3|||||

E.g. for a 3-phase TN system, the voltage of phase L1 is voltageT2T3, for L2 it is voltageT2T4, for L3 it is voltageT2T5, and so on.

## Disclaimer

This software is not affiliated with or endorsed by Easee AS.
