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
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Sensors are a basic integration in Home Assistant. They monitor the states and conditions of a variety of entities. An entity can be many things. This can include a physical device like a motion sensor that reports the battery level, a web service that retrieves the weather temperature, a built-in function that calculates the sun's elevation relative to your GPS position, or even a custom sensor you may have created to report the free space on your laptop. These are all _things_ reporting different types of information.

Some of these sensors are built-in to Home Assistant, some are created automatically when you add an integration (see this [list](/integrations/#sensor)), and some can be created manually. The [Statistics](/integrations/statistics) and [Template](/integrations/template) sensors are two examples of the last case.

## The state of a sensor entity

The state of a sensor entity is its currently detected value, which can be either text or a number.

<p class='img'>
<img src='/images/integrations/sensor/state_sensor.png' alt='Screenshot showing the state of a sensor entity in the developer tools' />
Screenshot showing the state of a sensor entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing different device classes for sensors:

<p class='img'>
<img src='/images/screenshots/sensor_device_classes_icons.png' />
Example of various device class icons for sensors.
</p>

The following device classes are supported for sensors:

- **None**: Generic sensor. This is the default and doesn't need to be set.
- **apparent_power**: Apparent power in VA.
- **aqi**: Air Quality Index (unitless).
- **area**: Area in m², cm², km², mm², in², ft², yd², mi², ac, ha
- **atmospheric_pressure**: Atmospheric pressure in cbar, bar, hPa, mmHg, inHg, kPa, mbar, Pa or psi
- **battery**: Percentage of battery that is left in %
- **blood_glucose_concentration**: Blood glucose concentration in mg/dL, mmol/L
- **carbon_dioxide**: Carbon Dioxide in CO2 (Smoke) in ppm
- **carbon_monoxide**: Carbon Monoxide in CO (Gas CNG/LPG) in ppm
- **current**: Current in A, mA
- **data_rate**: Data rate in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s or GiB/s
- **data_size**: Data size in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB or YiB
- **date**: Date string (ISO 8601)
- **distance**: Generic distance in km, m, cm, mm, mi, nmi, yd, or in
- **duration**: Duration in d, h, min, s, or ms
- **energy**: Energy in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal
- **energy_storage**: Stored energy in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal
- **enum**: Has a limited set of (non-numeric) states
- **frequency**: Frequency in Hz, kHz, MHz, or GHz
- **gas**: Gasvolume in m³, ft³ or CCF
- **humidity**: Percentage of humidity in the air in %
- **illuminance**: The current light level in lx
- **irradiance**: Irradiance in W/m² or BTU/(h⋅ft²)
- **moisture**: Percentage of water in a substance in %
- **monetary**: The monetary value ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes))
- **nitrogen_dioxide**: Concentration of Nitrogen Dioxide in µg/m³
- **nitrogen_monoxide**: Concentration of Nitrogen Monoxide in µg/m³
- **nitrous_oxide**: Concentration of Nitrous Oxide in µg/m³
- **ozone**: Concentration of Ozone in µg/m³
- **ph**: Potential hydrogen (pH) value of a water solution
- **pm1**: Concentration of particulate matter less than 1 micrometer in µg/m³
- **pm25**: Concentration of particulate matter less than 2.5 micrometers in µg/m³
- **pm10**: Concentration of particulate matter less than 10 micrometers in µg/m³
- **power_factor**: Power factor (unitless), unit may be `None` or %
- **power**: Power in mW, W, kW, MW, GW or TW
- **precipitation**: Accumulated precipitation in cm, in or mm
- **precipitation_intensity**: Precipitation intensity in in/d, in/h, mm/d or mm/h
- **pressure**: Pressure in Pa, kPa, hPa, bar, cbar, mbar, mmHg, inHg or psi
- **reactive_power**: Reactive power in var
- **signal_strength**: Signal strength in dB or dBm
- **sound_pressure**: Sound pressure in dB or dBA
- **speed**: Generic speed in ft/s, in/d, in/h, in/s, km/h, kn, m/s, mph, mm/d, or mm/s
- **sulphur_dioxide**: Concentration of sulphur dioxide in µg/m³
- **temperature**: Temperature in °C, °F or K
- **timestamp**: Datetime object or timestamp string (ISO 8601)
- **volatile_organic_compounds**: Concentration of volatile organic compounds in µg/m³
- **volatile_organic_compounds_parts**: Ratio of volatile organic compounds in ppm or ppb
- **voltage**: Voltage in V, mV, µV, kV, MV
- **volume**: Generic volume in L, mL, gal, fl. oz., m³, ft³, or CCF
- **volume_flow_rate**: Volume flow rate in m³/h, ft³/min, L/min, gal/min, or mL/s
- **volume_storage**: Generic stored volume in L, mL, gal, fl. oz., m³, ft³, or CCF
- **water**: Water consumption in L, gal, m³, ft³, or CCF
- **weight**: Generic mass in kg, g, mg, µg, oz, lb, or st
- **wind_speed**: Wind speed in Beaufort, ft/s, km/h, kn, m/s, or mph
