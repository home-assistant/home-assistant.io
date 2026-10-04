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

The device class tells Home Assistant what a sensor measures, such as temperature or energy. Home Assistant uses it to choose the icon, the unit, and how the value is shown. It also decides where you can use the sensor, such as in triggers and conditions, on the [energy dashboard](/docs/energy/), or as the temperature sensor of an [area](/docs/organizing/areas/). If a sensor doesn't show up where you expect it, check its device class.

The integration that provides the sensor sets the device class, and you can't change it in the entity settings. When you create a sensor yourself, for example with a [template helper](/integrations/template/), you choose it. Most device classes then need a number as the state. The date, timestamp, and uptime device classes need a date or time. The `enum` device class needs a list of possible states and isn't available in the template helper.

### Device classes in automations and templates

- Automations: Several device classes have their own triggers and conditions, such as [Temperature changed](/triggers/temperature.changed/). They only list sensors with that device class. The list below shows the triggers and conditions of each device class.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `temperature`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

A sensor without a device class is a generic sensor.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. The description lists the units the device class supports. If the device class has its own triggers and conditions, they're listed below the item.

- **Absolute humidity** (`absolute_humidity`): Amount of water vapor in the air, in g/m³ or mg/m³.
- **Apparent power** (`apparent_power`): Apparent power, in mVA, VA, or kVA.
- **Air quality index** (`aqi`): Air quality index, without a unit.
- **Area** (`area`): Area, in m², cm², km², mm², in², ft², yd², mi², ac, or ha.
- **Atmospheric pressure** (`atmospheric_pressure`): Atmospheric pressure, in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, or psi.
- **Battery** (`battery`): Battery level, in %.
  - Triggers: [Battery level changed](/triggers/battery.level_changed/), [Battery level crossed threshold](/triggers/battery.level_crossed_threshold/)
  - Condition: [Battery level](/conditions/battery.is_level/)
- **Blood glucose concentration** (`blood_glucose_concentration`): Blood glucose concentration, in mg/dL or mmol/L.
- **Carbon dioxide** (`carbon_dioxide`): Carbon dioxide (CO₂) concentration, in ppm.
  - Triggers: [Carbon dioxide level changed](/triggers/air_quality.co2_changed/), [Carbon dioxide level crossed threshold](/triggers/air_quality.co2_crossed_threshold/)
  - Condition: [Carbon dioxide value](/conditions/air_quality.is_co2_value/)
- **Carbon monoxide** (`carbon_monoxide`): Carbon monoxide (CO) concentration, in ppb, ppm, μg/m³, or mg/m³.
  - Triggers: [Carbon monoxide level changed](/triggers/air_quality.co_changed/), [Carbon monoxide level crossed threshold](/triggers/air_quality.co_crossed_threshold/)
  - Condition: [Carbon monoxide value](/conditions/air_quality.is_co_value/)
- **Conductivity** (`conductivity`): Electrical conductivity, in S/cm, mS/cm, or μS/cm.
- **Current** (`current`): Electric current, in A, mA, or μA.
- **Data rate** (`data_rate`): Data rate, in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, or GiB/s.
- **Data size** (`data_size`): Data size, in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, or YiB.
- **Date** (`date`): A date.
- **Distance** (`distance`): Distance, in km, m, cm, mm, mi, nmi, yd, ft, or in.
- **Duration** (`duration`): Duration, in d, h, min, s, ms, or μs.
- **Energy** (`energy`): Energy, in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal.
- **Energy per distance** (`energy_distance`): Energy used per distance, in kWh/100km, Wh/km, mi/kWh, or km/kWh.
- **Stored energy** (`energy_storage`): Stored energy, such as in a battery, in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal.
- **Sensor** (`enum`): A sensor with a fixed list of possible text states.
- **Frequency** (`frequency`): Frequency, in mHz, Hz, kHz, MHz, or GHz.
- **Gas** (`gas`): Gas volume, in L, m³, ft³, CCF, or MCF.
- **Humidity** (`humidity`): Relative humidity of the air, in %.
  - Triggers: [Relative humidity changed](/triggers/humidity.changed/), [Relative humidity crossed threshold](/triggers/humidity.crossed_threshold/)
  - Condition: [Relative humidity](/conditions/humidity.is_value/)
