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
ha_domain: easee
---

The Easee integration allows you to monitor your [Easee](https://easee-international.com/ "Easee website") charging robot, more frequently referred to as EV charger or wallbox for charging of electric vehicles. It polls information from the [Easee API](https://api.easee.cloud/ "Easee cloud API") and an account at [Easee cloud](https://www.easee.cloud/ "Easee cloud") is required (same as for the Easee app).

This integration provides the following platforms:

- Sensors: status, power, energy, currents, voltages, schedules.

## Configuration

To set up this integration, click Configuration in the sidebar and then click Integrations. Click the + icon in the lower right and find easee. Click configure and you will be presented with the integration dialog where you need to enter your [Easee cloud "Easee cloud"](https://www.easee.cloud/) credentials (username and password). By default, a status sensor will be added for all chargers linked to your account. You can change this in the integration options (see below).

The username is your phone number, including + sign and country code. Example: _+46123456789_.

## Options

Various options and sensors can be enabled/disabled in the integration option window. Go to integrations and click on the Options-button for the Easee integrated. Options available are described below.

### Sites to include

Select which sites the easee integration should create sensors for. This is mostly relevant for people having multiple sites, if you only have one site it is quite likely you would want to include this. Read more about sites in the Ecosystem section.

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

Each sensor will have a complete name on the form of sensor.easee_charger_<charger_id>_<sensor_name>

### Consumption monitoring days

Selects which sensors for energy consumptions should be created, options are 1, 7, 14, 30 and 365 days.

The sensor will have a complete name on the form of sensor.easee_charger_<charger_id>_consumptions_days_<days>.

### Custom Units

Default units are kW for power and kWh for energy, but you can choose to change it to W and Wh instead by checking these options.

## Background on the Easee ecosystem

The easee chargers are connected in a rather complex ecosystem consisting of chargers and cloud servers. Depending on your needs, it may be required to understand some of the concepts.

### Sites, circuits and chargers

In the easee ecosystem there are sites, circuits and chargers. If your setup is limited to a single charger, there is probably not too much you need to think about in this respect, but some features requires a certain understanding of the ecosystem to fully utilize the functionality available when you have multiple chargers.

A site typically corresponds to a building, i.e. a single household home or an apartment building. Each site has a main fuse rating associated. A site may have an associated device that measures the total power usage of the building, thus allowing the chargers to limit charging to not overload the main fuses. This can be equipment such as a Easee Equalizer, Tibber Pulse, Watty or even your own integration with a measuring device. In theory any device capable of measuring the phase currents could be used if integrated with the Easee ecosystem.

A circuit corresponds to a circuit breaker (or fuse) in your electrical distribution panel. Each circuit has a fuse rating associated. Up to three chargers can be connected to the same circuit and they will then share the current that is allowed by the rating of that circuit. The chargers communicates with each other wirelessly to accomplish this. Chargers can also be connected to separate circuits and will thus not share the current with other chargers, but will still be limited by and share the site main fuse rating.

A charger corresponds to a physical charging robot (charger). For all 'home chargers', the actual charger sits in your car, so charger is a somewhat misleading name but it is more like an intelligent power valve to control EV charging in a safe way. The Easee charging robot can be connected to the cloud through a Wifi-connection or through the built-in 4G connection.

### Voltages, currents, phases and terminals

The easee charger supports several different electrical systems and configurations, both 1- and 3-phase and up to 22kW. It has a Type 2 universal charging connector. Remember that the actual charger sits in your car, so the power may be limited by the charger rating.

Inside the charger there are 5 terminals that connects to the electrical network. The voltages and currents that are relevant to measure varies with the type of network.
To provide full insight, all of the possible combination of voltages and currents are available as attributes to sensors. E.g. inCurrentT3 means the current flowing through terminal 3, and voltageT2T3 means the the voltage between terminal 2 and 3.

Typical connections for different electrical systems:
|Terminal|3-phase TN|3-phase IT|1-phase TN|1-phase IT|
|--------|----------|----------|----------|----------|
|T1|PE|PE|PE|PE|
|T2|N|L1|N|L1|
|T3|L1|L2|L1|L2|
|T4|L2|L3|||
|T5|L3|||||

E.g. for a 3-phase TN system, the line-to-line voltages would be voltageT2T3, voltageT2T4 and voltageT2T5. Any voltage including T1 (PE) would be measuring the phase voltages (phase-to-ground).

### Limits

The charging robot has several limits built in. First of all it is programmed to know the main fuse of your site (usually defined by the installer during initial setup) and this may prove useful to not overload your electrical system if you have a measuring device connected to it as perviously mentioned.

Secondly, there are max currents on two levels: circuit and charger. These are absolute limits which the charger will respect, but if you only have one charger on one circuit they are basically the same. With several chargers on a single circuit however, this makes sense.

Finally, there are dynamic current limits on the same two levels which are typically used by devices such as Easee Equalizer or Tibber to dynamically balance several power between chargers.

### Charging schedule

A single charging schedule is supported by the Easee charging robot and by this integration. This means you can define the time of day that charging is allowed, and the schedule can either be a one time happening on the specific date or a repeating schedule every day. Support for multiple schedules is said to be implemented in the future.


## Disclaimer

This software is not affiliated with or endorsed by Easee AS.
