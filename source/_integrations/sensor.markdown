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

The {% term state %} of a sensor entity is its current value. The type of sensor determines how Home Assistant stores the value and how the interface shows it:

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

The device class tells Home Assistant what a sensor measures, such as temperature or energy.

The device class makes a difference in the following places:

- Automations: Several types of sensors have their own triggers and conditions, such as [Temperature changed](/triggers/temperature.changed/), [Power changed](/triggers/power.changed/), or [Battery level changed](/triggers/battery.level_changed/). There are also triggers and conditions for humidity, illuminance, moisture, and air quality, such as carbon dioxide or PM2.5. They only list sensors with the matching device class. The [Numeric state crossed threshold](/triggers/numeric_state/) trigger works with any sensor.
- Assist: When you ask [Assist](/voice_control/) for the temperature in an area, it uses the temperature sensor of that area.
- Voice assistants and Apple Home: [Google Assistant](/integrations/google_assistant/) and Apple Home, through the [HomeKit Bridge](/integrations/homekit/) integration, show temperature, humidity, and air quality sensors as matching sensors.
- Dashboards: The [energy dashboard](/docs/energy/) only lists sensors with a matching device class, such as energy, power, gas, or water. The [Climate dashboard](/dashboards/dashboards/#home-assistant-built-in-dashboards) shows temperature and humidity sensors, and the [Maintenance dashboard](/dashboards/dashboards/#home-assistant-built-in-dashboards) shows battery sensors. The [area card](/dashboards/area/) shows the temperature and humidity of an area.
- Areas: An [area](/docs/organizing/areas/) only accepts sensors with the temperature and humidity device classes as its temperature and humidity sensors.
- Units: For many device classes, you can select another unit in the entity settings, and Home Assistant converts the value. For example, you can show a distance in miles instead of kilometers. Temperatures use the temperature unit of your unit system, unless you select another unit.
- Display: Durations are shown in days, hours, and minutes, monetary values as an amount of money, and timestamps as a date and time or as relative time, such as **3 minutes ago**.
- Icon and name: The icon matches what the sensor measures. Some icons also show the value, such as the battery level. A sensor without a name of its own is named after its device class, such as **Temperature**.
- History and Activity: If you have sensors with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the sensor sets the device class, and you can't change it in the entity settings. When you create a sensor yourself, for example with a [template helper](/integrations/template/), you choose it. Most device classes then need a number as the state. The date, timestamp, and uptime device classes need a date or time, and the `enum` device class needs a list of possible states.

### List of available device classes

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it, and the units it supports. The units matter mostly when you create a sensor yourself.

- No device class: A generic sensor.
- **Absolute humidity** (`absolute_humidity`): Absolute humidity in g/m³, mg/m³.
- **Apparent power** (`apparent_power`): Apparent power in mVA, VA or kVA.
- **Air quality index** (`aqi`): Air Quality Index (unitless).
- **Area** (`area`): Area in m², cm², km², mm², in², ft², yd², mi², ac, ha
- **Atmospheric pressure** (`atmospheric_pressure`): Atmospheric pressure in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, psi, or atm
- **Battery** (`battery`): Percentage of battery that is left in %
- **Blood glucose concentration** (`blood_glucose_concentration`): Blood glucose concentration in mg/dL, mmol/L
- **Carbon dioxide** (`carbon_dioxide`): Carbon Dioxide (CO₂) concentration in ppm
- **Carbon monoxide** (`carbon_monoxide`): Carbon Monoxide (CO) concentration in ppb, ppm, μg/m³, mg/m³
- **Conductivity** (`conductivity`): Conductivity in S/cm, mS/cm, or μS/cm
- **Current** (`current`): Current in A, mA, μA
- **Data rate** (`data_rate`): Data rate in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s or GiB/s
- **Data size** (`data_size`): Data size in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB or YiB
- **Date** (`date`): Date string (ISO 8601)
- **Distance** (`distance`): Generic distance in km, m, cm, mm, mi, nmi, yd, ft, or in
- **Duration** (`duration`): Duration in d, h, min, s, ms, or μs
- **Energy** (`energy`): Energy in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal, or thm
- **Energy per distance** (`energy_distance`): Energy per distance in kWh/100km, Wh/km, mi/kWh, or km/kWh.
- **Stored energy** (`energy_storage`): Stored energy in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal, or thm
- `enum`: Has a limited set of (non-numeric) states
- **Frequency** (`frequency`): Frequency in mHz, Hz, kHz, MHz, or GHz
- **Gas** (`gas`): Gas volume in L, m³, ft³, CCF, or MCF
- **Humidity** (`humidity`): Percentage of humidity in the air in %
- **Illuminance** (`illuminance`): The current light level in lx
- **Irradiance** (`irradiance`): Irradiance in W/m² or BTU/(h⋅ft²)
- **Moisture** (`moisture`): Percentage of water in a substance in %
- **Monetary balance** (`monetary`): The monetary value ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes))
- **Nitrogen dioxide** (`nitrogen_dioxide`): Concentration of Nitrogen Dioxide in ppb, ppm, μg/m³
- **Nitrogen monoxide** (`nitrogen_monoxide`): Concentration of Nitrogen Monoxide in ppb, μg/m³
- **Nitrous oxide** (`nitrous_oxide`): Concentration of Nitrous Oxide in μg/m³
- **Ozone** (`ozone`): Concentration of Ozone in ppb, ppm, or μg/m³
- **pH** (`ph`): Potential hydrogen (pH) value of a water solution
- **PM1** (`pm1`): Concentration of particulate matter less than 1 micrometer in μg/m³
- **PM2.5** (`pm25`): Concentration of particulate matter less than 2.5 micrometers in μg/m³
- **PM4** (`pm4`): Concentration of particulate matter less than 4 micrometers in μg/m³
- **PM10** (`pm10`): Concentration of particulate matter less than 10 micrometers in μg/m³
- **Power factor** (`power_factor`): Power factor (unitless), unit may be `None` or %
- **Power** (`power`): Power in mW, W, kW, MW, GW or TW
- **Precipitation** (`precipitation`): Accumulated precipitation in cm, in or mm
- **Precipitation intensity** (`precipitation_intensity`): Precipitation intensity in in/d, in/h, mm/d or mm/h
- **Pressure** (`pressure`): Pressure in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, psi, or atm
- **Radon** (`radon`): Concentration of radon in Bq/m³ or pCi/L
- **Reactive energy** (`reactive_energy`): Reactive energy in varh or kvarh
- **Reactive power** (`reactive_power`): Reactive power in mvar, var, or kvar
- **Signal strength** (`signal_strength`): Signal strength in dB or dBm
- **Sound pressure** (`sound_pressure`): Sound pressure in dB or dBA
- **Speed** (`speed`): Generic speed in Beaufort, ft/s, in/d, in/h, in/s, km/h, kn, m/min, m/s, mph, mm/d, mm/h, or mm/s
- **Sulphur dioxide** (`sulphur_dioxide`): Concentration of sulphur dioxide in ppb or μg/m³
- **Temperature** (`temperature`): Temperature in °C, °F or K
- **Temperature delta** (`temperature_delta`): Temperature difference between two measurements in °C, °F, or K
- **Timestamp** (`timestamp`): Datetime object or timestamp string (ISO 8601)
- **Uptime** (`uptime`): Last boot time as datetime object or timestamp string (ISO 8601)
- **Volatile organic compounds** (`volatile_organic_compounds`): Concentration of volatile organic compounds in μg/m³ or mg/m³
- **Volatile organic compounds parts** (`volatile_organic_compounds_parts`): Ratio of volatile organic compounds in ppm or ppb
- **Voltage** (`voltage`): Voltage in V, mV, μV, kV, MV
- **Volume** (`volume`): Generic volume in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF
- **Volume flow rate** (`volume_flow_rate`): Volume flow rate in m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, or mL/s
- **Stored volume** (`volume_storage`): Generic stored volume in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF
- **Water** (`water`): Water consumption in L, gal, m³, ft³, CCF, or MCF
- **Weight** (`weight`): Generic mass in kg, g, mg, μg, oz, lb, or st
- **Wind direction** (`wind_direction`): Wind direction in °
- **Wind speed** (`wind_speed`): Wind speed in Beaufort, ft/s, in/s, km/h, kn, m/min, m/s, mm/s, or mph

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `temperature`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).
