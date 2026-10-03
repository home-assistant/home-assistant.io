---
title: Sensor
description: Instructions on how to set up your sensors with Home Assistant.
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

## Sensor states

The {% term state %} of a sensor entity is its current value. How Home Assistant stores the value, and how the interface shows it, depends on the type of sensor:

- Numeric sensors store the number without its unit, for example, `21.5`. The interface shows the number in your local number format, with its unit if it has one, for example, **21.5 °C**.
- Timestamp sensors store the date and time in UTC, for example, `2026-01-01T12:00:00+00:00`. The interface shows it in your local date and time format.
- Other sensors store text. If the integration translates the possible values, the interface shows the translated label instead of the stored text.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## State class

The state class tells Home Assistant what kind of value a sensor has. Home Assistant uses it mainly to keep {% term "long-term statistics" %} for the sensor, which you see, for example, in the **Energy** dashboard and in [statistic cards](/dashboards/statistic/).

Not every sensor has a state class. A sensor with a state class must have a number as its state, so a sensor that shows text or a date doesn't have one. A sensor without a state class has no long-term statistics.

The integration that provides the sensor usually sets the state class. There are four state classes:

- **Measurement**: A value right now, for example, a temperature or the current power use.
- **Measurement angle**: An angle right now, in degrees, for example, the wind direction.
- **Total**: An amount that can go up and down, for example, the energy you put into and take out of a home battery.
- **Total increasing**: An amount that only goes up, except when it's reset, for example, an energy meter.

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing different device classes for sensors:

<p class='img'>
<img src='/images/screenshots/sensor_device_classes_icons.png' />
Example of various device class icons for sensors.
</p>

The following device classes are supported for sensors:

- **None**: Generic sensor. This is the default and doesn't need to be set.
- **absolute_humidity**: Absolute humidity in g/m³, mg/m³.
- **apparent_power**: Apparent power in mVA, VA or kVA.
- **aqi**: Air Quality Index (unitless).
- **area**: Area in m², cm², km², mm², in², ft², yd², mi², ac, ha
- **atmospheric_pressure**: Atmospheric pressure in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O or psi
- **battery**: Percentage of battery that is left in %
- **blood_glucose_concentration**: Blood glucose concentration in mg/dL, mmol/L
- **carbon_dioxide**: Carbon Dioxide (CO₂) concentration in ppm
- **carbon_monoxide**: Carbon Monoxide (CO) concentration in ppb, ppm, µg/m³, mg/m³
- **conductivity**: Conductivity in S/cm, mS/cm, or µS/cm
- **current**: Current in A, mA, µA
- **data_rate**: Data rate in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s or GiB/s
- **data_size**: Data size in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB or YiB
- **date**: Date string (ISO 8601)
- **distance**: Generic distance in km, m, cm, mm, mi, nmi, yd, or in
- **duration**: Duration in d, h, min, s, ms, or µs
- **energy**: Energy in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal
- **energy_distance**: Energy per distance in kWh/100km, Wh/km, mi/kWh, or km/kWh.
- **energy_storage**: Stored energy in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal
- **enum**: Has a limited set of (non-numeric) states
- **frequency**: Frequency in mHz, Hz, kHz, MHz, or GHz
- **gas**: Gas volume in L, m³, ft³, CCF, or MCF
- **humidity**: Percentage of humidity in the air in %
- **illuminance**: The current light level in lx
- **irradiance**: Irradiance in W/m² or BTU/(h⋅ft²)
- **moisture**: Percentage of water in a substance in %
- **monetary**: The monetary value ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes))
- **nitrogen_dioxide**: Concentration of Nitrogen Dioxide in ppb, ppm, µg/m³
- **nitrogen_monoxide**: Concentration of Nitrogen Monoxide in ppb, µg/m³
- **nitrous_oxide**: Concentration of Nitrous Oxide in µg/m³
- **ozone**: Concentration of Ozone in ppb, ppm, or µg/m³
- **ph**: Potential hydrogen (pH) value of a water solution
- **pm1**: Concentration of particulate matter less than 1 micrometer in µg/m³
- **pm25**: Concentration of particulate matter less than 2.5 micrometers in µg/m³
- **pm4**: Concentration of particulate matter less than 4 micrometers in µg/m³
- **pm10**: Concentration of particulate matter less than 10 micrometers in µg/m³
- **power_factor**: Power factor (unitless), unit may be `None` or %
- **power**: Power in mW, W, kW, MW, GW or TW
- **precipitation**: Accumulated precipitation in cm, in or mm
- **precipitation_intensity**: Precipitation intensity in in/d, in/h, mm/d or mm/h
- **pressure**: Pressure in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O or psi
- **radon**: Concentration of radon in Bq/m³ or pCi/L
- **reactive_energy**: Reactive energy in varh or kvarh
- **reactive_power**: Reactive power in mvar, var, or kvar
- **signal_strength**: Signal strength in dB or dBm
- **sound_pressure**: Sound pressure in dB or dBA
- **speed**: Generic speed in ft/s, in/d, in/h, in/s, km/h, kn, m/s, mph, mm/d, or mm/s
- **sulphur_dioxide**: Concentration of sulphur dioxide in ppb or µg/m³
- **temperature**: Temperature in °C, °F or K
- **temperature_delta**: Temperature difference between two measurements in °C, °F, or K
- **timestamp**: Datetime object or timestamp string (ISO 8601)
- **uptime**: Last boot time as datetime object or timestamp string (ISO 8601)
- **volatile_organic_compounds**: Concentration of volatile organic compounds in µg/m³ or mg/m³
- **volatile_organic_compounds_parts**: Ratio of volatile organic compounds in ppm or ppb
- **voltage**: Voltage in V, mV, µV, kV, MV
- **volume**: Generic volume in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF
- **volume_flow_rate**: Volume flow rate in m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, or mL/s
- **volume_storage**: Generic stored volume in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF
- **water**: Water consumption in L, gal, m³, ft³, CCF, or MCF
- **weight**: Generic mass in kg, g, mg, µg, oz, lb, or st
- **wind_direction**: Wind direction in °
- **wind_speed**: Wind speed in Beaufort, ft/s, km/h, kn, m/s, or mph
