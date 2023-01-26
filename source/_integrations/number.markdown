---
title: Number
description: Instructions on how to manage your Number entities with Home Assistant.
ha_category:
  - Number
ha_release: 2020.12
ha_quality_scale: internal
ha_domain: number
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
ha_integration_type: entity
---

Keeps track on `number` entities in your environment, their state, and allows you to control them. This integration allows other integrations to get a value input from user within a range.

Number entities cannot be implemented manually, but can be provided by other
integrations. If you are looking for a way to create a number entity,
please take a look at the [Number helper](/integrations/input_number).

## Device Class

The type of data a number represents impacts how it is displayed in the frontend. This is controlled by the number's device class designation. Built-in numbers and many created from an integration will have this designation predefined. Those can be modified in the [customize section](/docs/configuration/customizing-devices/). When manually creating a new number the device class may be optionally assigned. A full list of available number device classes is below:

- **None**: Generic number. This is the default and doesn't need to be set.
- **apparent_power**: Apparent power in VA.
- **aqi**: Air Quality Index (unitless).
- **atmospheric_pressure**: Atmospheric pressure in cbar, bar, hPa, inHg, kPa, mbar, Pa, psi
- **battery**: Percentage of battery that is left
- **carbon_dioxide**: Carbon Dioxide in CO2 (Smoke)
- **carbon_monoxide**: Carbon Monoxide in CO (Gas CNG/LPG)
- **current**: Current in A, mA
- **data_rate**: Data rate in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, or GiB/s
- **data_size**: Data size in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, or YiB
- **distance**: Generic distance in km, m, cm, mm, mi, yd, or in
- **energy**: Energy in Wh, kWh, MWh, MJ, or GJ
- **frequency**: Frequency in Hz, kHz, MHz, or GHz
- **gas**: Gasvolume in m³, ft³, or CCF
- **humidity**: Percentage of humidity in the air
- **illuminance**: The current light level in lx
- **irradiance**: Irradiance in W/m² or BTU/(h⋅ft²)
- **moisture**: Percentage of water in a substance
- **monetary**: The monetary value
- **nitrogen_dioxide**: Concentration of Nitrogen Dioxide in µg/m³
- **nitrogen_monoxide**: Concentration of Nitrogen Monoxide in µg/m³
- **nitrous_oxide**: Concentration of Nitrous Oxide in µg/m³
- **ozone**: Concentration of Ozone in µg/m³
- **pm1**: Concentration of particulate matter less than 1 micrometer in µg/m³
- **pm10**: Concentration of particulate matter less than 10 micrometers in µg/m³
- **pm25**: Concentration of particulate matter less than 2.5 micrometers in µg/m³
- **power_factor**: Power factor(unitless), unit may be `None` or %
- **power**: Power in W or kW
- **precipitation**: Accumulated precipitation in cm, in or mm
- **precipitation_intensity**: Precipitation intensity in in/d, in/h, mm/d, or mm/h
- **pressure**: Pressure in Pa, kPa, hPa, bar, cbar, mbar, mmHg, inHg, or psi
- **reactive_power**: Reactive power in var
- **signal_strength**: Signal strength in dB or dBm
- **sound_pressure**: Sound pressure in dB or dBA
- **speed**: Generic speed in ft/s, in/d, in/h, km/h, kn, m/s, mph, or mm/d
- **sulphur_dioxide**: Concentration of sulphur dioxide in µg/m³
- **temperature**: Temperature in °C, °F or K
- **volatile_organic_compounds**: Concentration of volatile organic compounds in µg/m³
- **voltage**: Voltage in V, mV
- **volume**: Generic volume in L, mL, gal, fl. oz., m³, ft³, or CCF
- **water**: Water consumption in L, gal, m³, ft³, or CCF
- **weight**: Generic mass in kg, g, mg, µg, oz, lb, or st
- **wind_speed**: Wind speed in ft/s, km/h, kn, m/s, or mph
 
## Services

The Number entities registers the following services:

| Service | Data | Description |
| ------- | ---- | ----------- |
| `set_value` | `value`<br>`entity_id(s)`<br>`area_id(s)` | Set the value of specific `number` entities
