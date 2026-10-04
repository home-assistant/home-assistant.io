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
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Keeps track on `number` entities in your environment, their state, and allows you to control them. This integration allows other integrations to get a value input from user within a range.

{% include integrations/building_block_integration.md %}

If you are looking for a way to create a number entity, please take a look at the [Number helper](/integrations/input_number).

## Number states

The state of a number entity is a number, stored without its unit, for example, `21.5`. The Home Assistant interface shows the number in your local number format, with its unit if it has one, for example, **21.5 °C**.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Device class

The device class tells Home Assistant what a number stands for, such as a temperature or a duration. Home Assistant uses the device class to choose the icon, the default name, the units you can select, and how the value is shown.

The integration that provides the number sets the device class, and you can't change the device class in the entity settings. When you create a number yourself with a [template helper](/integrations/template/), you choose the device class.

### Device classes in automations and templates

- Automations: Some device classes can be the threshold in triggers and conditions, such as [Temperature crossed threshold](/triggers/temperature.crossed_threshold/). These triggers and conditions only accept a number with the matching device class as the threshold. The list below shows the triggers and conditions of each device class.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `temperature`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

A number without a device class is a generic number.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. The description lists the units the device class supports. If the device class can be the threshold in triggers and conditions, they're listed below the item.

- **Absolute humidity** (`absolute_humidity`): Amount of water vapor in the air, in g/m³ or mg/m³.
- **Apparent power** (`apparent_power`): Apparent power, in mVA, VA, or kVA.
- **Air quality index** (`aqi`): Air quality index, without a unit.
- **Area** (`area`): Area, in m², cm², km², mm², in², ft², yd², mi², ac, or ha.
- **Atmospheric pressure** (`atmospheric_pressure`): Atmospheric pressure, in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, or psi.
- **Battery** (`battery`): Battery level, in %.
  - Threshold in triggers: [Battery level changed](/triggers/battery.level_changed/), [Battery level crossed threshold](/triggers/battery.level_crossed_threshold/)
  - Threshold in condition: [Battery level](/conditions/battery.is_level/)
- **Blood glucose concentration** (`blood_glucose_concentration`): Blood glucose concentration, in mg/dL or mmol/L.
- **Carbon dioxide** (`carbon_dioxide`): Carbon dioxide (CO₂) concentration, in ppm.
  - Threshold in triggers: [Carbon dioxide level changed](/triggers/air_quality.co2_changed/), [Carbon dioxide level crossed threshold](/triggers/air_quality.co2_crossed_threshold/)
  - Threshold in condition: [Carbon dioxide value](/conditions/air_quality.is_co2_value/)
- **Carbon monoxide** (`carbon_monoxide`): Carbon monoxide (CO) concentration, in ppb, ppm, μg/m³, or mg/m³.
  - Threshold in triggers: [Carbon monoxide level changed](/triggers/air_quality.co_changed/), [Carbon monoxide level crossed threshold](/triggers/air_quality.co_crossed_threshold/)
  - Threshold in condition: [Carbon monoxide value](/conditions/air_quality.is_co_value/)
- **Conductivity** (`conductivity`): Electrical conductivity, in S/cm, mS/cm, or μS/cm.
- **Current** (`current`): Electric current, in A, mA, or μA.
- **Data rate** (`data_rate`): Data rate, in bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, or GiB/s.
- **Data size** (`data_size`): Data size, in bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, or YiB.
- **Distance** (`distance`): Distance, in km, m, cm, mm, mi, nmi, yd, ft, or in.
- **Duration** (`duration`): Duration, in d, h, min, s, ms, or μs.
- **Energy** (`energy`): Energy, in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal.
- **Energy per distance** (`energy_distance`): Energy used per distance, in kWh/100km, Wh/km, mi/kWh, or km/kWh.
- **Stored energy** (`energy_storage`): Stored energy, such as in a battery, in J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, or Gcal.
- **Frequency** (`frequency`): Frequency, in mHz, Hz, kHz, MHz, or GHz.
- **Gas** (`gas`): Gas volume, in L, m³, ft³, CCF, or MCF.
- **Humidity** (`humidity`): Relative humidity of the air, in %.
  - Threshold in triggers: [Relative humidity changed](/triggers/humidity.changed/), [Relative humidity crossed threshold](/triggers/humidity.crossed_threshold/), [Thermostat target humidity changed](/triggers/climate.target_humidity_changed/), [Thermostat target humidity crossed threshold](/triggers/climate.target_humidity_crossed_threshold/)
  - Threshold in conditions: [Humidifier target humidity](/conditions/humidifier.is_target_humidity/), [Relative humidity](/conditions/humidity.is_value/), [Thermostat target humidity](/conditions/climate.is_target_humidity/)