- **Illuminance** (`illuminance`): Light level, in lx.
  - Triggers: [Illuminance changed](/triggers/illuminance.changed/), [Illuminance crossed threshold](/triggers/illuminance.crossed_threshold/)
  - Condition: [Illuminance](/conditions/illuminance.is_value/)
- **Irradiance** (`irradiance`): Irradiance, such as the power of sunlight on a surface, in W/m² or BTU/(h⋅ft²).
- **Moisture** (`moisture`): Water content of a substance, such as soil, in %.
  - Triggers: [Moisture content changed](/triggers/moisture.changed/), [Moisture content crossed threshold](/triggers/moisture.crossed_threshold/)
  - Condition: [Moisture level](/conditions/moisture.is_value/)
- **Monetary balance** (`monetary`): An amount of money, in a currency from [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes).
- **Nitrogen dioxide** (`nitrogen_dioxide`): Nitrogen dioxide concentration, in ppb, ppm, or μg/m³.
  - Triggers: [Nitrogen dioxide level changed](/triggers/air_quality.no2_changed/), [Nitrogen dioxide level crossed threshold](/triggers/air_quality.no2_crossed_threshold/)
  - Condition: [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/)
- **Nitrogen monoxide** (`nitrogen_monoxide`): Nitrogen monoxide concentration, in ppb or μg/m³.
  - Triggers: [Nitrogen monoxide level changed](/triggers/air_quality.no_changed/), [Nitrogen monoxide level crossed threshold](/triggers/air_quality.no_crossed_threshold/)
  - Condition: [Nitrogen monoxide value](/conditions/air_quality.is_no_value/)
- **Nitrous oxide** (`nitrous_oxide`): Nitrous oxide concentration, in μg/m³.
  - Triggers: [Nitrous oxide level changed](/triggers/air_quality.n2o_changed/), [Nitrous oxide level crossed threshold](/triggers/air_quality.n2o_crossed_threshold/)
  - Condition: [Nitrous oxide value](/conditions/air_quality.is_n2o_value/)
- **Ozone** (`ozone`): Ozone concentration, in ppb, ppm, or μg/m³.
  - Triggers: [Ozone level changed](/triggers/air_quality.ozone_changed/), [Ozone level crossed threshold](/triggers/air_quality.ozone_crossed_threshold/)
  - Condition: [Ozone value](/conditions/air_quality.is_ozone_value/)
- **pH** (`ph`): pH value of a water solution, without a unit.
- **PM1** (`pm1`): Concentration of particulate matter smaller than 1 micrometer, in μg/m³.
  - Triggers: [PM1 level changed](/triggers/air_quality.pm1_changed/), [PM1 level crossed threshold](/triggers/air_quality.pm1_crossed_threshold/)
  - Condition: [PM1 value](/conditions/air_quality.is_pm1_value/)
- **PM2.5** (`pm25`): Concentration of particulate matter smaller than 2.5 micrometers, in μg/m³.
  - Triggers: [PM2.5 level changed](/triggers/air_quality.pm25_changed/), [PM2.5 level crossed threshold](/triggers/air_quality.pm25_crossed_threshold/)
  - Condition: [PM2.5 value](/conditions/air_quality.is_pm25_value/)
- **PM4** (`pm4`): Concentration of particulate matter smaller than 4 micrometers, in μg/m³.
  - Triggers: [PM4 level changed](/triggers/air_quality.pm4_changed/), [PM4 level crossed threshold](/triggers/air_quality.pm4_crossed_threshold/)
  - Condition: [PM4 value](/conditions/air_quality.is_pm4_value/)
- **PM10** (`pm10`): Concentration of particulate matter smaller than 10 micrometers, in μg/m³.
  - Triggers: [PM10 level changed](/triggers/air_quality.pm10_changed/), [PM10 level crossed threshold](/triggers/air_quality.pm10_crossed_threshold/)
  - Condition: [PM10 value](/conditions/air_quality.is_pm10_value/)
