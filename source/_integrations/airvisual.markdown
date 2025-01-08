---
title: AirVisual Cloud
description: Instructions on how to use AirVisual data within Home Assistant
ha_category:
  - Health
ha_release: 0.53
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
ha_domain: airvisual
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The `airvisual` sensor platform queries the [AirVisual](https://www.iqair.com) cloud API for air quality data. Data can be collected via latitude/longitude or city/state/country.

## Using the AirVisual Cloud API

AirVisual API keys can be obtained [here](https://www.iqair.com/dashboard/api). Note that the platform was designed using the "Community" package; the "Startup" and "Enterprise" package keys should continue to function, but actual results may vary (or not work at all).

The Community API key is valid for 12 months after which it will expire. You must then go back to the AirVisual website, delete your old key, create a new one following the same steps and update your configuration with the new key.

{% note %}

The "Community" API key is limited to 10,000 calls per month. In order to accommodate using the same API key for multiple geographies, the `airvisual` integration will automatically "re-level" the time between API calls so as to not overrun the call limit.

For example:

- One instance of the integration: API calls every 5 minutes
- Two instances of the integration: API calls every 10 minutes
- etc.

{% endnote %}

{% include integrations/config_flow.md %}

## Determining the City/State/Country

In addition to using latitude and longitude, the AirVisual integration may be configured to use a city/state/country combination. To easily determine the proper values for a particular location, use the [AirVisual region directory](https://www.iqair.com/world-air-quality). Once you browse to the particular city you want, take note of the breadcrumb title, which is of the form `country > state/region > city`.

For example, Sao Paulo, Brazil shows a breadcrumb title of `Brazil > Sao Paulo > Sao Paulo`. Thus, the values to use in the UI would be:

- City: `Sao Paulo`
- State: `Sao Paulo`
- Country: `Brazil`

## Sensor types

When configured, the platform will create three sensors for each air quality standard:

### Air quality index

- **Description:** This sensor displays a numeric air quality index (AQI), a metric for the overall "health" of the air.
- **Example Sensor Name:** `sensor.chinese_air_quality_index`
- **Example Sensor Value:** `32`
- **Explanation:**

AQI | Status | Description
------- | :----------------: | ----------
0 - 50  | **Good** | Air quality is considered satisfactory, and air pollution poses little or no risk
51 - 100  | **Moderate** | Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution
101 - 150 | **Unhealthy for Sensitive Groups** | Members of sensitive groups may experience health effects. The general public is not likely to be affected
151 - 200 | **Unhealthy** | Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects
201 - 300 | **Very unhealthy** | Health warnings of emergency conditions. The entire population is more likely to be affected
301+ | **Hazardous** | Health alert: everyone may experience more serious health effects

### Air pollution level

- **Description:** This sensor displays the associated `Status` (from the above table) for the current AQI.
- **Sample Sensor Name:** `sensor.us_air_pollution_level`
- **Example Sensor Value:** `Moderate`

### Main pollutant

- **Description:** This sensor displays the pollutant whose value is currently highest.
- **Sample Sensor Name:** `sensor.us_main_pollutant`
- **Example Sensor Value:** `PM2.5`
- **Explanation:**

Pollutant | Symbol | More Info
------- | :----------------: | ----------
Particulate (<= 2.5 μm) | PM2.5 | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)
Particulate (<= 10 μm) | PM10 | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)
Ozone | O | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)
Sulpher Dioxide | SO2 | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)
Carbon Monoxide | CO | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution)