- **Illuminance** (`illuminance`): Light level, in lx.
  - Threshold in triggers: [Illuminance changed](/triggers/illuminance.changed/), [Illuminance crossed threshold](/triggers/illuminance.crossed_threshold/)
  - Threshold in condition: [Illuminance](/conditions/illuminance.is_value/)
- **Irradiance** (`irradiance`): Irradiance, such as the power of sunlight on a surface, in W/m² or BTU/(h⋅ft²).
- **Moisture** (`moisture`): Water content of a substance, such as soil, in %.
  - Threshold in triggers: [Moisture content changed](/triggers/moisture.changed/), [Moisture content crossed threshold](/triggers/moisture.crossed_threshold/)
  - Threshold in condition: [Moisture level](/conditions/moisture.is_value/)
- **Monetary balance** (`monetary`): An amount of money, in a currency from [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes).
- **Nitrogen dioxide** (`nitrogen_dioxide`): Nitrogen dioxide concentration, in ppb, ppm, or μg/m³.
  - Threshold in triggers: [Nitrogen dioxide level changed](/triggers/air_quality.no2_changed/), [Nitrogen dioxide level crossed threshold](/triggers/air_quality.no2_crossed_threshold/)
  - Threshold in condition: [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/)
- **Nitrogen monoxide** (`nitrogen_monoxide`): Nitrogen monoxide concentration, in ppb or μg/m³.
  - Threshold in triggers: [Nitrogen monoxide level changed](/triggers/air_quality.no_changed/), [Nitrogen monoxide level crossed threshold](/triggers/air_quality.no_crossed_threshold/)
  - Threshold in condition: [Nitrogen monoxide value](/conditions/air_quality.is_no_value/)
- **Nitrous oxide** (`nitrous_oxide`): Nitrous oxide concentration, in μg/m³.
  - Threshold in triggers: [Nitrous oxide level changed](/triggers/air_quality.n2o_changed/), [Nitrous oxide level crossed threshold](/triggers/air_quality.n2o_crossed_threshold/)
  - Threshold in condition: [Nitrous oxide value](/conditions/air_quality.is_n2o_value/)
- **Ozone** (`ozone`): Ozone concentration, in ppb, ppm, or μg/m³.
  - Threshold in triggers: [Ozone level changed](/triggers/air_quality.ozone_changed/), [Ozone level crossed threshold](/triggers/air_quality.ozone_crossed_threshold/)
  - Threshold in condition: [Ozone value](/conditions/air_quality.is_ozone_value/)
- **pH** (`ph`): pH value of a water solution, without a unit.
- **PM1** (`pm1`): Concentration of particulate matter smaller than 1 micrometer, in μg/m³.
  - Threshold in triggers: [PM1 level changed](/triggers/air_quality.pm1_changed/), [PM1 level crossed threshold](/triggers/air_quality.pm1_crossed_threshold/)
  - Threshold in condition: [PM1 value](/conditions/air_quality.is_pm1_value/)
- **PM2.5** (`pm25`): Concentration of particulate matter smaller than 2.5 micrometers, in μg/m³.
  - Threshold in triggers: [PM2.5 level changed](/triggers/air_quality.pm25_changed/), [PM2.5 level crossed threshold](/triggers/air_quality.pm25_crossed_threshold/)
  - Threshold in condition: [PM2.5 value](/conditions/air_quality.is_pm25_value/)