- **Power factor** (`power_factor`): Power factor, without a unit or in %.
- **Power** (`power`): Power, in mW, W, kW, MW, GW, or TW.
  - Triggers: [Power changed](/triggers/power.changed/), [Power crossed threshold](/triggers/power.crossed_threshold/)
  - Condition: [Power value](/conditions/power.is_value/)
- **Precipitation** (`precipitation`): Accumulated precipitation, in cm, in, or mm.
- **Precipitation intensity** (`precipitation_intensity`): Precipitation intensity, in in/d, in/h, mm/d, or mm/h.
- **Pressure** (`pressure`): Pressure, in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, or psi.
- **Radon** (`radon`): Radon concentration, in Bq/m³ or pCi/L.
- **Reactive energy** (`reactive_energy`): Reactive energy, in varh or kvarh.
- **Reactive power** (`reactive_power`): Reactive power, in mvar, var, or kvar.
- **Signal strength** (`signal_strength`): Signal strength, in dB or dBm.
- **Sound pressure** (`sound_pressure`): Sound pressure, in dB or dBA.
- **Speed** (`speed`): Speed, in Beaufort, ft/s, in/d, in/h, in/s, km/h, kn, m/min, m/s, mph, mm/d, mm/h, or mm/s.
- **Sulphur dioxide** (`sulphur_dioxide`): Sulfur dioxide concentration, in ppb or μg/m³.
  - Triggers: [Sulphur dioxide level changed](/triggers/air_quality.so2_changed/), [Sulphur dioxide level crossed threshold](/triggers/air_quality.so2_crossed_threshold/)
  - Condition: [Sulphur dioxide value](/conditions/air_quality.is_so2_value/)
- **Temperature** (`temperature`): Temperature, in °C, °F, or K.
  - Triggers: [Temperature changed](/triggers/temperature.changed/), [Temperature crossed threshold](/triggers/temperature.crossed_threshold/)
  - Condition: [Temperature value](/conditions/temperature.is_value/)
- **Temperature delta** (`temperature_delta`): Difference between two temperatures, in °C, °F, or K.
- **Timestamp** (`timestamp`): A date and time, such as when something happened.
  - Trigger: [Time](/triggers/time/)
- **Uptime** (`uptime`): The date and time a device last started.
- **Volatile organic compounds** (`volatile_organic_compounds`): Concentration of volatile organic compounds, in μg/m³ or mg/m³.
  - Triggers: [Volatile organic compounds level changed](/triggers/air_quality.voc_changed/), [Volatile organic compounds level crossed threshold](/triggers/air_quality.voc_crossed_threshold/)
  - Condition: [Volatile organic compounds value](/conditions/air_quality.is_voc_value/)
- **Volatile organic compounds parts** (`volatile_organic_compounds_parts`): Ratio of volatile organic compounds, in ppm or ppb.
  - Triggers: [Volatile organic compounds ratio changed](/triggers/air_quality.voc_ratio_changed/), [Volatile organic compounds ratio crossed threshold](/triggers/air_quality.voc_ratio_crossed_threshold/)
  - Condition: [Volatile organic compounds ratio value](/conditions/air_quality.is_voc_ratio_value/)
- **Voltage** (`voltage`): Voltage, in V, mV, μV, kV, or MV.
- **Volume** (`volume`): Volume, in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF.
- **Volume flow rate** (`volume_flow_rate`): Volume flow rate, in m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, or mL/s.
- **Stored volume** (`volume_storage`): Stored volume, such as in a tank, in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF.
- **Water** (`water`): Water consumption, in L, gal, m³, ft³, CCF, or MCF.
- **Weight** (`weight`): Weight, in kg, g, mg, μg, oz, lb, or st.
- **Wind direction** (`wind_direction`): Wind direction, in °.
- **Wind speed** (`wind_speed`): Wind speed, in Beaufort, ft/s, in/s, km/h, kn, m/min, m/s, mm/s, or mph.

