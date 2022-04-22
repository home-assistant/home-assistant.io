---
title: RainMachine
description: Instructions on how to integrate RainMachine units within Home Assistant.
ha_category:
  - Binary Sensor
  - Irrigation
  - Sensor
  - Switch
ha_release: 0.69
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: rainmachine
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
  - switch
ha_zeroconf: true
ha_homekit: true
ha_integration_type: integration
---

The RainMachine integration is the main integration to integrate all platforms related to [RainMachine smart Wi-Fi sprinkler controllers](https://www.rainmachine.com/).

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Sensor
- [Switch](#switch)

Note that some entities are disabled by default. If you are missing a sensor or binary sensor, check the configured integration!

{% include integrations/config_flow.md %}

## Services

Services accept either device IDs or entity IDs, depending on the nature of the service:

- Services that require a device ID as a target:
  - `rainmachine.pause_watering`
  - `rainmachine.push_weather_data`
  - `rainmachine.restrict_watering`
  - `rainmachine.stop_all`
  - `rainmachine.unpause_watering`
  - `rainmachine.unrestrict_watering`
- Services that require an entity ID as a target (note that the correct entity ID type must be provided, such as a program for a program-related service)
  - `rainmachine.start_program`
  - `rainmachine.start_zone`
  - `rainmachine.stop_program`
  - `rainmachine.stop_zone`

### `rainmachine.pause_watering`

Pause all watering activities for a number of seconds. After the pause is complete, the previous watering activities will resume. Note that controllers can only be paused for a maximum of 12 hours.

| Service Data Attribute | Optional | Description                    |
| ---------------------- | -------- | ------------------------------ |
| `seconds`              | no       | The number of seconds to pause |

### `rainmachine.push_weather_data`

Push Weather Data from Home Assistant to the RainMachine device.

Local Weather Push service should be enabled from Settings > Weather > Developer tab for RainMachine to consider the values being sent. Units must be sent in metric; no conversions are performed by the integration. Note: RAIN and QPF values shouldn't be sent as cumulative values but the measured/forecasted values for each hour or day. The RainMachine Mixer will sum all RAIN or QPF values in the current day to have the day total RAIN or QPF.

See details of RainMachine API here: 
<https://rainmachine.docs.apiary.io/#reference/weather-services/parserdata/post>

| Service Data Attribute | Optional | Description                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `timestamp`            | no       | UNIX Timestamp for the Weather Data. If omitted, the RainMachine device's local time at the time of the call is used. |
| `mintemp`              | no       | Minimum Temperature (°C)                                                                                              |
| `maxtemp`              | no       | Maximum Temperature (°C)                                                                                              |
| `temperature`          | no       | Current Temperature (°C)                                                                                              |
| `wind`                 | no       | Wind Speed (m/s)                                                                                                      |
| `solarrad`             | no       | Solar Radiation (MJ/m²/h)                                                                                             |
| `et`                   | no       | Evapotranspiration (mm)                                                                                               |
| `qpf`                  | no       | Quantitative Precipitation Forecast (mm), or QPF                                                                      |
| `rain`                 | no       | Measured Rainfail (mm)                                                                                                |
| `minrh`                | no       | Min Relative Humidity (%RH)                                                                                           |
| `maxrh`                | no       | Max Relative Humidity (%RH)                                                                                           |
| `condition`            | no       | Current weather condition code (WNUM). See [here][wnum reference] for options.                                        |
| `pressure`             | no       | Barametric Pressure (kPa)                                                                                             |
| `dewpoint`             | no       | Dew Point (°C)                                                                                                        |

### `rainmachine.restrict_watering`

Restrict any and all watering activities from staring for a time period.

| Service Data Attribute | Optional | Description                    |
| ---------------------- | -------- | ------------------------------ |
| `duration`              | no       | The time period to restrict (e.g., "01:00:00") |

### `rainmachine.start_program`

Start a RainnMachine program.

### `rainmachine.start_zone`

Start a RainMachine zone for a set number of seconds.

| Service Data Attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `zone_run_time`        | yes      | The number of seconds to run; defaults to 60 seconds |

### `rainmachine.stop_all`

Stop all watering activities.

### `rainmachine.stop_program`

Stop a RainMachine program.

### `rainmachine.stop_zone`

Stop a RainMachine zone.

### `rainmachine.unpause_watering`

Unpause all paused watering activities.

### `rainmachine.unrestrict_watering`

Remove all watering restrictions enforced by `rainmachine.restrict_watering`.

## Switch

The `rainmachine` switch platform allows you to control programs and zones within a [RainMachine smart Wi-Fi sprinkler controller](https://www.rainmachine.com/).

### Controlling Your Device

After Home Assistant loads, new switches will be added for every enabled program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the `zone_run_time` parameter to determine how long to run for)

Programs and zones are linked. While a program is running, you will see both the program and zone switches turned on; turning either one off will turn the other one off (just like in the web app).

[wnum reference]: https://github.com/sprinkler/rainmachine-developer-resources/blob/d47e1ad59dee59e34094ad41636ae289275eb973/sdk-parsers/RMDataFramework/rmWeatherData.py#L13