- **PM4** (`pm4`): Concentration of particulate matter smaller than 4 micrometers, in μg/m³.
  - Threshold in triggers: [PM4 level changed](/triggers/air_quality.pm4_changed/), [PM4 level crossed threshold](/triggers/air_quality.pm4_crossed_threshold/)
  - Threshold in condition: [PM4 value](/conditions/air_quality.is_pm4_value/)
- **PM10** (`pm10`): Concentration of particulate matter smaller than 10 micrometers, in μg/m³.
  - Threshold in triggers: [PM10 level changed](/triggers/air_quality.pm10_changed/), [PM10 level crossed threshold](/triggers/air_quality.pm10_crossed_threshold/)
  - Threshold in condition: [PM10 value](/conditions/air_quality.is_pm10_value/)
- **Power factor** (`power_factor`): Power factor, without a unit or in %.
- **Power** (`power`): Power, in mW, W, kW, MW, GW, or TW.
  - Threshold in triggers: [Power changed](/triggers/power.changed/), [Power crossed threshold](/triggers/power.crossed_threshold/)
  - Threshold in condition: [Power value](/conditions/power.is_value/)
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
  - Threshold in triggers: [Sulphur dioxide level changed](/triggers/air_quality.so2_changed/), [Sulphur dioxide level crossed threshold](/triggers/air_quality.so2_crossed_threshold/)
  - Threshold in condition: [Sulphur dioxide value](/conditions/air_quality.is_so2_value/)
- **Temperature** (`temperature`): Temperature, in °C, °F, or K.
  - Threshold in triggers: [Temperature changed](/triggers/temperature.changed/), [Temperature crossed threshold](/triggers/temperature.crossed_threshold/), [Thermostat target temperature changed](/triggers/climate.target_temperature_changed/), [Thermostat target temperature crossed threshold](/triggers/climate.target_temperature_crossed_threshold/), [Water heater target temperature changed](/triggers/water_heater.target_temperature_changed/), [Water heater target temperature crossed threshold](/triggers/water_heater.target_temperature_crossed_threshold/)
  - Threshold in conditions: [Temperature value](/conditions/temperature.is_value/), [Thermostat target temperature](/conditions/climate.is_target_temperature/), [Water heater target temperature](/conditions/water_heater.is_target_temperature/)
- **Temperature delta** (`temperature_delta`): Difference between two temperatures, in °C, °F, or K.
- **Volatile organic compounds** (`volatile_organic_compounds`): Concentration of volatile organic compounds, in μg/m³ or mg/m³.
  - Threshold in triggers: [Volatile organic compounds level changed](/triggers/air_quality.voc_changed/), [Volatile organic compounds level crossed threshold](/triggers/air_quality.voc_crossed_threshold/)
  - Threshold in condition: [Volatile organic compounds value](/conditions/air_quality.is_voc_value/)
- **Volatile organic compounds parts** (`volatile_organic_compounds_parts`): Ratio of volatile organic compounds, in ppm or ppb.
  - Threshold in triggers: [Volatile organic compounds ratio changed](/triggers/air_quality.voc_ratio_changed/), [Volatile organic compounds ratio crossed threshold](/triggers/air_quality.voc_ratio_crossed_threshold/)
  - Threshold in condition: [Volatile organic compounds ratio value](/conditions/air_quality.is_voc_ratio_value/)
- **Voltage** (`voltage`): Voltage, in V, mV, μV, kV, or MV.
- **Volume** (`volume`): Volume, in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF.
- **Volume flow rate** (`volume_flow_rate`): Volume flow rate, in m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, or mL/s.
- **Stored volume** (`volume_storage`): Stored volume, such as in a tank, in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF.
- **Water** (`water`): Water consumption, in L, gal, m³, ft³, CCF, or MCF.
- **Weight** (`weight`): Weight, in kg, g, mg, μg, oz, lb, or st.
- **Wind direction** (`wind_direction`): Wind direction, in °.
- **Wind speed** (`wind_speed`): Wind speed, in Beaufort, ft/s, in/s, km/h, kn, m/min, m/s, mm/s, or mph.

{% include integrations/actions.md %}
