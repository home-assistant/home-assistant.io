---
title: Easee Charger
description: Instructions on setting up Easee EV charging robots with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.x
ha_config_flow: true
ha_codeowners:
  - '@fondberg'
  - '@tmjo'
  - '@olalid'
ha_domain: easee
---

The Easee integration allows you to monitor your [Easee](https://easee-international.com/ "Easee website") charging robot. The Easee charging robot is an EV charger also known as a wallbox for charging of electric vehicles. It polls information from the [Easee API](https://api.easee.cloud/ "Easee cloud API") and an account at [Easee cloud](https://www.easee.cloud/ "Easee cloud") is required (same as for the Easee app).

This integration provides the following platforms:

- Sensors: status, power, energy, currents, voltages, schedules.

## Configuration

To set up this integration, click Configuration in the sidebar and then click Integrations. Click the + icon in the lower right and find Easee. Click configure and you will be presented with the integration dialog where you need to enter your [Easee cloud](https://www.easee.cloud/) credentials (username and password). By default, a status sensor will be added for all chargers linked to your account. You can change this in the integration options (see below).

The username is your phone number, and it needs to be entered including + sign and country code. Example: _+46123456789_.

## Options

Various options and sensors can be enabled/disabled in the integration option window. Go to integrations and click on the Options-button for the Easee integration. Options available are described below.

### Sites monitored

Select which sites the Easee integration should create sensors for. in case the account has multiple sites associated it is possible to select which sites sensors should be created for. Read more about sites in the Ecosystem section.

### Sensors monitored

Selects which of the available senors to enable or disable. In addition to providing a state/value each sensor also provides a lot of extra information in attributes. Available sensors are listed below:

| Sensor name | Main state |
|-------------|------------|
| status| STANDBY, PAUSED, CHARGING, READY_TO_CHARGE, UNKNOWN, CAR_CONNECTED |
| total_power | Total charging power |
| session_energy | Total energy in charging session |
| energy_per_hour | Energy in the last hour |
| online | Online network status, can be either WiFi or LTE |
| output_current | Output current (to the car) |
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

Each sensor will have a complete name on the form of:
```
sensor.easee_charger_<charger_id>_<sensor_name>
```

### Consumption monitoring days

Selects which sensors for energy consumptions should be created, options are 1, 7, 14, 30 and 365 days.

The sensor will have a complete name on the form of:
```
sensor.easee_charger_<charger_id>_consumptions_days_<days>
```

### Custom Units

Default units are kW for power and kWh for energy, but you can choose to change it to W and Wh instead by checking these options.

## Background on the Easee ecosystem

The Easee chargers are connected in a rather complex ecosystem consisting of chargers and cloud servers. Depending on the complexity of your setup and needs, it may be of benefit to understand some of the concepts.

### Sites, circuits and chargers

In the Easee ecosystem there are sites, circuits and chargers.

A site typically corresponds to a building, i.e. a single household home or an apartment building. Each site has a main fuse rating associated. A site may have an associated device that measures the total power usage of the building, thus allowing the chargers to limit charging to not overload the main fuses. This can be an equipment such as an Easee Equalizer, Tibber Pulse, Watty or even your own integration with a measuring device. In theory any device capable of measuring the phase currents could be used and integrated by using the API.

A circuit corresponds to a circuit breaker (aka fuse) in your electrical distribution panel. Each circuit has a fuse rating associated. Up to three chargers can be connected to the same circuit and they will then share the current that is allowed by the rating of that circuit. The chargers communicates with each other wirelessly to accomplish this sharing of current. Chargers can also be connected to separate circuits and will thus not share the current with other chargers, but will still be limited by and share the site main fuse rating.

A charger corresponds to a physical charging robot. The cars internal charger does the actual battery charging while the Easee charging robot provides the connection between the electrical system and the car. The charging robot provides the car with information about maximum current it is allowed to use, thus limiting the current used in the circuit and site. The charging robot connects to the Easee cloud through a Wifi-connection or a 4G connection.

### Voltages, currents, phases and terminals

The Easee charging robot supports several different electrical systems and configurations, both 1- and 3-phase and up to 22kW. It has a Type 2 universal charging connector. The power possible with a specific car is in addition limited by the cars internal charger power rating, its support for different electrical system and the number of phases it can use.

Inside the charging robot there are 5 terminals that connects to the electrical network. The current on each terminal and The voltages between all combinations of the terminals are measured by the charging robot. All of these measurenets are available as attributes to the voltage and current sensors. Which voltages and currents that are relevant varies with the type of electrical network.
E.g. inCurrentT3 means the current flowing through terminal 3, and voltageT2T3 means the the voltage between terminal 2 and 3.

Typical connections for different electrical systems:
|Terminal|3-phase TN|3-phase IT|1-phase TN|1-phase IT|
|--------|----------|----------|----------|----------|
|T1|PE|PE|PE|PE|
|T2|N|L1|N|L1|
|T3|L1|L2|L1|L2|
|T4|L2|L3|||
|T5|L3|||||

For a 3-phase TN system the neutral to phase voltages would be voltageT2T3, voltageT2T4 and voltageT2T5. In a 3-phase IT system, with no defined neutral, the phase to phase voltage is more relevant to measure and that would be voltageT2T3, voltageT2T4 and voltageT3T4. Terminal 1 (T1) is always protective ground (PE) and any voltage starting with T1 therefore measures relative to protective ground.

### Limits

The charging robot is configured to know the main fuse rating, which circuit it is connected to and the circuit fuse rating. It is the responsibility of the installer (electrician) to configure this. This information together with a max and dynamic current limit controls the current available at each charging robot.

The circuit and the charging robot each have a max current limit. These are hard limits which the charging robot will always respect. If there is only one charging robot on a circuit they will be the same, but with more than one they can differ. These limits are typically configured by the user.

The circuit and the charging robot also each have a dynamic current limit. This is a limit that will vary with the site total current load and is used by devices such as Easee Equalizer and Tibber Pulse to limit and balance power beteeen charging robots to not overload the site main fuse and/or circuit fuse.

### Charging schedule

A single charging schedule is currently supported by the Easee charging robot. This means you can define the time of day that charging is allowed and if it repeats daily ot not. Support for multiple schedules is a feature that will be implemented by Easee in the future.

## Disclaimer

This software is not affiliated with or endorsed by Easee AS.
