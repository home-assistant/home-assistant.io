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

The device class tells Home Assistant what a number stands for, such as a temperature or a duration.

The device class makes a difference in the following places:

- Automations: In triggers and conditions with a threshold, such as [Temperature crossed threshold](/triggers/temperature.crossed_threshold/) or [Power crossed threshold](/triggers/power.crossed_threshold/), you can use a number as the threshold instead of a fixed value. The number needs the matching device class. This works for temperature, power, battery, humidity, illuminance, moisture, and air quality. The [Numeric state crossed threshold](/triggers/numeric_state/) trigger works with any number.
- Units: For many device classes, you can select another unit in the entity settings, and Home Assistant converts the value. Temperatures use the temperature unit of your unit system, unless you select another unit.
- Display: Durations in days, hours, or minutes are shown in two units, such as **2h 30m** instead of **2.5 h**. Monetary values are shown as an amount of money.
- Icon and name: The icon matches what the number stands for. If the integration doesn't give the entity its own name, Home Assistant names it after the device class, such as **Temperature**.
- History and Activity: If you have numbers with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the number sets the device class, and you can't change it in the entity settings. When you create a number yourself with a [template helper](/integrations/template/), you choose it.

### List of available device classes

A number without a device class is a generic number.

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it. The description lists the units the device class supports.

- **Absolute humidity** (`absolute_humidity`): Amount of water vapor in the air, in g/m³ or mg/m³.
- **Apparent power** (`apparent_power`): Apparent power, in mVA, VA, or kVA.
- **Air quality index** (`aqi`): Air quality index, without a unit.
- **Area** (`area`): Area, in m², cm², km², mm², in², ft², yd², mi², ac, or ha.
- **Atmospheric pressure** (`atmospheric_pressure`): Atmospheric pressure, in mPa, Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, inH₂O, or psi.
- **Battery** (`battery`): Battery level, in %.
- **Blood glucose concentration** (`blood_glucose_concentration`): Blood glucose concentration, in mg/dL or mmol/L.
- **Carbon dioxide** (`carbon_dioxide`): Carbon dioxide (CO₂) concentration, in ppm.
- **Carbon monoxide** (`carbon_monoxide`): Carbon monoxide (CO) concentration, in ppb, ppm, μg/m³, or mg/m³.
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
- **Illuminance** (`illuminance`): Light level, in lx.
- **Irradiance** (`irradiance`): Irradiance, such as the power of sunlight on a surface, in W/m² or BTU/(h⋅ft²).
- **Moisture** (`moisture`): Water content of a substance, such as soil, in %.
- **Monetary balance** (`monetary`): An amount of money, in a currency from [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes).
- **Nitrogen dioxide** (`nitrogen_dioxide`): Nitrogen dioxide concentration, in ppb, ppm, or μg/m³.
- **Nitrogen monoxide** (`nitrogen_monoxide`): Nitrogen monoxide concentration, in ppb or μg/m³.
- **Nitrous oxide** (`nitrous_oxide`): Nitrous oxide concentration, in μg/m³.
- **Ozone** (`ozone`): Ozone concentration, in ppb, ppm, or μg/m³.
- **pH** (`ph`): pH value of a water solution, without a unit.
- **PM1** (`pm1`): Concentration of particulate matter smaller than 1 micrometer, in μg/m³.
- **PM2.5** (`pm25`): Concentration of particulate matter smaller than 2.5 micrometers, in μg/m³.
- **PM4** (`pm4`): Concentration of particulate matter smaller than 4 micrometers, in μg/m³.
- **PM10** (`pm10`): Concentration of particulate matter smaller than 10 micrometers, in μg/m³.
- **Power factor** (`power_factor`): Power factor, without a unit or in %.
- **Power** (`power`): Power, in mW, W, kW, MW, GW, or TW.
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
- **Temperature** (`temperature`): Temperature, in °C, °F, or K.
- **Temperature delta** (`temperature_delta`): Difference between two temperatures, in °C, °F, or K.
- **Volatile organic compounds** (`volatile_organic_compounds`): Concentration of volatile organic compounds, in μg/m³ or mg/m³.
- **Volatile organic compounds parts** (`volatile_organic_compounds_parts`): Ratio of volatile organic compounds, in ppm or ppb.
- **Voltage** (`voltage`): Voltage, in V, mV, μV, kV, or MV.
- **Volume** (`volume`): Volume, in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF.
- **Volume flow rate** (`volume_flow_rate`): Volume flow rate, in m³/h, m³/min, m³/s, ft³/min, L/h, L/min, L/s, gal/d, gal/h, gal/min, or mL/s.
- **Stored volume** (`volume_storage`): Stored volume, such as in a tank, in L, mL, gal, fl. oz., m³, ft³, CCF, or MCF.
- **Water** (`water`): Water consumption, in L, gal, m³, ft³, CCF, or MCF.
- **Weight** (`weight`): Weight, in kg, g, mg, μg, oz, lb, or st.
- **Wind direction** (`wind_direction`): Wind direction, in °.
- **Wind speed** (`wind_speed`): Wind speed, in Beaufort, ft/s, in/s, km/h, kn, m/min, m/s, mm/s, or mph.

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `temperature`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

{% include integrations/actions.md %}
