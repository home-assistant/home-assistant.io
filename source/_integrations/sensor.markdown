---
title: Sensor
description: Instructions on how to setup your sensors with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.7
ha_quality_scale: internal
ha_domain: sensor
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Sensors are a basic platform component in Home Assistant. They monitor the states and conditions of a variety of entities. An entity can be many things. This can include a physical device like a motion sensor that reports the battery level, a web service that retrieves the weather temperature, a built-in function that calculates the sun's elevation relative to your GPS position, or even a custom sensor you may have created to report the free space on your laptop. These are all *things* reporting different types of information.

Some of these sensors are built-in to Home Assistant, some are created automatically when you add an integration (see this [list](/integrations/#sensor)), and some can be created manually. The [Statistics](/integrations/statistics) and [Template](/integrations/template) sensors are two examples of the last case.

## Device Class

The type of data a sensor returns impacts how it is displayed in the frontend. This is controlled by the sensor's device class designation. Built-in sensors and many created from an integration will have this designation predefined. Those can be modified in the [customize section](/docs/configuration/customizing-devices/). When manually creating a new sensor the device class may be optionally assigned. A full list of available sensor device classes is below:

- **None**: Generic sensor. This is the default and doesn't need to be set.
- **apparent_power**: Apparent power in VA.
- **aqi**: Air Quality Index
- **battery**: Percentage of battery that is left
- **carbon_dioxide**: Carbon Dioxide in CO2 (Smoke)
- **carbon_monoxide**: Carbon Monoxide in CO (Gas CNG/LPG)
- **current**: Current in A
- **date**: Date string (ISO 8601)
- **distance**: Generic distance in km, m, cm, mm, mi, yd, or in
- **duration**: Duration in days, hours, minutes or seconds
- **energy**: Energy in Wh, kWh or MWh
- **frequency**: Frequency in Hz, kHz, MHz or GHz
- **gas**: Gasvolume in m³ or ft³
- **humidity**: Percentage of humidity in the air
- **illuminance**: The current light level in lx or lm
- **moisture**: Percentage of water in a substance
- **monetary**: The monetary value
- **nitrogen_dioxide**: Concentration of Nitrogen Dioxide in µg/m³
- **nitrogen_monoxide**: Concentration of Nitrogen Monoxide in µg/m³
- **nitrous_oxide**: Concentration of Nitrous Oxide in µg/m³
- **ozone**: Concentration of Ozone in µg/m³
- **pm1**: Concentration of particulate matter less than 1 micrometer in µg/m³
- **pm10**: Concentration of particulate matter less than 10 micrometers in µg/m³
- **pm25**: Concentration of particulate matter less than 2.5 micrometers in µg/m³
- **power_factor**: Power factor in %
- **power**: Power in W or kW
- **pressure**: Pressure in Pa, kPa, hPa, bar, cbar, mbar, mmHg, inHg, or psi
- **reactive_power**: Reactive power in var
- **signal_strength**: Signal strength in dB or dBm
- **speed**: Generic speed in ft/s, in/d, in/h, km/h, kn, m/s, mph, or mm/d
- **sulphur_dioxide**: Concentration of sulphur dioxide in µg/m³
- **temperature**: Temperature in °C or °F
- **timestamp**: Datetime object or timestamp string (ISO 8601)
- **volatile_organic_compounds**: Concentration of volatile organic compounds in µg/m³
- **voltage**: Voltage in V
- **volume**: Generic volume in L, mL, gal, fl. oz., m³, or ft³
- **weight**: Generic mass in kg, g, mg, µg, oz, or lb

<p class='img'>
<img src='/images/screenshots/sensor_device_classes_icons.png' />
Example of various device class icons for sensors.
</p>
